import type { LocaleString } from './tour'

export interface GalleryItem {
  _id: string
  mediaType: 'image' | 'video'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  videoUrl?: string
  caption?: LocaleString
  category?: {
    _id: string
    title: LocaleString
    slug: string
  }
}
