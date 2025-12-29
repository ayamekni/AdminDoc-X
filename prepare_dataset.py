import os
import json
from PIL import Image

def load_funsd_annotation(json_path):
    """
    Charge l'annotation au format FUNSD.
    Retourne : liste des mots, liste des boxes normalisées, liste des labels BIO.
    """
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    words = []
    boxes = []
    labels = []

    for entity in data["form"]:

        label = entity["label"]

        # convert FUNSD label → NER label
        if label == "question":
            ner_label = "B-QUESTION"
        elif label == "answer":
            ner_label = "B-ANSWER"
        elif label == "header":
            ner_label = "B-HEADER"
        else:
            ner_label = "O"  # other

        for w in entity["words"]:
            word = w["text"].strip()
            if word == "":
                continue

            x1, y1, x2, y2 = w["box"]

            words.append(word)
            boxes.append([x1, y1, x2, y2])
            labels.append(ner_label)

    return words, boxes, labels


def normalize_box(box, width, height):
    """ Normalise les bounding boxes entre 0 et 1000 """
    x1, y1, x2, y2 = box
    return [
        int(1000 * x1 / width),
        int(1000 * y1 / height),
        int(1000 * x2 / width),
        int(1000 * y2 / height),
    ]


def prepare_dataset(image_dir, ann_dir, output_jsonl):
    dataset = []

    for file in os.listdir(image_dir):
        if not file.lower().endswith(".png"):
            continue

        img_path = os.path.join(image_dir, file)
        json_path = os.path.join(ann_dir, file.replace(".png", ".json"))

        if not os.path.exists(json_path):
            print("⚠ No annotation for", file)
            continue

        image = Image.open(img_path)
        width, height = image.size

        words, boxes, labels = load_funsd_annotation(json_path)

        # normalisation des boxes
        norm_boxes = [normalize_box(b, width, height) for b in boxes]

        # Format LayoutLMv3 JSONL
        entry = {
            "id": file,
            "image_path": os.path.join(image_dir, file),
            "words": words,
            "boxes": norm_boxes,
            "ner_tags": labels,
        }


        dataset.append(entry)
        print("✔ Processed:", file)

    # écrire dans un JSONL
    with open(output_jsonl, "w", encoding="utf-8") as f:
        for item in dataset:
            f.write(json.dumps(item) + "\n")

    print("\n==============================")
    print("Dataset READY →", output_jsonl)
    print("Total documents:", len(dataset))
    print("==============================\n")


if __name__ == "__main__":
    prepare_dataset(
        "dataset/training_data/images",
        "dataset/training_data/annotations",
        "train_data.jsonl"
    )
