import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';
import { IFormFields } from '../ModalBoardForm/ModalBoardForm';

export interface IModalTextarea {
  label: Path<IFormFields>;
  register: UseFormRegister<IFormFields>;
  errors: FieldErrors<IFormFields>;
}
