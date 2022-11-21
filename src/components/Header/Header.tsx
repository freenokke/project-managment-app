import { useState, useEffect, useMemo, useCallback } from 'react';
import { LangSwitch, NavList } from '../../components';
import { Navbar, MobileNav, IconButton } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';

const Header = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(window.scrollY);
  const { pathname } = useLocation();
  const isSignPage = /sign/.test(pathname);
  const isWelcomePage = pathname === '/';

  const stickHeader = useMemo(() => {
    return !isSignPage && !isWelcomePage && pageYOffset > 0;
  }, [isSignPage, isWelcomePage, pageYOffset]);

  const closeNav = useCallback(() => {
    setOpenNav(false);
  }, []);

  const openNavToggle = useCallback(() => {
    setOpenNav(!openNav);
  }, [openNav]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 720) setOpenNav(false);
    };
    const handleScroll = () => setPageYOffset(window.scrollY);
    window.addEventListener('resize', handleResize);
    if (!isSignPage && !isWelcomePage) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stickHeader, isSignPage, isWelcomePage]);

  return (
    <Navbar
      shadow={true}
      className={`${
        stickHeader && 'py-1 px-2 sticky top-0 shadow-teal-200 md:px-4 md:py-2'
      } mx-auto max-w-full font-sans bg-opacity-60 backdrop-blur text-[#7f7e8a] transition-all z-[100]`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to={token ? '/main' : '/'}
          className="order-2 cursor-pointer py-1.5 font-normal md:order-1"
        >
          <span>Logo</span>
        </Link>
        <LangSwitch />
        <div className="hidden items-center gap-2 md:order-3 md:flex">
          <NavList closeNav={closeNav} token={token} />
        </div>
        <IconButton
          variant="text"
          className="order-3 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:order-3 md:hidden"
          ripple={false}
          onClick={openNavToggle}
        >
          {openNav ? (
            <i className="material-icons">close</i>
          ) : (
            <i className="material-icons">menu</i>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <NavList closeNav={closeNav} token={token} />
      </MobileNav>
    </Navbar>
  );
};

export default Header;
