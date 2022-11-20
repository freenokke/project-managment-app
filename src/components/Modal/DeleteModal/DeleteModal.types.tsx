import { IBoardData } from '../../BoardCard/Board.types';

export interface IModalConfirm {
  title: string;
  confirmation: string;
  onCloseModal: () => void;
  onHandleEvent: () => void;
}
