import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { ModalTypes } from '../../redux/features/modalSlice';
import { IBoard } from '../BoardCard/Board.types';

export interface IFormFields {
  Title: string;
  Description: string;
}

export interface IModalBoardForm {
  onCloseModal: () => void;
  onHandleEvent: (data: IBoard) => void;
}

export interface ModalChild {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
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
