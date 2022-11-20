import { useTranslation } from 'react-i18next';
import { IModalTextarea } from './ModalTextarea.types';

const ModalTextarea = ({ name, register, errors }: IModalTextarea) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <label htmlFor={name} className={errors[name] ? 'signInLabelError' : 'signInLabel'}>
        <textarea
          className="p-1 pl-2 rounded-lg outline-none"
          id={name}
          {...register(name, { required: true })}
        />
        <div className="absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs">
          {t('modal.labelTextarea')}
        </div>
      </label>
      <div>{errors[name]?.message}</div>
    </div>
  );
};

export default ModalTextarea;
