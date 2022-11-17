import { useAppDispatch, useAppSelector } from './redux.hooks';
import { ModalBoardForm, ModalConfirm } from '../components';
import { toggleModal } from '../redux/features/modalSlice';
import {
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../redux/api/boardsApi';
import { modalText } from '../utils/constants/constants';
import { IBoard } from '../components/BoardCard/Board.types';

const useBoardModal = (boardId: string, typeModal: string | null) => {
  const { title, confirmation } = modalText.board;
  const dispatch = useAppDispatch();
  const { isModalShown } = useAppSelector((state) => state.modal);

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  const [createBoard, {}] = useCreateBoardMutation();
  const [updateBoard, {}] = useUpdateBoardMutation();
  const [deleteBoard, {}] = useDeleteBoardMutation();

  const handleCreateBoard = async (data: IBoard) => {
    await createBoard(data).unwrap();
  };

  const handleUpdateBoard = async (body: IBoard) => {
    await updateBoard({ boardId, body }).unwrap();
  };

  const handleDeleteBoard = async () => {
    await deleteBoard(boardId).unwrap();
  };

  return (
    <>
      {isModalShown && typeModal === 'create' ? (
        <ModalBoardForm onCloseModal={handleToggleModal} onHandleEvent={handleCreateBoard} />
      ) : null}
      {isModalShown && typeModal === 'update' ? (
        <ModalBoardForm onCloseModal={handleToggleModal} onHandleEvent={handleUpdateBoard} />
      ) : null}
      {isModalShown && typeModal === 'confirm' ? (
        <ModalConfirm
          onCloseModal={handleToggleModal}
          onHandleEvent={handleDeleteBoard}
          title={title}
          confirmation={confirmation}
        />
      ) : null}
    </>
  );
};

export default useBoardModal;
