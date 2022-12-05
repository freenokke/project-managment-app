import {
  ITaskCreate,
  ITaskUpdate,
  reorder,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useUpdateSetOfTasksMutation,
} from '../../redux/api/tasksApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { ModalData } from './Modal.types';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { setIsLoadingTask } from '../../redux/features/boardInfoSlice';
import { setLocalTasks } from '../../redux/features/localDataSlice';

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
  const [updateTasksSetCall, {}] = useUpdateSetOfTasksMutation();
  const displayedData = useAppSelector((state) => state.localData);

  useEffect(() => {
    dispatch(setIsLoadingTask(isEditingTask || isDeletingTask));
  }, [isEditingTask, dispatch, isDeletingTask]);

  const createTask = (data: ITaskCreate) => {
    createTaskCall(data);
  };

  const deleteTask = async (data: ModalData) => {
    await deleteTaskCall(data)
      .unwrap()
      .then((res) => {
        const rebuiltLocalTasks = displayedData
          .find((item) => item.column === res.columnId)
          ?.tasks?.filter((task) => task._id !== res._id);
        dispatch(setLocalTasks({ tasks: rebuiltLocalTasks ?? [], columnId: res.columnId }));
        if (rebuiltLocalTasks && rebuiltLocalTasks.length > 1) {
          const requestBody = [
            ...rebuiltLocalTasks?.map(reorder).map((task) => ({
              _id: task._id,
              order: task.order,
              columnId: task.columnId,
            })),
          ];
          updateTasksSetCall({ body: requestBody });
        }
      });
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
