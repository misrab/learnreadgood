import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from './components/LanguageSelector'
import { Navbar } from './components/Navbar'
import './App.css'

function App() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="top-bar">
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="title">{t('appName')}</h1>
        <LanguageSelector />
      </header>

      <div className="main-layout">
        <Navbar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main className="content-area" aria-label="Main content" />
      </div>
    </div>
  )
}

export default App

