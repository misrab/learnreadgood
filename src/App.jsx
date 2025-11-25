import { useTranslation } from 'react-i18next'
import { LanguageSelector } from './components/LanguageSelector'
import { Navbar } from './components/Navbar'
import './App.css'

function App() {
  const { t } = useTranslation()

  return (
    <div className="app">
      <header className="top-bar">
        <h1 className="title">{t('appName')}</h1>
        <LanguageSelector />
      </header>

      <div className="main-layout">
        <Navbar />
        <main className="content-area" aria-label="Main content" />
      </div>
    </div>
  )
}

export default App

