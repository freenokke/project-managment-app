import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormInputs } from './AuthPage.types';

const schema = yup
  .object({
    name: yup.string().required('Введите имя').min(2, 'Минимум 2 символа'),
    login: yup.string().required('Введите логин').min(3, 'Минимум 3 символа'),
    password: yup.string().required('Введите пароль').min(3, 'Минимум 3 символа'),
  })
  .required();

const inputsArray = ['name' as const, 'login' as const, 'password' as const];

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInputs) => alert(JSON.stringify(data));

  const classNames = {
    name: errors.name ? 'signInLabelError' : 'signInLabel',
    login: errors.login ? 'signInLabelError' : 'signInLabel',
    password: errors.password ? 'signInLabelError' : 'signInLabel',
  };

  return (
    <div className="container">
      <div className=" shadow-md w-[500px] mx-auto flex flex-col items-center">
        <h1 className="text-2xl mb-10">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {inputsArray.map((item) => {
            return (
              <div className="mb-10 relative" key={item}>
                <label htmlFor="name" className={classNames[item]}>
                  <input
                    className="outline-none p-1 rounded-lg text-black"
                    {...register(item)}
                    type="text"
                    name={item}
                  />
                  <div className=" absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs ">
                    {item}
                  </div>
                </label>
                {errors[item] && <p className="text-red-600">{errors[item]?.message}</p>}
              </div>
            );
          })}
          {/* <div className="mb-10 relative">
            <label htmlFor="name" className={nameLabelClass}>
              <input
                className="outline-none p-1 rounded-lg text-black"
                {...register('name')}
                type="text"
                name="name"
              />
              <div className=" absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs ">
                Name
              </div>
            </label>
            {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
          </div>

          <div className="mb-10 relative">
            <label htmlFor="login" className={loginLabelClass}>
              <input
                className="outline-none p-1 rounded-lg text-black"
                {...register('login')}
                type="text"
                name="login"
              />
              <div className=" absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs ">
                Login
              </div>
            </label>
            {errors.login && <p className="text-red-600">{errors.login?.message}</p>}
          </div> */}

          <button type="submit" className="mt-10">
            Accept
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
