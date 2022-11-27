import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks/redux.hooks';
import { Button } from '@material-tailwind/react';
import useTaskModal from '../Modal/useTaskModal';

const TaskModalDescription = () => {
  const { t } = useTranslation();
  const { editTask } = useTaskModal();

  const { taskData } = useAppSelector((state) => state.taskModal);

  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(taskData?.description ?? '');
  const [value, setValue] = useState(description);

  const toggleEditMode = useCallback(() => {
    setEditing(!editing);
    setValue(description);
  }, [description, editing]);

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target?.value);
  };

  const editDescription = () => {
    setDescription(value);
    toggleEditMode();
    if (taskData) {
      const body = {
        title: taskData.title,
        description: value,
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
    <div className="column">
      <Button
        variant="text"
        className="self-end h-[20px] md:h-[30px] flex items-center"
        onClick={toggleEditMode}
      >
        {t('editModal.modalButton')}
      </Button>
      <h3 className="p-[0_20px] text-[20px]">{t('modal.labelTextarea')}</h3>
      <div className="p-[20px_0] lg:p-[20px]">{description}</div>
    </div>
  ) : (
    <>
      <h3 className="p-[30px_20px_10px] text-[20px]">{t('modal.labelTextarea')}</h3>
      <textarea
        className="w-full h-full p-[10px_10px] lg:p-[20px]"
        value={value}
        onChange={handleTextarea}
        autoFocus
      />
      <div className="self-end row gap-[5px] mt-[30px]">
        <Button
          variant="outlined"
          className="h-[20px] md:h-[32px] flex items-center"
          onClick={toggleEditMode}
        >
          {t('modal.modalCancelButton')}
        </Button>
        <Button
          color="green"
          className="h-[26px] md:h-[32px] flex items-center"
          onClick={editDescription}
        >
          {t('modal.modalSaveButton')}
        </Button>
      </div>
    </>
  );
};

export default TaskModalDescription;
