export default function Footer() {
  return (
    <footer className="text-ivory/50 py-12 px-6" style={{ backgroundColor: "#1A2219" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-serif font-bold text-ivory text-base tracking-wider">RICHLAND</span>
          <span className="font-serif text-sage text-xs" style={{ letterSpacing: "0.35em" }}>
            PARISH
          </span>
          <p className="font-sans text-xs mt-1 text-eucalyptus italic">Rooted in Richland</p>
          <p className="font-sans text-xs mt-2 text-ivory/30">Community Master Plan &amp; Zoning Code</p>
        </div>

        <nav className="flex gap-8">
          {["Community Voice", "Learn", "Stay Engaged", "Live Responses"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/ /g, "-")}`}
              className="font-sans text-xs tracking-wide hover:text-ivory/80 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="font-sans text-xs text-ivory/20">
          &copy; {new Date().getFullYear()} Richland Parish
        </p>
      </div>
    </footer>
  )
}
