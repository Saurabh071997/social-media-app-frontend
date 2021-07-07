import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNotifications,
  updateNotifications,
} from "../../services/notification";

export const getUserNotifications = createAsyncThunk(
  "notification/getUserNotifications",
  async () => {
    const response = await getNotifications();
    return response?.data;
  }
);

export const updateUserNotifications = createAsyncThunk(
  "notification/updateUserNotifications",
  async (notifications) => {
    const responseList = await updateNotifications(notifications);
    return responseList;
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    status: "idle",
    error: null,
    notifications: [],
  },

  reducers: {},

  extraReducers: {
    [getUserNotifications.pending]: (state) => {
      state.status = "pending";
    },

    [getUserNotifications.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.notifications = action.payload.data;
    },

    [getUserNotifications.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to get notifications";
    },

    [updateUserNotifications.pending]: (state) => {
      state.status = "update_pending";
    },

    [updateUserNotifications.fulfilled]: (state, action) => {
      state.status = "update_fulfilled";
      console.log(action.payload)
      let notificationlist = action.payload;
      for (let i = 0; i < notificationlist?.length; i++) {
        const index = state.notifications.findIndex(
          (item) => item?._id === notificationlist[i]?._id
        );
        state.notifications[index].read = true;
      }
    },

    [updateUserNotifications.rejected]: (state) => {
      state.status = "error";
      state.error = "Failed to update notifications";
    },
  },
});

export default notificationSlice.reducer;
