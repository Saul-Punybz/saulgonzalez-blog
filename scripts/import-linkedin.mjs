#!/usr/bin/env node
/**
 * LinkedIn Article Importer
 * Usage: node scripts/import-linkedin.mjs
 *
 * Paste your LinkedIn article content when prompted.
 * Creates a .md file in content/posts/ with LinkedIn attribution.
 */

import * as readline from 'readline'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.join(__dirname, '..', 'content', 'posts')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(res => rl.question(q, res))

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}

function extractExcerpt(content) {
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'))
  const first = lines[0] || ''
  return first.slice(0, 180) + (first.length > 180 ? '...' : '')
}

async function main() {
  console.log('\n📥  LinkedIn Article Importer — blogs.saulgonzalez.pro\n')
  console.log('─'.repeat(50))

  const title = await ask('\n📝  Título del artículo: ')
  const linkedinUrl = await ask('🔗  URL de LinkedIn (https://linkedin.com/pulse/...): ')
  const tagsInput = await ask('🏷️   Tags (separados por coma, ej: Emprendimiento,Puerto Rico): ')
  const cover = await ask('🖼️   URL de imagen de portada (Enter para omitir): ')

  console.log('\n📄  Pega el contenido del artículo.')
  console.log('    Cuando termines, escribe en una línea nueva: END\n')

  const lines = []
  for await (const line of rl) {
    if (line.trim() === 'END') break
    lines.push(line)
  }

  const content = lines.join('\n').trim()

  if (!content) {
    console.error('\n❌  No se recibió contenido. Cancelando.')
    rl.close()
    process.exit(1)
  }

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]
  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
  const readTime = estimateReadTime(content)
  const excerpt = extractExcerpt(content)

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, "'")}"`,
    `excerpt: "${excerpt.replace(/"/g, "'")}"`,
    `date: "${date}"`,
    `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
    `readTime: "${readTime}"`,
    cover ? `cover: "${cover}"` : null,
    `linkedinUrl: "${linkedinUrl}"`,
    '---',
  ].filter(Boolean).join('\n')

  const linkedinNote = `
> **Publicado originalmente en LinkedIn** → [Ver artículo original](${linkedinUrl})

---
`

  const fullContent = `${frontmatter}\n${linkedinNote}\n${content}\n\n---\n\n*Saul A. González Alonso es COO de Puny.bz, ingeniero eléctrico de UPRM, Eagle Scout, Parallel18 Gen 13 alumni, y empresario desde Arecibo, Puerto Rico.*\n\n*¿Estás construyendo algo? → [saulgonzalez.pro](https://saulgonzalez.pro)*\n`

  const filePath = path.join(postsDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    const overwrite = await ask(`\n⚠️  Ya existe "${slug}.md". ¿Sobreescribir? (s/N): `)
    if (overwrite.toLowerCase() !== 's') {
      console.log('\n❌  Cancelado.')
      rl.close()
      process.exit(0)
    }
  }

  fs.writeFileSync(filePath, fullContent, 'utf-8')

  console.log(`\n✅  Artículo creado: content/posts/${slug}.md`)
  console.log(`\n📋  Resumen:`)
  console.log(`    Título:    ${title}`)
  console.log(`    Slug:      ${slug}`)
  console.log(`    Fecha:     ${date}`)
  console.log(`    Tags:      ${tags.join(', ')}`)
  console.log(`    Lectura:   ${readTime}`)
  console.log(`    LinkedIn:  ${linkedinUrl}`)
  console.log(`\n🚀  Para publicar: vercel --prod`)
  console.log(`🌐  URL final: https://blogs.saulgonzalez.pro/${slug}\n`)

  rl.close()
}

main().catch(err => {
  console.error(err)
  rl.close()
  process.exit(1)
})
