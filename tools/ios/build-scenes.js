'use strict';
// Wallpapers (1290x2796) and widget covers (small 474x474, medium 1014x474, large 1014x1062).  node tools/ios/build-scenes.js
const fs = require('fs'); const path = require('path');
const PNG = require('../sprite/png.js');
const { WALL, cover, verse, STYLES } = require('./scenes.js');
const ROOT = path.join(__dirname, '..', '..');
const put = (rel, buf) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, Buffer.from(buf)); };
const enc = (img) => PNG.encode(img.w, img.h, img.toRGBA());
const NAMES = { nave: 'The Nave', 'our-lady': 'Our Lady', bethlehem: 'Star of Bethlehem', 'rose-window': 'Rose Window', 'paschal-dawn': 'Paschal Dawn', candlelight: 'Candlelight' };
for (const n of Object.keys(WALL)) { const img = WALL[n](1290, 2796); put(`wallpapers/${n}.png`, enc(img)); put(`gallery/wallpapers/${n}.png`, PNG.encode(258, 559, WALL[n](258, 559).toRGBA())); console.log('wallpaper', n); }
const SIZES = { small: [474, 474], medium: [1014, 474], large: [1014, 1062] };
for (const style of Object.keys(STYLES)) for (const [sz, [w, h]] of Object.entries(SIZES)) put(`widget-covers/plain/${style}-${sz}.png`, enc(cover(w, h, style)));
const VERSES = [['Vigilate', 'Watch'], ['Ora et labora', 'Pray and work'], ['Lumen Christi', 'Light of Christ'], ['Fiat', 'Let it be done'], ['Kyrie eleison', 'Lord, have mercy'], ['Sursum corda', 'Lift up your hearts'], ['Ad Dei gloriam', 'For the glory of God'], ['Deo gratias', 'Thanks be to God']];
for (const [line, sub] of VERSES) for (const style of ['rose', 'night']) for (const sz of ['small', 'medium']) put(`widget-covers/verses/${line.toLowerCase().replace(/ /g, '-')}-${style}-${sz}.png`, enc(verse(...SIZES[sz], style, line, sz === 'medium' ? sub : null)));
const LABELS = ['Weather', 'Calendar', 'Music', 'Clock', 'Notes', 'Photos', 'Battery', 'Fitness', 'Reminders', 'Stocks'];
for (const label of LABELS) for (const style of ['rose', 'night']) for (const sz of ['small', 'medium']) put(`widget-covers/labeled/${label.toLowerCase()}-${style}-${sz}.png`, enc(cover(...SIZES[sz], style, label)));
for (const style of Object.keys(STYLES)) put(`gallery/covers/${style}.png`, enc(cover(507, 237, style)));
fs.writeFileSync(path.join(ROOT, 'wallpapers.json'), JSON.stringify(Object.entries(NAMES).map(([id, name]) => ({ id, name })), null, 1));
console.log('scenes done');
