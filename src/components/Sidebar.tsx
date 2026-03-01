import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { allCourses, readingCourse } from '../data/courses'
import { useSectionStatus } from '../hooks/useSectionStatus'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()
  const { getSectionStatus } = useSectionStatus()
  const navigate = useNavigate()

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const course = allCourses.find(c => c.id === e.target.value)
    if (course?.sections[0]) {
      navigate(`/section/${course.sections[0].id}`)
      onClose()
    }
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <nav className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-top">
          <select
            className="course-select"
            defaultValue={readingCourse.id}
            onChange={handleCourseChange}
            aria-label={t('nav.selectCourse')}
          >
            {allCourses.map(course => (
              <option key={course.id} value={course.id}>{t(course.nameKey)}</option>
            ))}
          </select>

          <ul className="section-list">
            {readingCourse.sections.map(section => {
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
