import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './features/modalSlice';
import boardInfo from './features/boardInfoSlice';
import { boardsApi } from './api/boardsApi';
import auth from './features/authSlice';
import boardsApi, { boardsMiddleware } from './api/boardsApi';
import { columnsApi } from './api/columnsApi';

export const store = configureStore({
  reducer: {
    modal,
    boardsApi,
    boardInfo,
    [columnsApi.reducerPath]: columnsApi.reducer,
    boardInfo,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardsApi.middleware).concat(columnsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
