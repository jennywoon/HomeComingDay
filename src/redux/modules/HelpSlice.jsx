import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    helps: [],
    helpcomments: [],
    isLoading: false,
    error: null,
};

export const __getHelp = createAsyncThunk("helps/getHelp", async (payload, thunkAPI) => {
    try {
        const data = await axios.get("http://localhost:3001/helps")
        // console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        // console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postHelp = createAsyncThunk("helps/postHelp", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const data = await axios.post("http://localhost:3001/helps", payload);
        // console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteHelp = createAsyncThunk("helps/deleteHelp", async (payload, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/helps/${payload}`);
    // console.log('data', data)
    // console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateHelp = createAsyncThunk("helps/updateHelp", async (payload, thunkAPI) => {
  try {
    await axios.put(`http://localhost:3001/helps/${payload.id}`, payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);

export const __getHelpComment = createAsyncThunk("comments/getHelpComment", async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`http://localhost:3001/helpcomments`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postHelpComment = createAsyncThunk("comments/postHelpComment", async (payload, thunkAPI) => {
  try {
    console.log("payload" , payload)
    const data = await axios.post(`http://localhost:3001/helpcomments`, payload);
    console.log(data)
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    
    return thunkAPI.rejectWithValue(error);
  }
});

export const HelpSlice = createSlice({
    name: "comments", 
    initialState,
    reducers: {},
    extraReducers: {
      [__getHelp.pending]: (state) => {
        state.isLoading = true;
      },
      [__getHelp.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.helps = action.payload;
      },
      [__getHelp.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postHelp.pending]: (state) => {
        state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      },
      [__postHelp.fulfilled]: (state, action) => {
        state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
        state.helps.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      },
      [__postHelp.rejected]: (state, action) => {
        state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      },

      [__deleteHelp.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteHelp.fulfilled]: (state, action) => {
        state.isLoading = false;
        // console.log(state.camps)
        // console.log(action)
        state.helps = state.helps.filter(helps => helps.id !== action.payload)
      },
      [__deleteHelp.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      [__updateHelp.pending]: (state) => {
        state.isLoading = true;
      },
  
      [__updateHelp.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log('action', action)
        console.log('action.payload', action.payload)
        state.helps = state.helps.map((help) => {
          if (help.id === action.payload.id) {
            help = action.payload;
          }
          return help;
        })
      },
      [__updateHelp.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__getHelpComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__getHelpComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.helpcomments = action.payload;
      },
      [__getHelpComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postHelpComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__postHelpComment.fulfilled]: (state, action) => {
        state.isLoading = false; 
        console.log(action.payload)
        state.helpcomments.push(action.payload);
      },
      [__postHelpComment.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
      },
 
    },
});

export const {} = HelpSlice.actions;
export default HelpSlice.reducer;