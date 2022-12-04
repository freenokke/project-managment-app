import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { parseJwt } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { logOut } from '../../redux/features/authSlice';

interface ITokenInfo {
  exp: number;
  iat: number;
}

const PrivateRoute = () => {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  if (token) {
    const { exp }: ITokenInfo = parseJwt(token);
    const timeRightNow = Date.now();
    const tokenExpTime = new Date().setTime(exp) * 1000;
    if (timeRightNow > tokenExpTime) {
      dispatch(logOut());
    }
  }
  return token ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} />;
};

export { PrivateRoute };
