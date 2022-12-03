import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';

export interface IFormFields {
  title: string;
  description: string;
}

export interface TaskModalProps {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
  reset: UseFormReset<IFormFields>;
  setValue: UseFormSetValue<IFormFields>;
  errors: FieldErrors<IFormFields>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
}
