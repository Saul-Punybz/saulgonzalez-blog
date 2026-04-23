import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-grid pt-16 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-violet-500">Blog</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-[1.05]">
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #7030ef, #c026d3)' }}>
              Puerto Rico-built.
            </span><br />
            World-ready.
          </h1>
          <p className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-4">
            Notas de un empresario puertorriqueño.
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
            Aprendizajes reales de construir empresas, integrar IA y competir globalmente desde la isla. Sin filtro.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-6 pb-20">

        {/* ── Featured post ── */}
        {featured && (
          <Link href={`/${featured.slug}`} className="group block mb-16">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:border-violet-400/50 dark:hover:border-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/10">
              {/* Cover */}
              <div className="relative h-72 sm:h-96 overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
                {featured.cover ? (
                  <Image src={featured.cover} alt={featured.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <>
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(112,48,239,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(192,38,211,0.4) 0%, transparent 50%)' }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                      <div className="text-white text-[200px] font-black select-none">PR</div>
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {featured.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Artículo destacado</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <time className="text-sm text-slate-400">
                    {new Date(featured.date).toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-sm text-slate-400">{featured.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-black flex-shrink-0">SG</div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Saul A. González Alonso</span>
                  <span className="ml-auto text-sm text-violet-600 dark:text-violet-400 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                    Leer artículo <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Rest of posts ── */}
        {rest.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Más artículos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <Link key={post.slug} href={`/${post.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:border-violet-400/40 dark:hover:border-violet-500/25 transition-all h-full flex flex-col hover:shadow-xl hover:shadow-violet-500/5">
                    {/* Mini cover */}
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-900 to-indigo-900 flex-shrink-0">
                      {post.cover ? (
                        <Image src={post.cover} alt={post.title} fill className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 40% 50%, rgba(112,48,239,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(192,38,211,0.35) 0%, transparent 50%)` }} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {post.tags[0] && (
                        <span className="absolute bottom-3 left-3 text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20">
                          {post.tags[0]}
                        </span>
                      )}
                    {post.linkedinUrl && (
                        <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#0077b5] flex items-center justify-center" title="Publicado en LinkedIn">
                          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <time className="text-xs text-slate-400">
                          {new Date(post.date).toLocaleDateString('es-PR', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-xs text-slate-400">{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ── CTA ── */}
        <div className="mt-20 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a0a3e 0%, #0f0f24 50%, #1a0525 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(112,48,239,0.3) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(192,38,211,0.2) 0%, transparent 55%)' }} />
          <div className="relative px-10 py-14 text-center">
            <p className="text-violet-400 text-xs font-bold tracking-widest uppercase mb-3">¿Tienes un proyecto?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Hablemos.
            </h2>
            <p className="text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
              WebApps, Apps Móviles, integración de IA. Consulta de 30 minutos, sin compromiso.
            </p>
            <a href="https://saulgonzalez.pro/#quiz"
              className="inline-block btn-gradient btn-glow text-white font-bold px-10 py-4 rounded-2xl text-base">
              Agenda tu consulta gratis →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
