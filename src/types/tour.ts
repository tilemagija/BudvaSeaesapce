export interface LocaleString {
  me: string
  en: string
  ru: string
}

// Sanity Portable Text blocks per locale
export interface LocaleBlockContent {
  me?: unknown[]
  en?: unknown[]
  ru?: unknown[]
}

export interface Tour {
  _id: string
  title: LocaleString
  slug: string
  shortDescription: LocaleString
  price: number
  duration?: string
  maxPeople?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  whatsappMessage?: string
  isFeatured?: boolean
}

// Extended type for tour detail page — matches tourBySlugQuery
export interface TourDetail {
  _id: string
  title: LocaleString
  slug: string
  shortDescription: LocaleString
  longDescription?: LocaleBlockContent
  price: number
  duration?: string
  maxPeople?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  whatsappMessage?: string
}
