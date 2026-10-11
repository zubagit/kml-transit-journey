const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
new vm.Script(fs.readFileSync(path.join(root, 'main.cjs'), 'utf8'), { filename: 'main.cjs' });
let count = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (!/\bsrc\s*=/.test(match[1])) { new vm.Script(match[2], { filename: `inline-${++count}.js` }); }
}
assert(count > 0, 'App script missing');
assert.equal(pkg.version, '1.0.0');
assert.equal(pkg.license, 'MIT');
assert(pkg.scripts.dist.includes('--publish never'), 'Build must not publish automatically');
assert(html.includes('node_modules/leaflet/dist/leaflet.js'), 'Leaflet must be bundled locally');
for (const file of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'node_modules/leaflet/dist/leaflet.js', 'node_modules/leaflet/dist/leaflet.css']) {
  assert(fs.existsSync(path.join(root, file)), `Required file missing: ${file}. Run npm ci first.`);
}
console.log(`Source checks passed (${count} inline script). Installer and UI tests are separate.`);
