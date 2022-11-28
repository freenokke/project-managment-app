import { useCreateColumnMutation } from '../../redux/api/columnsApi';
import { IColumnData } from '../../pages/BoardPage/BoardPage.types';

const useColumnModal = () => {
  const [createColumnCall, {}] = useCreateColumnMutation();

  const createColumn = async (boardId: string, body: IColumnData) => {
    await createColumnCall({ boardId, body })
      .unwrap()
      .then((data) => console.log(data));
  };

  return {
    createColumn,
  };
};

export default useColumnModal;
