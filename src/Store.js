import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slices/userInfoSlice";

export default configureStore({
  reducer: {
    userInfo: userInfoSlice,
  },
});
