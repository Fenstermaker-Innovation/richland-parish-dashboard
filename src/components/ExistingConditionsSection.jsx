const STATS = [
  { value: "~20,100", label: "Total Population", sub: "2020 Census", icon: "👥" },
  { value: "559 mi²", label: "Parish Area", sub: "Land + water", icon: "🗺" },
  { value: "8,400", label: "Housing Units", sub: "~78% owner-occupied", icon: "🏘" },
  { value: "$115K", label: "Median Home Value", sub: "Below state average", icon: "🏡" },
  { value: "85%", label: "Agricultural Land", sub: "Cropland & pasture", icon: "🌾" },
  { value: "8.2%", label: "Unemployment Rate", sub: "Higher than LA average", icon: "📊" },
]

const TOPICS = [
  {
    title: "Land Use",
    items: [
      "Large areas of prime agricultural soil — primarily cotton, soybeans, and corn",
      "Low-density residential concentrated in Delhi, Rayville, and Mangham",
      "Limited commercial corridors along US-80 and LA-137",
      "Minimal industrial footprint; some oil and gas extraction",
      "Significant floodplain along the Boeuf River and Bayou Macon corridors",
    ]
  },
  {
    title: "Housing",
    items: [
      "High homeownership rate but aging housing stock (median build year ~1973)",
      "Limited multifamily and workforce housing options",
      "Manufactured housing is common in rural areas",
      "Some concentration of substandard units in older neighborhoods",
      "Need for accessible and senior-friendly housing options is growing",
    ]
  },
  {
    title: "Demographics",
    items: [
      "Population has declined modestly over the past two decades",
      "Median age is rising — parish is aging faster than the state average",
      "About 42% of residents identify as Black or African American",
      "Median household income is approximately $38,000",
      "Educational attainment rates are below Louisiana averages",
    ]
  },
]

export default function ExistingConditionsSection() {
  return (
    <section id="existing-conditions" className="bg-forest py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-sage">Where We Stand</p>
          <h2 className="font-serif text-ivory text-4xl lg:text-5xl font-semibold mb-5">
            Existing Conditions
          </h2>
          <p className="font-sans text-ivory/60 text-base max-w-xl mx-auto leading-relaxed">
            Understanding where we are today is the foundation for planning where we want to go.
            These figures reflect the most recent available data for Richland Parish.
          </p>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ivory/5 border border-ivory/10 p-6 flex flex-col gap-2">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-serif text-ivory text-3xl font-semibold mt-1">{s.value}</p>
              <p className="font-sans text-ivory/80 text-sm font-medium">{s.label}</p>
              <p className="font-sans text-ivory/35 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Topic breakdown */}
        <div className="grid md:grid-cols-3 gap-6">
          {TOPICS.map((topic) => (
            <div key={topic.title} className="border-t-2 border-sage pt-6">
              <h3 className="font-serif text-ivory text-xl font-semibold mb-5">{topic.title}</h3>
              <ul className="space-y-3">
                {topic.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-sage/60 flex-shrink-0" />
                    <p className="font-sans text-ivory/60 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-sans text-ivory/20 text-xs text-center mt-12">
          Sources: U.S. Census Bureau (2020), American Community Survey (2019–2023), LSU AgCenter.
          Full Existing Conditions Report available in the Documents section.
        </p>

      </div>
    </section>
  )
}
