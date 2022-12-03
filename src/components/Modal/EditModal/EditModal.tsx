import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/redux.hooks';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IFormFields } from './EditModal.type';
import ModalInput from '../ModalInput/ModalInput';
import ModalTextarea from '../ModalTextarea/ModalTextarea';
import { Button } from '@material-tailwind/react';
import { EditModalProps } from '../Modal.types';
import { ModalTypes } from '../../../redux/features/modalSlice';
import { useGetBoardsQuery } from '../../../redux/api/boardsApi';

const EditModal = ({
  register,
  handleSubmit,
  setValue,
  formState,
  data,
  type,
  onCloseModal,
  editBoard,
  editTask,
}: EditModalProps) => {
  const { errors, isDirty, isValid, isSubmitted } = formState;
  const { userId } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  const { data: boardsSet } = useGetBoardsQuery(userId ?? '');
  const board = boardsSet?.find(({ _id }) => _id === data?.boardId);

  useEffect(() => {
    if (type === ModalTypes.editBoard) {
      setValue('title', board?.title ?? '');
    }
    if (type === ModalTypes.editColumn) {
      console.log('hello');
    }
    if (type === ModalTypes.editTask) {
      setValue('title', data?.taskData?.title ?? '');
      setValue('description', data?.taskData?.description ?? '');
    }
  }, [board?.title, data?.taskData?.description, data?.taskData?.title, setValue, type]);

  const [inputValue, setInputValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const title = useMemo(() => {
    if (type === ModalTypes.editBoard) {
      return 'boardTitle';
    } else if (type === ModalTypes.editColumn) {
      return 'columnTitle';
    } else {
      return 'taskTitle';
    }
  }, [type]);

  const onSubmit: SubmitHandler<IFormFields> = useCallback(
    (formData) => {
      if (type === ModalTypes.editBoard) {
        editBoard(data ?? {}, { title: formData.title, owner: userId ?? '', users: [] });
      }
      if (type === ModalTypes.editColumn) {
        console.log(formData);
      }
      if (type === ModalTypes.editTask) {
        if (data?.taskData) {
          const { _id, boardId, columnId, order, userId, users } = data.taskData;
          const body = {
            title: formData.title,
            order,
            description: formData.description,
            columnId,
            userId,
            users,
          };
          const requestTaskData = {
            _id,
            boardId,
            columnId,
            body,
          };
          editTask(requestTaskData);
        }
      }
      onCloseModal();
    },
    [type, onCloseModal, editBoard, data, userId, editTask]
  );

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mb-10">
        {t('editModal.modalTitle')} {t(title)}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-[15px] w-full lg:mb-[40px]"
        autoComplete="off"
      >
        <ModalInput
          name="title"
          label={t('modal.labelInput')}
          register={register}
          errors={errors}
          value={inputValue}
          onChange={handleInput}
        />
        {type === ModalTypes.editTask && (
          <ModalTextarea
            name="description"
            label={t('modal.labelTextarea')}
            register={register}
            errors={errors}
            value={textValue}
            onChange={handleTextarea}
          />
        )}
        <Button
          type="submit"
          className="w-full h-[50px]"
          disabled={!isDirty || (isSubmitted && !isValid)}
        >
          {t('editModal.modalButton')}
        </Button>
      </form>
    </div>
  );
};

export default EditModal;
