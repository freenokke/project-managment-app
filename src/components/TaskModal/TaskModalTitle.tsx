import { useTranslation } from 'react-i18next';
import { useCallback, useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux.hooks';
import { ModalChild } from '../Modal/Modal.types';
import ModalInput from '../Modal/ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import useTaskModal from '../Modal/useTaskModal';
import { IFormFields } from './TaskModal.types';
import { SubmitHandler } from 'react-hook-form';

const TaskModalTitle = ({
  register,
  handleSubmit,
  setValue,
  reset,
  errors,
  isDirty,
  isValid,
  isSubmitted,
}: ModalChild) => {
  const { t } = useTranslation();

  const { editTask } = useTaskModal();
  const { taskData } = useAppSelector((state) => state.taskModal);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(taskData?.title ?? '');
  const [inputValue, setInputValue] = useState(title);

  const toggleEditMode = useCallback(() => {
    setEditing(!editing);
    reset();
    setInputValue(title);
  }, [editing, reset, title]);

  useEffect(() => {
    setValue('title', inputValue);
  }, [inputValue, setValue, taskData?.title]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const editTaskFromModal: SubmitHandler<IFormFields> = (formData: IFormFields) => {
    setTitle(inputValue);
    toggleEditMode();
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
      editTask(data);
    }
  };

  return !editing ? (
    <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center lg:gap-[10px] p-[20px_10px_57px] lg:p-[24px_20px_36px]  border-b-2">
      <h1 className="text-[22px] lg:text-[24px] self-start overflow-x-scroll pl-[20px]">{title}</h1>
      <Button
        variant="text"
        className="flex order-first lg:order-2 items-center h-[36px] lg:h-[40px]"
        onClick={toggleEditMode}
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
            onClick={toggleEditMode}
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
