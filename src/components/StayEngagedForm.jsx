import { useState } from "react"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import Graphic from "@arcgis/core/Graphic.js"
import { STAY_ENGAGED_LAYER_URL } from "../config/surveys.js"

const CONTACT_PREFS = [
  { value: "email",  label: "Email" },
  { value: "text",   label: "Text message" },
  { value: "either", label: "Either is fine" },
]

const INTERESTS = [
  { value: "economic",    label: "Jobs & economy" },
  { value: "housing",     label: "Housing" },
  { value: "roads",       label: "Roads & transportation" },
  { value: "parks",       label: "Parks & recreation" },
  { value: "zoning",      label: "Land use & zoning" },
  { value: "agriculture", label: "Agriculture" },
  { value: "downtown",    label: "Downtown development" },
  { value: "youth",       label: "Youth & families" },
  { value: "environment", label: "Environment" },
  { value: "historic",    label: "Historic preservation" },
]

const MEETING_OPTS = [
  { value: "yes",     label: "Yes, in person" },
  { value: "virtual", label: "Yes, virtually" },
  { value: "either",  label: "Either works" },
  { value: "no",      label: "No, keep me updated online" },
]

const HOW_HEARD = [
  { value: "social_media",  label: "Social media" },
  { value: "friend_family", label: "Friend or family" },
  { value: "newspaper",     label: "Newspaper / news outlet" },
  { value: "flyer",         label: "Flyer or poster" },
  { value: "email_list",    label: "Email or newsletter" },
  { value: "parish_office", label: "Parish or city office" },
  { value: "event",         label: "Community event" },
  { value: "other",         label: "Other" },
]

function RadioPills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 text-sm font-sans border transition-colors duration-150 ${
            value === opt.value
              ? "bg-forest border-forest text-ivory"
              : "border-eucalyptus/60 text-forest hover:border-forest"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function CheckPills({ options, selected, onChange }) {
  const toggle = (val) => {
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const on = selected.includes(opt.value)
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={`px-4 py-2 text-sm font-sans border transition-colors duration-150 ${
              on
                ? "bg-sage border-sage text-ivory"
                : "border-eucalyptus/60 text-forest hover:border-sage"
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function InputField({ label, hint, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans text-sm font-medium text-forest tracking-wide">
        {label}{required && <span className="text-sage ml-1">*</span>}
      </label>
      {hint && <p className="font-sans text-forest/40 text-xs">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = "w-full border border-sand bg-white focus:border-sage focus:outline-none px-4 py-3 font-sans text-sm text-forest transition-colors placeholder:text-forest/25"

export default function StayEngagedForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    contact_preference: "",
    areas_of_interest: [],
    meeting_interest: "",
    meeting_availability: "",
    how_heard: "",
    additional_comments: "",
  })

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const isValid = form.first_name.trim() && form.last_name.trim() && form.email.trim()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    setError(null)
    try {
      const layer = new FeatureLayer({ url: STAY_ENGAGED_LAYER_URL })
      const graphic = new Graphic({
        attributes: {
          first_name:           form.first_name || null,
          last_name:            form.last_name || null,
          email:                form.email || null,
          phone:                form.phone || null,
          contact_preference:   form.contact_preference || null,
          areas_of_interest:    form.areas_of_interest.join(" ") || null,
          meeting_interest:     form.meeting_interest || null,
          meeting_availability: form.meeting_availability || null,
          how_heard:            form.how_heard || null,
          additional_comments:  form.additional_comments || null,
        },
      })
      const result = await layer.applyEdits({ addFeatures: [graphic] })
      if (result.addFeatureResults[0]?.error) {
        throw new Error(result.addFeatureResults[0].error.description)
      }
      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-14 h-14 rounded-full bg-ivory/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-eucalyptus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-ivory text-2xl font-semibold mb-3">You're signed up!</h3>
        <p className="font-sans text-ivory/60 text-sm leading-relaxed">
          We'll be in touch with updates, meeting invitations, and ways to participate as the plan develops.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-10">

      {/* Contact info */}
      <div className="grid sm:grid-cols-2 gap-6">
        <InputField label="First Name" required>
          <input type="text" value={form.first_name} onChange={e => set("first_name", e.target.value)} className={inputCls} required />
        </InputField>
        <InputField label="Last Name" required>
          <input type="text" value={form.last_name} onChange={e => set("last_name", e.target.value)} className={inputCls} required />
        </InputField>
        <InputField label="Email Address" required>
          <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} required />
        </InputField>
        <InputField label="Phone Number" hint="Optional — for text updates">
          <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} />
        </InputField>
      </div>

      {/* Contact preference */}
      <InputField label="How do you prefer to be contacted?">
        <RadioPills options={CONTACT_PREFS} value={form.contact_preference} onChange={v => set("contact_preference", v)} />
      </InputField>

      {/* Interests */}
      <InputField label="What topics are you most interested in?" hint="Select all that apply.">
        <CheckPills options={INTERESTS} selected={form.areas_of_interest} onChange={v => set("areas_of_interest", v)} />
      </InputField>

      {/* Meetings */}
      <InputField label="Would you like to attend public meetings or workshops?">
        <RadioPills options={MEETING_OPTS} value={form.meeting_interest} onChange={v => set("meeting_interest", v)} />
      </InputField>

      {(form.meeting_interest === "yes" || form.meeting_interest === "virtual" || form.meeting_interest === "either") && (
        <InputField label="What times work best for you?" hint="e.g., weekday evenings, Saturday mornings">
          <input type="text" value={form.meeting_availability} onChange={e => set("meeting_availability", e.target.value)} className={inputCls} placeholder="Weekday evenings..." />
        </InputField>
      )}

      {/* How heard */}
      <InputField label="How did you hear about this project?">
        <RadioPills options={HOW_HEARD} value={form.how_heard} onChange={v => set("how_heard", v)} />
      </InputField>

      {/* Comments */}
      <InputField label="Any questions or comments for the planning team?">
        <textarea
          value={form.additional_comments}
          onChange={e => set("additional_comments", e.target.value)}
          rows={3}
          className="w-full border border-ivory/20 bg-ivory/10 focus:border-eucalyptus focus:outline-none px-4 py-3 font-sans text-sm text-ivory resize-none transition-colors placeholder:text-ivory/25"
          placeholder="Optional..."
        />
      </InputField>

      {error && <p className="font-sans text-red-400 text-sm">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting || !isValid}
          className={`btn-primary text-xs bg-ivory text-forest hover:bg-sand border-ivory hover:border-sand ${
            submitting || !isValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Submitting…" : "Sign Me Up"}
        </button>
      </div>

      <p className="font-sans text-ivory/25 text-xs text-center -mt-4">
        Your information will never be shared with third parties.
      </p>
    </form>
  )
}
