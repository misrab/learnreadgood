/**
 * Course definitions for LearnReadGood
 */

import { Course } from '../types';

/**
 * Main reading course with structured sections
 */
export const readingCourse: Course = {
  id: 'reading-basics',
  nameKey: 'course.reading.name',
  descriptionKey: 'course.reading.description',
  sections: [
    {
      id: 'alphabet',
      nameKey: 'section.alphabet.name',
      descriptionKey: 'section.alphabet.description',
      icon: '🔤',
      order: 1,
      activities: [],
    },
    {
      id: 'common-words',
      nameKey: 'section.commonWords.name',
      descriptionKey: 'section.commonWords.description',
      icon: '📚',
      order: 2,
      activities: [],
    },
    {
      id: 'simple-sentences',
      nameKey: 'section.simpleSentences.name',
      descriptionKey: 'section.simpleSentences.description',
      icon: '📝',
      order: 3,
      activities: [],
    },
    {
      id: 'reading-practice',
      nameKey: 'section.readingPractice.name',
      descriptionKey: 'section.readingPractice.description',
      icon: '📖',
      order: 4,
      activities: [],
    },
  ],
};

/**
 * All available courses
 */
export const allCourses: Course[] = [readingCourse];

