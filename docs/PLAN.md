# LearnReadGood Development Plan

## Overview
Transform learnreadgood into an interactive literacy learning platform with voice recording, section-based courses, and persistent progress tracking.

## Core Features
1. **Voice Recording & Transcription** - Record user speech with visual feedback for non-readers
2. **Section-Based Learning** - Structured course with completable sections
3. **Progress Persistence** - Browser-based storage with future server sync capability
4. **Skip Functionality** - "I know this already" to mark sections as complete

---

## 1. Data Model & Structure

### Core Entities

```typescript
// Course structure
interface Course {
  id: string;
  nameKey: string; // i18n key like 'course.reading'
  sections: Section[];
}

interface Section {
  id: string;
  nameKey: string; // i18n key like 'section.alphabet'
  order: number;
  activities: Activity[];
}

interface Activity {
  id: string;
  type: 'listen-repeat' | 'recognition' | 'quiz';
  content: any; // letter, word, sentence, etc.
}

// User progress (what gets persisted)
interface UserProgress {
  userId?: string; // null for anonymous, populated after login
  language: string; // current i18n language
  completedSections: Set<string>; // section IDs
  skippedSections: Set<string>; // sections marked as "already known"
  currentSection?: string;
  sectionProgress: {
    [sectionId: string]: {
      completedActivities: string[];
      lastAccessedAt: number;
    };
  };
  createdAt: number;
  lastSyncedAt?: number; // for server sync
}
```

---

## 2. Storage Abstraction Layer

Create a storage interface that works locally now, syncs to server later:

```typescript
// src/storage/interface.ts
interface StorageAdapter {
  saveProgress(progress: UserProgress): Promise<void>;
  loadProgress(): Promise<UserProgress | null>;
  syncToServer?(): Promise<void>; // Optional for future
  clearLocal(): Promise<void>;
}
```

**Implementation Strategy:**
- Start with `LocalStorageAdapter` using `localStorage`
- Sets/Gets serialized in localStorage
- Future: `ApiStorageAdapter` for server sync
- Switch adapters based on auth state

**Benefits:**
- Easy to swap localStorage for API calls later
- Can implement "sync on login" by calling `syncToServer()`
- Testable - can mock the storage layer

---

## 3. Speech Recording & Transcription

### Recording Hook

```typescript
interface UseVoiceRecordingResult {
  isRecording: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  audioLevel: number; // 0-100 for visual feedback
}
```

**Technologies:**
- MediaRecorder API for audio capture
- Web Speech API (SpeechRecognition) for transcription
- AudioContext for visualizations (waveform/level)

### Visual States for Non-Readers

```
RecordingState:
  - idle      → ⏺️ Big friendly button
  - recording → 🔴 Pulsing animation, waveform
  - processing → ⏳ Spinner/loading
  - success   → ✅ Green checkmark
  - error     → ❌ Red X, retry button
```

**Visual Hierarchy:**
1. **Idle:** Large circular button with microphone icon + subtle animation
2. **Recording:** Red pulsing circle, real-time waveform, volume meter
3. **Processing:** Animated spinner, "thinking" indicator
4. **Success:** Checkmark animation, optional replay button
5. **Error:** Shake animation, retry button

---

## 4. Course & Section Structure

### Initial Course Definition

```typescript
// src/data/courses.ts
export const readingCourse: Course = {
  id: 'reading-basics',
  nameKey: 'course.reading',
  sections: [
    {
      id: 'alphabet',
      nameKey: 'section.alphabet',
      order: 1,
      activities: [],
    },
    {
      id: 'common-words',
      nameKey: 'section.commonWords',
      order: 2,
      activities: [],
    },
    {
      id: 'simple-sentences',
      nameKey: 'section.simpleSentences',
      order: 3,
      activities: [],
    },
  ],
};
```

### Section Card Component

```
Visual representation:
┌─────────────────────────────┐
│ 🔤 The Alphabet         ✅  │ ← Completed
│ [Start] [I Know This]        │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 📚 Common Words         🔒  │ ← Locked
│                              │
└─────────────────────────────┘
```

---

## 5. Context/State Management

Use React Context to avoid prop drilling:

```typescript
// src/contexts/ProgressContext.tsx
interface ProgressContextValue {
  progress: UserProgress;
  markSectionComplete: (sectionId: string) => void;
  markSectionSkipped: (sectionId: string) => void;
  isSectionComplete: (sectionId: string) => boolean;
  isSectionSkipped: (sectionId: string) => boolean;
  resetProgress: () => void;
  syncProgress: () => Promise<void>;
}
```

**Features:**
- Load progress on mount
- Auto-save on changes
- Expose helper methods for components

---

## 6. Implementation Phases

### **Phase 1: Foundation** ⬅️ START HERE
1. ✅ Create data models (`src/types.ts`)
2. ✅ Implement storage abstraction layer
   - `src/storage/interface.ts`
   - `src/storage/localStorage.ts`
   - `src/storage/index.ts`
3. ✅ Set up Progress Context (`src/contexts/ProgressContext.tsx`)
4. ✅ Update i18n with course/section keys

### **Phase 2: UI Structure**
1. ✅ Create `SectionCard` component (icon, title, status badges)
2. ✅ Update `Home.jsx` to show section list
3. ✅ Add "I know this already" button with visual confirmation
4. ✅ Implement section navigation

### **Phase 3: Recording**
1. Create `useVoiceRecording` hook
2. Build `RecordButton` component with visual states
3. Add audio level visualization
4. Handle browser permissions gracefully

### **Phase 4: Activities**
1. Design first activity type (e.g., "repeat this letter")
2. Build activity flow (intro → record → feedback → next)
3. Track completion in progress context

### **Phase 5: Polish**
1. Animations and transitions
2. Error handling and offline support
3. Accessibility (keyboard navigation, ARIA labels)

### **Phase 6: Server Sync** (Future)
1. Implement `ApiStorageAdapter`
2. Add auth layer
3. Build sync logic (merge local + server progress)

---

## 7. File Structure

```
learnreadgood/
  src/
    types.ts                    # NEW: Core data models
    contexts/
      ProgressContext.tsx       # NEW: State management
    storage/
      interface.ts              # NEW: Storage abstraction
      localStorage.ts           # NEW: Current implementation
      apiAdapter.ts             # NEW: Future server sync
      index.ts                  # NEW: Export active adapter
    data/
      courses.ts                # NEW: Course definitions
    hooks/
      useVoiceRecording.ts      # NEW: Recording logic
    components/
      SectionCard.tsx           # NEW: Section display
      SectionCard.css           # NEW: Styling
      RecordButton.tsx          # NEW: Voice recording UI
      RecordButton.css          # NEW: Styling
      AudioVisualizer.tsx       # NEW: Waveform/level meter
      ActivityFlow.tsx          # NEW: Activity container
    pages/
      Home.jsx                  # MODIFY: Show sections
    i18n.js                     # MODIFY: Add new keys
```

---

## 8. Migration Path: Local → Server

When user signs up:

```typescript
async function onUserSignup(authToken: string) {
  // 1. Load local progress
  const localProgress = await storage.loadProgress();
  
  // 2. Send to server
  await fetch('/api/progress/import', {
    headers: { Authorization: `Bearer ${authToken}` },
    body: JSON.stringify(localProgress),
  });
  
  // 3. Switch to API storage
  storage = new ApiStorageAdapter(authToken);
  
  // 4. Optional: clear local storage
  await localStorage.clearLocal();
}
```

---

## 9. Browser Compatibility Notes

- **Web Speech API:** Good support in Chrome/Edge, limited in Safari/Firefox
  - Fallback: Show message "Recording not supported, skip this section"
  - Alternative: Use Web Audio API + send to server for transcription
- **MediaRecorder:** Excellent support
- **localStorage:** Universal support

---

## 10. Key Design Principles

1. **Visual-First** - Icons and animations for non-readers
2. **Progressive Enhancement** - Works without recording, better with it
3. **Mobile-First** - Target smartphone users primarily
4. **Offline-Capable** - localStorage works offline
5. **Future-Proof** - Easy to add auth and server sync
6. **Accessible** - ARIA labels, keyboard navigation, high contrast

---

## Next Steps

1. ✅ Create this plan document
2. ✅ Implement Phase 1 (Foundation)
3. ✅ Implement Phase 2 (UI Structure)
4. Test and iterate
5. Move to Phase 3 (Recording)

