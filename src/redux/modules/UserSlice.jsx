import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie, setCookie } from '../../shared/cookies';

const BASE_URL = '';

const config = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${getCookie("token")}`,
    userName: `${getCookie("userName")}`,
  },
};

export const __loginUser = createAsyncThunk(
  'LOGIN_USER',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${BASE_URL}/member/login`, payload);
      setCookie('token', `${data.data.token}`)
      setCookie('username', `${data.data.username}`)
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: config,
  isLogin: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [__loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLogin = true;
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data;
    },
  }
})

export default UserSlice;