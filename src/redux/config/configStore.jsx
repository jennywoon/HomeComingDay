import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../modules/UserSlice';
import InformationSlice from '../modules/InformationSlice'
import HelpSlice from "../modules/HelpSlice";
import FreeTalkSlice from "../modules/FreeTalkSlice";
import CalendarSlice from "../modules/CalendarSlice";
import SearchSlice from "../modules/SearchSlice";
import SchoolInfoSlice from "../modules/SchoolInfoSlice";

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: UserSlice.reducer,
    informations : InformationSlice,
    helps : HelpSlice,
    freetalks : FreeTalkSlice,
    calendars : CalendarSlice,
    searchs: SearchSlice,
    schoolSearchs: SchoolInfoSlice,
    departmentSearchs: SchoolInfoSlice,
  }
});

export default store;