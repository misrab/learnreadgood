import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buildReadingCourse, READING_COURSE_ID, ReadingLanguage } from '../data/courses'
import { useProgress } from '../contexts/ProgressContext'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()
  const { isSectionComplete, getCourseParam } = useProgress()

  const targetLanguage = (getCourseParam(READING_COURSE_ID, 'targetLanguage') ?? 'ar') as ReadingLanguage
  const course = buildReadingCourse(targetLanguage)

  return (
    <>
      <div
        className={`sidebar-overlay${isOpen ? ' visible' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-top">
          <ul className="section-list">
            <li>
              <NavLink
                to="/course/reading"
                className={({ isActive }) => `section-link${isActive ? ' active' : ''}`}
              >
                {t('nav.overview')}
              </NavLink>
            </li>
            {course.sections.map(section => {
              const done = isSectionComplete(section.id)
              return (
                <li key={section.id}>
                  <NavLink
                    to={`/section/${section.id}`}
                    className={({ isActive }) =>
                      `section-link${done ? ' completed' : ''}${isActive ? ' active' : ''}`
                    }
                  >
                    {done ? '✓ ' : ''}{t(section.nameKey)}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="sidebar-bottom">
          <NavLink
            to="/about"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {t('nav.about')}
          </NavLink>

          <footer className="sidebar-footer">
            <p>{t('footer.copyright')}</p>
            <p>
              <NavLink to="/terms">{t('footer.terms')}</NavLink>
              {' · '}
              <NavLink to="/privacy">{t('footer.privacy')}</NavLink>
            </p>
          </footer>
        </div>
      </nav>
    </>
  )
}
