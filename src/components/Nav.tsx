'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LogoSVG from './LogoSVG'

const LOCALES = [
  { code: 'me', label: 'ME' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'РУ' },
]

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    // Let AnimatePresence close first, then scroll
    setTimeout(() => {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const navLinks = ['tours', 'gallery', 'about', 'contact'] as const

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-tamna/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          {/* Logo */}
          <Link href="/" aria-label="Budva Sea Escape — home" onClick={() => setMenuOpen(false)}>
            <LogoSVG size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navLinks.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-xs font-medium tracking-[0.2em] text-svetla/60 uppercase transition-colors hover:text-tirkizna"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          {/* Right: language + CTA + hamburger */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Language switcher */}
            <div className="flex items-center gap-3">
              {LOCALES.map(({ code, label }) => (
                <Link
                  key={code}
                  href="/"
                  locale={code}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                    code === locale
                      ? 'text-tirkizna'
                      : 'text-svetla/60 hover:text-svetla/80'
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

            {/* Hamburger — mobile only */}
            <button
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-[2px] w-6 bg-svetla origin-center"
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-svetla"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-svetla origin-center"
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-30 flex flex-col bg-tamna md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
          >
            {/* Tirkizna glow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-80 -translate-x-1/2 rounded-full bg-tirkizna opacity-[0.06] blur-3xl" />

            {/* Nav links — centered vertically */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-2 pt-20">
              {navLinks.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.5, ease: EASE_EXPO }}
                >
                  <button
                    onClick={() => handleNavClick(`#${key}`)}
                    className="block px-8 py-3 font-display text-4xl font-bold text-svetla/80 tracking-tight transition-colors hover:text-tirkizna"
                  >
                    {t(key)}
                  </button>
                </motion.div>
              ))}

              {/* WA CTA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: EASE_EXPO }}
                className="mt-8"
              >
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block bg-tirkizna px-10 py-4 text-xs font-bold tracking-[0.25em] text-tamna uppercase"
                >
                  {t('bookNow')}
                </a>
              </motion.div>
            </nav>

            {/* Bottom — locale switcher */}
            <motion.div
              className="flex justify-center gap-6 pb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              {LOCALES.map(({ code, label }) => (
                <Link
                  key={code}
                  href="/"
                  locale={code}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-semibold tracking-[0.2em] uppercase transition-colors ${
                    code === locale ? 'text-tirkizna' : 'text-svetla/60 hover:text-svetla/80'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
