import { useCallback } from 'react';
import { ITaskData } from '../redux/api/tasksApi';
import { useUpdateSetOfTasksMutation } from '../redux/api/tasksApi';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { setCurrentDraggable } from '../redux/features/dragSlice';

export const useDraggable = () => {
  const [updateTasksSetCall, {}] = useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const currentDraggable = useAppSelector((state) => state.drag.currentDraggable);

  const updateTasksSet = useCallback(
    async (data: { _id: string; order: number; columnId: string }[]) => {
      await updateTasksSetCall(data).unwrap();
    },
    [updateTasksSetCall]
  );

  const dragDropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, data: ITaskData) => {
      e.stopPropagation();
      e.preventDefault();
      if (currentDraggable && data.order !== currentDraggable?.order) {
        const {
          _id: draggedElemId,
          order: draggedElemOrder,
          columnId: draggedElemCol,
        } = currentDraggable;
        const { _id: droppedElemId, order: droppedElemOrder, columnId: droppedElemCol } = data;

        const body = [
          {
            _id: draggedElemId,
            order: droppedElemOrder,
            columnId: droppedElemCol,
          },
          {
            _id: droppedElemId,
            order: draggedElemOrder,
            columnId: draggedElemCol,
          },
        ];

        updateTasksSet(body);
      }
      (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
    },
    [updateTasksSet, currentDraggable]
  );

  const dragStartHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, data: ITaskData) => {
      e.stopPropagation();
      dispatch(setCurrentDraggable(data));
    },
    [dispatch]
  );

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLDivElement).classList.add('shadow', 'shadow-blue-400');
  }, []);

  const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
  }, []);

  const dragEndHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
      dispatch(setCurrentDraggable(null));
    },
    [dispatch]
  );

  return {
    dragDropHandler,
    dragEndHandler,
    dragLeaveHandler,
    dragOverHandler,
    dragStartHandler,
    updateTasksSet,
  };
};
