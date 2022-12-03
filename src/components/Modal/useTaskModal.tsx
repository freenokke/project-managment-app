import {
  ITaskCreate,
  ITaskUpdate,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} from '../../redux/api/tasksApi';
import { ModalData } from './Modal.types';

export interface Updates {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export const useTaskModal = () => {
  const [createTaskCall, {}] = useCreateTaskMutation();
  const [editTaskCall, {}] = useEditTaskMutation();
  const [deleteTaskCall, {}] = useDeleteTaskMutation();

  const createTask = (data: ITaskCreate) => {
    createTaskCall(data);
  };

  const deleteTask = (data: ModalData) => {
    deleteTaskCall(data);
  };

  const editTask = (data: ITaskUpdate) => {
    editTaskCall(data);
  };

  return {
    createTask,
    editTask,
    deleteTask,
  };
};

export default useTaskModal;
