import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux.hooks';
import { ModalChild } from '../Modal/Modal.types';
import ModalTextarea from '../Modal/ModalTextarea/ModalTextarea';
import { Button } from '@material-tailwind/react';
import useTaskModal from '../Modal/useTaskModal';

const TaskModalDescription = ({
  register,
  handleSubmit,
  setValue,
  errors,
  isDirty,
  isValid,
  isSubmitted,
}: ModalChild) => {
  const { t } = useTranslation();
  const { editTask } = useTaskModal();

  const { taskData } = useAppSelector((state) => state.taskModal);

  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(taskData?.description ?? '');
  const [textValue, setTextValue] = useState(description);

  const toggleEditMode = useCallback(() => {
    setEditing(!editing);
    setTextValue(description);
  }, [description, editing]);

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target?.value);
  };

  useEffect(() => {
    setValue('description', textValue);
  });

  const editDescription = () => {
    setDescription(textValue);
    toggleEditMode();
    if (taskData) {
      const body = {
        title: taskData.title,
        description: textValue,
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
    <div className="column h-[100%]">
      <Button
        variant="text"
        className="self-end h-[36px] lg:h-[40px] flex items-center"
        onClick={toggleEditMode}
      >
        {t('editModal.modalButton')}
      </Button>
      <h3 className="p-[0_20px] text-[20px]">{t('modal.labelTextarea')}</h3>
      <div className="p-[20px_10px] h-[188px] md:h-[194px] lg:p-[20px] mb-[0px] lg:mb-[56px] overflow-x-scroll flex-grow">
        {description}
      </div>
    </div>
  ) : (
    <>
      <form
        onSubmit={handleSubmit(editDescription)}
        className="column pt-[20px] lg:gap-[10px] lg:justify-between lg:p-[20px_0px_2px] items-start"
        autoComplete="off"
      >
        <ModalTextarea
          name="description"
          label={t('modal.labelTextarea')}
          register={register}
          errors={errors}
          value={textValue}
          onChange={handleTextarea}
        />

        <div className="self-end row gap-[10px] mt-[10px] lg:m-[30px_10px]">
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
    </>
  );
};

export default TaskModalDescription;
