import IntroScreen from '@/components/IntroScreen'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSectionServer'
import ToursSection from '@/components/tours/ToursSection'
import GallerySection from '@/components/gallery/GallerySection'
import CaptainSection from '@/components/CaptainSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import StickyBookBar from '@/components/StickyBookBar'
import SectionDivider from '@/components/SectionDivider'
import AudioPlayerServer from '@/components/AudioPlayerServer'

export default function HomePage() {
  return (
    <>
      {/* Client overlay — appears on first visit, hidden after Enter */}
      <IntroScreen />

      {/* Fixed UI */}
      <Nav />
      <StickyBookBar />
      <AudioPlayerServer />

      {/* Page content */}
      <main>
        <HeroSection />
        <ToursSection />
        <SectionDivider variant="light-to-dark" />
        <GallerySection />
        <SectionDivider variant="dark-to-light" />
        <CaptainSection />
        <SectionDivider variant="light-to-dark" />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
