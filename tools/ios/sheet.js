'use strict';
// Contact sheet for design review:  node tools/ios/sheet.js <lib> <variant> <out.png> [cols] [from] [to]
const fs = require('fs');
const PNG = require('../sprite/png.js');
const { renderIcon, downscale } = require('./engine.js');
const [lib, variant, out, colsArg, fromArg, toArg] = process.argv.slice(2);
const list = require('./' + lib + '.js').slice(+fromArg || 0, toArg ? +toArg : undefined);
const cols = +colsArg || 6, T = 256, G = 18, rows = Math.ceil(list.length / cols);
const W = cols * (T + G) + G, H = rows * (T + G) + G, buf = new Uint8Array(W * H * 4);
for (let i = 0; i < W * H; i++) { buf[i * 4] = variant === 'night' ? 12 : 250; buf[i * 4 + 1] = variant === 'night' ? 5 : 240; buf[i * 4 + 2] = variant === 'night' ? 10 : 244; buf[i * 4 + 3] = 255; }
list.forEach((def, n) => {
  const rgba = downscale(renderIcon(def, variant, 512), 2).toRGBA(), cx = G + (n % cols) * (T + G), cy = G + Math.floor(n / cols) * (T + G), R = T * 0.2237;
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
    const qx = Math.abs(x + 0.5 - T / 2) - (T / 2 - R), qy = Math.abs(y + 0.5 - T / 2) - (T / 2 - R);
    const d = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - R, a = Math.max(0, Math.min(1, 0.5 - d));
    if (a <= 0) continue; const s = (y * T + x) * 4, o = ((cy + y) * W + cx + x) * 4;
    for (let c = 0; c < 3; c++) buf[o + c] = Math.round(buf[o + c] * (1 - a) + rgba[s + c] * a);
  }
});
fs.writeFileSync(out, Buffer.from(PNG.encode(W, H, buf)));
console.log('wrote', out, list.length);
