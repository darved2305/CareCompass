import { Link } from 'react-router-dom'
import ModuleNavbar from '../components/ModuleNavbar'

function TelehelpPage() {
  return (
    <div className="module-page">
      <ModuleNavbar />
      <div className="module-container">
        <div className="placeholder-content">
          <h2>Teleconsult & Helplines</h2>
          <p>
            Access telemedicine services and emergency helpline numbers for immediate assistance.
          </p>
          <p style={{ color: '#999', fontSize: '14px', marginTop: '20px' }}>
            Coming soon: Teleconsult booking, helpline directory, video consultation, and more.
          </p>
          <Link to="/check" className="form-button" style={{ marginTop: '32px' }}>
            Start Triage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TelehelpPage
