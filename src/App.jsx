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

export default function App() {
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
        <LandUseSection />
        <DocumentsSection />
        <StayEngagedSection />
        <EventsSection />
        <InteractiveMapSection />
        <LiveResponsesSection />
      </main>
      <Footer />
      <BottomBar />
    </div>
  )
}
