import { useState, useEffect } from 'react';
import { LangSwitch } from '../../components';
import { Navbar, MobileNav, Button, IconButton } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 576 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col items-center gap-2 mobile:mb-0 mobile:mt-0 mobile:flex-row mobile:items-center mobile:gap-6">
      <Button variant="outlined" size="sm" className="inline-block max-w-max">
        {t('button.signIn')}
      </Button>
      <Button variant="gradient" size="sm" className="inline-bloc max-w-max">
        {t('button.signUp')}
      </Button>
    </ul>
  );

  return (
    <Navbar
      shadow={true}
      className="max-w-full mx-auto py-2 px-4 mobile:px-8 mobile:py-4 font-sans text-[#7f7e8a]"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="mr-4 cursor-pointer py-1.5 font-normal">
          <span>Logo</span>
        </Link>
        <LangSwitch />
        <div className="hidden mobile:flex gap-2 items-center">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent mobile:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
};

export default Header;
