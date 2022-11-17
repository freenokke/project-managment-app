import { useState, useEffect, useMemo, useCallback } from 'react';
import { AccountMenu, LangSwitch } from '../../components';
import { Navbar, MobileNav, Button, IconButton, Tooltip } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hook';

const Header = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(window.scrollY);
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const toFixHeader = useMemo(() => {
    const isSignPage = /sign/.test(pathname);
    const isWelcomePage = pathname === '/';
    return !isSignPage && !isWelcomePage && pageYOffset > 0;
  }, [pageYOffset, pathname]);

  const closeNav = useCallback(() => {
    setOpenNav(false);
  }, []);

  const openNavHandle = useCallback(() => {
    setOpenNav(!openNav);
  }, [openNav]);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 720 && setOpenNav(false);
    const handleScroll = () => setPageYOffset(window.scrollY);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toFixHeader]);

  const navList = (
    <ul className="mt-7 mb-4 flex flex-col items-center gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      <Link to="/signin">
        <Button onClick={closeNav} variant="outlined" size="sm" className="inline-block max-w-max">
          {t('signIn')}
        </Button>
      </Link>
      <Link to="/signup">
        <Button onClick={closeNav} variant="gradient" size="sm" className="inline-bloc max-w-max">
          {t('signUp')}
        </Button>
      </Link>
    </ul>
  );

  const navListAuth = (
    <ul className="mt-7 mb-4 flex basis-full items-center gap-5 md:mb-0 md:mt-0 md:items-center md:gap-6">
      <Tooltip
        content={t('tooltip.createBoard')}
        className="bg-blue-gray-900 text-xs first-letter:capitalize"
      >
        <i className="material-icons cursor-pointer text-4xl md:text-2xl">note_add</i>
      </Tooltip>
      <AccountMenu classes="ml-auto" closeNav={closeNav} />
    </ul>
  );

  return (
    <Navbar
      shadow={true}
      className={`${
        toFixHeader && 'py-1 px-2 fixed top-0 shadow-teal-200 md:px-4 md:py-2'
      } mx-auto max-w-full font-sans text-[#7f7e8a] transition-all`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="order-2 cursor-pointer py-1.5 font-normal md:order-1">
          <span>Logo</span>
        </Link>
        <LangSwitch />
        <div className="hidden items-center gap-2 md:order-3 md:flex">
          {token ? navListAuth : navList}
        </div>
        <IconButton
          variant="text"
          className="order-3 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:order-3 md:hidden"
          ripple={false}
          onClick={openNavHandle}
        >
          {openNav ? (
            <i className="material-icons">close</i>
          ) : (
            <i className="material-icons">menu</i>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{token ? navListAuth : navList}</MobileNav>
    </Navbar>
  );
};

export default Header;
