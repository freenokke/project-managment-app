import { useTranslation } from 'react-i18next';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ISignUpData, InputsArray } from '../../pages/SignUpPage/SignUp.types';
import { useCallback, useState } from 'react';

interface ISignInputProps {
  name: InputsArray;
  error?: FieldError;
  register: UseFormRegister<ISignUpData>;
  password?: boolean;
}

const SignInput = ({ name, error, register, password }: ISignInputProps) => {
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState(password);

  const changeInputType = useCallback(() => {
    setPasswordType(!passwordType);
  }, [passwordType]);

  const visibilityBtnColor = passwordType
    ? 'material-icons text-slate-400 cursor-pointer right-2 top-1 absolute'
    : 'material-icons text-blue-500 cursor-pointer right-2 top-1 absolute';

  return (
    <div className="relative">
      <label htmlFor={name} className={error ? 'signInLabelError' : 'signInLabel'}>
        <input
          className="outline-none p-1 rounded-lg text-black"
          {...register(name)}
          type={passwordType ? 'password' : 'text'}
          name={name}
          autoComplete="off"
        />
        <div className=" absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs ">
          {t(name)}
        </div>
      </label>
      {password && (
        <div onClick={changeInputType} className={visibilityBtnColor}>
          visibility
        </div>
      )}
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
};

export default SignInput;
