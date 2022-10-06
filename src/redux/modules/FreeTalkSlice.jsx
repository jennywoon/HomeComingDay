import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  freetalks: [],
  freetalksfind: [],
  freetalksReplyCommentList: [],
  freeComments: [],
  freePopular: [],
  heart: [],
  isLoading: false,
  error: null,
};

export const __getFreeTalk = createAsyncThunk(
  'freetalks/getFreeTalk',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/freeTalk`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailFreeTalk = createAsyncThunk(
  'freetalks/getDetailFreeTalk',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/freeTalk/${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPopularFreeTalk = createAsyncThunk(
  'freetalk/getPopularfreetalk',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/freeTalk/popular`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postFreeTalk = createAsyncThunk(
  'freetalks/postFreeTalk',
  async (payload, thunkAPI) => {
    for (var value of payload.values()) {}
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          responseType: 'blob',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      };
      const data = await axios.post(
        `${BASE_URL}/article/freeTalk`,
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteFreeTalk = createAsyncThunk(
  'freetalks/deleteHelp',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/freeTalk/${payload}`,
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

export const __updateFreeTalk = createAsyncThunk(
  'freetalks/updateHelp',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'put',
        url: `${BASE_URL}/article/freeTalk/${payload.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __postFreeTalkComment = createAsyncThunk(
  'comments/postInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/freeTalk/comment/${payload.articleId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteFreeTalkComment = createAsyncThunk(
  'comments/deleteInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateFreeTalkComment = createAsyncThunk(
  'comment/updateInfoComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'put',
        url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//대댓글
export const __postFreeTalkReplyComment = createAsyncThunk(
  'comments/postFreeTalkReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteFreeTalkReplyComment = createAsyncThunk(
  'comments/deleteFreeTalkReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}/${payload.childCommentId}`,
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

export const __updateFreeTalkReplyComment = createAsyncThunk(
  'comments/updatefreeTalkReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'patch',
        url: `${BASE_URL}/article/freeTalk/${payload.articleId}/comment/${payload.commentId}/${payload.childCommentId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 좋아요
export const __postFreeTalkHeart = createAsyncThunk(
  'postFreeTalkHeart',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/help/${payload.articleId}/heart`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const FreeTalkSlice = createSlice({
  name: 'freetalks',
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

    [__getDetailFreeTalk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailFreeTalk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freetalksfind = action.payload;
    },
    [__getDetailFreeTalk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getPopularFreeTalk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPopularFreeTalk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freePopular = action.payload;
    },
    [__getPopularFreeTalk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postFreeTalk.pending]: (state) => {
      state.isLoading = true;
    },
    [__postFreeTalk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freetalks.push(action.payload);
    },
    [__postFreeTalk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteFreeTalk.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteFreeTalk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freetalks = state.freetalks.filter(
        (freetalk) => freetalk.id !== action.payload
      );
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
      state.freetalks = state.freetalks.map((freetalk) => {
        if (freetalk.id === action.payload.id) {
          freetalk = action.payload;
        }
        return freetalk;
      });
    },
    [__updateFreeTalk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 댓글
    [__postFreeTalkComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postFreeTalkComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freeComments.push(action.payload);
    },
    [__postFreeTalkComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteFreeTalkComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteFreeTalkComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freeComments = state.freeComments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteFreeTalkComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateFreeTalkComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateFreeTalkComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freeComments = state.freeComments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment.comment = action.payload.comment;
        }
        return comment;
      });
    },
    [__updateFreeTalkComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //대댓글
    [__postFreeTalkReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postFreeTalkReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freetalksReplyCommentList.push(action.payload);
    },
    [__postFreeTalkReplyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteFreeTalkReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteFreeTalkReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freetalksReplyCommentList = state.freetalksReplyCommentList.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteFreeTalkReplyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateFreeTalkReplyComment.pending]: (state) => {
      state.isLoading = true;
    },

    [__updateFreeTalkReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.freetalksReplyCommentList = state.freetalksReplyCommentList.map(
        (comment) => {
          if (comment.childCommentId === action.payload.childCommentId) {
            comment.content = action.payload.content;
          }
          return comment;
        }
      );
    },

    // 좋아요
    [__postFreeTalkHeart.pending]: (state) => {
      state.isLoading = true;
    },
    [__postFreeTalkHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.heart.unshift(action);
    },
    [__postFreeTalkHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = FreeTalkSlice.actions;
export default FreeTalkSlice.reducer;
