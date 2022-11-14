import { useState, useCallback } from 'react';
import i18n from '../../i18next/i18next';

const LangSwitch = () => {
  const currentLanguage = i18n.language;
  const [menuOpen, setMenuOpen] = useState(false);

  const showOptions = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const changeLangRU = useCallback(() => {
    i18n.changeLanguage('ru');
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const changeLangEN = useCallback(() => {
    i18n.changeLanguage('en');
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <div className="ml-auto relative">
      <div
        className={`${
          !menuOpen ? 'scale-0' : ''
        } absolute left-8 mobile:-left-18 flex gap-1 border w-16 items-center justify-center shadow-md rounded transition-transform text-sm`}
      >
        <span
          onClick={changeLangRU}
          className={`${currentLanguage === 'ru' && 'text-blue-700 scale-110'} cursor-pointer`}
        >
          RU
        </span>
        |
        <span
          onClick={changeLangEN}
          className={`${currentLanguage === 'en' && 'text-blue-700 scale-110'} cursor-pointer`}
        >
          EN
        </span>
      </div>
      <div>
        <span onClick={showOptions} className={`material-icons cursor-pointer mobile:mr-5`}>
          language
        </span>
      </div>
    </div>
  );
};

export default LangSwitch;
