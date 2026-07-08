import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Community Voice", href: "#community-voice" },
  { label: "Events", href: "#events" },
  { label: "Documents", href: "#documents" },
  { label: "Get Involved", href: "#stay-engaged" },
]

function TranslateWidget() {
  useEffect(() => {
    const existingScript = document.getElementById("google-translate-script")
    if (existingScript) return
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      )
    }
    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      id="google_translate_element"
      className="translate-widget"
    />
  )
}

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
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={{ backgroundColor: "#1D3521" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none flex-shrink-0">
          <span className="font-serif font-bold text-ivory text-lg tracking-wider">RICHLAND PARISH</span>
          <span className="font-sans text-eucalyptus text-[10px] tracking-wide mt-0.5">
            Master Plan &amp; Zoning Code Update
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-ivory/60 hover:text-ivory tracking-wide transition-colors duration-150 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: translate + CTA */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          <TranslateWidget />
          <a href="#community-voice" className="btn-primary text-xs whitespace-nowrap">
            Share Your Voice
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-ivory transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-ivory transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-ivory transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-eucalyptus/20 px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: "#1D3521" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-ivory/60 hover:text-ivory tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#community-voice" className="btn-primary text-center text-xs mt-2" onClick={() => setMenuOpen(false)}>
            Share Your Voice
          </a>
          <div className="pt-2 border-t border-eucalyptus/20">
            <TranslateWidget />
          </div>
        </div>
      )}
    </header>
  )
}
