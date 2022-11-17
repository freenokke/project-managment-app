import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../../../hooks/redux.hooks';
import { closeModal, ModalTypes } from '../../../../redux/features/modalSlice';
// import ModalTextarea from '../ModalTextarea/ModalTextarea';
import { Button } from '@material-tailwind/react';
import useBoardModal from '../../../../hooks/useBoardModal';
import { ModalChild } from '../../Modal.types';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({ data, type }: ModalChild) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { deleteBoard } = useBoardModal();

  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onDelete = useCallback(() => {
    deleteBoard(data ?? '');
    onCloseModal();
  }, [deleteBoard, onCloseModal, data]);

  const { title, text } = useMemo(() => {
    if (type === ModalTypes.deleteBoard) {
      return {
        title: 'deleteModal.boardTitle',
        text: 'deleteModal.boardText',
      };
    } else {
      return {
        title: 'deleteModal.columnTitle',
        text: 'deleteModal.columnText',
      };
    }
  }, [type]);

  return (
    <div className="flex flex-col w-full sm:w-full h-full gap-y-[25px]">
      <h2 className="text-[24px] mt-[20px]">Delete {t(title)}?</h2>
      <p className="text-[18px]">{t(text)}</p>
      <div className="flex justify-end gap-[10px] w-full">
        <Button variant="outlined" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default DeleteModal;
