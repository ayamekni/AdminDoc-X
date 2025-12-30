# AdminDoc‑X 🛰️  
**AI‑Powered Administrative Document Intelligence (OCR · NER · Layout Understanding · Structured Extraction)**

AdminDoc‑X is an end‑to‑end document intelligence platform that understands **administrative documents**: it reads scans, detects layout, extracts structured fields, and exposes them through a simple API and a modern landing page.


![WhatsApp Image 2025-12-09 at 16 31 47](https://github.com/user-attachments/assets/d91f1e63-f84e-455a-84ef-3dcfdb0a91d3)
![WhatsApp Image 2025-12-09 at 16 31 53 (2)](https://github.com/user-attachments/assets/4bc15124-b75d-4a29-a59e-fc76d5b977a3)
![WhatsApp Image 2025-12-09 at 16 31 51](https://github.com/user-attachments/assets/b8ad3e50-1c0b-4779-9b55-ddc9ae53d220)

This repository contains **both**:

- **Backend** – Flask + LayoutLMv3 + OCR for document classification & field extraction  
- **Frontend** – React + TypeScript + Vite landing page to showcase the platform

---

## ✨ Highlights (What Makes This Interesting)

- **Real‑world AI project** combining:
  - OCR (Tesseract) + image preprocessing
  - Fine‑tuned **LayoutLMv3** for NER on administrative documents
  - Document type classification + structured field extraction
- **Production‑style API**: Flask REST API with CORS, ready to be consumed by any client
- **Modern frontend stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Clean architecture**:
  - Clear separation between **frontend** and **backend**
  - Trainable model pipeline with dataset preparation and evaluation
- **Recruiter‑friendly**:
  - Demonstrates **ML**, **backend**, and **frontend** skills in one cohesive project
  - Shows experience with **MLOps‑style workflows** (training, evaluation, inference)

---

## 🧠 What AdminDoc‑X Does

Given a scanned administrative document (e.g., review form, report, official form):

1. **OCR & Layout Analysis**
   - Preprocesses the image (OpenCV)
   - Runs Tesseract OCR for text extraction and bounding boxes

2. **NER with LayoutLMv3**
   - Uses a fine‑tuned **LayoutLMv3** model to detect entities such as:
     - Dates
     - Authors / people
     - Titles
     - Reference / registration numbers
     - Recommendations & comments

3. **Document Structuring**
   - Predicts the **document type**
   - Returns a **structured JSON** with:
     - Key fields (registration_number, date, authors, title, recommendation, …)
     - Raw OCR preview
     - Processing metadata (model used, timestamp, etc.)

4. **Frontend Experience**
   - Landing page explaining pipeline & use cases
   - Interactive sections: hero animation, pipeline visualization, before/after, tech stack, demo section

---

## 🏗️ Repository Structure

```bash
AdminDoc-X/
├── frontend/                     # React + TS + Vite landing page
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui primitives
│   │   │   ├── BeforeAfterSection.tsx
│   │   │   ├── DemoSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── FloatingDocuments.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── PipelineSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   └── UseCasesSection.tsx
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── Index.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── components.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/                      # Flask API + LayoutLMv3 + OCR
    ├── api.py                    # Flask REST API
    ├── model.py                  # LayoutLMv3 NER inference pipeline
    ├── ocr_llm_extractor.py      # OCR + preprocessing
    ├── train.py                  # Model training script
    ├── prepare_dataset.py        # Dataset preparation utilities
    ├── train_data.jsonl          # Training data (sample format)
    ├── dataset/
    │   ├── training_data/
    │   │   ├── images/
    │   │   └── annotations/
    │   └── testing_data/
    │       ├── images/
    │       └── annotations/
    ├── models/                   # Trained weights (excluded from git)
    ├── uploads/                  # Temporary file storage
    ├── results_simple.json       # Evaluation metrics
    ├── results_improved.json
    └── results_final.json
```

> **Note:** Large model weights are excluded via `.gitignore` (`models/`, `uploads/`, `*.pt`, `*.pth`, `*.safetensors`, etc.).

---

## 🛠 Tech Stack

### Backend

- **Python**, **Flask**, **Flask‑CORS**
- **PyTorch**, **Transformers (LayoutLMv3)**, **datasets**
- **Tesseract OCR** (`pytesseract`)
- **OpenCV**, **Pillow**, **numpy**
- Optional **CUDA** acceleration for faster inference

### Frontend

- **React** (TypeScript)
- **Vite** (bundler / dev server)
- **Tailwind CSS**
- **shadcn/ui** + **Radix UI** (accessible UI primitives)
- **Lucide React** (icons)
- **React Hook Form**, **Zustand**, **TanStack Query**, **React Router**
- Utility libraries: `clsx`, `class-variance-authority`, `date-fns`

---

## 🚀 Quick Start

You can run **backend** and **frontend** separately.

### 1. Backend – API Server

#### Prerequisites

- Python **3.8+**
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- (Optional) CUDA‑compatible GPU + CUDA drivers

#### 1.1. Install Tesseract

**Windows**

```bash
# Download and install:
# https://github.com/UB-Mannheim/tesseract/wiki
# Then note the path, e.g.:
# C:\Program Files\Tesseract-OCR\tesseract.exe
```

**Ubuntu / Debian**

```bash
sudo apt-get update
sudo apt-get install -y tesseract-ocr
```

**macOS (Homebrew)**

```bash
brew install tesseract
```

#### 1.2. Backend Setup

```bash
cd backend

# Optionally create a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Core dependencies
pip install flask flask-cors pillow pytesseract opencv-python numpy

# PyTorch (adjust CUDA version if needed)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# Transformers, datasets, date parsing
pip install transformers datasets dateparser
```

If Tesseract is not in your PATH, set the path in `ocr_llm_extractor.py` and `model.py`:

```python
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"PATH_TO_TESSERACT_EXECUTABLE"
# Example (Windows):
# r"C:\Program Files\Tesseract-OCR\tesseract.exe"
```

#### 1.3. Train or Download the Model

You can:

- **Train your own model** using the provided scripts, or  
- **Place pre‑trained weights** in `backend/models/` and update the path in `model.py`.

**Training from your dataset:**

1. Prepare dataset:

   ```bash
   cd backend
   python prepare_dataset.py
   ```

   Your JSONL should look like:

   ```json
   {
     "image": "path/to/image.png",
     "tokens": ["word1", "word2", "..."],
     "bboxes": [[x1, y1, x2, y2], "..."],
     "ner_tags": ["O", "B-DATE", "I-DATE", "..."]
   }
   ```

2. Train the LayoutLMv3 model:

   ```bash
   python train.py
   ```

   Default configuration (can be changed inside `train.py`):

   - Model: `microsoft/layoutlmv3-base`
   - Batch size: 2
   - Learning rate: `5e-5`
   - Epochs: 10
   - Output: `models/layoutlmv3_trained/`

3. Evaluate results – check:

   - `results_simple.json`
   - `results_improved.json`
   - `results_final.json`

#### 1.4. Run the API

```bash
cd backend
python api.py
```

By default, the server runs at:

```text
http://localhost:5000
```

---

### 2. Frontend – Landing Page

#### Prerequisites

- **Node.js** v18+  
- `npm` (comes with Node) or `bun`

#### 2.1. Install Dependencies

```bash
cd frontend

# using npm
npm install

# or using bun
bun install
```

#### 2.2. Environment Variables (Optional)

Create a `.env` inside `frontend/` if you want to call the backend API from the UI:

```env
VITE_API_URL=http://localhost:5000
```

Use in code:

```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

#### 2.3. Run Dev Server

```bash
cd frontend

# with npm
npm run dev

# or with bun
bun dev
```

The app will be available at:

```text
http://localhost:5173
```

---

## 🔌 API Usage

Once the backend is running on `http://localhost:5000`:

### Endpoint

`POST /process`  

Uploads a document image and returns classification, fields, and OCR preview.

**Example (cURL):**

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

### Supported Entity Types

| Entity Type      | Description          | Example           |
|------------------|----------------------|-------------------|
| `B-DATE`/`I-DATE`   | Dates               | `15/03/2024`      |
| `B-PERSON`/`I-PERSON` | Names            | `Dr. John Smith`  |
| `B-TITLE`/`I-TITLE`   | Document titles  | `Annual Report`   |
| `B-REF`/`I-REF`       | Reference IDs    | `REF-2024-001`    |
| `B-REC`/`I-REC`       | Recommendations | `Approved`        |
| `O`                   | Other tokens     | -                 |

---

## 🌐 Frontend Experience

The frontend showcases AdminDoc‑X through:

- **Hero Section** with floating documents animation
- **Pipeline Visualization** explaining OCR → NER → structured output
- **Feature Sections** describing core capabilities
- **Interactive Demo Section** (optional wiring to `/process` endpoint)
- **Use Case Section** for administrative & enterprise scenarios
- **Tech Stack Overview**
- **Before / After** comparison of raw scans vs. structured JSON
- **Responsive Design** with dark mode support

---

## 🧪 Development & Scripts

### Frontend Scripts (`frontend/package.json`)

| Command           | Description                               |
|-------------------|-------------------------------------------|
| `npm run dev`     | Start dev server with hot reload          |
| `npm run build`   | Production build                          |
| `npm run build:dev` | Development‑mode build (if configured) |
| `npm run lint`    | Run ESLint                                |
| `npm run preview` | Preview production build                  |

### Backend

Typical workflows:

```bash
# Start API
python api.py

# Prepare dataset
python prepare_dataset.py

# Train model
python train.py
```

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. Create your feature branch  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to your branch  
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request**

### Contribution Guidelines

- Keep components and modules **small and focused**
- Follow existing **TypeScript**, **Python**, and **Tailwind** patterns
- Update documentation if you change behavior
- Add tests where applicable
- Ensure all checks (lint / tests) pass before submitting

---

## 👥 Authors
- **Aya Mekni**  
- **Tasnim Mtir**  
- **Ikram Menyaoui**  
- **Nour Saibi**

---

## 🙏 Acknowledgments

- [Microsoft LayoutLMv3](https://huggingface.co/microsoft/layoutlmv3-base)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [Hugging Face Transformers](https://github.com/huggingface/transformers)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

Specify your license here, for example:

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

> ⭐ If you find this project interesting or useful, please consider **starring the repository** on GitHub.
