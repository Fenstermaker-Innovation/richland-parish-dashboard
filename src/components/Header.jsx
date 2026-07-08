import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "Community Voice", href: "#community-voice" },
  { label: "Learn", href: "#learn" },
  { label: "Stay Engaged", href: "#stay-engaged" },
  { label: "Events", href: "#events" },
  { label: "Live Responses", href: "#live-responses" }
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bark/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo text */}
        <a href="#" className="flex flex-col leading-none">
          <span className={`font-serif font-bold text-lg tracking-wider transition-colors duration-300 ${scrolled ? "text-ivory" : "text-forest"}`}>
            RICHLAND
          </span>
          <span
            className={`font-serif text-xs transition-colors duration-300 ${scrolled ? "text-eucalyptus" : "text-sage"}`}
            style={{ letterSpacing: "0.35em" }}
          >
            PARISH
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wide transition-colors duration-150 ${
                scrolled ? "text-ivory/70 hover:text-ivory" : "text-forest/70 hover:text-forest"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#stay-engaged" className="btn-primary text-xs">
            Get Involved
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all ${scrolled ? "bg-ivory" : "bg-forest"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px transition-all ${scrolled ? "bg-ivory" : "bg-forest"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px transition-all ${scrolled ? "bg-ivory" : "bg-forest"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 ${scrolled ? "bg-bark border-eucalyptus/20" : "bg-ivory border-sand"}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wide ${scrolled ? "text-ivory/70 hover:text-ivory" : "text-forest/70 hover:text-forest"}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#stay-engaged" className="btn-primary text-center text-xs mt-2" onClick={() => setMenuOpen(false)}>
            Get Involved
          </a>
        </div>
      )}
    </header>
  )
}
