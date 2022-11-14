import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();
  return <div className="h-screen flex justify-center items-center">{t('title')}</div>;
};

export default WelcomePage;
