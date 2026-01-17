import { TriageInput } from '../lib/supabase'

const RED_FLAG_SYMPTOMS = [
  'breathlessness',
  'chest pain',
  'severe injury/pain',
  'persistent vomiting',
  'severe dizziness/fainting',
  'rash with fever',
]

export interface TriageResult {
  risk_level: 'low' | 'medium' | 'high'
  red_flags: string[]
  advice: string[]
}

export function computeTriageResult(input: TriageInput): TriageResult {
  const {
    symptoms,
    severity,
    duration,
    risk_factors = [],
  } = input

  const redFlags = symptoms.filter(symptom =>
    RED_FLAG_SYMPTOMS.some(flag => 
      symptom.toLowerCase().includes(flag.toLowerCase())
    )
  )

  let riskLevel: 'low' | 'medium' | 'high' = 'low'

  if (
    severity === 'severe' ||
    redFlags.length > 0 ||
    (duration === '>7 days' && risk_factors.length > 0)
  ) {
    riskLevel = 'high'
  }
  else if (
    severity === 'moderate' ||
    duration === '4-7 days' ||
    duration === '>7 days' ||
    (risk_factors.length > 0 && 
      (symptoms.includes('fever') || symptoms.includes('cough') || symptoms.includes('weakness/fatigue')))
  ) {
    riskLevel = 'medium'
  }

  const advice = generateAdvice(riskLevel, redFlags, symptoms, risk_factors)

  return {
    risk_level: riskLevel,
    red_flags: redFlags,
    advice,
  }
}

function generateAdvice(
  riskLevel: 'low' | 'medium' | 'high',
  redFlags: string[],
  symptoms: string[],
  riskFactors: string[]
): string[] {
  const advice: string[] = []

  if (riskLevel === 'high') {
    advice.push('⚠️ Seek urgent medical care immediately')
    
    if (redFlags.length > 0) {
      advice.push(`Red flag symptoms detected: ${redFlags.join(', ')}`)
    }
    
    advice.push('Visit the nearest emergency department or call emergency services')
    advice.push('Do not delay - these symptoms require immediate professional evaluation')
    
    if (riskFactors.length > 0) {
      advice.push(`Given your health conditions (${riskFactors.join(', ')}), prompt medical attention is especially important`)
    }
  } 
  else if (riskLevel === 'medium') {
    advice.push('Visit a clinic or healthcare provider within 24-48 hours')
    advice.push('Monitor your symptoms closely')
    
    if (symptoms.includes('fever')) {
      advice.push('Stay hydrated and take fever-reducing medication if needed')
    }
    
    if (symptoms.includes('cough') || symptoms.includes('breathlessness')) {
      advice.push('Rest and avoid strenuous activities')
    }
    
    advice.push('Seek immediate care if symptoms worsen or new red flag symptoms develop')
    
    if (riskFactors.length > 0) {
      advice.push('Your existing health conditions warrant closer monitoring - consult your regular doctor')
    }
  } 
  else {
    advice.push('Your symptoms appear mild - self-care at home is likely sufficient')
    advice.push('Get plenty of rest and stay well hydrated')
    
    if (symptoms.includes('fever') || symptoms.includes('cough')) {
      advice.push('Over-the-counter medications may help relieve symptoms')
    }
    
    if (symptoms.includes('headache')) {
      advice.push('Rest in a quiet, dark room if you have a headache')
    }
    
    if (symptoms.includes('stomach pain') || symptoms.includes('diarrhea')) {
      advice.push('Eat bland foods and avoid dairy until symptoms improve')
    }
    
    advice.push('Monitor your symptoms - if they persist beyond 3-4 days or worsen, consult a healthcare provider')
    advice.push('Seek immediate care if you develop any red flag symptoms (severe pain, breathlessness, chest pain, etc.)')
  }

  return advice
}

export function validateTriageInput(input: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!input.city && !input.pincode) {
    errors.push('Either city or pincode is required')
  }

  const validAgeGroups = ['<5', '5-17', '18-40', '41-60', '60+']
  if (!input.age_group || !validAgeGroups.includes(input.age_group)) {
    errors.push('Valid age group is required')
  }

  if (!input.symptoms || !Array.isArray(input.symptoms) || input.symptoms.length === 0) {
    errors.push('At least one symptom is required')
  }

  const validSeverities = ['mild', 'moderate', 'severe']
  if (!input.severity || !validSeverities.includes(input.severity)) {
    errors.push('Valid severity is required')
  }

  const validDurations = ['1 day', '2-3 days', '4-7 days', '>7 days']
  if (!input.duration || !validDurations.includes(input.duration)) {
    errors.push('Valid duration is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
