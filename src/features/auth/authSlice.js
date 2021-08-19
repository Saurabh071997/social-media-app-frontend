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
    return response?.data;
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
    isUserAvailable: false,
    userFollowers: null,
    userFollowing: null,
    accessToken: JSON.parse(localStorage?.getItem("accessToken")) || null,
    error: null,
  },

  reducers: {
    logoutUser: (state) => {
      localStorage?.removeItem("accessToken");
      state.status = "idle";
      state.currentUser = null;
      state.accessToken = null;
      state.userFollowing = null;
      state.userFollowers = null;
      state.error = null;
      state.isUserAvailable = false;
    },

    resetAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.statusCode = null;
    },

    userFollowed: (state, action) => {
      state.status = "new_following";
      const newFollowingEntry = {
        __user: state.currentUser?._id,
        __follows: {
          _id: action.payload?.profile_user_id,
          name: action.payload?.profile_user_name,
          username: action.payload?.profile_user_username,
          profileImg: action.payload?.profile_user_img,
        },
      };
      state.userFollowing.push(newFollowingEntry);
    },

    userUnFollowed: (state, action) => {
      state.status = "unfollowed";
      state.userFollowing = state.userFollowing?.filter(
        (followItem) =>
          followItem?.__follows?._id !== action.payload.userprofileId
      );
    },
  },

  extraReducers: {
    [signupUserWithCredentials.pending]: (state) => {
      state.status = "loading";
    },

    [signupUserWithCredentials.fulfilled]: (state, action) => {
      const responseObj = action.payload;
      state.status = "tokenReceived"
      state.statusCode = 201
      state.currentUser = responseObj?.newUser 
      state.accessToken = responseObj.accessToken;
      localStorage?.setItem(
        "accessToken",
        JSON.stringify(responseObj.accessToken)
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseObj.accessToken}`;
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

    [getUserDetails.pending]: (state) => {
      state.status = "pending";
    },

    [getUserDetails.fulfilled]: (state, action) => {
      state.status = "user_available";
      state.isUserAvailable = true;
      state.currentUser = action.payload.data?.user;
      state.userFollowing = action.payload.data?.followResponse?.following;
      state.userFollowers = action.payload.data?.followResponse?.followers;
    },

    [getUserDetails.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { logoutUser, resetAuthStatus, userFollowed, userUnFollowed } =
  authSlice.actions;

export default authSlice.reducer;
