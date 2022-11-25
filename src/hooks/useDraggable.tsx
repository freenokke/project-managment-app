import { useState, useCallback } from 'react';
import { ITaskData } from '../redux/api/tasksApi';
import { useUpdateSetOfTasksMutation } from '../redux/api/tasksApi';

export const useDraggable = () => {
  const [DraggableCard, setDraggableCard] = useState<ITaskData | null>(null);
  const [updateTasksSetCall, {}] = useUpdateSetOfTasksMutation();

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
      if (typeof DraggableCard?.order === 'number' && data.order !== DraggableCard?.order) {
        const {
          _id: draggedElemId,
          order: draggedElemOrder,
          columnId: draggedElemCol,
        } = DraggableCard;
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
        // updateTasks(rebuiltTasksList);
        updateTasksSet(body);
      }
      (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
    },
    [updateTasksSet, DraggableCard]
  );

  const dragStartHandler = useCallback((e: React.DragEvent<HTMLDivElement>, data: ITaskData) => {
    e.stopPropagation();
    setDraggableCard(data);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLDivElement).classList.add('shadow', 'shadow-blue-400');
  }, []);

  const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
  }, []);

  const dragEndHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
  }, []);

  return {
    dragDropHandler,
    dragEndHandler,
    dragLeaveHandler,
    dragOverHandler,
    dragStartHandler,
    updateTasksSet,
  };
};
