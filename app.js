// ==========================================
// 1. TOČAN VOZNI RED VLAKOVA (HŽPP)
// ==========================================
const TRAINS_LUDBREG_TO_VARAZDIN = [
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

const TRAINS_VARAZDIN_TO_LUDBREG = [
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

// Pomoćna funkcija: pretvara "HH:MM" u minute od ponoći
function timeToMins(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

// ==========================================
// 2. CJELOKUPNI SEMESTAR IZ TVOG PDF-A (16 STRANICA)
// ==========================================
const WEEKS_DATA = [
    {
        name: "1. Tjedan (05.10. - 10.10.)",
        days: {
            0: [], // Pon
            1: [   // Uto
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false }
            ],
            2: [   // Sri
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", group: "Sve", meh: true }
            ],
            3: [   // Čet
                { start: "08:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", group: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: true }
            ],
            4: [   // Pet
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false }
            ]
        }
    },
    {
        name: "2. Tjedan (12.10. - 17.10.)",
        days: {
            0: [],
            1: [
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false }
            ],
            2: [
                { start: "09:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Razvod električne energije", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", group: "Sve", meh: true }
            ],
            3: [
                { start: "09:00", end: "10:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", group: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false }
            ]
        }
    },
    {
        name: "3. & 4. Tjedan (19.10. - 31.10.)",
        days: {
            0: [],
            1: [
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false }
            ],
            2: [
                { start: "09:00", end: "10:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", group: "Sve", meh: true }
            ],
            3: [
                { start: "09:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Razvod električne energije", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", group: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false }
            ]
        }
    },
    {
        name: "5. Tjedan - Laboratoriji (02.11. - 07.11.)",
        days: {
            0: [],
            1: [
                { start: "08:00", end: "10:00", course: "Automatsko upravljanje (ASU)", type: "Laboratorijske vježbe", room: "U1-10", group: "A", meh: false },
                { start: "08:00", end: "10:00", course: "Osnove robotike (OR)", type: "Laboratorijske vježbe", room: "U2-211", group: "C", meh: false },
                { start: "10:00", end: "11:30", course: "Automatsko upravljanje (ASU)", type: "Laboratorijske vježbe", room: "U1-10", group: "B", meh: false },
                { start: "10:00", end: "11:30", course: "Osnove robotike (OR)", type: "Laboratorijske vježbe", room: "U2-211", group: "A", meh: false },
                { start: "11:30", end: "13:00", course: "Automatsko upravljanje (ASU)", type: "Laboratorijske vježbe", room: "U1-10", group: "C", meh: false },
                { start: "11:30", end: "13:00", course: "Osnove robotike (OR)", type: "Laboratorijske vježbe", room: "U2-211", group: "B", meh: false },
                { start: "13:00", end: "15:00", course: "Automatsko upravljanje", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "15:00", end: "16:00", course: "Digitalne videokomunikacije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false }
            ],
            2: [
                { start: "09:00", end: "10:00", course: "Energetska elektronika", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Energetska elektronika", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Procesna instrumentacija", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "13:00", end: "14:00", course: "Procesna instrumentacija", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false },
                { start: "14:00", end: "16:00", course: "Osnove robotike", type: "Predavanje", room: "U1-1", group: "Sve", meh: true }
            ],
            3: [
                { start: "09:00", end: "10:00", course: "Razvod električne energije", type: "Predavanje", room: "U1-1", group: "Sve", meh: false },
                { start: "10:00", end: "11:00", course: "Razvod električne energije", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", group: "Sve", meh: true },
                { start: "13:00", end: "14:00", course: "Automatski strojevi i uređaji", type: "Auditorne vježbe", room: "U1-1", group: "Sve", meh: true }
            ],
            4: [
                { start: "10:00", end: "11:00", course: "Električni strojevi", type: "Predavanje", room: "U1-23", group: "Sve", meh: false },
                { start: "11:00", end: "13:00", course: "Električni strojevi", type: "Auditorne vježbe", room: "U1-23", group: "Sve", meh: false }
            ]
        }
    },
    {
        name: "6. Tjedan (09.11. - 14.11.) - Kolokviji",
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    },
    {
        name: "7. Tjedan (16.11. - 21.11.) - Praznik",
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    },
    {
        name: "8. - 11. Tjedan (23.11. - 19.12.)",
        days: {
            0: [],
            1: [
                { start: "17:00", end: "19:00", course: "Digitalne videokomunikacije", type: "Laboratorijske vježbe", room: "U1-9", group: "Sve", meh: false }
            ],
            2: [], 3: [], 4: []
        }
    },
    {
        name: "12. Tjedan - Božić (21.12. - 26.12.)",
        days: {
            0: [],
            1: [
                { start: "17:00", end: "19:00", course: "Digitalne videokomunikacije", type: "Laboratorijske vježbe", room: "U1-9", group: "Sve", meh: false }
            ],
            2: [], 3: [], 4: []
        }
    },
    {
        name: "13. Tjedan - Nova Godina / Praznici",
        days: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    },
    {
        name: "14. - 16. Tjedan (11.01. - 30.01.)",
        days: {
            0: [],
            1: [
                { start: "17:00", end: "19:00", course: "Digitalne videokomunikacije", type: "Laboratorijske vježbe", room: "U1-9", group: "Sve", meh: false }
            ],
            2: [], 3: [], 4: []
        }
    }
];

// ==========================================
// 3. LOGIKA ZA PRORAČUN VLAKOVA
// ==========================================
const WALK_BUFFER_MINUTES = 30; // 30 min hoda od/do kolodvora VŽ

// Pronađi vlak za dolazak na faks
function getOptimalMorningTrain(firstLectureStartTime) {
    if (!firstLectureStartTime) return null;
    const lectureStartMin = timeToMins(firstLectureStartTime);

    // Moramo stići na kolodvor najkasnije: (početak predavanja - 30 min hoda)
    const idealArrivalLimit = lectureStartMin - WALK_BUFFER_MINUTES;

    // Pronađi zadnji vlak koji stiže prije tog roka
    let chosen = null;
    for (const train of TRAINS_LUDBREG_TO_VARAZDIN) {
        const trainArrMin = timeToMins(train.arr);
        if (trainArrMin <= idealArrivalLimit) {
            chosen = train;
        } else {
            break;
        }
    }

    // Ako nema vlaka unutar limita, uzmi prvi jutarnji
    if (!chosen) chosen = TRAINS_LUDBREG_TO_VARAZDIN[0];

    const arrivalMin = timeToMins(chosen.arr);
    const timeAtUni = arrivalMin + WALK_BUFFER_MINUTES;
    const diff = lectureStartMin - timeAtUni;

    return {
        train: chosen,
        status: diff >= 0 ? `Stižeš na faks ${diff} min prije početka` : `Kasniš ${Math.abs(diff)} min!`,
        isTight: diff < 5
    };
}

// Pronađi vlak za odlazak s faksa za Ludbreg
function getOptimalEveningTrain(lastLectureEndTime) {
    if (!lastLectureEndTime) return null;
    const lectureEndMin = timeToMins(lastLectureEndTime);

    // Na kolodvor stižemo u: (kraj predavanja + 30 min hoda)
    const stationArrivalMin = lectureEndMin + WALK_BUFFER_MINUTES;

    // Redovni vlak nakon kraja nastave
    let normalTrain = TRAINS_VARAZDIN_TO_LUDBREG.find(t => timeToMins(t.dep) >= stationArrivalMin);

    // Opcija ako pobjegne 30 min ranije s predavanja
    const earlyWalkMin = lectureEndMin; // odlazi 30 min prije pa stiže na stanicu točno kad predavanje završava
    let earlyTrain = TRAINS_VARAZDIN_TO_LUDBREG.find(t => timeToMins(t.dep) >= earlyWalkMin && (!normalTrain || timeToMins(t.dep) < timeToMins(normalTrain.dep)));

    return {
        recommended: normalTrain || TRAINS_VARAZDIN_TO_LUDBREG[TRAINS_VARAZDIN_TO_LUDBREG.length - 1],
        earlyOption: earlyTrain || null
    };
}

// ==========================================
// 4. RENDERING I EVENTI
// ==========================================
let selectedWeekIndex = 0;
let selectedDayIndex = 1; // Default Utorak
let currentGroup = localStorage.getItem("unin_user_group") || "A";

const weekSelect = document.getElementById("weekSelect");
const groupSelect = document.getElementById("groupSelect");
const dayButtonsContainer = document.getElementById("dayButtons");
const lecturesContainer = document.getElementById("lectures-container");
const currentDayLabel = document.getElementById("current-day-label");
const totalLecturesCount = document.getElementById("total-lectures-count");
const morningResultEl = document.getElementById("morning-train-result");
const eveningResultEl = document.getElementById("evening-train-result");
const badgeMorning = document.getElementById("badge-morning-target");
const badgeEvening = document.getElementById("badge-evening-target");

// Popuni dropdown tjedana
WEEKS_DATA.forEach((w, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = w.name;
    weekSelect.appendChild(opt);
});

groupSelect.value = currentGroup;

// Promjena tjedna
weekSelect.addEventListener("change", (e) => {
    selectedWeekIndex = Number(e.target.value);
    renderApp();
});

// Promjena grupe
groupSelect.addEventListener("change", (e) => {
    currentGroup = e.target.value;
    localStorage.setItem("unin_user_group", currentGroup);
    renderApp();
});

// Promjena dana
dayButtonsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    document.querySelectorAll("#dayButtons button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDayIndex = Number(btn.dataset.day);
    renderApp();
});

function renderApp() {
    const dayNames = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
    currentDayLabel.textContent = `${dayNames[selectedDayIndex]} - ${WEEKS_DATA[selectedWeekIndex].name}`;

    const rawLectures = WEEKS_DATA[selectedWeekIndex].days[selectedDayIndex] || [];

    // Filtriraj po grupi
    const lectures = rawLectures.filter(l => {
        if (currentGroup === "Sve") return true;
        return l.group === "Sve" || l.group === currentGroup;
    });

    totalLecturesCount.textContent = `${lectures.length} ${lectures.length === 1 ? 'predavanje' : 'predavanja'}`;

    // Prikaz predavanja
    lecturesContainer.innerHTML = "";
    if (lectures.length === 0) {
        lecturesContainer.innerHTML = `
            <div class="col-12 text-center py-5 text-muted glass-effect rounded-4">
                <i class="bi bi-cup-hot fs-1 mb-2 d-block text-warning"></i>
                <h5 class="fw-bold">Nema predavanja na ovaj dan!</h5>
                <p class="small mb-0">Nema nastave ili si slobodan prema odabranoj Grupi ${currentGroup}.</p>
            </div>`;
        morningResultEl.innerHTML = `<p class="text-muted small mb-0">Nema nastave - nema potrebe za vlakom.</p>`;
        eveningResultEl.innerHTML = `<p class="text-muted small mb-0">Nema nastave.</p>`;
        badgeMorning.textContent = "-";
        badgeEvening.textContent = "-";
        return;
    }

    lectures.forEach(l => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="glass-effect p-3 rounded-4 lecture-card h-100 border-start border-4 border-primary">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-primary-subtle text-primary fw-bold">${l.start} - ${l.end}</span>
                    <span class="badge bg-secondary-subtle text-light"><i class="bi bi-door-closed me-1"></i>${l.room}</span>
                </div>
                <h6 class="fw-bold mb-2">${l.course}</h6>
                <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary-subtle small">
                    <span class="text-muted">${l.type}</span>
                    <div>
                        ${l.meh ? '<span class="badge bg-warning text-dark me-1">+MEH</span>' : ''}
                        <span class="badge bg-info text-dark">Gr. ${l.group}</span>
                    </div>
                </div>
            </div>`;
        lecturesContainer.appendChild(col);
    });

    // Proračun za vlakove
    const firstLecture = lectures[0];
    const lastLecture = lectures[lectures.length - 1];

    badgeMorning.textContent = `1. sat u ${firstLecture.start}`;
    badgeEvening.textContent = `Zadnji sat do ${lastLecture.end}`;

    const morning = getOptimalMorningTrain(firstLecture.start);
    if (morning) {
        morningResultEl.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="fw-bold mb-0 text-success">${morning.train.dep} ➔ ${morning.train.arr}</h5>
                    <small class="text-muted">Vlak br. <strong>${morning.train.no}</strong> (vožnja ${morning.train.dur} min)</small>
                </div>
                <div class="text-end">
                    <span class="badge ${morning.isTight ? 'bg-warning text-dark' : 'bg-success'}">${morning.status}</span>
                    <small class="d-block text-muted mt-1">+30 min hod do faksa</small>
                </div>
            </div>`;
    }

    const evening = getOptimalEveningTrain(lastLecture.end);
    if (evening) {
        let earlyHTML = "";
        if (evening.earlyOption) {
            earlyHTML = `
                <div class="mt-2 pt-2 border-top border-secondary-subtle small">
                    <i class="bi bi-lightning-charge-fill text-warning me-1"></i>
                    Ako pobjegneš 30 min ranije: vlak <strong>${evening.earlyOption.no}</strong> u <strong>${evening.earlyOption.dep}</strong> (stiže ${evening.earlyOption.arr}).
                </div>`;
        }

        eveningResultEl.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="fw-bold mb-0 text-info">${evening.recommended.dep} ➔ ${evening.recommended.arr}</h5>
                    <small class="text-muted">Vlak br. <strong>${evening.recommended.no}</strong> (vožnja ${evening.recommended.dur} min)</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-info">Redovni povratak</span>
                    <small class="d-block text-muted mt-1">30 min hod do kolodvora</small>
                </div>
            </div>
            ${earlyHTML}`;
    }
}

// Popunjavanje cjelokupnog voznog reda u harmoniku
const trainListL2V = document.getElementById("all-trains-l2v");
TRAINS_LUDBREG_TO_VARAZDIN.forEach(t => {
    trainListL2V.innerHTML += `<li class="list-group-item bg-transparent text-light d-flex justify-content-between py-1 px-0"><span>Vlak ${t.no}</span><strong>${t.dep} ➔ ${t.arr}</strong><span>(${t.dur} min)</span></li>`;
});

const trainListV2L = document.getElementById("all-trains-v2l");
TRAINS_VARAZDIN_TO_LUDBREG.forEach(t => {
    trainListV2L.innerHTML += `<li class="list-group-item bg-transparent text-light d-flex justify-content-between py-1 px-0"><span>Vlak ${t.no}</span><strong>${t.dep} ➔ ${t.arr}</strong><span>(${t.dur} min)</span></li>`;
});

// Postavi aktivni dan na Utorak i pokreni
document.querySelector("#dayButtons button[data-day='1']").classList.add("active");
renderApp();