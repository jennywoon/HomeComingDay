import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from '../../shared/cookies';
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
    freetalks: [],
    freeComments:[],
    // insta: null,
    isLoading: false,
    error: null,
};

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getCookie('accessToken')}`,
//     RefreshToken : `${getCookie('refreshToken')}`
//   },
// };

export const __getFreeTalk = createAsyncThunk("freetalks/getFreeTalk", async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/freeTalk`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie("accessToken")}`,
          // RefreshToken : getCookie('refreshToken')
        },
      });
        console.log(data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postFreeTalk = createAsyncThunk(
  "freetalks/postFreeTalk", async (payload, thunkAPI) => {
    console.log('payload', payload)
      for (var value of payload.values()) {
        console.log("formdata value", value);
      }
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          responseType: "blob",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        }
      }
        const data = await axios.post(`${BASE_URL}/article/freeTalk`, payload ,config);
        console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) { 
      console.log('error', error)
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteFreeTalk = createAsyncThunk("freetalks/deleteHelp", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'delete',
      url: `${BASE_URL}/article/freeTalk/${payload}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
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
    const data = await axios({
      method: 'put',
      url: `${BASE_URL}/article/freeTalk/${payload.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);

export const __getFreeComment = createAsyncThunk("comments/getInfoComment", async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`http://localhost:3001/freeComments`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postFreeComment = createAsyncThunk("comments/postInfoComment", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'post',
      url: `${BASE_URL}/article/freeTalk/comment/${payload.articleId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    console.log("payload" , payload)
    console.log(data)
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteFreeComment = createAsyncThunk("comments/deleteInfoComment", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'delete',
      url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    // console.log(payload)
  //   console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateFreeComment = createAsyncThunk("comment/updateInfoComment", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'put',
      url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    console.log("payload",payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    console.log(payload)
    return thunkAPI.rejectWithValue(error);
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

      [__getFreeComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__getFreeComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.freeComments = action.payload;
      },
      [__getFreeComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postFreeComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__postFreeComment.fulfilled]: (state, action) => {
        state.isLoading = false; 
        console.log(action.payload)
        state.freeComments.push(action.payload);
      },
      [__postFreeComment.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
      },

      [__deleteFreeComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteFreeComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        // console.log(state.comment)
        console.log(action)
        state.freeComments = state.freeComments.filter(comment => comment.id !== action.payload)
      },
      [__deleteFreeComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      // updateComment
      [__updateFreeComment.pending]: (state) => {
        state.isLoading = true;
      },
  
      [__updateFreeComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log('action', action)
        console.log('comment', state.freeComments)
        state.freeComments = state.freeComments.map((comment) => {
          if (comment.id === action.payload.id) {
            comment.comment = action.payload.comment;
          }
          return comment;
        })
  
      },
      [__updateFreeComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },


    },
});

export const {} = FreeTalkSlice.actions;
export default FreeTalkSlice.reducer;