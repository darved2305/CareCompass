import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CheckPage from './pages/CheckPage'
import ResultPage from './pages/ResultPage'
import FindCarePage from './pages/FindCarePage'
import TelehelpPage from './pages/TelehelpPage'
import LearnPage from './pages/LearnPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/result/:caseId" element={<ResultPage />} />
        <Route path="/find-care" element={<FindCarePage />} />
        <Route path="/telehelp" element={<TelehelpPage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </Router>
  )
}

export default App
