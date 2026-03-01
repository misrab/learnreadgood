import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSelector.css'

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' }
]

interface LanguageSelectorProps {
  isFirstVisit?: boolean;
  onLanguageSelect?: () => void;
}

export function LanguageSelector({ isFirstVisit: _isFirstVisit, onLanguageSelect }: LanguageSelectorProps) {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    localStorage.setItem('lrg_language', langCode)
    setIsOpen(false)
    if (onLanguageSelect) {
      onLanguageSelect()
    }
  }

  return (
    <>
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="flag">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <>
          <div className="language-overlay" onClick={() => setIsOpen(false)} />
          <div className="language-picker">
            <div className="language-grid">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`language-option ${lang.code === i18n.language ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="flag-large">{lang.flag}</span>
                  <span className="language-name">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

