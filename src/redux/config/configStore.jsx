import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../modules/userSlice';

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;