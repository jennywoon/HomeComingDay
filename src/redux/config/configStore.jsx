import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../modules/UserSlice';

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: UserSlice.reducer,
  },
});

export default store;