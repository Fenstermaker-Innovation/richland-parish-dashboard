import ParishMap from "./ParishMap.jsx"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left panel — text */}
      <div className="relative z-10 flex flex-col justify-center px-10 py-32 lg:py-0 lg:w-5/12 lg:px-16 xl:px-24 bg-ivory">
        <p className="section-label mb-6">Rooted in Richland</p>

        <h1 className="font-serif text-forest leading-tight mb-3" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
          Preserving What Matters.
          <span className="block text-sage">Planning What's Next.</span>
        </h1>

        <p className="font-sans text-forest/50 text-xs tracking-widest uppercase mb-6">
          Planning Today for a Stronger Tomorrow
        </p>

        <p className="font-sans text-forest/60 text-base leading-relaxed mb-10 max-w-md">
          This land has always defined us. Now we're writing the plan that defines its future —
          honoring the agriculture, heritage, and character that make Richland Parish home,
          while intentionally shaping what comes next.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#community-voice" className="btn-primary text-center">
            Share Your Voice
          </a>
          <a href="#learn" className="btn-outline text-center">
            Learn More
          </a>
        </div>

        {/* Divider line */}
        <div className="mt-16 pt-8 border-t border-sand flex gap-10">
          <div>
            <p className="font-serif text-2xl text-forest font-semibold">2026</p>
            <p className="font-sans text-xs text-forest/50 tracking-wide uppercase mt-1">Planning Year</p>
          </div>
          <div>
            <p className="font-serif text-2xl text-forest font-semibold">~20K</p>
            <p className="font-sans text-xs text-forest/50 tracking-wide uppercase mt-1">Residents</p>
          </div>
          <div>
            <p className="font-serif text-2xl text-forest font-semibold">1 Parish</p>
            <p className="font-sans text-xs text-forest/50 tracking-wide uppercase mt-1">One Vision</p>
          </div>
        </div>
      </div>

      {/* Right panel — map */}
      <div className="relative lg:w-7/12 h-72 lg:h-auto">
        <ParishMap className="absolute inset-0 w-full h-full" />
        {/* Gradient fade on left edge to blend with text panel */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ivory to-transparent pointer-events-none hidden lg:block" />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-forest/30 z-10">
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-forest/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
