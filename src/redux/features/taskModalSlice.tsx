import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskData } from '../api/tasksApi';

interface ITaskModal {
  visible: boolean;
  taskData: ITaskData | null;
  isLoading: boolean;
}

const initialState: ITaskModal = {
  visible: false,
  taskData: null,
  isLoading: false,
};

const taskModalSlice = createSlice({
  name: 'taskModal',
  initialState,
  reducers: {
    showTaskModal(state, action: PayloadAction<ITaskData>) {
      state.visible = true;
      state.taskData = action.payload;
    },
    closeTaskModal(state) {
      state.visible = false;
      state.taskData = null;
    },
    showLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { showTaskModal, closeTaskModal, showLoader } = taskModalSlice.actions;
export default taskModalSlice.reducer;
