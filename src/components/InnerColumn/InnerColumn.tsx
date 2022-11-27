import { FC, useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { IProps } from './InnerColumn.type';
import { useGetTasksQuery } from '../../redux/api/tasksApi';
import { TaskWrapper } from '../../components';
import { useDraggable } from '../../hooks/useTasksDraggable';
import InnerColumnHeader from './InnerColumnHeader/InnerColumnHeader';
import InnerColumnFooter from './InnerColumnFooter/InnerColumnFooter';
import InnerColumnContent from './InnerColumnContent/InnerColumnContent';

const InnerColumn: FC<IProps> = ({ boardId, columnId, columnTitle }) => {
  const dispatch = useAppDispatch();
  const {
    data: tasks,
    isLoading,
    isFetching,
  } = useGetTasksQuery({
    boardId,
    columnId,
  });

  const {
    dragDropHandler,
    dragEndHandler,
    dragLeaveHandler,
    dragOverHandler,
    dragStartHandler,
    isUpdate,
  } = useDraggable();

  const loading = useMemo(
    () => isLoading || isFetching || isUpdate,
    [isFetching, isLoading, isUpdate]
  );

  const openCreateModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.createTask, data: { boardId, columnId } }));
  }, [dispatch, boardId, columnId]);

  return (
    <div className="bg-blue-gray-50 rounded flex flex-col w-full h-full relative whitespace-normal text-sm font-sans">
      <InnerColumnHeader columnTitle={columnTitle} taskCount={tasks?.length} />
      <InnerColumnContent
        onDragOverFn={dragOverHandler}
        onDragDropFn={dragDropHandler}
        onDragLeaveFn={dragLeaveHandler}
        loading={loading}
        columnId={columnId}
      >
        {tasks?.map((task) => (
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
    </div>
  );
};

export default InnerColumn;
