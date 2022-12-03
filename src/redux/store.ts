import { configureStore } from '@reduxjs/toolkit';
import modal from './features/modalSlice';
import taskModal from './features/taskModalSlice';
import boardInfo from './features/boardInfoSlice';
import auth from './features/authSlice';
import user from './features/userSlice';
import drag from './features/dragSlice';
import localData from './features/localDataSlice';
import boardsApi, { boardsMiddleware } from './api/boardsApi';
import { columnsApi } from './api/columnsApi';

export const store = configureStore({
  reducer: {
    modal,
    taskModal,
    boardsApi,
    boardInfo,
    [columnsApi.reducerPath]: columnsApi.reducer,
    auth,
    user,
    drag,
    localData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardsMiddleware).concat(columnsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
