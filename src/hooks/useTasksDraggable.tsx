import { useCallback } from 'react';
import { ITaskData, reorder, sortCards } from '../redux/api/tasksApi';
import { useUpdateSetOfTasksMutation } from '../redux/api/tasksApi';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { setCurrentDraggable, resetCurrentDraggable } from '../redux/features/dragSlice';
import { setLocalTasks, updateLocalState } from '../redux/features/localDataSlice';
import { toast } from 'react-toastify';
import i18n from '../i18next/i18next';
import { store } from '../redux/store';

export const useDraggable = (tasks: ITaskData[], columnId: string) => {
  const [updateTasksSetCall, { isLoading: isUpdate, isError: isPatchTasksError }] =
    useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const currentDraggable = useAppSelector((state) => state.drag.currentDraggable) as ITaskData;
  const type = useAppSelector((state) => state.drag.type);
  const displayedData = useAppSelector((state) => state.localData);

  const updateTasksSet = useCallback(
    (data: Pick<ITaskData, '_id' | 'order' | 'columnId'>[]) => {
      updateTasksSetCall(data);
    },
    [updateTasksSetCall]
  );

  const dragDropHandler = useCallback(
    (e: React.DragEvent, data: ITaskData | Pick<ITaskData, 'columnId'>) => {
      if (type === 'task') {
        e.stopPropagation();
        e.preventDefault();
        const backUp = store.getState().localData;
        try {
          //если order присутствует в объекте, значит дроп происходит на таске, а не на колонке.
          if ('order' in data && currentDraggable) {
            if (data.columnId === currentDraggable.columnId) {
              const rebuiltLocalTasksList = tasks
                ?.map((task) => {
                  if (task.order === data.order) {
                    return { ...task, order: currentDraggable?.order };
                  }
                  if (task.order === currentDraggable?.order) {
                    return { ...task, order: data.order };
                  }
                  return task;
                })
                .sort(sortCards);
              dispatch(setLocalTasks({ tasks: rebuiltLocalTasksList ?? [], columnId }));
            } else {
              const endDragCol = displayedData.find((item) => item.column === data.columnId);
              const startDragCol = displayedData.find(
                (item) => item.column === currentDraggable.columnId
              );
              console.log(endDragCol, startDragCol);
              const rebuiltStartDragCol = startDragCol?.tasks?.map((item) => {
                if (item._id === currentDraggable._id) {
                  return Object.assign({}, data, {
                    columnId: currentDraggable.columnId,
                    order: currentDraggable.order,
                  });
                }
                return item;
              });
              const rebuiltEndDragCol = endDragCol?.tasks?.map((item) => {
                if (item._id === data._id) {
                  return Object.assign({}, currentDraggable, {
                    columnId: data.columnId,
                    order: data.order,
                  });
                }
                return item;
              });
              console.log(endDragCol, startDragCol);
              dispatch(
                setLocalTasks({
                  tasks: rebuiltStartDragCol ?? [],
                  columnId: currentDraggable.columnId,
                })
              );
              dispatch(setLocalTasks({ tasks: rebuiltEndDragCol ?? [], columnId: data.columnId }));
            }
            dropOnTaskRequest(currentDraggable, data, updateTasksSet);
          } else {
            if (data.columnId !== currentDraggable.columnId) {
              const endDragCol = displayedData.find((item) => item.column === data.columnId);
              const startDragCol = displayedData.find(
                (item) => item.column === currentDraggable.columnId
              );
              if (endDragCol && endDragCol.tasks) {
                const copy = [...endDragCol.tasks];
                const dragItem = Object.assign({}, currentDraggable, { columnId: data.columnId });
                const rebuiltLocalTasksList = [...copy, dragItem].map(reorder);
                dispatch(setLocalTasks({ tasks: rebuiltLocalTasksList, columnId: data.columnId }));
              }
              if (startDragCol && startDragCol.tasks) {
                const copy = [...startDragCol.tasks];
                const rebuiltLocalTasksList = copy
                  .filter((task) => task._id !== currentDraggable._id)
                  .map(reorder);
                dispatch(
                  setLocalTasks({ tasks: rebuiltLocalTasksList, columnId: startDragCol.column })
                );
              }
              dropOnColumnRequest(currentDraggable, data, updateTasksSet);
            }
          }
        } catch {
          toast.error(i18n.t('task.dragError'));
          dispatch(updateLocalState(backUp));
        }
        (e.target as HTMLDivElement).classList.remove('shadow', 'shadow-blue-400');
      }
    },
    [updateTasksSet, currentDraggable, type, dispatch, displayedData, tasks, columnId]
  );

  const dragStartHandler = useCallback(
    (e: React.DragEvent, data: ITaskData) => {
      e.stopPropagation();
      dispatch(setCurrentDraggable({ itemInfo: data, type: 'task' }));
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
      dispatch(resetCurrentDraggable());
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
  draggedTask: ITaskData,
  droppedTask: ITaskData,
  callback: (data: Pick<ITaskData, '_id' | 'order' | 'columnId'>[]) => void
) {
  if (droppedTask.order !== draggedTask?.order || droppedTask.columnId !== draggedTask?.columnId) {
    const { _id: draggedElemId, order: draggedElemOrder, columnId: draggedElemCol } = draggedTask;
    const { _id: droppedElemId, order: droppedElemOrder, columnId: droppedElemCol } = droppedTask;

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

    callback(requestBody);
  }
}

async function dropOnColumnRequest(
  draggedTask: ITaskData,
  droppedColumn: { columnId: string },
  callback: (data: Pick<ITaskData, '_id' | 'order' | 'columnId'>[]) => void
) {
  if (droppedColumn.columnId !== draggedTask.columnId) {
    const requestBody = [
      {
        _id: draggedTask._id,
        order: draggedTask.order,
        columnId: droppedColumn.columnId,
      },
    ];
    callback(requestBody);
  }
}
