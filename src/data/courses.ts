import { Course } from '../types';
import { arAlphabet } from './alphabets/ar';
import { enAlphabet } from './alphabets/en';
import { frAlphabet } from './alphabets/fr';

export type ReadingLanguage = 'ar' | 'en' | 'fr';

const alphabetData: Record<ReadingLanguage, { letters: typeof arAlphabet; lang: string; dir: 'ltr' | 'rtl' }> = {
  ar: { letters: arAlphabet, lang: 'ar-SA', dir: 'rtl' },
  en: { letters: enAlphabet, lang: 'en-US', dir: 'ltr' },
  fr: { letters: frAlphabet, lang: 'fr-FR', dir: 'ltr' },
};

export function buildReadingCourse(targetLanguage: ReadingLanguage = 'ar'): Course {
  const { letters, lang, dir } = alphabetData[targetLanguage] ?? alphabetData['ar'];
  return {
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
        activities: [
          { id: 'alphabet-explore',      type: 'explore',      content: { letters, lang, dir } },
          { id: 'alphabet-recognition',  type: 'recognition',  content: { letters, lang, dir } },
          { id: 'alphabet-quiz',         type: 'quiz',         content: { letters, lang, dir } },
        ],
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
}

export const READING_COURSE_ID = 'reading-basics';
export const READING_LANGUAGES: { code: ReadingLanguage; flag: string; label: string }[] = [
  { code: 'ar', flag: '🇸🇦', label: 'Arabic' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'French' },
];

/**
 * All available course IDs (for sidebar navigation)
 */
export const allCourseIds = [READING_COURSE_ID];

