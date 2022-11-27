import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks/redux.hooks';
import { Button } from '@material-tailwind/react';
import useTaskModal from '../Modal/useTaskModal';

const TaskModalTitle = ({}) => {
  const { t } = useTranslation();
  const { editTask } = useTaskModal();
  const { taskData } = useAppSelector((state) => state.taskModal);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(taskData?.title ?? '');
  const [value, setValue] = useState(title);

  const toggleEditMode = useCallback(() => {
    setEditing(!editing);
    setValue(title);
  }, [editing, title]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target?.value);
  };

  const editTaskFromModal = () => {
    setTitle(value);
    toggleEditMode();
    if (taskData) {
      const body = {
        title: value,
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
    <div className="flex justify-between items-end lg:items-center gap-[10px] p-[20px_20px_55px] lg:p-[20px]">
      <h1 className="text-[24px]">{title}</h1>
      <Button
        variant="outlined"
        className="flex items-center h-[20px] md:h-[30px]"
        onClick={toggleEditMode}
      >
        {t('editModal.modalButton')}
      </Button>
    </div>
  ) : (
    <form className="column p-[20px] gap-[10px] lg:row lg:justify-between">
      <input className="p-[5px_10px] lg:flex-grow" value={value} onChange={handleInput} autoFocus />
      <div className="self-end row gap-[5px]">
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
          onClick={editTaskFromModal}
        >
          {t('modal.modalSaveButton')}
        </Button>
      </div>
    </form>
  );
};

export default TaskModalTitle;
