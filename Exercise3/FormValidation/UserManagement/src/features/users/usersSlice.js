import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "../../data/mockData";
//initial data
const initialState = {
  users: mockUsers,

  status: "idle",
  error: null,
};
//thunks
// export const addUser = createAsyncThunk(
//   'users/addUser',
//   async (something)
// )
//slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      newUser.userId = Date.now();
      newUser.updatedAt = new Date().toLocaleDateString();
      state.users.push(newUser);
    },
    getUsers: (state) => {},
    updateUser: (state, action) => {
      const updatedUser = { ...action.payload };
      const index = state.users.findIndex((user) => user.userId === updatedUser.userId);
      if (index != -1) {
        updatedUser.updatedAt = new Date().toLocaleDateString();
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const deletedUserId = action.payload;
      state.users = state.users.filter((user) => user.userId !== deletedUserId);
    },
  },
});

export const { addUser, getUsers, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
