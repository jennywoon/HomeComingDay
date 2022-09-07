import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie, setCookie } from '../../shared/cookies';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
  headers: {
    'Content-Type': 'application/json',
    authorization: [`Bearer ${getCookie('accessToken')}` , `${getCookie('refreshToken')}`]
    // username: `${getCookie("username")}`,
  },
};

// 로그안
export const __loginUser = createAsyncThunk(
  'LOGIN_USER',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${BASE_URL}/login`, payload);
      setCookie('accessToken', `${data.data.data.accessToken}`);
      setCookie('refreshToken', `${data.data.data.refreshToken}`);
      // setCookie('schoolInfo', `${data.data.schoolInfo}`);
      // console.log(data.data.schoolInfo);
      // console.log(data)
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원가입
export const __signupUser = createAsyncThunk(
  'SIGNUP_USER',
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(`${BASE_URL}/signup`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 이메일 중복확인
export const __emailCheck = createAsyncThunk(
  'emailCheck',
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(`${BASE_URL}/emailCheck`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 이메일보내기
export const __postSendEmail = createAsyncThunk("sendEmail", async (payload, thunkAPI) => {
  try {
    console.log(payload);
      const data = await axios.post(`${BASE_URL}/signup/sendEmail`, payload);
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// 인증번호보내기
export const __postCheckEmail = createAsyncThunk("checkEmail", async (payload, thunkAPI) => {
  try {
    console.log(payload);
      const data = await axios.post(`${BASE_URL}/checkEmail`, payload);
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  user: config,
  sendEmail: [],
  checkEmail: [],
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
      state.error = action.payload;
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

    [__postSendEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSendEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.sendEmail.push(action.payload);
    },
    [__postSendEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postCheckEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [__postCheckEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.checkEmail.push(action.payload);
    },
    [__postCheckEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default UserSlice;