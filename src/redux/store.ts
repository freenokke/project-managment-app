import { configureStore } from '@reduxjs/toolkit';
import modal from './features/modalSlice';
import boardInfo from './features/boardSlice';
import auth from './features/authSlice';
import boardsApi, { boardsMiddleware } from './api/boardsApi';

export const store = configureStore({
  reducer: {
    modal,
    boardsApi,
    boardInfo,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardsMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
