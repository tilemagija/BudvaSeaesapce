import { getTranslations } from 'next-intl/server'
import LogoSVG from './LogoSVG'

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`
const IG_URL = 'https://www.instagram.com/budvaseaescape'

export default async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className="border-t border-svetla/10 bg-tamna py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <LogoSVG size="md" />

          <p className="text-xs tracking-[0.15em] text-svetla/55">
            {t('tagline')}
          </p>

          <div className="flex items-center gap-6">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-widest text-svetla/50 uppercase transition-colors hover:text-tirkizna"
            >
              WhatsApp
            </a>
            <span className="text-svetla/20">·</span>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-widest text-svetla/50 uppercase transition-colors hover:text-tirkizna"
            >
              Instagram
            </a>
          </div>

          <p className="text-xs text-svetla/20">
            © {new Date().getFullYear()} Budva Sea Escape · {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
