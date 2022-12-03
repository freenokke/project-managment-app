import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBoardState {
  boardId: string;
  columnId: string;
  taskId: string;
  maxOrder: number;

  isLoadingBoards: boolean;
}

const initialState: IBoardState = {
  boardId: '',
  columnId: '',
  taskId: '',
  maxOrder: 0,

  isLoadingBoards: false,
};

const boardInfoSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setOpenedBoard(state, action: PayloadAction<string>) {
      state.boardId = action.payload;
    },
    setColumnsOrder: (state, action: PayloadAction<number>) => {
      state.maxOrder = action.payload;
    },
    setIsLoadingBoard(state, action: PayloadAction<boolean>) {
      state.isLoadingBoards = action.payload;
    },
  },
});

const { reducer } = boardInfoSlice;
export const { setOpenedBoard, setColumnsOrder, setIsLoadingBoard } = boardInfoSlice.actions;
export default reducer;
