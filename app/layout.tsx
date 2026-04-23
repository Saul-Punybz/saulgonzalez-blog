import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://blogs.saulgonzalez.pro'),
  title: { default: 'Blog — Saul A. González', template: '%s | Saul A. González' },
  description: 'Emprendimiento, Tecnología, y de PR para el mundo. Por Saul A. González Alonso — COO Puny.bz, Parallel18 Gen 13, Eagle Scout desde Arecibo, Puerto Rico.',
  openGraph: {
    siteName: 'Saul A. González — Blog',
    locale: 'es_PR',
    type: 'website',
    images: [{ url: 'https://saulgonzalez.pro/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', creator: '@buscasaul' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-ink text-slate-900 dark:text-white min-h-screen font-sans">
        <Providers>
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-slate-100 dark:border-white/[0.07] bg-white/90 dark:bg-ink/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                  SG
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    Saul A. González
                  </span>
                  <span className="hidden sm:block text-xs text-slate-400 leading-none">Emprendimiento · Tecnología · De PR para el mundo</span>
                </div>
              </Link>
              <nav className="flex items-center gap-5">
                <Link href="https://saulgonzalez.pro" target="_blank"
                  className="hidden sm:flex text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
                  Consultoría
                </Link>
                <a href="https://twitter.com/buscasaul" target="_blank" rel="noopener noreferrer"
                  className="hidden sm:flex text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
                  @buscasaul
                </a>
                <ThemeToggle />
                <Link href="https://saulgonzalez.pro/#quiz"
                  className="btn-gradient btn-glow text-white text-sm font-bold px-4 py-2 rounded-xl">
                  Consulta gratis
                </Link>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          {/* Footer */}
          <footer className="mt-24 border-t border-slate-100 dark:border-white/[0.07] bg-slate-50 dark:bg-surface">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-black">SG</div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">Saul A. González Alonso</p>
                      <p className="text-xs text-slate-400">Arecibo, Puerto Rico 🇵🇷 · COO Puny.bz · Parallel18 Gen 13</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Emprendimiento, Tecnología, y de PR para el mundo. Escribo sobre lo que aprendo construyendo negocios desde Arecibo.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="https://saulgonzalez.pro" className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">saulgonzalez.pro →</Link>
                  <a href="https://puny.bz" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">puny.bz →</a>
                  <a href="https://twitter.com/buscasaul" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">@buscasaul →</a>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.06] text-xs text-slate-400">
                © {new Date().getFullYear()} Saul A. González Alonso — Todos los derechos reservados
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
