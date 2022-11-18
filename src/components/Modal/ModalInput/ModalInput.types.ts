import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';

export interface IFormFields {
  Title: string;
  Description: string;
}

export interface IModalInput {
  label: Path<IFormFields>;
  register: UseFormRegister<IFormFields>;
  errors: FieldErrors<IFormFields>;
}
