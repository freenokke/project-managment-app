import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { closeModal } from '../../../redux/features/modalSlice';
import { IFormFields } from './CreateModal.types';
import ModalInput from '../ModalInput/ModalInput';
import { Button } from '@material-tailwind/react';
import useBoardModal from '../useBoardModal';
import useTaskModal from '../useTaskModal';
import { ModalChild } from '../Modal.types';
import { ModalTypes } from '../../../redux/features/modalSlice';
import { INewTask, ITaskCreate } from '../../../redux/api/tasksApi';

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

  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const { createBoard } = useBoardModal();
  const { createTask } = useTaskModal();

  const onSubmit: SubmitHandler<IFormFields> = useCallback(
    (formData) => {
      if (type === ModalTypes.createBoard) {
        const boardData = { title: formData.title, owner: userId ?? '', users: [] };
        createBoard(boardData);
      }
      if (type === ModalTypes.createColumn) {
        const columnData = { title: formData.title, owner: userId ?? '', users: [] };
        console.log(columnData);
      }
      if (type === ModalTypes.createTask) {
        const body: INewTask = {
          title: formData.title,
          description: formData.description,
          userId: userId ?? '',
          order: 0,
          users: [],
        };
        const taskData: ITaskCreate = {
          boardId: data?.boardId ?? '',
          columnId: data?.columnId ?? '',
          body,
        };
        createTask(taskData);
      }
      reset();
      onCloseModal();
    },
    [createBoard, onCloseModal, reset, type, userId]
  );

  return (
    <div className="container flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mb-10">{t('createModal.modalTitle')}</h1>
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
