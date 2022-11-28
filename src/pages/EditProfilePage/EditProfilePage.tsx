import { useTranslation } from 'react-i18next';
import { ISignUpData } from '../SignUpPage/SignUp.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInput } from '../../components';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { editUser } from '../../redux/features/userSlice';
import { Button } from '@material-tailwind/react';

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

function EditProfilePage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({ resolver: yupResolver(schema) });

  const { userId, token } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.user);

  const onSubmit = (data: ISignUpData) => {
    console.log(data);
    const newUser = {
      name: data.name ? data.name : '',
      login: data.login,
      password: data.password,
    };
    if (userId && token && data.name) {
      dispatch(editUser({ userId, token, newUser }));
    }
  };

  return (
    <div className="container flex items-center justify-center flex-grow">
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10 capitalize">{t('editProfile.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11 mb-3">
          <SignInput
            name="name"
            error={errors?.name}
            register={register}
            placeholder="Enter new name"
          />
          <SignInput
            name="login"
            error={errors?.login}
            register={register}
            placeholder="Enter new login"
          />
          <SignInput
            name="password"
            error={errors?.password}
            register={register}
            password
            placeholder="Enter new password"
          />

          <Button type="submit">{isLoading ? t('signUp.loading') : t('signUp')}</Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
