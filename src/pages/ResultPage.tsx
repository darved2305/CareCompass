import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase, Case } from '../lib/supabase'
import ModuleNavbar from '../components/ModuleNavbar'

function ResultPage() {
  const { caseId } = useParams<{ caseId: string }>()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCase() {
      if (!caseId) return

      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('id', caseId)
          .single()

        if (error) throw error
        setCaseData(data as Case)
      } catch (err) {
        console.error('Error fetching case:', err)
        setError('Failed to load case data')
      } finally {
        setLoading(false)
      }
    }

    fetchCase()
  }, [caseId])

  if (loading) {
    return (
      <div className="module-page">
        <ModuleNavbar />
        <div className="module-container">
          <div className="result-card">Loading...</div>
        </div>
      </div>
    )
  }

  if (error || !caseData) {
    return (
      <div className="module-page">
        <ModuleNavbar />
        <div className="module-container">
          <div className="result-card">
            <h1 className="form-title">Case Not Found</h1>
            <p>{error || 'The requested case could not be found.'}</p>
            <Link to="/check" className="form-button">Start New Check</Link>
          </div>
        </div>
      </div>
    )
  }

  const getRiskBadgeClass = (level: string) => `risk-badge ${level.toLowerCase()}`

  return (
    <div className="module-page">
      <ModuleNavbar />
      <div className="module-container">
        <div className="result-card">
          <h1 className="form-title">Your Care Guidance</h1>
          
          <span className={getRiskBadgeClass(caseData.risk_level)}>
            {caseData.risk_level.toUpperCase()} RISK
          </span>

          {caseData.red_flags && caseData.red_flags.length > 0 && (
            <div className="result-section">
              <h2 className="result-section-title">⚠️ Red Flag Symptoms Detected</h2>
              <ul className="result-list">
                {caseData.red_flags.map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="result-section">
            <h2 className="result-section-title">Recommended Actions</h2>
            <ul className="result-list">
              {caseData.advice.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h2 className="result-section-title">Your Inputs</h2>
            <ul className="result-list">
              {caseData.city && <li>Location: {caseData.city}</li>}
              {caseData.pincode && <li>Pincode: {caseData.pincode}</li>}
              <li>Age Group: {caseData.age_group}</li>
              <li>Severity: {caseData.severity}</li>
              <li>Duration: {caseData.duration}</li>
              <li>Symptoms: {Array.isArray(caseData.symptoms) ? caseData.symptoms.join(', ') : 'None specified'}</li>
              {caseData.risk_factors && caseData.risk_factors.length > 0 && (
                <li>Risk Factors: {caseData.risk_factors.join(', ')}</li>
              )}
            </ul>
          </div>

          <div className="disclaimer">
            <p>
              <strong>Important:</strong> This is not a medical diagnosis. It is an educational tool 
              to help you understand your symptoms better. If symptoms worsen or you have any 
              red flag symptoms, please seek professional medical help immediately.
            </p>
          </div>

          <div className="button-group">
            <Link to={`/find-care?caseId=${caseData.id}`} className="form-button">
              Find Care Near Me
            </Link>
            <Link to="/check" className="form-button" style={{ background: '#6a6a6a' }}>
              Start New Check
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
