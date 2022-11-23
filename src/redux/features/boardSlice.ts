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

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setOpenedBoard(state, action: PayloadAction<string>) {
      state.boardId = action.payload;
    },
  },
});

export const { setOpenedBoard } = boardSlice.actions;
export default boardSlice;
