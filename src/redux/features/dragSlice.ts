import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskData } from '../api/tasksApi';
import { IColumnsResponse } from '../../pages/BoardPage/BoardPage.types';

interface IState {
  currentDraggableTask: ITaskData | null;
  currentDraggableColumn: IColumnsResponse | null;
  type: 'column' | 'task' | null;
}

interface ITaskAction {
  itemInfo: ITaskData;
  type: 'task';
}
interface IColumnAction {
  itemInfo: IColumnsResponse;
  type: 'column';
}

const initialState: IState = {
  currentDraggableTask: null,
  currentDraggableColumn: null,
  type: null,
};

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setCurrentDraggableTask: (state, action: PayloadAction<ITaskAction>) => {
      state.currentDraggableTask = action.payload.itemInfo;
      state.type = action.payload.type;
    },
    setCurrentDraggableColumn: (state, action: PayloadAction<IColumnAction>) => {
      state.currentDraggableColumn = action.payload.itemInfo;
      state.type = action.payload.type;
    },
    resetCurrentDraggableColumn: (state) => {
      state.currentDraggableColumn = null;
      state.type = null;
    },
    resetCurrentDraggableTask: (state) => {
      state.currentDraggableTask = null;
      state.type = null;
    },
  },
});

const { reducer } = dragSlice;
export const {
  setCurrentDraggableTask,
  resetCurrentDraggableTask,
  setCurrentDraggableColumn,
  resetCurrentDraggableColumn,
} = dragSlice.actions;
export default reducer;
