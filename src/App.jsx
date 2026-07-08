import Header from "./components/Header.jsx"
import HeroSection from "./components/HeroSection.jsx"
import CommunityVoiceSection from "./components/CommunityVoiceSection.jsx"
import LearnSection from "./components/LearnSection.jsx"
import StayEngagedSection from "./components/StayEngagedSection.jsx"
import LiveResponsesSection from "./components/LiveResponsesSection.jsx"
import Footer from "./components/Footer.jsx"

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CommunityVoiceSection />
        <LearnSection />
        <StayEngagedSection />
        <LiveResponsesSection />
      </main>
      <Footer />
    </div>
  )
}
