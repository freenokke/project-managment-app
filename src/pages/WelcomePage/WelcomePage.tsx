import { useTranslation } from 'react-i18next';
import { Button } from '@material-tailwind/react';
import HeroSectionSVG from './HeroSectionSVG';
import OverviewSectionSVG from './OverviewSectionSVG';
import { useAppSelector } from '../../hooks/redux.hooks';
import { Navigate } from 'react-router-dom';

const WelcomePage = () => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return (
      <div className="flex-grow">
        {/* Hero section start */}
        <div className="container flex flex-col items-center font-sans lg:relative lg:flex-row lg:items-start lg:pt-9">
          <div className="flex flex-col flex-grow lg:basis-2/4">
            <h1 className="font-bold text-center my-5 max-w-lg text-4xl md:text-5xl lg:mb-14 lg:max-w-full lg:text-start xl:text-7xl">
              {t('hero.title')}
            </h1>
            <p className={`text-gray-500 mb-10 hidden lg:block`}>{t('hero.subTitle')}</p>
          </div>
          <HeroSectionSVG />
          <div className="relative flex items-center justify-center -top-18 lg:absolute lg:bottom-0 lg:top-auto">
            <Button variant="gradient" size="lg" className="max-w-max inline-flex items-center ">
              {t('hero.buttonText')}
              <i className="material-icons">expand_more</i>
            </Button>
            <span className={`text-gray-500 ml-2 hidden lg:block`}>- {t('hero.notice')}</span>
          </div>
        </div>
        {/* Overview section start */}
        <div className="relative font-sans lg:pt-14">
          <h2 className="absolute text-white top-[5%] left-1/2 -translate-x-2/4 text-2xl font-bold sm:text-3xl sm:top-[10%] lg:text-5xl lg:top-[15%]">
            Some header
          </h2>
          <OverviewSectionSVG />
          <div className="absolute bottom-0 left-1/2 -translate-x-2/4 w-[90%] h-[75%] rounded-t-xl bg-white xl:w-2/3"></div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/main" replace={true} />;
  }
};

export default WelcomePage;
