import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBoardState {
  boardId: string;
  columnId: string;
  taskId: string;
}

const initialState: IBoardState = {
  boardId: '',
  columnId: '',
  taskId: '',
};

const boardInfoSlice = createSlice({
  name: 'boardInfo',
  initialState,
  reducers: {
    setOpenedBoard(state, action: PayloadAction<string>) {
      state.boardId = action.payload;
    },
  },
});

export const { setOpenedBoard } = boardInfoSlice.actions;
export default boardInfoSlice.reducer;
