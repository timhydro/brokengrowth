const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

test('concept imagery remains labeled and uses an existing asset', () => {
  assert.match(html, /src="assets\/generated-story\.webp"/);
  assert.match(html, /alt="Concept image representing rebuilding, second chances and transitional housing"/);
  assert.ok(fs.existsSync(path.join(root, 'assets', 'generated-story.webp')));
  assert.doesNotMatch(app, /founder-timothy-oates\.jpg/);
  assert.doesNotMatch(app, /story-photo-wrap \.visual-note/);
});

test('public giving copy does not claim tax deductibility or approved 501(c)(3) status', () => {
  assert.match(html, /do not currently represent contributions as tax-deductible/i);
  assert.match(html, /in development/i);
  assert.doesNotMatch(html, /501\s*\(\s*c\s*\)\s*\(\s*3\s*\)\s*(?:approved|recognized|exempt)/i);
});

test('site assets referenced by the main page exist', () => {
  for (const asset of ['styles.css', 'green-story.css', 'app.js', 'assets/generated-hero.webp', 'assets/generated-story.webp']) {
    assert.ok(fs.existsSync(path.join(root, asset)), `missing asset: ${asset}`);
  }
});
