import { useCallback } from 'react';
import { ITaskData } from '../redux/api/tasksApi';
import { useUpdateSetOfTasksMutation } from '../redux/api/tasksApi';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { setCurrentDraggable } from '../redux/features/dragSlice';

export const useDraggable = () => {
  const [updateTasksSetCall, { isLoading: isUpdate }] = useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const currentDraggable = useAppSelector((state) => state.drag.currentDraggable);

  const updateTasksSet = useCallback(
    async (data: Pick<ITaskData, '_id' | 'order' | 'columnId'>[]) => {
      await updateTasksSetCall(data).unwrap();
    },
    [updateTasksSetCall]
  );

  const dragDropHandler = useCallback(
    (e: React.DragEvent, data: ITaskData | Pick<ITaskData, 'columnId'>) => {
      e.stopPropagation();
      e.preventDefault();
      //если order присутствует в объекте, значит дроп происходит на таске, а не на колонке.
      if ('order' in data) {
        if (
          currentDraggable &&
          (data.order !== currentDraggable?.order || data.columnId !== currentDraggable?.columnId)
        ) {
          const {
            _id: draggedElemId,
            order: draggedElemOrder,
            columnId: draggedElemCol,
          } = currentDraggable;
          const { _id: droppedElemId, order: droppedElemOrder, columnId: droppedElemCol } = data;

          const requestBody = [
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
          updateTasksSet(requestBody);
        }
      } else {
        if (currentDraggable && data.columnId !== currentDraggable.columnId) {
          const requestBody = [
            {
              _id: currentDraggable._id,
              order: currentDraggable.order,
              columnId: data.columnId,
            },
          ];
          updateTasksSet(requestBody);
        }
      }
      (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
    },
    [updateTasksSet, currentDraggable]
  );

  const dragStartHandler = useCallback(
    (e: React.DragEvent, data: ITaskData) => {
      e.stopPropagation();
      dispatch(setCurrentDraggable(data));
    },
    [dispatch]
  );

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLDivElement).classList.add('shadow', 'shadow-blue-400');
  }, []);

  const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
  }, []);

  const dragEndHandler = useCallback(
    (e: React.DragEvent) => {
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
    isUpdate,
  };
};
