import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
    searchs: [  
    ],
    helps: [],
    popular:[],
    isLoading: false,
    error: null,
};

export const __getSearchArticle = createAsyncThunk("searchs/getSearchArticle", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/searchArticle`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`
      },
    });
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

export const __getSearchArticlePopular = createAsyncThunk("searchs/getSearchArticlePopular", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/searchArticle/popular`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`
      },
    });
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

export const SearchSlice = createSlice({
    name: "searchs",
    initialState,
    reducers: {},
    extraReducers: {
      [__getSearchArticle.pending]: (state) => {
        state.isLoading = true;
      },
      [__getSearchArticle.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.searchs = action.payload;
      },
      [__getSearchArticle.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      [__getSearchArticlePopular.pending]: (state) => {
        state.isLoading = true;
      },
      [__getSearchArticlePopular.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.popular = action.payload;
      },
      [__getSearchArticlePopular.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
});

export const {} = SearchSlice.actions;
export default SearchSlice.reducer;