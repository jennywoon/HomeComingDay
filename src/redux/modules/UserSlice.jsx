import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie, setCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
  headers: {
    authorization: `Bearer ${getCookie('accessToken')}`, 
    RefreshToken : `${getCookie('refreshToken')}`
  },
};

// 로그인
export const __loginUser = createAsyncThunk(
  'LOGIN_USER',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${BASE_URL}/login`, payload, config);
      setCookie('accessToken', `${data.data.data.accessToken}`);
      setCookie('refreshToken', `${data.data.data.refreshToken}`);
      setCookie('username', `${data.data.data.username}`);
      return thunkAPI.fulfillWithValue(data.data);
      
    } catch (error) {
      // console.log("error",error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원가입
export const __signupUser = createAsyncThunk(
  'SIGNUP_USER',
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const data = await axios.post(`${BASE_URL}/signup`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 이메일 중복확인
export const __emailCheck = createAsyncThunk(
  'emailCheck',
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
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
    // console.log(payload);
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
    // console.log(payload);
      const data = await axios.post(`${BASE_URL}/signup/checkEmail`, payload);
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  user: [],
  emailCheck: [],
  sendEmail: [],
  checkEmail: [],
  isLoading: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getUser: (state, action) =>
    (action.payload = {
      isLogin: getCookie('accessToken') ? true : false,
    }),
  },
  extraReducers: {
    // 로그인
    [__loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload)
      state.isLogin = action.payload.success;
      state.schoolInfo = action.payload.data['schoolInfo'];
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 회원가입
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

    // 이메일 중복
    [__emailCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__emailCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.emailCheck.push(action.payload);
    },
    [__emailCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 이메일 보내기
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

    // 이메일 인증번호 보내기
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

export const { getUser } = UserSlice.actions;
export default UserSlice;