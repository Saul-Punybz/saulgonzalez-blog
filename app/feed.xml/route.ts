import { getAllPosts } from '@/lib/posts'

const SITE = 'https://blogs.saulgonzalez.pro'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()
  const items = posts
    .map(
      p => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE}/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/${p.slug}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.tags.map(t => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Saul A. González</title>
    <link>${SITE}</link>
    <description>Notas de un empresario puertorriqueño. Por Saul A. González Alonso — COO Puny.bz, Parallel18 Gen 13, desde Arecibo, Puerto Rico.</description>
    <language>es-pr</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
