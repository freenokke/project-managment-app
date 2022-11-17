import {
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../redux/api/boardsApi';
import { IBoard } from '../components/BoardCard/Board.types';
import { useEffect } from 'react';

export interface Updates {
  title: string;
  owner?: string;
  users?: string[];
}

// ! slice 'Loaders' = { isCreating: boolean, updating: string | null }

const useBoardModal = () => {
  const [createBoardCall, { isLoading: isCreating }] = useCreateBoardMutation();
  const [updateBoardCall, { isLoading: isUpdating }] = useUpdateBoardMutation();
  const [deleteBoardCall, { isLoading: isDeleting }] = useDeleteBoardMutation();

  useEffect(() => {
    // * dispatch(setIsCreating(isCreating))
  }, [isCreating]);

  useEffect(() => {
    // * dispatch(setIsUpdating({ isUpdating: isUpdating, id }))
  }, [isUpdating]);

  const createBoard = async (data: IBoard) => {
    await createBoardCall(data).unwrap();
  };

  const updateBoard = async (updates: Updates, boardId: string) => {
    const body: IBoard = {
      owner: 'Harry Potter',
      users: [],
      ...updates,
    };
    await updateBoardCall({ boardId, body }).unwrap();
  };

  const deleteBoard = async (boardId: string) => {
    await deleteBoardCall(boardId).unwrap();
  };

  return {
    createBoard,
    updateBoard,
    deleteBoard,
  };
};

export default useBoardModal;
