import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { ITaskData } from '../../redux/api/tasksApi';
import { ModalTypes } from '../../redux/features/modalSlice';

export interface IFormFields {
  title: string;
  description: string;
}

export interface ModalChild {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
  reset: UseFormReset<IFormFields>;
  setValue: UseFormSetValue<IFormFields>;
  errors: FieldErrors<IFormFields>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  data?: ModalData | null;
  type?: ModalTypes;
  userId?: string | null;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  token?: string | null;
}

export interface ModalData {
  boardId?: string;
  columnId?: string;
  taskId?: string;
  taskData?: ITaskData;
  token?: string;
  userId?: string;
}
