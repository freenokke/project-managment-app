import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className="w-full h-[100%] flex-grow pt-[100px] gap-[40px]">
      <div className="container w-[85%] sm:w-[60%] md:w-[500px] flex flex-col items-center gap-[30px] text-gray-700 text-center">
        <h1 className="text-[28px] md:text-[35px]">{t('loadingData.error')}</h1>
        <p className="text-[18px] md:text-[24px] text-center">{t('loadingData.text')}</p>
        <button
          className="flex items-center gap-2 transition-colors cursor-pointer text-gray-500 hover:text-blue-500"
          onClick={reloadPage}
        >
          <span className="material-icons">refresh</span>
          {t('loadingData.button')}
        </button>
      </div>
    </div>
  );
};

export default Error;
