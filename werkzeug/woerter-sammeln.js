// Sammelt jedes Wort, das der Lese-Meister vorlesen kann – genau so, wie die App es vorliest:
//   - Sichtwörter und Silbenwörter (Bindestriche entfernt: "Ba-na-ne" → "Banane")
//   - alle Wörter aus den Weltall-Texten (Überschrift, Text, Bildtext, „Hast du gewusst …?“,
//     Sprechblasen, Quizfragen, Antworten, Kapitel-Titel)
//   - feste Sätze aus index.html, deren Wörter man antippen kann
// Aufruf: node woerter-sammeln.js <App-Ordner>   → JSON auf der Standardausgabe
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const app = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const sandbox = {};
sandbox.window = sandbox;              // wie im Browser: window ist der globale Bereich
vm.createContext(sandbox);
for (const datei of ['sichtwoerter.js', 'silben.js', 'weltall-texte.js']) {
    const code = fs.readFileSync(path.join(app, 'daten', datei), 'utf8');
    vm.runInContext(code, sandbox, { filename: datei });
}
const DATA = sandbox.LESE_MEISTER;

// Dieselbe Wort-Erkennung wie in index.html (WORD_RE) – Satzzeichen gehören nicht zum Wort
const WORD_RE = /[0-9]+(?:[.,][0-9]+)*|[A-Za-zÄÖÜäöüßẞ]+(?:-[A-Za-zÄÖÜäöüßẞ]+)*/g;
const woerter = new Map();   // Wort → woher (erste Fundstelle)
function merke(wort, quelle) {
    const w = String(wort).replace(/-/g, '').trim();
    if (w && !woerter.has(w)) woerter.set(w, quelle);
}
function zerlege(zeile, quelle) {
    String(zeile).split(/\s+/).filter(Boolean).forEach(stueck => {
        for (const m of stueck.matchAll(WORD_RE)) merke(m[0], quelle);
    });
}

for (const [spiel, quelle] of [['sichtwoerter', 'Sichtwörter'], ['silben', 'Silben']]) {
    const stufen = DATA[spiel] || {};
    Object.keys(stufen).forEach(stufe => (stufen[stufe] || []).forEach(w => merke(w, quelle)));
}

const OHNE = new Set(['id', 'bild', 'wer']);
function durchlaufe(wert, quelle) {
    if (typeof wert === 'string') zerlege(wert, quelle);
    else if (Array.isArray(wert)) wert.forEach(x => durchlaufe(x, quelle));
    else if (wert && typeof wert === 'object') {
        Object.keys(wert).forEach(k => { if (!OHNE.has(k)) durchlaufe(wert[k], quelle); });
    }
}
(DATA.weltallTexte || []).forEach(k => durchlaufe(k, 'Weltall: ' + (k.titel || k.id)));

// Feste Sätze in index.html: renderLine('…', true …) bzw. renderLine('…') sind antippbar
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
for (const m of html.matchAll(/renderLine\('([^']+)'(?:\s*,\s*(true|false))?/g)) {
    if (m[2] !== 'false') zerlege(m[1], 'App');
}
// Wörter, die die App beim Einschalten der Schalter als Probe vorspricht
for (const m of html.matchAll(/speakWord\('([^']+)'/g)) merke(m[1], 'App');

const SAETZE = ['Hallo! So klinge ich, wenn ich dir vorlese.'];   // Hörprobe in den Einstellungen

process.stdout.write(JSON.stringify({
    woerter: [...woerter.keys()],
    quellen: Object.fromEntries(woerter),
    saetze: SAETZE
}, null, 1));
