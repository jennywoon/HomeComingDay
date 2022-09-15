import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../modules/UserSlice';
import InformationSlice from '../modules/InformationSlice'
import HelpSlice from "../modules/HelpSlice";
import FreeTalkSlice from "../modules/FreeTalkSlice";
import CalendarSlice from "../modules/CalendarSlice";

import SearchSlice from "../modules/SearchSlice";
import SchoolInfoSlice from "../modules/SchoolInfoSlice";
import MyPageSlice from "../modules/MyPageSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
      // naver: NaverSlice.reducer,
  user: UserSlice.reducer,
  informations : InformationSlice,
  helps : HelpSlice,
  mypages: MyPageSlice,
  freetalks : FreeTalkSlice,
  calendars : CalendarSlice,
  searchs: SearchSlice,
  schoolInfo: SchoolInfoSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
}),
});

export default store;