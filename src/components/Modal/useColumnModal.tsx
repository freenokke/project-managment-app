import { useCreateColumnMutation, useDeleteColumnMutation } from '../../redux/api/columnsApi';
import { IColumnData } from '../../pages/BoardPage/BoardPage.types';
import { ModalData } from './Modal.types';

const useColumnModal = () => {
  const [createColumnCall, {}] = useCreateColumnMutation();
  const [deleteColumnCall, {}] = useDeleteColumnMutation();

  const createColumn = async (boardId: string, body: IColumnData) => {
    await createColumnCall({ boardId, body }).unwrap();
  };

  const deleteColumn = async ({ boardId, columnId }: ModalData) => {
    await deleteColumnCall({ boardId, columnId }).unwrap();
  };

  return {
    createColumn,
    deleteColumn,
  };
};

export default useColumnModal;
