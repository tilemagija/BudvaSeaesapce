import IntroScreen from '@/components/IntroScreen'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import ToursSection from '@/components/tours/ToursSection'
import GallerySection from '@/components/gallery/GallerySection'
import CaptainSection from '@/components/CaptainSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import StickyBookBar from '@/components/StickyBookBar'

export default function HomePage() {
  return (
    <>
      {/* Client overlay — appears on first visit, hidden after Enter */}
      <IntroScreen />

      {/* Fixed UI */}
      <Nav />
      <StickyBookBar />

      {/* Page content */}
      <main>
        <HeroSection />
        <ToursSection />
        <GallerySection />
        <CaptainSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
