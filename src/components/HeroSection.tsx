import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`

// PLACEHOLDER — Nemanja zamijenjuje kroz /admin → Site Settings → heroBackgroundImage
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80'

export default async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-tamna"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={PLACEHOLDER_IMAGE}
          alt="Budva sea experience"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay za čitljivost */}
        <div className="absolute inset-0 bg-gradient-to-b from-tamna/70 via-tamna/50 to-tamna/80" />
        {/* Koralna sunset tinta odozgo */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#FF6B4A]/20 to-transparent" />
        {/* Tirkizna tinta odozdo */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-tamna to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:py-48">
        <p className="mb-5 text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase">
          Budva · Montenegro
        </p>

        <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-svetla md:text-7xl lg:text-8xl">
          {t('headline')}
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-base font-light leading-relaxed text-svetla/70 md:text-lg">
          {t('subheadline')}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#tours"
            className="w-full bg-tirkizna px-8 py-4 text-xs font-bold tracking-[0.25em] text-tamna uppercase transition-all hover:opacity-90 sm:w-auto"
          >
            {t('cta')}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-svetla/30 px-8 py-4 text-xs font-semibold tracking-[0.25em] text-svetla/80 uppercase transition-all hover:border-svetla hover:text-svetla sm:w-auto"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-tirkizna/50" />
      </div>
    </section>
  )
}
