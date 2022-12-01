import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskData } from '../api/tasksApi';

interface ITaskModal {
  visible: boolean;
  taskData: ITaskData | null;
}

const initialState: ITaskModal = {
  visible: false,
  taskData: null,
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
  },
});

export const { showTaskModal, closeTaskModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
