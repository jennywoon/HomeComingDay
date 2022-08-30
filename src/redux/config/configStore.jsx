import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../modules/UserSlice';
import InformationSlice from '../modules/InformationSlice'
import HelpSlice from "../modules/HelpSlice";
import FreeTalkSlice from "../modules/FreeTalkSlice";

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: UserSlice.reducer,
    informations : InformationSlice,
    helps : HelpSlice,
    freetalks : FreeTalkSlice,
  }
});

export default store;