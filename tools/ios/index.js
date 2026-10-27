'use strict';
const lists = { apple: require('./apple.js'), apps: require('./apps.js'), vigil: require('./vigil.js') };
module.exports = [].concat(lists.apple, lists.apps, lists.vigil);
