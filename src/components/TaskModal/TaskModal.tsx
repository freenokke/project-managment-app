import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import { closeTaskModal } from '../../redux/features/taskModalSlice';
import Loader from '../Loader/Loader';
import TaskModalTitle from './TaskModalTitle';
import TaskModalDescription from './TaskModalDescription';
import TaskModalInfo from './TaskModalInfo';

const TaskModal = () => {
  const dispatch = useAppDispatch();
  const { visible, isLoading } = useAppSelector((state) => state.taskModal);

  const onCloseTaskModal = useCallback(() => {
    dispatch(closeTaskModal());
  }, [dispatch]);

  if (!visible) return null;

  return (
    <>
      {isLoading && <Loader />}
      <div
        onClick={onCloseTaskModal}
        className="modalOverlay absolute bg-blue-gray-300/[0.4] z-10"
      />
      <div className="absolute top-0 bottom-0 right-0 left-0 sm:left-[15%] z-20 overflow-y-scroll shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white p-[40px_10px] md:p-[40px_30px] lg:p-[50px]h-full ease-in duration-300">
        <span
          className="material-icons absolute top-[20px] right-[20px] text-slate-900 cursor-pointer"
          onClick={onCloseTaskModal}
        >
          close
        </span>
        <div className="h-full column lg:gap-[20px]">
          <TaskModalTitle />
          <div className="column flex-grow lg:row">
            <div className="column flex-grow lg:w-[60%] p-[20px_5px] md:p-[20px] border-2">
              <TaskModalDescription />
            </div>
            <div className="column border-2 gap-[40px] p-[22px_20px] lg:w-[40%]">
              <TaskModalInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
