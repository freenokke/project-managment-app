import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';

export interface IFormFields {
  title: string;
  description: string;
}

export interface IModalTextarea {
  label: string;
  name: Path<IFormFields>;
  register: UseFormRegister<IFormFields>;
  errors: FieldErrors<IFormFields>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
