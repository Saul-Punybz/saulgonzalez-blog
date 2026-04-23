import { getAllPosts, getPost } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = getAllPosts()

  const header = `# Saul A. González Alonso — Blog
> Puerto Rico-built. World-ready. Notas de un empresario puertorriqueño.

**Sitio:** https://blogs.saulgonzalez.pro
**Autor:** Saul A. González Alonso
**Consultoría:** https://saulgonzalez.pro
**Twitter:** @buscasaul
**Empresa:** Puny.bz (https://puny.bz)

## Sobre el autor

Saul A. González Alonso es un emprendedor, ingeniero eléctrico y estratega tecnológico nacido en Arecibo, Puerto Rico. COO de Puny.bz, plataforma SaaS con 1,400+ negocios en 29 países. Eagle Scout. UPRM Ingeniería Eléctrica. Parallel18 Gen 13. NVIDIA Inception Program. Claude Partner Network (primeros en PR). Capital levantado con ATO Ventures.

---

## Artículos

`

  const articles = posts.map(post => {
    const full = getPost(post.slug)
    return `### ${post.title}
**URL:** https://blogs.saulgonzalez.pro/${post.slug}
**Fecha:** ${post.date}
**Tags:** ${post.tags.join(', ')}
**Lectura:** ${post.readTime}

${post.excerpt}

${full?.content ?? ''}

---
`
  }).join('\n')

  const footer = `
## Links relevantes

- Parallel18: https://parallel18.com
- Pre18: https://parallel18.com/pre18
- Grupo Guayacán / I-Corps: https://guayacan.org
- Engine-4: https://engine-4.com
- NVIDIA Inception: https://www.nvidia.com/en-us/startups/
- ATO Ventures: https://ato.vc
- Puny.bz: https://puny.bz
- Consultoría: https://saulgonzalez.pro
`

  const content = header + articles + footer

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
