import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBoardState {
  boardId: string;
  columnId: string;
  taskId: string;
  maxOrder: number;
  columnToReorder: string | null;
  isLoadingBoards: boolean;
  isLoadingTask: boolean;
  isErrorEditTask: boolean;
}

const initialState: IBoardState = {
  boardId: '',
  columnId: '',
  taskId: '',
  maxOrder: 0,
  columnToReorder: null,
  isLoadingBoards: false,
  isLoadingTask: false,
  isErrorEditTask: false,
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
    setColumnToReorder: (state, action: PayloadAction<string | null>) => {
      state.columnToReorder = action.payload;
    },
    setIsLoadingBoard(state, action: PayloadAction<boolean>) {
      state.isLoadingBoards = action.payload;
    },
    setIsLoadingTask(state, action: PayloadAction<boolean>) {
      state.isLoadingTask = action.payload;
    },
    setIsErrorEditTask(state, action: PayloadAction<boolean>) {
      state.isErrorEditTask = action.payload;
    },
  },
});

const { reducer } = boardInfoSlice;
export const {
  setOpenedBoard,
  setColumnsOrder,
  setColumnToReorder,
  setIsLoadingBoard,
  setIsLoadingTask,
  setIsErrorEditTask,
} = boardInfoSlice.actions;
export default reducer;
