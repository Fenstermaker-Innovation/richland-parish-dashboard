const PILLARS = {
  preserve: {
    headline: "Preserving What Matters",
    color: "border-sage",
    dotColor: "bg-sage/60",
    labelColor: "text-sage",
    items: [
      "Agricultural land and prime farmland soils",
      "Natural resources — wetlands, river corridors, floodplains",
      "Rural character and small-town identity",
      "Cultural heritage, historic places, and community values",
      "Existing neighborhoods and the people who call them home",
      "Local businesses and the economic fabric of the parish",
    ]
  },
  plan: {
    headline: "Planning What's Next",
    color: "border-eucalyptus",
    dotColor: "bg-eucalyptus/60",
    labelColor: "text-eucalyptus",
    items: [
      "Economic development and job creation strategies",
      "Water, sewer, and utility infrastructure investments",
      "Housing choices for every stage of life and income level",
      "Broadband access and digital connectivity",
      "Transportation, roads, and pedestrian networks",
      "Parks, recreation, and quality-of-life amenities",
      "Resilience — flood risk, climate adaptation, long-term sustainability",
    ]
  }
}

const PRINCIPLES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Rooted in Place",
    body: "Every decision honors the agricultural heritage, natural landscape, and small-town character that define Richland Parish."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Community-Led",
    body: "Residents, businesses, and civic leaders drive the process — planners facilitate, the community decides."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Long-Term Thinking",
    body: "We plan for the next generation — making choices today that protect resources, opportunity, and quality of life for decades to come."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Equitable & Inclusive",
    body: "Every voice matters equally — regardless of zip code, income, or background. Outreach goes where people are."
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-forest py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="section-label text-sage">About the Plan</p>
          <h2 className="font-serif text-ivory text-4xl lg:text-5xl font-semibold mb-4">
            Project Background
          </h2>
          <p className="font-serif text-eucalyptus text-xl italic mb-6">
            Preserving What Matters. Planning What&rsquo;s Next.
          </p>
          <p className="font-sans text-ivory/60 text-base max-w-2xl mx-auto leading-relaxed">
            Richland Parish is updating its Master Plan and Zoning Code for the first time in
            over two decades. This project is your community&rsquo;s opportunity to shape the policies,
            priorities, and land-use rules that will guide the parish through 2045 and beyond.
          </p>
        </div>

        {/* Background text */}
        <div className="border-l-2 border-sage/40 pl-8 mb-16 max-w-3xl mx-auto">
          <p className="font-sans text-xs text-sage tracking-widest uppercase mb-4">Background</p>
          <p className="font-sans text-ivory/75 text-sm leading-relaxed mb-5">
            A Master Plan is a long-range policy document that sets a shared vision for land
            use, transportation, housing, economic development, natural resources, and public
            services. The Zoning Code is the legal tool that carries that vision into daily
            decisions — what gets built, where, and how.
          </p>
          <p className="font-sans text-ivory/75 text-sm leading-relaxed mb-5">
            Richland Parish&rsquo;s current plan dates to the early 2000s. In the years since,
            the parish has seen changes in agriculture, infrastructure, demographics, and
            economic opportunity. This update addresses those shifts head-on, grounded in
            data and driven by the people who call this parish home.
          </p>
          <p className="font-sans text-ivory/75 text-sm leading-relaxed">
            The planning process is led by Fenstermaker, with oversight from parish leadership
            and an advisory committee of residents and stakeholders. All major milestones
            include public comment periods and open meetings.
          </p>
        </div>

        {/* Two-pillar framework */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {Object.values(PILLARS).map((pillar) => (
            <div key={pillar.headline} className={`border-t-2 ${pillar.color} pt-7 px-8 pb-8 bg-ivory/5`}>
              <h3 className={`font-serif text-2xl font-semibold mb-6 ${pillar.labelColor}`}>
                {pillar.headline}
              </h3>
              <ul className="space-y-3">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${pillar.dotColor}`} />
                    <p className="font-sans text-ivory/65 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Guiding Principles */}
        <div>
          <p className="font-sans text-xs text-sage tracking-widest uppercase text-center mb-10">
            Guiding Principles
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-ivory/5 border border-ivory/10 p-6 flex flex-col gap-4">
                <div className="text-sage">{p.icon}</div>
                <h3 className="font-serif text-ivory text-lg font-semibold">{p.title}</h3>
                <p className="font-sans text-ivory/55 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
