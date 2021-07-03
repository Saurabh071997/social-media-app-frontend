import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersByName } from "../../services/search";

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

const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: "idle",
    error: null,
    searchedUsers: [],
  },

  reducers: {
    resetSearch: (state)=> {
      state.status = "idle"
      state.error = null
      state.searchedUsers = []
    }
  },

  extraReducers: {
      [searchUsers.pending]: (state) => {
          state.status = "pending"
      },

      [searchUsers.fulfilled]: (state, action) => {
          // console.log(action.payload.data)
          state.status = "fulfilled"
          state.searchedUsers = action.payload.data
      },

      [searchUsers.rejected]: (state, action) =>{
          state.status = "error"
          state.error = action.payload.errorMessage
      }
  },
});

export const {resetSearch} = searchSlice.actions

export default searchSlice.reducer