import {
  useCreateBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
} from '../../redux/api/boardsApi';

import { IBoardData } from '../BoardCard/Board.types';

export interface Updates {
  title: string;
  owner?: string;
  users?: string[];
}

const useBoardModal = () => {
  const [createBoardCall, {}] = useCreateBoardMutation();
  const [editBoardCall, {}] = useEditBoardMutation();
  const [deleteBoardCall, {}] = useDeleteBoardMutation();

  const createBoard = async (data: IBoardData) => {
    await createBoardCall(data).unwrap();
  };

  const editBoard = async (updates: Updates, boardId: string) => {
    const body: IBoardData = {
      owner: 'userId',
      users: [],
      ...updates,
    };
    await editBoardCall({ boardId, body }).unwrap();
  };

  const deleteBoard = async (boardId: string) => {
    await deleteBoardCall(boardId).unwrap();
  };

  return {
    createBoard,
    editBoard,
    deleteBoard,
  };
};

export default useBoardModal;
