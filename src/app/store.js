import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "../features/toast/toastSlice";
import authReducer from "../features/auth/authSlice";
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    profile: profileReducer
  },
});
