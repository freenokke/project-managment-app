import { useCreateColumnMutation, useDeleteColumnMutation } from '../../redux/api/columnsApi';
import { IColumnData } from '../../pages/BoardPage/BoardPage.types';
import { ModalData } from './Modal.types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useColumnModal = () => {
  const [createColumnCall, {}] = useCreateColumnMutation();
  const [deleteColumnCall, {}] = useDeleteColumnMutation();
  const { t } = useTranslation();

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
      const deleteColumn = async ({ boardId, columnId }: ModalData) => {
        await deleteColumnCall({ boardId, columnId }).unwrap();
  };

  return {
    createColumn,
    deleteColumn,
  };
};

export default useColumnModal;
