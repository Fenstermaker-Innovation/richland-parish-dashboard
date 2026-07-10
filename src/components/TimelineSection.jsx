import { useState } from "react"

const MILESTONES = [
  {
    phase: "Step 1",
    title: "Listen & Learn",
    status: "active",
    description: "Gather data, trends & existing conditions. This is where we build the factual foundation for everything that follows — understanding who lives here, how land is used today, and what challenges and opportunities the parish faces.",
    bullets: [
      "Collect and analyze demographic, housing, and economic data",
      "Inventory existing land use and infrastructure conditions",
      "Review current Master Plan and Zoning Code",
      "Identify key trends and issues facing the parish",
      "Establish baseline for all future planning decisions",
    ]
  },
  {
    phase: "Step 2",
    title: "Share Vision",
    status: "upcoming",
    description: "Hear from residents, businesses & stakeholders. Your voice shapes the direction of the plan. We're gathering community input through public meetings, surveys, focus groups, and outreach events across the parish.",
    bullets: [
      "Public kickoff meetings and open houses",
      "Online surveys and interactive community map",
      "Focus groups with farmers, business owners, and civic organizations",
      "Pop-up outreach at community events and gathering places",
      "Engagement with youth, schools, and underrepresented groups",
    ]
  },
  {
    phase: "Step 3",
    title: "Goals & Strategies",
    status: "upcoming",
    description: "Turn the vision into actionable objectives. Community input is synthesized into a clear set of goals and strategies that reflect Richland Parish's shared priorities for land use, growth, and quality of life.",
    bullets: [
      "Draft vision statement rooted in community input",
      "Develop goals for each planning topic area",
      "Identify strategies to achieve each goal",
      "Review and refine with advisory committee",
      "Present goals and strategies for community feedback",
    ]
  },
  {
    phase: "Step 4",
    title: "Action Plan",
    status: "upcoming",
    description: "Prioritize projects, policies, and investments. The Action Plan turns strategies into a realistic implementation roadmap — identifying what gets done, by whom, and in what order, with a future land use map to guide development decisions.",
    bullets: [
      "Future land use map development",
      "Policy recommendations by topic area",
      "Capital improvement and infrastructure priorities",
      "Implementation assignments and timelines",
      "Updated Development Code framework",
    ]
  },
  {
    phase: "Step 5",
    title: "Public Review & Adoption",
    status: "upcoming",
    description: "Present the draft plan and gather final feedback. The complete draft Master Plan and Development Code are released for public review, followed by formal public hearings and adoption by the Richland Parish Police Jury.",
    bullets: [
      "Draft Master Plan released for 60-day public comment",
      "Draft Development Code released for review",
      "Public hearings before the Planning Commission",
      "Final revisions based on public comment",
      "Formal adoption by the Richland Parish Police Jury",
    ]
  },
  {
    phase: "Step 6",
    title: "Implementation",
    status: "upcoming",
    description: "Put the plan into action & monitor results. Adoption is the beginning, not the end. The Implementation phase puts the plan to work — tracking progress, making updates as conditions change, and ensuring the community's vision becomes reality.",
    bullets: [
      "Integrate Master Plan policies into day-to-day decisions",
      "Pursue funding and grants for priority projects",
      "Track progress against goals and benchmarks",
      "Annual review and reporting to Police Jury",
      "Update plan as needed to reflect changing conditions",
    ]
  },
]

const STATUS = {
  complete: {
    dot: "bg-sage border-sage text-forest",
    ring: "ring-sage/40",
    badge: "bg-sage/15 text-sage border-sage/30",
    label: "Completed",
    title: "text-forest",
  },
  active: {
    dot: "bg-eucalyptus border-eucalyptus text-forest",
    ring: "ring-eucalyptus/40",
    badge: "bg-eucalyptus/15 text-eucalyptus border-eucalyptus/30",
    label: "We Are Here",
    title: "text-forest",
  },
  upcoming: {
    dot: "bg-sand border-sand/60 text-forest/40",
    ring: "ring-sand/30",
    badge: "bg-sand/30 text-forest/40 border-sand/40",
    label: "Upcoming",
    title: "text-forest",
  },
}

const activeIdx = MILESTONES.findIndex(m => m.status === "active")
const progressPct = activeIdx !== -1
  ? ((activeIdx + 0.5) / (MILESTONES.length - 1)) * 100
  : (MILESTONES.filter(m => m.status === "complete").length / (MILESTONES.length - 1)) * 100

export default function TimelineSection() {
  const [selected, setSelected] = useState(activeIdx)

  const current = selected !== null ? MILESTONES[selected] : null
  const s = current ? STATUS[current.status] : null

  function toggle(i) {
    setSelected(prev => (prev === i ? null : i))
  }

  return (
    <section id="timeline" className="bg-ivory py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-forest">Planning Process</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            We Are Just Getting Started
          </h2>
          <p className="font-sans text-forest/55 text-base max-w-xl mx-auto leading-relaxed">
            We will be looking for your voice, input, and vision to help develop the Master Plan.
            Select a step to learn more.
          </p>
        </div>

        {/* Horizontal track — scrollable on small screens */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="relative min-w-[560px]">

            {/* Base track line */}
            <div className="absolute top-[2.375rem] left-[calc(8.33%+1.25rem)] right-[calc(8.33%+1.25rem)] h-px bg-sand" />

            {/* Progress line */}
            <div
              className="absolute top-[2.375rem] left-[calc(8.33%+1.25rem)] h-px bg-gradient-to-r from-sage to-eucalyptus/70 transition-all duration-700"
              style={{ width: `calc(${progressPct}% * (1 - 0.1667) - 0.5rem)` }}
            />

            {/* Nodes */}
            <div className="flex justify-between">
              {MILESTONES.map((m, i) => {
                const st = STATUS[m.status]
                const isSelected = selected === i
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className="flex flex-col items-center gap-2.5 w-[16.66%] group focus:outline-none"
                    aria-expanded={isSelected}
                    aria-label={`${m.phase}: ${m.title}`}
                  >
                    {/* Phase label */}
                    <span className="font-sans text-[10px] tracking-widest uppercase text-forest/35 h-4 flex items-center">
                      {m.phase}
                    </span>

                    {/* Dot */}
                    <div className={`
                      relative w-10 h-10 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200 ${st.dot}
                      ${isSelected ? `ring-4 ${st.ring} scale-110` : "group-hover:scale-105"}
                    `}>
                      {m.status === "complete" && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {m.status === "active" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-forest/70 animate-pulse" />
                      )}
                      {m.status === "upcoming" && (
                        <span className="font-sans text-xs font-semibold">{i + 1}</span>
                      )}
                    </div>

                    {/* Title */}
                    <span className={`
                      font-sans text-[11px] text-center leading-snug transition-colors px-1
                      ${isSelected ? "text-forest font-semibold" : "text-forest/45 group-hover:text-forest/70"}
                    `}>
                      {m.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Expanded detail panel */}
        <div className={`mt-10 transition-all duration-300 ${current ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {current && (
            <div className="border border-sand bg-white p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-forest/35 mb-1">
                    {current.phase}
                  </p>
                  <h3 className={`font-serif text-2xl font-semibold ${s.title}`}>
                    {current.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-sans text-[10px] px-2.5 py-1 border ${s.badge}`}>
                    {s.label}
                  </span>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="w-7 h-7 flex items-center justify-center text-forest/30 hover:text-forest/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="font-sans text-forest/65 text-sm leading-relaxed mb-6">
                {current.description}
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {current.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage/60 flex-shrink-0" />
                    <span className="font-sans text-forest/60 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="font-sans text-forest/30 text-xs text-center mt-10">
          Community input will be a key component throughout the life of the planning process.
        </p>

      </div>
    </section>
  )
}
