import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { SerializedError } from '@reduxjs/toolkit';
import { baseUrl } from '../../utils/constants/constants';

interface IUserResponse {
  _id: string;
  name: string;
  login: string;
}

interface IUserInfo {
  userId: string;
  token: string;
}

interface INewUserInfo extends IUserInfo {
  newUser: {
    name: string;
    login: string;
    password: string;
  };
}

export const getUserById = createAsyncThunk('user/getUserById', async (userInfo: IUserInfo) => {
  try {
    const data: IUserResponse = await request(`${baseUrl}/users/${userInfo.userId}`, 'GET', null, {
      authorization: `Bearer ${userInfo.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    console.log('Запрос user ');
    return data;
  } catch (error) {
    throw error;
  }
});

export const editUser = createAsyncThunk('user/editUser', async (userInfo: INewUserInfo) => {
  console.log(userInfo);
  const body = JSON.stringify(userInfo.newUser);
  console.log('body', body);
  try {
    const data: IUserResponse = await request(
      `https://final-task-backend-production-e06d.up.railway.app/users/${userInfo.userId}`,
      'PUT',
      body,
      {
        authorization: `Bearer ${userInfo.token}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    );
    console.log('Успешно отредактированный пользователь', data);
    return data;
  } catch (error) {
    throw error;
  }
});

interface IState {
  id: string | null;
  name: string | null;
  login: string | null;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: IState = {
  id: null,
  name: null,
  login: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.name = action.payload.name;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.error;
        state.login = '';
        state.name = '';
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.id = action.payload._id;
        state.login = action.payload.login;
        state.name = action.payload.name;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

const { reducer } = userSlice;
export default reducer;
