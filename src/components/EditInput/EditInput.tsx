import { useTranslation } from 'react-i18next';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ISignUpData, InputsArray } from '../../pages/SignUpPage/SignUp.types';
import { useCallback, useState } from 'react';

interface IEditInputProps {
  name: InputsArray;
  error?: FieldError;
  register: UseFormRegister<ISignUpData>;
  password?: boolean;
  placeholder?: string;
}

const EditInput = ({ name, error, register, password }: IEditInputProps) => {
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState(password);

  const changeInputType = useCallback(() => {
    setPasswordType(!passwordType);
  }, [passwordType]);

  const visibilityBtnColor = passwordType
    ? 'material-icons text-gray-500 cursor-pointer right-0 top-[50%] translate-y-[-50%]  absolute'
    : 'material-icons text-blue-500 cursor-pointer right-0 top-[50%] translate-y-[-50%] absolute';

  return (
    <div className="flex flex-col relative">
      <div className="h-9 grid grid-cols-[100px_180px] ">
        <label htmlFor="name" className=" text-gray-400  capitalize ">
          {t(name)}
        </label>
        <input
          className="outline-none border-b-2 border-b-blue-400 tra"
          type={passwordType ? 'password' : 'text'}
          {...register(name)}
          autoComplete="off"
          name={name}
        />
      </div>
      {password && (
        <div onClick={changeInputType} className={visibilityBtnColor}>
          visibility
        </div>
      )}
      {error && (
        <p className="text-red-600 lowercase w-[180px] leading-none mt-1 self-end">
          {t(error.message as string)}
        </p>
      )}
    </div>
  );
};

export default EditInput;
