import { Menu, MenuHandler, MenuItem, MenuList, Tooltip } from '@material-tailwind/react';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { useAppSelector } from '../../hooks/redux.hooks';
import { logOut } from '../../redux/features/authSlice';
import { parseJwt } from '../../utils/utils';
import { Props } from './AccountMenu.type';

const AccountMenu: FC<Props> = ({ closeNav }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { login } = parseJwt(token ?? '');

  const onLogout = useCallback(() => {
    closeNav();
    dispatch(logOut());
  }, [dispatch, closeNav]);

  return (
    <div className="ml-auto flex items-center gap-1">
      <Menu>
        <MenuHandler>
          <div className="flex">
            <Tooltip content={t('tooltip.account')} className="bg-blue-gray-900 text-xs capitalize">
              <span className="text-3xl material-icons cursor-pointer md:text-2xl">
                manage_accounts
              </span>
            </Tooltip>
          </div>
        </MenuHandler>
        <MenuList className="min-w-max">
          <MenuItem className="first-letter:capitalize">
            <Link to="/edit/profile">{t('profile.edit')}</Link>
          </MenuItem>
          <MenuItem onClick={onLogout} className="first-letter:capitalize">
            <Link to="/">{t('logout')}</Link>
          </MenuItem>
        </MenuList>
      </Menu>
      {login}
    </div>
  );
};

export default AccountMenu;
