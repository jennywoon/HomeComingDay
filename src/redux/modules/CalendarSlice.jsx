import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    calendars: [
    ],
    // insta: null,
    isLoading: false,
    error: null,
};

export const __getCalendar = createAsyncThunk("calendars/getCalendar", async (payload, thunkAPI) => {
    try {
        const data = await axios.get("http://localhost:3001/calendars")
        // console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postCalendar = createAsyncThunk("calendars/postCalendar", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const data = await axios.post("http://localhost:3001/calendars", payload);
        console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteCalendar = createAsyncThunk("calendars/deleteCalendar", async (payload, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/calendars/${payload}`);
    // console.log('data', data)
    // console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateCalendar = createAsyncThunk("calendars/updateCalendar", async (payload, thunkAPI) => {
  try {
    await axios.put(`http://localhost:3001/calendars/${payload.id}`, payload);
    console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);

export const CalendarSlice = createSlice({
    name: "calendars",
    initialState,
    reducers: {},
    extraReducers: {
      [__getCalendar.pending]: (state) => {
        state.isLoading = true;
      },
      [__getCalendar.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.calendars = action.payload;
      },
      [__getCalendar.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postCalendar.pending]: (state) => {
        state.isLoading = true;
      },
      [__postCalendar.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.calendars.push(action.payload);
      },
      [__postCalendar.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__deleteCalendar.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteCalendar.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.calendars = state.calendars.filter(calendars => calendars.id !== action.payload)
      },
      [__deleteCalendar.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      [__updateCalendar.pending]: (state) => {
        state.isLoading = true;
      },
      [__updateCalendar.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log('action', action)
        console.log('action.payload', action.payload)
        state.calendars = state.calendars.map((calendar) => {
          if (calendar.id === action.payload.id) {
            calendar = action.payload;
          }
          return calendar;
        })
      },
      [__updateCalendar.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
});

export const {} = CalendarSlice.actions;
export default CalendarSlice.reducer;