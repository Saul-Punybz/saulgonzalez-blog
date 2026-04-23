import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://blogs.saulgonzalez.pro'),
  title: { default: 'Blog — Saul A. González', template: '%s | Saul A. González' },
  description: 'Emprendimiento, tecnología, nearshore development y el ecosistema startup de Puerto Rico. Por Saul A. González Alonso.',
  openGraph: {
    siteName: 'Saul A. González — Blog',
    locale: 'es_PR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@buscasaul' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0a0a14] text-slate-900 dark:text-white min-h-screen">
        <header className="border-b border-slate-100 dark:border-white/[0.07]">
          <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              Saul A. González
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link href="https://saulgonzalez.pro" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                saulgonzalez.pro
              </Link>
              <a href="https://twitter.com/buscasaul" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                @buscasaul
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-14">{children}</main>
        <footer className="border-t border-slate-100 dark:border-white/[0.07] mt-20">
          <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-slate-400">
            <span>© {new Date().getFullYear()} Saul A. González Alonso · Arecibo, Puerto Rico 🇵🇷</span>
            <Link href="https://saulgonzalez.pro" className="hover:text-violet-500 transition-colors">
              Consultoría →
            </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
