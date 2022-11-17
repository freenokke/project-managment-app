import { IBoard } from '../../../BoardCard/Board.types';

export interface IFormFields {
  Title: string;
  Description: string;
}

export interface IModalBoardForm {
  onCloseModal: () => void;
  onHandleEvent: (data: IBoard) => void;
}
