/* =====================================================================
   LESE-MEISTER – WELTALL-TEXTE
   =====================================================================
   Sachtexte über das Weltall im Stil von Erstlese-Sachbüchern.
   Ben, Lina und die Astronautin Mira reisen mit: Sie kommentieren in
   Sprechblasen und stellen am Ende jedes Kapitels das Lesequiz.

   So ist ein Kapitel aufgebaut:

   {
       id: "mond",                  ← Kennung. Nie mehr ändern, sonst gehen die Sterne ⭐ verloren.
                                       Nur Kleinbuchstaben, Zahlen und Bindestrich.
       titel: "Auf dem Mond",
       bild: "Mond",                ← Bild in der Kapitel-Liste (Name aus daten/bilder.js oder ein Emoji)
       seiten: [
           {
               ueberschrift: "Hüpfen wie ein Känguru",
               bild: "Mondsprung",               ← Bild über dem Text
               bildtext: "Auf dem Mond ist man ganz leicht.",
               text: [
                   "Auf dem Mond bist du",       ← jede Zeile erscheint in einer eigenen Zeile:
                   "viel leichter als auf der Erde.",   am besten nach Sinnschritten trennen
                   "",                           ← leere Zeile = neuer Absatz
                   "Die Astronauten hüpften deshalb"
               ],
               hastDuGewusst: [ "… dass …?", "…" ],      ← Kasten „Hast du gewusst …?“ (darf fehlen)
               sprechblase: { wer: "Lina", text: "Juhu, ich fliege!" }   ← Ben, Lina oder Mira (darf fehlen)
           },
           …weitere Seiten…
       ],
       lesequiz: [
           // Die ERSTE Antwort ist immer die richtige. Die App mischt die Antworten.
           { frage: "Was sind Krater?", antworten: ["richtig", "falsch", "falsch"] },
           // Eine Frage über mehrere Zeilen (z. B. „Wer bin ich?“) als Liste schreiben:
           { frage: ["Ich bin der größte Planet.", "Wer bin ich?"], antworten: ["Jupiter", "Mars", "Venus"] }
       ]
   },

   Wichtig:
   - Im Text keine geraden Anführungszeichen " benutzen, sondern „ und “.
   - Keinen Bindestrich - im Text benutzen: Er bedeutet in dieser App „Silbengrenze“.
     Damit kann man ein Wort selbst trennen, wenn die automatische Trennung
     danebenliegt, z. B. "Raum-sta-ti-on". Besser ist es aber, das Wort unten bei
     den Silben-Ausnahmen einzutragen – dann gilt es für alle Texte.
   - Ein Kapitel hat etwa 120–140 Wörter (ungefähr 5 Minuten Lesezeit).
   - Alle Fakten sind geprüft – die Quellen stehen in LERNINHALTE.md.
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

LESE_MEISTER.weltallTexte = [

    // ---------------------------------------------------------------- 1
    {
        id: "raketenstart",
        titel: "Der Raketenstart",
        bild: "Rakete",
        seiten: [
            {
                ueberschrift: "Bereit für den Start",
                bild: "Raumanzug",
                bildtext: "Der Helm hat ein großes Fenster.",
                text: [
                    "Beim Start tragen alle",
                    "einen Raumanzug mit Helm.",
                    "Im Weltall gibt es nämlich",
                    "keine Luft zum Atmen.",
                    "",
                    "Geht im Raumschiff etwas kaputt,",
                    "bekommen sie Luft aus dem Anzug."
                ],
                sprechblase: { wer: "Mira", text: "Willkommen an Bord, ihr zwei!" }
            },
            {
                ueberschrift: "Drei, zwei, eins – los!",
                bild: "Rakete",
                bildtext: "Feuer und Rauch – die Rakete hebt ab.",
                text: [
                    "Die Motoren zünden.",
                    "Feuer und Rauch schießen heraus.",
                    "Die Rakete hebt ab",
                    "und wird immer schneller.",
                    "Alle werden fest",
                    "in ihre Sitze gedrückt.",
                    "",
                    "Nach ungefähr zehn Minuten",
                    "kreist das Raumschiff um die Erde."
                ],
                sprechblase: { wer: "Ben", text: "Huch, das drückt ja!" }
            },
            {
                ueberschrift: "Unser blauer Planet",
                bild: "Erde",
                bildtext: "So sieht die Erde aus dem All aus.",
                text: [
                    "Im All ist der Himmel",
                    "nicht blau, sondern schwarz.",
                    "Mittendrin leuchtet die Erde.",
                    "Sie ist rund und blau,",
                    "weil es so viel Wasser gibt.",
                    "Weiße Wolken ziehen darüber."
                ],
                sprechblase: { wer: "Lina", text: "Wie schön die Erde ist!" }
            },
            {
                ueberschrift: "Schneller als schnell",
                bild: "Raumkapsel",
                bildtext: "Das Raumschiff fliegt um die Erde.",
                hastDuGewusst: [
                    "… dass eine Rakete am Ende",
                    "in einer Sekunde",
                    "fast acht Kilometer weit fliegt?",
                    "So weit läufst du",
                    "in ungefähr zwei Stunden!"
                ],
                sprechblase: { wer: "Mira", text: "Nächster Halt: die Raumstation!" }
            }
        ],
        lesequiz: [
            { frage: "Was gibt es im Weltall nicht?", antworten: ["Luft zum Atmen", "Sterne", "Planeten"] },
            { frage: "Wie lange dauert es, bis das Raumschiff um die Erde kreist?", antworten: ["ungefähr zehn Minuten", "ungefähr zehn Tage", "ein ganzes Jahr"] },
            { frage: "Warum sieht die Erde blau aus?", antworten: ["Es gibt so viel Wasser.", "Sie ist blau angemalt.", "Der Himmel ist blau."] }
        ]
    },

    // ---------------------------------------------------------------- 2
    {
        id: "raumstation",
        titel: "Die Raumstation",
        bild: "Raumstation",
        seiten: [
            {
                ueberschrift: "Ein Haus im All",
                bild: "Raumstation",
                bildtext: "Die Raumstation ISS kreist um die Erde.",
                text: [
                    "Die Raumstation ISS",
                    "kreist hoch über der Erde.",
                    "Sie ist so groß wie ein Fußballfeld.",
                    "Ihre großen Flügel",
                    "machen aus Sonnenlicht Strom.",
                    "",
                    "Astronautinnen und Astronauten",
                    "aus vielen Ländern leben hier."
                ],
                sprechblase: { wer: "Ben", text: "Da wohnen echte Menschen?" }
            },
            {
                ueberschrift: "Alles schwebt",
                bild: "Schwerelos",
                bildtext: "Ein Apfel und ein Stift schweben vorbei.",
                text: [
                    "Auf der Raumstation",
                    "fällt nichts nach unten.",
                    "Menschen, Stifte und Äpfel schweben.",
                    "Darum sind viele Sachen",
                    "mit Klettband festgemacht.",
                    "",
                    "Oben und unten gibt es hier nicht."
                ],
                sprechblase: { wer: "Lina", text: "Guck mal, ein Purzelbaum!" }
            },
            {
                ueberschrift: "Trinken und schlafen",
                bild: "Schlafsack",
                bildtext: "Der Schlafsack ist an der Wand festgemacht.",
                text: [
                    "Getränke gibt es in Beuteln",
                    "mit Strohhalm.",
                    "Aus einem Glas",
                    "würde das Wasser davonschweben.",
                    "",
                    "Geschlafen wird im Schlafsack.",
                    "Er ist an der Wand festgemacht.",
                    "So schwebt niemand im Schlaf weg."
                ],
                sprechblase: { wer: "Ben", text: "Gute Nacht – an der Wand!" }
            },
            {
                ueberschrift: "Viele Sonnenaufgänge",
                bild: "Sonnenaufgang",
                bildtext: "Ein Sonnenaufgang über der Erde.",
                hastDuGewusst: [
                    "… dass die Raumstation",
                    "in ungefähr eineinhalb Stunden",
                    "einmal um die Erde fliegt?",
                    "Darum sehen die Astronauten",
                    "16 Sonnenaufgänge an einem Tag!"
                ],
                sprechblase: { wer: "Mira", text: "Schon wieder Morgen!" }
            }
        ],
        lesequiz: [
            { frage: "Woher bekommt die Raumstation ihren Strom?", antworten: ["aus Sonnenlicht", "aus einer Steckdose", "aus einem langen Kabel zur Erde"] },
            { frage: "Wo schlafen die Astronauten?", antworten: ["in einem Schlafsack an der Wand", "in einem Bett auf dem Boden", "auf einem Sofa"] },
            { frage: "Wie viele Sonnenaufgänge gibt es auf der Raumstation an einem Tag?", antworten: ["16", "einen", "100"] }
        ]
    },

    // ---------------------------------------------------------------- 3
    {
        id: "mond",
        titel: "Auf dem Mond",
        bild: "Mond",
        seiten: [
            {
                ueberschrift: "Die Reise zum Mond",
                bild: "Mond",
                bildtext: "Der Mond ist unser Nachbar im All.",
                text: [
                    "Der Mond kreist um die Erde.",
                    "Mit einer Rakete dauert die Reise",
                    "ungefähr drei Tage.",
                    "",
                    "Im Jahr 1969 landeten",
                    "zum ersten Mal Menschen auf dem Mond.",
                    "Bis heute waren",
                    "zwölf Menschen dort."
                ],
                sprechblase: { wer: "Ben", text: "Dann bin ich Nummer dreizehn!" }
            },
            {
                ueberschrift: "Hüpfen wie ein Känguru",
                bild: "Mondsprung",
                bildtext: "Auf dem Mond ist man ganz leicht.",
                text: [
                    "Auf dem Mond bist du",
                    "viel leichter als auf der Erde.",
                    "Du könntest ungefähr sechsmal",
                    "so hoch springen wie hier.",
                    "",
                    "Die Astronauten hüpften deshalb",
                    "wie Kängurus über den Boden."
                ],
                sprechblase: { wer: "Lina", text: "Juhu, ich fliege!" }
            },
            {
                ueberschrift: "Krater und Fußspuren",
                bild: "Fußspur",
                bildtext: "Diese Spuren sind über 50 Jahre alt.",
                text: [
                    "Überall auf dem Mond sind Krater.",
                    "Das sind große Löcher.",
                    "Dort sind Steine aus dem All",
                    "eingeschlagen.",
                    "",
                    "Auf dem Mond gibt es keinen Wind.",
                    "Darum sind die Fußspuren",
                    "der Astronauten noch immer da."
                ],
                sprechblase: { wer: "Mira", text: "Nicht drauftreten!" }
            },
            {
                ueberschrift: "Ein Licht in der Nacht",
                bild: "Erdaufgang",
                bildtext: "Vom Mond aus sieht man die Erde.",
                hastDuGewusst: [
                    "… dass der Mond",
                    "gar nicht selbst leuchtet?",
                    "Er wird von der Sonne angestrahlt.",
                    "Darum sieht er mal rund",
                    "und mal wie eine Sichel aus."
                ],
                sprechblase: { wer: "Lina", text: "Hallo Erde, wir winken!" }
            }
        ],
        lesequiz: [
            { frage: "Wann landeten zum ersten Mal Menschen auf dem Mond?", antworten: ["1969", "2020", "1800"] },
            { frage: "Was sind Krater?", antworten: ["große Löcher im Boden", "hohe Berge", "kleine Seen"] },
            { frage: "Warum sind die Fußspuren noch da?", antworten: ["Es gibt keinen Wind.", "Sie sind festgeklebt.", "Jemand malt sie jeden Tag neu."] }
        ]
    },

    // ---------------------------------------------------------------- 4
    {
        id: "sonne",
        titel: "Die Sonne",
        bild: "Sonne",
        seiten: [
            {
                ueberschrift: "Unser Stern",
                bild: "Sonne",
                bildtext: "Die Sonne ist der Stern in unserer Nähe.",
                text: [
                    "Die Sonne ist ein Stern.",
                    "Sie ist eine riesige Kugel",
                    "aus glühend heißem Gas.",
                    "Außen ist sie über 5000 Grad heiß.",
                    "",
                    "Ohne ihr Licht und ihre Wärme",
                    "gäbe es auf der Erde kein Leben."
                ],
                sprechblase: { wer: "Ben", text: "Puh, ist das heiß hier!" }
            },
            {
                ueberschrift: "Riesengroß",
                bild: "Größenvergleich",
                bildtext: "So klein ist die Erde neben der Sonne.",
                text: [
                    "Die Sonne ist viel größer als die Erde.",
                    "Ungefähr eine Million Erden",
                    "würden in sie hineinpassen.",
                    "",
                    "Sie sieht nur so klein aus,",
                    "weil sie so weit weg ist."
                ],
                sprechblase: { wer: "Lina", text: "So weit kann ich nicht zählen!" }
            },
            {
                ueberschrift: "Vorsicht, Augen!",
                bild: "Schutzbrille",
                bildtext: "Nur mit einer Schutzbrille darf man hinschauen.",
                text: [
                    "Schau nie direkt in die Sonne!",
                    "Ihr Licht ist so stark,",
                    "dass es den Augen schadet.",
                    "Auch eine Sonnenbrille",
                    "schützt nicht genug.",
                    "",
                    "Nur mit einer besonderen Schutzbrille",
                    "darf man hinschauen."
                ],
                sprechblase: { wer: "Mira", text: "Erst die Brille, dann gucken!" }
            },
            {
                ueberschrift: "Einmal rundherum",
                bild: "Sonnensystem",
                bildtext: "Acht Planeten kreisen um die Sonne.",
                hastDuGewusst: [
                    "… dass das Licht der Sonne",
                    "ungefähr acht Minuten",
                    "bis zur Erde braucht?",
                    "Die Erde selbst braucht ein ganzes Jahr",
                    "für eine Runde um die Sonne."
                ],
                sprechblase: { wer: "Ben", text: "Dann bin ich schon sechs Runden mitgefahren!" }
            }
        ],
        lesequiz: [
            { frage: "Wie lange braucht das Licht der Sonne bis zur Erde?", antworten: ["ungefähr acht Minuten", "ein ganzes Jahr", "eine Woche"] },
            { frage: "Warum darf man nicht in die Sonne schauen?", antworten: ["Ihr Licht schadet den Augen.", "Die Sonne wird dann wütend.", "Die Sonne geht dann aus."] },
            { frage: ["Ich bin ein Stern.", "Um mich kreisen acht Planeten.", "Wer bin ich?"], antworten: ["die Sonne", "der Mond", "die Erde"] }
        ]
    },

    // ---------------------------------------------------------------- 5
    {
        id: "merkur-venus",
        titel: "Merkur und Venus",
        bild: "Venus",
        seiten: [
            {
                ueberschrift: "Der kleine Merkur",
                bild: "Merkur",
                bildtext: "Merkur ist voller Krater.",
                text: [
                    "Merkur ist der kleinste Planet.",
                    "Er ist der Sonne am nächsten.",
                    "Am Tag wird es dort glühend heiß,",
                    "in der Nacht eisig kalt.",
                    "",
                    "Merkur hat viele Krater.",
                    "Er sieht fast aus wie unser Mond."
                ],
                sprechblase: { wer: "Ben", text: "Erst Sauna, dann Kühlschrank!" }
            },
            {
                ueberschrift: "Die heiße Venus",
                bild: "Venus",
                bildtext: "Dicke Wolken hüllen die Venus ein.",
                text: [
                    "Die Venus ist fast so groß wie die Erde.",
                    "Dicke Wolken hüllen sie ein.",
                    "Die Wolken halten die Wärme fest.",
                    "",
                    "Darum ist die Venus",
                    "der heißeste Planet von allen.",
                    "Dort ist es heißer als in einem Backofen."
                ],
                sprechblase: { wer: "Lina", text: "Da will ich nicht landen!" }
            },
            {
                ueberschrift: "Der Abendstern",
                bild: "Abendstern",
                bildtext: "Der helle Punkt am Abendhimmel ist die Venus.",
                text: [
                    "Die Venus dreht sich andersherum",
                    "als fast alle anderen Planeten.",
                    "Darum geht die Sonne dort",
                    "im Westen auf.",
                    "",
                    "Am Abendhimmel siehst du die Venus",
                    "oft als hellen Punkt.",
                    "Man nennt sie auch Abendstern."
                ],
                sprechblase: { wer: "Ben", text: "Den habe ich schon mal gesehen!" }
            },
            {
                ueberschrift: "Ganz allein",
                bild: "Sonnensystem",
                bildtext: "Merkur und Venus kreisen nah um die Sonne.",
                hastDuGewusst: [
                    "… dass Merkur und Venus",
                    "keinen einzigen Mond haben?",
                    "Ein Jahr auf dem Merkur",
                    "dauert nur 88 Tage."
                ],
                sprechblase: { wer: "Lina", text: "Dann hätte ich viel öfter Geburtstag!" }
            }
        ],
        lesequiz: [
            { frage: "Welcher Planet ist der kleinste?", antworten: ["Merkur", "Jupiter", "Venus"] },
            { frage: "Warum ist es auf der Venus so heiß?", antworten: ["Dicke Wolken halten die Wärme fest.", "Dort brennt ein großes Feuer.", "Die Venus hat eine Heizung."] },
            { frage: ["Ich bin fast so groß wie die Erde.", "Am Abend sieht man mich als hellen Punkt.", "Wer bin ich?"], antworten: ["die Venus", "der Merkur", "der Mond"] }
        ]
    },

    // ---------------------------------------------------------------- 6
    {
        id: "mars",
        titel: "Der rote Mars",
        bild: "Mars",
        seiten: [
            {
                ueberschrift: "Der rote Planet",
                bild: "Mars",
                bildtext: "Der Mars ist rot wie Rost.",
                text: [
                    "Der Mars ist ein Nachbar der Erde.",
                    "Sein Boden ist mit rotem Staub bedeckt.",
                    "Im Staub steckt Eisen,",
                    "das gerostet ist.",
                    "Darum sieht der Mars rot aus.",
                    "",
                    "Ein Flug zum Mars dauert",
                    "sechs bis neun Monate."
                ],
                sprechblase: { wer: "Ben", text: "Rot ist meine Lieblingsfarbe!" }
            },
            {
                ueberschrift: "Ein riesiger Vulkan",
                bild: "Vulkan",
                bildtext: "Der größte Vulkan im ganzen Sonnensystem.",
                text: [
                    "Auf dem Mars steht",
                    "der größte Vulkan im Sonnensystem.",
                    "Er ist mehr als doppelt so hoch",
                    "wie der höchste Berg der Erde.",
                    "",
                    "Feuer spuckt er aber",
                    "schon lange nicht mehr."
                ],
                sprechblase: { wer: "Lina", text: "Da klettere ich nicht hoch!" }
            },
            {
                ueberschrift: "Roboter auf dem Mars",
                bild: "Rover",
                bildtext: "Ein Rover fährt auf sechs Rädern.",
                text: [
                    "Auf dem Mars war noch kein Mensch.",
                    "Aber dort fahren Roboter herum.",
                    "Man nennt sie Rover.",
                    "",
                    "Sie haben sechs Räder und Kameras.",
                    "Ihre Fotos schicken sie zur Erde."
                ],
                sprechblase: { wer: "Ben", text: "Hallo, kleiner Roboter!" }
            },
            {
                ueberschrift: "Abend auf dem Mars",
                bild: "Marsabend",
                bildtext: "Zwei kleine Monde stehen am Himmel.",
                hastDuGewusst: [
                    "… dass der Sonnenuntergang",
                    "auf dem Mars blau ist?",
                    "Am Himmel stehen dann",
                    "zwei kleine Monde.",
                    "Sie heißen Phobos und Deimos."
                ],
                sprechblase: { wer: "Lina", text: "Blau statt rot – verrückt!" }
            }
        ],
        lesequiz: [
            { frage: "Warum ist der Mars rot?", antworten: ["Im Staub ist Rost.", "Er ist rot angemalt.", "Dort wachsen rote Blumen."] },
            { frage: "Was ist ein Rover?", antworten: ["ein Roboter auf Rädern", "ein großer Vulkan", "ein kleiner Mond"] },
            { frage: "Wie viele Monde hat der Mars?", antworten: ["zwei", "einen", "keinen"] }
        ]
    },

    // ---------------------------------------------------------------- 7
    {
        id: "jupiter",
        titel: "Der Riese Jupiter",
        bild: "Jupiter",
        seiten: [
            {
                ueberschrift: "Steine im All",
                bild: "Asteroiden",
                bildtext: "Asteroiden sind Felsbrocken im All.",
                text: [
                    "Zwischen Mars und Jupiter",
                    "kreisen viele Felsbrocken",
                    "um die Sonne.",
                    "Man nennt sie Asteroiden.",
                    "",
                    "Manche sind kleiner als ein Haus.",
                    "Andere sind so groß wie ein ganzes Land."
                ],
                sprechblase: { wer: "Mira", text: "Festhalten, wir fliegen Slalom!" }
            },
            {
                ueberschrift: "Der größte Planet",
                bild: "Jupiter",
                bildtext: "Jupiter hat bunte Streifen.",
                text: [
                    "Jupiter ist der größte Planet.",
                    "Mehr als tausend Erden",
                    "würden in ihn hineinpassen.",
                    "",
                    "Jupiter hat keinen festen Boden.",
                    "Er besteht vor allem aus Gas.",
                    "Landen kann man dort nicht."
                ],
                sprechblase: { wer: "Ben", text: "Schade, ich wollte doch landen!" }
            },
            {
                ueberschrift: "Ein Sturm, größer als die Erde",
                bild: "Roter Fleck",
                bildtext: "Der rote Fleck ist ein riesiger Sturm.",
                text: [
                    "Auf Jupiter siehst du bunte Streifen",
                    "und einen großen roten Fleck.",
                    "Der Fleck ist ein riesiger Sturm.",
                    "",
                    "Er ist größer als die ganze Erde",
                    "und tobt seit mehr als 150 Jahren."
                ],
                sprechblase: { wer: "Lina", text: "Was für ein Wirbelwind!" }
            },
            {
                ueberschrift: "Viele, viele Monde",
                bild: "Jupitermonde",
                bildtext: "Um Jupiter kreisen viele Monde.",
                hastDuGewusst: [
                    "… dass Jupiter",
                    "mehr als 90 Monde hat?",
                    "Der größte heißt Ganymed.",
                    "Er ist sogar größer",
                    "als der Planet Merkur."
                ],
                sprechblase: { wer: "Ben", text: "Bei neunzig höre ich auf zu zählen!" }
            }
        ],
        lesequiz: [
            { frage: "Wie heißen die Felsbrocken zwischen Mars und Jupiter?", antworten: ["Asteroiden", "Kometen", "Planeten"] },
            { frage: "Warum kann man auf Jupiter nicht landen?", antworten: ["Er hat keinen festen Boden.", "Er ist zu klein.", "Dort ist es zu dunkel."] },
            { frage: ["Ich bin der größte Planet.", "Ich habe einen roten Fleck.", "Wer bin ich?"], antworten: ["Jupiter", "Mars", "Saturn"] }
        ]
    },

    // ---------------------------------------------------------------- 8
    {
        id: "saturn",
        titel: "Die Ringe des Saturn",
        bild: "Saturn",
        seiten: [
            {
                ueberschrift: "Der Planet mit den Ringen",
                bild: "Saturn",
                bildtext: "Saturn mit seinen Ringen.",
                text: [
                    "Saturn ist der zweitgrößte Planet.",
                    "Um ihn herum liegen breite Ringe.",
                    "",
                    "Man kann sie schon",
                    "mit einem kleinen Fernrohr sehen."
                ],
                sprechblase: { wer: "Lina", text: "Saturn ist mein Lieblingsplanet!" }
            },
            {
                ueberschrift: "Eis und Steine",
                bild: "Saturnringe",
                bildtext: "Von Nahem sieht man viele Brocken.",
                text: [
                    "Die Ringe sind nicht fest.",
                    "Sie bestehen aus unzähligen Brocken",
                    "aus Eis und Gestein.",
                    "",
                    "Manche sind klein wie Staubkörner.",
                    "Andere sind so groß wie ein Haus."
                ],
                sprechblase: { wer: "Ben", text: "Ein Ring aus Eiswürfeln!" }
            },
            {
                ueberschrift: "Ein Planet in der Badewanne",
                bild: "Badewanne",
                bildtext: "So eine große Badewanne gibt es nicht.",
                text: [
                    "Saturn ist riesig, aber sehr leicht.",
                    "Hätte man eine riesige Badewanne,",
                    "dann würde Saturn darin schwimmen.",
                    "",
                    "So leicht ist kein anderer Planet."
                ],
                sprechblase: { wer: "Lina", text: "Und wer lässt das Wasser ein?" }
            },
            {
                ueberschrift: "Seen auf einem Mond",
                bild: "Titan",
                bildtext: "Titan ist der größte Mond des Saturn.",
                hastDuGewusst: [
                    "… dass Saturn mehr Monde hat",
                    "als jeder andere Planet?",
                    "Der größte heißt Titan.",
                    "Auf ihm gibt es Seen.",
                    "Sie sind aber nicht aus Wasser."
                ],
                sprechblase: { wer: "Mira", text: "Baden verboten!" }
            }
        ],
        lesequiz: [
            { frage: "Woraus bestehen die Ringe des Saturn?", antworten: ["aus Eis und Gestein", "aus Gold", "aus Wolle"] },
            { frage: "Was würde Saturn in einer riesigen Badewanne tun?", antworten: ["schwimmen", "untergehen", "schmelzen"] },
            { frage: "Wie heißt der größte Mond des Saturn?", antworten: ["Titan", "Phobos", "Ganymed"] }
        ]
    },

    // ---------------------------------------------------------------- 9
    {
        id: "uranus-neptun",
        titel: "Uranus und Neptun",
        bild: "Neptun",
        seiten: [
            {
                ueberschrift: "Der gekippte Uranus",
                bild: "Uranus",
                bildtext: "Uranus liegt auf der Seite.",
                text: [
                    "Weit draußen kreist Uranus.",
                    "Er ist blaugrün",
                    "und hat dünne, dunkle Ringe.",
                    "",
                    "Uranus liegt auf der Seite.",
                    "Er rollt wie eine Kugel",
                    "um die Sonne."
                ],
                sprechblase: { wer: "Ben", text: "Der ist wohl umgefallen!" }
            },
            {
                ueberschrift: "Eiskalte Riesen",
                bild: "Neptun",
                bildtext: "Neptun ist der äußerste Planet.",
                text: [
                    "Uranus und Neptun",
                    "sind riesige Planeten aus Gas und Eis.",
                    "Man nennt sie Eisriesen.",
                    "",
                    "Dort ist es eisig kalt,",
                    "kälter als in jedem Gefrierschrank."
                ],
                sprechblase: { wer: "Lina", text: "Brrr, ich brauche eine Mütze!" }
            },
            {
                ueberschrift: "Wind wie ein Düsenjet",
                bild: "Sturm",
                bildtext: "Auf Neptun toben riesige Stürme.",
                text: [
                    "Neptun ist der letzte Planet",
                    "in unserem Sonnensystem.",
                    "Auf ihm wehen die stärksten Winde",
                    "im ganzen Sonnensystem.",
                    "",
                    "Sie sind schneller als ein Flugzeug."
                ],
                sprechblase: { wer: "Mira", text: "Gut, dass wir hier nicht landen!" }
            },
            {
                ueberschrift: "Eine lange Runde",
                bild: "Fernrohr",
                bildtext: "Neptun sieht man nur mit einem Fernrohr.",
                hastDuGewusst: [
                    "… dass Neptun",
                    "für eine Runde um die Sonne",
                    "165 Jahre braucht?",
                    "Von der Erde aus",
                    "sieht man ihn nur mit einem Fernrohr."
                ],
                sprechblase: { wer: "Ben", text: "So lange kann ich nicht warten!" }
            }
        ],
        lesequiz: [
            { frage: "Welche Farbe hat Uranus?", antworten: ["blaugrün", "rot", "gelb"] },
            { frage: "Wie nennt man Uranus und Neptun?", antworten: ["Eisriesen", "Feuerriesen", "Zwergplaneten"] },
            { frage: ["Ich bin der letzte Planet im Sonnensystem.", "Auf mir wehen die stärksten Winde.", "Wer bin ich?"], antworten: ["Neptun", "Uranus", "Merkur"] }
        ]
    },

    // ---------------------------------------------------------------- 10
    {
        id: "pluto",
        titel: "Der kleine Pluto",
        bild: "Pluto",
        seiten: [
            {
                ueberschrift: "Ein Zwergplanet",
                bild: "Pluto",
                bildtext: "Pluto ist kleiner als unser Mond.",
                text: [
                    "Ganz weit draußen kreist Pluto.",
                    "Früher hat man ihn Planet genannt.",
                    "Seit 2006 heißt er Zwergplanet.",
                    "",
                    "Er ist sogar kleiner",
                    "als unser Mond."
                ],
                sprechblase: { wer: "Lina", text: "Klein, aber fein!" }
            },
            {
                ueberschrift: "Weit weg von der Sonne",
                bild: "Ferne Sonne",
                bildtext: "Von Pluto aus ist die Sonne nur ein heller Stern.",
                text: [
                    "Pluto ist so weit weg,",
                    "dass das Licht der Sonne",
                    "über fünf Stunden bis dorthin braucht.",
                    "",
                    "Die Sonne sieht von hier aus",
                    "wie ein heller Stern.",
                    "Auf Pluto ist es dunkel und eisig kalt."
                ],
                sprechblase: { wer: "Ben", text: "Wo ist denn die Sonne?" }
            },
            {
                ueberschrift: "Ein Herz aus Eis",
                bild: "Raumsonde",
                bildtext: "Eine Raumsonde fliegt an Pluto vorbei.",
                text: [
                    "Im Jahr 2015 flog eine Raumsonde",
                    "an Pluto vorbei.",
                    "Sie schickte Fotos zur Erde.",
                    "",
                    "Darauf sah man eine helle Fläche aus Eis.",
                    "Sie sieht aus wie ein Herz."
                ],
                sprechblase: { wer: "Lina", text: "Pluto hat ein Herz für uns!" }
            },
            {
                ueberschrift: "Fünf Monde",
                bild: "Charon",
                bildtext: "Pluto und sein großer Mond Charon.",
                hastDuGewusst: [
                    "… dass der kleine Pluto",
                    "fünf Monde hat?",
                    "Der größte heißt Charon.",
                    "Er ist halb so groß wie Pluto selbst."
                ],
                sprechblase: { wer: "Ben", text: "Ein Zwerg mit fünf Monden – stark!" }
            }
        ],
        lesequiz: [
            { frage: "Was ist Pluto heute?", antworten: ["ein Zwergplanet", "ein Stern", "eine Raumstation"] },
            { frage: "Wie sieht die Sonne von Pluto aus?", antworten: ["wie ein heller Stern", "riesig groß", "grün"] },
            { frage: "Was hat die Raumsonde auf Pluto entdeckt?", antworten: ["ein Herz aus Eis", "einen großen Wald", "einen roten Fleck"] }
        ]
    },

    // ---------------------------------------------------------------- 11
    {
        id: "sterne",
        titel: "Sterne und Heimweg",
        bild: "Sterne",
        seiten: [
            {
                ueberschrift: "Ein Meer aus Sternen",
                bild: "Sterne",
                bildtext: "Im All leuchten unzählige Sterne.",
                text: [
                    "Im All leuchten unzählige Sterne.",
                    "Jeder Stern ist eine Sonne.",
                    "Viele sind sogar größer als unsere.",
                    "",
                    "Sie sehen nur klein aus,",
                    "weil sie so weit weg sind."
                ],
                sprechblase: { wer: "Lina", text: "So viele Sterne!" }
            },
            {
                ueberschrift: "Die Milchstraße",
                bild: "Milchstraße",
                bildtext: "Die Milchstraße ist unsere Heimat im All.",
                text: [
                    "Ein heller Streifen",
                    "zieht sich über den Himmel.",
                    "Das ist die Milchstraße.",
                    "",
                    "Zu ihr gehören Milliarden Sterne.",
                    "Auch unsere Sonne ist einer davon."
                ],
                sprechblase: { wer: "Ben", text: "Wie viel sind Milliarden?" }
            },
            {
                ueberschrift: "Zurück zur Erde",
                bild: "Fallschirm",
                bildtext: "Die Kapsel landet an Fallschirmen im Meer.",
                text: [
                    "Die Reise ist zu Ende.",
                    "Die Kapsel fliegt zurück zur Erde.",
                    "Große Fallschirme bremsen sie.",
                    "",
                    "Dann landet sie mit einem Platsch",
                    "im Meer."
                ],
                sprechblase: { wer: "Mira", text: "Willkommen zu Hause!" }
            },
            {
                ueberschrift: "Bilder am Himmel",
                bild: "Sternbild",
                bildtext: "Sieben helle Sterne bilden den Großen Wagen.",
                hastDuGewusst: [
                    "… dass manche Sterne",
                    "am Himmel Bilder formen?",
                    "Man nennt sie Sternbilder.",
                    "Sieben helle Sterne",
                    "bilden den Großen Wagen.",
                    "Du kannst ihn abends sehen."
                ],
                sprechblase: { wer: "Lina", text: "Heute Abend suche ich ihn!" }
            }
        ],
        lesequiz: [
            { frage: "Was ist jeder Stern?", antworten: ["eine Sonne", "ein Planet", "eine Lampe"] },
            { frage: "Wie heißt der helle Streifen am Himmel?", antworten: ["Milchstraße", "Regenbogen", "Sternschnuppe"] },
            { frage: "Wie landet die Kapsel?", antworten: ["an Fallschirmen im Meer", "auf einem Dach", "mit Rädern auf der Straße"] }
        ]
    },

    // Neue Kapitel hier einfügen – jedes Kapitel endet mit },

];

/* =====================================================================
   SILBEN-AUSNAHMEN
   =====================================================================
   Die App trennt die Wörter in den Texten automatisch in Silben. Bei
   zusammengesetzten Wörtern (Welt + all) liegt sie manchmal daneben.
   Hier steht, wie solche Wörter richtig getrennt werden.
   Groß-/Kleinschreibung ist egal. Jede Wortform braucht einen eigenen Eintrag.
   Ein Wort, das hier fehlt, wird automatisch getrennt.
   ===================================================================== */
LESE_MEISTER.silbenAusnahmen = [
    "Welt-all", "Welt-raum", "Welt-raums",
    "Raum-an-zug", "Raum-an-zü-ge", "Raum-an-zü-gen",
    "Raum-sta-ti-on", "Raum-sta-ti-o-nen",
    "Fuß-spu-ren", "Mond-staub",
    "Son-nen-auf-gang", "Son-nen-auf-gän-ge", "Son-nen-un-ter-gang", "Son-nen-un-ter-gän-ge", "Son-nen-strah-len",
    "Milch-stra-ße", "Lieb-lings-pla-net", "Lieb-lings-far-be", "Hand-stand",
    "hin-ein", "hin-aus", "her-aus", "hin-ein-pas-sen", "ein-ein-halb",
    "ü-ber-all", "be-steht", "be-ste-hen", "dunk-le", "Fest-hal-ten",
    "A-bend-stern", "an-ge-strahlt", "Back-o-fen", "dort-hin", "Ge-stein"
];
