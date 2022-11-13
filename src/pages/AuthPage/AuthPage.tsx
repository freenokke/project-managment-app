import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormInputs, InputsArray } from './AuthPage.types';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next/i18next';

const schema = yup
  .object({
    name: yup.string().required('Введите имя').min(2, 'Минимум 2 символа'),
    login: yup.string().required('Введите логин').min(3, 'Минимум 3 символа'),
    password: yup.string().required('Введите пароль').min(3, 'Минимум 3 символа'),
  })
  .required();

const inputsArray: InputsArray[] = ['name', 'login', 'password'];

const AuthPage = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInputs) => alert(JSON.stringify(data));

  const changeLang = () => {
    i18n.changeLanguage('ru');
  };

  const classNames = {
    name: errors.name ? 'signInLabelError' : 'signInLabel',
    login: errors.login ? 'signInLabelError' : 'signInLabel',
    password: errors.password ? 'signInLabelError' : 'signInLabel',
  };

  return (
    <div className="container flex items-center justify-center mt-[10%]">
      <button className="button1" onClick={changeLang}>
        Сменить язык
      </button>
      <div className=" shadow-md p-5 w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10 capitalize">{t('signUp.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
          {inputsArray.map((item) => {
            return (
              <div className="relative" key={item}>
                <label htmlFor="name" className={classNames[item]}>
                  <input
                    className="outline-none p-1 rounded-lg text-black"
                    {...register(item)}
                    type="text"
                    name={item}
                    autoComplete="off"
                  />
                  <div className=" absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs ">
                    {t(item)}
                  </div>
                </label>
                {errors[item] && <p className="text-red-600">{errors[item]?.message}</p>}
              </div>
            );
          })}
          <button type="submit" className="button1 capitalize">
            {t('signUp')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
