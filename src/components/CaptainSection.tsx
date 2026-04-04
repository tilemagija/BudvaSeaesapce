import { getTranslations } from 'next-intl/server'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import { client, urlFor } from '@/sanity/client'
import { captainQuery } from '@/sanity/queries'

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
    ? urlFor(captain.photo).width(600).height(700).fit('crop').url()
    : PLACEHOLDER_IMG

  const tagline = captain?.tagline?.[locale] ?? captain?.tagline?.en ?? 'Your captain, your guide'

  // Extract plain text from block content
  const bioText = captain?.bio?.[locale]
    ?? captain?.bio?.en
    ?? null

  const bioPlain = bioText
    ? bioText.flatMap((b: { children?: { text: string }[] }) => b.children?.map((c) => c.text) ?? []).join(' ')
    : 'Placeholder tekst o kapetanu — Nemanja može promijeniti kroz /admin → Kapetan.'

  return (
    <section id="about" className="bg-svetla py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section label */}
        <p className="text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase mb-10 text-center md:text-left">
          {t('title')}
        </p>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          {/* Left — photo */}
          <div className="relative flex-shrink-0 w-64 md:w-72 lg:w-80">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src={imageUrl}
                alt={captain?.name ?? 'Captain'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
              {/* Tirkizna accent corner */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-tirkizna" />
            </div>
            {/* Floating name badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-tamna px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
              <span className="text-xs font-bold tracking-[0.2em] text-tirkizna uppercase">
                {captain?.name ?? 'Nemanja'}
              </span>
            </div>
          </div>

          {/* Right — text */}
          <div className="flex-1 pt-6 md:pt-0">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-tamna leading-[1.1] tracking-tight mb-3">
              {tagline}
            </h2>

            <div className="h-[2px] w-12 bg-koralna mb-6" />

            <p className="text-tamna/70 text-base leading-relaxed">
              {bioPlain}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
