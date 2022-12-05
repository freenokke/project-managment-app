export interface IModalConfirm {
  title: string;
  confirmation: string;
  onCloseModal: () => void;
  onHandleEvent: () => void;
}
