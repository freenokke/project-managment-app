import {
  ITaskCreate,
  ITaskUpdate,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} from '../../redux/api/tasksApi';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { ModalData } from './Modal.types';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { setIsLoadingTask } from '../../redux/features/boardInfoSlice';

export interface Updates {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

const useTaskModal = () => {
  const dispatch = useAppDispatch();
  const [createTaskCall] = useCreateTaskMutation();
  const [editTaskCall, { isLoading: isEditingTask, isError: editTaskError }] =
    useEditTaskMutation();
  const [deleteTaskCall, { isLoading: isDeletingTask }] = useDeleteTaskMutation();

  useEffect(() => {
    dispatch(setIsLoadingTask(isEditingTask || isDeletingTask));
  }, [isEditingTask, isDeletingTask, dispatch]);

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
    isEditingTask,
    editTaskError,
  };
};

export default useTaskModal;
