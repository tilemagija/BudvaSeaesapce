import { getTranslations } from 'next-intl/server'

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`

export default async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-tamna"
    >
      {/*
        PLACEHOLDER: Sunset sea background
        Nemanja zamijenjuje pravu sliku kroz /admin → Site Settings → heroBackgroundImage
      */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep sea base */}
        <div className="absolute inset-0 bg-[#0a1628]" />
        {/* Sunset horizon — koralna/narandžasta odozgo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0f] via-[#2d1520] to-[#0a1628]" />
        {/* Sunset glow — lijevo-centar, zlatno-narandžasto */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-[#FF6B4A]/25 via-[#c4581a]/15 to-transparent" />
        {/* Sea reflection — tirkizna odozdo */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#00C2C7]/12 via-[#004f6b]/10 to-transparent" />
        {/* Sun orb */}
        <div className="absolute top-[18%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FF8C42] opacity-20 blur-3xl" />
        {/* Horizon line shimmer */}
        <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B4A]/30 to-transparent" />
        {/* Dark overlay za čitljivost teksta */}
        <div className="absolute inset-0 bg-tamna/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:py-48">
        <p className="mb-5 text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase">
          Budva · Montenegro
        </p>

        <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-svetla md:text-7xl lg:text-8xl">
          {t('headline')}
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-base font-light leading-relaxed text-svetla/55 md:text-lg">
          {t('subheadline')}
        </p>

        {/* CTAs */}
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
            className="w-full border border-svetla/25 px-8 py-4 text-xs font-semibold tracking-[0.25em] text-svetla/70 uppercase transition-all hover:border-svetla/60 hover:text-svetla sm:w-auto"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-tirkizna/40" />
      </div>
    </section>
  )
}
