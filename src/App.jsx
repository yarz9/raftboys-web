import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'
import { FloatingFab } from './components/FloatingFab'
import { ScrollProgress } from './motion/primitives'

import { Hero }            from './sections/Hero'
import { EditorialIntro }  from './sections/EditorialIntro'
import { TrustBar }        from './sections/TrustBar'
import { Experiences }     from './sections/Experiences'
import { WhyChoose }       from './sections/WhyChoose'
import { Guides }          from './sections/Guides'
import { Itinerary }       from './sections/Itinerary'
import { Reviews }         from './sections/Reviews'
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
        <EditorialIntro />
        <TrustBar />
        <Experiences />
        <WhyChoose />
        <Itinerary />
        <Guides />
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
