import { useTranslation } from 'react-i18next';
import { Button } from '@material-tailwind/react';
import HeroSectionSVG from './HeroSectionSVG';
import OverviewSectionSVG from './OverviewSectionSVG';
import { useAppSelector } from '../../hooks/redux.hooks';
import { Navigate } from 'react-router-dom';
import { useCallback } from 'react';
import cloudIcon from '../../assets/images/cloud.svg';
import crossPlatformIcon from '../../assets/images/crossplatform.svg';
import jsIcon from '../../assets/images/js.svg';
import appImg from '../../assets/images/app.png';

const WelcomePage = () => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);

  const onClickHandler = useCallback(() => {
    window.scrollBy({
      behavior: 'smooth',
      top: 700,
    });
  }, []);

  if (!token) {
    return (
      <div className="flex-grow">
        {/* Hero section start */}
        <div className="container flex flex-col items-center font-sans lg:relative lg:flex-row lg:items-start lg:pt-9">
          <div className="flex flex-col flex-grow lg:basis-2/4">
            <h1 className="font-bold text-center my-5 max-w-lg text-4xl md:text-5xl lg:mb-14 lg:max-w-full lg:text-start xl:text-7xl">
              {t('hero.title')}
            </h1>
            <p className={`text-gray-500 w-max text-xl mb-10 hidden lg:block`}>
              {t('hero.subTitle')}
            </p>
          </div>
          <HeroSectionSVG />
          <div className="relative flex items-center justify-center -top-18 lg:absolute lg:bottom-0 lg:top-auto">
            <Button
              onClick={onClickHandler}
              variant="gradient"
              size={window.innerWidth < 580 ? 'sm' : 'lg'}
              className="max-w-max inline-flex items-center"
            >
              {t('hero.buttonText')}
              <i className="material-icons">expand_more</i>
            </Button>
          </div>
        </div>
        {/* Overview section start */}
        <div className="relative font-sans lg:pt-14">
          <h2 className="absolute w-max text-white left-1/2 -translate-x-2/4 text-xl font-bold sm:text-3xl lg:text-5xl lg:top-[15%]">
            {t('overView.title')}
          </h2>
          <OverviewSectionSVG />
          <div className="absolute bottom-0 left-1/2 -translate-x-2/4 w-[95%] h-max rounded-t-xl bg-white overflow-hidden md:w-[90%]">
            <img src={appImg} alt="app" className="w-full h-full object-contain" />
          </div>
        </div>
        {/* WhatUse section start */}
        <div className="container pt-[10%] pb-[15%]">
          <div className="flex flex-col items-center justify-center gap-8 md:px-20 lg:flex-row">
            <div className="basis-[50%]">
              <h2 className="text-black text-center text-2xl font-bold sm:text-5xl sm:top-[10%] lg:text-left lg:top-[15%] lg:text-6xl xl:text-7xl">
                {t('whatUse.title')}
              </h2>
            </div>
            <div className="basis-[50%]">
              <p className="text-gray-500 text-center text-base sm:text-xl lg:text-left lg:text-2xl">
                {t('whatUse.text')}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-10 text-gray-500 mt-16 md:flex-row md:justify-between md:mt-32">
            <div className="flex flex-col items-center gap-1 max-w-max md:max-w-[150px] md:text-xl lg:max-w-[220px]">
              <div className="p-3 rounded-full bg-yellow-50">
                <img src={crossPlatformIcon} alt="crossPlatformIcon" />
              </div>
              <h3 className="text-black text-center font-semibold">{t('whatUse.crossTitle')}</h3>
              <p className="text-center">{t('whatUse.crossSubtitle')}</p>
            </div>
            <div className="flex flex-col items-center gap-1 max-w-max md:max-w-[150px] md:text-xl lg:max-w-[220px]">
              <div className="p-3 rounded-full bg-red-50">
                <img src={cloudIcon} alt="cloudIcon" />
              </div>
              <h3 className="text-black text-center font-semibold">{t('whatUse.cloudTitle')}</h3>
              <p className="text-center">{t('whatUse.cloudSubtitle')}</p>
            </div>
            <div className="flex flex-col items-center gap-1 max-w-max md:max-w-[150px] md:text-xl lg:max-w-[220px]">
              <div className="p-3 rounded-full bg-blue-50">
                <img src={jsIcon} alt="jsIcon" />
              </div>
              <h3 className="text-black text-center font-semibold">{t('whatUse.jsTitle')}</h3>
              <p className="text-center">{t('whatUse.jsSubtitle')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/main" replace={true} />;
  }
};

export default WelcomePage;
