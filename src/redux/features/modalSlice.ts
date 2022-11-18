import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ModalTypes {
  createBoard,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  deleteTask,
  editBoard,
  editColumn,
  editTask,
}

interface IModalState {
  visible: boolean;
  type: ModalTypes;
  data: string | null;
}

const initialState: IModalState = {
  visible: false,
  type: ModalTypes.createBoard,
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<{ type: ModalTypes; data?: string }>) {
      const { type, data } = action.payload;
      state.visible = true;
      state.type = type;
      state.data = data || null;
    },
    closeModal(state) {
      state.visible = false;
      state.data = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice;