import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { closeModal } from '../../../redux/features/modalSlice';
import { IFormFields } from './CreateModal.types';
import ModalInput from '../ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import useBoardModal from '../useBoardModal';
import useColumnModal from '../useColumnModal';
import useTaskModal from '../useTaskModal';
import { ModalChild } from '../Modal.types';
import { ModalTypes } from '../../../redux/features/modalSlice';
import { INewTask, ITaskCreate } from '../../../redux/api/tasksApi';
import { tasksApi } from '../../../redux/api/tasksApi';

const CreateModal = ({
  register,
  handleSubmit,
  reset,
  errors,
  isDirty,
  isValid,
  isSubmitted,
  type,
  userId,
  data,
}: ModalChild) => {
  const { t } = useTranslation();
  const { boardId, maxOrder } = useAppSelector((state) => state.boardInfo);
  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const { createBoard } = useBoardModal();
  const { createColumn } = useColumnModal();
  const { createTask } = useTaskModal();

  const title = useMemo(() => {
    if (type === ModalTypes.createBoard) {
      return 'boardTitle';
    } else if (type === ModalTypes.createColumn) {
      return 'columnTitle';
    } else {
      return 'taskTitle';
    }
  }, [type]);

  const onSubmit: SubmitHandler<IFormFields> = useCallback(
    (formData) => {
      if (type === ModalTypes.createBoard) {
        const boardData = { title: formData.title, owner: userId ?? '', users: [] };
        createBoard(boardData);
      }
      if (type === ModalTypes.createColumn) {
        const order = maxOrder + 1;
        const columnData = { title: formData?.title, order };
        createColumn(boardId, columnData);
      }
      if (type === ModalTypes.createTask) {
        const { data: queryData } = useQueryStateResult;
        if (queryData) {
          const body: INewTask = {
            title: formData.title,
            description: formData.description,
            userId: userId ?? '',
            order: queryData.length + 1,
            users: [],
          };
          const taskData: ITaskCreate = {
            boardId: data?.boardId ?? '',
            columnId: data?.columnId ?? '',
            body,
          };
          createTask(taskData);
        }
      }
      reset();
      onCloseModal();
    },
    [
      type,
      reset,
      onCloseModal,
      userId,
      createBoard,
      maxOrder,
      createColumn,
      boardId,
      data?.boardId,
      data?.columnId,
      createTask,
    ]
  );

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mb-10">
        {t('createModal.modalTitle')} {t(title)}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-9 w-full mb-[40px]"
        autoComplete="off"
      >
        <ModalInput
          name="title"
          label={t('modal.labelInput')}
          register={register}
          errors={errors}
        />
        {type === ModalTypes.createTask && (
          <ModalInput
            name="description"
            label={t('modal.labelTextarea')}
            register={register}
            errors={errors}
          />
        )}
        <Button type="submit" className="w-full" disabled={!isDirty || (isSubmitted && !isValid)}>
          {t('createModal.modalButton')}
        </Button>
      </form>
    </div>
  );
};

export default CreateModal;
