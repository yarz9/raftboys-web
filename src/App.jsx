import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'
import { FloatingFab } from './components/FloatingFab'
import { ScrollProgress } from './motion/primitives'

import { Hero }        from './sections/Hero'
import { TrustBar }    from './sections/TrustBar'
import { Experiences } from './sections/Experiences'
import { WhyChoose }   from './sections/WhyChoose'
import { Guides }      from './sections/Guides'
import { Timeline }    from './sections/Timeline'
import { Reviews }     from './sections/Reviews'
import { Gallery }     from './sections/Gallery'
import { Packages }    from './sections/Packages'
import { FAQ }         from './sections/FAQ'
import { Booking }     from './sections/Booking'
import { MapSection }  from './sections/Map'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Experiences />
        <WhyChoose />
        <Guides />
        <Timeline />
        <Reviews />
        <Gallery />
        <Packages />
        <FAQ />
        <Booking />
        <MapSection />
      </main>
      <Footer />
      <FloatingFab />
    </>
  )
}
