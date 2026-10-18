"""Nimmt alle Wörter des Lese-Meisters mit freien KI-Stimmen auf und bündelt sie zu Stimmenpaketen.

Ergebnis im Ordner daten/ der App:
  stimmen.json          Liste der Stimmen und wo jedes Wort im Paket liegt (Wort → Position, Länge)
  stimme-<id>.bin       alle Aufnahmen einer Stimme hintereinander (MP3)

Aufruf (Python 3, dazu: pip install sherpa-onnx numpy, und ffmpeg):
  python3 werkzeug/stimmen-aufnehmen.py --app . --modelle <Ordner mit den Stimmen> [--whisper <Ordner>]

Die Stimmen gibt es als fertige Pakete bei sherpa-onnx (GitHub, Release „tts-models“):
  vits-piper-de_DE-eva_k-x_low.tar.bz2
Mit --whisper (Release „asr-models“: sherpa-onnx-whisper-small.tar.bz2) prüft das Skript jede Aufnahme
mit Spracherkennung, nimmt ein undeutliches Wort bis zu dreimal auf und behält die beste Fassung.
Bereits aufgenommene Wörter liegen im Zwischenspeicher (--cache) und werden nicht neu erzeugt.

Warum ein Trägersatz? Die Stimmen sprechen ein einzelnes Wort oft verschluckt und viel zu kurz
(„Hund.“ dauert nur 0,24 s). Im Satz klingen sie sauber. Deshalb spricht die Stimme
„Das nächste Wort, bitte: Hund.“ und das Skript schneidet „Hund“ heraus. Wo der Trägersatz
endet, findet es, indem es den allein gesprochenen Trägersatz im ganzen Satz wiederfindet (DTW).
"""
import argparse, difflib, hashlib, json, os, re, subprocess, sys, time
import numpy as np

# tempo: Sprechtempo (1 = natürlich, kleiner = langsamer). Einzelwörter etwas langsamer, damit
# Leseanfänger die Laute gut hören (das iPad hat bisher mit 0.8 vorgelesen).
# Ausgewählt nach einem Vergleich mit Spracherkennung (schwierige Wörter wie Helm, Wald, halb, rollt,
# Strohhalm): Eva spricht ausgeschnittene Einzelwörter am deutlichsten. Dii, Kerstin und Ramona
# verschlucken oft das l; Thorsten klingt im Satz natürlich, beginnt ausgeschnittene Wörter aber oft
# mit einem b-artigen Laut.
STIMMEN = {
    "thorsten": dict(name="Thorsten", ordner="vits-piper-de_DE-thorsten-high", datei="de_DE-thorsten-high.onnx",
                     tempo={"wort": 0.85, "satz": 0.95}),
    "eva":      dict(name="Eva",      ordner="vits-piper-de_DE-eva_k-x_low",   datei="de_DE-eva_k-x_low.onnx",
                     tempo={"wort": 0.85, "satz": 0.95}),
    # ausprobiert, aber weniger deutlich:
    "dii":      dict(name="Dii",      ordner="vits-piper-de_DE-dii-high",      datei="de_DE-dii-high.onnx",
                     tempo={"wort": 0.85, "satz": 0.95}),
    "kerstin":  dict(name="Kerstin",  ordner="vits-piper-de_DE-kerstin-low",   datei="de_DE-kerstin-low.onnx",
                     tempo={"wort": 0.85, "satz": 0.9}),
}
# Der Trägersatz endet bewusst auf einem neutralen Vokal (Schwa): Bei „… heißt:“ blieb oft das t von
# „heißt“ am Wort hängen, nach „… also:“ begannen viele Wörter mit einem b-artigen Laut.
TRAEGER = "Das nächste Wort, bitte:"
VORSPANN = "Ich zeige dir jetzt das Wort"   # nur für die Prüfung mit Spracherkennung
VERFAHREN = "traeger-bitte-1"   # ändert sich das Verfahren, wird alles neu aufgenommen

# Wörter, die die Stimmen sonst falsch aussprechen würden: Wort → was die Stimme stattdessen liest
AUSSPRACHE = {
    "ISS": "I, S, S",
    "1969": "neunzehnhundertneunundsechzig",
    "1800": "achtzehnhundert",
    "2006": "zweitausendsechs",
    "2015": "zweitausendfünfzehn",
    "2020": "zweitausendzwanzig",
}
# Wörter, die groß und klein verschieden klingen (der Weg / weg): getrennt aufnehmen
HOMOGRAPHE = {"weg", "sucht"}


def schluessel(wort):
    """So sucht die App ein Wort im Paket: klein geschrieben, außer bei HOMOGRAPHE."""
    return wort if wort.lower() in HOMOGRAPHE else wort.lower()


def lade_tts(modelle, sid):
    import sherpa_onnx
    s = STIMMEN[sid]
    o = os.path.join(modelle, s["ordner"])
    cfg = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=os.path.join(o, s["datei"]), tokens=os.path.join(o, "tokens.txt"),
                data_dir=os.path.join(o, "espeak-ng-data"), noise_scale=0.667, noise_scale_w=0.5),
            num_threads=max(1, os.cpu_count() or 1), provider="cpu"),
        max_num_sentences=1)
    return sherpa_onnx.OfflineTts(cfg)


# ---------- Wort aus dem Trägersatz schneiden ----------
def logmel(x, rate, hop=0.01, win=0.025, n_mels=40):
    h, w = int(rate * hop), int(rate * win)
    nfft = 1
    while nfft < w:
        nfft *= 2
    if len(x) < w:
        x = np.pad(x, (0, w - len(x)))
    k = 1 + (len(x) - w) // h
    idx = np.arange(w)[None, :] + h * np.arange(k)[:, None]
    spec = np.abs(np.fft.rfft(x[idx] * np.hanning(w), nfft)) ** 2
    mel = lambda f: 2595 * np.log10(1 + f / 700)
    imel = lambda m: 700 * (10 ** (m / 2595) - 1)
    pts = imel(np.linspace(mel(60), mel(min(7600, rate / 2)), n_mels + 2))
    bins = np.floor((nfft + 1) * pts / rate).astype(int)
    fb = np.zeros((n_mels, nfft // 2 + 1))
    for i in range(n_mels):
        a, b, c = bins[i], bins[i + 1], bins[i + 2]
        if b > a:
            fb[i, a:b] = (np.arange(a, b) - a) / (b - a)
        if c > b:
            fb[i, b:c] = (c - np.arange(b, c)) / (c - b)
    return np.log(spec @ fb.T + 1e-8), np.sqrt((x[idx] ** 2).mean(1))


def traeger_ende(carrier, full, rate):
    """Frame (10 ms), an dem der Trägersatz im ganzen Satz endet – DTW mit offenem Ende."""
    A, ea = logmel(carrier, rate)
    B, eb = logmel(full, rate)
    laut = np.where(ea > ea.max() * 0.02)[0]
    A = A[: laut[-1] + 1]                       # Stille nach dem Trägersatz nicht mitzählen
    n, m = len(A), len(B)
    d = np.sqrt(((A[:, None, :] - B[None, :, :]) ** 2).sum(-1))
    D = np.full((n + 1, m + 1), np.inf)
    D[0, 0] = 0
    for i in range(1, n + 1):
        prev, cur, di = D[i - 1], D[i], d[i - 1]
        diag_up = np.minimum(prev[:-1], prev[1:]) + di   # Schritte von oben/links-oben
        for j in range(1, m + 1):
            cur[j] = min(diag_up[j - 1], cur[j - 1] + di[j - 1])
    kosten = D[n, 1:] / (n + np.arange(1, m + 1))
    return int(np.argmin(kosten)), eb


def schneide_wort(carrier, full, rate, art="laengste"):
    """art = "laengste": in der längsten Pause schneiden; "erste": in der ersten Pause direkt nach
    dem Trägersatz (hilft, wenn das Wort selbst eine lange Pause hat, z. B. Klett-band)."""
    je, e = traeger_ende(carrier, full, rate)
    if je >= len(e) - 5:
        return None
    # Am besten in der Sprechpause nach dem Doppelpunkt schneiden: Pause (≥ 40 ms Stille) kurz vor
    # oder nach dem gefundenen Ende suchen. Gibt es keine, am leisesten Punkt danach schneiden.
    still = e < max(e.max() * 0.02, 1e-4)
    a, b = max(1, je - 15), min(len(e) - 1, je + 25)
    pausen, i = [], a
    while i < b:
        if still[i]:
            j = i
            while j < len(e) and still[j]:
                j += 1
            if j - i >= 4 and j < len(e):
                pausen.append((j - i, i, j))
            i = j
        else:
            i += 1
    if art == "erste":
        pausen = [p for p in pausen if p[1] <= je + 8][:1]
    if pausen:
        _, i, j = max(pausen)
        k = max(i, j - 6)                        # bis 60 ms vor dem Wort
    else:
        weite = 8 if art == "erste" else 20      # leisester Punkt kurz danach
        k = je + int(np.argmin(e[je: je + weite]))
    return full[k * int(rate * 0.01):]


def zuschneiden(x, rate):
    """Stille am Anfang und Ende abschneiden (mit Rand, damit leise Anlaute wie h bleiben), Lautstärke angleichen."""
    if len(x) == 0:
        return x
    n = int(rate * 0.01)
    huelle = np.convolve(np.abs(x), np.ones(n) / n, mode="same")
    laut = np.where(huelle > max(0.004, huelle.max() * 0.015))[0]
    if len(laut):
        x = x[max(0, laut[0] - int(rate * 0.06)): min(len(x), laut[-1] + int(rate * 0.12))]
    x = x * (0.89 / (np.max(np.abs(x)) or 1.0))  # Spitze bei etwa -1 dB
    rampe = min(len(x) // 4, n)                  # weiche Ränder gegen Knackser
    if rampe > 0:
        x[:rampe] *= np.linspace(0, 1, rampe)
        x[-rampe:] *= np.linspace(1, 0, rampe)
    return np.concatenate([np.zeros(int(rate * 0.03)), x, np.zeros(int(rate * 0.09))]).astype(np.float32)


def als_mp3(x, rate, kbps):
    pcm = (np.clip(x, -1, 1) * 32767).astype("<i2").tobytes()
    return subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-f", "s16le", "-ar", str(rate), "-ac", "1", "-i", "pipe:0",
         "-codec:a", "libmp3lame", "-b:a", f"{kbps}k", "-ac", "1", "-write_xing", "0", "-id3v2_version", "0",
         "-f", "mp3", "pipe:1"],
        input=pcm, capture_output=True, check=True).stdout


def als_16k(mp3):
    roh = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", "pipe:0", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         input=mp3, capture_output=True, check=True).stdout
    return np.frombuffer(roh, dtype=np.float32)


# ---------- Prüfen mit Spracherkennung ----------
class Pruefer:
    """Whisper hört den Trägersatz + Aufnahme und schreibt auf, was es danach verstanden hat."""
    def __init__(self, ordner, tts, tempo):
        import sherpa_onnx
        self.rec = sherpa_onnx.OfflineRecognizer.from_whisper(
            encoder=os.path.join(ordner, "small-encoder.int8.onnx"),
            decoder=os.path.join(ordner, "small-decoder.int8.onnx"),
            tokens=os.path.join(ordner, "small-tokens.txt"), language="de",
            num_threads=max(1, os.cpu_count() or 1))
        # eigener Vorspann: nach „bitte“ hörte Whisper oft „bittere …“ und zerlegte das Wort falsch
        a = tts.generate(VORSPANN, sid=0, speed=tempo)
        self.vorspann = als_16k(als_mp3(np.array(a.samples, np.float32), a.sample_rate, 32))

    @staticmethod
    def norm(t):
        t = t.lower().replace("ß", "ss")
        return " ".join(re.sub(r"[^a-zäöü0-9 ]+", " ", t).split())

    def note(self, woerter, mp3):
        z, zz = np.zeros(4000, np.float32), np.zeros(8000, np.float32)
        s = self.rec.create_stream()
        s.accept_waveform(16000, np.concatenate([zz, self.vorspann, z, als_16k(mp3), zz]))
        self.rec.decode_stream(s)
        text = s.result.text
        if "wort" in text.lower():               # alles nach dem Vorspann ist das Wort
            text = re.split("wort", text, flags=re.I)[-1]
        gehoert = text.strip(" \"'„“.,!:?")
        return max(difflib.SequenceMatcher(None, self.norm(w), self.norm(gehoert)).ratio() for w in woerter), gehoert


def main():
    hier = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument("--app", default=os.path.join(hier, ".."))
    ap.add_argument("--modelle", required=True)
    ap.add_argument("--whisper", default="", help="Ordner mit sherpa-onnx-whisper-small (optional, zum Prüfen)")
    ap.add_argument("--stimmen", default="eva")
    ap.add_argument("--kbps", type=int, default=32)
    ap.add_argument("--cache", default=os.path.join(hier, ".cache"))
    a = ap.parse_args()

    roh = subprocess.run(["node", os.path.join(hier, "woerter-sammeln.js"), a.app],
                         capture_output=True, check=True, text=True).stdout
    daten = json.loads(roh)

    # Pro Schlüssel eine Aufnahme. Bei Groß/klein-Paaren die kleingeschriebene Form vorlesen lassen.
    auftraege = {}
    for w in daten["woerter"]:
        k = schluessel(w)
        if k not in auftraege or (w == w.lower() and auftraege[k] != auftraege[k].lower()):
            auftraege[k] = w
    saetze = {s.lower(): s for s in daten["saetze"]}

    ziel = os.path.join(a.app, "daten")
    manifest = {"erstellt": time.strftime("%Y-%m-%d"), "probe": daten["saetze"][0], "stimmen": []}
    bericht = {}
    for sid in [x.strip() for x in a.stimmen.split(",") if x.strip()]:
        tts = pruefer = None
        traeger_audio = {}
        tempo = STIMMEN[sid]["tempo"]
        cache = os.path.join(a.cache, sid)
        os.makedirs(cache, exist_ok=True)
        teile, eintraege, pos, neu, t0, unsicher = [], {}, 0, 0, time.time(), []
        alles = [(k, w, "wort") for k, w in sorted(auftraege.items())] + [(k, s, "satz") for k, s in saetze.items()]
        for k, w, art in alles:
            eingabe = AUSSPRACHE.get(w, w)
            h = hashlib.sha1(f"{VERFAHREN}|{eingabe}|{tempo[art]}|{a.kbps}|{bool(a.whisper)}".encode()).hexdigest()[:16]
            pfad = os.path.join(cache, h + ".mp3")
            if not os.path.exists(pfad):
                if tts is None:
                    tts = lade_tts(a.modelle, sid)
                    traeger_audio = {}
                    if a.whisper:
                        pruefer = Pruefer(a.whisper, tts, tempo["satz"])
                if art == "satz":
                    s = tts.generate(eingabe, sid=0, speed=tempo["satz"])
                    mp3 = als_mp3(zuschneiden(np.array(s.samples, np.float32), s.sample_rate), s.sample_rate, a.kbps)
                else:
                    beste = None
                    traeger = TRAEGER
                    if traeger not in traeger_audio:
                        c = tts.generate(traeger, sid=0, speed=tempo["wort"])
                        traeger_audio[traeger] = np.array(c.samples, np.float32)
                    for versuch in range(3 if pruefer else 1):
                        s = tts.generate(f"{traeger} {eingabe}.", sid=0, speed=tempo["wort"])
                        voll = np.array(s.samples, np.float32)
                        gesehen = set()
                        for art in (("laengste", "erste") if pruefer else ("laengste",)):
                            stueck = schneide_wort(traeger_audio[traeger], voll, s.sample_rate, art)
                            if stueck is None or len(stueck) < s.sample_rate * 0.12 or len(stueck) in gesehen:
                                continue
                            gesehen.add(len(stueck))
                            kandidat = als_mp3(zuschneiden(stueck.copy(), s.sample_rate), s.sample_rate, a.kbps)
                            note, gehoert = pruefer.note({w, eingabe}, kandidat) if pruefer else (1.0, "")
                            if beste is None or note > beste[0]:
                                beste = (note, kandidat, gehoert)
                            if note >= 0.75:
                                break
                        if beste and beste[0] >= 0.75:
                            break
                    if beste is None:
                        print(f"  ! nicht aufgenommen: {w!r}", flush=True)
                        continue
                    mp3 = beste[1]
                    if pruefer and beste[0] < 0.75:
                        unsicher.append((round(beste[0], 2), w, beste[2]))
                with open(pfad, "wb") as f:
                    f.write(mp3)
                neu += 1
            b = open(pfad, "rb").read()
            eintraege[k] = [pos, len(b)]
            teile.append(b)
            pos += len(b)
        paket = b"".join(teile)
        datei = f"stimme-{sid}.bin"
        with open(os.path.join(ziel, datei), "wb") as f:
            f.write(paket)
        manifest["stimmen"].append({
            "id": sid, "name": STIMMEN[sid]["name"], "datei": datei,
            "version": hashlib.sha1(paket).hexdigest()[:10], "eintraege": eintraege})
        bericht[sid] = sorted(unsicher)
        print(f"{sid}: {len(eintraege)} Aufnahmen ({neu} neu) · {len(paket) / 1e6:.2f} MB · {time.time() - t0:.0f} s"
              + (f" · {len(unsicher)} unsicher" if pruefer else ""), flush=True)

    with open(os.path.join(ziel, "stimmen.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))
    if a.whisper:
        with open(os.path.join(a.cache, "unsicher.json"), "w", encoding="utf-8") as f:
            json.dump(bericht, f, ensure_ascii=False, indent=1)
    print("fertig:", os.path.join(ziel, "stimmen.json"))


if __name__ == "__main__":
    main()
