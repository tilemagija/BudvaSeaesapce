'use client'

import { useTranslations } from 'next-intl'

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`

export default function StickyBookBar() {
  const t = useTranslations('nav')

  return (
    <div className="fixed bottom-0 right-0 left-0 z-40 md:hidden">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 bg-tirkizna py-4 text-xs font-bold tracking-[0.25em] text-tamna uppercase"
      >
        <span>{t('bookNow')}</span>
        <span aria-hidden>→</span>
      </a>
    </div>
  )
}
