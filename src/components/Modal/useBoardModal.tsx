import {
  useCreateBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
} from '../../redux/api/boardsApi';

import { IBoardData } from '../BoardCard/Board.types';
import { ModalData } from './Modal.types';

export interface Updates {
  title: string;
  owner: string;
  users: string[];
}

const useBoardModal = () => {
  const [createBoardCall, {}] = useCreateBoardMutation();
  const [editBoardCall, {}] = useEditBoardMutation();
  const [deleteBoardCall, {}] = useDeleteBoardMutation();

  const createBoard = async (data: IBoardData) => {
    await createBoardCall(data).unwrap();
  };

  const editBoard = async (data: ModalData, updates: Updates) => {
    const body: IBoardData = {
      ...updates,
    };
    await editBoardCall({ data, body }).unwrap();
  };

  const deleteBoard = async (data: ModalData) => {
    await deleteBoardCall(data).unwrap();
  };

  return {
    createBoard,
    editBoard,
    deleteBoard,
  };
};

export default useBoardModal;
