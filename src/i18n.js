import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appName: 'LearnReadGood',
      
      // Courses
      course: {
        reading: {
          name: 'Reading Basics',
          description: 'Learn to read from the alphabet to sentences'
        }
      },
      
      // Sections
      section: {
        alphabet: {
          name: 'The Alphabet',
          description: 'Learn all the letters'
        },
        commonWords: {
          name: 'Common Words',
          description: 'Learn frequently used words'
        },
        simpleSentences: {
          name: 'Simple Sentences',
          description: 'Practice reading sentences'
        },
        readingPractice: {
          name: 'Reading Practice',
          description: 'Read longer texts'
        }
      },
      
      // UI elements
      ui: {
        start: 'Start',
        continue: 'Continue',
        iKnowThis: 'I know this already',
        completed: 'Completed',
        locked: 'Locked',
        inProgress: 'In Progress'
      }
    }
  },
  fr: {
    translation: {
      appName: 'ApprendreLireBien',
      
      course: {
        reading: {
          name: 'Lecture de Base',
          description: "Apprendre à lire de l'alphabet aux phrases"
        }
      },
      
      section: {
        alphabet: {
          name: "L'Alphabet",
          description: 'Apprends toutes les lettres'
        },
        commonWords: {
          name: 'Mots Courants',
          description: 'Apprends les mots fréquents'
        },
        simpleSentences: {
          name: 'Phrases Simples',
          description: 'Pratique la lecture de phrases'
        },
        readingPractice: {
          name: 'Pratique de Lecture',
          description: 'Lis des textes plus longs'
        }
      },
      
      ui: {
        start: 'Commencer',
        continue: 'Continuer',
        iKnowThis: 'Je sais déjà',
        completed: 'Terminé',
        locked: 'Verrouillé',
        inProgress: 'En Cours'
      }
    }
  },
  ar: {
    translation: {
      appName: 'تعلم القراءة جيداً',
      
      course: {
        reading: {
          name: 'أساسيات القراءة',
          description: 'تعلم القراءة من الحروف إلى الجمل'
        }
      },
      
      section: {
        alphabet: {
          name: 'الحروف الأبجدية',
          description: 'تعلم جميع الحروف'
        },
        commonWords: {
          name: 'الكلمات الشائعة',
          description: 'تعلم الكلمات المستخدمة بكثرة'
        },
        simpleSentences: {
          name: 'جمل بسيطة',
          description: 'تدرب على قراءة الجمل'
        },
        readingPractice: {
          name: 'ممارسة القراءة',
          description: 'اقرأ نصوصاً أطول'
        }
      },
      
      ui: {
        start: 'ابدأ',
        continue: 'استمر',
        iKnowThis: 'أعرف هذا بالفعل',
        completed: 'مكتمل',
        locked: 'مقفل',
        inProgress: 'قيد التقدم'
      }
    }
  }
}

const savedLanguage = localStorage.getItem('lrg_language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

