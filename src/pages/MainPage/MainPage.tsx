import { CreateCard } from '../../components';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { toggleModal, setModalToShow } from '../../redux/features/modalSlice';
import { BoardCard } from '../../components';
import { useGetBoardsQuery } from '../../redux/api/boardsApi';
import { modalText, typesModal } from '../../utils/constants/constants';
import useBoardModal from '../../hooks/useBoardModal';

const MainPage = () => {
  const { title } = modalText.board;
  const [boardId, setBoardId] = useState('');

  const { isLoading, isError, data: boardsSet } = useGetBoardsQuery();

  const dispatch = useAppDispatch();
  const { modalToShow } = useAppSelector((state) => state.modal);

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    handleToggleModal();
    setBoardId(event.currentTarget.closest('div')?.id || '');
    const typeModal = event.currentTarget.dataset.modal;
    if (typeModal) {
      typesModal.includes(typeModal)
        ? dispatch(setModalToShow(typeModal))
        : dispatch(setModalToShow(null));
    }
  };

  const modal = useBoardModal(boardId, modalToShow);

  return (
    <div className="flex flex-col align-top text-gray-700">
      <h1 className="text-[32px] m-[40px]">Your Boards</h1>
      {modal}
      <div className="flex flex-wrap items-center w-[100%] gap-[20px] justify-center md:justify-start">
        <CreateCard title={title} handleClick={handleClick} />
        {boardsSet?.map(
          ({ _id, title }) =>
            _id && (
              <BoardCard key={_id} id={_id} title={title} description={''} onClick={handleClick} />
            )
        )}
      </div>
      <div className="flex justify-center items-center w-full h-[150px] text-2xl">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
      </div>
    </div>
  );
};

export default MainPage;
