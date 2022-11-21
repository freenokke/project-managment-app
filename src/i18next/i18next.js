import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/languages/en.json';
import ru from '../assets/languages/ru.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const langFromLocalStorage = localStorage.getItem('i18nextLng');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: langFromLocalStorage ? langFromLocalStorage : 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
