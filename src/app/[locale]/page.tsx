import IntroScreen from '@/components/IntroScreen'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
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
      </main>

      <Footer />
    </>
  )
}
