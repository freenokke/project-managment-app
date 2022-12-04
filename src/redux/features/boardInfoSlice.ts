import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBoardState {
  boardId: string;
  columnId: string;
  taskId: string;
  maxOrder: number;
  columnToReorder: string | null;
  isLoadingBoards: boolean;
  isLoadingColumn: boolean;
  isLoadingTask: boolean;
  isErrorEditTask: boolean;
  deletingColumnError: boolean;
}

const initialState: IBoardState = {
  boardId: '',
  columnId: '',
  taskId: '',
  maxOrder: 0,
  columnToReorder: null,
  isLoadingBoards: false,
  isLoadingColumn: false,
  isLoadingTask: false,
  isErrorEditTask: false,
  deletingColumnError: false,
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
    setIsLoadingColumn(state, action: PayloadAction<boolean>) {
      state.isLoadingColumn = action.payload;
    },
    setIsLoadingTask(state, action: PayloadAction<boolean>) {
      state.isLoadingTask = action.payload;
    },
    setIsErrorEditTask(state, action: PayloadAction<boolean>) {
      state.isErrorEditTask = action.payload;
    },
    setDeletingColumnError(state, action: PayloadAction<boolean>) {
      state.deletingColumnError = action.payload;
    },
  },
});

const { reducer } = boardInfoSlice;
export const {
  setOpenedBoard,
  setColumnsOrder,
  setColumnToReorder,
  setIsLoadingBoard,
  setIsLoadingColumn,
  setIsLoadingTask,
  setIsErrorEditTask,
  setDeletingColumnError,
} = boardInfoSlice.actions;
export default reducer;
