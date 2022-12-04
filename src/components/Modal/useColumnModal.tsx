import { useCreateColumnMutation, useDeleteColumnMutation } from '../../redux/api/columnsApi';
import { IColumnData } from '../../pages/BoardPage/BoardPage.types';
import { ModalData } from './Modal.types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { useEffect } from 'react';
import { setIsLoadingColumn, setDeletingColumnError } from '../../redux/features/boardInfoSlice';

const useColumnModal = () => {
  const [createColumnCall, {}] = useCreateColumnMutation();
  const [deleteColumnCall, { isLoading: isDeletingColumn, isError: deletingColumnError }] =
    useDeleteColumnMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoadingColumn(isDeletingColumn));
    dispatch(setDeletingColumnError(deletingColumnError));
  }, [isDeletingColumn, dispatch, deletingColumnError]);

  const options = {
    className: 'black-background',
    bodyClassName: 'grow-font-size',
    progressClassName: 'fancy-progress-bar',
  };

  const createColumn = async (boardId: string, body: IColumnData) => {
    await createColumnCall({ boardId, body })
      .unwrap()
      .catch(() => {
        toast.error(t('createColumn.error'), options);
      });
  };
  const deleteColumn = async ({ boardId, columnId }: ModalData) => {
    await deleteColumnCall({ boardId, columnId })
      .unwrap()
      .catch(() => {
        toast.error(t('errorBoundary.text'));
      });
  };

  return {
    createColumn,
    deleteColumn,
  };
};

export default useColumnModal;
