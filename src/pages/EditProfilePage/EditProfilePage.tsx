import { useTranslation } from 'react-i18next';
import { ISignUpData } from '../SignUpPage/SignUp.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { editUser, resetEditStatus } from '../../redux/features/userSlice';
import { Button } from '@material-tailwind/react';
import EditInput from '../../components/EditInput/EditInput';
import { Loader, Modal } from '../../components';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { editStatus, name, login, deleteStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    return () => {
      console.log('qwerty');
      dispatch(resetEditStatus());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
    resolver: yupResolver(schema),
    defaultValues: { name: name || '', login: login || '' },
  });

  const { userId, token } = useAppSelector((state) => state.auth);

  const deleteUserHandler = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.deleteUser }));
  }, [dispatch]);

  const backToPrevPage = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
    <div className="container flex items-center justify-center flex-grow relative">
      <div
        onClick={backToPrevPage}
        className="absolute flex items-center gap-2 top-[10px] left-0  transition-colors  cursor-pointer text-gray-500 hover:text-blue-500 sm:top-[10%]"
      >
        <span className="material-icons">keyboard_backspace</span>
        {t('back')}
      </div>
      <Modal />
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10">{t('editProfile.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-2">
          <EditInput name="name" error={errors?.name} register={register} />
          <EditInput name="login" error={errors?.login} register={register} />
          <EditInput name="password" error={errors?.password} register={register} password={true} />
          <Button type="submit">
            {editStatus.isLoading ? t('main.loading') : t('editProfile.button')}
          </Button>
        </form>
        <div className="minh-[24px] mb-3">
          <p className="align-middle text-red-700 text-center">
            {editStatus.error ? editStatus.error.message : null}
          </p>
          {editStatus.isSuccess && (
            <div className="flex flex-col items-center">
              <p className="align-middle text-green-500 text-center">
                {editStatus.isSuccess ? 'Пользователь успешно обновлен' : null}
              </p>
              <div
                onClick={backToPrevPage}
                className="flex items-center text-center gap-2 transition-colors cursor-pointer text-gray-500 hover:text-blue-500"
              >
                <span className="material-icons">keyboard_backspace</span>
                {t('editProfile.backIfSuccess')}
              </div>
            </div>
          )}
        </div>
        <Button color="red" onClick={deleteUserHandler}>
          {t('editProfile.delete')}
        </Button>
        {deleteStatus.isLoading && <Loader />}
      </div>
    </div>
  );
};

export default EditProfilePage;
