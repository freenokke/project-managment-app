import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { ISignInData, ISignUpData } from '../../pages/SignUpPage/SignUp.types';
import { SerializedError } from '@reduxjs/toolkit';
import { parseJwt } from '../../utils/utils';
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
