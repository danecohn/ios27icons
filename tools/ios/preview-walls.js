'use strict';
const fs = require('fs'); const PNG = require('../sprite/png.js'); const { WALL, verse } = require('./scenes.js');
const names = Object.keys(WALL), w = 380, h = 824, pad = 12, W = w * names.length + pad * (names.length + 1), out = new Uint8Array(W * (h + 2 * pad) * 4).fill(20);
names.forEach((n, k) => { const r = WALL[n](w, h).toRGBA(); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const s = (y * w + x) * 4, o = ((y + pad) * W + pad + k * (w + pad) + x) * 4; for (let c = 0; c < 4; c++) out[o + c] = r[s + c]; } });
fs.writeFileSync('/private/tmp/claude-501/walls2.png', Buffer.from(PNG.encode(W, h + 2 * pad, out)));
const v = verse(507, 237, 'night', 'Vigilate', 'Watch'), v2 = verse(507, 237, 'rose', 'Lumen Christi', 'Light of Christ'); const o2 = new Uint8Array(507 * 2 * 260 * 4).fill(20);
[v, v2].forEach((im, k) => { const r = im.toRGBA(); for (let y = 0; y < 237; y++) for (let x = 0; x < 507; x++) { const s = (y * 507 + x) * 4, o = ((y + 10) * 1014 + k * 507 + x) * 4; for (let c = 0; c < 4; c++) o2[o + c] = r[s + c]; } });
fs.writeFileSync('/private/tmp/claude-501/verses.png', Buffer.from(PNG.encode(1014, 260, o2)));
