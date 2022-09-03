import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    dates: [
    ],
    isLoading: false,
    error: null,
};

export const __getDate = createAsyncThunk("dates/getDate", async (payload, thunkAPI) => {
    try {
        const data = await axios.get("http://localhost:3001/dates")
        // console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postDate = createAsyncThunk("dates/postDate", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const data = await axios.post("http://localhost:3001/dates", payload);
        console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const DateSlice = createSlice({
    name: "dates",
    initialState,
    reducers: {},
    extraReducers: {
      [__getDate.pending]: (state) => {
        state.isLoading = true;
      },
      [__getDate.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.dates = action.payload;
      },
      [__getDate.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postDate.pending]: (state) => {
        state.isLoading = true;
      },
      [__postDate.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.dates.push(action.payload);
      },
      [__postDate.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
});

export const {} = DateSlice.actions;
export default DateSlice.reducer;