import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISignInData } from '../SignUpPage/SignUp.types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import SignInput from '../../components/SignInput/SignInput';

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
  const { token, error, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!error && !isLoading && token) {
      navigate('/main');
    }
  }, [token, error, isLoading, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ISignInData) => dispatch(signIn(data));

  return (
    <div className="container flex items-center justify-center mt-[10%]">
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10 capitalize">{t('signUp.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
          <SignInput name="login" error={errors?.login} register={register} />
          <SignInput name="password" error={errors?.password} register={register} password />

          <button type="submit" disabled={isLoading} className="button1 capitalize">
            {isLoading ? t('signUp.loading') : t('signIn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
