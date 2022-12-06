import { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { IProps } from './InnerColumn.type';
import { useGetTasksQuery } from '../../redux/api/tasksApi';
import { TaskWrapper } from '../../components';
import { useDraggable } from '../../hooks/useTasksDraggable';
import InnerColumnHeader from './InnerColumnHeader/InnerColumnHeader';
import InnerColumnFooter from './InnerColumnFooter/InnerColumnFooter';
import InnerColumnContent from './InnerColumnContent/InnerColumnContent';
import { setLocalTasks, updateLocalState } from '../../redux/features/localDataSlice';

const InnerColumn: FC<IProps> = ({ boardId, columnId, order, columnTitle }) => {
  const dispatch = useAppDispatch();
  const {
    data: tasks,
    isLoading,
    isFetching,
    isError,
  } = useGetTasksQuery({
    boardId,
    columnId,
  });
  const displayedTasks = useAppSelector((state) =>
    state.localData.find((item) => item.column === columnId)
  );

  useEffect(() => {
    if (tasks) {
      dispatch(setLocalTasks({ tasks, columnId }));
    }
  }, [tasks, columnId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(updateLocalState([]));
    };
  }, [dispatch]);

  const { dragDropHandler, dragEndHandler, dragLeaveHandler, dragOverHandler, dragStartHandler } =
    useDraggable(displayedTasks?.tasks ?? [], displayedTasks?.column ?? '');

  const openCreateModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.createTask, data: { boardId, columnId } }));
  }, [dispatch, boardId, columnId]);

  return (
    <div className="rounded flex flex-col w-full h-full relative whitespace-normal text-sm font-sans">
      <InnerColumnHeader
        columnTitle={columnTitle}
        taskCount={displayedTasks?.tasks?.length}
        boardId={boardId}
        columnId={columnId}
        order={order}
      />
      <InnerColumnContent
        onDragOverFn={dragOverHandler}
        onDragDropFn={dragDropHandler}
        onDragLeaveFn={dragLeaveHandler}
        loading={isLoading || isFetching}
        columnId={columnId}
      >
        {displayedTasks?.tasks?.map((task) => (
          <TaskWrapper
            key={task._id}
            taskData={task}
            onDragStartFn={dragStartHandler}
            onDragDropFn={dragDropHandler}
            onDragOverFn={dragOverHandler}
            onDragLeaveFn={dragLeaveHandler}
            onDragEndFn={dragEndHandler}
          />
        ))}
      </InnerColumnContent>
      <InnerColumnFooter openModalFn={openCreateModal} />
      {isError && (
        <div className="absolute flex flex-col items-center justify-center inset-0 z-10 bg-gray-100">
          😥 Error while data loading...
        </div>
      )}
    </div>
  );
};

export default InnerColumn;
