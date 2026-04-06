import { client, urlFor } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import HeroSection from './HeroSection'

export default async function HeroSectionServer() {
  let heroImageUrl: string | null = null
  let heroVideoUrl: string | null = null

  try {
    const settings = await client.fetch(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } }
    )
    if (settings?.heroBackgroundImage) {
      heroImageUrl = urlFor(settings.heroBackgroundImage).width(1920).quality(85).url()
    }
    if (settings?.heroBackgroundVideo) {
      heroVideoUrl = settings.heroBackgroundVideo
    }
  } catch {
    // Sanity unavailable — fallback to placeholder
  }

  return <HeroSection heroImageUrl={heroImageUrl} heroVideoUrl={heroVideoUrl} />
}
