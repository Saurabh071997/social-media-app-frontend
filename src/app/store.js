import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "../features/toast/toastSlice";
import authReducer from "../features/auth/authSlice";
import profileReducer from '../features/profile/profileSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer
  },
});
