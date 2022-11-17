import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ModalTypes {
  create,
  deleteBoard,
  deleteColumn,
  edit,
}

interface IModalState {
  visible: boolean;
  type: ModalTypes;
  data: string | null;
}

const initialState: IModalState = {
  visible: false,
  type: ModalTypes.create,
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
