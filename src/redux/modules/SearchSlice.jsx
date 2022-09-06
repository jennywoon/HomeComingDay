import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const initialState = {
    searchs: [  
    ],
    helps: [],
    // insta: null,
    isLoading: false,
    error: null,
};

// export const __getSearch = createAsyncThunk("searchs/getSearch", async (payload, thunkAPI) => {
//     try {
//         const data = await axios.get("http://localhost:3001/searchs")
//         console.log(data.data)
//         return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//         console.log('error', error);
//         return thunkAPI.rejectWithValue(error);
//     }
// });

export const __getSearch = createAsyncThunk("searchs/getsearchs", async (props)=>{
  console.log(props)
  return await axios
  .get(`http://localhost:3001/helps?keyword=${props}` )
  .then((response) => response.data)
})



export const __postSearch = createAsyncThunk("searchs/postSearch", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const data = await axios.post("http://localhost:3001/searchs", payload);
        console.log('data', data)
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
      // [__getSearch.pending]: (state) => {
      //   state.isLoading = true;
      // },
      // [__getSearch.fulfilled]: (state, action) => {
      //   state.isLoading = false;
      //   state.searchs = action.payload;
      // },
      // [__getSearch.rejected]: (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // },

      [__getSearch.fulfilled]: (state, action) => {
        console.log(state.helps)
        console.log(action.payload)
        state.helps = action.payload.title;
        // state.result_musicArtist = action.payload.musicArtist;
        // state.result_musicTitle = action.payload.musicTitle;
        // state.result_videoArtist = action.payload.videoArtist;
        // state.result_videoTitle = action.payload.videoTitle;
  
      },
      [__getSearch.rejected]: (state, action) => {
      },

      [__postSearch.pending]: (state) => {
        state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      },
      [__postSearch.fulfilled]: (state, action) => {
        state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
        // state.searchs.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      },
      [__postSearch.rejected]: (state, action) => {
        state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      },
    },
});

export const {} = SearchSlice.actions;
export default SearchSlice.reducer;