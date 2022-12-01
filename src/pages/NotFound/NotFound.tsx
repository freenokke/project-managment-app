import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[100%] flex-grow pt-[10%] gap-[40px]">
      <div className="container w-[85%] sm:w-[60%] md:w-[500px] flex flex-col items-center gap-[30px] text-gray-700 text-center">
        <h1 className="text-[28px] md:text-[35px]">{t('notFound.title')}</h1>
        <p className="text-[18px] md:text-[24px] text-center">{t('notFound.text')}</p>
        <Link
          className="flex items-center gap-2 transition-colors cursor-pointer text-gray-500 hover:text-blue-500"
          to="/main"
        >
          <span className="material-icons">keyboard_backspace</span>
          {t('boardPage.backToBoardsList')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
