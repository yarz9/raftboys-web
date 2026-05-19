const fs = require('fs'), path = require('path')
const dictText = fs.readFileSync('src/i18n/dictionary.js', 'utf8')
const keys = new Set([...dictText.matchAll(/'([\w.\-]+)'\s*:\s*\{\s*en:/g)].map(m => m[1]))
const re = /\bt\(\s*['`]([\w.\-]+)['`]/g
let missing = 0
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name)
    if (f.isDirectory()) walk(p)
    else if (/\.jsx?$/.test(f.name) && !p.includes('dictionary')) {
      const s = fs.readFileSync(p, 'utf8')
      for (const m of s.matchAll(re)) {
        if (!keys.has(m[1])) { console.log('MISSING', m[1], 'in', p); missing++ }
      }
    }
  }
}
walk('src')
console.log(missing ? `${missing} MISSING` : 'CLEAN')
process.exit(missing ? 1 : 0)
