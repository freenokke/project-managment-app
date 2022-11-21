import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/languages/en.json';
import ru from '../assets/languages/ru.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
