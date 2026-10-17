# Lese-Meister 🚀

Ein Lese-Lernspiel für Grundschulkinder – als Webseite für iPad und iPhone, veröffentlicht über GitHub Pages.

**Adresse:** https://binojsebastian.github.io/sichtwoerter/

## Die drei Spiele

| Spiel | Worum es geht |
|---|---|
| 👀 **Sichtwörter** | Häufige Wörter auf einen Blick erkennen. Stufen Leicht, Mittel, Schwer. |
| 👏 **Silben** | Wörter Silbe für Silbe lesen (blau/rot). Stufen Leicht, Mittel, Schwer, Profi. |
| 🚀 **Weltall** | 11 Kapitel Sachtexte über das Weltall im Stil von Erstlese-Sachbüchern: Überschrift, Bild mit Bildtext, Zeilen nach Sinnschritten, „Hast du gewusst …?“-Kasten, Sprechblasen von Ben, Lina und Astronautin Mira – danach ein Lesequiz mit a) b) c). |

Alle drei Spiele füllen gemeinsam den Tank der **Weltraum-Reise**:
eine Runde Sichtwörter oder Silben bringt 1–3 ⛽, jede richtige Antwort im Lesequiz 2 ⛽ (beim ersten Versuch) oder 1 ⛽.

## Dateien

```
index.html               ← die App (Aussehen und Programm)
daten/sichtwoerter.js    ← Wortlisten Sichtwörter
daten/silben.js          ← Wortlisten Silben
daten/weltall-texte.js   ← Weltall-Kapitel mit Lesequiz und Silben-Ausnahmen
daten/bilder.js          ← Zeichnungen für die Weltall-Texte (Planeten, Rakete, Raumstation …)
icon-180.png             ← App-Symbol (Rakete) für den Home-Bildschirm
preview.webp             ← Vorschaubild
LERNINHALTE.md           ← Woher die Fakten in den Weltall-Texten stammen
```

Wörter und Texte stehen in eigenen Dateien. So kann man sie ändern, ohne `index.html` anzufassen.

## Hochladen auf GitHub

1. In der App **⚙️ › Sichern › Sicherung speichern** (zur Sicherheit).
2. Im Repository auf GitHub **Add file › Upload files** wählen.
3. `index.html`, `README.md`, `LERNINHALTE.md` **und den ganzen Ordner `daten`** in das Fenster ziehen.
   Wichtig: Der Ordner `daten` muss als Ordner ankommen (also `daten/sichtwoerter.js`, nicht nur `sichtwoerter.js`).
   Am Computer geht das, indem man den Ordner selbst hineinzieht.
   Nur mit dem iPad: zuerst **Add file › Create new file**, als Namen `daten/info.txt` eintippen (das legt den Ordner an),
   ein Wort hineinschreiben, **Commit changes**. Dann den Ordner `daten` öffnen und dort **Add file › Upload files** wählen.
4. **Commit changes** klicken.
5. Nach 1–3 Minuten ist die neue Version online (Reiter **Actions**: grüner Haken bei „pages build and deployment“).
   Safari hält Dateien bis zu 10 Minuten zwischengespeichert – wenn sich nichts ändert, die Seite neu laden.

Eigene Wörter, Bestenlisten, Reise und gelesene Kapitel bleiben bei einem Update erhalten.

**Zurück zur alten Version:** Die alte `index.html` (Version 2) wieder hochladen. Der Ordner `daten` darf liegen bleiben –
die alte Version benutzt ihn nicht. Eigene Wörter, Bestenliste und Reise sind dort weiterhin da.

## Wörter ändern

Am einfachsten direkt auf GitHub: Datei öffnen (z. B. `daten/sichtwoerter.js`) → Stift-Symbol ✏️ → ändern → **Commit changes**.

- Jedes Wort steht in Anführungszeichen, danach ein Komma: `"Hund", "Katze", "Maus"`
- Silbenwörter mit Bindestrich trennen: `"Ba-na-ne"`
- Pro Stufe mindestens 10 Wörter.
- **Neue Wörter erscheinen automatisch** in der App. Was auf dem iPad unter ⚙️ › Bibliothek selbst ergänzt
  oder gelöscht wurde, bleibt dabei erhalten.
- Namen von Kindern besser nur in der App eintragen (⚙️ › Bibliothek) – dann stehen sie nicht öffentlich auf GitHub.

## Ein neues Weltall-Kapitel anlegen

In `daten/weltall-texte.js` steht am Ende der Kapitel-Liste die Zeile `// Neue Kapitel hier einfügen`. Darunter (vor `];`) ein neues Kapitel einfügen – es endet immer mit `},`:

```js
    {
        id: "kometen",
        titel: "Die Kometen",
        bild: "Sterne",
        seiten: [
            {
                ueberschrift: "Schneebälle im All",
                bild: "☄️",
                bildtext: "Ein Komet mit seinem langen Schweif.",
                text: [
                    "Ein Komet ist ein Brocken",
                    "aus Eis und Staub.",
                    "",
                    "Kommt er nah an die Sonne,",
                    "bekommt er einen langen Schweif."
                ],
                hastDuGewusst: [
                    "… dass der Schweif",
                    "immer von der Sonne weg zeigt?"
                ],
                sprechblase: { wer: "Ben", text: "Ein Schneeball mit Schwanz!" }
            },
        ],
        lesequiz: [
            { frage: "Woraus ist ein Komet?", antworten: ["aus Eis und Staub", "aus Gold", "aus Holz"] },
            { frage: ["Ich habe einen langen Schweif.", "Wer bin ich?"], antworten: ["ein Komet", "ein Planet", "ein Mond"] },
        ]
    },
```

- **id**: nur Kleinbuchstaben, Zahlen und Bindestrich, später nie mehr ändern (daran hängen die Sterne ⭐).
- **bild**: ein Bildname aus `daten/bilder.js` (die Liste steht oben in der Datei) oder ein Emoji.
- **ueberschrift**, **bildtext**, **hastDuGewusst**, **sprechblase** dürfen fehlen.
- **text**: jeder Eintrag erscheint in einer eigenen Zeile – wie im Buch nach Sinnschritten trennen. `""` ist ein neuer Absatz.
- **sprechblase**: `wer` ist Ben, Lina oder Mira.
- **lesequiz**: Die **erste Antwort ist immer die richtige**. Die App mischt die Antworten und schreibt a) b) c) davor.
  Eine Frage über mehrere Zeilen („Wer bin ich?“) als Liste in eckigen Klammern schreiben.
- Etwa 120–140 Wörter pro Kapitel ergeben ungefähr 5 Minuten Lesezeit.
- Im Text keine geraden Anführungszeichen `"` verwenden, sondern „ und “. Keinen Bindestrich `-` verwenden – er bedeutet „Silbengrenze“.

Probleme mit einem Kapitel (z. B. doppelte id, Quizfrage mit nur einer Antwort) zeigt die App unter **⚙️ › Bibliothek › Texte** an.

### Silben in den Texten

Die App trennt die Wörter in den Texten automatisch in Sprechsilben. Bei zusammengesetzten Wörtern liegt sie
manchmal daneben (z. B. „Wel-tall“ statt „Welt-all“). Solche Wörter stehen am Ende von `daten/weltall-texte.js`
in der Liste `silbenAusnahmen`, z. B. `"Welt-all"`. Jede Wortform braucht einen eigenen Eintrag
(`"Raum-an-zug"` und `"Raum-an-zü-ge"`).

## Wenn etwas nicht stimmt

Hat eine Daten-Datei einen Tippfehler (meist ein fehlendes Komma oder Anführungszeichen), zeigt die App oben auf der
Startseite einen roten Hinweis mit **Dateiname und Zeile**. Die anderen Spiele funktionieren weiter.
Datei korrigieren, hochladen, Seite neu laden.

## Einstellungen (⚙️)

| Bereich | Inhalt |
|---|---|
| 🎮 Spiel | Zeit pro Wort (je Spiel), Silben farbig und Schriftgröße für die Weltall-Texte |
| 🎤 Sprache & Töne | Töne, Spracherkennung, Falsch automatisch, Vorlesen bei Falsch, Wort antippen = vorlesen |
| 📚 Bibliothek | Wortlisten ansehen und ändern (gilt nur auf diesem Gerät), Übersicht der Weltall-Kapitel |
| 🚀 Fortschritt | Weltraum-Reise, Knackwörter, Bestenlisten, gelesene Kapitel zurücksetzen |
| 💾 Sichern | Sicherung speichern und laden |

## Spracherkennung (Sichtwörter und Silben)

- Funktioniert nur in **Safari** über die https-Adresse, mit eingeschalteter Diktierfunktion
  (Einstellungen › Allgemein › Tastatur › Diktierfunktion).
- Beim Anlegen des Home-Bildschirm-Symbols **„Als Web-App öffnen“ ausschalten** – sonst sperrt Apple das Mikrofon.
- Bei den Weltall-Texten hört die App nicht zu.

## Speicher und Datenschutz

Alles wird nur auf dem Gerät gespeichert (localStorage). Safari löscht diese Daten, wenn die Seite etwa eine Woche
nicht geöffnet wird – darum ab und zu unter ⚙️ › Sichern eine Sicherung speichern.
Nur bei eingeschalteter Spracherkennung schickt Safari Sprachaufnahmen zur Auswertung an Apple.
