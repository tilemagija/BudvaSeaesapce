'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import MagneticWrap from './MagneticWrap'
import ScrollRevealWords from './ScrollRevealWords'

const WA_NUMBER = '38267087728'
const IG_URL = 'https://www.instagram.com/budvaseaescape'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

const IG_PHOTOS = [
  'photo-1507525428034-b723cf961d3e',
  'photo-1506929562872-bb421503ef21',
  'photo-1519046904884-53103b34b206',
  'photo-1488085061387-422e29b40080',
  'photo-1502680390469-be75c86b636f',
  'photo-1544551763-46a013bb70d5',
]

export default function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="bg-tamna py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
        >
          <p className="text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase mb-4">
            Budva · Montenegro
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-svetla leading-[1.1] tracking-tight">
            <ScrollRevealWords text={t('title')} baseDelay={0.1} />
          </h2>
        </motion.div>

        {/* Main layout — stacks vertically on mobile */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16 lg:gap-20">

          {/* Phone mockup */}
          <motion.a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0"
            aria-label="Instagram @budvaseaescape"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
          >
            <div className="relative w-40 h-[310px] sm:w-44 sm:h-[340px] bg-tamna border-[3px] border-svetla/20 rounded-[2.5rem] shadow-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="absolute -left-[5px] top-20 w-[5px] h-8 bg-svetla/20 rounded-l-sm" />
              <div className="absolute -left-[5px] top-32 w-[5px] h-8 bg-svetla/20 rounded-l-sm" />
              <div className="absolute -right-[5px] top-24 w-[5px] h-12 bg-svetla/20 rounded-r-sm" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-tamna border-b-[3px] border-x-[3px] border-svetla/20 rounded-b-2xl z-10" />

              <div className="absolute inset-[3px] rounded-[2.2rem] overflow-hidden bg-[#0a0a0a]">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center px-4 pt-7 pb-1">
                    <span className="text-[8px] text-white/60 font-medium">9:41</span>
                    <div className="w-3 h-2 border border-white/60 rounded-[1px] relative">
                      <div className="absolute inset-[1px] right-[3px] bg-white/60 rounded-[1px]" />
                      <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-white/60 rounded-r-[1px]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                    <svg className="w-14 h-4 text-white" viewBox="0 0 80 20" fill="currentColor">
                      <text x="0" y="15" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">Instagram</text>
                    </svg>
                    <div className="flex gap-2">
                      <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                      <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                  </div>

                  <div className="px-3 pt-3 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-koralna via-[#e1306c] to-[#fd1d1d] p-[2px] flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                          <span className="text-[7px] font-bold text-tirkizna">BSE</span>
                        </div>
                      </div>
                      <div className="flex gap-2 text-center">
                        {[['12', 'posts'], ['1.2k', 'followers']].map(([n, l]) => (
                          <div key={l} className="flex flex-col">
                            <span className="text-[8px] font-bold text-white">{n}</span>
                            <span className="text-[6px] text-white/50">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[7px] font-semibold text-white leading-tight">budvaseaescape</p>
                    <p className="text-[6px] text-white/50 leading-tight">🌊 Budva · Montenegro</p>
                  </div>

                  <div className="flex-1 grid grid-cols-3 gap-[1px]">
                    {IG_PHOTOS.map((id) => (
                      <div key={id} className="aspect-square bg-white/10 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://images.unsplash.com/${id}?w=100&q=60`}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-around items-center px-4 py-2 border-t border-white/10">
                    {['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0', 'M12 5v14M5 12h14', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'].map((d, i) => (
                      <svg key={i} className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={d} /></svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-tirkizna/0 group-hover:border-tirkizna/40 transition-colors duration-300 pointer-events-none" />
            </div>
            <p className="text-center text-xs text-svetla/40 mt-5 tracking-widest uppercase group-hover:text-tirkizna transition-colors">
              @budvaseaescape
            </p>
          </motion.a>

          {/* Shimmer CTA */}
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_EXPO }}
          >
            <p className="text-xs font-semibold tracking-[0.45em] text-svetla/30 uppercase">
              {t('subtitle')}
            </p>
            <h3 className="shimmer-text font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              START YOUR<br />ADVENTURE
            </h3>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_EXPO }}
          >
            <MagneticWrap strength={0.2}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 flex flex-col items-center gap-3"
                aria-label="Contact via WhatsApp"
              >
                <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#25D366]/50">
                  <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] text-svetla/50 uppercase group-hover:text-[#25D366] transition-colors">
                  WhatsApp
                </span>
              </a>
            </MagneticWrap>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
