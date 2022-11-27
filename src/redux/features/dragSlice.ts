import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskData } from '../api/tasksApi';

interface IState {
  currentDraggable: ITaskData | null;
}

const initialState: IState = {
  currentDraggable: null,
};

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setCurrentDraggable: (state, action: PayloadAction<ITaskData | null>) => {
      state.currentDraggable = action.payload;
    },
  },
});

const { reducer } = dragSlice;
export const { setCurrentDraggable } = dragSlice.actions;
export default reducer;
