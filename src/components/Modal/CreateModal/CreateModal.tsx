import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../../hooks/redux.hooks';
import { IFormFields } from './CreateModal.types';
import ModalInput from '../ModalInput/ModalInput';
import ModalTextarea from '../ModalTextarea/ModalTextarea';
import { Button } from '@material-tailwind/react';
import { CreateModalProps } from '../Modal.types';
import { ModalTypes } from '../../../redux/features/modalSlice';
import { INewTask, ITaskCreate, tasksApi } from '../../../redux/api/tasksApi';

const CreateModal = ({
  register,
  handleSubmit,
  formState,
  type,
  data,
  onCloseModal,
  createBoard,
  createColumn,
  createTask,
}: CreateModalProps) => {
  const { t } = useTranslation();
  const { boardId, maxOrder } = useAppSelector((state) => state.boardInfo);
  const { userId } = useAppSelector((state) => state.auth);

  const { errors, isDirty, isValid, isSubmitted } = formState;

  const useQueryStateResult = tasksApi.endpoints.getTasks.useQueryState({
    boardId: data?.boardId ?? '',
    columnId: data?.columnId ?? '',
  });

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
          const requestTaskData: ITaskCreate = {
            boardId: data?.boardId ?? '',
            columnId: data?.columnId ?? '',
            body,
          };
          createTask(requestTaskData);
        }
      }
      onCloseModal();
    },
    [
      type,
      userId,
      createBoard,
      maxOrder,
      data?.boardId,
      data?.columnId,
      createColumn,
      boardId,
      useQueryStateResult,
      onCloseModal,
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
        className="flex flex-col items-center gap-[10px] w-full mb-[20px]"
        autoComplete="off"
      >
        <ModalInput
          name="title"
          label={t('modal.labelInput')}
          register={register}
          errors={errors}
        />
        {type === ModalTypes.createTask && (
          <ModalTextarea
            name="description"
            label={t('modal.labelTextarea')}
            register={register}
            errors={errors}
          />
        )}
        <Button
          type="submit"
          className="w-full h-[50px]"
          disabled={!isDirty || (isSubmitted && !isValid)}
        >
          {t('createModal.modalButton')}
        </Button>
      </form>
    </div>
  );
};

export default CreateModal;
