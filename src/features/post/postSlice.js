import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPosts,
  addPost,
  likeUnlikePost,
  addComment,
} from "../../services/post";

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const response = await getPosts();
  return response?.data;
});

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (newPostObj, { rejectWithValue }) => {
    try {
      const response = await addPost({
        content: newPostObj?.content,
        media: newPostObj?.media,
      });
      return { status: response.status, ...response.data, newPostObj };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const handleLikePost = createAsyncThunk(
  "post/handleLikePost",
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

export const handleUnlikePost = createAsyncThunk(
  "post/handleUnlikePost",
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

export const addPostComment = createAsyncThunk(
  "post/addPostComment",
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

const postSlice = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
    // likedPosts: [],
  },
  reducers: {
    resetPostStatus: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = "pending";
    },

    [getAllPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.data;
    },

    [getAllPosts.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to get posts";
    },

    [addNewPost.pending]: (state) => {
      state.status = "pending";
    },

    [addNewPost.fulfilled]: (state, action) => {
      state.status = "post_added";
      console.log(action.payload.data);
      const newPostEntry = {
        ...action.payload.data,
        __userId: {
          _id: action.payload?.newPostObj?.currentId,
          name: action.payload?.newPostObj?.currentName,
          username: action.payload?.newPostObj?.currentUsername,
          profileImg: action.payload?.newPostObj?.currentImg,
        },
      };
      console.log("new post : ", newPostEntry);
      state.posts.push(newPostEntry);
    },

    [addNewPost.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to add new Post";
    },

    [handleLikePost.pending]: (state) => {
      state.status = "update_pending";
    },

    [handleLikePost.fulfilled]: (state, action) => {
      state.status = "update_fulfilled";
      // console.log("payload in like", action.payload);
      const postIndex = state.posts.findIndex(
        (postItem) => postItem?._id === action.payload?.data?._id
      );
      state.posts[postIndex].likes = action.payload?.data?.likes;
      state.posts[postIndex].likedBy = action.payload?.data?.likedBy;
    },

    [handleLikePost.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to Like Post";
    },

    [handleUnlikePost.pending]: (state) => {
      state.status = "update_pending";
    },

    [handleUnlikePost.fulfilled]: (state, action) => {
      state.status = "update_fulfilled";
      const postIndex = state.posts.findIndex(
        (postItem) => postItem?._id === action.payload?.data?._id
      );
      state.posts[postIndex].likes = action.payload?.data?.likes;
      state.posts[postIndex].likedBy = action.payload?.data?.likedBy;
    },

    [handleUnlikePost.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed opeartion";
    },

    [addPostComment.pending]: (state) => {
      state.status = "comment_pending";
    },

    [addPostComment.fulfilled]: (state, action) => {
      state.status = "update_fulfilled";
      const postIndex = state.posts.findIndex(
        (postItem) => postItem?._id === action.payload?.data?._id
      );
      state.posts[postIndex].comments = action.payload.data.comments;
    },

    [addPostComment.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Failed to add Comment";
    },
  },
});

export const { resetPostStatus } = postSlice.actions;

export default postSlice.reducer;
