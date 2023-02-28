import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
} from './userThunk';
import {
  saveUserInLocalStorage,
  getUserFromLocalStorage,
  removeUserInLocalStorage,
} from '../../utils/localStorageHelper';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  errorMsg: '',
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    return loginUserThunk('/auth/login', credentials, thunkAPI);
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (thunkAPI) => {
    return logoutUserThunk('/auth/logout', thunkAPI);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      saveUserInLocalStorage(payload.user);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      saveUserInLocalStorage(payload.user);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [logoutUser.pending]: (state) => {},
    [logoutUser.fulfilled]: (state, { payload }) => {
      removeUserInLocalStorage();
      state.user = null;
    },
    [logoutUser.rejected]: (state, { payload }) => {},
  },
});

export default userSlice.reducer;
