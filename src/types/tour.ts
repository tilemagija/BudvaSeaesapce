export interface LocaleString {
  me: string
  en: string
  ru: string
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
