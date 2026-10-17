/* =====================================================================
   LESE-MEISTER – SICHTWÖRTER
   =====================================================================
   So änderst du die Liste:
   - Jedes Wort steht in "Anführungszeichen", danach ein Komma.
   - Nach dem letzten Wort einer Liste darf ein Komma stehen – muss aber nicht.
   - Jedes Wort nur in EINER Stufe eintragen. Nomen großschreiben.
   - Neue Wörter erscheinen nach dem Hochladen automatisch in der App.
     Was auf dem iPad selbst ergänzt oder gelöscht wurde, bleibt dabei erhalten.
   - Wird ein Wort hier gelöscht, verschwindet es auch in der App
     (außer jemand hat es auf dem iPad selbst eingetragen).
   - Pro Stufe mindestens 10 Wörter.

   Ausgewählt nach Häufigkeit (Duden-Korpus, Uni Leipzig: die 100 häufigsten Wörter)
   und danach, ob ein Kind der 2. Klasse sie kennt und braucht.
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

LESE_MEISTER.sichtwoerter = {

    // Die kürzesten und häufigsten Wörter (fast alle unter den 100 häufigsten der deutschen Sprache)
    leicht: [
        "und", "die", "der", "das", "den", "dem", "ein", "ist", "in", "im",
        "zu", "zum", "zur", "mit", "von", "vom", "auf", "an", "am", "aus",
        "für", "bei", "beim", "um", "es", "er", "sie", "ich", "du", "wir",
        "ihr", "man", "sich", "mir", "dir", "mich", "dich", "so", "da", "wo",
        "wie", "was", "wer", "ja", "nein", "als", "bis", "vor", "nach", "ab",
        "weg", "hat", "bin", "war", "sind", "wird", "mein", "dein", "sein", "kein",
        "gut", "viel", "weil"
    ],

    mittel: [
        // Häufige Wörter mit 4–6 Buchstaben
        "nicht", "nichts", "auch", "aber", "oder", "wenn", "dann", "denn", "noch", "schon",
        "jetzt", "hier", "dort", "doch", "nur", "sehr", "mehr", "ganz", "alle", "eine",
        "einen", "einem", "diese", "dass", "etwas", "immer", "wieder", "heute", "haben", "über",
        "unter", "kann", "will", "muss", "darf", "soll", "geht", "kommt", "sieht", "macht",
        "sagt", "unser", "jeder", "warum", "bald", "fast", "lange", "oft", "gern", "klein",
        "groß", "schnell",
        // Tiere
        "Hund", "Katze", "Maus", "Kuh", "Pferd", "Fisch", "Vogel", "Hase", "Ente", "Schaf",
        "Ziege", "Schwein", "Bär", "Löwe", "Affe", "Igel", "Fuchs", "Wolf", "Frosch", "Biene",
        "Huhn", "Esel", "Tiger", "Zebra", "Eule", "Robbe", "Wal"
    ],

    schwer: [
        // Längere häufige Wörter aus Kinderbüchern
        "vielleicht", "plötzlich", "natürlich", "zusammen", "morgen", "gestern", "endlich", "langsam", "sofort", "manchmal",
        "wirklich", "zwischen", "niemand", "jemand", "überall", "draußen", "fröhlich", "deshalb", "darum",
        // Tun-Wörter
        "spielen", "lesen", "schreiben", "laufen", "springen", "schlafen", "trinken",
        // Tiere
        "Elefant", "Giraffe", "Krokodil", "Schildkröte", "Schmetterling", "Nashorn", "Nilpferd", "Känguru", "Pinguin", "Papagei",
        "Delfin", "Schlange", "Leopard", "Kamel", "Flamingo", "Eisbär", "Regenwurm", "Fledermaus", "Hamster", "Waschbär"
    ]
};
