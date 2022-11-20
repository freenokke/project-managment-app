import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import { ModalTypes } from '../../redux/features/modalSlice';

export interface IFormFields {
  title: string;
  description: string;
}

export interface ModalChild {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
  reset: UseFormReset<IFormFields>;
  errors: Partial<
    FieldErrorsImpl<{
      title: string;
      description: string;
    }>
  >;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  data: string | null;
  type: ModalTypes;
  userId: string | null;
}
