import Link from 'next/link'

const CHANNEL = 'UC5Z59quRfeeG1ttO460me7g'
const CHANNEL_URL = 'https://www.youtube.com/@punybz'

const videos = [
  { id: 'Yj-jjXiMa-Y', title: 'AI es como un carro' },
  { id: '8k05usgxtlw', title: 'Hoy es el PEOR día del AI' },
  { id: 'e6XJGJiogIQ', title: 'No pagues de más por AI' },
  { id: 'h8KgBuOfeMI', title: 'Sin data organizada, tu AI no sirve' },
  { id: '4Jj-E9t6Gsc', title: 'Un chatbot no resolverá los problemas de tu negocio' },
  { id: 'p49Ml4j8l6A', title: 'Si tu negocio no está digital, la IA no te va a salvar' },
  { id: '-2U6rSSnIQg', title: 'Abandonos en el checkout pueden arruinar tu negocio' },
  { id: '5V4bL4F6_os', title: 'Cómo se vería un negocio de Pet Grooming en Puny' },
  { id: 'i78FWY9K8eA', title: 'La parábola del pescador mexicano' },
  { id: 'NyCJs53tJwo', title: 'Lo que nadie te dice sobre emprender' },
  { id: 'sg2qEvRNnuA', title: 'Caer y levantarse: la clave del éxito' },
  { id: 'I8EV3BDk6zU', title: 'Be Yourself Before AI Replaces Everything Else' },
  { id: 'JOIPdolF3k8', title: 'Este emprendedor comenzó a vender a los 10 años en Ebay' },
  { id: 'C4LaMIBvA7w', title: 'Este emprendedor casi pierde su empresa luego de 2 años' },
]

export default function YoutubeSection() {
  return (
    <section className="mt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <p className="text-xs font-bold tracking-widest uppercase text-red-500">YouTube</p>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Videos de Puny.bz
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Emprendimiento, tecnología y negocios desde Puerto Rico
          </p>
        </div>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors flex-shrink-0">
          Ver canal completo →
        </a>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(video => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] hover:border-red-400/40 dark:hover:border-red-500/30 transition-all hover:shadow-xl hover:shadow-red-500/5 bg-white dark:bg-white/[0.02]"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center transition-colors shadow-lg">
                  <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* Title */}
            <div className="p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                {video.title}
              </p>
              <p className="text-xs text-slate-400 mt-1.5">Puny.bz</p>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-6 text-center sm:hidden">
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
          Ver canal completo →
        </a>
      </div>
    </section>
  )
}
