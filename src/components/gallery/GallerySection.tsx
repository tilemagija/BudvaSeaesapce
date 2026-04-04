import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/client'
import { galleryQuery } from '@/sanity/queries'
import GalleryGrid from './GalleryGrid'
import type { GalleryItem } from '@/types/gallery'

export default async function GallerySection() {
  const t = await getTranslations('gallery')

  let items: GalleryItem[] = []
  try {
    items = await client.fetch(galleryQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — show empty state
  }

  return (
    <section id="gallery" className="bg-tamna py-20">
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase mb-4">
          Budva · Montenegro
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-svetla leading-[1.1] tracking-tight">
          {t('title')}
        </h2>
        <p className="mt-4 text-svetla/50 text-base font-light">
          {t('subtitle')}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-svetla/40 py-16 text-sm tracking-widest uppercase">
          {t('empty')}
        </p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </section>
  )
}
