import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { ITaskUpdate } from '../../redux/api/tasksApi';
import { ITaskData } from '../../redux/api/tasksApi';

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
  editTask: (data: ITaskUpdate) => Promise<void>;
  taskData?: ITaskData | null;
}
