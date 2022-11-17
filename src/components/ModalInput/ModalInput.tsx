import { IModalInput } from './ModalInput.types';

const ModalInput = (props: IModalInput) => {
  const { label, register, errors } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="ml-2 {error ? 'signInLabelError' : 'signInLabel'}">
        {label}
      </label>
      <input
        className="p-1 pl-2 rounded-lg text-black border"
        id={label}
        {...register(label, { required: true })}
      />
      <div>{errors[label]?.message}</div>
    </div>
  );
};

export default ModalInput;
