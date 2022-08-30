import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie, setCookie } from '../../shared/Cookies';

const BASE_URL = 'http://localhost:3000';

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

export const __signupUser = createAsyncThunk(
  'SIGNUP_USER',
  async(payload, thunkAPI) => {
    try {
      const data = await axios.post(`${BASE_URL}/api/register`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log('error', error);
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
    [__signupUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__signupUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__signupUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default UserSlice;