/* =====================================================================
   LESE-MEISTER – BILDER FÜR DIE WELTALL-TEXTE
   =====================================================================
   Eigene Zeichnungen (SVG) im flachen Stil von Planeten-Lernkarten.
   In daten/weltall-texte.js wird ein Bild über seinen Namen eingesetzt,
   z. B. bild: "Rover". Groß-/Kleinschreibung ist egal.

   Vorhandene Bilder:
   Planeten & Monde: Erde, Mond, Sonne, Merkur, Venus, Mars, Jupiter, Saturn,
                     Uranus, Neptun, Pluto, Titan, Charon
   Szenen:           Rakete, Raumanzug, Raumkapsel, Raumstation, Schwerelos,
                     Schlafsack, Sonnenaufgang, Mondsprung, Fußspur, Erdaufgang,
                     Größenvergleich, Schutzbrille, Sonnensystem, Abendstern,
                     Vulkan, Rover, Marsabend, Asteroiden, Roter Fleck,
                     Jupitermonde, Saturnringe, Badewanne, Sturm, Fernrohr,
                     Ferne Sonne, Raumsonde, Sterne, Milchstraße, Fallschirm,
                     Sternbild

   Wer ein neues Bild braucht, kann statt eines Namens auch ein Emoji
   eintragen, z. B. bild: "☄️".
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

(function () {
    'use strict';
    var W = 320, H = 180;

    // ---------- Hilfen ----------
    function rnd(seed) {
        var s = seed % 2147483647;
        if (s <= 0) s += 2147483646;
        return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; };
    }
    function n(v) { return Math.round(v * 10) / 10; }
    function svg(w, h, body) {
        return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + body + '</svg>';
    }
    function sky(id, top, bottom, w, h) {
        return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bottom + '"/></linearGradient></defs>' +
            '<rect width="' + (w || W) + '" height="' + (h || H) + '" fill="url(#' + id + ')"/>';
    }
    function space(id) { return sky(id, '#141a3d', '#232c5e'); }
    function stars(seed, count, w, h, maxY) {
        var r = rnd(seed), out = '<g fill="#fff">';
        for (var i = 0; i < count; i++) {
            var big = r() < 0.12;
            out += '<circle cx="' + n(r() * (w || W)) + '" cy="' + n(r() * (maxY || h || H)) + '" r="' + n(big ? 1.4 + r() * 0.6 : 0.5 + r() * 0.6) +
                '" opacity="' + n(0.35 + r() * 0.65) + '"/>';
        }
        return out + '</g>';
    }
    function sparkle(x, y, s, color) {
        return '<path d="M' + x + ' ' + (y - s) + ' Q' + x + ' ' + y + ' ' + (x + s) + ' ' + y + ' Q' + x + ' ' + y + ' ' + x + ' ' + (y + s) +
            ' Q' + x + ' ' + y + ' ' + (x - s) + ' ' + y + ' Q' + x + ' ' + y + ' ' + x + ' ' + (y - s) + 'Z" fill="' + (color || '#fff') + '"/>';
    }
    // Kugel mit Licht von links oben und Schatten unten rechts
    function ball(id, cx, cy, r, color, inner) {
        return '<defs><clipPath id="' + id + 'c"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/></clipPath>' +
            '<radialGradient id="' + id + 'g" cx="0.32" cy="0.28" r="0.85">' +
            '<stop offset="0" stop-color="#fff" stop-opacity="0.38"/><stop offset="0.45" stop-color="#fff" stop-opacity="0"/>' +
            '<stop offset="0.78" stop-color="#000" stop-opacity="0.15"/><stop offset="1" stop-color="#000" stop-opacity="0.42"/></radialGradient></defs>' +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '"/>' +
            '<g clip-path="url(#' + id + 'c)">' + (inner || '') + '</g>' +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + id + 'g)"/>';
    }
    // Flecken für die "gesprenkelte" Oberfläche
    function blobs(seed, cx, cy, r, colors, count, minR, maxR) {
        var rr = rnd(seed), out = '';
        for (var i = 0; i < count; i++) {
            var a = rr() * Math.PI * 2, d = Math.sqrt(rr()) * r;
            var size = (minR + rr() * (maxR - minR)) * r;
            out += '<ellipse cx="' + n(cx + Math.cos(a) * d) + '" cy="' + n(cy + Math.sin(a) * d) + '" rx="' + n(size) + '" ry="' + n(size * (0.55 + rr() * 0.45)) +
                '" transform="rotate(' + Math.round(rr() * 180) + ' ' + n(cx + Math.cos(a) * d) + ' ' + n(cy + Math.sin(a) * d) + ')" fill="' + colors[i % colors.length] + '"/>';
        }
        return out;
    }
    function craters(seed, cx, cy, r, count, dark, light) {
        var rr = rnd(seed), out = '';
        for (var i = 0; i < count; i++) {
            var a = rr() * Math.PI * 2, d = Math.sqrt(rr()) * r * 0.85;
            var x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, s = r * (0.06 + rr() * 0.14);
            out += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(s) + '" fill="' + dark + '"/>' +
                '<path d="M' + n(x - s) + ' ' + n(y) + ' A' + n(s) + ' ' + n(s) + ' 0 0 0 ' + n(x + s) + ' ' + n(y) + '" fill="none" stroke="' + light + '" stroke-width="' + n(Math.max(0.8, s * 0.25)) + '"/>';
        }
        return out;
    }
    function bands(cx, cy, r, list) {
        // list: [[Anteil von oben (0..1), Höhe (0..1), Farbe], …]
        return list.map(function (b) {
            return '<rect x="' + n(cx - r) + '" y="' + n(cy - r + b[0] * 2 * r) + '" width="' + n(2 * r) + '" height="' + n(b[1] * 2 * r) + '" fill="' + b[2] + '"/>';
        }).join('');
    }

    // ---------- Planeten und Monde ----------
    var P = {};
    P.Erde = function (id, cx, cy, r) {
        var land = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + r + ')" fill="#3fae5a">' +
            '<path d="M-0.55,-0.75 C-0.3,-0.82 -0.18,-0.58 -0.33,-0.42 C-0.45,-0.27 -0.2,-0.16 -0.25,0.04 C-0.3,0.3 -0.08,0.45 -0.18,0.7 C-0.28,0.86 -0.45,0.62 -0.46,0.4 C-0.47,0.2 -0.66,0.1 -0.62,-0.1 C-0.58,-0.32 -0.82,-0.46 -0.55,-0.75Z"/>' +
            '<path d="M0.12,-0.58 C0.34,-0.7 0.58,-0.58 0.52,-0.36 C0.68,-0.26 0.74,0 0.56,0.2 C0.45,0.42 0.34,0.62 0.24,0.56 C0.12,0.46 0.18,0.22 0.08,0.06 C-0.02,-0.1 0.02,-0.32 0.12,-0.58Z"/>' +
            '<path d="M0.62,0.48 C0.74,0.44 0.82,0.56 0.72,0.66 C0.64,0.72 0.56,0.58 0.62,0.48Z" fill="#2e9b4b"/>' +
            '<path d="M-0.5,-0.55 C-0.42,-0.6 -0.36,-0.5 -0.42,-0.44 Z M0.26,-0.4 C0.36,-0.42 0.42,-0.3 0.34,-0.24 Z" fill="#2e9b4b"/>' +
            '</g>';
        var clouds = blobs(11, cx, cy, r, ['#ffffff'], 9, 0.06, 0.16).replace(/fill="#ffffff"/g, 'fill="#ffffff" opacity="0.8"');
        var ice = '<ellipse cx="' + cx + '" cy="' + n(cy - r * 0.98) + '" rx="' + n(r * 0.5) + '" ry="' + n(r * 0.16) + '" fill="#f4fbff"/>' +
            '<ellipse cx="' + cx + '" cy="' + n(cy + r * 0.98) + '" rx="' + n(r * 0.42) + '" ry="' + n(r * 0.13) + '" fill="#f4fbff"/>';
        return ball(id, cx, cy, r, '#2f80d8', land + ice + clouds) +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(r + 1.5) + '" fill="none" stroke="#9fd3ff" stroke-width="2" opacity="0.55"/>';
    };
    P.Mond = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#cdd2d7',
            blobs(21, cx, cy, r, ['#b4bbc2', '#bfc5cb'], 6, 0.14, 0.3) + craters(22, cx, cy, r, 9, '#a9b0b7', '#e3e7ea'));
    };
    P.Merkur = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#a99a8a',
            blobs(31, cx, cy, r, ['#bfb1a1', '#958676'], 8, 0.12, 0.26) + craters(32, cx, cy, r, 11, '#8c7d6e', '#cdbfb0'));
    };
    P.Venus = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#f0b14d',
            blobs(41, cx, cy, r, ['#e5973a', '#f8cd76', '#eaa543', '#fbd98c'], 16, 0.12, 0.32));
    };
    P.Mars = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#d4552b',
            blobs(51, cx, cy, r, ['#a93f1f', '#e8794a', '#bd4a24', '#f08a58'], 16, 0.08, 0.26) +
            '<ellipse cx="' + cx + '" cy="' + n(cy - r * 0.95) + '" rx="' + n(r * 0.42) + '" ry="' + n(r * 0.16) + '" fill="#fbeee6"/>');
    };
    P.Jupiter = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#ead0ae', bands(cx, cy, r, [
            [0.08, 0.06, '#d6ab80'], [0.2, 0.09, '#c58e60'], [0.34, 0.07, '#f4e2c8'], [0.44, 0.1, '#b9774c'],
            [0.58, 0.06, '#f2dcc0'], [0.67, 0.09, '#c98f5e'], [0.82, 0.06, '#d8b088']]) +
            '<ellipse cx="' + n(cx + r * 0.32) + '" cy="' + n(cy + r * 0.38) + '" rx="' + n(r * 0.26) + '" ry="' + n(r * 0.14) + '" fill="#e8a37d"/>' +
            '<ellipse cx="' + n(cx + r * 0.32) + '" cy="' + n(cy + r * 0.38) + '" rx="' + n(r * 0.19) + '" ry="' + n(r * 0.09) + '" fill="#c4513d"/>');
    };
    P.Saturn = function (id, cx, cy, r) {
        var rx = r * 2.15, ry = r * 0.52;
        var ring = function (clip) {
            return '<g' + (clip ? ' clip-path="url(#' + id + 'f)"' : '') + '>' +
                '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + n(rx) + '" ry="' + n(ry) + '" fill="none" stroke="#ecd9a8" stroke-width="' + n(r * 0.22) + '"/>' +
                '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + n(rx * 0.8) + '" ry="' + n(ry * 0.8) + '" fill="none" stroke="#c9a868" stroke-width="' + n(r * 0.1) + '"/>' +
                '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + n(rx * 1.1) + '" ry="' + n(ry * 1.1) + '" fill="none" stroke="#d9c08a" stroke-width="' + n(r * 0.06) + '"/></g>';
        };
        return '<g transform="rotate(-14 ' + cx + ' ' + cy + ')">' +
            '<defs><clipPath id="' + id + 'f"><rect x="' + n(cx - rx * 1.3) + '" y="' + cy + '" width="' + n(rx * 2.6) + '" height="' + n(r * 2) + '"/></clipPath></defs>' +
            ring(false) +
            ball(id, cx, cy, r, '#f1c56e', bands(cx, cy, r, [[0.12, 0.08, '#e3ac52'], [0.3, 0.1, '#f8dc9b'], [0.5, 0.09, '#dda04a'], [0.68, 0.08, '#f6d58c'], [0.84, 0.07, '#e2a950']])) +
            ring(true) + '</g>';
    };
    P.Uranus = function (id, cx, cy, r) {
        return '<g transform="rotate(-8 ' + cx + ' ' + cy + ')">' +
            '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + n(r * 0.35) + '" ry="' + n(r * 1.7) + '" fill="none" stroke="#5f7f88" stroke-width="2"/>' +
            ball(id, cx, cy, r, '#93dbe3', '<g transform="rotate(90 ' + cx + ' ' + cy + ')">' + bands(cx, cy, r, [[0.15, 0.12, '#86cfd9'], [0.42, 0.16, '#a6e4ea'], [0.72, 0.12, '#84ccd6']]) + '</g>') +
            '<path d="M' + n(cx - r * 0.35) + ' ' + cy + ' A' + n(r * 0.35) + ' ' + n(r * 1.7) + ' 0 0 0 ' + n(cx + r * 0.35) + ' ' + cy + '" fill="none" stroke="#5f7f88" stroke-width="2"/>' +
            '</g>';
    };
    P.Neptun = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#3d70d8', bands(cx, cy, r, [[0.2, 0.06, '#5585e2'], [0.55, 0.05, '#2e5bc0'], [0.75, 0.06, '#5a8ae4']]) +
            '<ellipse cx="' + n(cx - r * 0.2) + '" cy="' + n(cy + r * 0.05) + '" rx="' + n(r * 0.22) + '" ry="' + n(r * 0.12) + '" fill="#233f94"/>' +
            '<ellipse cx="' + n(cx + r * 0.1) + '" cy="' + n(cy - r * 0.35) + '" rx="' + n(r * 0.28) + '" ry="' + n(r * 0.05) + '" fill="#e8f1ff" opacity="0.8"/>' +
            '<ellipse cx="' + n(cx - r * 0.05) + '" cy="' + n(cy + r * 0.25) + '" rx="' + n(r * 0.15) + '" ry="' + n(r * 0.04) + '" fill="#e8f1ff" opacity="0.7"/>');
    };
    P.Pluto = function (id, cx, cy, r) {
        var heart = '<g transform="translate(' + n(cx + r * 0.15) + ' ' + n(cy + r * 0.12) + ') scale(' + n(r * 0.55) + ')">' +
            '<path d="M0,0.75 C-0.5,0.35 -0.85,0 -0.75,-0.35 C-0.65,-0.7 -0.2,-0.7 0,-0.35 C0.2,-0.7 0.65,-0.7 0.75,-0.35 C0.85,0 0.5,0.35 0,0.75Z" fill="#f7eedf"/></g>';
        return ball(id, cx, cy, r, '#d6bf9d', blobs(61, cx, cy, r, ['#8a6a4e', '#b39573', '#e6d6bb'], 9, 0.1, 0.24) + heart);
    };
    P.Titan = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#e3a648', bands(cx, cy, r, [[0.25, 0.1, '#eebb62'], [0.6, 0.12, '#d8963a']]) +
            '<ellipse cx="' + n(cx - r * 0.2) + '" cy="' + n(cy - r * 0.7) + '" rx="' + n(r * 0.2) + '" ry="' + n(r * 0.08) + '" fill="#6b4a2a"/>' +
            '<ellipse cx="' + n(cx + r * 0.25) + '" cy="' + n(cy - r * 0.62) + '" rx="' + n(r * 0.12) + '" ry="' + n(r * 0.06) + '" fill="#6b4a2a"/>') +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(r + 2.5) + '" fill="none" stroke="#f5c77a" stroke-width="4" opacity="0.35"/>';
    };
    P.Charon = function (id, cx, cy, r) {
        return ball(id, cx, cy, r, '#a9a5a0', blobs(71, cx, cy, r, ['#97928c', '#bbb7b2'], 6, 0.12, 0.25) +
            '<ellipse cx="' + cx + '" cy="' + n(cy - r * 0.85) + '" rx="' + n(r * 0.5) + '" ry="' + n(r * 0.25) + '" fill="#7a4f45"/>');
    };
    P.Sonne = function (id, cx, cy, r) {
        var rays = '';
        for (var i = 0; i < 16; i++) {
            var a = i / 16 * Math.PI * 2, long = i % 2 === 0 ? 1.45 : 1.28, w = 0.16;
            var x1 = cx + Math.cos(a - w) * r * 0.95, y1 = cy + Math.sin(a - w) * r * 0.95;
            var x2 = cx + Math.cos(a) * r * long, y2 = cy + Math.sin(a) * r * long;
            var x3 = cx + Math.cos(a + w) * r * 0.95, y3 = cy + Math.sin(a + w) * r * 0.95;
            rays += '<path d="M' + n(x1) + ' ' + n(y1) + ' Q' + n(cx + Math.cos(a - 0.05) * r * 1.2) + ' ' + n(cy + Math.sin(a - 0.05) * r * 1.2) + ' ' + n(x2) + ' ' + n(y2) +
                ' Q' + n(cx + Math.cos(a + 0.05) * r * 1.2) + ' ' + n(cy + Math.sin(a + 0.05) * r * 1.2) + ' ' + n(x3) + ' ' + n(y3) + 'Z" fill="' + (i % 2 ? '#f39c12' : '#f7b733') + '"/>';
        }
        return '<defs><radialGradient id="' + id + 's" cx="0.4" cy="0.38" r="0.7"><stop offset="0" stop-color="#fff8b0"/><stop offset="0.55" stop-color="#fcd116"/><stop offset="1" stop-color="#f5a623"/></radialGradient></defs>' +
            '<radialGradient id="' + id + 'h" cx="0.5" cy="0.5" r="0.5"><stop offset="0.55" stop-color="#ffe9a0" stop-opacity="0.45"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>' +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(r * 1.75) + '" fill="url(#' + id + 'h)"/>' + rays +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + id + 's)"/>' +
            blobs(81, cx, cy, r * 0.8, ['#ffe066'], 7, 0.08, 0.16).replace(/fill="#ffe066"/g, 'fill="#ffe066" opacity="0.6"');
    };

    // ---------- Figuren und Dinge ----------
    function astronaut(x, y, s, rot, flag) {
        return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')" stroke="#7d8a99" stroke-width="1.6" stroke-linejoin="round">' +
            '<rect x="-21" y="-31" width="42" height="44" rx="8" fill="#cfd6de"/>' +                     // Rucksack
            '<path d="M-17,-8 C-30,-2 -34,10 -30,20" fill="none" stroke="#7d8a99" stroke-width="12" stroke-linecap="round"/>' +
            '<path d="M-17,-8 C-30,-2 -34,10 -30,20" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>' +
            '<path d="M17,-8 C30,-6 34,-20 30,-30" fill="none" stroke="#7d8a99" stroke-width="12" stroke-linecap="round"/>' +
            '<path d="M17,-8 C30,-6 34,-20 30,-30" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>' +
            '<circle cx="-30" cy="22" r="5.5" fill="#cfd6de"/><circle cx="30" cy="-32" r="5.5" fill="#cfd6de"/>' +
            '<path d="M-10,18 L-12,44" stroke="#7d8a99" stroke-width="13" stroke-linecap="round"/>' +
            '<path d="M-10,18 L-12,44" stroke="#fff" stroke-width="10" stroke-linecap="round"/>' +
            '<path d="M10,18 L14,44" stroke="#7d8a99" stroke-width="13" stroke-linecap="round"/>' +
            '<path d="M10,18 L14,44" stroke="#fff" stroke-width="10" stroke-linecap="round"/>' +
            '<rect x="-20" y="42" width="15" height="8" rx="3" fill="#9aa6b2"/><rect x="7" y="42" width="15" height="8" rx="3" fill="#9aa6b2"/>' +
            '<rect x="-18" y="-26" width="36" height="48" rx="11" fill="#fff"/>' +                     // Körper
            '<rect x="-9" y="-12" width="18" height="11" rx="2" fill="#dfe6ee"/>' +
            '<circle cx="-4" cy="-7" r="2" fill="#e74c3c" stroke="none"/><circle cx="3" cy="-7" r="2" fill="#3498db" stroke="none"/>' +
            (flag ? '<rect x="-15" y="-22" width="9" height="6" fill="#1565C0" stroke="none"/>' : '') +
            '<circle cx="0" cy="-42" r="19" fill="#fff"/>' +                                            // Helm
            '<ellipse cx="0" cy="-41" rx="13.5" ry="11.5" fill="#2d4f7c"/>' +
            '<path d="M-8,-47 C-4,-50 3,-50 6,-48" fill="none" stroke="#9cc3ff" stroke-width="2.5" stroke-linecap="round"/>' +
            '<circle cx="8" cy="-37" r="1.8" fill="#9cc3ff" stroke="none"/>' +
            '</g>';
    }
    function rocket(x, y, s, flame) {
        return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="#5d6d7e" stroke-width="1.5" stroke-linejoin="round">' +
            (flame ? '<path d="M-10,38 C-14,60 -4,78 0,92 C4,78 14,60 10,38Z" fill="#f39c12" stroke="none"/>' +
                '<path d="M-6,38 C-8,54 -2,66 0,76 C2,66 8,54 6,38Z" fill="#ffe066" stroke="none"/>' : '') +
            '<path d="M-14,10 L-30,34 L-30,42 L-12,36Z" fill="#e74c3c"/>' +
            '<path d="M14,10 L30,34 L30,42 L12,36Z" fill="#e74c3c"/>' +
            '<rect x="-10" y="34" width="20" height="8" rx="2" fill="#7f8c8d"/>' +
            '<path d="M-14,-30 C-14,-58 0,-74 0,-74 C0,-74 14,-58 14,-30 L14,36 L-14,36Z" fill="#fdfefe"/>' +
            '<path d="M-11.5,-44 C-8,-62 0,-74 0,-74 C0,-74 8,-62 11.5,-44Z" fill="#e74c3c"/>' +
            '<circle cx="0" cy="-22" r="7" fill="#5dade2"/><circle cx="-2" cy="-24" r="2" fill="#d6eaf8" stroke="none"/>' +
            '<rect x="-14" y="8" width="28" height="5" fill="#1565C0" stroke="none"/>' +
            '<path d="M0,-74 L0,-36" stroke="#e74c3c" stroke-width="0" />' +
            '<path d="M-2,14 L-2,34" stroke="#eaeef2" stroke-width="3"/>' +
            '</g>';
    }
    function cloud(x, y, s, color) {
        return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + (color || '#fff') + '">' +
            '<circle cx="-16" cy="4" r="12"/><circle cx="0" cy="-4" r="16"/><circle cx="17" cy="3" r="12"/><rect x="-28" y="3" width="56" height="13" rx="6"/></g>';
    }
    function earthLimb(id, cy, r) {
        return '<defs><radialGradient id="' + id + 'l" cx="0.5" cy="0.5" r="0.5"><stop offset="0.9" stop-color="#2f80d8"/><stop offset="0.985" stop-color="#7cc4ff"/><stop offset="1" stop-color="#bfe4ff" stop-opacity="0"/></radialGradient></defs>' +
            '<clipPath id="' + id + 'k"><circle cx="160" cy="' + cy + '" r="' + (r - 4) + '"/></clipPath>' +
            '<circle cx="160" cy="' + cy + '" r="' + r + '" fill="url(#' + id + 'l)"/>' +
            '<g clip-path="url(#' + id + 'k)">' +
            blobs(91, 160, cy - r * 0.9, r * 0.3, ['#3fae5a', '#ffffff'], 12, 0.05, 0.14).replace(/fill="#ffffff"/g, 'fill="#ffffff" opacity="0.75"') + '</g>';
    }
    function station(x, y, s) {
        var panel = function (px, py, w, h) {
            var lines = '';
            for (var i = 1; i < 6; i++) lines += '<line x1="' + n(px + w * i / 6) + '" y1="' + py + '" x2="' + n(px + w * i / 6) + '" y2="' + (py + h) + '" stroke="#7a5a1a" stroke-width="0.6"/>';
            return '<rect x="' + px + '" y="' + py + '" width="' + w + '" height="' + h + '" fill="#d4a63a" stroke="#7a5a1a" stroke-width="1"/>' + lines +
                '<line x1="' + px + '" y1="' + (py + h / 2) + '" x2="' + (px + w) + '" y2="' + (py + h / 2) + '" stroke="#7a5a1a" stroke-width="0.6"/>';
        };
        return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
            panel(-96, -40, 30, 34) + panel(-96, 6, 30, 34) + panel(-58, -40, 30, 34) + panel(-58, 6, 30, 34) +
            panel(28, -40, 30, 34) + panel(28, 6, 30, 34) + panel(66, -40, 30, 34) + panel(66, 6, 30, 34) +
            '<rect x="-100" y="-3" width="200" height="6" rx="2" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1"/>' +
            '<rect x="-18" y="-26" width="36" height="12" rx="5" fill="#ecf0f1" stroke="#95a5a6" stroke-width="1"/>' +
            '<rect x="-7" y="-30" width="14" height="60" rx="6" fill="#fdfefe" stroke="#95a5a6" stroke-width="1"/>' +
            '<rect x="-22" y="12" width="44" height="12" rx="5" fill="#ecf0f1" stroke="#95a5a6" stroke-width="1"/>' +
            '<rect x="-14" y="-52" width="10" height="20" fill="#f4f6f7" stroke="#95a5a6" stroke-width="1"/>' +
            '<rect x="4" y="34" width="10" height="20" fill="#f4f6f7" stroke="#95a5a6" stroke-width="1"/>' +
            '</g>';
    }
    function capsule(x, y, s) {
        return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="#5d6d7e" stroke-width="1.5" stroke-linejoin="round">' +
            '<path d="M-26,22 L-14,-18 C-10,-26 10,-26 14,-18 L26,22Z" fill="#fdfefe"/>' +
            '<path d="M-28,22 L28,22 L24,30 L-24,30Z" fill="#2c3e50"/>' +
            '<rect x="-7" y="-4" width="14" height="10" rx="3" fill="#5dade2"/>' +
            '<rect x="-12" y="-30" width="24" height="7" rx="3" fill="#bdc3c7"/>' +
            '</g>';
    }
    function rover(x, y, s) {
        var wheel = function (wx) { return '<circle cx="' + wx + '" cy="22" r="8" fill="#3d3d3d" stroke="#222" stroke-width="1.5"/><circle cx="' + wx + '" cy="22" r="3" fill="#888"/>'; };
        return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
            '<path d="M-34,14 L-20,4 L0,12 L20,4 L34,14" fill="none" stroke="#7f8c8d" stroke-width="3"/>' +
            wheel(-34) + wheel(0) + wheel(34) +
            '<rect x="-30" y="-8" width="60" height="16" rx="3" fill="#ecf0f1" stroke="#7f8c8d" stroke-width="1.5"/>' +
            '<rect x="-24" y="-12" width="40" height="5" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1"/>' +
            '<rect x="14" y="-40" width="4" height="30" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1"/>' +
            '<rect x="8" y="-50" width="18" height="11" rx="2" fill="#ecf0f1" stroke="#7f8c8d" stroke-width="1.5"/>' +
            '<circle cx="13" cy="-44.5" r="2.8" fill="#2c3e50"/><circle cx="21" cy="-44.5" r="2.8" fill="#2c3e50"/>' +
            '<path d="M-26,-12 L-34,-24" stroke="#7f8c8d" stroke-width="2"/><circle cx="-34" cy="-25" r="3" fill="#95a5a6"/>' +
            '</g>';
    }
    function marsGround(seed) {
        return '<path d="M0,128 C50,120 90,132 140,126 C190,120 240,130 320,122 L320,180 L0,180Z" fill="#b8532d"/>' +
            '<path d="M0,146 C70,140 120,152 200,144 C250,140 290,148 320,144 L320,180 L0,180Z" fill="#a8461f"/>' +
            blobs(seed, 160, 160, 150, ['#8f3b1b', '#c96a3e'], 10, 0.012, 0.03);
    }
    function moonGround(seed) {
        return '<path d="M0,130 C60,122 110,134 170,128 C220,123 270,132 320,126 L320,180 L0,180Z" fill="#b9bfc5"/>' +
            '<path d="M0,150 C80,144 140,156 220,148 C260,145 300,150 320,148 L320,180 L0,180Z" fill="#a8afb6"/>' +
            '<ellipse cx="60" cy="152" rx="22" ry="5" fill="#9aa2aa"/><ellipse cx="60" cy="151" rx="18" ry="3.5" fill="#8d959e"/>' +
            '<ellipse cx="250" cy="162" rx="30" ry="6" fill="#9aa2aa"/><ellipse cx="250" cy="161" rx="25" ry="4.5" fill="#8d959e"/>' +
            '<ellipse cx="170" cy="140" rx="12" ry="3" fill="#9aa2aa"/>';
    }

    // ---------- Szenen (320 × 180) ----------
    var S = {};
    S.Rakete = function (id) {
        return space(id + 'h') + stars(101, 40, W, H, 110) +
            '<rect x="0" y="150" width="320" height="30" fill="#3f6b3a"/>' +
            '<g stroke="#7f8c8d" stroke-width="2" fill="none"><path d="M196,150 L196,40 M214,150 L214,40"/>' +
            '<path d="M196,60 L214,75 M214,60 L196,75 M196,90 L214,105 M214,90 L196,105 M196,120 L214,135 M214,120 L196,135"/>' +
            '<path d="M196,70 L178,70 M196,110 L178,110"/></g>' +
            rocket(160, 90, 0.95, true) +
            cloud(118, 152, 1.1, '#ecf0f1') + cloud(202, 154, 1.2, '#dfe6ec') + cloud(160, 160, 1.4, '#f4f6f7');
    };
    S.Raumanzug = function (id) {
        return space(id + 'h') + stars(102, 45) + earthLimb(id, 560, 420) + astronaut(160, 98, 1.25, 0, true);
    };
    S.Raumkapsel = function (id) {
        return space(id + 'h') + stars(103, 50) + earthLimb(id, 520, 400) +
            capsule(160, 72, 1.3) + '<path d="M96,92 C118,96 130,84 140,80" stroke="#9fd3ff" stroke-width="2" fill="none" stroke-dasharray="3 4"/>';
    };
    S.Raumstation = function (id) {
        return space(id + 'h') + stars(104, 45) + earthLimb(id, 560, 420) + station(160, 74, 1.2);
    };
    S.Schwerelos = function (id) {
        return '<rect width="320" height="180" fill="#dfe6ee"/>' +
            '<rect x="10" y="10" width="300" height="160" rx="26" fill="#eef2f6" stroke="#b9c3cf" stroke-width="3"/>' +
            '<g fill="#cdd6e0"><rect x="30" y="24" width="40" height="22" rx="4"/><rect x="78" y="24" width="40" height="22" rx="4"/>' +
            '<rect x="240" y="130" width="50" height="24" rx="4"/><circle cx="270" cy="40" r="14"/></g>' +
            '<circle cx="270" cy="40" r="9" fill="#5dade2"/>' +
            astronaut(150, 100, 0.95, -35, true) +
            '<g transform="translate(232 82) rotate(20)"><circle cx="0" cy="0" r="11" fill="#e74c3c"/><path d="M0,-11 C2,-17 6,-18 8,-18" stroke="#6e4b2a" stroke-width="2" fill="none"/><ellipse cx="6" cy="-16" rx="5" ry="2.5" fill="#27ae60" transform="rotate(-25 6 -16)"/></g>' +
            '<g transform="translate(72 126) rotate(-30)"><rect x="-24" y="-3.5" width="40" height="7" fill="#f4d03f" stroke="#b7950b" stroke-width="1"/><path d="M16,-3.5 L24,0 L16,3.5Z" fill="#f5cba7" stroke="#b7950b" stroke-width="1"/><rect x="-28" y="-3.5" width="5" height="7" fill="#e6b0aa"/></g>' +
            '<circle cx="230" cy="135" r="7" fill="#5dade2" opacity="0.8"/><circle cx="244" cy="124" r="4" fill="#5dade2" opacity="0.8"/>' +
            '<path d="M60,70 q6,-6 12,0 M64,60 q6,-6 12,0" stroke="#95a5a6" stroke-width="2" fill="none"/>';
    };
    S.Schlafsack = function (id) {
        return '<rect width="320" height="180" fill="#dfe6ee"/>' +
            '<rect x="10" y="10" width="300" height="160" rx="26" fill="#eef2f6" stroke="#b9c3cf" stroke-width="3"/>' +
            '<rect x="110" y="20" width="100" height="148" rx="8" fill="#d5dde6" stroke="#b9c3cf" stroke-width="2"/>' +
            '<rect x="122" y="40" width="76" height="118" rx="30" fill="#2e86c1" stroke="#1b4f72" stroke-width="2"/>' +
            '<path d="M128,80 L192,80 M128,118 L192,118" stroke="#1b4f72" stroke-width="2"/>' +
            '<rect x="112" y="76" width="96" height="8" fill="#f39c12"/><rect x="112" y="118" width="96" height="8" fill="#f39c12"/>' +
            '<circle cx="160" cy="50" r="18" fill="#f5cba7" stroke="#b9774c" stroke-width="1.5"/>' +
            '<path d="M146,40 C150,28 172,28 175,42 C168,36 156,36 146,40Z" fill="#6e4b2a"/>' +
            '<path d="M152,52 q3,3 6,0 M163,52 q3,3 6,0" stroke="#6e4b2a" stroke-width="1.8" fill="none"/>' +
            '<path d="M157,59 q3,2 6,0" stroke="#b9774c" stroke-width="1.5" fill="none"/>' +
            '<g fill="#5d6d7e" font-family="Verdana, Arial, sans-serif" font-weight="bold"><text x="200" y="40" font-size="16">Z</text><text x="216" y="28" font-size="12">z</text><text x="228" y="20" font-size="9">z</text></g>';
    };
    S.Sonnenaufgang = function (id) {
        return space(id + 'h') + stars(105, 30, W, H, 90) +
            '<defs><radialGradient id="' + id + 'r" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fffbe0"/><stop offset="0.25" stop-color="#ffd166" stop-opacity="0.9"/><stop offset="1" stop-color="#ff9f43" stop-opacity="0"/></radialGradient></defs>' +
            '<circle cx="160" cy="600" r="480" fill="#1e5aa8"/>' +
            '<path d="M-20,140 Q160,100 340,140" fill="none" stroke="#ff9f43" stroke-width="6" opacity="0.8"/>' +
            '<path d="M-20,138 Q160,98 340,138" fill="none" stroke="#7cc4ff" stroke-width="3" opacity="0.9"/>' +
            '<circle cx="186" cy="118" r="60" fill="url(#' + id + 'r)"/><circle cx="186" cy="118" r="10" fill="#fffbe0"/>';
    };
    S.Mondsprung = function (id) {
        return space(id + 'h') + stars(106, 40, W, H, 110) + P.Erde(id + 'e', 262, 38, 20) + moonGround(107) +
            astronaut(130, 70, 0.9, 12, true) +
            '<ellipse cx="128" cy="146" rx="18" ry="3.5" fill="#8d959e" opacity="0.6"/>' +
            '<path d="M96,118 q-6,8 -14,10 M104,126 q-4,8 -12,12" stroke="#d5dbe1" stroke-width="2" fill="none" stroke-linecap="round"/>';
    };
    S['Fußspur'] = function (id) {
        var sole = 'M-20,-50 C-27,-32 -27,-10 -19,2 C-15,10 -15,22 -17,34 C-19,52 17,52 15,34 C13,22 13,10 17,2 C25,-10 25,-32 18,-50 C10,-62 -12,-62 -20,-50Z';
        var print = function (x, y, rot, s, k) {
            var tread = '';
            for (var i = 0; i < 10; i++) tread += '<path d="M-26,' + (-52 + i * 10) + ' L26,' + (-48 + i * 10) + '" stroke="#7c848c" stroke-width="4.5"/>';
            return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')">' +
                '<defs><clipPath id="' + id + k + '"><path d="' + sole + '"/></clipPath></defs>' +
                '<path d="' + sole + '" fill="#8f979f" transform="translate(2 3)"/>' +
                '<path d="' + sole + '" fill="#a3abb2"/><g clip-path="url(#' + id + k + ')">' + tread + '</g>' +
                '<path d="' + sole + '" fill="none" stroke="#7c848c" stroke-width="2"/></g>';
        };
        return '<rect width="320" height="180" fill="#b9bfc5"/>' + blobs(108, 160, 90, 200, ['#aab1b8', '#c6ccd1', '#9fa7af'], 40, 0.01, 0.03) +
            print(130, 100, -12, 1, 'a') + print(222, 66, -4, 0.85, 'b');
    };
    S.Erdaufgang = function (id) {
        return space(id + 'h') + stars(109, 50, W, H, 120) +
            '<defs><clipPath id="' + id + 'k"><circle cx="190" cy="70" r="38"/></clipPath></defs>' +
            P.Erde(id + 'e', 190, 70, 38) +
            '<path d="M152,70 A38,38 0 0 0 228,70 A38,26 0 0 1 152,70Z" fill="#141a3d" opacity="0.55"/>' +
            '<path d="M0,140 C70,128 140,142 210,132 C260,126 300,134 320,130 L320,180 L0,180Z" fill="#b9bfc5"/>' +
            '<path d="M0,158 C90,150 170,164 260,154 L320,152 L320,180 L0,180Z" fill="#a8afb6"/>' +
            '<ellipse cx="90" cy="160" rx="26" ry="5" fill="#9aa2aa"/>';
    };
    S['Größenvergleich'] = function (id) {
        return space(id + 'h') + stars(110, 30) +
            '<defs><radialGradient id="' + id + 's" cx="0.3" cy="0.5" r="0.75"><stop offset="0" stop-color="#fff8b0"/><stop offset="0.6" stop-color="#fcd116"/><stop offset="1" stop-color="#f39c12"/></radialGradient></defs>' +
            '<circle cx="-60" cy="90" r="190" fill="#f9c74f" opacity="0.15"/>' +
            '<circle cx="-60" cy="90" r="175" fill="url(#' + id + 's)"/>' +
            blobs(111, 0, 90, 110, ['#ffe066'], 10, 0.05, 0.12).replace(/fill="#ffe066"/g, 'fill="#ffe066" opacity="0.6"') +
            P.Erde(id + 'e', 262, 90, 4) +
            '<path d="M244,90 L254,90" stroke="#fff" stroke-width="1.5"/><path d="M250,86 L254,90 L250,94" stroke="#fff" stroke-width="1.5" fill="none"/>';
    };
    S.Schutzbrille = function (id) {
        return sky(id + 'h', '#5dade2', '#aed6f1') +
            P.Sonne(id + 's', 70, 46, 22) + cloud(250, 40, 0.9) +
            '<g transform="translate(170 112)">' +
            '<path d="M-110,-30 L110,-30 L110,26 C110,40 60,44 40,30 L14,6 L-14,6 L-40,30 C-60,44 -110,40 -110,26Z" fill="#f7f7f7" stroke="#2c3e50" stroke-width="3"/>' +
            '<ellipse cx="-58" cy="0" rx="36" ry="22" fill="#2c2c2c"/><ellipse cx="58" cy="0" rx="36" ry="22" fill="#2c2c2c"/>' +
            '<circle cx="-50" cy="-4" r="7" fill="#f5b041"/><circle cx="66" cy="-4" r="7" fill="#f5b041"/>' +
            '<path d="M-100,-24 L100,-24" stroke="#f1c40f" stroke-width="4"/>' +
            '</g>';
    };
    S.Sonnensystem = function (id) {
        var out = space(id + 'h') + stars(112, 35);
        out += '<g fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1">';
        [70, 92, 116, 140, 176, 218, 252, 284].forEach(function (d) { out += '<circle cx="-20" cy="90" r="' + d + '"/>'; });
        out += '</g>' + P.Sonne(id + 's', -20, 90, 52);
        out += P.Merkur(id + 'a', 50, 90, 4) + P.Venus(id + 'b', 72, 90, 7) + P.Erde(id + 'c', 96, 90, 7.5) + P.Mars(id + 'd', 120, 90, 5.5) +
            P.Jupiter(id + 'f', 156, 90, 17) + P.Saturn(id + 'g', 198, 90, 13) + P.Uranus(id + 'u', 232, 90, 10) + P.Neptun(id + 'n', 264, 90, 10);
        return out;
    };
    S.Abendstern = function (id) {
        return sky(id + 'h', '#1f3a68', '#f0a35e') + stars(113, 12, W, H, 60) +
            '<circle cx="230" cy="56" r="14" fill="#fffbe0" opacity="0.25"/><circle cx="230" cy="56" r="7" fill="#fffbe0" opacity="0.5"/>' +
            sparkle(230, 56, 10, '#fffdf0') + '<circle cx="230" cy="56" r="3.2" fill="#fff"/>' +
            '<path d="M84,38 A14,14 0 1 0 98,58 A11,11 0 1 1 84,38Z" fill="#fdf2c4"/>' +
            '<path d="M0,150 L20,150 L20,128 L36,116 L52,128 L52,150 L66,150 L66,134 L90,134 L90,112 L104,104 L118,112 L118,150 L150,150 C160,140 168,130 176,150 L200,150 L200,124 L218,124 L218,150 L248,150 L248,132 L262,120 L276,132 L276,150 L320,150 L320,180 L0,180Z" fill="#1b2340"/>' +
            '<g fill="#f7dc6f"><rect x="30" y="132" width="6" height="7"/><rect x="98" y="120" width="6" height="7"/><rect x="206" y="132" width="6" height="7"/><rect x="258" y="136" width="6" height="7"/></g>';
    };
    S.Vulkan = function (id) {
        return sky(id + 'h', '#e7b48c', '#f3d2b3') +
            '<path d="M0,130 C40,128 60,90 110,70 C130,62 150,58 170,58 C190,58 210,62 230,70 C270,88 290,124 320,128 L320,180 L0,180Z" fill="#c6643a"/>' +
            '<path d="M136,62 C150,66 190,66 204,62 C196,58 144,58 136,62Z" fill="#8f3b1b"/>' +
            '<path d="M110,70 C90,90 70,110 60,128 M230,70 C250,92 270,112 280,128" stroke="#a8461f" stroke-width="2" fill="none"/>' +
            marsGround(114) +
            '<g transform="translate(36 140) scale(0.35)">' + astronaut(0, 0, 1, 0) + '</g>';
    };
    S.Rover = function (id) {
        return sky(id + 'h', '#e7b48c', '#f3d2b3') +
            '<path d="M0,120 C60,100 100,112 150,104 C200,96 250,112 320,104 L320,180 L0,180Z" fill="#c97a52"/>' +
            marsGround(115) + rover(160, 118, 1.3) +
            '<path d="M40,152 L120,146 M44,160 L122,154" stroke="#8f3b1b" stroke-width="2" stroke-dasharray="4 4"/>';
    };
    S.Marsabend = function (id) {
        return sky(id + 'h', '#2a3355', '#c7a27a') + stars(116, 25, W, H, 70) +
            '<defs><radialGradient id="' + id + 'g" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#e8f4ff"/><stop offset="0.3" stop-color="#9ccaf0" stop-opacity="0.9"/><stop offset="1" stop-color="#5b8fc7" stop-opacity="0"/></radialGradient></defs>' +
            '<circle cx="190" cy="124" r="60" fill="url(#' + id + 'g)"/><circle cx="190" cy="124" r="6" fill="#f7fbff"/>' +
            P.Mond(id + 'p', 70, 46, 7) + P.Mond(id + 'd', 120, 30, 4) +
            '<path d="M0,128 C60,120 110,132 170,126 C220,122 270,130 320,124 L320,180 L0,180Z" fill="#6e3a24"/>' +
            '<path d="M0,148 C80,142 150,154 230,146 L320,144 L320,180 L0,180Z" fill="#5a2e1b"/>';
    };
    S.Asteroiden = function (id) {
        var rock = function (x, y, s, rot, c) {
            return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')"><path d="M-20,-8 C-18,-20 0,-24 10,-18 C22,-14 24,0 18,10 C12,22 -6,22 -14,14 C-22,8 -24,0 -20,-8Z" fill="' + c + '" stroke="#5d4a3a" stroke-width="1.5"/>' +
                '<circle cx="-6" cy="-6" r="4" fill="#00000022"/><circle cx="8" cy="6" r="3" fill="#00000022"/><path d="M-12,-14 C-6,-18 4,-18 8,-16" stroke="#ffffff55" stroke-width="2" fill="none"/></g>';
        };
        return space(id + 'h') + stars(117, 50) +
            rock(70, 60, 1.6, 10, '#9c8b7a') + rock(170, 110, 2.4, -20, '#8a7a6a') + rock(260, 50, 1.1, 40, '#a89888') +
            rock(240, 140, 0.8, 70, '#9c8b7a') + rock(40, 140, 0.7, -40, '#a89888') + rock(120, 30, 0.5, 0, '#8a7a6a') + rock(290, 100, 0.5, 20, '#9c8b7a');
    };
    S['Roter Fleck'] = function (id) {
        var out = '<rect width="320" height="180" fill="#ead0ae"/>';
        var list = [[0, 18, '#d6ab80'], [26, 22, '#c58e60'], [56, 16, '#f4e2c8'], [80, 26, '#b9774c'], [118, 18, '#f2dcc0'], [144, 22, '#c98f5e'], [170, 10, '#d8b088']];
        list.forEach(function (b) { out += '<path d="M0,' + b[0] + ' C80,' + (b[0] - 6) + ' 160,' + (b[0] + 8) + ' 320,' + (b[0] - 2) + ' L320,' + (b[0] + b[1]) + ' C200,' + (b[0] + b[1] + 6) + ' 100,' + (b[0] + b[1] - 6) + ' 0,' + (b[0] + b[1]) + 'Z" fill="' + b[2] + '"/>'; });
        out += '<ellipse cx="170" cy="100" rx="72" ry="36" fill="#e8a37d"/><ellipse cx="170" cy="100" rx="58" ry="27" fill="#d0684a"/>' +
            '<ellipse cx="170" cy="100" rx="42" ry="18" fill="#c4513d"/>' +
            '<path d="M130,100 C140,84 190,82 205,96 M140,108 C156,118 196,116 210,104" stroke="#e8a37d" stroke-width="3" fill="none"/>' +
            '<path d="M150,96 C160,88 182,88 190,98" stroke="#a63f2e" stroke-width="3" fill="none"/>';
        return out;
    };
    S.Jupitermonde = function (id) {
        return space(id + 'h') + stars(118, 40) + P.Jupiter(id + 'j', 70, 90, 58) +
            P.Mond(id + 'a', 160, 70, 6).replace(/#cdd2d7/g, '#e8d48a') + P.Mond(id + 'b', 196, 104, 5).replace(/#cdd2d7/g, '#d9d4cc') +
            P.Mond(id + 'c', 234, 60, 8) + P.Mond(id + 'd', 270, 112, 7).replace(/#cdd2d7/g, '#9d958b') +
            '<g fill="#cfcfcf"><circle cx="140" cy="130" r="2"/><circle cx="296" cy="40" r="2"/><circle cx="214" cy="150" r="1.6"/><circle cx="176" cy="36" r="1.5"/><circle cx="300" cy="150" r="1.8"/></g>';
    };
    S.Saturnringe = function (id) {
        var rr = rnd(119), out = space(id + 'h') + stars(119, 25);
        for (var i = 0; i < 70; i++) {
            var x = rr() * 340 - 10, y = 40 + rr() * 110 + (x - 160) * 0.12, s = 2 + rr() * (i % 9 === 0 ? 16 : 6);
            var c = ['#f4f9ff', '#dbe9f7', '#c9b99a', '#e9eef5', '#a99a86'][i % 5];
            out += '<path d="M' + n(x - s) + ',' + n(y) + ' L' + n(x - s * 0.3) + ',' + n(y - s * 0.8) + ' L' + n(x + s * 0.8) + ',' + n(y - s * 0.5) + ' L' + n(x + s) + ',' + n(y + s * 0.4) + ' L' + n(x) + ',' + n(y + s * 0.8) + 'Z" fill="' + c + '" stroke="#7f8c8d" stroke-width="0.6"/>';
        }
        return out;
    };
    S.Badewanne = function (id) {
        return '<rect width="320" height="180" fill="#d6eaf8"/>' +
            '<g fill="#aed6f1"><rect x="0" y="0" width="320" height="110"/></g>' +
            '<g stroke="#9cc3dc" stroke-width="1">' + [20, 40, 60, 80, 100].map(function (y) { return '<line x1="0" y1="' + y + '" x2="320" y2="' + y + '"/>'; }).join('') +
            [40, 80, 120, 160, 200, 240, 280].map(function (x) { return '<line x1="' + x + '" y1="0" x2="' + x + '" y2="110"/>'; }).join('') + '</g>' +
            '<rect x="0" y="110" width="320" height="70" fill="#f5e6d3"/>' +
            P.Saturn(id + 's', 160, 92, 30) +
            '<path d="M40,96 L280,96 L270,150 C266,160 256,164 246,164 L74,164 C64,164 54,160 50,150Z" fill="#fdfefe" stroke="#95a5a6" stroke-width="3"/>' +
            '<path d="M44,100 L276,100 L274,108 L46,108Z" fill="#85c1e9" opacity="0.9"/>' +
            '<rect x="70" y="164" width="10" height="12" rx="3" fill="#bdc3c7"/><rect x="240" y="164" width="10" height="12" rx="3" fill="#bdc3c7"/>' +
            '<g transform="translate(250 92)"><ellipse cx="0" cy="0" rx="12" ry="8" fill="#f4d03f"/><circle cx="8" cy="-8" r="6" fill="#f4d03f"/><path d="M13,-8 L19,-7 L13,-5Z" fill="#e67e22"/><circle cx="9" cy="-9" r="1.2" fill="#2c3e50"/></g>' +
            '<g fill="#fff" opacity="0.9"><circle cx="70" cy="96" r="6"/><circle cx="80" cy="92" r="4"/><circle cx="62" cy="91" r="3"/></g>';
    };
    S.Sturm = function (id) {
        return space(id + 'h') + stars(120, 35) + P.Neptun(id + 'n', 120, 90, 70) +
            '<g fill="none" stroke="#e8f1ff" stroke-width="4" stroke-linecap="round" opacity="0.9">' +
            '<path d="M200,50 C230,46 260,52 290,46"/><path d="M210,74 C240,70 268,78 300,72"/><path d="M196,104 C230,100 262,108 296,102"/>' +
            '<path d="M286,40 L298,46 L286,52" /><path d="M294,66 L306,72 L294,78"/><path d="M290,96 L302,102 L290,108"/></g>' +
            '<path d="M80,80 C100,66 140,70 140,88 C140,100 120,104 112,96 C106,90 114,84 120,88" fill="none" stroke="#e8f1ff" stroke-width="3" opacity="0.8"/>';
    };
    S.Fernrohr = function (id) {
        return space(id + 'h') + stars(121, 55, W, H, 130) +
            '<circle cx="250" cy="38" r="5" fill="#5585e2"/><circle cx="250" cy="38" r="12" fill="none" stroke="#9fd3ff" stroke-width="1.5" stroke-dasharray="3 3"/>' +
            '<path d="M0,150 C80,140 160,152 240,144 L320,146 L320,180 L0,180Z" fill="#1d3b2a"/>' +
            '<g transform="translate(120 112) rotate(-32)"><rect x="-10" y="-14" width="110" height="28" rx="6" fill="#f4f6f7" stroke="#2c3e50" stroke-width="2.5"/>' +
            '<rect x="96" y="-17" width="14" height="34" rx="3" fill="#2c3e50"/><rect x="-24" y="-8" width="16" height="16" rx="3" fill="#7f8c8d" stroke="#2c3e50" stroke-width="2"/>' +
            '<rect x="20" y="-14" width="10" height="28" fill="#e74c3c"/></g>' +
            '<g stroke="#2c3e50" stroke-width="4" stroke-linecap="round"><path d="M128,116 L104,160 M128,116 L132,164 M128,116 L156,160"/></g>';
    };
    S['Ferne Sonne'] = function (id) {
        return '<rect width="320" height="180" fill="#0b1029"/>' + stars(122, 60, W, H, 120) +
            '<circle cx="212" cy="46" r="16" fill="#fff6c8" opacity="0.18"/>' + sparkle(212, 46, 12, '#fff8dc') + '<circle cx="212" cy="46" r="3.5" fill="#fffef5"/>' +
            '<defs><clipPath id="' + id + 'k"><rect x="0" y="100" width="320" height="80"/></clipPath></defs>' +
            '<g clip-path="url(#' + id + 'k)">' + P.Pluto(id + 'p', 120, 330, 230) + '</g>';
    };
    S.Raumsonde = function (id) {
        return space(id + 'h') + stars(123, 45) + P.Pluto(id + 'p', 90, 100, 62) +
            '<g transform="translate(232 58) rotate(-18)">' +
            '<path d="M-28,0 A28,12 0 0 0 28,0Z" fill="#ecf0f1" stroke="#7f8c8d" stroke-width="1.5"/>' +
            '<path d="M-28,0 A28,12 0 0 1 28,0" fill="#dfe6ec" stroke="#7f8c8d" stroke-width="1.5"/>' +
            '<rect x="-12" y="2" width="24" height="18" fill="#d4a63a" stroke="#7a5a1a" stroke-width="1.5"/>' +
            '<path d="M0,-12 L0,0" stroke="#7f8c8d" stroke-width="2"/><circle cx="0" cy="-13" r="2.5" fill="#7f8c8d"/>' +
            '<rect x="12" y="8" width="16" height="6" fill="#95a5a6"/></g>' +
            '<path d="M200,70 C170,78 150,86 140,92" stroke="#9fd3ff" stroke-width="1.5" fill="none" stroke-dasharray="3 4"/>';
    };
    S.Sterne = function (id) {
        var out = '<rect width="320" height="180" fill="#0f1533"/>' + stars(124, 140);
        var rr = rnd(125);
        for (var i = 0; i < 9; i++) out += sparkle(n(20 + rr() * 280), n(15 + rr() * 150), n(4 + rr() * 6), ['#ffffff', '#fff3b0', '#cfe8ff'][i % 3]);
        return out;
    };
    S['Milchstraße'] = function (id) {
        var out = '<rect width="320" height="180" fill="#0f1533"/>' + stars(126, 60) +
            '<defs><linearGradient id="' + id + 'm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb4ff" stop-opacity="0"/><stop offset="0.5" stop-color="#e6ddff" stop-opacity="0.55"/><stop offset="1" stop-color="#9fb4ff" stop-opacity="0"/></linearGradient></defs>' +
            '<g transform="rotate(-24 160 90)"><rect x="-60" y="58" width="440" height="64" fill="url(#' + id + 'm)"/>';
        var rr = rnd(127);
        for (var i = 0; i < 220; i++) {
            var x = -40 + rr() * 400, y = 90 + (rr() + rr() + rr() - 1.5) * 26;
            out += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(0.4 + rr() * 0.9) + '" fill="#fff" opacity="' + n(0.4 + rr() * 0.6) + '"/>';
        }
        return out + '<path d="M-40,92 C60,86 140,98 220,90 C280,84 340,92 380,90" stroke="#2a2f55" stroke-width="5" fill="none" opacity="0.6"/></g>';
    };
    S.Fallschirm = function (id) {
        var chute = function (cx, cy, s) {
            return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
                '<path d="M-30,0 C-30,-30 30,-30 30,0 C20,-6 10,-6 0,0 C-10,-6 -20,-6 -30,0Z" fill="#e74c3c" stroke="#922b21" stroke-width="1.5"/>' +
                '<path d="M-10,-26 C-6,-18 -4,-8 0,0 M10,-26 C6,-18 4,-8 0,0" stroke="#fdfefe" stroke-width="6" fill="none"/></g>';
        };
        return sky(id + 'h', '#5dade2', '#d6eaf8') + cloud(60, 40, 0.9) + cloud(268, 58, 0.7) +
            chute(124, 46, 1) + chute(160, 34, 1.15) + chute(198, 46, 1) +
            '<g stroke="#5d6d7e" stroke-width="1"><path d="M96,46 L160,104 M152,46 L160,104 M130,34 L160,104 M190,34 L160,104 M168,46 L160,104 M226,46 L160,104"/></g>' +
            capsule(160, 116, 0.75) +
            '<path d="M0,150 C40,144 80,156 120,150 C160,144 200,156 240,150 C280,144 300,152 320,148 L320,180 L0,180Z" fill="#2e86c1"/>' +
            '<path d="M0,162 C50,158 90,166 140,162 C190,158 240,166 320,160 L320,180 L0,180Z" fill="#1b4f72"/>' +
            '<path d="M20,156 q8,-4 16,0 M200,160 q8,-4 16,0 M270,154 q8,-4 16,0" stroke="#d6eaf8" stroke-width="2" fill="none"/>';
    };
    S.Sternbild = function (id) {
        var pts = [[60, 60], [104, 66], [140, 84], [176, 96], [182, 140], [246, 146], [252, 102]];
        var out = '<rect width="320" height="180" fill="#0f1533"/>' + stars(128, 70);
        out += '<polyline points="' + pts.slice(0, 4).map(function (p) { return p.join(','); }).join(' ') + ' ' + pts[6].join(',') + ' ' + pts[5].join(',') + ' ' + pts[4].join(',') + ' ' + pts[3].join(',') +
            '" fill="none" stroke="#9fd3ff" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.8"/>';
        pts.forEach(function (p) { out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="#fff6c8" opacity="0.18"/>' + sparkle(p[0], p[1], 7, '#fffbe6') + '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="#fff"/>'; });
        return out;
    };

    // Planeten als Szene (groß in der Mitte, mit Sternen)
    var SCENE_R = { Erde: 62, Mond: 60, Sonne: 50, Merkur: 56, Venus: 62, Mars: 62, Jupiter: 70, Saturn: 40, Uranus: 52, Neptun: 62, Pluto: 58, Titan: 60, Charon: 40 };
    Object.keys(P).forEach(function (name) {
        if (name === 'Charon') {
            S.Charon = function (id) { return space(id + 'h') + stars(129, 45) + P.Pluto(id + 'p', 120, 92, 56) + P.Charon(id + 'c', 236, 70, 30); };
            return;
        }
        S[name] = function (id) { return space(id + 'h') + stars(130 + name.length, 45) + P[name](id + 'p', 160, 90, SCENE_R[name]); };
    });

    // ---------- Öffentliche Schnittstelle ----------
    var counter = 0;
    function find(name) {
        var key = String(name || '').trim().toLowerCase();
        var hit = Object.keys(S).find(function (k) { return k.toLowerCase() === key; });
        return hit || null;
    }
    LESE_MEISTER.bilder = {
        // Breites Bild (320 × 180) für die Lese-Seiten
        szene: function (name) {
            var key = find(name);
            return key ? svg(W, H, S[key]('b' + (++counter))) : null;
        },
        // Quadratisches Bild (Kapitel-Liste, Planeten-Fenster): Planeten groß, Szenen als Ausschnitt
        rund: function (name) {
            var key = find(name);
            if (!key) return null;
            var id = 'r' + (++counter);
            if (P[key]) {
                var r = key === 'Saturn' ? 24 : (key === 'Sonne' ? 34 : 44);
                return svg(120, 120, '<rect width="120" height="120" fill="#1d2550"/>' + stars(140, 12, 120, 120) + P[key](id, 60, 60, r));
            }
            return '<svg viewBox="70 0 180 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + S[key](id) + '</svg>';
        },
        namen: function () { return Object.keys(S); }
    };
})();
