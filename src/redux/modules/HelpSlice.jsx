import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from '../../shared/cookies';
// import Cookies from "universal-cookie"

// const cookies = new Cookies();

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
    commentList : [],
    helps : [],
    heart: [],
    helpPopular:[],
    isLoading: false,
    error: null,
};

// const config = {
  
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization : `Bearer ${getCookie('accessToken')}`,
//     // RefreshToken : `${getCookie('refreshToken')}`
  
//   },
// };


export const __getHelp = createAsyncThunk("helps/getHelp", async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/help`,
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

export const __getDetailHelp = createAsyncThunk("helps/getDetailHelp", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/article/help/${payload}`,
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

export const __getPopularHelp = createAsyncThunk("helps/getPopularHelp", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/article/help/popular`,
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


export const __postHelp = createAsyncThunk(
  "helps/postHelp", async (payload, thunkAPI) => {
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
          // RefreshToken : `${getCookie("refreshToken")}`
        }
      }
        const data = await axios.post(`${BASE_URL}/article/help`, payload, config);
        // console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteHelp = createAsyncThunk("helps/deleteHelp", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'delete',
      url: `${BASE_URL}/article/help/${payload}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // console.log('error', error)
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateHelp = createAsyncThunk("helps/updateHelp", async (payload, thunkAPI) => {
  try {
    console.log("payload" , payload)
    const data = await axios({
      method: 'put',
      url: `${BASE_URL}/article/help/${payload.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
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
    const data = await axios({
      method: 'post',
      url: `${BASE_URL}/article/help/comment/${payload.articleId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    
    console.log(data)
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteHelpComment = createAsyncThunk("comments/deleteHelpComment", async (payload, thunkAPI) => {
  try {
    console.log(payload)
    const data = await axios({
      method: 'delete',
      url: `${BASE_URL}/article/help/${payload.articleId}/comment/${payload.commentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },

    });
  //   console.log(payload)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const __updateHelpComment = createAsyncThunk("comment/updateHelpComment", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'put',
      url: `${BASE_URL}/article/help/${payload.articleId}/comment/${payload.commentId}`,
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

// 좋아요
export const __postHelpHeart = createAsyncThunk(
  "postHelpHeart",
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: "post",
        url: `${BASE_URL}/article/help/${payload.articleId}/heart`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        data: payload,
      });
      console.log(data)
      console.log("data",data.data)
      // console.log(payload)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      [__getPopularHelp.pending]: (state) => {
        state.isLoading = true;
      },
      [__getPopularHelp.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.helpPopular = action.payload;
      },
      [__getPopularHelp.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      [__postHelp.pending]: (state) => {
        state.isLoading = true; 
      },
      [__postHelp.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.helps.push(action.payload);
      },
      [__postHelp.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      [__deleteHelp.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteHelp.fulfilled]: (state, action) => {
        state.isLoading = false;
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
        state.commentList = action.payload;
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
        state.commentList.push(action.payload);
      },
      [__postHelpComment.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload;
      },

      [__deleteHelpComment.pending]: (state) => {
        state.isLoading = true;
      },
      [__deleteHelpComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        // console.log(state.comment)
        console.log(action)
        state.commentList = state.commentList.filter(comment => comment.id !== action.payload)
      },
      [__deleteHelpComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      // updateComment
      [__updateHelpComment.pending]: (state) => {
        state.isLoading = true;
      },
  
      [__updateHelpComment.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log('action', action)
        console.log('comment', state.commentList)
        state.commentList = state.commentList.map((comment) => {
          if (comment.id === action.payload.id) {
            comment.comment = action.payload.comment;
          }
          return comment;
        })
  
      },
      [__updateHelpComment.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },

      // 좋아요
      [__postHelpHeart.pending]: (state) => {
        state.isLoading = true;
      },
      [__postHelpHeart.fulfilled]: (state, action) => {
        console.log("__postHeart.fulfilled", action);
        state.isLoading = false;
        state.heart.unshift(action);
      },
      [__postHelpHeart.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
});

export const {} = HelpSlice.actions;
export default HelpSlice.reducer;