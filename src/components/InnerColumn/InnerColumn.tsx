import { FC, useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { IProps } from './InnerColumn.type';
import { ITaskData, useGetTasksQuery } from '../../redux/api/tasksApi';
import { TaskWrapper, CreateCard } from '../../components';
import { modalText } from '../../utils/constants/constants';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import InnerColumnHeader from './InnerColumnHeader/InnerColumnHeader';

const InnerColumn: FC<IProps> = ({ boardId, columnId, columnTitle }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { title } = modalText.task;
  const { data: tasks } = useGetTasksQuery({
    boardId,
    columnId,
  });
  const [displayedTasks, setDisplayedTasks] = useState<ITaskData[]>([]);

  const { dragDropHandler, dragEndHandler, dragLeaveHandler, dragOverHandler, dragStartHandler } =
    useDraggable(displayedTasks, setDisplayedTasks);

  useEffect(() => {
    if (tasks) {
      const copy = [...Array.from(tasks)];
      copy.sort(sortCards);
      setDisplayedTasks(copy);
    }
  }, [tasks]);

  const openCreateModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.createTask, data: { boardId, columnId } }));
  }, [dispatch, boardId, columnId]);

  function sortCards(a: ITaskData, b: ITaskData) {
    return a.order - b.order;
  }

  console.log(displayedTasks);

  return (
    <div className="bg-blue-gray-50 rounded flex flex-col w-full max-h-full relative whitespace-normal text-sm font-sans">
      <InnerColumnHeader columnTitle={columnTitle} taskCount={displayedTasks.length} />
      <div className="flex flex-col w-full items-center gap-2 p-1 overflow-x-hidden overflow-y-auto">
        {displayedTasks?.map((task) => (
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
      </div>
      <CreateCard title={t(title)} onClick={openCreateModal} />
    </div>
  );
};

export default InnerColumn;
