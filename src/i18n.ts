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
        },
        selectLanguage: 'Choose a language to learn to read:',
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
      nav: {
        overview: 'Overview',
        about: 'About',
        selectCourse: 'Select Course',
      },
      footer: {
        copyright: '© LearnReadGood.com 2026',
        terms: 'Terms',
        privacy: 'Privacy Policy',
      },
      ui: {
        start: 'Start',
        continue: 'Continue',
        iKnowThis: 'I know this already',
        review: 'Review',
        completed: 'Completed',
        locked: 'Locked',
        inProgress: 'In Progress',
        sectionLocked: 'Complete previous sections to unlock.',
        activitiesComingSoon: 'Activities coming soon.',
        sectionComplete: 'Section complete!',
        back: 'Back',
        next: 'Next',
        finish: 'Finish',
        replay: 'Play',
        activityExplore: 'Explore',
        activityRecognition: 'Recognition',
        activityMatch: 'Match',
        activityRead: 'Read',
        activityQuiz: 'Quiz',
        showTranslation: 'Show translation',
        hideTranslation: 'Hide translation',
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
        },
        selectLanguage: 'Choisissez une langue à apprendre à lire :',
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
      
      nav: {
        overview: 'Aperçu',
        about: 'À propos',
        selectCourse: 'Choisir un cours',
      },
      footer: {
        copyright: '© LearnReadGood.com 2026',
        terms: 'Conditions',
        privacy: 'Confidentialité',
      },
      ui: {
        start: 'Commencer',
        continue: 'Continuer',
        iKnowThis: 'Je sais déjà',
        review: 'Revoir',
        completed: 'Terminé',
        locked: 'Verrouillé',
        inProgress: 'En Cours',
        sectionLocked: 'Complète les sections précédentes pour débloquer.',
        activitiesComingSoon: 'Activités bientôt disponibles.',
        sectionComplete: 'Section terminée !',
        back: 'Retour',
        next: 'Suivant',
        finish: 'Terminer',
        replay: 'Écouter',
        activityExplore: 'Explorer',
        activityRecognition: 'Reconnaissance',
        activityMatch: 'Associer',
        activityRead: 'Lire',
        activityQuiz: 'Quiz',
        showTranslation: 'Voir la traduction',
        hideTranslation: 'Cacher la traduction',
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
        },
        selectLanguage: 'اختر لغة لتعلم القراءة:',
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
      
      nav: {
        overview: 'نظرة عامة',
        about: 'حول',
        selectCourse: 'اختر الدورة',
      },
      footer: {
        copyright: '© LearnReadGood.com 2026',
        terms: 'الشروط',
        privacy: 'الخصوصية',
      },
      ui: {
        start: 'ابدأ',
        continue: 'استمر',
        iKnowThis: 'أعرف هذا بالفعل',
        review: 'مراجعة',
        completed: 'مكتمل',
        locked: 'مقفل',
        inProgress: 'قيد التقدم',
        sectionLocked: 'أكمل الأقسام السابقة للفتح.',
        activitiesComingSoon: 'الأنشطة قريباً.',
        sectionComplete: 'اكتمل القسم!',
        back: 'رجوع',
        next: 'التالي',
        finish: 'إنهاء',
        replay: 'تشغيل',
        activityExplore: 'استكشاف',
        activityRecognition: 'تعرّف',
        activityMatch: 'مطابقة',
        activityRead: 'قراءة',
        activityQuiz: 'اختبار',
        showTranslation: 'عرض الترجمة',
        hideTranslation: 'إخفاء الترجمة',
      }
    }
  }
}

const supportedLanguages = ['en', 'fr', 'ar']
const browserLang = navigator.language.split('-')[0]
const savedLanguage = localStorage.getItem('lrg_language') ||
  (supportedLanguages.includes(browserLang) ? browserLang : 'en')

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

