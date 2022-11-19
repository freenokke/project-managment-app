import { IBoardData } from '../../BoardCard/Board.types';

export interface IFormFields {
  title: string;
  description: string;
}

export interface IModalBoardForm {
  onCloseModal: () => void;
  onHandleEvent: (data: IBoardData) => void;
}
