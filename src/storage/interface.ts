/**
 * Storage abstraction layer for user progress
 * Allows switching between localStorage (current) and API storage (future)
 */

import { UserProgress } from '../types';

/**
 * Interface for storage adapters
 */
export interface StorageAdapter {
  /**
   * Save user progress to storage
   */
  saveProgress(progress: UserProgress): Promise<void>;

  /**
   * Load user progress from storage
   * Returns null if no progress exists
   */
  loadProgress(): Promise<UserProgress | null>;

  /**
   * Sync local progress to server (optional, for future use)
   */
  syncToServer?(): Promise<void>;

  /**
   * Clear all local progress data
   */
  clearLocal(): Promise<void>;
}

