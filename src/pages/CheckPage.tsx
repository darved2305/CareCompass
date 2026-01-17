import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '../lib/supabase'
import { computeTriageResult } from '../lib/triageRules'
import ModuleNavbar from '../components/ModuleNavbar'

const triageSchema = z.object({
  city: z.string().optional(),
  pincode: z.string().optional(),
  age_group: z.enum(['<5', '5-17', '18-40', '41-60', '60+']),
  symptoms: z.array(z.string()).min(1, 'Please select at least one symptom'),
  free_text: z.string().optional(),
  severity: z.enum(['mild', 'moderate', 'severe']),
  duration: z.enum(['1 day', '2-3 days', '4-7 days', '>7 days']),
  risk_factors: z.array(z.string()).optional(),
}).refine(data => data.city || data.pincode, {
  message: 'Please provide either city or pincode',
  path: ['city'],
})

type TriageFormData = z.infer<typeof triageSchema>

const SYMPTOMS = [
  'fever', 'cough', 'sore throat', 'breathlessness', 'chest pain', 'headache',
  'stomach pain', 'vomiting', 'diarrhea', 'dizziness', 'rash', 'injury/pain', 'weakness/fatigue',
]

const RISK_FACTORS = ['diabetes', 'asthma', 'pregnancy']

function CheckPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: {
      symptoms: [],
      risk_factors: [],
    },
  })

  const onSubmit = async (data: TriageFormData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const triageResult = computeTriageResult(data)

      const caseData = {
        city: data.city || null,
        pincode: data.pincode || null,
        lat: null,
        lng: null,
        age_group: data.age_group,
        symptoms: data.symptoms,
        free_text: data.free_text || null,
        severity: data.severity,
        duration: data.duration,
        risk_factors: data.risk_factors || null,
        risk_level: triageResult.risk_level,
        red_flags: triageResult.red_flags,
        advice: triageResult.advice,
        facility_results: null,
      }

      const { data: insertData, error } = await supabase
        .from('cases')
        .insert([caseData])
        .select('id')
        .single()

      if (error) throw error

      navigate(`/result/${insertData.id}`)
    } catch (error) {
      console.error('Submission error:', error)
      setApiError(error instanceof Error ? error.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="module-page">
      <ModuleNavbar />
      <div className="module-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-card">
          <h1 className="form-title">Check What Care You Need</h1>
          <p className="form-description">
            Answer a few quick questions about your symptoms. We'll help you understand
            the urgency and guide you to the right care option.
          </p>

          <div className="form-section">
            <label className="form-label required">Location</label>
            <div className="form-grid">
              <input {...register('city')} type="text" placeholder="City" className="form-input" />
              <input {...register('pincode')} type="text" placeholder="Pincode" className="form-input" />
            </div>
            {errors.city && <span className="form-error">{errors.city.message}</span>}
          </div>

          <div className="form-section">
            <label className="form-label required">Age Group</label>
            <div className="form-radio-group">
              {['<5', '5-17', '18-40', '41-60', '60+'].map((age) => (
                <label key={age} className="form-radio-label">
                  <input {...register('age_group')} type="radio" value={age} />
                  <span>{age}</span>
                </label>
              ))}
            </div>
            {errors.age_group && <span className="form-error">{errors.age_group.message}</span>}
          </div>

          <div className="form-section">
            <label className="form-label required">Symptoms</label>
            <div className="form-checkbox-grid">
              {SYMPTOMS.map((symptom) => (
                <label key={symptom} className="form-checkbox-label">
                  <input {...register('symptoms')} type="checkbox" value={symptom} />
                  <span>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</span>
                </label>
              ))}
            </div>
            {errors.symptoms && <span className="form-error">{errors.symptoms.message}</span>}
          </div>

          <div className="form-section">
            <label className="form-label">Other Symptoms / Notes (Optional)</label>
            <textarea
              {...register('free_text')}
              placeholder="Describe any other symptoms or details..."
              className="form-input form-textarea"
            />
          </div>

          <div className="form-section">
            <label className="form-label required">Severity</label>
            <div className="form-radio-group">
              {['mild', 'moderate', 'severe'].map((severity) => (
                <label key={severity} className="form-radio-label">
                  <input {...register('severity')} type="radio" value={severity} />
                  <span>{severity.charAt(0).toUpperCase() + severity.slice(1)}</span>
                </label>
              ))}
            </div>
            {errors.severity && <span className="form-error">{errors.severity.message}</span>}
          </div>

          <div className="form-section">
            <label className="form-label required">How long have you had these symptoms?</label>
            <div className="form-radio-group">
              {['1 day', '2-3 days', '4-7 days', '>7 days'].map((duration) => (
                <label key={duration} className="form-radio-label">
                  <input {...register('duration')} type="radio" value={duration} />
                  <span>{duration}</span>
                </label>
              ))}
            </div>
            {errors.duration && <span className="form-error">{errors.duration.message}</span>}
          </div>

          <div className="form-section">
            <label className="form-label">Existing Conditions / Risk Factors (Optional)</label>
            <div className="form-checkbox-grid">
              {RISK_FACTORS.map((factor) => (
                <label key={factor} className="form-checkbox-label">
                  <input {...register('risk_factors')} type="checkbox" value={factor} />
                  <span>{factor.charAt(0).toUpperCase() + factor.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {apiError && <div className="form-error" style={{ marginBottom: '20px' }}>{apiError}</div>}

          <button type="submit" className="form-button" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Get Care Guidance'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckPage
