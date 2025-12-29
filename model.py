# ============================================================
# AdminDoc-X — CLEAN NER Pipeline for API Prediction
# LayoutLMv3 (fine-tuned) + OCR + clean token reconstruction
# ============================================================

import os
import json
import cv2
import torch
import numpy as np
from PIL import Image
import pytesseract
import re

from transformers import (
    LayoutLMv3ForTokenClassification,
    LayoutLMv3ImageProcessor,
    LayoutLMv3TokenizerFast,
    LayoutLMv3Processor,
)

# ============================================================
# CONFIG
# ============================================================

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

MODEL_PATH = "models/layoutlmv3_trained"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("DEVICE:", device)

# ============================================================
# LABELS (auto-loaded from fine-tuned model)
# ============================================================

tokenizer = LayoutLMv3TokenizerFast.from_pretrained(MODEL_PATH)
image_processor = LayoutLMv3ImageProcessor(apply_ocr=True)
processor = LayoutLMv3Processor(image_processor, tokenizer)

model = LayoutLMv3ForTokenClassification.from_pretrained(MODEL_PATH).to(device)
id2label = model.config.id2label


# ============================================================
# CLEAN TOKEN FUNCTION
# ============================================================

def clean_token(token):
    """
    Supprime les préfixes: ##, Ġ, spaces, unknown tokens.
    """
    token = token.replace("##", "")
    token = token.replace("Ġ", "")
    token = token.strip()
    if token in ["[PAD]", "[CLS]", "[SEP]", "", " ", None]:
        return None
    return token


# ============================================================
# IMAGE PREPROCESSING
# ============================================================

def preprocess_image(img_path):
    img = cv2.imread(img_path, 0)

    # amélioration OCR
    img = cv2.adaptiveThreshold(
        img, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    )
    img = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    temp_path = "temp_clean.png"
    cv2.imwrite(temp_path, img)
    return temp_path


# ============================================================
# ENTITY EXTRACTION
# ============================================================

def extract_entities(img_path):

    img_clean = preprocess_image(img_path)
    image = Image.open(img_clean).convert("RGB")

    encoding = processor(
        image,
        return_tensors="pt",
        padding="max_length",
        truncation=True
    )

    encoding = {k: v.to(device) for k, v in encoding.items()}

    with torch.no_grad():
        outputs = model(**encoding)

    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)[0].cpu().tolist()
    tokens = tokenizer.convert_ids_to_tokens(encoding["input_ids"][0])

    entities = {}
    current_label = None
    buffer = []

    # =============== Extract entities with BIO logic ===============
    for token, pred in zip(tokens, predictions):

        token = clean_token(token)
        if token is None:
            continue

        label = id2label[pred]

        if label.startswith("B-"):
            # save previous entity
            if current_label and buffer:
                entities[current_label] = " ".join(buffer)

            current_label = label[2:]  # remove B-
            buffer = [token]

        elif label.startswith("I-") and current_label == label[2:]:
            buffer.append(token)

        else:
            # O label
            continue

    # save last entity
    if current_label and buffer:
        entities[current_label] = " ".join(buffer)

    # CLASSIFY DOC TYPE (default)
    entities["DOC_TYPE"] = "autre"

    return entities
