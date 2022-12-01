import { Menu, MenuHandler, MenuItem, MenuList, Tooltip } from '@material-tailwind/react';
import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { useAppSelector } from '../../hooks/redux.hooks';
import { logOut } from '../../redux/features/authSlice';
import { Props } from './AccountMenu.type';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../redux/features/userSlice';

const AccountMenu: FC<Props> = ({ closeNav }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, userId } = useAppSelector((state) => state.auth);
  const { login } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userId && token) {
      dispatch(getUserById({ userId, token }));
    }
  }, [userId, token, dispatch]);

  const onLogout = useCallback(() => {
    closeNav();
    navigate('/');
    dispatch(logOut());
  }, [dispatch, closeNav, navigate]);

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
