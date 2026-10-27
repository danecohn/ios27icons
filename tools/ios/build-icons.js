'use strict';
// Renders every icon, Rose and Night, as a 1024 master (Sprite's PNG encoder) plus a 256 gallery thumbnail.  node tools/ios/build-icons.js [id ...]
const fs = require('fs');
const path = require('path');
const PNG = require('../sprite/png.js');
const { renderIcon, downscale } = require('./engine.js');
const ROOT = path.join(__dirname, '..', '..');
const all = require('./index.js'), only = process.argv.slice(2);
const list = only.length ? all.filter((d) => only.includes(d.id)) : all;
const put = (rel, buf) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, Buffer.from(buf)); };
let n = 0;
for (const def of list) for (const variant of ['rose', 'night']) {
  const cv = renderIcon(def, variant, 1024);
  put(`icons/${variant}/${def.group}/${def.id}.png`, PNG.encode(1024, 1024, cv.toRGBA(false)));
  const th = downscale(cv, 4); put(`gallery/thumbs/${variant}/${def.group}/${def.id}.png`, PNG.encode(256, 256, th.toRGBA()));
  if (++n % 20 === 0) console.log(n + '/' + list.length * 2);
}
if (!only.length) put('icons.json', Buffer.from(JSON.stringify(all.map(({ id, name, group, bg }) => ({ id, name, group, bg })), null, 1)));
console.log('icons done', n);
