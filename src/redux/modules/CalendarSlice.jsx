import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../shared/cookies';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  calendarsComments: [],
  calendarsReplyCommentList: [],
  calendarfind: [],
  calendars: [],
  calendarPopular: [],
  heart: [],
  joinPeopleList: [],
  calendarJoin: [],
  isLoading: false,
  error: null,
};

export const __getCalendar = createAsyncThunk(
  'calendars/getCalendar',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/calendar`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailCalendar = createAsyncThunk(
  'calendars/getDetailcalendars',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/calendar/${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPopularCalendar = createAsyncThunk(
  'calendar/getPopularcalendar',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/calendar/popular`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postCalendar = createAsyncThunk(
  'calendars/postcalendars',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/calendar`,
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

export const __deleteCalendar = createAsyncThunk(
  'calendars/deleteCalendar',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/calendar/${payload}`,
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

export const __updateCalendar = createAsyncThunk(
  'calendars/updateCalendar',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'put',
        url: `${BASE_URL}/article/calendar/${payload.id}`,
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

// 댓글
export const __postCalendarComment = createAsyncThunk(
  'comments/postHelpComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/calendar/comment/${payload.articleId}`,
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

export const __deleteCalendarComment = createAsyncThunk(
  'comments/deleteHelpComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/calendar/${payload.articleId}/comment/${payload.commentId}`,
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

export const __updateCalendarComment = createAsyncThunk(
  'comment/updateHelpComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'put',
        url: `${BASE_URL}/article/calendar/${payload.articleId}/comment/${payload.commentId}`,
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
export const __postCalendarReplyComment = createAsyncThunk(
  'comments/postcalendarReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/calendar/${payload.articleId}/comment/${payload.commentId}`,
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

export const __deleteCalendarReplyComment = createAsyncThunk(
  'comments/deletecalendarReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'delete',
        url: `${BASE_URL}/article/calendar/${payload.articleId}/comment/${payload.commentId}/${payload.childCommentId}`,
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

export const __updateCalendarReplyComment = createAsyncThunk(
  'comments/updatecalendarReplyComment',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'patch',
        url: `${BASE_URL}/article/calendar/${payload.articleId}/comment/${payload.commentId}/${payload.childCommentId}`,
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
export const __postCalendarHeart = createAsyncThunk(
  'postCalendarHeart',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/calendar/${payload.articleId}/heart`,
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

//참여하기
export const __getJoin = createAsyncThunk(
  'calendars/getCalendarJoin',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'get',
        url: `${BASE_URL}/article/calendar/join/${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postJoin = createAsyncThunk(
  'postCalendarJoin',
  async (payload, thunkAPI) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${BASE_URL}/article/calendar/join/${payload.articleId}`,
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

export const CalendarSlice = createSlice({
  name: 'calendars',
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

    [__getDetailCalendar.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailCalendar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarfind = action.payload;
    },
    [__getDetailCalendar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 인기순
    [__getPopularCalendar.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPopularCalendar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarPopular = action.payload;
    },
    [__getPopularCalendar.rejected]: (state, action) => {
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
      state.calendars = state.calendars.filter(
        (calendars) => calendars.id !== action.payload
      );
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
      state.calendars = state.calendars.map((calendar) => {
        if (calendar.id === action.payload.id) {
          calendar = action.payload;
        }
        return calendar;
      });
    },
    [__updateCalendar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 댓글
    [__postCalendarComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postCalendarComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarsComments.push(action.payload);
    },
    [__postCalendarComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteCalendarComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteCalendarComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarsComments = state.calendarsComments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteCalendarComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateCalendarComment.pending]: (state) => {
      state.isLoading = true;
    },

    [__updateCalendarComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarsComments = state.calendarsComments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment.comment = action.payload.comment;
        }
        return comment;
      });
    },
    [__updateCalendarComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //대댓글
    [__postCalendarReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postCalendarReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarsReplyCommentList.push(action.payload);
    },
    [__postCalendarReplyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteCalendarReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteCalendarReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarsReplyCommentList = state.calendarsReplyCommentList.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteCalendarReplyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateCalendarReplyComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateCalendarReplyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarsReplyCommentList = state.calendarsReplyCommentList.map(
        (comment) => {
          if (comment.childCommentId === action.payload.childCommentId) {
            comment.content = action.payload.content;
          }
          return comment;
        }
      );
    },

    // 좋아요
    [__postCalendarHeart.pending]: (state) => {
      state.isLoading = true;
    },
    [__postCalendarHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.heart.unshift(action);
    },
    [__postCalendarHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //참여하기
    [__getJoin.pending]: (state) => {
      state.isLoading = true;
    },
    [__getJoin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.calendarJoin = action.payload;
    },
    [__getJoin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postJoin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postJoin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.joinPeopleList.push(action.payload);
    },
    [__postJoin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = CalendarSlice.actions;
export default CalendarSlice.reducer;
