import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ITaskData } from '../redux/api/tasksApi';
import { useUpdateSetOfTasksMutation } from '../redux/api/tasksApi';

export const useDraggable = (
  tasks: ITaskData[],
  updateTasks: Dispatch<SetStateAction<ITaskData[]>>
) => {
  const [currentDraggableCard, setDraggableCard] = useState<ITaskData | null>(null);
  const [updateTasksSetCall, {}] = useUpdateSetOfTasksMutation();

  const updateTasksSet = useCallback(
    async (data: ITaskData[]) => {
      const body = data.map((task) => {
        return {
          _id: task._id,
          order: task.order,
          columnId: task.columnId,
        };
      });
      console.log(body);
      await updateTasksSetCall(body).unwrap();
    },
    [updateTasksSetCall]
  );

  const dragDropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, data: ITaskData) => {
      e.stopPropagation();
      e.preventDefault();
      if (
        typeof currentDraggableCard?.order === 'number' &&
        data.order !== currentDraggableCard?.order
      ) {
        const rebuiltTasksList = tasks.map((task) => {
          if (task.order === data.order) {
            return { ...task, order: currentDraggableCard?.order };
          }
          if (task.order === currentDraggableCard?.order) {
            return { ...task, order: data.order };
          }
          return task;
        });
        // updateTasks(rebuiltTasksList);
        updateTasksSet(rebuiltTasksList);
      }
      (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
    },
    [tasks, currentDraggableCard?.order, updateTasksSet]
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
