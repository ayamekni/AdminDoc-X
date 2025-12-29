# ocr_llm_extractor.py
import pytesseract
from PIL import Image
import json
import re
import cv2
import numpy as np
from datetime import datetime
import dateparser

# Path to Tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def preprocess_image_for_ocr(img_path):
    """Prétraitement de l'image pour améliorer l'OCR"""
    try:
        # Charger l'image
        img = cv2.imread(img_path)
        if img is None:
            # Essayer avec PIL si OpenCV échoue
            pil_img = Image.open(img_path)
            img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        
        # Convertir en niveaux de gris
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Débruitage
        denoised = cv2.fastNlMeansDenoising(gray, None, 30, 7, 21)
        
        # Amélioration du contraste (CLAHE)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        enhanced = clahe.apply(denoised)
        
        # Binarisation adaptative
        binary = cv2.adaptiveThreshold(enhanced, 255, 
                                     cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                     cv2.THRESH_BINARY, 11, 2)
        
        # Redimensionner si trop petit
        height, width = binary.shape
        if height < 500 or width < 500:
            scale = 2
            new_height, new_width = int(height * scale), int(width * scale)
            resized = cv2.resize(binary, (new_width, new_height), 
                               interpolation=cv2.INTER_CUBIC)
        else:
            resized = binary
        
        return resized
    except Exception as e:
        print(f"Erreur prétraitement: {e}")
        # Retourner l'image originale en cas d'erreur
        return Image.open(img_path).convert('L')

def extract_text_with_layout(img_path, lang='fra+eng'):
    """OCR avec détection de mise en page"""
    try:
        # Prétraitement
        processed_img = preprocess_image_for_ocr(img_path)
        
        # Convertir en image PIL pour pytesseract
        if isinstance(processed_img, np.ndarray):
            pil_image = Image.fromarray(processed_img)
        else:
            pil_image = processed_img
        
        # Configuration OCR avancée
        custom_config = r'--oem 3 --psm 3'
        
        # Extraire le texte avec mise en page
        text = pytesseract.image_to_string(pil_image, lang=lang, config=custom_config)
        
        # Extraire aussi les données avec structure
        data = pytesseract.image_to_data(pil_image, lang=lang, config=custom_config, 
                                        output_type=pytesseract.Output.DICT)
        
        return text, data
    except Exception as e:
        print(f"Erreur OCR: {e}")
        # Fallback simple
        img = Image.open(img_path)
        text = pytesseract.image_to_string(img, lang=lang)
        return text, None

def find_document_type(text):
    """Détecter le type de document"""
    text_lower = text.lower()
    
    if any(word in text_lower for word in ['unesco', 'memoire du monde', 'organisation des nations unies']):
        return "certificat_unesco"
    elif any(word in text_lower for word in ['archives nationales', 'présidence du gouvernement', 'république tunisienne']):
        return "document_administratif_tunisien"
    elif any(word in text_lower for word in ['horaires', 'horaire', 'ouverture', 'salle de lecture']):
        return "horaire_ouverture"
    elif any(word in text_lower for word in ['inscription', 'certificat', 'registration']):
        return "certificat"
    else:
        return "document_generique"

def extract_date_advanced(text):
    """Extraction avancée des dates"""
    dates_found = []
    
    # Patterns de dates
    date_patterns = [
        r'(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4})',
        r'(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})',
        r'(\d{1,2}\s+[A-Za-zÀ-ÿ]+\s+\d{4})',
        r'le\s+(\d{1,2}\s+[A-Za-zÀ-ÿ]+\s+\d{4})',
        r'(\d{4}[-/]\d{1,2}[-/]\d{1,2})',
    ]
    
    for pattern in date_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            try:
                # Essayer de parser la date
                parsed_date = dateparser.parse(match, languages=['fr', 'en'])
                if parsed_date:
                    dates_found.append({
                        'raw': match,
                        'parsed': parsed_date.strftime('%Y-%m-%d'),
                        'iso': parsed_date.isoformat()
                    })
            except:
                continue
    
    return dates_found

def extract_entities_structured(text, data_dict=None):
    """Extraction structurée des entités"""
    entities = {
        "document_type": None,
        "title": None,
        "organization": None,
        "date": None,
        "location": None,
        "reference_number": None,
        "contact_info": {},
        "persons": [],
        "dates": [],
        "addresses": [],
        "phone_numbers": [],
        "emails": [],
        "urls": []
    }
    
    # 1. Type de document
    entities["document_type"] = find_document_type(text)
    
    # 2. Titre (premières lignes significatives)
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if len(lines) > 0:
        # Prendre les premières lignes non-vides comme titre potentiel
        title_candidates = []
        for line in lines[:5]:  # Regarder les 5 premières lignes
            if len(line) > 10 and not any(word in line.lower() for word in 
                                         ['date', 'n°', 'numéro', 'téléphone', 'email', 'www']):
                title_candidates.append(line)
        
        if title_candidates:
            entities["title"] = title_candidates[0]
    
    # 3. Numéro de référence
    ref_patterns = [
        r'N[°ºo]\s*[:]?\s*([A-Z0-9\-/]+)',
        r'Ref[ée]rence\s*[:]?\s*([A-Z0-9\-/]+)',
        r'Num[ée]ro\s*[:]?\s*([A-Z0-9\-/]+)',
        r'ID\s*[:]?\s*([A-Z0-9\-/]+)'
    ]
    
    for pattern in ref_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            entities["reference_number"] = match.group(1).strip()
            break
    
    # 4. Dates
    entities["dates"] = extract_date_advanced(text)
    if entities["dates"]:
        entities["date"] = entities["dates"][0]['parsed']  # Première date trouvée
    
    # 5. Organisation
    org_keywords = ['UNESCO', 'Archives Nationales', 'Présidence du gouvernement', 
                   'République Tunisienne', 'Organisation des Nations Unies']
    
    for keyword in org_keywords:
        if keyword.lower() in text.lower():
            entities["organization"] = keyword
            break
    
    # 6. Localisation (ville, pays)
    location_patterns = [
        r'à\s+([A-Za-zÀ-ÿ]+)',
        r'([A-Za-zÀ-ÿ]+)\s+Tunisie',
        r'Tunis\s+([A-Za-zÀ-ÿ]+)'
    ]
    
    for pattern in location_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            entities["location"] = matches[0]
            break
    
    # 7. Informations de contact
    # Numéros de téléphone
    phone_matches = re.findall(r'\(?\d{2,4}\)?[\s\-]?\d{2,3}[\s\-]?\d{2,3}[\s\-]?\d{2,3}', text)
    entities["phone_numbers"] = phone_matches
    
    # Emails
    email_matches = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    entities["emails"] = email_matches
    
    # URLs
    url_matches = re.findall(r'www\.\S+|\bhttps?://\S+', text)
    entities["urls"] = url_matches
    
    # 8. Adresses
    address_patterns = [
        r'\d+,\s+[A-Za-zÀ-ÿ\s\d]+,\s+\d+\s+[A-Za-zÀ-ÿ]+',
        r'[A-Za-zÀ-ÿ\s]+,\s+\d+\s+[A-Za-zÀ-ÿ]+',
        r'\d+\s+[A-Za-zÀ-ÿ\s]+\s+\d{4,5}\s+[A-Za-zÀ-ÿ]+'
    ]
    
    for pattern in address_patterns:
        matches = re.findall(pattern, text)
        if matches:
            entities["addresses"].extend(matches)
    
    # 9. Personnes (noms propres suivis de titres)
    person_patterns = [
        r'(M\.|Mme|Mlle|Dr|Prof|Directeur|Directrice)\s+([A-Z][a-zÀ-ÿ]+\s+[A-Z][a-zÀ-ÿ]+)',
        r'([A-Z][a-zÀ-ÿ]+\s+[A-Z][a-zÀ-ÿ]+)\s+\(([^)]+)\)',
        r'Sign[ée]\s+par\s+([A-Z][a-zÀ-ÿ]+\s+[A-Z][a-zÀ-ÿ]+)'
    ]
    
    for pattern in person_patterns:
        matches = re.findall(pattern, text)
        for match in matches:
            if isinstance(match, tuple):
                name = match[1] if len(match) > 1 else match[0]
            else:
                name = match
            
            if name not in entities["persons"] and len(name.split()) >= 2:
                entities["persons"].append(name)
    
    # 10. Informations de contact structurées
    if entities["phone_numbers"]:
        entities["contact_info"]["telephone"] = entities["phone_numbers"][0]
    if entities["emails"]:
        entities["contact_info"]["email"] = entities["emails"][0]
    if entities["addresses"]:
        entities["contact_info"]["address"] = entities["addresses"][0]
    if entities["urls"]:
        entities["contact_info"]["website"] = entities["urls"][0]
    
    return entities

def extract_document_info(img_path):
    """Fonction principale d'extraction - robuste pour tous types de documents"""
    
    try:
        # 1. OCR avancé avec prétraitement
        text, ocr_data = extract_text_with_layout(img_path, lang='fra+eng')
        
        print("=" * 60)
        print("TEXTE EXTRAIT (premières 1000 caractères):")
        print(text[:1000])
        print("=" * 60)
        
        # 2. Extraction structurée
        entities = extract_entities_structured(text, ocr_data)
        
        # 3. Format de réponse standardisé
        response = {
            "document_type": entities["document_type"],
            "confidence": 0.95,
            "extraction_method": "ocr_rules_based",
            "fields": {
                "title": entities["title"],
                "organization": entities["organization"],
                "date": entities["date"],
                "reference_number": entities["reference_number"],
                "location": entities["location"],
                "contact_info": entities["contact_info"],
                "all_dates": [d['parsed'] for d in entities["dates"]],
                "persons": entities["persons"],
                "phone_numbers": entities["phone_numbers"],
                "emails": entities["emails"],
                "urls": entities["urls"],
                "addresses": entities["addresses"]
            },
            "raw_ocr_preview": text[:500] + "..." if len(text) > 500 else text,
            "metadata": {
                "processing_time": datetime.now().isoformat(),
                "image_path": img_path,
                "ocr_engine": "tesseract"
            }
        }
        
        # 4. Nettoyer les valeurs None
        response["fields"] = {k: v for k, v in response["fields"].items() if v is not None and v != [] and v != {}}
        
        return response
        
    except Exception as e:
        print(f"Erreur dans extract_document_info: {e}")
        # Retourner une structure minimale en cas d'erreur
        return {
            "document_type": "unknown",
            "confidence": 0.0,
            "error": str(e),
            "fields": {},
            "metadata": {
                "error": True,
                "processing_time": datetime.now().isoformat()
            }
        }

# Fonction de test
def test_extraction():
    """Tester l'extraction sur des images"""
    test_images = ["test.jpeg", "test2.jpg"]
    
    for img_file in test_images:
        print(f"\n{'='*80}")
        print(f"Traitement de: {img_file}")
        print(f"{'='*80}")
        
        try:
            result = extract_document_info(img_file)
            print(f"Type de document: {result['document_type']}")
            print(f"Confiance: {result['confidence']}")
            print("\nChamps extraits:")
            
            for key, value in result['fields'].items():
                if value:  # Afficher seulement les champs non-vides
                    print(f"  {key}: {value}")
            
            print("\nMétadonnées:")
            print(f"  Méthode: {result.get('extraction_method', 'N/A')}")
            print(f"  Temps: {result['metadata']['processing_time']}")
            
        except Exception as e:
            print(f"Erreur avec {img_file}: {e}")




if __name__ == "__main__":
    # Exécuter les tests
    test_extraction()