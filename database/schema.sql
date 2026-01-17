-- CareCompass Cases Table
-- This table stores triage submissions and results

CREATE TABLE IF NOT EXISTS cases (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Location data (at least one required)
  city TEXT,
  pincode TEXT,
  lat DOUBLE PRECISION,  -- Reserved for future geocoding
  lng DOUBLE PRECISION,  -- Reserved for future geocoding
  
  -- User input data
  age_group TEXT NOT NULL,
  symptoms JSONB NOT NULL,           -- Array of symptom strings
  free_text TEXT,
  severity TEXT NOT NULL,            -- mild | moderate | severe
  duration TEXT NOT NULL,            -- 1 day | 2-3 days | 4-7 days | >7 days
  risk_factors JSONB,                -- Array of risk factor strings
  
  -- Computed triage results
  risk_level TEXT NOT NULL,          -- low | medium | high
  red_flags JSONB NOT NULL,          -- Array of identified red flag strings
  advice JSONB NOT NULL,             -- Array of advice strings
  
  -- Optional facility data (for future features)
  facility_results JSONB,
  
  -- Constraints
  CONSTRAINT city_or_pincode_required CHECK (
    city IS NOT NULL OR pincode IS NOT NULL
  ),
  CONSTRAINT valid_age_group CHECK (
    age_group IN ('<5', '5-17', '18-40', '41-60', '60+')
  ),
  CONSTRAINT valid_severity CHECK (
    severity IN ('mild', 'moderate', 'severe')
  ),
  CONSTRAINT valid_duration CHECK (
    duration IN ('1 day', '2-3 days', '4-7 days', '>7 days')
  ),
  CONSTRAINT valid_risk_level CHECK (
    risk_level IN ('low', 'medium', 'high')
  )
);

-- Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_risk_level ON cases (risk_level);

-- RLS Policy: Service role has full access (used in API routes)
-- Public anon key has NO access (all operations go through API)

-- Optional: If you want public read access for result pages
-- Uncomment the following policy:
-- CREATE POLICY "Public can read individual cases"
--   ON cases
--   FOR SELECT
--   USING (true);

-- For MVP, we recommend keeping all access through API routes with service role key
