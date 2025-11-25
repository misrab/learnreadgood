import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appName: 'LearnReadGood'
    }
  },
  es: {
    translation: {
      appName: 'AprenderLeerBien'
    }
  },
  fr: {
    translation: {
      appName: 'ApprendreLireBien'
    }
  },
  ar: {
    translation: {
      appName: 'تعلم القراءة جيداً'
    }
  },
  zh: {
    translation: {
      appName: '学习阅读'
    }
  },
  hi: {
    translation: {
      appName: 'पढ़ना सीखें'
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

