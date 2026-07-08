import StayEngagedForm from "./StayEngagedForm.jsx"

export default function StayEngagedSection() {
  return (
    <section id="stay-engaged" className="bg-forest py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label text-sand">Stay Engaged</p>
          <h2 className="font-serif text-white text-4xl lg:text-5xl font-semibold mb-5">
            Be Part of the Process
          </h2>
          <p className="font-sans text-ivory/85 text-base max-w-xl mx-auto leading-relaxed">
            Sign up to receive project updates, invitations to public meetings, and
            opportunities to weigh in as the Master Plan takes shape.
          </p>
          <p className="font-sans text-ivory/55 text-xs mt-4 tracking-wide">
            Please submit one response per person.
          </p>
        </div>
        <div className="border border-eucalyptus/25 p-8 md:p-12">
          <StayEngagedForm />
        </div>
      </div>
    </section>
  )
}
