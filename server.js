// Tiny production server for the Raft Boys concept preview.
// Serves the Vite build output (dist/) and exposes /health for
// Railway's deployment probe. SPA fallback so any path renders
// the same index.html — no router needed for a single-page concept.

import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.set('trust proxy', 1)
app.use(compression())

// Healthcheck — trivial, no side-effects.
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'raftboys-web', ts: new Date().toISOString() })
})

const distPath = path.join(__dirname, 'dist')
if (!fs.existsSync(distPath)) {
  console.error('[boot] dist/ not found. Did `npm run build` complete?')
}

// Aggressive cache for built assets, no-cache for index.html so deploys take effect.
app.use(express.static(distPath, {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
  },
}))

// SPA fallback (single page — every route serves index.html)
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Raft Boys preview · listening on :${PORT}`)
})
