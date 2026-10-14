// Firebase konfiguracija iz tvog projekta
const firebaseConfig = {
    apiKey: "AIzaSyAn5aI0Rsna-cCtd_TyxAFWdnjS8TB_7v8",
    authDomain: "moja-watch-lista.firebaseapp.com",
    projectId: "moja-watch-lista"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Elementi
const groupSelect = document.getElementById("groupSelect");
const morningTransitEl = document.getElementById("morning-transit-info");
const eveningTransitEl = document.getElementById("evening-transit-info");
const scheduleContainer = document.getElementById("schedule-container");
const themeToggleButton = document.getElementById("theme-toggle-button");
const scheduleDayTitle = document.getElementById("schedule-day-title");

let currentView = "danas";
let userGroup = localStorage.getItem("unin_user_group") || "Sve grupe";
groupSelect.value = userGroup;

// Odabir grupe
groupSelect.addEventListener("change", (e) => {
    userGroup = e.target.value;
    localStorage.setItem("unin_user_group", userGroup);
    fetchData();
});

// Promjena teme (Dark / Light)
themeToggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    themeToggleButton.querySelector("i").className = newTheme === "dark" ? "bi bi-brightness-high-fill" : "bi bi-moon-stars-fill";
});

// Gumbi za dane
document.getElementById("btn-today").addEventListener("click", (e) => setDayView("danas", e.target));
document.getElementById("btn-tomorrow").addEventListener("click", (e) => setDayView("sutra", e.target));
document.getElementById("btn-week").addEventListener("click", (e) => setDayView("tjedan", e.target));

function setDayView(view, btn) {
    currentView = view;
    document.querySelectorAll(".day-picker button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (view === "danas") scheduleDayTitle.textContent = "Današnji Raspored";
    if (view === "sutra") scheduleDayTitle.textContent = "Sutrašnji Raspored";
    if (view === "tjedan") scheduleDayTitle.textContent = "Tjedni Pregled Predavanja";
    fetchData();
}

// Dohvat podataka iz Firestorea
async function fetchData() {
    try {
        const doc = await db.collection("student_data").document("current").get();
        if (doc.exists) {
            const data = doc.data();
            renderSchedule(data.schedule || []);
            renderTransit(data.transit || {});
        } else {
            renderMockData();
        }
    } catch (error) {
        console.warn("Firestore dohvat nije uspio, prikazujem lokalne podatke:", error);
        renderMockData();
    }
}

function renderSchedule(events) {
    scheduleContainer.innerHTML = "";

    // Filtriraj po korisnikovoj grupi
    const filtered = events.filter(ev => {
        if (userGroup === "Sve grupe") return true;
        return ev.group === "Sve grupe" || ev.group === userGroup;
    });

    if (filtered.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-calendar-x fs-1 mb-2 d-block"></i>
                Nema zakazanih predavanja za odabranu grupu (${userGroup}).
            </div>`;
        return;
    }

    filtered.forEach(ev => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="glass-effect p-3 rounded-4 lecture-card h-100">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-primary-subtle text-primary">${ev.type}</span>
                    <span class="badge bg-secondary-subtle text-light">
                        <i class="bi bi-door-open me-1"></i>${ev.room}
                    </span>
                </div>
                <h5 class="fw-bold mb-1 fs-6">${ev.course}</h5>
                <div class="d-flex gap-2 align-items-center mt-3">
                    <small class="text-muted"><i class="bi bi-people me-1"></i>${ev.group}</small>
                    ${ev.withMechatronics ? '<span class="badge badge-meh ms-auto">+ Mehatronika</span>' : ''}
                </div>
            </div>`;
        scheduleContainer.appendChild(col);
    });
}

function renderTransit(transit) {
    const l2v = transit.ludbreg_to_varazdin || [];
    const v2l = transit.varazdin_to_ludbreg || [];

    // Preporučeni vlak/autobus za dolazak (npr. linija koja stiže prije predavanja)
    const morning = l2v[1] || l2v[0];
    if (morning) {
        const isBus = morning.type.toLowerCase().includes("autobus");
        morningTransitEl.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="mb-0 fw-bold">${morningOptionTime(morning)}</h5>
                    <small class="text-muted">
                        <i class="bi ${isBus ? 'bi-bus-front text-warning' : 'bi-train-front text-success'} me-1"></i>
                        ${morning.type} (${morning.trainNo})
                    </small>
                </div>
                <div class="text-end">
                    <span class="badge bg-success">Optimalno</span>
                    <small class="d-block text-secondary mt-1">Stižeš 30 min prije</small>
                </div>
            </div>`;
    }

    // Preporučeni vlak za odlazak
    const evening = v2l[2] || v2l[0];
    if (evening) {
        const isBus = evening.type.toLowerCase().includes("autobus");
        eveningTransitEl.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="mb-0 fw-bold">${morningOptionTime(evening)}</h5>
                    <small class="text-muted">
                        <i class="bi ${isBus ? 'bi-bus-front text-warning' : 'bi-train-front text-info'} me-1"></i>
                        ${evening.type} (${evening.trainNo})
                    </small>
                </div>
                <div class="text-end">
                    <span class="badge bg-info">Povratak</span>
                    <small class="d-block text-secondary mt-1">30 min hod do stanice</small>
                </div>
            </div>`;
    }
}

function morningOptionTime(item) {
    return `${item.departure} <i class="bi bi-arrow-right small text-muted"></i> ${item.arrival}`;
}

// Podaci ako baza još nije popunjena
function renderMockData() {
    renderSchedule([
        { course: "Energetska elektronika", type: "Predavanje", room: "U1-23", group: "Sve grupe", withMechatronics: false },
        { course: "Automatsko upravljanje (ASU)", type: "Laboratorijske vježbe", room: "U1-10", group: "Grupa A", withMechatronics: false },
        { course: "Automatski strojevi i uređaji", type: "Predavanje", room: "U1-1", group: "Sve grupe", withMechatronics: true }
    ]);
    renderTransit({
        ludbreg_to_varazdin: [{ departure: "07:05", arrival: "07:35", type: "Zamjenski autobus", trainNo: "BUS-3602" }],
        varazdin_to_ludbreg: [{ departure: "15:35", arrival: "16:03", type: "Vlak", trainNo: "3611" }]
    });
}

// Pokretanje
fetchData();

// Registracija Service Workera za PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW failed', err));
    });
}