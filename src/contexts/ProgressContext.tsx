/**
 * Progress Context for managing user learning progress
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, SectionProgress } from '../types';
import { storage } from '../storage';

/**
 * Context value interface
 */
interface ProgressContextValue {
  progress: UserProgress | null;
  isLoading: boolean;
  
  // Section management
  markSectionComplete: (sectionId: string) => void;
  markSectionSkipped: (sectionId: string) => void;
  isSectionComplete: (sectionId: string) => boolean;
  isSectionSkipped: (sectionId: string) => boolean;
  setCurrentSection: (sectionId: string) => void;
  
  // Activity management
  markActivityComplete: (sectionId: string, activityId: string) => void;
  isActivityComplete: (sectionId: string, activityId: string) => boolean;
  getSectionProgress: (sectionId: string) => SectionProgress | undefined;
  
  // Course params
  getCourseParam: (courseId: string, key: string) => string | undefined;
  setCourseParam: (courseId: string, key: string, value: string) => void;

  // Utility
  resetProgress: () => void;
  syncProgress: () => Promise<void>;
}

/**
 * Create the context
 */
const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

/**
 * Create initial progress object
 */
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

/**
 * Progress Provider Component
 */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const loaded = await storage.loadProgress();
        if (loaded) {
          setProgress(loaded);
        } else {
          // Create initial progress with current language from i18n
          const language = localStorage.getItem('lrg_language') || 'en';
          setProgress(createInitialProgress(language));
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
        // Create fresh progress on error
        const language = localStorage.getItem('lrg_language') || 'en';
        setProgress(createInitialProgress(language));
      } finally {
        setIsLoading(false);
      }
    }

    loadProgress();
  }, []);

  // Auto-save progress whenever it changes
  useEffect(() => {
    if (progress && !isLoading) {
      storage.saveProgress(progress).catch((error) => {
        console.error('Failed to save progress:', error);
      });
    }
  }, [progress, isLoading]);

  // Mark a section as complete
  const markSectionComplete = (sectionId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;
      
      const completedSections = [...prev.completedSections];
      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
      }
      
      // Remove from skipped if present
      const skippedSections = prev.skippedSections.filter(id => id !== sectionId);
      
      return {
        ...prev,
        completedSections,
        skippedSections,
      };
    });
  };

  // Mark a section as skipped ("I know this already")
  const markSectionSkipped = (sectionId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;
      
      const skippedSections = [...prev.skippedSections];
      if (!skippedSections.includes(sectionId)) {
        skippedSections.push(sectionId);
      }
      
      // Also mark as complete
      const completedSections = [...prev.completedSections];
      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
      }
      
      return {
        ...prev,
        completedSections,
        skippedSections,
      };
    });
  };

  // Check if section is complete
  const isSectionComplete = (sectionId: string): boolean => {
    return progress?.completedSections.includes(sectionId) || false;
  };

  // Check if section is skipped
  const isSectionSkipped = (sectionId: string): boolean => {
    return progress?.skippedSections.includes(sectionId) || false;
  };

  // Set current section
  const setCurrentSection = (sectionId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;
      
      // Initialize section progress if it doesn't exist
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
          [sectionId]: {
            ...sectionProgress,
            lastAccessedAt: Date.now(),
          },
        },
      };
    });
  };

  // Mark an activity as complete
  const markActivityComplete = (sectionId: string, activityId: string) => {
    setProgress((prev) => {
      if (!prev) return prev;
      
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
          [sectionId]: {
            ...sectionProgress,
            completedActivities,
            lastAccessedAt: Date.now(),
          },
        },
      };
    });
  };

  // Check if activity is complete
  const isActivityComplete = (sectionId: string, activityId: string): boolean => {
    return progress?.sectionProgress[sectionId]?.completedActivities.includes(activityId) || false;
  };

  // Get section progress
  const getSectionProgress = (sectionId: string): SectionProgress | undefined => {
    return progress?.sectionProgress[sectionId];
  };

  const getCourseParam = (courseId: string, key: string): string | undefined => {
    return progress?.courseParams?.[courseId]?.[key];
  };

  const setCourseParam = (courseId: string, key: string, value: string) => {
    setProgress((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        courseParams: {
          ...prev.courseParams,
          [courseId]: {
            ...(prev.courseParams?.[courseId] ?? {}),
            [key]: value,
          },
        },
      };
    });
  };

  // Reset all progress
  const resetProgress = () => {
    const language = progress?.language || localStorage.getItem('lrg_language') || 'en';
    setProgress(createInitialProgress(language));
  };

  // Sync progress (placeholder for future server sync)
  const syncProgress = async () => {
    // Future: implement server sync
    console.log('Sync progress (not yet implemented)');
  };

  const value: ProgressContextValue = {
    progress,
    isLoading,
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

/**
 * Custom hook to use progress context
 */
export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

