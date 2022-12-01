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

const useTaskModal = () => {
  const [createTaskCall, { isError: createTaskError }] = useCreateTaskMutation();
  const [editTaskCall, { isError: editTaskError }] = useEditTaskMutation();
  const [deleteTaskCall, { isError: deleteTaskError }] = useDeleteTaskMutation();

  const createTask = async (data: ITaskCreate) => {
    await createTaskCall(data).unwrap();
  };

  const deleteTask = async (data: ModalData) => {
    await deleteTaskCall(data).unwrap();
  };

  const editTask = async (data: ITaskUpdate) => {
    await editTaskCall(data).unwrap();
  };

  return {
    createTask,
    editTask,
    deleteTask,
  };
};

export default useTaskModal;
