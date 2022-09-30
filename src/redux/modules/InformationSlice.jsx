import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie, setCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  infoComments: [],
  infoReplyComments: [],
  informations: [],
  informationsfind:[],
  informationPopular:[],
  heart: [],
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

export const __getInformation = createAsyncThunk(
  'informations/getInformation',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/information`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      // console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailInformation = createAsyncThunk(
  'informations/getDetailinformations',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/information/${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
          // RefreshToken : getCookie('refreshToken')
        },
      });
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPopularInformation = createAsyncThunk("information/getPopularInformation", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/article/information/popular`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
        // RefreshToken : getCookie('refreshToken')
      },
    });
    // console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
      // console.log('error', error);
      return thunkAPI.rejectWithValue(error);
  }
});

export const __postInformation = createAsyncThunk(
  'informations/postInformation',
  async (payload, thunkAPI) => {
    // console.log('payload', payload);
    for (var value of payload.values()) {
      // console.log('formdata value', value);
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          responseType: 'blob',
          Authorization: `Bearer ${getCookie('accessToken')}`,
          // RefreshToken : `${getCookie("refreshToken")}`
        },
      };
      const data = await axios.post(
        `${BASE_URL}/article/information`,
        payload,
        config
      );
      // console.log('data', data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteInformation = createAsyncThunk(
  'informations/deleteHelp',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/information/${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateInformation = createAsyncThunk(
  'informations/updateHelp',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'put',
        url: `${BASE_URL}/article/information/${payload.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      // console.log('error', error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __getInfoComment = createAsyncThunk(
  'comments/getInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3001/infoComments`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postInfoComment = createAsyncThunk(
  'comments/postInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/information/comment/${payload.articleId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      // console.log('payload', payload);
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteInfoComment = createAsyncThunk(
  'comments/deleteInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/information/${payload.articleId}/comment/${payload.commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      //   console.log(payload)
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateInfoComment = createAsyncThunk(
  'comment/updateInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'put',
        url: `${BASE_URL}/article/information/${payload.articleId}/comment/${payload.commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      // console.log('payload', payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      // console.log(payload);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//대댓글
export const __postInfoReplyComment = createAsyncThunk(
  'replycomennts/postInfoReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/information/${payload.articleId}/comment/${payload.commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      // console.log('payload', payload);
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteInfoReplyComment = createAsyncThunk("comments/deleteHelpReplyComment", async (payload, thunkAPI) => {
  try {
    const data = await axios({
      method: 'delete',
      url: `${BASE_URL}/article/information/${payload.articleId}/comment/${payload.commentId}/${payload.childCommentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    // console.log(data)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateInfoReplyComment = createAsyncThunk("comments/updateHelpReplyComment", async (payload, thunkAPI) => {
  try {

    const data = await axios({
      method: 'patch',
      url: `${BASE_URL}/article/information/${payload.articleId}/comment/${payload.commentId}/${payload.childCommentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      data: payload
    });
    // console.log(data)
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 좋아요
export const __postInformationHeart = createAsyncThunk(
  'postInformationHeart',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/information/${payload.articleId}/heart`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      // console.log(data);
      // console.log('data', data.data);
      // console.log(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const InformationSlice = createSlice({
  name: 'informations',
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

    [__getDetailInformation.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailInformation.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload)
      state.informationsfind = action.payload;
    },
    [__getDetailInformation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },


    [__getPopularInformation.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPopularInformation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.informationPopular = action.payload;
    },
    [__getPopularInformation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__postInformation.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInformation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.informations.push(action.payload);
    },
    [__postInformation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteInformation.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteInformation.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action)
      state.informations = state.informations.filter(
        (info) => info.id !== action.payload
      );
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
      // console.log('action', action);
      // console.log('action.payload', action.payload);
      state.informations = state.informations.map((info) => {
        if (info.id === action.payload.id) {
          info = action.payload;
        }
        return info;
      });
    },
    [__updateInformation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getInfoComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getInfoComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.infoComments = action.payload;
    },
    [__getInfoComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postInfoComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInfoComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.infoComments.push(action.payload);
    },
    [__postInfoComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteInfoComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteInfoComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(state.comment)
      // console.log(action);
      state.infoComments = state.infoComments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteInfoComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    
    [__updateInfoComment.pending]: (state) => {
      state.isLoading = true;
    },

    [__updateInfoComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log('action', action);
      // console.log('comment', state.helpcomments);
      state.infoComments = state.infoComments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment.comment = action.payload.content;
        }
        return comment;
      });
    },
    [__updateInfoComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //대댓글
    [__postInfoReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInfoReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.infoReplyComments.push(action.payload);
    },
    [__postInfoReplyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteInfoReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteInfoReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(state.comment)
      // console.log(action)
      state.infoReplyComments = state.infoReplyComments.filter(comment => comment.id !== action.payload)
    },
    [__deleteInfoReplyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateInfoReplyComment.pending]: (state) => {
      state.isLoading = true;
    },

    [__updateInfoReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log('action', action.payload)
      // console.log('comment', state.childCommentList)
      state.infoReplyComments = state.infoReplyComments.map((comment) => {
        if (comment.childCommentId === action.payload.childCommentId) {
          comment.content = action.payload.content;
        }
        return comment;
      })

    },


    // 좋아요
    [__postInformationHeart.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInformationHeart.fulfilled]: (state, action) => {
      // console.log('__postHeart.fulfilled', action);
      state.isLoading = false;
      state.heart.unshift(action);
    },
    [__postInformationHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = InformationSlice.actions;
export default InformationSlice.reducer;
