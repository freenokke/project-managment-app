import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';

export interface IFormFields {
  title: string;
  description: string;
}

export interface IModalInput {
  label: string;
  name: Path<IFormFields>;
  register: UseFormRegister<IFormFields>;
  errors: FieldErrors<IFormFields>;
}
