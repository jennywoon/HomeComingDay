import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../modules/UserSlice';
import InformationSlice from '../modules/InformationSlice'
import HelpSlice from "../modules/HelpSlice";
import FreeTalkSlice from "../modules/FreeTalkSlice";
import CalendarSlice from "../modules/CalendarSlice";


import SearchSlice from "../modules/SearchSlice";
import SchoolInfoSlice from "../modules/SchoolInfoSlice";
import MyPageSlice from "../modules/MyPageSlice";
import ChatSlice from "../modules/ChatSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import NoticeSlice from "../modules/NoticeSlice";

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: UserSlice.reducer,
    informations: InformationSlice,
    helps: HelpSlice,
    mypages: MyPageSlice,
    freetalks: FreeTalkSlice,
    calendars: CalendarSlice,
    searchs: SearchSlice,
    schoolInfo: SchoolInfoSlice,
    chat: ChatSlice,
    notice: NoticeSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;