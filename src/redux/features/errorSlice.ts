import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  taskError: boolean;
  boardError: boolean;
  columnError: boolean;
}

interface IAction {
  error: boolean;
  type: 'column' | 'task' | 'board';
}

const initialState: IState = {
  taskError: false,
  boardError: false,
  columnError: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<IAction>) => {
      if (action.payload.type === 'task') {
        state.taskError = action.payload.error;
      }
      if (action.payload.type === 'column') {
        state.columnError = action.payload.error;
      }
      if (action.payload.type === 'board') {
        state.boardError = action.payload.error;
      }
    },
    resetError: (state, action: PayloadAction<Pick<IAction, 'type'>>) => {
      if (action.payload.type === 'task') {
        state.taskError = false;
      }
      if (action.payload.type === 'column') {
        state.columnError = false;
      }
      if (action.payload.type === 'board') {
        state.boardError = false;
      }
    },
  },
});

const { reducer } = errorSlice;
export const { setError, resetError } = errorSlice.actions;
export default reducer;
