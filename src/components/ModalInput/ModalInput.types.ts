import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';
import { IFormFields } from '../ModalBoardForm/ModalBoardForm.types';

export interface IModalInput {
  label: Path<IFormFields>;
  register: UseFormRegister<IFormFields>;
  errors: FieldErrors<IFormFields>;
}
