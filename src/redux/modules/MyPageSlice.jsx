import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  mypages: [],
  myarticles: [],
  view: [],
  totalCount: null,
  isLoading: false,
  error: null,
};

export const __getMyPage = createAsyncThunk(
  'mypages/getMyPage',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/myPage`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getReset = createAsyncThunk(
  'mypages/getReset',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/myPage/reset`,
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getView = createAsyncThunk(
  'mypages/getView',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/view/${payload}`,
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 프로필 이미지 수정
export const __patchProfileImage = createAsyncThunk(
  'mypages/patchProfileImage',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'patch',
        url: `${BASE_URL}/myPage`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyArticle = createAsyncThunk(
  'myarticles/getMyArticles',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/myPage/myArticle2?page=${payload}&size=${5}`,
        payload,
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const MyPageSlice = createSlice({
  name: 'mypages',
  initialState,
  reducers: {},
  extraReducers: {
    [__getMyPage.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyPage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mypages = action.payload;
    },
    [__getMyPage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //조회수
    [__getView.pending]: (state) => {
      state.isLoading = true;
    },
    [__getView.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.view = action.payload;
    },
    [__getView.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //리셋용
    [__getReset.pending]: (state) => {
      state.isLoading = true;
    },
    [__getReset.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myarticles = [];
    },
    [__getReset.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__patchProfileImage.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchProfileImage.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__patchProfileImage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getMyArticle.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyArticle.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myarticles.push(...action.payload.content);
      state.totalCount = action.payload.totalElements;
    },
    [__getMyArticle.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const {} = MyPageSlice.actions;
export default MyPageSlice.reducer;
