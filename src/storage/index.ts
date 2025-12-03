/**
 * Storage module entry point
 * Exports the active storage adapter
 */

import { StorageAdapter } from './interface';
import { LocalStorageAdapter } from './localStorage';

/**
 * Active storage adapter
 * Currently using localStorage, can be swapped for API adapter in the future
 */
export const storage: StorageAdapter = new LocalStorageAdapter();

/**
 * Re-export types for convenience
 */
export type { StorageAdapter } from './interface';

