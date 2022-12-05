import { useTranslation } from 'react-i18next';
import { CreateCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { BoardCard, Loader, Error } from '../../components';
import { useGetBoardsQuery } from '../../redux/api/boardsApi';
import Modal from '../../components/Modal/Modal';
import { modalText } from '../../utils/constants/constants';
import { useCallback } from 'react';
import { ToastContainer } from 'react-toastify';

const MainPage = () => {
  const { t } = useTranslation();
  const { title } = modalText.board;
  const { userId } = useAppSelector((state) => state.auth);
  const { isLoading, isFetching, isError, data: boardsSet } = useGetBoardsQuery(userId ?? '');
  const { isLoadingBoards } = useAppSelector((state) => state.boardInfo);

  const dispatch = useAppDispatch();

  const openCreateModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.createBoard }));
  }, [dispatch]);

  return (
    <div className="container flex flex-col align-top text-gray-700 flex-grow pb-[40px]">
      {isError ? (
        <Error />
      ) : (
        <>
          <ToastContainer />
          <h1 className="text-[32px] m-[40px]">{t('main.title')}</h1>
          <Modal />
          <div className="flex flex-wrap items-center w-[100%] gap-[20px] justify-center md:justify-start">
            <CreateCard title={t(title)} onClick={openCreateModal} />
            {boardsSet?.map(({ _id: id, title }) => (
              <BoardCard key={id} id={id} title={title} />
            ))}
          </div>
          {(isLoading || isFetching || isLoadingBoards) && <Loader />}
        </>
      )}
    </div>
  );
};

export default MainPage;
