/* =====================================================================
   LESE-MEISTER – SILBENWÖRTER
   =====================================================================
   So änderst du die Liste:
   - Silben mit Bindestrich trennen, z. B. "Ba-na-ne" (Sprechsilben wie in der Fibel).
   - Jedes Wort steht in "Anführungszeichen", danach ein Komma.
   - Leicht und Mittel werden blau/rot eingefärbt, Profi ist ganz in Schwarz.
   - "Schwer" hat KEINE eigene Liste: Es nimmt automatisch alle Wörter aus Leicht und
     Mittel – ganz in Schwarz.
   - Neue Wörter erscheinen nach dem Hochladen automatisch in der App.
     Was auf dem iPad selbst ergänzt oder gelöscht wurde, bleibt dabei erhalten.
   - Eigene Namen (z. B. von Kindern) besser in der App unter ⚙️ › Bibliothek eintragen –
     dann stehen sie nur auf dem Gerät und nicht öffentlich auf GitHub.
   - Pro Stufe mindestens 10 Wörter.
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

LESE_MEISTER.silben = {

    // 2 Silben, meist offene Silben
    leicht: [
        "Ma-ma", "Pa-pa", "O-ma", "O-pa",
        "So-fa", "Na-se", "Ro-se", "Ha-se", "Lö-we", "Ti-ger", "Ra-be", "Blu-me", "Son-ne",
        "Wol-ke", "Re-gen", "Ta-fel", "Ku-chen", "Ho-nig", "Ap-fel", "Bir-ne", "Kat-ze", "Pi-lot"
    ],

    // 3 Silben
    mittel: [
        "Ba-na-ne", "To-ma-te", "Ra-ke-te", "Me-lo-ne", "Pa-pa-gei", "Sa-la-mi", "Te-le-fon", "Do-mi-no", "Ka-ka-du",
        "A-na-nas", "Pin-gu-in", "Kro-ko-dil", "Ka-pi-tän", "Zi-tro-ne", "E-le-fant", "Ka-nin-chen", "Gi-tar-re", "Mo-tor-rad"
    ],

    // Lange Wörter (3–5 Silben) mit schwierigeren Buchstabenfolgen (sch, schr, ck, ng …)
    profi: [
        "Schmet-ter-ling", "Scho-ko-la-de", "Re-gen-bo-gen", "Ge-burts-tag", "Kar-tof-fel", "Schild-krö-te",
        "Feu-er-wehr", "Fle-der-maus", "Ku-schel-tier", "Hub-schrau-ber", "Erd-bee-re", "Zahn-bürs-te",
        "Schul-ran-zen", "Son-nen-blu-me", "Kin-der-gar-ten", "Wasch-ma-schi-ne", "Ta-schen-lam-pe", "Os-ter-ha-se",
        // aus den Sichtwörtern umgezogen – zu lang, um sie auf einen Blick zu lesen
        "Di-no-sau-ri-er", "Meer-schwein-chen", "Eich-hörn-chen", "See-pferd-chen", "Ma-ri-en-kä-fer"
    ]
};
