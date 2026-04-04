import { getTranslations } from 'next-intl/server'

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`

export default async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-tamna"
    >
      {/* Background — cinematic sea gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-tamna via-[#0d2040] to-tamna" />
        {/* Tirkizna sea glow — bottom center */}
        <div className="absolute bottom-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-tirkizna opacity-[0.07] blur-3xl" />
        {/* Koralna accent — upper right */}
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-koralna opacity-[0.04] blur-3xl" />
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

      {/* Scroll line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-tirkizna/40" />
      </div>
    </section>
  )
}
