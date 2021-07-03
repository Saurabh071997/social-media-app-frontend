import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleUserSignup,
  handleUserLogin,
  getUserData,
} from "../../services/auth";

export const signupUserWithCredentials = createAsyncThunk(
  "auth/signupUserWithCredentials",
  async (newUserObj, { rejectWithValue }) => {
    try {
      let response = await handleUserSignup(newUserObj);
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const loginUserWithCredentials = createAsyncThunk(
  "auth/loginUserWithCredentials",
  async (loginUserObj, { rejectWithValue }) => {
    try {
      let response = await handleUserLogin(loginUserObj);
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async () => {
      let response = await getUserData();
      return response?.data
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: JSON.parse(localStorage?.getItem("accessToken"))
      ? "tokenReceived"
      : "idle",
    statusCode: null,
    currentUser: null,
    accessToken: JSON.parse(localStorage?.getItem("accessToken")) || null,
    error: null,
  },

  reducers: {
    logoutUser: (state) => {
      localStorage?.removeItem("accessToken");
      state.status = "idle";
      state.currentUser = null;
      state.accessToken = null;
      state.error = null;
    },

    resetAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.statusCode = null;
    },
  },

  extraReducers: {
    [signupUserWithCredentials.pending]: (state) => {
      state.status = "loading";
    },

    [signupUserWithCredentials.fulfilled]: (state, action) => {
      const responseObj = action.payload;
      state.status = "signup_success";
      state.statusCode = responseObj.status;
    },

    [signupUserWithCredentials.rejected]: (state, action) => {
      const responseObj = action.payload;
      state.status = "error";
      state.statusCode = responseObj.status;
      state.error = responseObj.message;
    },

    [loginUserWithCredentials.pending]: (state) => {
      state.status = "loading";
    },

    [loginUserWithCredentials.fulfilled]: (state, action) => {
      const responseObj = action.payload;
      state.status = "tokenReceived";
      state.statusCode = 200;
      state.currentUser = responseObj.loggedInUser;
      state.accessToken = responseObj.accessToken;
      localStorage?.setItem(
        "accessToken",
        JSON.stringify(responseObj.accessToken)
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseObj.accessToken}`;
    },

    [loginUserWithCredentials.rejected]: (state, action) => {
      const responseObj = action.payload;
      state.statusCode = responseObj.status;
      state.status = "error";
      state.error = responseObj.errorMessage;
    },

    [getUserDetails.pending]: (state) =>{
      state.status = "pending"
    },

    [getUserDetails.fulfilled]: (state, action) => {
      state.status= "user_available"
      state.currentUser = action.payload.data
    },

    [getUserDetails.rejected]: (state) => {
      state.status = "error"
    }
  },
});

export const { logoutUser, resetAuthStatus } = authSlice.actions;

export default authSlice.reducer;
