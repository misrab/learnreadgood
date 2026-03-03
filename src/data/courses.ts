import { Course } from '../types';
import { arAlphabet } from './alphabets/ar';
import { enAlphabet } from './alphabets/en';
import { frAlphabet } from './alphabets/fr';
import { arWords } from './words/ar';
import { enWords } from './words/en';
import { frWords } from './words/fr';
import { arSentences } from './sentences/ar';
import { enSentences } from './sentences/en';
import { frSentences } from './sentences/fr';
import { arPassages } from './passages/ar';
import { enPassages } from './passages/en';
import { frPassages } from './passages/fr';

export type ReadingLanguage = 'ar' | 'en' | 'fr';

const langConfig: Record<ReadingLanguage, { lang: string; dir: 'ltr' | 'rtl' }> = {
  ar: { lang: 'ar-SA', dir: 'rtl' },
  en: { lang: 'en-US', dir: 'ltr' },
  fr: { lang: 'fr-FR', dir: 'ltr' },
};

const alphabetData = { ar: arAlphabet, en: enAlphabet, fr: frAlphabet };
const wordData = { ar: arWords, en: enWords, fr: frWords };
const sentenceData = { ar: arSentences, en: enSentences, fr: frSentences };
const passageData = { ar: arPassages, en: enPassages, fr: frPassages };

export function buildReadingCourse(targetLanguage: ReadingLanguage = 'ar'): Course {
  const { lang, dir } = langConfig[targetLanguage];
  const letters = alphabetData[targetLanguage];
  const words = wordData[targetLanguage];
  const sentences = sentenceData[targetLanguage];
  const passages = passageData[targetLanguage];

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
          { id: 'alphabet-explore',     type: 'explore',     content: { letters, lang, dir } },
          { id: 'alphabet-recognition', type: 'recognition', content: { letters, lang, dir } },
          { id: 'alphabet-quiz',        type: 'quiz',        content: { letters, lang, dir } },
        ],
      },
      {
        id: 'common-words',
        nameKey: 'section.commonWords.name',
        descriptionKey: 'section.commonWords.description',
        icon: '📚',
        order: 2,
        activities: [
          { id: 'words-explore', type: 'word-explore', content: { words, lang, dir } },
          { id: 'words-match',   type: 'word-match',   content: { words, lang, dir } },
          { id: 'words-quiz',    type: 'word-quiz',     content: { words, lang, dir } },
        ],
      },
      {
        id: 'simple-sentences',
        nameKey: 'section.simpleSentences.name',
        descriptionKey: 'section.simpleSentences.description',
        icon: '📝',
        order: 3,
        activities: [
          { id: 'sentences-explore', type: 'sentence-explore', content: { sentences, lang, dir } },
          { id: 'sentences-match',   type: 'sentence-match',   content: { sentences, lang, dir } },
          { id: 'sentences-quiz',    type: 'sentence-quiz',     content: { sentences, lang, dir } },
        ],
      },
      {
        id: 'reading-practice',
        nameKey: 'section.readingPractice.name',
        descriptionKey: 'section.readingPractice.description',
        icon: '📖',
        order: 4,
        activities: [
          { id: 'passages-read', type: 'passage-read', content: { passages, lang, dir } },
          { id: 'passages-quiz', type: 'passage-quiz', content: { passages, lang, dir } },
        ],
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

export const allCourseIds = [READING_COURSE_ID];
