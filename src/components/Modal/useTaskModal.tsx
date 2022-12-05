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

export const useTaskModal = () => {
  const dispatch = useAppDispatch();
  const [createTaskCall] = useCreateTaskMutation();
  const [editTaskCall, { isLoading: isEditingTask, isError: editTaskError }] =
    useEditTaskMutation();
  const [deleteTaskCall, { isLoading: isDeletingTask, isError: deletingTaskError }] =
    useDeleteTaskMutation();

  useEffect(() => {
    dispatch(setIsLoadingTask(isEditingTask || isDeletingTask));
  }, [isEditingTask, dispatch, isDeletingTask]);

  const createTask = (data: ITaskCreate) => {
    createTaskCall(data);
  };

  const deleteTask = async (data: ModalData) => {
    await deleteTaskCall(data);
  };

  const editTask = async (data: ITaskUpdate) => {
    await editTaskCall(data);
  };

  return {
    createTask,
    editTask,
    deleteTask,
    isEditingTask,
    editTaskError,
    deletingTaskError,
  };
};

export default useTaskModal;
