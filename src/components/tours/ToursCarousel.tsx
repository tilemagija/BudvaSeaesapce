'use client'

import { useRef, useState } from 'react'
import TourCard from './TourCard'
import TourModal from './TourModal'
import type { Tour } from '@/types/tour'
import { useTranslations } from 'next-intl'

interface Props {
  tours: Tour[]
}

export default function ToursCarousel({ tours }: Props) {
  const t = useTranslations('tours')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 330, behavior: 'smooth' })
  }

  if (tours.length === 0) {
    return (
      <p className="text-center text-svetla/40 py-16 text-sm tracking-widest uppercase">
        {t('empty')}
      </p>
    )
  }

  return (
    <>
      <div className="relative">
        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* Left padding as first flex child */}
          <div className="flex-shrink-0 w-4 md:w-0" aria-hidden />

          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} onOpen={setSelectedTour} />
          ))}

          {/* Right padding + arrow hint */}
          <div className="flex-shrink-0 flex items-center pr-4 md:pr-0" aria-hidden>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-tamna border border-tirkizna/30 text-tirkizna flex items-center justify-center hover:bg-tirkizna hover:text-tamna transition-colors ml-2"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <TourModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </>
  )
}
