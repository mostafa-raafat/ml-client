import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import enLocalesErrors from './en/errors.json';
import arLocalesErrors from './ar/errors.json';

// ----------------------------------------------------------------------

let lng = 'en';

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'en';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { errors: enLocalesErrors },
      ar: { errors: arLocalesErrors },
    },
    lng,
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
