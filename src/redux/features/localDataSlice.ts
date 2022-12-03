import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskData } from '../api/tasksApi';

interface IState {
  column?: string;
  tasks?: ITaskData[];
}

interface ITaskAction {
  tasks: ITaskData[];
  columnId?: string;
}

const initialState: IState[] = [];

const localDataSlice = createSlice({
  name: 'displayedData',
  initialState,
  reducers: {
    setLocalColumns: (state, action: PayloadAction<string>) => {
      state.push({ column: action.payload });
    },
    setLocalTasks: (state, action: PayloadAction<ITaskAction>) => {
      state.forEach((item) => {
        if (item.column === action.payload.columnId) {
          item.tasks = [...action.payload.tasks];
        }
      });
    },
    updateLocalState: (state, action: PayloadAction<IState[]>) => {
      state.length = 0;
      action.payload.forEach((item) => {
        state.push(item);
      });
    },
  },
});

const { reducer } = localDataSlice;
export const { setLocalColumns, setLocalTasks, updateLocalState } = localDataSlice.actions;
export default reducer;
