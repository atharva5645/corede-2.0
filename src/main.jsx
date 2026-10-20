import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CareerPage from './pages/CareerPage.jsx'
import InternshipPage from './pages/InternshipPage.jsx'
import WorkshopPage from './pages/WorkshopPage.jsx'
import InternshipSuccessPage from './pages/InternshipSuccessPage.jsx'
import WorkshopSuccessPage from './pages/WorkshopSuccessPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home — untouched */}
        <Route path="/" element={<App />} />

        {/* Standalone section pages */}
        <Route path="/career"             element={<CareerPage />} />
        <Route path="/internship"         element={<InternshipPage />} />
        <Route path="/workshop"           element={<WorkshopPage />} />
        <Route path="/workshop/"          element={<WorkshopPage />} />

        {/* Success pages */}
        <Route path="/internship-success" element={<InternshipSuccessPage />} />
        <Route path="/workshop-success"   element={<WorkshopSuccessPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
