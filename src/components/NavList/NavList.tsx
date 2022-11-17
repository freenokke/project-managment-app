import { Button, Tooltip } from '@material-tailwind/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../AccountMenu/AccountMenu';
import { Props } from './NavList.type';
import { useTranslation } from 'react-i18next';

const NavList: FC<Props> = ({ token, closeNav }) => {
  const { t } = useTranslation();

  if (token) {
    return (
      <ul className="mt-7 mb-4 flex basis-full items-center gap-5 md:mb-0 md:mt-0 md:items-center md:gap-6">
        <Tooltip
          content={t('tooltip.createBoard')}
          className="bg-blue-gray-900 text-xs first-letter:capitalize"
        >
          <i className="material-icons cursor-pointer text-3xl md:text-2xl">note_add</i>
        </Tooltip>
        <AccountMenu closeNav={closeNav} />
      </ul>
    );
  } else {
    return (
      <ul className="mt-7 mb-4 flex flex-col items-center gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
        <Link to="/signin">
          <Button
            onClick={closeNav}
            variant="outlined"
            size="sm"
            className="inline-block max-w-max"
          >
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
  }
};

export default NavList;
