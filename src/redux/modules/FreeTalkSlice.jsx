import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    freetalks: [
    ],
    // insta: null,
    isLoading: false,
    error: null,
};

export const __getFreeTalk = createAsyncThunk("freetalks/getFreeTalk", async (payload, thunkAPI) => {
    try {
        const data = await axios.get("http://localhost:3001/freetalks")
        console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postFreeTalk = createAsyncThunk("freetalks/postFreeTalk", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const data = await axios.post("http://localhost:3001/freetalks", payload);
        console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteFreeTalk = createAsyncThunk("freetalks/deleteHelp", async (payload, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/freetalks/${payload}`);
    // console.log('data', data)
    // console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateFreeTalk = createAsyncThunk("freetalks/updateHelp", async (payload, thunkAPI) => {
  try {
    await axios.put(`http://localhost:3001/freetalks/${payload.id}`, payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);


export const FreeTalkSlice = createSlice({
    name: "freetalks",
    initialState,
    reducers: {},
    extraReducers: {
      [__getFreeTalk.pending]: (state) => {
        state.isLoading = true;
      },
      [__getFreeTalk.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.freetalks = action.payload;
      },
      [__getFreeTalk.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postFreeTalk.pending]: (state) => {
        state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      },
      [__postFreeTalk.fulfilled]: (state, action) => {
        state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
        state.freetalks.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      },
      [__postFreeTalk.rejected]: (state, action) => {
        state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      },

      [__deleteFreeTalk.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteFreeTalk.fulfilled]: (state, action) => {
        state.isLoading = false;
        // console.log(state.camps)
        // console.log(action)
        state.freetalks = state.freetalks.filter(freetalk => freetalk.id !== action.payload)
      },
      [__deleteFreeTalk.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      [__updateFreeTalk.pending]: (state) => {
        state.isLoading = true;
      },
  
      [__updateFreeTalk.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log('action', action)
        console.log('action.payload', action.payload)
        state.freetalks = state.freetalks.map((freetalk) => {
          if (freetalk.id === action.payload.id) {
            freetalk = action.payload;
          }
          return freetalk;
        })
      },
      [__updateFreeTalk.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

    },
});

export const {} = FreeTalkSlice.actions;
export default FreeTalkSlice.reducer;