import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    schoolSearchs:[],
    departmentSearchs:[],
    isLoading: false,
    error: null,
};

// 학교정보 검색
export const __getSchoolSearch = createAsyncThunk("getSchoolSearch", async (payload, thunkAPI) => {
  try {
      const data = await axios.get("http://localhost:3001/schoolSearchs");
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// 학과정보 검색
export const __getDepartmentSearch = createAsyncThunk("getDepartmentSearch", async (payload, thunkAPI) => {
  console.log('payload', payload)
  try {
      const data = await axios.get("http://localhost:3001/departmentSearchs");
      // console.log('data', data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

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
    },
});

export const {} = SchoolInfoSlice.actions;
export default SchoolInfoSlice.reducer;