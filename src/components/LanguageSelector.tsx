import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value
    i18n.changeLanguage(code)
    localStorage.setItem('lrg_language', code)
  }

  return (
    <select
      className="lang-select"
      value={i18n.language}
      onChange={handleChange}
      aria-label="Select language"
    >
      {languages.map(l => (
        <option key={l.code} value={l.code}>{l.name}</option>
      ))}
    </select>
  )
}
