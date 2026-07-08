import { STAY_ENGAGED_SURVEY_URL } from "../config/surveys.js"

export default function StayEngagedSection() {
  return (
    <section id="stay-engaged" className="bg-forest py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label text-eucalyptus">Stay Engaged</p>
          <h2 className="font-serif text-ivory text-4xl lg:text-5xl font-semibold mb-5">
            Be Part of the Process
          </h2>
          <p className="font-sans text-ivory/60 text-base max-w-xl mx-auto leading-relaxed">
            Sign up to receive project updates, invitations to public meetings, and
            opportunities to weigh in as the Master Plan takes shape.
          </p>
        </div>

        {/* Survey embed */}
        {STAY_ENGAGED_SURVEY_URL ? (
          <div className="w-full overflow-hidden border border-eucalyptus/20">
            <iframe
              src={STAY_ENGAGED_SURVEY_URL}
              title="Stay Engaged Sign-Up"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-eucalyptus/30 p-16 text-center">
            <p className="font-serif text-ivory/30 text-xl mb-2">Sign-Up Form Coming Soon</p>
            <p className="font-sans text-ivory/20 text-sm">
              Paste your Stay Engaged Survey123 URL into{" "}
              <code className="bg-forest/50 px-1 py-0.5 text-xs">src/config/surveys.js</code>
            </p>
          </div>
        )}

        {/* Trust signals */}
        <p className="font-sans text-ivory/30 text-xs text-center mt-8 tracking-wide">
          Your information will never be shared with third parties and is used solely for project communications.
        </p>
      </div>
    </section>
  )
}
