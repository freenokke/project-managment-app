import { useTranslation } from 'react-i18next';
import { useCallback, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import ModalInput from '../Modal/ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import { IFormFields, TaskModalProps } from './TaskModal.types';
import { SubmitHandler } from 'react-hook-form';
import { setIsErrorEditTask } from '../../redux/features/boardInfoSlice';

const TaskModalTitle = ({
  register,
  handleSubmit,
  setValue,
  reset,
  errors,
  isDirty,
  isValid,
  isSubmitted,
  editTask,
}: TaskModalProps) => {
  const { t } = useTranslation();
  const { taskData } = useAppSelector((state) => state.taskModal);
  const { isErrorEditTask } = useAppSelector((state) => state.boardInfo);
  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(taskData?.title ?? '');
  const [inputValue, setInputValue] = useState(title);
  const [prevTitle, setPrevTitle] = useState('');

  const openEditMode = useCallback(() => {
    setEditing(!editing);
    setInputValue(title);
    dispatch(setIsErrorEditTask(false));
    setValue('title', inputValue);
  }, [dispatch, editing, inputValue, setValue, title]);

  const closeEditMode = useCallback(() => {
    setEditing(!editing);
    reset();
  }, [editing, reset]);

  useEffect(() => {
    if (isErrorEditTask) {
      setTitle(prevTitle);
    }
    setValue('title', inputValue);
  }, [dispatch, inputValue, isErrorEditTask, prevTitle, setValue, title]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const editTaskFromModal: SubmitHandler<IFormFields> = (formData: IFormFields) => {
    setPrevTitle(title);
    if (taskData) {
      const body = {
        title: formData.title,
        description: taskData.description,
        columnId: taskData.columnId,
        userId: taskData.userId,
        order: taskData.order,
        users: taskData.users,
      };
      const data = {
        boardId: taskData.boardId,
        columnId: taskData.columnId,
        _id: taskData._id,
        body,
      };
      editTask(data).finally(() => closeEditMode());
      if (!isErrorEditTask) {
        setTitle(inputValue);
      }
    }
  };

  return !editing ? (
    <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center lg:gap-[10px] p-[20px_10px_57px] lg:p-[24px_20px_36px]  border-b-2">
      <h1 className="text-[22px] lg:text-[24px] self-start break-words pl-[20px]">{title}</h1>
      <Button
        variant="text"
        className="flex order-first lg:order-2 items-center h-[36px] lg:h-[40px]"
        onClick={openEditMode}
      >
        {t('editModal.modalButton')}
      </Button>
    </div>
  ) : (
    <div className="column mt-[18px] lg:mt-0 lg:row  border-b-2">
      <form
        onSubmit={handleSubmit(editTaskFromModal)}
        className="column p-[0_10px_14px] lg:gap-[10px] lg:row lg:justify-between lg:p-[20px_20px_2px] items-start"
        autoComplete="off"
      >
        <ModalInput
          name="title"
          label={t('modal.labelInput')}
          value={inputValue}
          onChange={handleInput}
          register={register}
          errors={errors}
        />
        <div className="self-end lg:self-start row gap-[5px] lg:pt-[3px]">
          <Button
            variant="outlined"
            className="h-[36px] lg:h-[40px] flex items-center"
            onClick={closeEditMode}
          >
            {t('modal.modalCancelButton')}
          </Button>
          <Button
            color="green"
            type="submit"
            className="h-[36px] lg:h-[40px] flex items-center"
            disabled={!isDirty || (isSubmitted && !isValid)}
          >
            {t('modal.modalSaveButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskModalTitle;
