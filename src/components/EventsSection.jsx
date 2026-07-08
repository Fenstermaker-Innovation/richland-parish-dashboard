import { useEffect, useState } from "react"
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

const BASE = import.meta.env.BASE_URL
const TYPE_IMAGES = {
  "Public Meeting": `${BASE}images/Kickoff.png`,
  "Meeting":        `${BASE}images/Kickoff.png`,
  "Workshop":       `${BASE}images/StoryMap.png`,
  "Data Review":    `${BASE}images/GIS.png`,
  "Review":         `${BASE}images/GIS.png`,
  "Open House":     `${BASE}images/FinalDeliverables.png`,
  "Presentation":   `${BASE}images/FinalDeliverables.png`,
  "Forum":          `${BASE}images/Field.png`,
  "Roundtable":     `${BASE}images/Field.png`,
  "Field Work":     `${BASE}images/Field.png`,
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

function MiniCalendar({ year, month, eventDays }) {
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const label = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const now = new Date()
  const isThisMonth = now.getFullYear() === year && now.getMonth() === month
  const todayDay = now.getDate()

  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="border border-eucalyptus/20 p-6 lg:p-8">
      <p className="font-sans text-sm font-semibold text-ivory/70 tracking-widest uppercase text-center mb-5">
        {label}
      </p>
      <div className="grid grid-cols-7 gap-y-1.5 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <span key={d} className="font-sans text-xs text-eucalyptus/60 pb-2">{d}</span>
        ))}
        {cells.map((day, i) => {
          const hasEvent = day && eventDays.includes(day)
          const isToday = isThisMonth && day === todayDay
          return (
            <div key={i} className="flex items-center justify-center py-0.5">
              {day ? (
                <span className={`font-sans text-xs w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  hasEvent
                    ? "bg-sage text-forest font-semibold"
                    : isToday
                    ? "border border-eucalyptus/50 text-ivory"
                    : "text-ivory/35"
                }`}>
                  {day}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous event" : "Next event"}
      className={`w-11 h-11 flex items-center justify-center border border-eucalyptus/40 backdrop-blur-sm transition-colors duration-150 flex-shrink-0 ${
        disabled ? "bg-ivory/5 text-ivory/20 cursor-not-allowed" : "bg-ivory/10 hover:bg-ivory/20 text-ivory"
      }`}
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

function EventCard({ event }) {
  const { month, day, full } = formatDate(event.date)
  const badge = TYPE_COLORS[event.type] ?? "bg-ivory/20 text-ivory border-ivory/30"
  const imgSrc = (event.image && event.image.startsWith("http"))
    ? event.image
    : (TYPE_IMAGES[event.type] ?? `${BASE}images/Kickoff.png`)

  return (
    <div className="bg-ivory flex flex-col overflow-hidden flex-1 min-w-0">
      <div className="relative h-64 flex-shrink-0">
        <img src={imgSrc} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
        <div className="absolute bottom-4 left-5 flex items-end gap-3">
          <div className="flex flex-col items-center leading-none">
            <span className="font-sans text-[10px] font-bold text-eucalyptus tracking-widest">{month}</span>
            <span className="font-serif text-5xl font-semibold text-ivory leading-none">{day}</span>
          </div>
          <span className={`font-sans text-[10px] px-2 py-0.5 border mb-1 ${badge}`}>{event.type}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-forest text-xl font-semibold mb-2 leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="font-sans text-forest/55 text-xs leading-relaxed mb-5 line-clamp-4 flex-1">
          {event.description}
        </p>
        <div className="flex flex-col gap-1.5 pt-3 border-t border-sand/60">
          <span className="font-sans text-xs text-forest/50 flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            {full} · {event.time}
          </span>
          <span className="font-sans text-xs text-forest/50 flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const VISIBLE = 3

export default function EventsSection() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [startIdx, setStartIdx] = useState(0)

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

  const maxIdx = Math.max(0, events.length - VISIBLE)
  const visibleEvents = events.slice(startIdx, startIdx + VISIBLE)
  const canPrev = startIdx > 0
  const canNext = startIdx < maxIdx

  // Calendar data for this month and next
  const now = new Date()
  const cal = [0, 1].map(offset => {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1)
    const yr = d.getFullYear()
    const mo = d.getMonth()
    const days = events
      .map(e => new Date(toISODate(e.date) + "T00:00:00"))
      .filter(d2 => d2.getFullYear() === yr && d2.getMonth() === mo)
      .map(d2 => d2.getDate())
    return { year: yr, month: mo, days }
  })

  return (
    <section id="events" className="bg-forest py-24 px-6">
      <div className="max-w-6xl mx-auto">

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
            {/* Calendars — above the carousel */}
            <div className="mb-14">
              <p className="font-sans text-xs text-ivory/30 tracking-widest uppercase text-center mb-6">
                At a Glance
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cal.map(({ year, month, days }) => (
                  <MiniCalendar key={`${year}-${month}`} year={year} month={month} eventDays={days} />
                ))}
              </div>
            </div>

            {/* Event cards — slides 1 at a time */}
            <div className="flex flex-col sm:flex-row gap-4">
              {visibleEvents.map((event, i) => (
                <EventCard key={startIdx + i} event={event} />
              ))}
              {visibleEvents.length < VISIBLE &&
                Array.from({ length: VISIBLE - visibleEvents.length }).map((_, i) => (
                  <div key={`spacer-${i}`} className="flex-1 min-w-0 hidden sm:block" />
                ))}
            </div>

            {/* Navigation — only shown when there are more events than VISIBLE */}
            {events.length > VISIBLE && (
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  <ArrowButton direction="prev" onClick={() => setStartIdx(i => i - 1)} disabled={!canPrev} />
                  <ArrowButton direction="next" onClick={() => setStartIdx(i => i + 1)} disabled={!canNext} />
                </div>

                <div className="flex items-center gap-2">
                  {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStartIdx(i)}
                      aria-label={`Go to position ${i + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        i === startIdx ? "w-4 h-1.5 bg-sage" : "w-1.5 h-1.5 bg-eucalyptus/30 hover:bg-eucalyptus/60"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-sans text-xs text-ivory/30 tracking-widest">
                  {String(startIdx + 1).padStart(2, "0")} / {String(maxIdx + 1).padStart(2, "0")}
                </span>
              </div>
            )}

            <p className="font-sans text-ivory/25 text-xs text-center mt-10">
              Sign up above to receive event reminders directly in your inbox.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
