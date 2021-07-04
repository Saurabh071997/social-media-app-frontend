import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileData, updateProfileData } from "../../services/profile";
import { followUser, unfollowUser } from "../../services/follow";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (profileId, { rejectWithValue }) => {
    try {
      let response = await getProfileData(profileId);
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (updateObj, { rejectWithValue }) => {
    try {
      let response = await updateProfileData(updateObj);
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const handleUserFollow = createAsyncThunk(
  "profile/handleUserFollow",
  async (followObj, { rejectWithValue }) => {
    try {
      const response = await followUser(followObj.profileId);
      return { status: response.status, ...response.data, followObj };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const handleUserUnFollow = createAsyncThunk(
  "profile/handleUserUnFollow",
  async (unfollowObj, { rejectWithValue }) => {
    try {
      const response = await unfollowUser(unfollowObj.profileId);
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileUser: null,
    profileUserFollowing: null,
    profileUserFollowers: null,
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: {
    [getUserProfile.pending]: (state) => {
      state.status = "profile_pending";
    },

    [getUserProfile.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.profileUser = action.payload.data.user;
      state.profileUserFollowing =
        action.payload.data?.followResponse?.following;
      state.profileUserFollowers =
        action.payload.data?.followResponse?.followers;

    },

    [getUserProfile.rejected]: (state) => {
      state.status = "error";
    },

    [updateUserProfile.pending]: (state) => {
      state.status = "pending";
    },

    [updateUserProfile.fulfilled]: (state, action) => {
      state.status = "updated";
      state.profileUser = action.payload.data;
    },

    [updateUserProfile.rejected]: (state, action) => {
      state.status = action.payload.status === 409 ? "error_409" : "error";
      state.error = action.payload.errorMessage;
    },

    [handleUserFollow.pending]: (state) => {
      state.status = "pending";
    },

    [handleUserFollow.fulfilled]: (state, action) => {
      state.status = "follow_fulfilled";
      const newFollowerEntry = {
        ...action.payload.data,
        __user: {
          name: action.payload?.followObj?.currentName,
          profileImg: action.payload?.followObj?.currentImg,
          username: action.payload?.followObj?.currentUsername,
          _id: action.payload?.followObj?.currentId,
        },
      };
      state.profileUserFollowers?.push(newFollowerEntry);
      state.profileUser.followerCount = state.profileUser.followerCount+1
    },

    [handleUserFollow.rejected]: (state, action) => {
      state.status = "error";
      console.log("inside follow rejected");
      console.log(action.payload);
    },

    [handleUserUnFollow.pending]: (state) => {
      state.status = "pending";
    },

    [handleUserUnFollow.fulfilled]: (state, action) => {
      state.status = "unfollow_fulfilled";
      state.profileUserFollowers = state.profileUserFollowers?.filter(followItem => followItem?.__user?._id !== action.payload?.data?.__user)
      state.profileUser.followerCount = state.profileUser?.followerCount-1
    },

    [handleUserUnFollow.rejected]: (state, action) => {
      state.status = "error";
      console.log("inside unfollow rejected");
      console.log(action.payload);
    },
  },
});

export default profileSlice.reducer;
