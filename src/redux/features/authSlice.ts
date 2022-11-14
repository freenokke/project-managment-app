import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { ISignInData, ISignUpData } from '../../pages/SignUpPage/SignUp.types';
import { SerializedError } from '@reduxjs/toolkit';

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
  token?: string;
}

const initialState: IState = {
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
        state.token = '';
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
        state.token = '';
      });
  },
});

const { reducer } = authSlice;
export default reducer;
