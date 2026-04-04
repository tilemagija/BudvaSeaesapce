import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/client'
import { galleryQuery } from '@/sanity/queries'
import GalleryGrid from './GalleryGrid'
import GallerySectionHeader from './GallerySectionHeader'
import type { GalleryItem } from '@/types/gallery'

// Unsplash placeholder items — prikazuju se dok nema sadrzaja u CMS-u
const PLACEHOLDER_ITEMS: GalleryItem[] = [
  { _id: 'p1', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
  { _id: 'p2', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=600&q=80' },
  { _id: 'p3', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80' },
  { _id: 'p4', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80' },
  { _id: 'p5', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80' },
  { _id: 'p6', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
  { _id: 'p7', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80' },
  { _id: 'p8', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80' },
  { _id: 'p9', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=600&q=80' },
  { _id: 'p10', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
  { _id: 'p11', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1490591255693-fd50f0a1c71c?w=600&q=80' },
  { _id: 'p12', mediaType: 'image', image: null, _placeholderUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80' },
] as GalleryItem[]

export default async function GallerySection() {
  const t = await getTranslations('gallery')

  let items: GalleryItem[] = []
  try {
    items = await client.fetch(galleryQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — show placeholders
  }

  const displayItems = items.length > 0 ? items : PLACEHOLDER_ITEMS

  return (
    <section id="gallery" className="bg-tamna py-16 md:py-20">
      <GallerySectionHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <GalleryGrid items={displayItems} />
    </section>
  )
}
