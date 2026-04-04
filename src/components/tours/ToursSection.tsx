import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/client'
import { toursFullQuery } from '@/sanity/queries'
import ToursCarousel from './ToursCarousel'
import type { Tour } from '@/types/tour'

export default async function ToursSection() {
  const t = await getTranslations('tours')

  let tours: Tour[] = []
  try {
    tours = await client.fetch(toursFullQuery, {}, { cache: 'no-store' })
  } catch {
    // Sanity unavailable or misconfigured — show empty state
  }

  return (
    <section id="tours" className="bg-svetla py-20 overflow-hidden">
      {/* Section header */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase mb-4">
          Budva · Montenegro
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-tamna leading-[1.1] tracking-tight">
          {t('headline')}
        </h2>
        <p className="mt-4 text-tamna/50 text-base font-light">
          {t('subtitle')}
        </p>
      </div>

      {/* Carousel — bleeds to edges */}
      <ToursCarousel tours={tours} />
    </section>
  )
}
