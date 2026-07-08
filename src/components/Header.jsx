import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "Community Voice", href: "#community-voice" },
  { label: "Learn", href: "#learn" },
  { label: "Stay Engaged", href: "#stay-engaged" },
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
        scrolled ? "bg-ivory/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo text */}
        <a href="#" className="flex flex-col leading-none">
          <span className="font-serif font-bold text-forest text-lg tracking-wider">RICHLAND</span>
          <span
            className="font-serif text-sage text-xs tracking-widest"
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
              className="font-sans text-sm text-forest/70 hover:text-forest tracking-wide transition-colors duration-150"
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
          <span className={`block w-6 h-px bg-forest transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-forest transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-forest transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ivory border-t border-sand px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-forest/70 hover:text-forest tracking-wide"
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
