# AdminDoc-X Backend 🚀

> Advanced document processing and information extraction API powered by LayoutLMv3 and OCR technology

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0%2B-green.svg)](https://flask.palletsprojects.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-red.svg)](https://pytorch.org/)
[![Transformers](https://img.shields.io/badge/🤗%20Transformers-4.30%2B-yellow.svg)](https://huggingface.co/transformers/)

---
## Frontend Implementation

👉 [Frontend Repo](https://github.com/tasnim-mtir/AdminDoc-X-Frontend)

---
## 📋 Overview

AdminDoc-X Backend is an intelligent document processing system that extracts structured information from administrative documents using state-of-the-art AI models. It combines OCR (Optical Character Recognition) with fine-tuned LayoutLMv3 for Named Entity Recognition (NER) to accurately identify and extract key information from scanned documents.

### Key Features

- **🔍 Advanced OCR**: Image preprocessing and Tesseract OCR for text extraction
- **🤖 AI-Powered NER**: Fine-tuned LayoutLMv3 model for entity recognition
- **📄 Document Classification**: Automatic document type detection
- **🎯 Field Extraction**: Extracts registration numbers, dates, authors, titles, and more
- **🌐 REST API**: Simple Flask-based API for easy integration
- **⚡ GPU Acceleration**: CUDA support for faster inference

## 🏗️ Architecture

```
AdminDoc-X/
├── api.py                    # Flask REST API endpoint
├── model.py                  # LayoutLMv3 NER prediction pipeline
├── ocr_llm_extractor.py      # OCR + document analysis
├── train.py                  # Model training script
├── prepare_dataset.py        # Dataset preparation utilities
├── train_data.jsonl          # Training data
├── dataset/                  # Training & testing datasets
│   ├── training_data/
│   │   ├── images/
│   │   └── annotations/
│   └── testing_data/
│       ├── images/
│       └── annotations/
├── models/                   # Trained model weights (not in repo)
├── uploads/                  # Temporary file storage
└── results_*.json            # Evaluation results
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Tesseract OCR installed
- CUDA-compatible GPU (optional, but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tasnim-mtir/AdminDoc-X-Backend.git
   cd AdminDoc-X-Backend
   ```

2. **Install Tesseract OCR**
   
   Windows:
   ```bash
   # Download and install from: https://github.com/UB-Mannheim/tesseract/wiki
   # Default path: C:\Program Files\Tesseract-OCR\tesseract.exe
   ```
   
   Linux:
   ```bash
   sudo apt-get install tesseract-ocr
   ```
   
   macOS:
   ```bash
   brew install tesseract
   ```

3. **Install Python dependencies**
   ```bash
   pip install flask flask-cors pillow pytesseract opencv-python numpy
   pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
   pip install transformers datasets dateparser
   ```

4. **Configure Tesseract path** (if needed)
   
   Update the Tesseract path in `ocr_llm_extractor.py` and `model.py`:
   ```python
   pytesseract.pytesseract.tesseract_cmd = r"YOUR_TESSERACT_PATH"
   ```

## 🎓 Training Your Own Model

### 1. Prepare Your Dataset

```bash
python prepare_dataset.py
```

Your dataset should be in JSONL format with the following structure:
```json
{
  "image": "path/to/image.png",
  "tokens": ["word1", "word2", ...],
  "bboxes": [[x1, y1, x2, y2], ...],
  "ner_tags": ["O", "B-DATE", "I-DATE", ...]
}
```

### 2. Train the Model

```bash
python train.py
```

Training configuration:
- Model: `microsoft/layoutlmv3-base`
- Batch size: 2
- Learning rate: 5e-5
- Epochs: 10
- Output: `models/layoutlmv3_trained/`

### 3. Evaluate Results

Check the generated result files:
- `results_simple.json` - Basic metrics
- `results_improved.json` - Enhanced metrics
- `results_final.json` - Final evaluation

## 🔧 API Usage

### Start the Server

```bash
python api.py
```

The server will start on `http://localhost:5000`

### Process a Document

**Endpoint:** `POST /process`

**Request:**
```bash
curl -X POST http://localhost:5000/process \
  -F "file=@document.png"
```

**Response:**
```json
{
  "document_type": "scientific_review_form",
  "confidence": 0.92,
  "fields": {
    "registration_number": "REF-2024-001",
    "date": "2024-03-15",
    "authors": ["Dr. Smith", "Prof. Johnson"],
    "title": "Research Paper Title",
    "recommendation": "Accept with minor revisions",
    "suggested_revision": "Improve methodology section"
  },
  "raw_ocr_preview": "Full OCR text...",
  "processing_info": {
    "ocr_processing": true,
    "model_used": "layoutlmv3",
    "timestamp": "2024-03-15T10:30:00"
  }
}
```

## 📊 Model Performance

The LayoutLMv3 model is fine-tuned on administrative documents with the following entity types:

| Entity Type | Description | Example |
|------------|-------------|---------|
| `B-DATE/I-DATE` | Dates | "15/03/2024" |
| `B-PERSON/I-PERSON` | Names | "Dr. John Smith" |
| `B-TITLE/I-TITLE` | Document titles | "Annual Report" |
| `B-REF/I-REF` | Reference numbers | "REF-2024-001" |
| `B-REC/I-REC` | Recommendations | "Approved" |
| `O` | Other tokens | - |

## 🛠️ Technologies Used

- **[Flask](https://flask.palletsprojects.com/)** - Web framework
- **[PyTorch](https://pytorch.org/)** - Deep learning framework
- **[Transformers](https://huggingface.co/transformers/)** - LayoutLMv3 implementation
- **[Tesseract OCR](https://github.com/tesseract-ocr/tesseract)** - Text recognition
- **[OpenCV](https://opencv.org/)** - Image preprocessing
- **[Pillow](https://python-pillow.org/)** - Image handling

## 📁 Project Structure Details

### Core Files

- **`api.py`**: Flask REST API server with CORS support
- **`model.py`**: LayoutLMv3 inference pipeline for NER predictions
- **`ocr_llm_extractor.py`**: OCR processing with image preprocessing and text extraction
- **`train.py`**: Training script for fine-tuning LayoutLMv3
- **`prepare_dataset.py`**: Dataset preparation and preprocessing utilities

### Data Files

- **`train_data.jsonl`**: Training dataset in JSONL format
- **`dataset/`**: Image and annotation files for training/testing
- **`results_*.json`**: Model evaluation metrics and results

## 🔒 .gitignore

Large model files and uploads are excluded from git:
```
models/
uploads/
__pycache__/
*.pt
*.pth
*.safetensors
*.bin
```

To use the API, you'll need to train the model first or download pre-trained weights.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

**Tasnim Mtir** - **Ikram Menyaoui** - **Aya Mekni** - **Nour Saibi**

## 🙏 Acknowledgments

- Microsoft for the [LayoutLMv3](https://huggingface.co/microsoft/layoutlmv3-base) model
- Tesseract OCR team
- Hugging Face for the Transformers library

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: Model weights are not included in this repository due to size constraints. Train your own model using the provided training script or contact the maintainer for pre-trained weights.
