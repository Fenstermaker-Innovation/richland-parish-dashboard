const LEARN_CARDS = [
  {
    label: "Master Plan",
    title: "A Roadmap for Richland Parish",
    body:
      "A Master Plan is a long-range policy document that guides how a community grows and changes over time. It addresses land use, transportation, housing, economic development, parks, and more — shaped by the values of the people who live here.",
    icon: "🗺"
  },
  {
    label: "Zoning Code",
    title: "The Rules That Shape Your Neighborhood",
    body:
      "A Zoning Code translates the vision of the Master Plan into enforceable regulations — determining what can be built where, how tall, how close to the street, and how land is used. A modern code supports the kind of community residents actually want.",
    icon: "📐"
  },
  {
    label: "Why Now",
    title: "The Right Moment for Richland Parish",
    body:
      "Richland Parish is at a pivotal moment. Updating the Master Plan and Zoning Code now means the community — not just market forces — steers what comes next. Your participation is what makes that possible.",
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
