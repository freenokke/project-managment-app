import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormGetFieldState,
} from 'react-hook-form';
import { ModalTypes } from '../../redux/features/modalSlice';
import { IBoardData } from '../BoardCard/Board.types';

export interface IFormFields {
  Title: string;
  Description: string;
}

export interface IModalForm {
  onCloseModal: () => void;
  onHandleEvent: (data: IBoardData) => void;
}

export interface ModalChild {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
  reset: UseFormReset<IFormFields>;
  getFieldState: UseFormGetFieldState<IFormFields>;
  errors: Partial<
    FieldErrorsImpl<{
      Title: string;
      Description: string;
    }>
  >;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  data: string | null;
  type: ModalTypes;
}
