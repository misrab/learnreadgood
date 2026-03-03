import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sidebar } from './components/Sidebar'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionView } from './pages/SectionView'
import { About } from './pages/About'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { buildReadingCourse } from './data/courses'
import './App.css'

function App() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const firstSection = buildReadingCourse().sections[0]

  return (
    <div className="app">
      <header className="top-bar">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <span className="app-title">{t('appName')}</span>
        <LanguageSelector />
      </header>

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to={`/section/${firstSection.id}`} replace />} />
            <Route path="/section/:sectionId" element={<SectionView />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
