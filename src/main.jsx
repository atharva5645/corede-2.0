import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CareerPage from './pages/CareerPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Application */}
        <Route path="/" element={<App />} />

        {/* Career Page */}
        <Route path="/career" element={<CareerPage />} />

        {/* Redirect removed/archived routes safely to Home */}
        <Route path="/internship" element={<Navigate to="/" replace />} />
        <Route path="/internship/*" element={<Navigate to="/" replace />} />
        <Route path="/workshop" element={<Navigate to="/" replace />} />
        <Route path="/workshop/*" element={<Navigate to="/" replace />} />
        <Route path="/internship-success" element={<Navigate to="/" replace />} />
        <Route path="/workshop-success" element={<Navigate to="/" replace />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
