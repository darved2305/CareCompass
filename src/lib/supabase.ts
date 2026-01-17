import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export interface Case {
  id: string
  created_at: string
  city: string | null
  pincode: string | null
  lat: number | null
  lng: number | null
  age_group: string
  symptoms: string[]
  free_text: string | null
  severity: string
  duration: string
  risk_factors: string[] | null
  risk_level: string
  red_flags: string[]
  advice: string[]
  facility_results: any | null
}

export interface TriageInput {
  city?: string
  pincode?: string
  age_group: string
  symptoms: string[]
  free_text?: string
  severity: string
  duration: string
  risk_factors?: string[]
}
