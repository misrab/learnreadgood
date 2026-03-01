import { useProgress } from '../contexts/ProgressContext'
import { readingCourse } from '../data/courses'
import { SectionStatus } from '../types'

export function useSectionStatus() {
  const { isSectionComplete, isSectionSkipped, getSectionProgress } = useProgress()

  const getSectionStatus = (sectionId: string, order: number): SectionStatus => {
    if (isSectionComplete(sectionId)) {
      return isSectionSkipped(sectionId) ? 'skipped' : 'completed'
    }
    if (order > 1) {
      const prev = readingCourse.sections[order - 2]
      if (prev && !isSectionComplete(prev.id)) return 'locked'
    }
    const progress = getSectionProgress(sectionId)
    if (progress && progress.completedActivities.length > 0) return 'in-progress'
    return 'available'
  }

  return { getSectionStatus }
}
