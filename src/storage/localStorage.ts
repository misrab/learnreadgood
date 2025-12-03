/**
 * LocalStorage implementation of the StorageAdapter interface
 */

import { StorageAdapter } from './interface';
import { UserProgress } from '../types';

const STORAGE_KEY = 'lrg_user_progress';
const STORAGE_VERSION = 1;

/**
 * LocalStorage adapter for storing user progress in browser
 */
export class LocalStorageAdapter implements StorageAdapter {
  /**
   * Save user progress to localStorage
   */
  async saveProgress(progress: UserProgress): Promise<void> {
    try {
      const serialized = JSON.stringify({
        ...progress,
        version: STORAGE_VERSION,
      });
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
      throw new Error('Failed to save progress');
    }
  }

  /**
   * Load user progress from localStorage
   */
  async loadProgress(): Promise<UserProgress | null> {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return null;
      }

      const parsed = JSON.parse(serialized);
      
      // Handle version migrations if needed
      if (parsed.version !== STORAGE_VERSION) {
        return this.migrateProgress(parsed);
      }

      return parsed as UserProgress;
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
      return null;
    }
  }

  /**
   * Clear all local storage data
   */
  async clearLocal(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      throw new Error('Failed to clear local data');
    }
  }

  /**
   * Migrate progress data between versions
   * @private
   */
  private migrateProgress(oldProgress: any): UserProgress {
    // For now, just ensure required fields exist
    return {
      userId: oldProgress.userId,
      language: oldProgress.language || 'en',
      completedSections: oldProgress.completedSections || [],
      skippedSections: oldProgress.skippedSections || [],
      currentSection: oldProgress.currentSection,
      sectionProgress: oldProgress.sectionProgress || {},
      createdAt: oldProgress.createdAt || Date.now(),
      lastSyncedAt: oldProgress.lastSyncedAt,
      version: STORAGE_VERSION,
    };
  }
}

