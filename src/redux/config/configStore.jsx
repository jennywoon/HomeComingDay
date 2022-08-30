import { configureStore } from "@reduxjs/toolkit";
import InformationSlice from "../modules/InformationSlice";
import UserSlice from '../modules/UserSlice';

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: UserSlice.reducer,
    informations: InformationSlice,
  },
});

export default store;