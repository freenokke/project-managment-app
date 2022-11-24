import {
  ITaskCreate,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} from '../../redux/api/tasksApi';
import { ModalData } from './Modal.types';

export interface Updates {
  title: string;
  owner: string;
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

  return {
    createTask,
    // editBoard,
    deleteTask,
  };
};

export default useTaskModal;