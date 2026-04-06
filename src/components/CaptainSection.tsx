import { getTranslations } from 'next-intl/server'
import { getLocale } from 'next-intl/server'
import { client, urlFor } from '@/sanity/client'
import { captainQuery } from '@/sanity/queries'
import CaptainSectionClient from './CaptainSectionClient'

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1548445929-4f60a497f851?w=600&q=80'

export default async function CaptainSection() {
  const t = await getTranslations('about')
  const locale = (await getLocale()) as 'me' | 'en' | 'ru'

  let captain: {
    name?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photo?: any
    bio?: { [key: string]: { _type: string; children: { text: string }[] }[] }
    tagline?: { me?: string; en?: string; ru?: string }
  } | null = null

  try {
    captain = await client.fetch(captainQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable
  }

  const imageUrl = captain?.photo
    ? urlFor(captain.photo).width(600).height(800).fit('crop').crop('top').url()
    : PLACEHOLDER_IMG

  const tagline = captain?.tagline?.[locale] ?? captain?.tagline?.en ?? 'Your captain, your guide'

  const bioText = captain?.bio?.[locale] ?? captain?.bio?.en ?? null
  const bioPlain = bioText
    ? bioText.flatMap((b: { children?: { text: string }[] }) => b.children?.map((c) => c.text) ?? []).join(' ')
    : "I'm a passionate fisherman and sea lover — I enjoy breathtaking sunsets from my boat, great company, and adventures like snorkeling, cliff jumping, and exploring caves. Every day at sea is a new chance to embrace nature and create memories worth keeping."

  return (
    <CaptainSectionClient
      title={t('title')}
      name={captain?.name ?? 'Nemanja'}
      imageUrl={imageUrl}
      tagline={tagline}
      bio={bioPlain}
    />
  )
}
