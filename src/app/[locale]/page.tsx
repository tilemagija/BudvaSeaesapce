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
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <CaptainSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
