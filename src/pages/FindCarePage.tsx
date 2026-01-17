import { Link } from 'react-router-dom'
import ModuleNavbar from '../components/ModuleNavbar'

function FindCarePage() {
  return (
    <div className="module-page">
      <ModuleNavbar />
      <div className="module-container">
        <div className="placeholder-content">
          <h2>Find Nearest Hospitals</h2>
          <p>
            This feature will help you locate verified healthcare facilities near you
            based on your location and care needs.
          </p>
          <p style={{ color: '#999', fontSize: '14px', marginTop: '20px' }}>
            Coming soon: Interactive map, facility filters, distance calculation, and more.
          </p>
          <Link to="/check" className="form-button" style={{ marginTop: '32px' }}>
            Start Triage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FindCarePage
