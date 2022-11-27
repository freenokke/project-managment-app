import { useCallback } from 'react';
import { useAppSelector } from '../hooks/redux.hooks';

export const useColumnsDraggable = () => {
  const { type } = useAppSelector((state) => state.drag);

  const dragStartEventHandler = useCallback(
    (e: React.DragEvent) => {
      if (
        (e.target as HTMLDivElement).getAttribute('data-type') === 'column' &&
        type &&
        type === 'column'
      ) {
        (e.target as HTMLDivElement).classList.add('border-blue-600', 'border-2');
      }
    },
    [type]
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

  const dragEndEventHandler = useCallback((e: React.DragEvent) => {
    if ((e.target as HTMLDivElement).getAttribute('data-type') === 'column') {
      (e.target as HTMLDivElement).classList.remove(
        'border-l-blue-600',
        'border-l-8',
        'border-blue-600',
        'border-2'
      );
    }
  }, []);

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
