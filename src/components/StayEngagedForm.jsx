import { useState } from "react"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import Graphic from "@arcgis/core/Graphic.js"
import { STAY_ENGAGED_LAYER_URL } from "../config/surveys.js"

const CONTACT_PREFS = [
  { value: "Phone",   label: "Phone" },
  { value: "Email",  label: "Email" },
  { value: "Either One", label: "Either one" },
]

const PHONE_ACCESS = [
  { value: "Yes", label: "Yes" },
  { value: "No, only phone", label: "No, only phone" },
]

const CONNECTIONS = [
  {
    value: "I live and work in the parish",
    label: "I live and work in the parish"
  },
  {
    value: "I live in the parish",
    label: "I live in the parish"
  },
  {
    value: "I work in the parish",
    label: "I work in the parish"
  },
  {
    value: "I live in a nearby parish",
    label: "I live in a nearby parish"
  },
  {
    value: "I have family that lives in the",
    label: "I have family that lives in the parish"
  },
  {
    value: "I own a business or property in",
    label: "I own a business or property in the Parish"
  },
]

const CONTACT_ROLES = [
  { value: "Yes, media", label: "Yes, media" },
  { value: "Yes, elected official", label: "Yes, elected official" },
  { value: "No", label: "No" },
]

const RESIDENCY = [
  { value: "Temporary", label: "Temporary" },
  { value: "Permanent", label: "Permanent" },
]

const DISTRICTS = [
  { value: "1 (Doug Craig)", label: "1 (Doug Craig)" },
  { value: "2 (Billy Powell)", label: "2 (Billy Powell)" },
  { value: "3 (John Gee)", label: "3 (John Gee)" },
  { value: "4 (Steve Adcock)", label: "4 (Steve Adcock)" },
  { value: "5 (Jesse Lively)", label: "5 (Jesse Lively)" },
  { value: "6 (Johnny Jones)", label: "6 (Johnny Jones)" },
  { value: "7 (Cecil Reddick)", label: "7 (Cecil Reddick)" },
  { value: "8 (Elliot Colvin)", label: "8 (Elliot Colvin)" },
  { value: "9 (Roy Wiggins Jr.)", label: "9 (Roy Wiggins Jr.)" },
  { value: "I'm not sure", label: "I'm not sure" },
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
              ? "bg-sage border-sage text-ivory"
              : "border-ivory/30 text-ivory hover:border-eucalyptus"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

/*
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
                : "border-ivory/30 text-ivory hover:border-eucalyptus"
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
*/

function InputField({ label, hint, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans text-sm font-medium text-ivory tracking-wide">
        {label}{required && <span className="text-eucalyptus ml-1">*</span>}
      </label>
      {hint && <p className="font-sans text-ivory/55 text-xs">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = "w-full border border-ivory/20 bg-ivory/10 focus:border-eucalyptus focus:outline-none px-4 py-3 font-sans text-sm text-ivory transition-colors placeholder:text-ivory/30"

export default function StayEngagedForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

const [form, setForm] = useState({
  first_and_last_name: "",
  phone_number: "",
  email: "",
  what_is_your_preferred_form_of: "",
  if_you_said_you_prefer_phone_co: "",
  tell_us_your_connection_to_rich: "",
  are_you_a_media_contact_or_an_e: "",
  are_you_a_temporary_resident_or: "",
  if_you_live_in_or_own_property: "",
})

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const isValid =
    form.first_and_last_name.trim() &&
    form.phone_number.trim() &&
    form.email.trim()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    setError(null)
    try {
      const layer = new FeatureLayer({ url: STAY_ENGAGED_LAYER_URL })
      const graphic = new Graphic({
        attributes: {
          first_and_last_name: form.first_and_last_name || null,
          phone_number: form.phone_number || null,
          email: form.email || null,
          what_is_your_preferred_form_of:  form.what_is_your_preferred_form_of || null,
          if_you_said_you_prefer_phone_co:  form.if_you_said_you_prefer_phone_co || null,
          tell_us_your_connection_to_rich:  form.tell_us_your_connection_to_rich || null,
          are_you_a_media_contact_or_an_e:  form.are_you_a_media_contact_or_an_e || null,
          are_you_a_temporary_resident_or:  form.are_you_a_temporary_resident_or || null,
          if_you_live_in_or_own_property:  form.if_you_live_in_or_own_property || null,
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
  <InputField label="First and Last Name" required>
    <input
      type="text"
      value={form.first_and_last_name}
      onChange={e => set("first_and_last_name", e.target.value)}
      className={inputCls}
      required
    />
  </InputField>

  <InputField label="Phone Number" required>
    <input
      type="tel"
      value={form.phone_number}
      onChange={e => set("phone_number", e.target.value)}
      className={inputCls}
      required
    />
  </InputField>

  <InputField label="Email" required>
    <input
      type="email"
      value={form.email}
      onChange={e => set("email", e.target.value)}
      className={inputCls}
      required
    />
  </InputField>
</div>

<InputField label="What is your preferred form of communication?">
  <RadioPills
    options={CONTACT_PREFS}
    value={form.what_is_your_preferred_form_of}
    onChange={v => set("what_is_your_preferred_form_of", v)}
  />
</InputField>

{form.what_is_your_preferred_form_of === "Phone" && (
  <InputField label="If you said you prefer phone communication, do you have access to email or Facebook?">
    <RadioPills
      options={PHONE_ACCESS}
      value={form.if_you_said_you_prefer_phone_co}
      onChange={v => set("if_you_said_you_prefer_phone_co", v)}
    />
  </InputField>
)}

<InputField label="Tell us your connection to Richland Parish">
  <RadioPills
    options={CONNECTIONS}
    value={form.tell_us_your_connection_to_rich}
    onChange={v => set("tell_us_your_connection_to_rich", v)}
  />
</InputField>

<InputField label="Are you a media contact or an elected official?">
  <RadioPills
    options={CONTACT_ROLES}
    value={form.are_you_a_media_contact_or_an_e}
    onChange={v => set("are_you_a_media_contact_or_an_e", v)}
  />
</InputField>

<InputField label="Are you a temporary resident or long-term permanent resident?" hint="Temporary = contract worker or relative of contract worker">
  <RadioPills
    options={RESIDENCY}
    value={form.are_you_a_temporary_resident_or}
    onChange={v => set("are_you_a_temporary_resident_or", v)}
  />
</InputField>

<InputField label="If you live in or own property in Richland Parish, please tell us which district." hint="We've included the Police Jury member to help in case you're unsure.">
  <RadioPills
    options={DISTRICTS}
    value={form.if_you_live_in_or_own_property}
    onChange={v => set("if_you_live_in_or_own_property", v)}
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
