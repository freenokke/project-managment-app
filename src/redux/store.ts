import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './features/modalSlice';
import boardInfo from './features/boardInfoSlice';
import { boardsApi } from './api/boardsApi';
import auth from './features/authSlice';
import user from './features/userSlice';
import { columnsApi } from './api/columnsApi';

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    boardInfo,
    auth,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardsApi.middleware).concat(columnsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
