import { useState } from "react"

const MILESTONES = [
  {
    phase: "Phase 1",
    title: "Project Kickoff",
    date: "Spring 2025",
    status: "complete",
    description: "The project officially launched with the formation of the planning team, establishment of the advisory committee, and first stakeholder outreach. Initial scope, schedule, and public engagement strategy were finalized.",
    bullets: [
      "Project scope and schedule finalized",
      "Advisory committee formed",
      "Stakeholder mapping and initial outreach",
      "Project website and engagement tools launched",
    ]
  },
  {
    phase: "Phase 2",
    title: "Existing Conditions",
    date: "Summer 2025",
    status: "complete",
    description: "A thorough analysis of current conditions across the parish was completed, establishing a data-driven baseline for all future planning decisions.",
    bullets: [
      "Land use inventory and mapping",
      "Demographics, housing, and economic analysis",
      "Infrastructure assessment (roads, utilities, broadband)",
      "Environmental and natural resource review",
      "Full Existing Conditions Report published",
    ]
  },
  {
    phase: "Phase 3",
    title: "Community Engagement",
    date: "Fall 2025 – Spring 2026",
    status: "active",
    description: "This is where you come in. We're gathering community input through multiple channels to ensure every resident has a meaningful opportunity to shape the plan.",
    bullets: [
      "Public kickoff meeting and open houses",
      "Online surveys and interactive map",
      "Focus groups with farmers, business owners, and civic groups",
      "Pop-up outreach at community events",
      "Youth and school engagement",
    ]
  },
  {
    phase: "Phase 4",
    title: "Draft Master Plan",
    date: "Summer 2026",
    status: "upcoming",
    description: "Community input is synthesized into a draft Master Plan that sets the long-range vision, goals, and policies for Richland Parish through 2045.",
    bullets: [
      "Vision statement and goals developed",
      "Land use framework and future land use map",
      "Policies for housing, transportation, and economic development",
      "Draft released for 60-day public comment period",
    ]
  },
  {
    phase: "Phase 5",
    title: "Draft Zoning Code",
    date: "Fall 2026",
    status: "upcoming",
    description: "The Zoning Code update translates the Master Plan's vision into enforceable regulations — determining what can be built where, at what scale, and under what conditions.",
    bullets: [
      "Updated zoning districts and permitted uses",
      "Development standards and design guidelines",
      "Agricultural and environmental protections",
      "Public hearing and comment period",
    ]
  },
  {
    phase: "Phase 6",
    title: "Adoption",
    date: "Early 2027",
    status: "upcoming",
    description: "Following final public hearings, both the Master Plan and Zoning Code are formally adopted by the Richland Parish Police Jury, becoming the official guiding documents for the parish.",
    bullets: [
      "Final revisions based on public comment",
      "Planning commission review and recommendation",
      "Police Jury public hearing",
      "Official adoption and implementation",
    ]
  },
]

const STATUS = {
  complete: {
    dot: "bg-sage border-sage text-forest",
    ring: "ring-sage/40",
    badge: "bg-sage/15 text-sage border-sage/30",
    label: "Completed",
    title: "text-sage",
  },
  active: {
    dot: "bg-eucalyptus border-eucalyptus text-forest",
    ring: "ring-eucalyptus/40",
    badge: "bg-eucalyptus/15 text-eucalyptus border-eucalyptus/30",
    label: "In Progress",
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

// How far the progress line extends: up to the midpoint of the active phase
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
          <p className="section-label text-forest">Project Timeline</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            From Vision to Adoption
          </h2>
          <p className="font-sans text-forest/55 text-base max-w-xl mx-auto leading-relaxed">
            A two-year process built around community participation at every stage.
            Select a phase to learn more.
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
                  <span className="font-sans text-xs text-forest/40">{current.date}</span>
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
          Timeline is subject to change. Sign up under &ldquo;Stay Engaged&rdquo; to receive updates.
        </p>

      </div>
    </section>
  )
}
