import { useEffect, useState, useCallback } from "react"
import { EVENTS_CSV_URL } from "../config/events.js"

const TYPE_COLORS = {
  "Public Meeting": "bg-sage/20 text-ivory border-sage/40",
  "Workshop":       "bg-eucalyptus/20 text-ivory border-eucalyptus/40",
  "Open House":     "bg-sand/20 text-ivory border-sand/40",
  "Forum":          "bg-forest/40 text-ivory border-ivory/20",
  "Roundtable":     "bg-ivory/20 text-ivory border-ivory/30",
  "Meeting":        "bg-sage/20 text-ivory border-sage/40",
  "Data Review":    "bg-eucalyptus/20 text-ivory border-eucalyptus/40",
  "Field Work":     "bg-forest/40 text-ivory border-ivory/20",
  "Review":         "bg-sand/20 text-ivory border-sand/30",
  "Presentation":   "bg-ivory/20 text-ivory border-ivory/30",
}

function parseCSV(text) {
  const lines = text.trim().split("\n")
  const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""))
  return lines.slice(1).map(line => {
    const values = []
    let cur = ""
    let inQuotes = false
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes }
      else if (ch === "," && !inQuotes) { values.push(cur.trim()); cur = "" }
      else { cur += ch }
    }
    values.push(cur.trim())
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]))
  })
}

function toISODate(dateStr) {
  if (!dateStr) return ""
  if (dateStr.includes("/")) {
    const [m, d, y] = dateStr.split("/")
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
  }
  return dateStr
}

function formatDate(dateStr) {
  const iso = toISODate(dateStr)
  const d = new Date(iso + "T00:00:00")
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day:   d.getDate(),
    full:  d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  }
}

function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous event" : "Next event"}
      className="w-11 h-11 flex items-center justify-center border border-eucalyptus/40 bg-ivory/10 hover:bg-ivory/20 text-ivory transition-colors duration-150 backdrop-blur-sm flex-shrink-0"
    >
      {direction === "prev" ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}

function EventSlide({ event, active }) {
  const { month, day, full } = formatDate(event.date)
  const badge = TYPE_COLORS[event.type] ?? "bg-ivory/20 text-ivory border-ivory/30"
  const hasImage = event.image && event.image.startsWith("http")

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
    >
      {/* Image / gradient hero */}
      <div className="relative h-72 lg:h-[420px] overflow-hidden">
        {hasImage ? (
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-forest via-sage/60 to-eucalyptus/40" />
        )}

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />

        {/* Date + badge overlay */}
        <div className="absolute bottom-5 left-6 flex items-end gap-4">
          <div className="flex flex-col items-center leading-none">
            <span className="font-sans text-xs font-bold text-eucalyptus tracking-widest">{month}</span>
            <span className="font-serif text-5xl font-semibold text-ivory">{day}</span>
          </div>
          <span className={`font-sans text-xs px-3 py-1 border mb-1 ${badge}`}>{event.type}</span>
        </div>

        {/* Event counter top-right */}
        <div className="absolute top-4 right-5 font-sans text-xs text-ivory/40 tracking-widest">
          {/* filled in by parent */}
        </div>
      </div>

      {/* Content */}
      <div className="bg-ivory p-6 lg:p-8">
        <h3 className="font-serif text-forest text-2xl lg:text-3xl font-semibold mb-3 leading-snug">
          {event.title}
        </h3>
        <p className="font-sans text-forest/60 text-sm leading-relaxed mb-5">{event.description}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span className="font-sans text-xs text-forest/50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            {full} · {event.time}
          </span>
          <span className="font-sans text-xs text-forest/50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function EventsSection() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [contentHeight, setContentHeight] = useState("auto")

  useEffect(() => {
    const url = EVENTS_CSV_URL || "./events.csv"
    fetch(url)
      .then(r => r.text())
      .then(text => {
        const all = parseCSV(text)
        const today = new Date().toISOString().split("T")[0]
        const upcoming = all
          .filter(e => toISODate(e.date) >= today)
          .sort((a, b) => toISODate(a.date).localeCompare(toISODate(b.date)))
        setEvents(upcoming)
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  const prev = useCallback(() => setCurrent(c => (c - 1 + events.length) % events.length), [events.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % events.length), [events.length])

  // Approximate slide height: image (420px lg / 288px sm) + content (~200px)
  const SLIDE_HEIGHT_SM = 288 + 220
  const SLIDE_HEIGHT_LG = 420 + 220

  return (
    <section id="events" className="bg-forest py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-label text-eucalyptus">Get Involved</p>
          <h2 className="font-serif text-ivory text-4xl lg:text-5xl font-semibold mb-4">
            Upcoming Events
          </h2>
          <p className="font-sans text-ivory/60 text-base max-w-xl mx-auto leading-relaxed">
            Join us in person to learn about the plan, share your ideas, and connect
            with your neighbors. All meetings are open to the public.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <p className="font-sans text-ivory/30 text-sm">Loading events…</p>
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-20 border border-dashed border-eucalyptus/30">
            <p className="font-serif text-ivory/30 text-xl mb-2">No upcoming events</p>
            <p className="font-sans text-ivory/20 text-sm">Check back soon.</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            {/* Carousel */}
            <div className="relative">
              {/* Slide container */}
              <div
                className="relative overflow-hidden"
                style={{ height: `${SLIDE_HEIGHT_SM}px` }}
              >
                <style>{`@media (min-width: 1024px) { .slide-wrap { height: ${SLIDE_HEIGHT_LG}px !important; } }`}</style>
                <div className="slide-wrap absolute inset-0" style={{ height: `${SLIDE_HEIGHT_SM}px` }}>
                  {events.map((event, i) => (
                    <EventSlide key={i} event={event} active={i === current} />
                  ))}
                </div>
              </div>

              {/* Arrows + counter row */}
              {events.length > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <ArrowButton direction="prev" onClick={prev} />
                    <ArrowButton direction="next" onClick={next} />
                  </div>

                  {/* Dot indicators */}
                  <div className="flex items-center gap-2">
                    {events.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to event ${i + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                          i === current
                            ? "w-4 h-1.5 bg-sage"
                            : "w-1.5 h-1.5 bg-eucalyptus/30 hover:bg-eucalyptus/60"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <span className="font-sans text-xs text-ivory/30 tracking-widest">
                    {String(current + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>

            <p className="font-sans text-ivory/25 text-xs text-center mt-10">
              Sign up above to receive event reminders directly in your inbox.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
