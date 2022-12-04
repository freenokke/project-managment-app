import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { IColumnsResponse } from '../pages/BoardPage/BoardPage.types';
import {
  setCurrentDraggableColumn,
  resetCurrentDraggableColumn,
} from '../redux/features/dragSlice';

export const useColumnsDraggable = () => {
  const dispatch = useAppDispatch();
  const { type, currentDraggableColumn } = useAppSelector((state) => state.drag);

  const dragStartEventHandler = useCallback(
    (e: React.DragEvent, itemInfo: IColumnsResponse) => {
      dispatch(setCurrentDraggableColumn({ itemInfo, type: 'column' }));
      (e.target as HTMLDivElement).classList.add('border-blue-600', 'border-2');
    },
    [dispatch]
  );

  const dragOverEventHandler = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();
      if (type && type === 'column' && id !== currentDraggableColumn?._id) {
        e.currentTarget.classList.add('border-l-8', 'border-l-blue-600');
      }
    },
    [type, currentDraggableColumn]
  );

  const dragLeaveEventHandler = useCallback((e: React.DragEvent) => {
    (e.target as HTMLDivElement).classList.remove('border-l-blue-600', 'border-l-8');
  }, []);

  const dragEndEventHandler = useCallback(
    (e: React.DragEvent) => {
      dispatch(resetCurrentDraggableColumn());
      if (type && type === 'column') {
        (e.currentTarget as HTMLDivElement).classList.remove(
          'border-l-blue-600',
          'border-l-8',
          'border-blue-600',
          'border-2'
        );
      }
    },
    [dispatch, type]
  );

  const dropEventHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).classList.remove('border-l-blue-600', 'border-l-8');
  }, []);

  return {
    dragStartEventHandler,
    dragOverEventHandler,
    dragLeaveEventHandler,
    dragEndEventHandler,
    dropEventHandler,
  };
};
