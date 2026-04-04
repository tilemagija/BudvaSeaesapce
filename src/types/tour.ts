export interface LocaleString {
  me: string
  en: string
  ru: string
}

export interface TourCategory {
  _id: string
  title: LocaleString
  slug: string
  icon?: string
}

export interface Tour {
  _id: string
  title: LocaleString
  slug: string
  shortDescription: LocaleString
  price: number
  priceNote?: LocaleString
  duration?: string
  maxPeople?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  includedItems?: { me: string[]; en: string[]; ru: string[] }
  whatsappMessage?: LocaleString
  isFeatured?: boolean
  category?: TourCategory
}
