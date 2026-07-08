import { useState } from "react"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import Graphic from "@arcgis/core/Graphic.js"
import { COMMUNITY_VOICE_LAYER_URL } from "../config/surveys.js"

const HOW_LONG = [
  { value: "less_1",       label: "Less than 1 year" },
  { value: "1_5",          label: "1–5 years" },
  { value: "5_10",         label: "5–10 years" },
  { value: "10_20",        label: "10–20 years" },
  { value: "20_plus",      label: "20+ years" },
  { value: "not_resident", label: "Connected but not a resident" },
]

const AREAS = [
  { value: "rayville",    label: "Rayville area" },
  { value: "delhi",       label: "Delhi area" },
  { value: "start",       label: "Start area" },
  { value: "mangham",     label: "Mangham area" },
  { value: "other_area",  label: "Other area" },
  { value: "parish_wide", label: "Throughout the parish" },
]

const WORDS = [
  { value: "agricultural", label: "Agricultural" },
  { value: "close_knit",   label: "Close-knit" },
  { value: "family",       label: "Family-oriented" },
  { value: "hardworking",  label: "Hardworking" },
  { value: "historic",     label: "Historic" },
  { value: "natural",      label: "Natural beauty" },
  { value: "quiet",        label: "Quiet" },
  { value: "resilient",    label: "Resilient" },
  { value: "rural",        label: "Rural" },
  { value: "southern",     label: "Southern" },
  { value: "traditional",  label: "Traditional" },
  { value: "welcoming",    label: "Welcoming" },
  { value: "growing",      label: "Growing" },
  { value: "proud",        label: "Proud" },
  { value: "authentic",    label: "Authentic" },
]

const STRENGTHS = [
  { value: "agriculture",     label: "Agriculture & farming" },
  { value: "community",       label: "Community ties" },
  { value: "affordability",   label: "Affordability" },
  { value: "safety",          label: "Safety" },
  { value: "schools",         label: "Schools & education" },
  { value: "nature",          label: "Natural resources" },
  { value: "history",         label: "History & culture" },
  { value: "location",        label: "Location & access" },
  { value: "hunting_fishing", label: "Hunting & fishing" },
  { value: "faith",           label: "Faith community" },
]

const PRIORITIES = [
  { value: "economic",     label: "Jobs & economy" },
  { value: "housing",      label: "Housing" },
  { value: "roads",        label: "Roads & infrastructure" },
  { value: "parks",        label: "Parks & recreation" },
  { value: "downtown",     label: "Downtown" },
  { value: "broadband",    label: "Broadband" },
  { value: "healthcare",   label: "Healthcare" },
  { value: "agriculture",  label: "Agriculture" },
  { value: "youth",        label: "Youth & families" },
  { value: "environment",  label: "Environment" },
]

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`text-left px-4 py-3 border text-sm font-sans transition-colors duration-150 ${
            value === opt.value
              ? "border-sage bg-sage/10 text-forest font-medium"
              : "border-sand bg-white text-forest/70 hover:border-eucalyptus"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function PillGroup({ options, selected, onChange, max }) {
  const toggle = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter(v => v !== val))
    } else if (!max || selected.length < max) {
      onChange([...selected, val])
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const on = selected.includes(opt.value)
        const disabled = max && selected.length >= max && !on
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-sans border transition-colors duration-150 ${
              on
                ? "bg-sage border-sage text-ivory"
                : disabled
                ? "border-sand text-forest/25 cursor-not-allowed"
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

function Field({ label, hint, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-serif text-forest text-lg font-semibold leading-snug">
        {label}{required && <span className="text-sage ml-1">*</span>}
      </label>
      {hint && <p className="font-sans text-forest/45 text-xs leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}

function StyledTextarea({ value, onChange, placeholder, required }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      required={required}
      className="w-full border border-sand bg-white focus:border-sage focus:outline-none px-4 py-3 font-sans text-sm text-forest resize-none transition-colors placeholder:text-forest/25"
    />
  )
}

function ProgressBar({ step, total }) {
  return (
    <div className="flex gap-1.5 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-0.5 flex-1 transition-all duration-500 ${
            i < step ? "bg-sage" : i === step ? "bg-eucalyptus" : "bg-sand"
          }`}
        />
      ))}
    </div>
  )
}

const STEPS = ["About You", "Word Association", "Your Voice", "Priorities"]

export default function CommunityVoiceForm() {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    years_in_parish: "",
    parish_area: "",
    word_association: [],
    word_other: "",
    what_it_means: "",
    preserve: "",
    improve: "",
    top_strengths: [],
    future_priorities: [],
    additional_comments: "",
  })

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const canAdvance = () => {
    if (step === 2) return form.what_it_means.trim().length > 0
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const layer = new FeatureLayer({ url: COMMUNITY_VOICE_LAYER_URL })
      const graphic = new Graphic({
        attributes: {
          years_in_parish:     form.years_in_parish || null,
          parish_area:         form.parish_area || null,
          word_association:    form.word_association.join(" ") || null,
          word_other:          form.word_other || null,
          what_it_means:       form.what_it_means || null,
          preserve:            form.preserve || null,
          improve:             form.improve || null,
          top_strengths:       form.top_strengths.join(" ") || null,
          future_priorities:   form.future_priorities.join(" ") || null,
          additional_comments: form.additional_comments || null,
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
        <div className="w-14 h-14 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-forest text-2xl font-semibold mb-3">Thank You</h3>
        <p className="font-sans text-forest/55 text-sm leading-relaxed">
          Your response has been recorded and will directly shape the Richland Parish Master Plan.
        </p>
        <a href="#stay-engaged" className="btn-primary inline-block mt-8 text-xs">
          Stay Engaged
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar step={step} total={STEPS.length} />

      <p className="section-label mb-6">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>

      <div className="flex flex-col gap-8">
        {step === 0 && (
          <>
            <Field label="How long have you been connected to Richland Parish?">
              <RadioGroup options={HOW_LONG} value={form.years_in_parish} onChange={v => set("years_in_parish", v)} />
            </Field>
            <Field label="Which area do you primarily live or work in?">
              <RadioGroup options={AREAS} value={form.parish_area} onChange={v => set("parish_area", v)} />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Which words best describe Richland Parish to you?" hint="Choose up to 5.">
              <PillGroup options={WORDS} selected={form.word_association} onChange={v => set("word_association", v)} max={5} />
            </Field>
            <Field label="Any other words you'd use?">
              <input
                type="text"
                value={form.word_other}
                onChange={e => set("word_other", e.target.value)}
                placeholder="Type your own words..."
                className="w-full border border-sand bg-white focus:border-sage focus:outline-none px-4 py-3 font-sans text-sm text-forest transition-colors placeholder:text-forest/25"
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field
              label="In your own words, what does Richland Parish mean to you?"
              hint="There are no wrong answers — share whatever comes to mind."
              required
            >
              <StyledTextarea
                value={form.what_it_means}
                onChange={v => set("what_it_means", v)}
                placeholder="Share your thoughts..."
                required
              />
            </Field>
            <Field label="What's one thing about Richland Parish you most want to preserve?">
              <StyledTextarea value={form.preserve} onChange={v => set("preserve", v)} />
            </Field>
            <Field label="What's one thing you'd most like to see change or improve?">
              <StyledTextarea value={form.improve} onChange={v => set("improve", v)} />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field label="What are Richland Parish's greatest strengths?" hint="Choose up to 3.">
              <PillGroup options={STRENGTHS} selected={form.top_strengths} onChange={v => set("top_strengths", v)} max={3} />
            </Field>
            <Field label="What should the Master Plan prioritize?" hint="Choose up to 3.">
              <PillGroup options={PRIORITIES} selected={form.future_priorities} onChange={v => set("future_priorities", v)} max={3} />
            </Field>
            <Field label="Any other thoughts for the planning team?">
              <StyledTextarea value={form.additional_comments} onChange={v => set("additional_comments", v)} />
            </Field>
            {error && <p className="font-sans text-red-500 text-sm">{error}</p>}
          </>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t border-sand">
        {step > 0
          ? <button type="button" onClick={() => setStep(s => s - 1)} className="btn-outline text-xs">Back</button>
          : <div />
        }
        {step < STEPS.length - 1
          ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              className={`btn-primary text-xs ${!canAdvance() ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !canAdvance()}
              className={`btn-primary text-xs ${submitting ? "opacity-60" : ""}`}
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          )
        }
      </div>
    </div>
  )
}
