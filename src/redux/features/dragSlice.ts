import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskData } from '../api/tasksApi';
import { IColumnsResponse } from '../../pages/BoardPage/BoardPage.types';

interface IState {
  currentDraggable: ITaskData | IColumnsResponse | null;
  type: 'column' | 'task' | null;
}

interface IAction {
  itemInfo: ITaskData | IColumnsResponse | null;
  type: 'column' | 'task' | null;
}

const initialState: IState = {
  currentDraggable: null,
  type: null,
};

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setCurrentDraggable: (state, action: PayloadAction<IAction>) => {
      state.currentDraggable = action.payload.itemInfo;
      state.type = action.payload.type;
    },
    resetCurrentDraggable: (state) => {
      state.currentDraggable = null;
      state.type = null;
    },
  },
});

const { reducer } = dragSlice;
export const { setCurrentDraggable, resetCurrentDraggable } = dragSlice.actions;
export default reducer;
