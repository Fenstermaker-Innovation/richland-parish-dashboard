const LEARN_CARDS = [
  {
    label: "Master Plan",
    title: "A Roadmap for Our Parish",
    body:
      "A Comprehensive Master Plan is a roadmap for our Parish growth and development. It's a strategic document that outlines our collective, community influenced vision for the future, guiding decisions on everything from land use to roads and other infrastructure, industry, parks, housing and more. A Comprehensive Master Plan allows communities like Richland Parish to be intentional about how they evolve over time, what they prioritize, and what they preserve.",
    icon: "🗺"
  },
  {
    label: "Development Code",
    title: "The Rules That Guide Growth",
    body:
      "Development rules (like zoning) is a set of local regulations that guide how land and buildings are used and developed within a community. It establishes standards for development and helps promote orderly growth, reduce land use conflicts, protect property values, and support the community's long-term vision. Zoning does not dictate what property owners must build.",
    icon: "📐"
  },
  {
    label: "Why It Matters",
    title: "Planning Today for a Stronger Tomorrow",
    body:
      "A comprehensive plan that guides smart growth, preserves our community, and enhances the quality of life for all. Community input will be a key component throughout the life of the planning process — your voice, input, and vision help develop the Master Plan.",
    icon: "🌱"
  }
]

export default function LearnSection() {
  return (
    <section id="learn" className="bg-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label">Learn</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            Understanding the Plan
          </h2>
          <p className="font-sans text-forest/60 text-base max-w-xl mx-auto leading-relaxed">
            Not sure what a Master Plan or Zoning Code is? You're in the right place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {LEARN_CARDS.map((card) => (
            <div
              key={card.label}
              className="bg-sand p-8 flex flex-col border-t-2 border-sage"
            >
              <span className="text-3xl mb-5">{card.icon}</span>
              <p className="section-label text-sage mb-2">{card.label}</p>
              <h3 className="font-serif text-forest text-xl font-semibold mb-4 leading-snug">
                {card.title}
              </h3>
              <p className="font-sans text-forest/60 text-sm leading-relaxed flex-1">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* StoryMap embed placeholder */}
        <div className="border border-eucalyptus/30 p-1 bg-sand">
          <div className="bg-ivory border-2 border-dashed border-eucalyptus/40 p-16 text-center">
            <p className="font-serif text-forest/40 text-xl mb-2">Interactive StoryMap</p>
            <p className="font-sans text-forest/30 text-sm max-w-md mx-auto">
              An ArcGIS StoryMap walking through the Master Plan process and Zoning Code
              concepts will be embedded here. Replace this block with an{" "}
              <code className="bg-sand px-1 py-0.5 text-xs">&lt;iframe&gt;</code> using
              your StoryMap share URL.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
