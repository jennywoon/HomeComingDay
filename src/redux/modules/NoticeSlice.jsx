import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  notices: []
}

export const __getNotice = createAsyncThunk("getNotice", async(payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/notice`,
      headers: {
        'Content-Type': 'text/event-stream',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
      // console.log(data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error);
  }
})

export const __deleteNotice = createAsyncThunk("deleteNotice", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'delete',
      url: `${BASE_URL}/notice/${payload.noticeId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const NoticeSlice = createSlice({
  name: "notice", 
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

    [__deleteNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteNotice.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action)
      state.notices = state.notices.filter(notices => notices.id !== action.payload)
    },
    [__deleteNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})