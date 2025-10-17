import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.message || "Failed to fetch users.");
      return data.users;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !user.status }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue("Failed to update user status.");
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) return rejectWithValue("Failed to delete user.");
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  usersError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.usersError = action.payload;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index != -1) state.users[index] = updatedUser;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        console.error("Failed to toggle user status: ", action.payload);
        state.usersError = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.payload;
        state.users = state.users.filter((user) => user.id !== deletedUserId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.error("Failed to delete user: ", action.payload);
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
