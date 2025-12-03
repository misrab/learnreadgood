/**
 * Core data models for LearnReadGood
 */

/**
 * Activity types available in the learning platform
 */
export type ActivityType = 'listen-repeat' | 'recognition' | 'quiz';

/**
 * A single learning activity within a section
 */
export interface Activity {
  id: string;
  type: ActivityType;
  content: any; // Flexible content structure based on activity type
}

/**
 * A section within a course (e.g., "The Alphabet", "Common Words")
 */
export interface Section {
  id: string;
  nameKey: string; // i18n translation key
  descriptionKey?: string; // Optional i18n description key
  icon: string; // Emoji or icon identifier
  order: number;
  activities: Activity[];
}

/**
 * A complete course (e.g., "Reading Basics")
 */
export interface Course {
  id: string;
  nameKey: string; // i18n translation key
  descriptionKey?: string; // Optional i18n description key
  sections: Section[];
}

/**
 * Progress tracking for a specific section
 */
export interface SectionProgress {
  completedActivities: string[]; // Array of activity IDs
  lastAccessedAt: number; // Timestamp
  startedAt: number; // Timestamp when section was first started
}

/**
 * Complete user progress data (persisted to storage)
 */
export interface UserProgress {
  userId?: string; // null/undefined for anonymous users, populated after login
  language: string; // Current i18n language code
  completedSections: string[]; // Array of section IDs marked as complete
  skippedSections: string[]; // Array of section IDs marked as "already known"
  currentSection?: string; // ID of section currently in progress
  sectionProgress: {
    [sectionId: string]: SectionProgress;
  };
  createdAt: number; // Timestamp when progress was first created
  lastSyncedAt?: number; // Timestamp of last server sync (for future use)
  version: number; // Schema version for future migrations
}

/**
 * Status of a section from user's perspective
 */
export type SectionStatus = 
  | 'locked'      // Not yet available (prerequisite not met)
  | 'available'   // Can be started
  | 'in-progress' // Started but not completed
  | 'completed'   // All activities finished
  | 'skipped';    // Marked as "I know this already"

/**
 * Helper type for section with computed status
 */
export interface SectionWithStatus extends Section {
  status: SectionStatus;
  progress?: SectionProgress;
}

