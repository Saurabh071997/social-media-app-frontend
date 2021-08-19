import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersByName, getSuggestions } from "../../services/search";

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (searchstring, { rejectWithValue }) => {
    try {
      const response = await getUsersByName(searchstring);
      return { status: response.status, ...response.data };
    } catch (err) {
      return rejectWithValue({
        status: err?.response?.status,
        ...err?.response?.data,
      });
    }
  }
);

export const getFollowSuggestions = createAsyncThunk(
  "search/getFollowSuggestions",
  async () => {
    const response = await getSuggestions();
    return response?.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: "idle",
    error: null,
    searchedUsers: [],
    followSuggestions: [],
  },

  reducers: {
    resetSearch: (state) => {
      state.status = "idle";
      state.error = null;
      state.searchedUsers = [];
      state.followSuggestions = [];
    },
  },

  extraReducers: {
    [searchUsers.pending]: (state) => {
      state.status = "pending";
    },

    [searchUsers.fulfilled]: (state, action) => {
      // console.log(action.payload.data)
      state.status = "fulfilled";
      state.searchedUsers = action.payload.data;
    },

    [searchUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload.errorMessage;
    },

    [getFollowSuggestions.pending]: (state) => {
      state.status = "pending";
    },

    [getFollowSuggestions.fulfilled]: (state, action) => {
      state.status = "follow_fulfilled";
      state.followSuggestions = action.payload.data;
    },

    [getFollowSuggestions.rejected]: (state) => {
      state.status = "error";
      state.error = "something went wrong";
    },
  },
});

export const { resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
