import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISignInData } from '../SignUpPage/SignUp.types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, signIn } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignInput } from '../../components';
import { Button } from '@material-tailwind/react';

const schema = yup.object({
  login: yup.string().required('validation.noLogin').min(4, 'validation.minLoginLength'),
  password: yup
    .string()
    .required('validation.noPassword')
    .min(7, 'validation.minPasswordLength')
    .matches('^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$' as unknown as RegExp, 'validation.wrongPassword')
    .required(),
});

const SignInPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, error, isLoading } = useSelector((state: RootState) => state.auth);

  const fromPage = location.state?.from?.pathname || '/main';

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!error && !isLoading && token) {
      navigate(fromPage, { replace: true });
    }
  }, [token, error, isLoading, navigate, fromPage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ISignInData) => dispatch(signIn(data));

  return (
    <div className="container flex items-center justify-center flex-grow">
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10 capitalize">{t('signIn')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11 mb-3">
          <SignInput name="login" error={errors?.login} register={register} />
          <SignInput name="password" error={errors?.password} register={register} password />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('signUp.loading') : t('signIn')}
          </Button>
        </form>

        {error && <div className="text-red-600 ">{error?.message}</div>}

        <Link
          to="/signup"
          className="mt-3 text-gray-400 transition-colors cursor-pointer hover:text-blue-600 "
        >
          {t('signIn.redirectToSignUp')}
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
