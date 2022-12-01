import { useTranslation } from 'react-i18next';
import { ISignUpData } from '../SignUpPage/SignUp.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { editUser } from '../../redux/features/userSlice';
import { Button } from '@material-tailwind/react';
import EditInput from '../../components/EditInput/EditInput';
import { Loader, Modal } from '../../components';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';

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

const EditProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { editStatus, name, login, deleteStatus } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
    resolver: yupResolver(schema),
    defaultValues: { name: name || '', login: login || '' },
  });

  const { userId, token } = useAppSelector((state) => state.auth);

  const deleteUserHandler = () => {
    dispatch(showModal({ type: ModalTypes.deleteUser }));
  };

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
      <Modal />
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10">{t('editProfile.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-6">
          <EditInput name="name" error={errors?.name} register={register} />
          <EditInput name="login" error={errors?.login} register={register} />
          <EditInput name="password" error={errors?.password} register={register} password={true} />
          <p className="align-middle text-red-700 text-center h-[24px]">
            {editStatus.error ? editStatus.error.message : ''}
          </p>
          <Button type="submit">
            {editStatus.isLoading ? t('main.loading') : t('editProfile.button')}
          </Button>
        </form>
        <Button color="red" onClick={deleteUserHandler}>
          {t('editProfile.delete')}
        </Button>
        {deleteStatus.isLoading && <Loader />}
      </div>
    </div>
  );
};

export default EditProfilePage;
