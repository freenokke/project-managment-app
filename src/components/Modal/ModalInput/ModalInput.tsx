import { useTranslation } from 'react-i18next';
import { IModalInput } from './ModalInput.types';

const ModalInput = ({ name, label, register, errors, value, onChange }: IModalInput) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full flex flex-col justify-center">
      <label htmlFor={name} className={`${errors[name] ? 'signInLabelError' : 'signInLabel'}`}>
        <input
          className="pl-2 rounded-lg outline-none w-[100%]"
          id={name}
          {...register(name, {
            required: 'modalValidation.requiredError',
            maxLength: {
              value: 25,
              message: 'modalValidation.maxLength',
            },
            value: value,
            onChange: onChange,
          })}
        />
        <div className="absolute left-2 top-[-13px] p-1 bg-white uppercase text-xs">{label}</div>
      </label>
      <div className="h-[30px] ml-2 text-red-600 text-[14px]">
        {t(errors[name]?.message as string)}
      </div>
    </div>
  );
};

export default ModalInput;
