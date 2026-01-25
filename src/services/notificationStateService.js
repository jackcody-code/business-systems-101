const fs = require("node:fs");
const path = require("node:path");

function getStatePath() {
    // repoRoot/data/notification-state.json
    return path.join(__dirname, "..", "..", "data", "notification-state.json");
}

function loadState() {
    const statePath = getStatePath();
    try {
        if (!fs.existsSync(statePath)) return { lastSentDate: null };
        const raw = fs.readFileSync(statePath, "utf-8");
        return JSON.parse(raw);
    } catch {
        return { lastSentDate: null };
    }
}

function saveState(state) {
    const statePath = getStatePath();
    const dir = path.dirname(statePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2), "utf-8");
}

// Local date in YYYY-MM-DD (operator-friendly)
function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function alreadySentToday() {
    const state = loadState();
    return state.lastSentDate === todayKey();
}

function markSentToday() {
    saveState({ lastSentDate: todayKey() });
}

module.exports = {
    alreadySentToday,
    markSentToday,
    todayKey,
};