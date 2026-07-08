// Replace the placeholder src values below with actual ArcGIS StoryMap or Web Map embed URLs
// when available. Current Land Use embed: your published ArcGIS Web Map viewer URL
// Proposed Land Use embed: updated when draft plan is available
const CURRENT_MAP_URL = ""   // e.g. https://arcg.is/xxxxx
const PROPOSED_MAP_URL = ""  // e.g. https://arcg.is/yyyyy

function MapEmbed({ src, title }) {
  if (!src) {
    return (
      <div className="w-full h-full bg-sand/30 border-2 border-dashed border-eucalyptus/30 flex flex-col items-center justify-center p-10 text-center min-h-[360px]">
        <svg className="w-10 h-10 text-forest/25 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p className="font-serif text-forest/35 text-base mb-2">{title}</p>
        <p className="font-sans text-forest/25 text-xs max-w-xs leading-relaxed">
          Map viewer will appear here once published. Add your ArcGIS Web Map embed URL to{" "}
          <code className="bg-sand px-1 py-0.5">LandUseSection.jsx</code>.
        </p>
      </div>
    )
  }
  return (
    <iframe
      src={src}
      title={title}
      className="w-full h-full min-h-[360px] border-0"
      allowFullScreen
    />
  )
}

export default function LandUseSection() {
  return (
    <section id="land-use" className="bg-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <p className="section-label text-forest">Maps</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            Current &amp; Proposed Land Use
          </h2>
          <p className="font-sans text-forest/55 text-base max-w-xl mx-auto leading-relaxed">
            Explore how land is used today across Richland Parish, and how the updated plan
            proposes to shape growth and conservation in the coming decades.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current */}
          <div className="flex flex-col">
            <div className="bg-forest text-ivory px-5 py-3 flex items-center justify-between">
              <span className="font-serif text-base font-semibold">Current Land Use</span>
              <span className="font-sans text-xs text-ivory/40">2024</span>
            </div>
            <div className="flex-1 border border-sand">
              <MapEmbed src={CURRENT_MAP_URL} title="Current Land Use Map" />
            </div>
          </div>

          {/* Proposed */}
          <div className="flex flex-col">
            <div className="bg-forest text-ivory px-5 py-3 flex items-center justify-between">
              <span className="font-serif text-base font-semibold">Proposed Land Use</span>
              <span className="font-sans text-xs text-ivory/40">Draft 2026</span>
            </div>
            <div className="flex-1 border border-sand">
              <MapEmbed src={PROPOSED_MAP_URL} title="Proposed Land Use Map" />
            </div>
          </div>
        </div>

        <p className="font-sans text-forest/35 text-xs text-center mt-8">
          Maps are for planning purposes only and do not constitute official zoning determinations.
          Contact the Richland Parish Police Jury for official land use information.
        </p>

      </div>
    </section>
  )
}
