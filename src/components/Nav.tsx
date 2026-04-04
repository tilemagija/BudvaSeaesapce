'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LogoSVG from './LogoSVG'

const LOCALES = [
  { code: 'me', label: 'ME' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'РУ' },
]

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-tamna/90 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <Link href="/" aria-label="Budva Sea Escape — home">
          <LogoSVG size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {(['tours', 'gallery', 'about', 'contact'] as const).map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-xs font-medium tracking-[0.2em] text-svetla/60 uppercase transition-colors hover:text-tirkizna"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Right: language + CTA */}
        <div className="flex items-center gap-5">
          {/* Language switcher */}
          <div className="flex items-center gap-3">
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href="/"
                locale={code}
                className={`text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                  code === locale
                    ? 'text-tirkizna'
                    : 'text-svetla/35 hover:text-svetla/70'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA — desktop only */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden bg-tirkizna px-5 py-2 text-xs font-bold tracking-[0.2em] text-tamna uppercase transition-opacity hover:opacity-80 md:block"
          >
            {t('bookNow')}
          </a>
        </div>
      </div>
    </header>
  )
}
