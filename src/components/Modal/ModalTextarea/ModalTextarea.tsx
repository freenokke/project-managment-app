import { useTranslation } from 'react-i18next';
import { IModalTextarea } from './ModalTextarea.types';

const ModalTextarea = ({ name, label, register, errors }: IModalTextarea) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full flex flex-col justify-center">
      <label htmlFor={name} className={errors[name] ? 'signInLabelError' : 'signInLabel'}>
        <textarea
          className="p-1 pl-2 rounded-lg outline-none w-[100%] content-center resize-none whitespace-normal"
          id={name}
          rows={3}
          {...register(name, {
            required: 'modalValidation.requiredError',
            maxLength: {
              value: 100,
              message: 'modalValidation.maxLengthText',
            },
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

export default ModalTextarea;
