import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISignUpData } from './SignUp.types';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next/i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/features/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import SignInput from '../../components/SignInput/SignInput';

const schema = yup.object({
  name: yup.string().required('validation.noName').min(2, 'validation.minNameLength'),
  login: yup.string().required('validation.noLogin').min(4, 'validation.minLoginLength'),
  password: yup
    .string()
    .required('validation.noPassword')
    .min(7, 'validation.minPasswordLength')
    .matches('^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$' as unknown as RegExp, 'validation.wrongPassword')
    .required(),
});

const SignUpPage = () => {
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
  } = useForm<ISignUpData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ISignUpData) => dispatch(signUp(data));

  const changeLang = () => {
    i18n.changeLanguage('ru');
  };

  return (
    <div className="container flex items-center justify-center mt-[10%]">
      <button className="button1" onClick={changeLang}>
        Сменить язык
      </button>
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10 capitalize">{t('signUp.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
          <SignInput name="name" error={errors?.name} register={register} />
          <SignInput name="login" error={errors?.login} register={register} />
          <SignInput name="password" error={errors?.password} register={register} password />

          <button type="submit" disabled={isLoading} className="button1 capitalize mb-3">
            {isLoading ? 'Loading.....' : t('signUp')}
          </button>
        </form>
        <div className="h-8">
          {error && <div className="text-red-600 h-8">{error?.message}</div>}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
