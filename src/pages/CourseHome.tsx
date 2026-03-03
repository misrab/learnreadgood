import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buildReadingCourse, READING_COURSE_ID, READING_LANGUAGES, ReadingLanguage } from '../data/courses'
import { useProgress } from '../contexts/ProgressContext'

export function CourseHome() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getCourseParam, setCourseParam, isSectionComplete } = useProgress()

  const targetLanguage = (getCourseParam(READING_COURSE_ID, 'targetLanguage') ?? '') as ReadingLanguage | ''
  const course = buildReadingCourse((targetLanguage || 'ar') as ReadingLanguage)
  const hasStarted = course.sections.some(s => isSectionComplete(s.id))

  const handleGo = () => {
    if (!targetLanguage) return
    const next = course.sections.find(s => !isSectionComplete(s.id)) ?? course.sections[0]
    navigate(`/section/${next.id}`)
  }

  return (
    <div className="course-home">
      <h1 className="section-title">{t('course.reading.name')}</h1>
      <p className="section-desc">{t('course.reading.description')}</p>

      <p className="course-home__prompt">{t('course.selectLanguage')}</p>
      <div className="course-home__flags">
        {READING_LANGUAGES.map(l => (
          <button
            key={l.code}
            className={`course-home__flag-btn${targetLanguage === l.code ? ' selected' : ''}`}
            onClick={() => setCourseParam(READING_COURSE_ID, 'targetLanguage', l.code)}
            aria-label={l.label}
          >
            {l.flag}
          </button>
        ))}
      </div>

      {targetLanguage && (
        <button
          className="nav-arrow-btn"
          onClick={handleGo}
          aria-label={hasStarted ? t('ui.continue') : t('ui.start')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  )
}
