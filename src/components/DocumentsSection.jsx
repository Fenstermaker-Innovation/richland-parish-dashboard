const BASE = import.meta.env.BASE_URL

// Update href values with actual PDF paths under public/docs/ once files are uploaded
const PRESENTATIONS = [
  {
    title: "Project Kickoff Presentation",
    description: "Overview of the planning process, schedule, and how to get involved.",
    date: "May 2025",
    type: "Presentation",
    href: `${BASE}docs/kickoff-presentation.pdf`,
    available: false,
  },
  {
    title: "Community Survey Results",
    description: "Summary of the initial community values and priorities survey findings.",
    date: "August 2025",
    type: "Report",
    href: `${BASE}docs/survey-results.pdf`,
    available: false,
  },
  {
    title: "Existing Conditions Report",
    description: "Full data analysis of current land use, housing, demographics, and infrastructure.",
    date: "September 2025",
    type: "Report",
    href: `${BASE}docs/existing-conditions.pdf`,
    available: false,
  },
  {
    title: "Public Meeting #1 – Board Summary",
    description: "Meeting notes, attendance summary, and next steps from the first public meeting.",
    date: "October 2025",
    type: "Meeting Boards",
    href: `${BASE}docs/meeting-1-boards.pdf`,
    available: false,
  },
]

const FINAL_DOCS = [
  {
    title: "Draft Master Plan",
    description: "The full draft Master Plan document, available for public review and comment.",
    date: "Summer 2026",
    type: "Draft",
    href: `${BASE}docs/draft-master-plan.pdf`,
    available: false,
  },
  {
    title: "Draft Zoning Code",
    description: "Updated zoning regulations implementing the Master Plan vision.",
    date: "Fall 2026",
    type: "Draft",
    href: `${BASE}docs/draft-zoning-code.pdf`,
    available: false,
  },
  {
    title: "Adopted Master Plan",
    description: "The officially adopted Richland Parish Master Plan.",
    date: "Early 2027",
    type: "Final",
    href: `${BASE}docs/adopted-master-plan.pdf`,
    available: false,
  },
  {
    title: "Adopted Zoning Code",
    description: "The officially adopted Richland Parish Zoning Ordinance.",
    date: "Early 2027",
    type: "Final",
    href: `${BASE}docs/adopted-zoning-code.pdf`,
    available: false,
  },
]

const TYPE_BADGE = {
  "Presentation": "bg-sage/15 text-sage border-sage/30",
  "Report":       "bg-eucalyptus/15 text-eucalyptus border-eucalyptus/30",
  "Meeting Boards": "bg-ivory/10 text-ivory/60 border-ivory/20",
  "Draft":        "bg-eucalyptus/15 text-eucalyptus border-eucalyptus/30",
  "Final":        "bg-sage/15 text-sage border-sage/30",
}

function DocCard({ doc }) {
  const badge = TYPE_BADGE[doc.type] ?? "bg-ivory/10 text-ivory/50 border-ivory/20"
  return (
    <div className="bg-ivory/5 border border-ivory/10 p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <span className={`font-sans text-[10px] px-2.5 py-1 border tracking-wide flex-shrink-0 ${badge}`}>
          {doc.type}
        </span>
        <span className="font-sans text-xs text-ivory/30">{doc.date}</span>
      </div>
      <h3 className="font-serif text-ivory text-base font-semibold leading-snug">{doc.title}</h3>
      <p className="font-sans text-ivory/50 text-xs leading-relaxed flex-1">{doc.description}</p>
      {doc.available ? (
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs text-sage hover:text-eucalyptus transition-colors flex items-center gap-1.5 mt-1"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </a>
      ) : (
        <p className="font-sans text-xs text-ivory/20 mt-1 italic">Coming soon</p>
      )}
    </div>
  )
}

export default function DocumentsSection() {
  return (
    <section id="documents" className="bg-forest py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-sage">Resources</p>
          <h2 className="font-serif text-ivory text-4xl lg:text-5xl font-semibold mb-5">
            Documents &amp; Presentations
          </h2>
          <p className="font-sans text-ivory/60 text-base max-w-xl mx-auto leading-relaxed">
            Download meeting materials, reports, and plan documents as they become available
            throughout the planning process.
          </p>
        </div>

        {/* Project documents */}
        <div className="mb-14">
          <p className="font-sans text-xs text-sage tracking-widest uppercase mb-6">
            Meeting Materials &amp; Reports
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESENTATIONS.map((doc) => (
              <DocCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>

        {/* Final documents */}
        <div>
          <p className="font-sans text-xs text-sage tracking-widest uppercase mb-6">
            Final Documents
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FINAL_DOCS.map((doc) => (
              <DocCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>

        <p className="font-sans text-ivory/20 text-xs text-center mt-12">
          To request a document in an alternative format or language, contact Anna Wyble Doucet at anna@fenstermaker.com.
        </p>

      </div>
    </section>
  )
}
