import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './features/modalSlice';
import { boardsApi } from './api/boardsApi';
import auth from './features/authSlice';
import drag from './features/dragSlice';

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    auth,
    drag,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
