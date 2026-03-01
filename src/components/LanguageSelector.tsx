import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { READING_LANGUAGES, READING_COURSE_ID } from '../data/courses'
import { useProgress } from '../contexts/ProgressContext'

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const { setCourseParam } = useProgress()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = READING_LANGUAGES.find(l => l.code === i18n.language) ?? READING_LANGUAGES[0]

  const select = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lrg_language', code)
    setCourseParam(READING_COURSE_ID, 'targetLanguage', code)
    setOpen(false)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="flag-select" ref={ref}>
      <button
        className="flag-select__btn"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        {current.flag}
      </button>
      {open && (
        <ul className="flag-select__menu" role="listbox">
          {READING_LANGUAGES.map(l => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === i18n.language}
              className={`flag-select__item${l.code === i18n.language ? ' active' : ''}`}
              onClick={() => select(l.code)}
            >
              {l.flag}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
