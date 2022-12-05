import { useTranslation } from 'react-i18next';
import {
  useCreateBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
} from '../../redux/api/boardsApi';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { setIsLoadingBoard } from '../../redux/features/boardInfoSlice';
import { useEffect } from 'react';
import { IBoardData } from '../BoardCard/Board.types';
import { ModalData } from './Modal.types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Updates {
  title: string;
  owner: string;
  users: string[];
}

const useBoardModal = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [createBoardCall, { isLoading: isCreatingBoard }] = useCreateBoardMutation();
  const [editBoardCall, { isLoading: isEditingBoard }] = useEditBoardMutation();
  const [deleteBoardCall, { isLoading: isDeletingBoard }] = useDeleteBoardMutation();
  useEffect(() => {
    dispatch(setIsLoadingBoard(isCreatingBoard || isEditingBoard || isDeletingBoard));
  }, [isCreatingBoard, isEditingBoard, isDeletingBoard, dispatch]);

  const createBoard = async (data: IBoardData) => {
    await createBoardCall(data)
      .unwrap()
      .catch(() => toast.error(t('createBoard.error')));
  };

  const editBoard = async (data: ModalData, updates: Updates) => {
    const body: IBoardData = {
      ...updates,
    };
    await editBoardCall({ data, body })
      .unwrap()
      .catch(() => toast.error(t('editBoard.error')));
  };

  const deleteBoard = async (data: ModalData) => {
    await deleteBoardCall(data)
      .unwrap()
      .catch(() => toast.error(t('deleteBoard.error')));
  };

  return {
    createBoard,
    editBoard,
    deleteBoard,
  };
};

export default useBoardModal;
