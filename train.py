import json
from datasets import Dataset
from PIL import Image
import torch

from transformers import (
    LayoutLMv3TokenizerFast,
    LayoutLMv3Processor,
    LayoutLMv3ImageProcessor,
    LayoutLMv3ForTokenClassification,
    TrainingArguments,
    Trainer
)

# ------------------------
# LOAD DATASET
# ------------------------
data = []
with open("train_data.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        data.append(json.loads(line))

dataset = Dataset.from_list(data)

# ------------------------
# BUILD LABEL LIST FROM DATA
# ------------------------
all_labels = set()
for item in data:
    all_labels.update(item["ner_tags"])

LABEL_LIST = sorted(list(all_labels))
label2id = {l: i for i, l in enumerate(LABEL_LIST)}
id2label = {i: l for l, i in label2id.items()}

print("Detected labels:", LABEL_LIST)

# ------------------------
# PROCESSOR (NO OCR)
# ------------------------
tokenizer = LayoutLMv3TokenizerFast.from_pretrained("microsoft/layoutlmv3-base")

processor = LayoutLMv3Processor(
    image_processor=LayoutLMv3ImageProcessor(apply_ocr=False),
    tokenizer=tokenizer
)

# ------------------------
# ENCODING FUNCTION
# ------------------------
def encode_batch(batch):
    image = Image.open(batch["image_path"]).convert("RGB")

    encoding = processor(
        images=image,
        text=batch["words"],          # <--- OBLIGATOIRE
        boxes=batch["boxes"],
        word_labels=[label2id[tag] for tag in batch["ner_tags"]],
        truncation=True,
        padding="max_length",
        return_tensors="pt"
    )

    # squeeze batch dimension
    return {k: v.squeeze(0) for k, v in encoding.items()}
 

dataset = dataset.map(encode_batch)

# ------------------------
# MODEL
# ------------------------
model = LayoutLMv3ForTokenClassification.from_pretrained(
    "microsoft/layoutlmv3-base",
    num_labels=len(LABEL_LIST),
    id2label=id2label,
    label2id=label2id
)

# ------------------------
# TRAINING ARGS
# ------------------------
training_args = TrainingArguments(
    output_dir="models/layoutlmv3_trained",
    per_device_train_batch_size=1,
    num_train_epochs=3,
    logging_steps=20,
    save_strategy="epoch",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
)

trainer.train()
model.save_pretrained("models/layoutlmv3_trained")
processor.save_pretrained("models/layoutlmv3_trained")

print("🎉 TRAINING COMPLETE!")


