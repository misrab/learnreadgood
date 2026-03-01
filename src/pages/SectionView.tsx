import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { readingCourse } from '../data/courses'
import { useSectionStatus } from '../hooks/useSectionStatus'
import { useProgress } from '../contexts/ProgressContext'

export function SectionView() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { t } = useTranslation()
  const { getSectionStatus } = useSectionStatus()
  const { markSectionSkipped, isLoading } = useProgress()

  const section = readingCourse.sections.find(s => s.id === sectionId)

  if (!section) {
    return <Navigate to={`/section/${readingCourse.sections[0].id}`} replace />
  }

  const status = getSectionStatus(section.id, section.order)

  if (isLoading) {
    return <div className="section-view"><p className="muted">Loading...</p></div>
  }

  return (
    <div className="section-view">
      <h2 className="section-title">{t(section.nameKey)}</h2>
      {section.descriptionKey && (
        <p className="section-desc">{t(section.descriptionKey)}</p>
      )}

      {status === 'locked' && (
        <p className="muted">{t('ui.sectionLocked')}</p>
      )}

      {status !== 'locked' && (
        <div className="section-content">
          <p className="muted">{t('ui.activitiesComingSoon')}</p>
          {(status === 'available' || status === 'in-progress') && (
            <div className="section-actions">
              <button className="btn-primary">
                {status === 'in-progress' ? t('ui.continue') : t('ui.start')}
              </button>
              <button className="btn-secondary" onClick={() => markSectionSkipped(section.id)}>
                {t('ui.iKnowThis')}
              </button>
            </div>
          )}
          {(status === 'completed' || status === 'skipped') && (
            <div className="section-actions">
              <button className="btn-secondary">{t('ui.review')}</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
