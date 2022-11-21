import { useState, useCallback, FC } from 'react';
import i18n from '../../i18next/i18next';
import enFlag from '../../assets/images/us_uk_default.png';
import ruFlag from '../../assets/images/ru_default.png';
import { useTranslation } from 'react-i18next';

const LangSwitch: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useTranslation().i18n;

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
    <div className="relative order-1 md:order-2 md:ml-auto">
      <div
        className={`${
          !menuOpen ? 'scale-0' : ''
        } text-md absolute left-8 flex w-16 items-center justify-center gap-1 rounded border shadow-md transition-transform md:-left-18`}
      >
        <span
          onClick={changeLangRU}
          className={`${language === 'ru' && 'scale-105 text-blue-700'} cursor-pointer text-xs`}
        >
          RU
        </span>
        |
        <span
          onClick={changeLangEN}
          className={`${language === 'en' && 'scale-105 text-blue-700'} cursor-pointer text-xs`}
        >
          EN
        </span>
      </div>
      <div className="flex">
        <span onClick={showOptions} className="relative material-icons cursor-pointer md:mr-8">
          language
        </span>
        <img
          src={`${language === 'en' ? enFlag : ruFlag}`}
          alt="flag"
          className="w-[18px] h-[18px] object-contain absolute -bottom-[6px] -right-[10px] md:right-[22px]"
        />
      </div>
    </div>
  );
};

export default LangSwitch;
