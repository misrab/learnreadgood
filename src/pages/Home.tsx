import { useTranslation } from 'react-i18next';
import { useProgress } from '../contexts/ProgressContext';
import { readingCourse } from '../data/courses';
import { SectionCard } from '../components/SectionCard';
import { SectionStatus } from '../types';

export function Home() {
  const { t } = useTranslation();
  const { 
    isSectionComplete, 
    isSectionSkipped, 
    getSectionProgress,
    isLoading 
  } = useProgress();

  // Determine section status based on progress and prerequisites
  const getSectionStatus = (sectionId: string, order: number): SectionStatus => {
    if (isSectionComplete(sectionId)) {
      return isSectionSkipped(sectionId) ? 'skipped' : 'completed';
    }

    // Check if previous section is complete (for sequential unlocking)
    if (order > 1) {
      const previousSection = readingCourse.sections[order - 2];
      if (previousSection && !isSectionComplete(previousSection.id)) {
        return 'locked';
      }
    }

    // Check if section has been started
    const progress = getSectionProgress(sectionId);
    if (progress && progress.completedActivities.length > 0) {
      return 'in-progress';
    }

    return 'available';
  };

  const handleStartSection = (sectionId: string) => {
    // TODO: Navigate to section activity page (Phase 3)
    console.log('Starting section:', sectionId);
    alert(`Starting "${sectionId}" - Activity flow coming in Phase 3!`);
  };

  if (isLoading) {
    return (
      <section id="home" className="section">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading your progress...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>{t('course.reading.name')}</h2>
        <p style={{ marginBottom: '32px', color: '#666' }}>
          {t('course.reading.description')}
        </p>

        <div className="sections-list">
          {readingCourse.sections.map((section) => {
            const status = getSectionStatus(section.id, section.order);
            return (
              <SectionCard
                key={section.id}
                section={section}
                status={status}
                onStart={handleStartSection}
              />
            );
          })}
        </div>
      </div>
    </section>
  )
}
