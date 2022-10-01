import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from '../../shared/cookies';
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
    schoolSearchs:[],
    departmentSearchs:[],
    admissions:[],
    schoolInfos:[],
    isLoading: false,
    error: null,
};

// 학교정보 검색
export const __getSchoolSearch = createAsyncThunk("getSchoolSearch", async (payload, thunkAPI) => {
  try {
      const data = await axios.get(`${BASE_URL}/schoolSearchs`);
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// 학과정보 검색
export const __getDepartmentSearch = createAsyncThunk("getDepartmentSearch", async (payload, thunkAPI) => {
  // console.log('payload', payload)
  try {
      const data = await axios.get(`${BASE_URL}/departmentSearchs`);
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// 입학년도 검색
export const __getAdmissions = createAsyncThunk("getAdmissions", async (payload, thunkAPI) => {
  // console.log('payload', payload)
  try {
      const data = await axios.get(`${BASE_URL}/admissions`);
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

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
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const SchoolInfoSlice = createSlice({
    name: "SchoolInfoSlice",
    initialState,
    reducers: {},
    extraReducers: {
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