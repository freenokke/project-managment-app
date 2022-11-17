import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  modalToShow: string | null;
  isModalShown: boolean;
}

const initialState: IModalState = {
  modalToShow: null,
  isModalShown: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalToShow(state, action: PayloadAction<string | null>) {
      state.modalToShow = action.payload;
    },
    toggleModal(state) {
      state.isModalShown = !state.isModalShown;
    },
  },
});

export const { toggleModal, setModalToShow } = modalSlice.actions;
export default modalSlice;
