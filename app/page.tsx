import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-14">
        <p className="text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">
          Blog
        </p>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
          Emprendimiento, tecnología<br />y Puerto Rico.
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
          Por Saul A. González Alonso — COO de Puny.bz, ingeniero eléctrico, Parallel18 Gen 13, Eagle Scout. Escribo sobre lo que aprendo construyendo negocios.
        </p>
      </div>

      <div className="space-y-10">
        {posts.map(post => (
          <article key={post.slug} className="group border-b border-slate-100 dark:border-white/[0.06] pb-10 last:border-0">
            <div className="flex items-center gap-3 mb-3">
              <time className="text-sm text-slate-400">
                {new Date(post.date).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-sm text-slate-400">{post.readTime} lectura</span>
            </div>
            <Link href={`/${post.slug}`}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                {post.title}
              </h2>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
