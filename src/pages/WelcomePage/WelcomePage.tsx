import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();
  return <div className="flex h-[2000px] items-center justify-center">{t('title')}</div>;
};

export default WelcomePage;
