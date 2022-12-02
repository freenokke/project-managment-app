import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import { useForm } from 'react-hook-form';
import { IFormFields } from './TaskModal.types';
import { closeTaskModal } from '../../redux/features/taskModalSlice';
import TaskModalTitle from './TaskModalTitle';
import TaskModalDescription from './TaskModalDescription';
import TaskModalInfo from './TaskModalInfo';

const TaskModal = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitted },
  } = useForm<IFormFields>();

  const { visible } = useAppSelector((state) => state.taskModal);

  const onCloseTaskModal = useCallback(() => {
    dispatch(closeTaskModal());
  }, [dispatch]);

  if (!visible) return null;

  return (
    <>
      <div
        onClick={onCloseTaskModal}
        className="modalOverlay absolute bg-blue-gray-300/[0.4] z-10"
      />
      <div className="absolute top-0 bottom-0 right-0 left-0 sm:left-[15%] z-20 overflow-y-scroll shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-white p-[40px_10px] md:p-[40px_30px] lg:p-[50px]h-full">
        <span
          className="material-icons absolute top-[15px] right-[15px] text-slate-900 cursor-pointer"
          onClick={onCloseTaskModal}
        >
          close
        </span>
        <div className="h-full column">
          <TaskModalTitle
            register={register}
            handleSubmit={handleSubmit}
            setValue={setValue}
            reset={reset}
            errors={errors}
            isDirty={isDirty}
            isValid={isValid}
            isSubmitted={isSubmitted}
          />
          <div className="column flex-grow lg:row">
            <div className="column flex-grow lg:w-[60%] p-[20px_10px] lg:p-[20px]  border-b-2 lg:border-r-2 lg:border-b-0">
              <TaskModalDescription
                register={register}
                handleSubmit={handleSubmit}
                reset={reset}
                setValue={setValue}
                errors={errors}
                isDirty={isDirty}
                isValid={isValid}
                isSubmitted={isSubmitted}
              />
            </div>
            <div className="column gap-[40px] p-[22px_20px] lg:w-[40%]">
              <TaskModalInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;