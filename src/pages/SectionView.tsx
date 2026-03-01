import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buildReadingCourse, READING_COURSE_ID, ReadingLanguage } from '../data/courses'
import { useSectionStatus } from '../hooks/useSectionStatus'
import { useProgress } from '../contexts/ProgressContext'
import { AlphabetExplore } from '../components/activities/AlphabetExplore'
import { AlphabetRecognition } from '../components/activities/AlphabetRecognition'
import { AlphabetQuiz } from '../components/activities/AlphabetQuiz'

const ACTIVITY_LABELS: Record<string, string> = {
  explore: 'ui.activityExplore',
  recognition: 'ui.activityRecognition',
  quiz: 'ui.activityQuiz',
}

export function SectionView() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { t } = useTranslation()
  const { getSectionStatus } = useSectionStatus()
  const {
    markSectionSkipped, markSectionComplete, markActivityComplete,
    isLoading, getCourseParam,
  } = useProgress()
  const [activeIdx, setActiveIdx] = useState(0)

  const targetLanguage = (getCourseParam(READING_COURSE_ID, 'targetLanguage') ?? 'ar') as ReadingLanguage
  const course = buildReadingCourse(targetLanguage)
  const section = course.sections.find(s => s.id === sectionId)

  useEffect(() => { setActiveIdx(0) }, [sectionId])

  if (!section) {
    return <Navigate to={`/section/${course.sections[0].id}`} replace />
  }

  if (isLoading) {
    return <div className="section-view"><p className="muted">Loading...</p></div>
  }

  const status = getSectionStatus(section.id, section.order)

  if (status === 'locked') {
    return (
      <div className="section-view">
        <h2 className="section-title">{t(section.nameKey)}</h2>
        <p className="muted">{t('ui.sectionLocked')}</p>
      </div>
    )
  }

  const handleActivityComplete = () => {
    const activity = section.activities[activeIdx]
    if (activity) markActivityComplete(section.id, activity.id)
    const next = activeIdx + 1
    if (next >= section.activities.length) {
      markSectionComplete(section.id)
    } else {
      setActiveIdx(next)
    }
  }

  const renderActivity = () => {
    const activity = section.activities[activeIdx]
    if (!activity) return <p className="muted">{t('ui.activitiesComingSoon')}</p>
    const { letters, lang, dir } = activity.content
    switch (activity.type) {
      case 'explore':
        return <AlphabetExplore key={activeIdx} letters={letters} lang={lang} dir={dir} onComplete={handleActivityComplete} />
      case 'recognition':
        return <AlphabetRecognition key={activeIdx} letters={letters} lang={lang} dir={dir} onComplete={handleActivityComplete} />
      case 'quiz':
        return <AlphabetQuiz key={activeIdx} letters={letters} lang={lang} dir={dir} onComplete={handleActivityComplete} />
      default:
        return <p className="muted">{t('ui.activitiesComingSoon')}</p>
    }
  }

  if (section.activities.length > 0) {
    return (
      <div className="section-view section-view--wide">
        <h2 className="section-title">{t(section.nameKey)}</h2>

        <div className="activity-tabs">
          {section.activities.map((activity, i) => (
              <button
                key={activity.id}
                className={`activity-tab${i === activeIdx ? ' active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {t(ACTIVITY_LABELS[activity.type] ?? activity.type)}
              </button>
          ))}
        </div>

        <div className="activity-body">
          {renderActivity()}
        </div>
      </div>
    )
  }

  // No activities — placeholder
  return (
    <div className="section-view">
      <h2 className="section-title">{t(section.nameKey)}</h2>
      {section.descriptionKey && (
        <p className="section-desc">{t(section.descriptionKey)}</p>
      )}
      <p className="muted">{t('ui.activitiesComingSoon')}</p>
      {(status === 'available' || status === 'in-progress') && (
        <div className="section-actions">
          <button className="btn-secondary" onClick={() => markSectionSkipped(section.id)}>
            {t('ui.iKnowThis')}
          </button>
        </div>
      )}
    </div>
  )
}
