import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { ModalTypes } from '../../../redux/features/modalSlice';
import { Button } from '@material-tailwind/react';
import { DeleteModalProps } from '../Modal.types';
import { closeTaskModal } from '../../../redux/features/taskModalSlice';
import { setColumnToReorder } from '../../../redux/features/boardInfoSlice';
import { deleteUser } from '../../../redux/features/userSlice';
import { logOut } from '../../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({
  data,
  type,
  onCloseModal,
  deleteBoard,
  deleteColumn,
  deleteTask,
}: DeleteModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onDelete = useCallback(async () => {
    if (type === ModalTypes.deleteBoard) {
      deleteBoard(data ?? {});
    }
    if (type === ModalTypes.deleteColumn) {
      dispatch(setColumnToReorder(data?.columnId ?? null));
      deleteColumn(data ?? {});
    }
    if (type === ModalTypes.deleteTask) {
      deleteTask(data ?? {});
      dispatch(closeTaskModal());
    }
    if (type === ModalTypes.deleteUser) {
      if (userId && token) {
        dispatch(logOut());
        navigate('/');
        await dispatch(deleteUser({ userId, token }));
      }
    }
    onCloseModal();
  }, [
    type,
    onCloseModal,
    deleteBoard,
    data,
    deleteColumn,
    deleteTask,
    dispatch,
    userId,
    token,
    navigate,
  ]);

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
    } else if (type === ModalTypes.deleteUser) {
      return {
        title: 'editProfile.modalTitle',
        text: 'editProfile.modalText',
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
          {t('modal.modalCancelButton')}
        </Button>
        <Button onClick={onDelete} color="red">
          {t('modal.modalDeleteButton')}
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
