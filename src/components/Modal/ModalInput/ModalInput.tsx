import { useTranslation } from 'react-i18next';
import { IModalInput } from './ModalInput.types';

const ModalInput = (props: IModalInput) => {
  const { t } = useTranslation();
  const { label, register, errors } = props;

  return (
    <div className="relative w-full">
      <label htmlFor={label} className={errors[label] ? 'signInLabelError' : 'signInLabel'}>
        <input
          className="p-1 pl-2 rounded-lg outline-none w-[90%] content-center"
          id={label}
          {...register(label, {
            required: 'modalValidation.requiredError',
            maxLength: {
              value: 25,
              message: 'modalValidation.maxLength',
            },
          })}
        />
        <div className="absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs">{label}</div>
      </label>
      <div className="h-[30px] ml-2 text-red-600 pt-[5px]">
        {t(errors[label]?.message as string)}
      </div>
    </div>
  );
};

export default ModalInput;
