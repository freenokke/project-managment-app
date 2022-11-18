import { IModalTextarea } from './ModalTextarea.types';

const ModalTextarea = (props: IModalTextarea) => {
  const { label, register, errors } = props;

  return (
    <div className="relative">
      <label htmlFor={label} className={errors[label] ? 'signInLabelError' : 'signInLabel'}>
        <textarea
          className="p-1 pl-2 rounded-lg outline-none"
          id={label}
          {...register(label, { required: true })}
        />
        <div className="absolute left-2 top-[-19px] p-1 bg-white uppercase text-xs">{label}</div>
      </label>
      <div>{errors[label]?.message}</div>
    </div>
  );
};

export default ModalTextarea;
