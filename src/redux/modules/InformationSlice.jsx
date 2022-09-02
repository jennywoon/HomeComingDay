import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    informations: [  
    ],
    // insta: null,
    isLoading: false,
    error: null,
};

export const __getInformation = createAsyncThunk("informations/getInformation", async (payload, thunkAPI) => {
    try {
        const data = await axios.get("http://localhost:3001/informations")
        console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postInformation = createAsyncThunk("informations/postInformation", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const data = await axios.post("http://localhost:3001/informations", payload);
        console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteInformation = createAsyncThunk("informations/deleteHelp", async (payload, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/informations/${payload}`);
    // console.log('data', data)
    // console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateInformation = createAsyncThunk("informations/updateHelp", async (payload, thunkAPI) => {
  try {
    await axios.put(`http://localhost:3001/informations/${payload.id}`, payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);



export const InformationSlice = createSlice({
    name: "informations",
    initialState,
    reducers: {},
    extraReducers: {
      [__getInformation.pending]: (state) => {
        state.isLoading = true;
      },
      [__getInformation.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.informations = action.payload;
      },
      [__getInformation.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postInformation.pending]: (state) => {
        state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      },
      [__postInformation.fulfilled]: (state, action) => {
        state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
        state.informations.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      },
      [__postInformation.rejected]: (state, action) => {
        state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      },

      [__deleteInformation.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteInformation.fulfilled]: (state, action) => {
        state.isLoading = false;
        // console.log(state.camps)
        // console.log(action)
        state.informations = state.informations.filter(info => info.id !== action.payload)
      },
      [__deleteInformation.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      [__updateInformation.pending]: (state) => {
        state.isLoading = true;
      },
  
      [__updateInformation.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log('action', action)
        console.log('action.payload', action.payload)
        state.informations = state.informations.map((info) => {
          if (info.id === action.payload.id) {
            info = action.payload;
          }
          return info;
        })
      },
      [__updateInformation.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
});

export const {} = InformationSlice.actions;
export default InformationSlice.reducer;