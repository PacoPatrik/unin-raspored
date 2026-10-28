// ============ 1. VOZNI RED (HŽPP) ============
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
const WALK = 30; // minuta pješice kolodvor ⇄ fakultet

const toMin = t => { const [h, m] = t.split(":"); return +h * 60 + +m; };
const fmtMin = m => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// ============ 2. RASPORED (izmjene 22.10.2026.) ============
const P = "Predavanje", A = "Auditorne vježbe", LAB = "Laboratorij";
const C = {
    RE: "Razvod električne energije", EE: "Energetska elektronika", PI: "Procesna instrumentacija",
    OR: "Osnove robotike", AS: "Automatski strojevi i uređaji", ES: "Električni strojevi",
    AU: "Automatsko upravljanje", DVK: "Digitalne videokomunikacije"
};
const L = (start, end, course, type, room, grp = "Sve", meh = false) => ({ start, end, course, type, room, grp, meh });

const tue = () => [L("13:00", "14:30", C.AU, P, "U1-1"), L("14:30", "16:00", C.DVK, P, "U1-1")];
const dvkLab = () => [L("16:00", "19:00", C.DVK, LAB, "U1-9")];
const orLab = () => [L("08:30", "10:30", C.OR, LAB, "U3-211", "A"), L("10:30", "12:30", C.OR, LAB, "U3-211", "B")];
const asuOrLab = () => [
    L("08:00", "09:30", "Automatsko upravljanje (ASU)", LAB, "U1-10", "A"), L("08:00", "09:30", "Osnove robotike (OR)", LAB, "U2-211", "C"),
    L("09:30", "11:00", "Automatsko upravljanje (ASU)", LAB, "U1-10", "B"), L("09:30", "11:00", "Osnove robotike (OR)", LAB, "U2-211", "A"),
    L("11:00", "12:30", "Automatsko upravljanje (ASU)", LAB, "U1-10", "C"), L("11:00", "12:30", "Osnove robotike (OR)", LAB, "U2-211", "B")
];
const wedRest = () => [
    L("11:00", "12:30", C.PI, P, "U1-23"), L("12:30", "14:00", C.PI, A, "U1-23"),
    L("14:00", "16:00", C.OR, P, "U1-1", "Sve", true)
];
const wed = k => [L("08:00", "09:30", C[k], P, "U1-23"), L("09:30", "11:00", C[k], A, "U1-23"), ...wedRest()];
const thu = (k, meh) => [
    L("08:00", "09:30", C[k], P, "U1-1"), L("09:30", "11:00", C[k], A, "U1-1"),
    L("11:00", "12:30", C.AS, P, "U1-1", "Sve", meh), L("12:30", "14:00", C.AS, A, "U1-1", "Sve", meh)
];
const thuWeek1 = () => [
    L("08:00", "09:30", C.RE, P, "U1-1"), L("09:30", "11:00", C.EE, P, "U1-1"),
    L("11:00", "12:30", C.AS, P, "U1-1", "Sve", true), L("12:30", "14:00", C.AS, A, "U1-1", "Sve", true)
];
const fri = () => [L("09:30", "11:00", C.ES, P, "U1-23"), L("11:00", "12:30", C.ES, A, "U1-23")];

// [pon, uto, sri, čet, pet]  ·  tekst = praznik/neradni dan
const WEEKS = [
    { start: "2026-10-05", days: [[], tue(), wedRest(), thuWeek1(), fri()] },
    { start: "2026-10-12", days: [[], tue(), wed("RE"), thu("EE", true), fri()] },
    { start: "2026-10-19", days: [[], tue(), wed("EE"), thu("RE", true), fri()] },
    { start: "2026-10-26", days: [[], [...orLab(), ...tue()], wed("EE"), thu("RE", true), fri()] },
    { start: "2026-11-02", days: [[], [...orLab(), ...tue()], wed("EE"), thu("RE", true), fri()] },
    { start: "2026-11-09", days: [[], [...orLab(), ...tue()], wed("EE"), thu("RE", false), fri()] },
    { start: "2026-11-16", days: [[], [...asuOrLab(), ...tue()], "Praznik", thu("RE", false), fri()] },
    { start: "2026-11-23", days: [[], [...asuOrLab(), ...tue(), ...dvkLab()], wed("EE"), thu("RE", false), fri()] },
    { start: "2026-11-30", days: [[], dvkLab(), [], [], []] },
    { start: "2026-12-07", days: [[], dvkLab(), [], [], []] },
    { start: "2026-12-14", days: [[], dvkLab(), [], [], []] },
    { start: "2026-12-21", days: [[], dvkLab(), [], "Badnjak", "Božić"] },
    { start: "2027-01-04", days: ["Praznik", "Praznik", "Praznik", [], []] },
    { start: "2027-01-11", days: [[], dvkLab(), [], [], []] },
    { start: "2027-01-18", days: [[], dvkLab(), [], [], []] },
    { start: "2027-01-25", days: [[], dvkLab(), [], [], []] }
];

// ============ 3. DATUMI ============
const MONTHS = ["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenoga", "prosinca"];
const DAYS_FULL = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
const DAYS_SHORT = ["PON", "UTO", "SRI", "ČET", "PET"];
const pad = n => String(n).padStart(2, "0");
WEEKS.forEach(w => { const [y, m, d] = w.start.split("-").map(Number); w.date = new Date(y, m - 1, d); });
const dateOf = (wi, di) => { const s = WEEKS[wi].date; return new Date(s.getFullYear(), s.getMonth(), s.getDate() + di); };
const shortDate = d => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.`;
const longDate = d => `${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}.`;
const sameDay = (a, b) => a.toDateString() === b.toDateString();

// ============ 4. VLAKOVI ============
function getTransit(firstStart, lastEnd) {
    const startMin = toMin(firstStart), endMin = toMin(lastEnd);
    let morning = null;
    for (const t of TRAINS_L2V) { if (toMin(t.arr) + WALK <= startMin) morning = t; else break; }
    if (!morning) morning = TRAINS_L2V[0];
    let evening = TRAINS_V2L.find(t => toMin(t.dep) >= endMin + WALK) || TRAINS_V2L[TRAINS_V2L.length - 1];
    // Bijeg 30 min ranije: na kolodvoru si točno u trenutku kraja nastave
    const early = TRAINS_V2L.find(t => toMin(t.dep) >= endMin && toMin(t.dep) < toMin(evening.dep));
    return { morning, evening, early };
}

// ============ 5. STANJE ============
let activeWeek = 0, activeDay = 0, view = "day";
let activeGroup = localStorage.getItem("unin_grp") || "Sve";
const $ = id => document.getElementById(id);

function jumpToToday() {
    const now = new Date();
    let wi = WEEKS.findIndex((w, i) => now >= w.date && now < dateOf(i, 7));
    if (wi < 0) wi = now < WEEKS[0].date ? 0 : WEEKS.length - 1;
    activeWeek = wi;
    const dow = now.getDay(); // 0 = ned
    activeDay = (dow >= 1 && dow <= 5) ? dow - 1 : 0;
}

const lessonsOf = (wi, di) => {
    const d = WEEKS[wi].days[di];
    return Array.isArray(d) ? d.filter(l => activeGroup === "Sve" || l.grp === "Sve" || l.grp === activeGroup) : [];
};
const holidayOf = (wi, di) => typeof WEEKS[wi].days[di] === "string" ? WEEKS[wi].days[di] : null;

const lessonHTML = l => `
    <article class="lesson">
        <div class="when"><b>${l.start}</b><span>${l.end}</span></div>
        <div class="what">
            <h3>${l.course}</h3>
            <p>${l.type} · ${l.room}${l.grp !== "Sve" ? ` · Grupa ${l.grp}` : ""}${l.meh ? " · + Mehatronika" : ""}</p>
        </div>
    </article>`;

// ============ 6. ISCRTAVANJE ============
function renderWeekSelect() {
    $("week-select").innerHTML = WEEKS.map((w, i) =>
        `<option value="${i}">${i + 1}. tjedan · ${shortDate(dateOf(i, 0))} – ${shortDate(dateOf(i, 4))}${dateOf(i, 0).getFullYear() !== 2026 ? "2027." : ""}</option>`).join("");
    $("week-select").value = activeWeek;
}

function renderDays() {
    const today = new Date();
    $("days-nav").innerHTML = DAYS_SHORT.map((n, i) => {
        const d = dateOf(activeWeek, i);
        const has = lessonsOf(activeWeek, i).length > 0;
        return `<button class="day-tab ${i === activeDay ? "active" : ""} ${has ? "has" : ""} ${sameDay(d, today) ? "today" : ""}" data-day="${i}">
            <span class="dn">${n}</span><span class="dd">${d.getDate()}</span><span class="dm">${pad(d.getMonth() + 1)}.</span><span class="dot"></span></button>`;
    }).join("");
}

function renderDay() {
    const d = dateOf(activeWeek, activeDay);
    const lectures = lessonsOf(activeWeek, activeDay);
    const holiday = holidayOf(activeWeek, activeDay);
    $("day-title").textContent = `${DAYS_FULL[activeDay]}, ${longDate(d)}`;
    $("day-meta").textContent = holiday ? holiday : `${lectures.length} ${lectures.length === 1 ? "obveza" : "obveza"}`;

    if (!lectures.length) {
        $("lectures-list").innerHTML = holiday
            ? `<div class="empty"><b>${holiday}</b>Nema nastave.</div>`
            : `<div class="empty"><b>Slobodan dan</b>Nema nastave${activeGroup !== "Sve" ? ` za grupu ${activeGroup}` : ""}.</div>`;
        $("transit-section").hidden = true;
        return;
    }
    $("lectures-list").innerHTML = lectures.map(lessonHTML).join("");

    const first = lectures[0], last = lectures[lectures.length - 1];
    const lastEnd = lectures.reduce((m, l) => toMin(l.end) > toMin(m) ? l.end : m, last.end);
    const t = getTransit(first.start, lastEnd);
    const card = (cls, lbl, time, note) => `<div class="t-card ${cls}"><div class="lbl">${lbl}</div><div class="time">${time}</div><div class="note">${note}</div></div>`;
    const early = t.early;
    $("transit").innerHTML =
        card("", "Odlazak", `${t.morning.dep} → ${t.morning.arr}`, `Vlak ${t.morning.no} · na faksu u ${fmtMin(toMin(t.morning.arr) + WALK)} · nastava u ${first.start}`) +
        card("", "Redovni povratak", `${t.evening.dep} → ${t.evening.arr}`, `Vlak ${t.evening.no} · nastava gotova u ${lastEnd}`) +
        card("hl", "Odlazak 30 min ranije", early ? `${early.dep} → ${early.arr}` : `${t.evening.dep} → ${t.evening.arr}`,
            early ? `Vlak ${early.no} · kreni u ${fmtMin(toMin(lastEnd) - WALK)}` : "Nema ranijeg vlaka, isti kao redovni");
    $("transit-section").hidden = false;
}

function renderWeek() {
    const today = new Date();
    $("view-week").innerHTML = DAYS_FULL.map((n, i) => {
        const d = dateOf(activeWeek, i), ls = lessonsOf(activeWeek, i), h = holidayOf(activeWeek, i);
        return `<div class="wk-day ${sameDay(d, today) ? "today" : ""}">
            <div class="wk-head"><b>${n}</b><span>${longDate(d)}</span></div>
            ${ls.length ? `<div class="wk-lessons">${ls.map(lessonHTML).join("")}</div>` : `<div class="wk-none">${h || "Bez nastave"}</div>`}
        </div>`;
    }).join("");
}

function render() {
    $("week-select").value = activeWeek;
    renderDays();
    $("view-day").hidden = view !== "day";
    $("view-week").hidden = view !== "week";
    $("days-nav").hidden = view !== "day";
    view === "day" ? renderDay() : renderWeek();
}

// ============ 7. INTERAKCIJA ============
$("days-nav").addEventListener("click", e => {
    const b = e.target.closest(".day-tab"); if (!b) return;
    activeDay = +b.dataset.day; render();
});
$("week-select").addEventListener("change", e => { activeWeek = +e.target.value; render(); });
$("prev").addEventListener("click", () => { if (activeWeek > 0) { activeWeek--; render(); } });
$("next").addEventListener("click", () => { if (activeWeek < WEEKS.length - 1) { activeWeek++; render(); } });
$("today").addEventListener("click", () => { jumpToToday(); render(); });
$("view-switch").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    view = b.dataset.view;
    document.querySelectorAll("#view-switch button").forEach(x => x.classList.toggle("active", x === b));
    render();
});
$("group-buttons").addEventListener("click", e => {
    const b = e.target.closest(".grp-btn"); if (!b) return;
    activeGroup = b.dataset.grp;
    localStorage.setItem("unin_grp", activeGroup);
    document.querySelectorAll(".grp-btn").forEach(x => x.classList.toggle("active", x === b));
    render();
});

const trainRows = list => list.map(t => `<div class="row-train"><span>${t.no}</span><strong>${t.dep} → ${t.arr}</strong><span>${t.dur} min</span></div>`).join("");
$("table-l2v").innerHTML = trainRows(TRAINS_L2V);
$("table-v2l").innerHTML = trainRows(TRAINS_V2L);

document.querySelectorAll(".grp-btn").forEach(b => b.classList.toggle("active", b.dataset.grp === activeGroup));
renderWeekSelect();
jumpToToday();
render();
