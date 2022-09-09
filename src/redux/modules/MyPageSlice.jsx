import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
    mypages : [],
    myarticles:[],
    isLoading: false,
    error: null,
};

export const __getMyPage = createAsyncThunk("mypages/getMyPage", async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/myPage`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie("accessToken")}`,
          // RefreshToken : getCookie('refreshToken')
        },
      });
        console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __getMyArticle = createAsyncThunk("myarticles/getMyArticles", async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/myPage/myArticle`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie("accessToken")}`,
          // RefreshToken : getCookie('refreshToken')
        },
      });
        console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const MyPageSlice = createSlice({
    name: "mypages", 
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
      [__getMyArticle.pending]: (state) => {
        state.isLoading = true;
      },
      [__getMyArticle.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.myarticles = action.payload;
      },
      [__getMyArticle.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
});

export const {} = MyPageSlice.actions;
export default MyPageSlice.reducer;