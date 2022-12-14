import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  schoolSearchs: [],
  departmentSearchs: [],
  admissions: [],
  schoolInfos: [],
  isLoading: false,
  error: null,
};

// 학교정보 검색
export const __getSchoolSearch = createAsyncThunk(
  'getSchoolSearch',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/schoolSearchs`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 학과정보 검색
export const __getDepartmentSearch = createAsyncThunk(
  'getDepartmentSearch',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/departmentSearchs`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 입학년도 검색
export const __getAdmissions = createAsyncThunk(
  'getAdmissions',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/admissions`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 학교 정보 post
export const __postSchoolInfo = createAsyncThunk(
  'postSchoolInfo',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/schoolInfos`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const SchoolInfoSlice = createSlice({
  name: 'SchoolInfoSlice',
  initialState,
  reducers: {},
  extraReducers: {
    // 학교
    [__getSchoolSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSchoolSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schoolSearchs = action.payload;
    },
    [__getSchoolSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 학과
    [__getDepartmentSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDepartmentSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.departmentSearchs = action.payload;
    },
    [__getDepartmentSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 입학년도
    [__getAdmissions.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAdmissions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.admissions = action.payload;
    },
    [__getAdmissions.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    [__postSchoolInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSchoolInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schoolInfos.push(action.payload);
    },
    [__postSchoolInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = SchoolInfoSlice.actions;
export default SchoolInfoSlice.reducer;
