import { getPost, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

// Simple markdown to HTML converter (no external deps)
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
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const html = mdToHtml(post.content)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Saul A. González Alonso',
      url: 'https://saulgonzalez.pro',
    },
    publisher: {
      '@type': 'Person',
      name: 'Saul A. González Alonso',
      url: 'https://saulgonzalez.pro',
    },
    mainEntityOfPage: `https://blogs.saulgonzalez.pro/${post.slug}`,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-10">
        ← Todos los artículos
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <time className="text-sm text-slate-400">
              {new Date(post.date).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-sm text-slate-400">{post.readTime} lectura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-5">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/[0.07] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-sm flex-shrink-0">
              SG
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Saul A. González Alonso</p>
              <p className="text-xs text-slate-400">COO, Puny.bz · Arecibo, Puerto Rico 🇵🇷</p>
            </div>
          </div>
        </header>

        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 p-8 rounded-2xl bg-violet-50 dark:bg-violet-500/[0.08] border border-violet-100 dark:border-violet-500/20">
          <p className="font-bold text-slate-900 dark:text-white mb-2">¿Construyendo algo?</p>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Si buscas un socio técnico en Puerto Rico — WebApps, Apps Móviles, IA — hablemos.
          </p>
          <a
            href="https://saulgonzalez.pro/#quiz"
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Consulta gratis →
          </a>
        </div>
      </article>
    </>
  )
}
