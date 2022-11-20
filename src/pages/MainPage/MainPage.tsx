import { useTranslation } from 'react-i18next';
import { CreateCard } from '../../components';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { BoardCard } from '../../components';
import { useGetBoardsQuery } from '../../redux/api/boardsApi';
import Modal from '../../components/Modal/Modal';
import { modalText } from '../../utils/constants/constants';

const MainPage = () => {
  const { t } = useTranslation();
  const { title } = modalText.board;
  const { isLoading, isError, data: boardsSet } = useGetBoardsQuery();

  const dispatch = useAppDispatch();

  const openCreateModal = () => {
    dispatch(showModal({ type: ModalTypes.createBoard }));
  };

  return (
    <div className="container flex flex-col align-top text-gray-700 flex-grow">
      <h1 className="text-[32px] m-[40px]">{t('main.title')}</h1>
      <Modal />
      <div className="flex flex-wrap items-center w-[100%] gap-[20px] justify-center md:justify-start">
        <CreateCard title={t(title)} onClick={openCreateModal} />
        {boardsSet?.map(({ _id: id, title }) => (
          <BoardCard key={id} id={id} title={title} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full h-[150px] text-2xl">
        {isLoading && <p>{t('main.loading')}</p>}
        {isError && <p>{t('main.errorMessage')}</p>}
      </div>
    </div>
  );
};

export default MainPage;
