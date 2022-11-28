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
  const [textError, setTextError] = useState('');

  const toggleEditMode = useCallback(() => {
    setEditing(!editing);
    setValue(description);
    setTextError('');
  }, [description, editing]);

  const error = {
    requiredText: 'modalValidation.requiredError',
    limitText: 'modalValidation.maxLengthText',
  };

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target?.value.trim().length) {
      setTextError(error.requiredText);
      setValue('');
    } else if (event.target?.value.trim().length > 100) {
      setTextError(error.limitText);
    } else {
      setValue(event.target?.value);
      setTextError('');
    }
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
    <div className="column h-[100%]">
      <Button
        variant="text"
        className="self-end h-[20px] flex items-center"
        onClick={toggleEditMode}
      >
        {t('editModal.modalButton')}
      </Button>
      <h3 className="p-[0_20px] text-[20px]">{t('modal.labelTextarea')}</h3>
      <div className="p-[20px_10px] h-[140px] lg:p-[20px] mb-[66px] lg:mb-[56px] overflow-x-scroll flex-grow">
        {description}
      </div>
    </div>
  ) : (
    <>
      <h3 className="p-[24px_20px_10px] text-[20px]">{t('modal.labelTextarea')}</h3>
      <textarea
        className="w-full h-[140px] p-[10px_10px] lg:p-[20px] lg:h-full resize-none"
        value={value}
        onChange={handleTextarea}
        autoFocus
      />
      <div className="w-full h-[20px] p-[0px_10px] lg:p-[0px_30px] text-[14px] text-red-600">
        {textError && t(textError)}
      </div>
      <div className="self-end row gap-[5px] mt-[10px] lg:mt-[30px]">
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
          disabled={!!textError}
        >
          {t('modal.modalSaveButton')}
        </Button>
      </div>
    </>
  );
};

export default TaskModalDescription;
