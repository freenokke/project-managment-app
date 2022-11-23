import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { Link } from 'react-router-dom';
import { ModalTypes, showModal } from '../../redux/features/modalSlice';
import { setOpenedBoard } from '../../redux/features/boardInfoSlice';
import { IBoardProps } from './Board.types';

const BoardCard = ({ id, title, description }: IBoardProps) => {
  const dispatch = useAppDispatch();

  const deleteModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.deleteBoard, data: id }));
  }, [id, dispatch]);

  const editModal = useCallback(() => {
    dispatch(showModal({ type: ModalTypes.editBoard, data: id }));
  }, [id, dispatch]);

  const openBoardPage = useCallback(() => {
    dispatch(setOpenedBoard(id));
  }, [dispatch, id]);

  return (
    <div id={id} className="boardCard md:w-[45%] lg:w-[30%] h-[120px]">
      <Link to={`/board/${id}`} className="block w-full h-full" onClick={openBoardPage}>
        <p className="text-left text-lg font-bold text-gray-700">{title}</p>
        <p>{description}</p>
      </Link>
      <span
        className="material-icons absolute bottom-[7px] right-[40px] text-blue-700 cursor-pointer hover:text-blue-400"
        onClick={editModal}
      >
        edit
      </span>
      <span
        className="material-icons absolute bottom-[7px] right-[7px] text-blue-700 cursor-pointer hover:text-blue-400"
        onClick={deleteModal}
      >
        delete_outline
      </span>
    </div>
  );
};

export default BoardCard;
