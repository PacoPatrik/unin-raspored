// 1. SLUŽBENI VOZNI RED VLAKOVA (HŽPP)
const TRAINS_L2V = [
    { no: "3600", dep: "04:33", arr: "05:01", dur: 28 },
    { no: "3602", dep: "05:56", arr: "06:24", dur: 28 },
    { no: "3604", dep: "07:06", arr: "07:33", dur: 27 },
    { no: "3606", dep: "08:44", arr: "09:11", dur: 27 },
    { no: "3608", dep: "09:46", arr: "10:13", dur: 27 },
    { no: "3610", dep: "12:08", arr: "12:35", dur: 27 },
    { no: "6400", dep: "13:42", arr: "14:09", dur: 27 },
    { no: "3612", dep: "15:16", arr: "15:43", dur: 27 },
    { no: "3614", dep: "16:29", arr: "16:55", dur: 26 },
    { no: "792",  dep: "17:22", arr: "17:45", dur: 23 },
    { no: "3616", dep: "18:33", arr: "19:00", dur: 27 },
    { no: "3618", dep: "19:49", arr: "20:16", dur: 27 },
    { no: "3620", dep: "21:03", arr: "21:30", dur: 27 }
];

const TRAINS_V2L = [
    { no: "3601", dep: "04:02", arr: "04:29", dur: 27 },
    { no: "793",  dep: "05:06", arr: "05:29", dur: 23 },
    { no: "3603", dep: "06:38", arr: "07:04", dur: 26 },
    { no: "3605", dep: "07:50", arr: "08:16", dur: 26 },
    { no: "3607", dep: "10:22", arr: "10:48", dur: 26 },
    { no: "3609", dep: "12:46", arr: "13:12", dur: 26 },
    { no: "6401", dep: "14:47", arr: "15:14", dur: 27 },
    { no: "3611", dep: "16:00", arr: "16:27", dur: 27 },
    { no: "3615", dep: "18:02", arr: "18:29", dur: 27 },
    { no: "6403", dep: "19:21", arr: "19:47", dur: 26 },
    { no: "3617", dep: "22:18", arr: "22:44", dur: 26 }
];

function toMinutes(timeStr) {
    const parts = timeStr.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
}

function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// 2. DETALJNI RASPORED (SVIH 16 STRANICA PDF-A)
const WEEKS = [
    {
        label: "1. Tjedan (05.10. - 10.10.)",
        days: {
            0: [],
            1: [
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false }
            ],
            2: [
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true }
            ],
            3: [
                { start: "08:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false }
            ]
        }
    },
    {
        label: "2. Tjedan (12.10. - 17.10.)",
        days: {
            0: [],
            1: [
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false }
            ],
            2: [
                { start: "08:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Razvod električne energije", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true }
            ],
            3: [
                { start: "08:00", end: "10:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false }
            ]
        }
    },
    {
        label: "3. & 4. Tjedan (19.10. - 31.10.)",
        days: {
            0: [],
            1: [
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false }
            ],
            2: [
                { start: "08:00", end: "10:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true }
            ],
            3: [
                { start: "08:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Razvod električne energije", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false }
            ]
        }
    },
    {
        label: "5. Tjedan (Laboratoriji: 02.11. - 07.11.)",
        days: {
            0: [],
            1: [
                { start: "08:00", end: "10:00", course: "Automatsko upravljanje (ASU)", type: "Laboratorij", room: "U1-10", grp: "A", meh: false },
                { start: "08:00", end: "10:00", course: "Osnove robotike (OR)", type: "Laboratorij", room: "U2-211", grp: "C", meh: false },
                { start: "10:00", end: "11:30", course: "Automatsko upravljanje (ASU)", type: "Laboratorij", room: "U1-10", grp: "B", meh: false },
                { start: "10:00", end: "11:30", course: "Osnove robotike (OR)", type: "Laboratorij", room: "U2-211", grp: "A", meh: false },
                { start: "11:30", end: "13:00", course: "Automatsko upravljanje (ASU)", type: "Laboratorij", room: "U1-10", grp: "C", meh: false },
                { start: "11:30", end: "13:00", course: "Osnove robotike (OR)", type: "Laboratorij", room: "U2-211", grp: "B", meh: false },
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false }
            ],
            2: [
                { start: "08:00", end: "10:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true }
            ],
            3: [
                { start: "08:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-1", grp: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Razvod električne energije", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", grp: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", grp: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", grp: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", grp: "Sve", meh: false }
            ]
        }
    },
    {
        label: "6. Tjedan (09.11. - 14.11.) - Kolokviji",
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    },
    {
        label: "7. Tjedan (16.11. - 21.11.) - Praznik",
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    },
    {
        label: "8. - 11. Tjedan (23.11. - 19.12.) - DVK Lab",
        days: {
            0: [],
            1: [
                { start: "16:30", end: "18:30", course: "Digitalne videokomunikacije", type: "Laboratorij", room: "U1-9", grp: "Sve", meh: false }
            ],
            2: [], 3: [], 4: []
        }
    },
    {
        label: "12. Tjedan (21.12. - 26.12.) - Božićni tjedan",
        days: {
            0: [],
            1: [
                { start: "16:30", end: "18:30", course: "Digitalne videokomunikacije", type: "Laboratorij", room: "U1-9", grp: "Sve", meh: false }
            ],
            2: [], 3: [], 4: []
        }
    },
    {
        label: "13. Tjedan (04.01. - 09.01.) - Nova Godina / Praznici",
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    },
    {
        label: "14. - 16. Tjedan (11.01. - 30.01.) - Završni tjedni",
        days: {
            0: [],
            1: [
                { start: "16:30", end: "18:30", course: "Digitalne videokomunikacije", type: "Laboratorij", room: "U1-9", grp: "Sve", meh: false }
            ],
            2: [], 3: [], 4: []
        }
    }
];

// 3. LOGIKA ZA PRORAČUN VLAKOVA I BIJEGA
function getTransit(firstStart, lastEnd) {
    if (!firstStart || !lastEnd) return null;

    const startMin = toMinutes(firstStart);
    const endMin = toMinutes(lastEnd);

    // Odlazak (Stiže na kolodvor 25-30 min prije predavanja)
    let morningTrain = null;
    for (const t of TRAINS_L2V) {
        if (toMinutes(t.arr) <= startMin - 20) {
            morningTrain = t;
        } else {
            break;
        }
    }
    if (!morningTrain) morningTrain = TRAINS_L2V[0];

    // Redovni povratak: Ostaješ do kraja + 30 min hoda do stanice
    const regularStationArrival = endMin + 30;
    let eveningTrain = TRAINS_V2L.find(t => toMinutes(t.dep) >= regularStationArrival);
    if (!eveningTrain) eveningTrain = TRAINS_V2L[TRAINS_V2L.length - 1];

    // RANI BIJEG (Bježiš 30 min ranije):
    // Ako predavanje završava u 16:00, bježiš u 15:30.
    // 15:30 + 30 min hoda = na stanici si točno u 16:00!
    const earlyStationArrival = endMin;
    let earlyTrain = TRAINS_V2L.find(t => toMinutes(t.dep) >= earlyStationArrival && toMinutes(t.dep) < toMinutes(eveningTrain.dep));

    return {
        morning: morningTrain,
        evening: eveningTrain,
        early: earlyTrain
    };
}

// 4. STANJE I INTERAKCIJA
let activeWeek = 0;
let activeDay = 1; // Default Utorak
let activeGroup = localStorage.getItem("unin_grp") || "A";

const weekSelect = document.getElementById("week-select");
const daysNav = document.getElementById("days-nav");
const groupButtons = document.getElementById("group-buttons");
const lecturesList = document.getElementById("lectures-list");
const selectedDayHeading = document.getElementById("selected-day-heading");
const lectureCountBadge = document.getElementById("lecture-count");

const morningTimeEl = document.getElementById("morning-time");
const morningDescEl = document.getElementById("morning-desc");
const morningStatusEl = document.getElementById("morning-status");

const eveningTimeEl = document.getElementById("evening-time");
const eveningDescEl = document.getElementById("evening-desc");
const eveningStatusEl = document.getElementById("evening-status");

const earlyTimeEl = document.getElementById("early-time");
const earlyDescEl = document.getElementById("early-desc");
const earlyBadgeEl = document.getElementById("early-badge");

// Popunjavanje padajućeg izbornika tjedana
if (weekSelect) {
    weekSelect.innerHTML = "";
    WEEKS.forEach((w, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = w.label;
        weekSelect.appendChild(opt);
    });
}

// Označi spremljenu grupu
document.querySelectorAll(".grp-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.grp === activeGroup);
});

// Event Listeneri
if (weekSelect) {
    weekSelect.addEventListener("change", (e) => {
        activeWeek = Number(e.target.value);
        updateDots();
        render();
    });
}

if (daysNav) {
    daysNav.addEventListener("click", (e) => {
        const tab = e.target.closest(".day-tab");
        if (!tab) return;
        document.querySelectorAll(".day-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeDay = Number(tab.dataset.day);
        render();
    });
}

if (groupButtons) {
    groupButtons.addEventListener("click", (e) => {
        const btn = e.target.closest(".grp-btn");
        if (!btn) return;
        document.querySelectorAll(".grp-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeGroup = btn.dataset.grp;
        localStorage.setItem("unin_grp", activeGroup);
        updateDots();
        render();
    });
}

function updateDots() {
    [0, 1, 2, 3, 4].forEach(d => {
        const raw = (WEEKS[activeWeek] && WEEKS[activeWeek].days[d]) ? WEEKS[activeWeek].days[d] : [];
        const filtered = raw.filter(l => activeGroup === "Sve" || l.grp === "Sve" || l.grp === activeGroup);
        const dot = document.getElementById(`dot-${d}`);
        if (dot) dot.classList.toggle("has-class", filtered.length > 0);
    });
}

function render() {
    const dayNames = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
    if (selectedDayHeading) {
        selectedDayHeading.textContent = `${dayNames[activeDay]} • ${WEEKS[activeWeek].label}`;
    }

    const raw = (WEEKS[activeWeek] && WEEKS[activeWeek].days[activeDay]) ? WEEKS[activeWeek].days[activeDay] : [];
    const lectures = raw.filter(l => activeGroup === "Sve" || l.grp === "Sve" || l.grp === activeGroup);

    if (lectureCountBadge) {
        lectureCountBadge.textContent = `${lectures.length} ${lectures.length === 1 ? 'predavanje' : 'predavanja'}`;
    }

    if (lecturesList) {
        lecturesList.innerHTML = "";
    }

    // SLOBODAN DAN
    if (lectures.length === 0) {
        if (lecturesList) {
            lecturesList.innerHTML = `
                <div class="empty-day">
                    <h5 class="fw-bold mb-1 text-light"><i class="bi bi-cup-hot-fill text-warning me-2"></i>Slobodan dan!</h5>
                    <p class="text-muted">Nema predavanja prema odabranoj Grupi ${activeGroup}.</p>
                </div>`;
        }
        if (morningTimeEl) morningTimeEl.textContent = "--:-- ➔ --:--";
        if (morningDescEl) morningDescEl.textContent = "Nema nastave";
        if (morningStatusEl) morningStatusEl.textContent = "Slobodno";

        if (eveningTimeEl) eveningTimeEl.textContent = "--:-- ➔ --:--";
        if (eveningDescEl) eveningDescEl.textContent = "Nema nastave";
        if (eveningStatusEl) eveningStatusEl.textContent = "Slobodno";

        if (earlyTimeEl) earlyTimeEl.textContent = "--:-- ➔ --:--";
        if (earlyDescEl) earlyDescEl.textContent = "Nema potrebe za bijegom";
        return;
    }

    // PRIKAZ PREDAVANJA S PUNIM BOJAMA
    lectures.forEach(l => {
        let typeClass = "predavanje";
        let tagBadgeClass = "tag-pred";
        if (l.type.toLowerCase().includes("lab")) {
            typeClass = "laboratorij";
            tagBadgeClass = "tag-lab";
        } else if (l.type.toLowerCase().includes("aud")) {
            typeClass = "auditorne";
            tagBadgeClass = "tag-aud";
        }

        const card = document.createElement("div");
        card.className = `lecture-card ${typeClass}`;
        card.innerHTML = `
            <div class="lecture-time-box">
                <span class="time-start">${l.start}</span>
                <span class="time-end">do ${l.end}</span>
            </div>
            <div class="lecture-content">
                <h5 class="course-title">${l.course}</h5>
                <div class="d-flex gap-2 flex-wrap align-items-center">
                    <span class="badge-tag tag-room"><i class="bi bi-door-closed-fill me-1"></i>${l.room}</span>
                    <span class="badge-tag ${tagBadgeClass}">${l.type}</span>
                    <span class="badge-tag tag-grp">Grupa ${l.grp}</span>
                    ${l.meh ? '<span class="badge-tag tag-meh">+ MEHATRONIKA</span>' : ''}
                </div>
            </div>`;
        if (lecturesList) lecturesList.appendChild(card);
    });

    // PRORAČUN VLAKOVA
    const first = lectures[0];
    const last = lectures[lectures.length - 1];
    const transit = getTransit(first.start, last.end);

    if (transit) {
        // Odlazak
        if (morningTimeEl) morningTimeEl.textContent = `${transit.morning.dep} ➔ ${transit.morning.arr}`;
        if (morningDescEl) morningDescEl.textContent = `Vlak ${transit.morning.no} • vožnja ${transit.morning.dur} min`;
        if (morningStatusEl) morningStatusEl.textContent = `Nastava počinje u ${first.start}`;

        // Redovni
        if (eveningTimeEl) eveningTimeEl.textContent = `${transit.evening.dep} ➔ ${transit.evening.arr}`;
        if (eveningDescEl) eveningDescEl.textContent = `Vlak ${transit.evening.no} • na stanici si u ${toMinutes(last.end) + 30 > 1440 ? 'sutra' : formatTime(toMinutes(last.end) + 30)}`;
        if (eveningStatusEl) eveningStatusEl.textContent = `Kraj u ${last.end}`;

        // RANI BIJEG (30 min ranije)
        if (transit.early) {
            if (earlyTimeEl) earlyTimeEl.textContent = `${transit.early.dep} ➔ ${transit.early.arr}`;
            if (earlyDescEl) earlyDescEl.textContent = `Vlak ${transit.early.no} (bježiš u ${formatTime(toMinutes(last.end) - 30)})`;
            if (earlyBadgeEl) earlyBadgeEl.textContent = `Ušteda vremena!`;
        } else {
            if (earlyTimeEl) earlyTimeEl.textContent = `${transit.evening.dep} ➔ ${transit.evening.arr}`;
            if (earlyDescEl) earlyDescEl.textContent = `Nema ranijeg vlaka (ide isti kao redovni)`;
            if (earlyBadgeEl) earlyBadgeEl.textContent = `Isti vlak`;
        }
    }
}

// Cijela tablica vlakova u harmonici
const tableL2V = document.getElementById("table-l2v");
if (tableL2V) {
    tableL2V.innerHTML = "";
    TRAINS_L2V.forEach(t => {
        tableL2V.innerHTML += `<div class="row-train"><span>Vlak ${t.no}</span><strong>${t.dep} ➔ ${t.arr}</strong><span>${t.dur} min</span></div>`;
    });
}

const tableV2L = document.getElementById("table-v2l");
if (tableV2L) {
    tableV2L.innerHTML = "";
    TRAINS_V2L.forEach(t => {
        tableV2L.innerHTML += `<div class="row-train"><span>Vlak ${t.no}</span><strong>${t.dep} ➔ ${t.arr}</strong><span>${t.dur} min</span></div>`;
    });
}

// Pokretanje
updateDots();
render();