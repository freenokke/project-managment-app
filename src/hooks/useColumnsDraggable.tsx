import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { IColumnsResponse } from '../pages/BoardPage/BoardPage.types';
import { setCurrentDraggable, resetCurrentDraggable } from '../redux/features/dragSlice';

export const useColumnsDraggable = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.drag);

  const dragStartEventHandler = useCallback(
    (e: React.DragEvent, itemInfo: IColumnsResponse) => {
      dispatch(setCurrentDraggable({ itemInfo, type: 'column' }));
      if (
        (e.target as HTMLDivElement).getAttribute('data-type') === 'column' &&
        type &&
        type === 'column'
      ) {
        (e.target as HTMLDivElement).classList.add('border-blue-600', 'border-2');
      }
    },
    [type, dispatch]
  );

  const dragOverEventHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if ((e.target as HTMLDivElement).getAttribute('data-type') === 'column') {
      (e.target as HTMLDivElement).classList.add('border-l-8', 'border-l-blue-600');
    }
  }, []);

  const dragLeaveEventHandler = useCallback((e: React.DragEvent) => {
    if ((e.target as HTMLDivElement).getAttribute('data-type') === 'column') {
      (e.target as HTMLDivElement).classList.remove('border-l-blue-600', 'border-l-8');
    }
  }, []);

  const dragEndEventHandler = useCallback(
    (e: React.DragEvent) => {
      dispatch(resetCurrentDraggable());
      if ((e.target as HTMLDivElement).getAttribute('data-type') === 'column') {
        (e.target as HTMLDivElement).classList.remove(
          'border-l-blue-600',
          'border-l-8',
          'border-blue-600',
          'border-2'
        );
      }
    },
    [dispatch]
  );

  const dropEventHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    (e.target as HTMLDivElement).classList.remove('border-l-blue-600', 'border-l-8');
  }, []);

  return {
    dragStartEventHandler,
    dragOverEventHandler,
    dragLeaveEventHandler,
    dragEndEventHandler,
    dropEventHandler,
  };
};
