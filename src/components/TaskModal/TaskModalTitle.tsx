import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks/redux.hooks';
import { Button } from '@material-tailwind/react';
import useTaskModal from '../Modal/useTaskModal';

const TaskModalTitle = () => {
  const { t } = useTranslation();

  const { editTask } = useTaskModal();
  const { taskData } = useAppSelector((state) => state.taskModal);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(taskData?.title ?? '');
  const [value, setValue] = useState(title);
  const [textError, setTextError] = useState('');

  const toggleEditMode = useCallback(() => {
    setEditing(!editing);
    setValue(title);
    setTextError('');
  }, [editing, title]);

  const error = {
    requiredText: 'modalValidation.requiredError',
    limitText: 'modalValidation.maxLength',
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.value.trim().length) {
      setTextError(error.requiredText);
      setValue('');
    } else if (event.target?.value.trim().length > 25) {
      setTextError(error.limitText);
    } else {
      setValue(event.target?.value);
      setTextError('');
    }
  };

  const editTaskFromModal = () => {
    setTitle(value.trim());
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
    <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center lg:gap-[10px] p-[10px_10px_57px] lg:p-[20px]">
      <h1 className="text-[22px] lg:text-[24px] self-start overflow-x-scroll">{title}</h1>
      <Button
        variant="text"
        className="flex order-first lg:order-2 items-center h-[20px] md:h-[30px]"
        onClick={toggleEditMode}
      >
        {t('editModal.modalButton')}
      </Button>
    </div>
  ) : (
    <div className="column mt-[24px] lg:mt-0 lg:row">
      <form className="column p-[10px] lg:gap-[10px] lg:row lg:justify-between lg:p-[20px_20px_2px] items-start">
        <div className="w-full flex flex-col flex-grow">
          <input className="p-[5px_10px]" value={value} onChange={handleInput} autoFocus />
          <div className="w-full h-[20px] p-[0px_10px] text-[14px] text-red-600">
            {textError && t(textError)}
          </div>
        </div>
        <div className="self-end lg:self-start row gap-[5px]">
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
            disabled={!!textError}
          >
            {t('modal.modalSaveButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskModalTitle;
