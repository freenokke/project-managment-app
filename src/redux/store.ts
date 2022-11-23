import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './features/modalSlice';
import boardSlice from './features/boardSlice';
import { boardsApi } from './api/boardsApi';
import auth from './features/authSlice';

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [boardSlice.name]: boardSlice.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
