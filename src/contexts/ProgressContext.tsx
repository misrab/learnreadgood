import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, SectionProgress } from '../types';
import { storage } from '../storage';

interface ProgressContextValue {
  progress: UserProgress;
  markSectionComplete: (sectionId: string) => void;
  markSectionSkipped: (sectionId: string) => void;
  isSectionComplete: (sectionId: string) => boolean;
  isSectionSkipped: (sectionId: string) => boolean;
  setCurrentSection: (sectionId: string) => void;
  markActivityComplete: (sectionId: string, activityId: string) => void;
  isActivityComplete: (sectionId: string, activityId: string) => boolean;
  getSectionProgress: (sectionId: string) => SectionProgress | undefined;
  getCourseParam: (courseId: string, key: string) => string | undefined;
  setCourseParam: (courseId: string, key: string, value: string) => void;
  resetProgress: () => void;
  syncProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

function createInitialProgress(language: string): UserProgress {
  return {
    language,
    completedSections: [],
    skippedSections: [],
    sectionProgress: {},
    courseParams: {},
    createdAt: Date.now(),
    version: 1,
  };
}

function loadFromLocalStorage(): UserProgress {
  try {
    const raw = localStorage.getItem('lrg_user_progress');
    if (raw) return JSON.parse(raw) as UserProgress;
  } catch { /* ignore corrupt data */ }
  return createInitialProgress(localStorage.getItem('lrg_language') || 'en');
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadFromLocalStorage);

  useEffect(() => {
    storage.saveProgress(progress).catch((error) => {
      console.error('Failed to save progress:', error);
    });
  }, [progress]);

  const markSectionComplete = (sectionId: string) => {
    setProgress((prev) => {
      const completedSections = [...prev.completedSections];
      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
      }
      const skippedSections = prev.skippedSections.filter(id => id !== sectionId);
      return { ...prev, completedSections, skippedSections };
    });
  };

  const markSectionSkipped = (sectionId: string) => {
    setProgress((prev) => {
      const skippedSections = [...prev.skippedSections];
      if (!skippedSections.includes(sectionId)) {
        skippedSections.push(sectionId);
      }
      const completedSections = [...prev.completedSections];
      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
      }
      return { ...prev, completedSections, skippedSections };
    });
  };

  const isSectionComplete = (sectionId: string): boolean =>
    progress.completedSections.includes(sectionId);

  const isSectionSkipped = (sectionId: string): boolean =>
    progress.skippedSections.includes(sectionId);

  const setCurrentSection = (sectionId: string) => {
    setProgress((prev) => {
      const sectionProgress = prev.sectionProgress[sectionId] || {
        completedActivities: [],
        lastAccessedAt: Date.now(),
        startedAt: Date.now(),
      };
      return {
        ...prev,
        currentSection: sectionId,
        sectionProgress: {
          ...prev.sectionProgress,
          [sectionId]: { ...sectionProgress, lastAccessedAt: Date.now() },
        },
      };
    });
  };

  const markActivityComplete = (sectionId: string, activityId: string) => {
    setProgress((prev) => {
      const sectionProgress = prev.sectionProgress[sectionId] || {
        completedActivities: [],
        lastAccessedAt: Date.now(),
        startedAt: Date.now(),
      };
      const completedActivities = [...sectionProgress.completedActivities];
      if (!completedActivities.includes(activityId)) {
        completedActivities.push(activityId);
      }
      return {
        ...prev,
        sectionProgress: {
          ...prev.sectionProgress,
          [sectionId]: { ...sectionProgress, completedActivities, lastAccessedAt: Date.now() },
        },
      };
    });
  };

  const isActivityComplete = (sectionId: string, activityId: string): boolean =>
    progress.sectionProgress[sectionId]?.completedActivities.includes(activityId) || false;

  const getSectionProgress = (sectionId: string): SectionProgress | undefined =>
    progress.sectionProgress[sectionId];

  const getCourseParam = (courseId: string, key: string): string | undefined =>
    progress.courseParams?.[courseId]?.[key];

  const setCourseParam = (courseId: string, key: string, value: string) => {
    setProgress((prev) => ({
      ...prev,
      courseParams: {
        ...prev.courseParams,
        [courseId]: { ...(prev.courseParams?.[courseId] ?? {}), [key]: value },
      },
    }));
  };

  const resetProgress = () => {
    setProgress(createInitialProgress(progress.language || localStorage.getItem('lrg_language') || 'en'));
  };

  const syncProgress = async () => {
    // Future: implement server sync
  };

  const value: ProgressContextValue = {
    progress,
    markSectionComplete,
    markSectionSkipped,
    isSectionComplete,
    isSectionSkipped,
    setCurrentSection,
    markActivityComplete,
    isActivityComplete,
    getSectionProgress,
    getCourseParam,
    setCourseParam,
    resetProgress,
    syncProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
