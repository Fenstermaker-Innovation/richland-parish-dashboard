export default function CommunityFeedbackSection() {
  const surveyUrl =
    "https://survey123.arcgis.com/share/36d34e24044a4208a64b37cbfb1c2900"

  return (
    <section
      id="community-feedback"
      className="bg-ivory py-20 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-brown mb-4">
            Help Shape the Future of Richland Parish
          </p>

          <h2 className="font-serif text-4xl lg:text-5xl text-forest font-semibold mb-6">
            Community Feedback
          </h2>

          <p className="font-sans text-base text-charcoal leading-relaxed max-w-3xl mx-auto">
            Your feedback will help identify community priorities for
            development, growth, infrastructure, and community services
            for the next 20 years.
          </p>
        </div>

        <div className="border border-forest/30 rounded-lg overflow-hidden bg-white shadow-sm">
          <iframe
            src={`${surveyUrl}?hide=navbar`}
            title="Richland Parish Community Feedback Survey"
            className="w-full h-[850px] lg:h-[1000px]"
            loading="lazy"
            allow="geolocation"
          />
        </div>

        <p className="font-sans text-sm text-charcoal text-center mt-6">
          Having trouble viewing the survey?{" "}
          <a
            href={surveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest font-semibold underline underline-offset-4 hover:text-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Open the survey in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  )
}
