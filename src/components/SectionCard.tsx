/**
 * SectionCard Component
 * Displays a learning section with status, actions, and visual feedback
 */

import { useTranslation } from 'react-i18next';
import { Section, SectionStatus } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import './SectionCard.css';

interface SectionCardProps {
  section: Section;
  status: SectionStatus;
  onStart: (sectionId: string) => void;
}

export function SectionCard({ section, status, onStart }: SectionCardProps) {
  const { t } = useTranslation();
  const { markSectionSkipped, getSectionProgress } = useProgress();

  const handleStart = () => {
    onStart(section.id);
  };

  const handleSkip = () => {
    markSectionSkipped(section.id);
  };

  const sectionProgress = getSectionProgress(section.id);
  const progressPercent = sectionProgress 
    ? Math.round((sectionProgress.completedActivities.length / Math.max(section.activities.length, 1)) * 100)
    : 0;

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return <span className="status-badge completed">✅ {t('ui.completed')}</span>;
      case 'skipped':
        return <span className="status-badge skipped">✓ {t('ui.completed')}</span>;
      case 'in-progress':
        return <span className="status-badge in-progress">⏳ {t('ui.inProgress')}</span>;
      case 'locked':
        return <span className="status-badge locked">🔒 {t('ui.locked')}</span>;
      default:
        return null;
    }
  };

  const isActionable = status === 'available' || status === 'in-progress';
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed' || status === 'skipped';

  return (
    <div className={`section-card ${status}`}>
      <div className="section-header">
        <div className="section-icon-title">
          <span className="section-icon" role="img" aria-label={t(section.nameKey)}>
            {section.icon}
          </span>
          <div className="section-text">
            <h3 className="section-name">{t(section.nameKey)}</h3>
            {section.descriptionKey && (
              <p className="section-description">{t(section.descriptionKey)}</p>
            )}
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {status === 'in-progress' && progressPercent > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      )}

      {isActionable && (
        <div className="section-actions">
          <button 
            className="btn-start"
            onClick={handleStart}
            aria-label={status === 'in-progress' ? t('ui.continue') : t('ui.start')}
          >
            {status === 'in-progress' ? t('ui.continue') : t('ui.start')}
          </button>
          <button 
            className="btn-skip"
            onClick={handleSkip}
            aria-label={t('ui.iKnowThis')}
          >
            {t('ui.iKnowThis')}
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="section-actions">
          <button 
            className="btn-review"
            onClick={handleStart}
            aria-label="Review section"
          >
            Review
          </button>
        </div>
      )}

      {isLocked && (
        <div className="section-locked-message">
          Complete previous sections to unlock
        </div>
      )}
    </div>
  );
}

