import { COMMUNITY_VOICE_SURVEY_URL } from "../config/surveys.js"

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
        </div>

        {/* Survey embed */}
        {COMMUNITY_VOICE_SURVEY_URL ? (
          <div className="w-full rounded-none overflow-hidden shadow-sm border border-eucalyptus/30">
            <iframe
              src={COMMUNITY_VOICE_SURVEY_URL}
              title="Community Voice Survey"
              width="100%"
              height="700"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              allow="geolocation"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-eucalyptus/50 rounded-none p-16 text-center bg-ivory/60">
            <p className="font-serif text-forest/40 text-xl mb-2">Survey Coming Soon</p>
            <p className="font-sans text-forest/30 text-sm">
              Paste your Survey123 share URL into{" "}
              <code className="bg-sand px-1 py-0.5 text-xs">src/config/surveys.js</code>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
