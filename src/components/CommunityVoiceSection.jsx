import CommunityVoiceForm from "./CommunityVoiceForm.jsx"

export default function CommunityVoiceSection() {
  return (
    <section id="community-voice" className="bg-sand py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label">Community Voice</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            What does Richland Parish<br className="hidden sm:block" /> mean to you?
          </h2>
          <p className="font-sans text-forest/60 text-base max-w-xl mx-auto leading-relaxed">
            Your answer will directly shape the identity and direction of this project.
            There are no wrong answers — only your perspective matters here.
          </p>
          <p className="font-sans text-forest/40 text-xs mt-4 tracking-wide">
            Please submit one response per person.
          </p>
        </div>
        <div className="bg-ivory border border-eucalyptus/30 p-8 md:p-12">
          <CommunityVoiceForm />
        </div>
      </div>
    </section>
  )
}
