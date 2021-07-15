import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileData, updateProfileData } from "../../services/profile";
import { followUser, unfollowUser } from "../../services/follow";
import { likeUnlikePost, addComment } from "../../services/post";

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

export const likeUserPost = createAsyncThunk(
  "profile/likeUserPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await likeUnlikePost({ postId, action: "LIKE_POST" });
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const unlikeUserPost = createAsyncThunk(
  "profile/unlikeUserPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await likeUnlikePost({ postId, action: "UNLIKE_POST" });
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const commentUserPost = createAsyncThunk(
  "profile/commentUserPost",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const response = await addComment({
        postId,
        action: "ADD_COMMENT",
        comment,
      });
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
    profileUserPosts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetProfile: (state) => {
      state.status = "idle";
      state.error = null;
      state.profileUser = null;
      state.profileUserFollowers = null;
      state.profileUserFollowing = null;
      state.profileUserPosts = [];
    },
  },

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
      state.profileUserPosts = action.payload.data?.postResponse;
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
      state.profileUser.followerCount = state.profileUser.followerCount + 1;
    },

    [handleUserFollow.rejected]: (state) => {
      state.status = "error";
    },

    [handleUserUnFollow.pending]: (state) => {
      state.status = "pending";
    },

    [handleUserUnFollow.fulfilled]: (state, action) => {
      state.status = "unfollow_fulfilled";
      state.profileUserFollowers = state.profileUserFollowers?.filter(
        (followItem) => followItem?.__user?._id !== action.payload?.data?.__user
      );
      state.profileUser.followerCount = state.profileUser?.followerCount - 1;
    },

    [handleUserUnFollow.rejected]: (state) => {
      state.status = "error";
    },

    [likeUserPost.pending]: (state) => {
      state.status = "like_pending";
    },

    [likeUserPost.fulfilled]: (state, action) => {
      state.status = "like_fulfilled";
      const postIndex = state.profileUserPosts?.findIndex(
        (item) => item?._id === action.payload.data?._id
      );
      state.profileUserPosts[postIndex].likes = action.payload?.data?.likes;
      state.profileUserPosts[postIndex].likedBy = action.payload?.data?.likedBy;
    },

    [likeUserPost.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to like post";
    },

    [unlikeUserPost.pending]: (state) => {
      state.status = "unlike_pending";
    },

    [unlikeUserPost.fulfilled]: (state, action) => {
      state.status = "unlike_fulfilled";
      const postIndex = state.profileUserPosts?.findIndex(
        (item) => item?._id === action.payload.data?._id
      );
      state.profileUserPosts[postIndex].likes = action.payload?.data?.likes;
      state.profileUserPosts[postIndex].likedBy = action.payload?.data?.likedBy;
    },

    [unlikeUserPost.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to unlike post";
    },

    [commentUserPost.pending]: (state) => {
      state.status = "comment_pending";
    },

    [commentUserPost.fulfilled]: (state, action) => {
      state.status = "comment_fulfilled";
      const postIndex = state.profileUserPosts?.findIndex(
        (item) => item?._id === action.payload.data?._id
      );
      state.profileUserPosts[postIndex].comments = action.payload.data.comments;
    },

    [commentUserPost.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to add comment";
    },
  },
});

export const { resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
