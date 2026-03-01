import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buildReadingCourse, READING_COURSE_ID, READING_LANGUAGES, ReadingLanguage } from '../data/courses'
import { useSectionStatus } from '../hooks/useSectionStatus'
import { useProgress } from '../contexts/ProgressContext'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()
  const { getSectionStatus } = useSectionStatus()
  const { getCourseParam, setCourseParam } = useProgress()

  const targetLanguage = (getCourseParam(READING_COURSE_ID, 'targetLanguage') ?? 'ar') as ReadingLanguage
  const course = buildReadingCourse(targetLanguage)

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseParam(READING_COURSE_ID, 'targetLanguage', e.target.value)
  }

  return (
    <>
      <div
        className={`sidebar-overlay${isOpen ? ' visible' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-top">
          <div className="course-header">
            <span className="course-name">{t('course.reading.name')}</span>
            <select
              className="lang-select"
              value={targetLanguage}
              onChange={handleLangChange}
              aria-label="Learning language"
            >
              {READING_LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
          </div>

          <ul className="section-list">
            {course.sections.map(section => {
              const status = getSectionStatus(section.id, section.order)
              const isLocked = status === 'locked'
              const label = (status === 'completed' || status === 'skipped' ? '✓ ' : '') + t(section.nameKey)

              return (
                <li key={section.id}>
                  {isLocked ? (
                    <span className="section-link locked">{t(section.nameKey)}</span>
                  ) : (
                    <NavLink
                      to={`/section/${section.id}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `section-link ${status}${isActive ? ' active' : ''}`
                      }
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="sidebar-bottom">
          <NavLink
            to="/about"
            onClick={onClose}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {t('nav.about')}
          </NavLink>

          <footer className="sidebar-footer">
            <p>{t('footer.copyright')}</p>
            <p>
              <NavLink to="/terms" onClick={onClose}>{t('footer.terms')}</NavLink>
              {' · '}
              <NavLink to="/privacy" onClick={onClose}>{t('footer.privacy')}</NavLink>
            </p>
          </footer>
        </div>
      </nav>
    </>
  )
}
