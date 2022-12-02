import { useCreateColumnMutation } from '../../redux/api/columnsApi';
import { IColumnData } from '../../pages/BoardPage/BoardPage.types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useColumnModal = () => {
  const [createColumnCall, {}] = useCreateColumnMutation();
  const { t } = useTranslation();

  const options = {
    className: 'black-background',
    bodyClassName: 'grow-font-size',
    progressClassName: 'fancy-progress-bar',
  };

  const createColumn = async (boardId: string, body: IColumnData) => {
    await createColumnCall({ boardId, body })
      .unwrap()
      .then((data) => console.log(data))
      .catch(() => {
        toast.error(t('createColumn.error'), options);
      });
  };

  return {
    createColumn,
  };
};

export default useColumnModal;
