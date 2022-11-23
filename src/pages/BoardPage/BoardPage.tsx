import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetColumnsQuery } from '../../redux/api/columnsApi';
import { AppDispatch } from '../../redux/store';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import Modal from '../../components/Modal/Modal';
import { Loader } from '../../components';

const BoardPage = () => {
  const { data, isLoading, isFetching } = useGetColumnsQuery('637a788b255b5e6beda34155');
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();
  const navigate = useNavigate();

  console.log('Колонки из запроса', data);

  const returnToMainPage = () => {
    navigate('/main');
  };

  const openCreateModal = () => {
    dispatch(showModal({ type: ModalTypes.createColumn }));
  };

  const loading = isLoading || isFetching;

  return (
    <div className="p-6 flex-grow flex flex-col justify-start items-center">
      <Modal />
      <div
        className=" flex items-center gap-2 self-start transition-colors  cursor-pointer text-gray-500 hover:text-blue-500"
        onClick={returnToMainPage}
      >
        <span className="material-icons">keyboard_backspace</span>
        {t('boardPage.backToBoardsList')}
      </div>
      <h1 className="">Board Name</h1>
      <button onClick={openCreateModal}>Create New Column</button>
      {loading && <Loader />}
      {data?.map(({ _id: id, title }) => {
        return (
          <div className="" key={id}>
            {title}
          </div>
        );
      })}
    </div>
  );
};

export default BoardPage;
