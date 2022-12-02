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
import { setLocalTasks } from '../../redux/features/localDataSlice';
import { setError } from '../../redux/features/errorSlice';
import { Link } from 'react-router-dom';

const InnerColumn: FC<IProps> = ({ boardId, columnId, order, columnTitle, deleteColumnFn }) => {
  const dispatch = useAppDispatch();
  const taskError = useAppSelector((state) => state.error.taskError);
  const {
    data: tasks,
    isLoading,
    isFetching,
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
    return () => {
      dispatch(setError({ error: false, type: 'task' }));
    };
  }, [tasks, columnId, dispatch]);

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
        deleteColumn={deleteColumnFn}
        boardId={boardId}
        columnId={columnId}
        order={order}
      />
      {!taskError && (
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
      )}
      {/* пока что вместо компонента ошибки */}
      {taskError && (
        <div className="absolute flex flex-col items-center justify-center inset-0 z-10 text-cyan-800 bg-gray-100">
          😥 Something went wrong...
          <div>
            Please
            <Link className="ml-1 underline font-semibold" to="/main">
              return back
            </Link>
          </div>
          or
          <span
            className="cursor-pointer underline font-semibold"
            onClick={() => window.location.reload()}
          >
            reload App
          </span>
        </div>
      )}
      <InnerColumnFooter openModalFn={openCreateModal} />
    </div>
  );
};

export default InnerColumn;
