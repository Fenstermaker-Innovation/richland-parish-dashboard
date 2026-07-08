export default function Footer() {
  return (
    <footer className="text-ivory/50 py-12 px-6" style={{ backgroundColor: "#1D3521" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-serif font-bold text-ivory text-base tracking-wider">RICHLAND</span>
          <span className="font-serif text-sage text-xs" style={{ letterSpacing: "0.35em" }}>
            PARISH
          </span>
          <p className="font-sans text-xs mt-1 text-eucalyptus italic">Rooted in Richland</p>
          <p className="font-sans text-xs mt-2 text-ivory/30">Community Master Plan &amp; Zoning Code</p>
          <p className="font-sans text-xs mt-6 text-ivory/20">
            &copy; {new Date().getFullYear()} Richland Parish
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col items-center md:items-start gap-3">
          <p className="font-sans text-[10px] tracking-widest uppercase text-ivory/30 mb-1">Sections</p>
          {[
            { label: "About",           href: "#about" },
            { label: "Timeline",        href: "#timeline" },
            { label: "Community Voice", href: "#community-voice" },
            { label: "Events",          href: "#events" },
            { label: "Documents",       href: "#documents" },
            { label: "Interactive Map", href: "#interactive-map" },
            { label: "Live Responses",  href: "#live-responses" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-sans text-xs tracking-wide hover:text-ivory/80 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-sans text-[10px] tracking-widest uppercase text-ivory/30 mb-3">Contact</p>
          <p className="font-sans text-xs text-ivory/40 mb-3 leading-relaxed">
            For all your contact needs please contact:
          </p>
          <p className="font-serif text-ivory text-sm font-semibold leading-snug">
            Anna Wyble Doucet
          </p>
          <p className="font-sans text-xs text-eucalyptus mt-0.5">DOFAT, MBA, P.E.</p>
          <p className="font-sans text-xs text-ivory/50 mt-1">Engineer Manager</p>
          <a
            href="mailto:anna@fenstermaker.com"
            className="font-sans text-xs text-sage hover:text-ivory transition-colors mt-3"
          >
            anna@fenstermaker.com
          </a>
          <div className="font-sans text-xs text-ivory/50 mt-1.5 flex items-center gap-2">
            <span>337.237.2200</span>
            <span className="text-ivory/20">·</span>
            <span>x1272</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
