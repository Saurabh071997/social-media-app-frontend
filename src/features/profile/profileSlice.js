import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileData, updateProfileData } from "../../services/profile";

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

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: {
    [getUserProfile.pending]: (state) => {
      state.status = "pending";
    },

    [getUserProfile.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.profileUser = action.payload.data;
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
  },
});

export default profileSlice.reducer;
