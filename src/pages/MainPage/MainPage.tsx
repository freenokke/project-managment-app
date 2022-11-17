import { CreateCard, Modal } from '../../components';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { BoardCard } from '../../components';
import { useGetBoardsQuery } from '../../redux/api/boardsApi';
import { modalText } from '../../utils/constants/constants';

const MainPage = () => {
  const { title } = modalText.board;

  const { isLoading, isError, data: boardsSet } = useGetBoardsQuery();

  const dispatch = useAppDispatch();

  const openCreateModal = () => {
    dispatch(showModal({ type: ModalTypes.create }));
  };

  return (
    <div className="flex flex-col align-top text-gray-700">
      <h1 className="text-[32px] m-[40px]">Your Boards</h1>
      <Modal />
      <div className="flex flex-wrap items-center w-[100%] gap-[20px] justify-center md:justify-start">
        <CreateCard title={title} handleClick={openCreateModal} />
        {boardsSet?.map(({ _id: id, title }) => id && <BoardCard key={id} id={id} title={title} />)}
      </div>
      <div className="flex justify-center items-center w-full h-[150px] text-2xl">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
      </div>
    </div>
  );
};

export default MainPage;
