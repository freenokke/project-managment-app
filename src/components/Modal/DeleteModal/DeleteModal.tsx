import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { closeModal, ModalTypes } from '../../../redux/features/modalSlice';
import { Button } from '@material-tailwind/react';
import useBoardModal from '../useBoardModal';
import { ModalChild } from '../Modal.types';

const DeleteModal = ({ data, type }: ModalChild) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const { deleteBoard } = useBoardModal();

  const onDelete = useCallback(() => {
    if (type === ModalTypes.deleteBoard) {
      deleteBoard(data ?? '');
    }
    if (type === ModalTypes.deleteColumn) {
      console.log('DELETE COLUMN');
    }
    if (type === ModalTypes.deleteTask) {
      console.log('DELETE TASK');
    }
    onCloseModal();
  }, [type, onCloseModal, deleteBoard, data]);

  const { title, text } = useMemo(() => {
    if (type === ModalTypes.deleteBoard) {
      return {
        title: 'boardTitle',
        text: 'deleteModal.boardText',
      };
    } else if (type === ModalTypes.deleteColumn) {
      return {
        title: 'columnTitle',
        text: 'deleteModal.columnText',
      };
    } else {
      return {
        title: 'taskTitle',
        text: 'deleteModal.taskText',
      };
    }
  }, [type]);

  return (
    <div className="flex flex-col p-[20px] w-full sm:w-full h-full gap-y-[25px]">
      <h2 className="text-[24px] mt-[20px]">
        {t('deleteModal.title')} {t(title)}?
      </h2>
      <p className="text-[18px]">{t(text)}</p>
      <div className="flex justify-end gap-[10px] w-full">
        <Button variant="outlined" onClick={onCloseModal}>
          {t('deleteModal.modalCancelButton')}
        </Button>
        <Button onClick={onDelete} color="red">
          {t('deleteModal.modalDeleteButton')}
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
