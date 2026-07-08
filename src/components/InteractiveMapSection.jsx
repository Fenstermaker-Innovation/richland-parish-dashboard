// Set this to your ArcGIS Crowdsource Reporter or Survey123 web app URL
// to enable the participatory mapping feature.
const PARTICIPATORY_MAP_URL = ""

export default function InteractiveMapSection() {
  return (
    <section id="interactive-map" className="bg-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <p className="section-label text-forest">Your Map</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            Interactive Community Map
          </h2>
          <p className="font-sans text-forest/55 text-base max-w-xl mx-auto leading-relaxed">
            Drop a pin anywhere in the parish to tell us about a place that matters to you —
            a neighborhood concern, a loved green space, a road that needs attention, or anywhere
            you'd like to see change.
          </p>
        </div>

        {/* Instructions row */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              step: "1",
              title: "Find Your Spot",
              body: "Zoom and pan the map to locate the place you want to highlight.",
            },
            {
              step: "2",
              title: "Drop a Pin",
              body: "Click or tap to mark the location, then choose a category that best fits.",
            },
            {
              step: "3",
              title: "Leave a Note",
              body: "Add a short description of what you love, what needs attention, or what you envision.",
            },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 items-start p-5 border border-sand bg-white">
              <span className="font-serif text-4xl font-semibold text-sage/50 leading-none flex-shrink-0">
                {s.step}
              </span>
              <div>
                <h3 className="font-serif text-forest text-base font-semibold mb-1">{s.title}</h3>
                <p className="font-sans text-forest/55 text-xs leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map embed or placeholder */}
        <div className="w-full" style={{ height: 520 }}>
          {PARTICIPATORY_MAP_URL ? (
            <iframe
              src={PARTICIPATORY_MAP_URL}
              title="Community Participatory Map"
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full bg-sand/30 border-2 border-dashed border-eucalyptus/30 flex flex-col items-center justify-center p-10 text-center">
              <svg className="w-12 h-12 text-forest/20 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-serif text-forest/35 text-xl mb-3">Participatory Map Coming Soon</p>
              <p className="font-sans text-forest/25 text-sm max-w-md mx-auto leading-relaxed">
                The interactive community map will be embedded here once the ArcGIS Crowdsource
                Reporter or Survey123 web app is configured. Add your URL to{" "}
                <code className="bg-sand px-1 py-0.5 text-xs">InteractiveMapSection.jsx</code>.
              </p>
            </div>
          )}
        </div>

        <p className="font-sans text-forest/30 text-xs text-center mt-6">
          All submissions are reviewed before being made publicly visible. Personal information
          is not displayed on the map.
        </p>

      </div>
    </section>
  )
}
