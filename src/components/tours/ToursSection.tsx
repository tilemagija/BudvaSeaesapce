import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/client'
import { toursFullQuery } from '@/sanity/queries'
import ToursCarousel from './ToursCarousel'
import ToursSectionHeader from './ToursSectionHeader'
import type { Tour } from '@/types/tour'

export default async function ToursSection() {
  const t = await getTranslations('tours')

  let tours: Tour[] = []
  try {
    tours = await client.fetch(toursFullQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable or misconfigured — show empty state
  }

  return (
    <section id="tours" className="bg-svetla py-16 md:py-20 overflow-hidden">
      <ToursSectionHeader
        headline={t('headline')}
        subtitle={t('subtitle')}
      />
      <ToursCarousel tours={tours} />
    </section>
  )
}
