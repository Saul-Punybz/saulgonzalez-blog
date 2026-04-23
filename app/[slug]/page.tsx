import { getPost, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

function mdToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .split('\n\n')
    .map(block => {
      if (block.match(/^<(h[1-6]|ul|ol|blockquote|hr)/)) return block
      if (block.trim() === '') return ''
      return `<p>${block.replace(/\n/g, ' ')}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Saul A. González Alonso'],
      images: post.cover ? [{ url: post.cover, width: 1200, height: 630 }] : [{ url: 'https://saulgonzalez.pro/og.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', creator: '@buscasaul' },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const html = mdToHtml(post.content)
  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== post.slug).slice(0, 2)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.cover || 'https://saulgonzalez.pro/og.png',
    author: {
      '@type': 'Person',
      name: 'Saul A. González Alonso',
      url: 'https://saulgonzalez.pro',
      image: 'https://saulgonzalez.pro/saul.jpg',
    },
    publisher: {
      '@type': 'Person',
      name: 'Saul A. González Alonso',
      url: 'https://blogs.saulgonzalez.pro',
    },
    mainEntityOfPage: `https://blogs.saulgonzalez.pro/${post.slug}`,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Cover image ── */}
      <div className="relative w-full h-72 sm:h-[460px] overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
        {post.cover ? (
          <Image src={post.cover} alt={post.title} fill className="object-cover opacity-75" priority />
        ) : (
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(112,48,239,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(192,38,211,0.4) 0%, transparent 50%)' }}>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <div className="text-white font-black select-none" style={{ fontSize: 'clamp(200px, 40vw, 400px)', lineHeight: 1 }}>PR</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Back button overlay */}
        <div className="absolute top-6 left-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium bg-black/30 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 transition-all">
            ← Blog
          </Link>
        </div>
        {/* Tags overlay */}
        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Article ── */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 text-sm text-slate-400">
          <time>{new Date(post.date).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <span>·</span>
          <span>{post.readTime} lectura</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 border-l-4 border-violet-500 pl-5">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 mb-12 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-violet-500/30">
            <Image src="https://saulgonzalez.pro/saul.jpg" alt="Saul A. González" fill className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Saul A. González Alonso</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">COO Puny.bz · Parallel18 Gen 13 · Arecibo, Puerto Rico 🇵🇷</p>
            <a href="https://twitter.com/buscasaul" target="_blank" rel="noopener noreferrer" className="text-xs text-violet-600 dark:text-violet-400 hover:underline mt-0.5 inline-block">
              @buscasaul
            </a>
          </div>
        </div>

        {/* LinkedIn badge */}
        {post.linkedinUrl && (
          <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 mb-10 p-4 rounded-xl border border-[#0077b5]/30 bg-[#0077b5]/5 hover:bg-[#0077b5]/10 transition-colors group">
            <svg className="w-6 h-6 text-[#0077b5] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#0077b5] uppercase tracking-wide">Publicado originalmente en LinkedIn</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{post.linkedinUrl}</p>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-[#0077b5] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        )}

        {/* Content */}
        <div
          className="prose text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/[0.07] flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-slate-500 dark:text-slate-400">¿Te fue útil? Compártelo.</p>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blogs.saulgonzalez.pro/${post.slug}`)}&via=buscasaul`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#1a1a2e] hover:bg-violet-700 px-4 py-2 rounded-xl transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Compartir en X
          </a>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a0a3e, #0f0f24)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(112,48,239,0.25) 0%, transparent 60%)' }} />
          <div className="relative px-8 py-8">
            <p className="text-white font-black text-xl mb-2">¿Estás construyendo algo?</p>
            <p className="text-slate-300 text-sm mb-5">WebApps, Apps Móviles, integración de IA. Consulta gratis de 30 minutos, sin compromiso.</p>
            <a href="https://saulgonzalez.pro/#quiz"
              className="inline-block btn-gradient btn-glow text-white font-bold px-7 py-3 rounded-xl text-sm">
              Agendar consulta gratis →
            </a>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Más artículos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map(p => (
                <Link key={p.slug} href={`/${p.slug}`} className="group block p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] hover:border-violet-400/40 dark:hover:border-violet-500/25 bg-white dark:bg-white/[0.02] transition-all">
                  <p className="text-xs text-slate-400 mb-2">{new Date(p.date).toLocaleDateString('es-PR', { month: 'short', year: 'numeric' })} · {p.readTime}</p>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug text-sm">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
