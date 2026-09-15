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
// Normal website is preserved below in comments.
// DO NOT confuse this with sections intentionally hidden.
// ============================================================

export default function App() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="text-center">
        <img
          src={`${import.meta.env.BASE_URL}images/logos/master-plan.png`}
          alt="Rooted in Richland"
          className="w-full max-w-md mx-auto mb-8"
        />

        <h1 className="font-serif text-forest text-4xl md:text-5xl mb-4">
          Rooted in Richland
        </h1>

        <p className="font-serif italic text-sage text-2xl md:text-3xl">
          Website Coming Soon!
        </p>
      </div>
    </div>
  )
}

/*
============================================================
NORMAL WEBSITE - TEMPORARILY DISABLED FOR ATTORNEY REVIEW
============================================================

export function NormalWebsite() {
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

        LandUseSection intentionally hidden
        DocumentsSection intentionally hidden

        <StayEngagedSection />
        <EventsSection />

        InteractiveMapSection intentionally hidden
        LiveResponsesSection intentionally hidden

      </main>
      <Footer />
      <BottomBar />
    </div>
  )
}
*/
