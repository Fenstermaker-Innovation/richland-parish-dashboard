import Header from "./components/Header.jsx"
import HeroSection from "./components/HeroSection.jsx"
import AboutSection from "./components/AboutSection.jsx"
import TimelineSection from "./components/TimelineSection.jsx"
import CommunityVoiceSection from "./components/CommunityVoiceSection.jsx"
import LearnSection from "./components/LearnSection.jsx"
import ExistingConditionsSection from "./components/ExistingConditionsSection.jsx"
import LandUseSection from "./components/LandUseSection.jsx"
import DocumentsSection from "./components/DocumentsSection.jsx"
import StayEngagedSection from "./components/StayEngagedSection.jsx"
import EventsSection from "./components/EventsSection.jsx"
import InteractiveMapSection from "./components/InteractiveMapSection.jsx"
import LiveResponsesSection from "./components/LiveResponsesSection.jsx"
import Footer from "./components/Footer.jsx"
import BottomBar from "./components/BottomBar.jsx"

// ============================================================
// TEMPORARY RICHLAND HOLD - ATTORNEY REVIEW - SEPTEMBER 2026
// The normal website is preserved below.
// Remove the temporary Coming Soon return and restore the
// normal return after Richland approves the website for launch.
// DO NOT confuse this hold with sections intentionally hidden
// within the normal website.
// ============================================================

export default function App() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-forest text-5xl md:text-6xl mb-4">
          Rooted in Richland
        </h1>

        <p className="font-serif italic text-gold text-2xl md:text-3xl">
          Website Coming Soon!
        </p>
      </div>
    </div>
  )


  /*
  ============================================================
  NORMAL WEBSITE - TEMPORARILY DISABLED FOR ATTORNEY REVIEW
  ============================================================

  return (
    <div className="min-h-screen pb-14">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <CommunityVoiceSection />
        <LearnSection />
        <ExistingConditionsSection />
        {/* <LandUseSection /> */}
        {/* <DocumentsSection /> */}
        <StayEngagedSection />
        <EventsSection />
        {/* <InteractiveMapSection /> */}
        {/* <LiveResponsesSection /> */}
      </main>
      <Footer />
      <BottomBar />
    </div>
  )
  */
}
