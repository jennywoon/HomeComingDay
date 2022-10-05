import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  notices: [],
};

// 알림 전체조회
export const __getNotice = createAsyncThunk(
  'getNotice',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/notification`,
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 알림 카운트
export const __getNoticeCount = createAsyncThunk(
  'getNoticeCount',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/notification/count`,
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'text/event-stream',
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 알림 읽음처리
export const __getNoticeRead = createAsyncThunk(
  'getNoticeRead',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/notification/{notificationId}`,
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'text/event-stream',
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteAllNotice = createAsyncThunk(
  'deleteAllNotice',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/notification`,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteNotice = createAsyncThunk(
  'deleteNotice',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/notification/${payload}`,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const NoticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {},
  extraReducers: {
    [__getNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNotice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notices = action.payload;
    },
    [__getNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getNoticeCount.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNoticeCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notices = action.payload;
    },
    [__getNoticeCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getNoticeRead.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNoticeRead.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notices = action.payload;
    },
    [__getNoticeRead.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteAllNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteAllNotice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notices = state.notices.filter(
        (notices) => notices.id !== action.payload
      );
    },
    [__deleteAllNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteNotice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notices = state.notices.filter(
        (notices) => notices.id !== action.payload
      );
    },
    [__deleteNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = NoticeSlice.actions;
export default NoticeSlice.reducer;
