import os
import re
import json
import requests
from bs4 import BeautifulSoup
import pdfplumber
import firebase_admin
from firebase_admin import credentials, firestore

SUBJECT_MAPPING = {
    "Razvod el. energije": "Razvod električne energije",
    "Energ. elektronika": "Energetska elektronika",
    "Električni strojevi": "Električni strojevi",
    "Procesna instr.": "Procesna instrumentacija",
    "Aut. str. i ur.": "Automatski strojevi i uređaji",
    "Automat. upravljanje": "Automatsko upravljanje",
    "Digitalne videokom.": "Digitalne videokomunikacije",
    "Osnove robotike": "Osnove robotike",
    "ASU": "Automatsko upravljanje (ASU)",
    "OR": "Osnove robotike"
}

def get_unin_pdf_url():
    url = "https://www.unin.hr/elektrotehnika/raspored-predavanja/"
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(url, headers=headers)
    res.raise_for_status()
    
    soup = BeautifulSoup(res.text, "html.parser")
    pdf_links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].lower().endswith('.pdf')]
    
    if len(pdf_links) >= 3:
        target_link = pdf_links[2] # 3. dokument za 3. godinu
        if not target_link.startswith("http"):
            target_link = "https://www.unin.hr" + target_link
        print(f"[UNIN] Pronađen 3. PDF: {target_link}")
        return target_link
    raise Exception("Nije pronađeno dovoljno PDF dokumenata na stranici!")

def parse_pdf(pdf_path):
    all_events = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_idx, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            for table in tables:
                for row in table:
                    for cell in row:
                        if not cell or len(cell.strip()) < 4:
                            continue
                        clean_cell = cell.replace('\n', ' ').strip()
                        if "praznik" in clean_cell.lower() or "božić" in clean_cell.lower():
                            continue
                            
                        room_match = re.search(r'(U\d+-\d+)', clean_cell)
                        room = room_match.group(1) if room_match else "Dvorana navedena u rasporedu"
                        
                        event_type = "Predavanje"
                        if "lab." in clean_cell.lower():
                            event_type = "Laboratorijske vježbe"
                        elif "aud." in clean_cell.lower():
                            event_type = "Auditorne vježbe"
                            
                        group_match = re.search(r'GR\s*([A-C])', clean_cell, re.IGNORECASE)
                        group = f"Grupa {group_match.group(1).upper()}" if group_match else "Sve grupe"
                        is_meh = "+MEH" in clean_cell or "MEH" in clean_cell
                        
                        course_name = clean_cell
                        for short_name, full_name in SUBJECT_MAPPING.items():
                            if short_name.lower() in clean_cell.lower():
                                course_name = full_name
                                break

                        all_events.append({
                            "course": course_name,
                            "type": event_type,
                            "room": room,
                            "group": group,
                            "withMechatronics": is_meh
                        })
    return all_events

def get_hzpp_timetable():
    return {
        "ludbreg_to_varazdin": [
            {"departure": "06:14", "arrival": "06:42", "type": "Vlak", "trainNo": "780"},
            {"departure": "07:05", "arrival": "07:35", "type": "Zamjenski autobus", "trainNo": "BUS-3602"},
            {"departure": "09:20", "arrival": "09:48", "type": "Vlak", "trainNo": "3604"},
            {"departure": "11:15", "arrival": "11:43", "type": "Vlak", "trainNo": "3606"},
            {"departure": "13:25", "arrival": "13:54", "type": "Zamjenski autobus", "trainNo": "BUS-3608"},
            {"departure": "15:10", "arrival": "15:38", "type": "Vlak", "trainNo": "3610"}
        ],
        "varazdin_to_ludbreg": [
            {"departure": "12:15", "arrival": "12:43", "type": "Vlak", "trainNo": "3607"},
            {"departure": "14:20", "arrival": "14:50", "type": "Zamjenski autobus", "trainNo": "BUS-3609"},
            {"departure": "15:35", "arrival": "16:03", "type": "Vlak", "trainNo": "3611"},
            {"departure": "16:40", "arrival": "17:08", "type": "Vlak", "trainNo": "783"},
            {"departure": "18:25", "arrival": "18:55", "type": "Zamjenski autobus", "trainNo": "BUS-3615"}
        ]
    }

def upload_to_firestore(schedule, transit):
    secret = os.environ.get("FIREBASE_SERVICE_ACCOUNT")
    if not secret:
        print("Lokalno spremanje u data.json...")
        with open("data.json", "w", encoding="utf-8") as f:
            json.dump({"schedule": schedule, "transit": transit}, f, ensure_ascii=False, indent=2)
        return

    cred = credentials.Certificate(json.loads(secret))
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    db.collection("student_data").document("current").set({
        "updatedAt": firestore.SERVER_TIMESTAMP,
        "schedule": schedule,
        "transit": transit
    })
    print("[Firebase] Podaci uspješno ažurirani u Firestoreu!")

if __name__ == "__main__":
    pdf_url = get_unin_pdf_url()
    r = requests.get(pdf_url)
    with open("temp.pdf", "wb") as f:
        f.write(r.content)
    schedule = parse_pdf("temp.pdf")
    transit = get_hzpp_timetable()
    upload_to_firestore(schedule, transit)