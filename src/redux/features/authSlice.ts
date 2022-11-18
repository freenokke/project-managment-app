import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { ISignInData, ISignUpData } from '../../pages/SignUpPage/SignUp.types';
import { SerializedError } from '@reduxjs/toolkit';
import { parseJwt } from '../../utils/utils';

export const signInRequest = async (data: ISignInData) => {
  return await request(
    'https://final-task-backend-production-e06d.up.railway.app/auth/signin',
    'POST',
    JSON.stringify(data),
    {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }
  );
};

export const signIn = createAsyncThunk('auth/signIn', signInRequest);

export const signUp = createAsyncThunk('auth/signUp', async (data: ISignUpData) => {
  try {
    await request(
      'https://final-task-backend-production-e06d.up.railway.app/auth/signup',
      'POST',
      JSON.stringify(data),
      {
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    );
    const { login, password } = data;
    return await signInRequest({ login, password });
  } catch (e) {
    throw e;
  }
});

interface IState {
  isLoading: boolean;
  error: SerializedError | null;
  token: string | null;
  userId: string | null;
}

const initialState: IState = {
  isLoading: false,
  error: null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { token } = action.payload;
        const userId = parseJwt(token).id;
        state.isLoading = false;
        state.token = token;
        state.userId = userId;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
        state.token = null;
        state.userId = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { token } = action.payload;
        const userId = parseJwt(token).id;
        console.log(parseJwt(token));
        state.isLoading = false;
        state.token = token;
        state.userId = userId;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
        state.token = null;
        state.userId = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      });
  },
});

const { reducer } = authSlice;
export const { logOut } = authSlice.actions;
export default reducer;
