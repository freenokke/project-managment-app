import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { IColumnData } from '../../pages/BoardPage/BoardPage.types';
import { ITaskCreate, ITaskData, ITaskUpdate } from '../../redux/api/tasksApi';
import { ModalTypes } from '../../redux/features/modalSlice';
import { IBoardData } from '../BoardCard/Board.types';
import { Updates } from './useBoardModal';

export interface IFormFields {
  title: string;
  description: string;
}

export interface DefaultModalProps {
  onCloseModal: () => void;
  data?: ModalData | null;
  type?: ModalTypes;
}

export interface FormModalProps {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
  reset: UseFormReset<IFormFields>;
  setValue: UseFormSetValue<IFormFields>;
  formState: {
    errors: FieldErrors<IFormFields>;
    isDirty: boolean;
    isValid: boolean;
    isSubmitted: boolean;
  };
}

export interface CreateModalProps extends DefaultModalProps, FormModalProps {
  createBoard: (data: IBoardData) => Promise<void>;
  createColumn: (boardId: string, body: IColumnData) => Promise<void>;
  createTask: (data: ITaskCreate) => Promise<void>;
}
export interface EditModalProps extends DefaultModalProps, FormModalProps {
  editBoard: (data: ModalData, updates: Updates) => Promise<void>;
  editTask: (data: ITaskUpdate) => Promise<void>;
}
export interface DeleteModalProps extends DefaultModalProps {
  deleteBoard: (data: ModalData) => Promise<void>;
  deleteColumn: (boardId: string, body: IColumnData) => Promise<void>;
  deleteTask: (data: ModalData) => Promise<void>;
}

export interface ModalData {
  boardId?: string;
  columnId?: string;
  taskId?: string;
  taskData?: ITaskData;
}
