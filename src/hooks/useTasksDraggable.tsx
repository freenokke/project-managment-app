import { useCallback } from 'react';
import { ITaskData, reorder, sortCards } from '../redux/api/tasksApi';
import { useUpdateSetOfTasksMutation } from '../redux/api/tasksApi';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { setCurrentDraggableTask, resetCurrentDraggableTask } from '../redux/features/dragSlice';
import { setLocalTasks, updateLocalState } from '../redux/features/localDataSlice';
import { toast } from 'react-toastify';
import i18n from '../i18next/i18next';

export const useDraggable = (tasks: ITaskData[], columnId: string) => {
  const [updateTasksSetCall, { isLoading: isUpdate, isError: isPatchTasksError }] =
    useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const currentDraggableTask = useAppSelector((state) => state.drag.currentDraggableTask);
  const type = useAppSelector((state) => state.drag.type);
  const displayedData = useAppSelector((state) => state.localData);

  const updateTasksSet = useCallback(
    (data: Pick<ITaskData, '_id' | 'order' | 'columnId'>[]) => {
      updateTasksSetCall({ body: data, backup: displayedData });
    },
    [updateTasksSetCall, displayedData]
  );

  const dragDropHandler = useCallback(
    (e: React.DragEvent, data: ITaskData | Pick<ITaskData, 'columnId'>) => {
      if (type === 'task') {
        e.stopPropagation();
        e.preventDefault();
        try {
          const isAtTheEnd = !('order' in data);
          //если order присутствует в объекте, значит дроп происходит на таске, а не на колонке.
          if (currentDraggableTask) {
            if (data.columnId === currentDraggableTask.columnId) {
              const rebuiltLocalTasksList = isAtTheEnd
                ? [
                    ...tasks
                      ?.filter((item) => item._id !== currentDraggableTask._id)
                      .sort(sortCards),
                    currentDraggableTask,
                  ]
                : tasks?.map((task) => {
                    if (task.order === data.order) {
                      return { ...task, order: currentDraggableTask?.order };
                    }
                    if (task.order === currentDraggableTask?.order) {
                      return { ...task, order: data.order };
                    }
                    return task;
                  });
              dispatch(setLocalTasks({ tasks: rebuiltLocalTasksList ?? [], columnId }));
            } else {
              const endDragCol = displayedData.find((item) => item.column === data.columnId);
              const startDragCol = displayedData.find(
                (item) => item.column === currentDraggableTask.columnId
              );
              const rebuiltStartDragCol: ITaskData[] = [];
              startDragCol?.tasks?.forEach((item) => {
                if (item._id === currentDraggableTask._id) {
                  if (!isAtTheEnd) {
                    rebuiltStartDragCol.push({
                      ...data,
                      columnId: currentDraggableTask.columnId,
                      order: currentDraggableTask.order,
                    });
                  }
                } else {
                  rebuiltStartDragCol.push(item);
                }
              });

              const dragItem = {
                ...currentDraggableTask,
                columnId: data.columnId,
              };
              const rebuiltEndDragCol = isAtTheEnd
                ? [...(endDragCol?.tasks ?? []), dragItem]
                : endDragCol?.tasks?.map((item) => {
                    if ('_id' in data && item._id === data._id) {
                      return {
                        ...currentDraggableTask,
                        columnId: data.columnId,
                        order: data.order,
                      };
                    }
                    return item;
                  });
              dispatch(
                setLocalTasks({
                  tasks: rebuiltStartDragCol.map(reorder),
                  columnId: currentDraggableTask.columnId,
                })
              );
              dispatch(
                setLocalTasks({
                  tasks: rebuiltEndDragCol?.map(reorder) ?? [],
                  columnId: data.columnId,
                })
              );
              dropOnTaskRequest(rebuiltStartDragCol, rebuiltEndDragCol ?? [], updateTasksSet);
            }
          }
        } catch {
          toast.error(i18n.t('task.dragError'));
          dispatch(updateLocalState(displayedData));
        }
        (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
      }
    },
    [updateTasksSet, currentDraggableTask, type, dispatch, displayedData, tasks, columnId]
  );

  const dragStartHandler = useCallback(
    (e: React.DragEvent, data: ITaskData) => {
      e.stopPropagation();
      dispatch(setCurrentDraggableTask({ itemInfo: data, type: 'task' }));
    },
    [dispatch]
  );

  const dragOverHandler = useCallback(
    (e: React.DragEvent) => {
      if (type === 'task') {
        e.stopPropagation();
        e.preventDefault();
        (e.target as HTMLDivElement).classList.add('shadow', 'shadow-blue-400');
      }
    },
    [type]
  );

  const dragLeaveHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (type === 'task') {
        e.stopPropagation();
        (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
      }
    },
    [type]
  );

  const dragEndHandler = useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation();
      (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
      dispatch(resetCurrentDraggableTask());
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
    isPatchTasksError,
  };
};

async function dropOnTaskRequest(
  starRebuiltCol: ITaskData[],
  endRebuiltCol: ITaskData[],
  callback: (data: Pick<ITaskData, '_id' | 'order' | 'columnId'>[]) => void
) {
  const requestBody = [
    ...starRebuiltCol.map(reorder).map((item) => ({
      _id: item._id,
      order: item.order,
      columnId: item.columnId,
    })),
    ...endRebuiltCol.map(reorder).map((item) => ({
      _id: item._id,
      order: item.order,
      columnId: item.columnId,
    })),
  ];
  callback(requestBody);
}
