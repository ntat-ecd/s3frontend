import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//initial data
const initialState = {
  users: [
    {
      id: 0,
      name: "test1234",
      password: "test1234",
      email: "test@test.com",
      phoneNumber: "000999777",
      updatedAt: "01/01/2025",
      status: true,
    },
    {
      id: 1,
      name: "Ngô Yến Nhi",
      password: "12345678",
      email: "nhimini@gmail.com",
      phoneNumber: "0368456741",
      updatedAt: "08/07/2025",
      status: true,
    },
    {
      id: 2,
      name: "Đinh Lam Trọng",
      password: "12345678",
      email: "zkusi@gmail.com",
      phoneNumber: "0989554127",
      updatedAt: "11/02/2025",
      status: false,
    },
    {
      id: 3,
      name: "Hoàng Ngọc Bích Thy",
      password: "12345678",
      email: "thy.ngoc039@gmail.com",
      phoneNumber: "0902859857",
      updatedAt: "03/07/2025",
      status: false,
    },
    {
      id: 4,
      name: "Mai Văn Vũ",
      password: "12345678",
      email: "vvm_sg@gmail.com",
      phoneNumber: "036441122",
      updatedAt: "09/10/2025",
      status: true,
    },
  ],

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
      newUser.id = Date.now()
      newUser.updatedAt = new Date().toLocaleDateString();
      state.users.push(newUser);
    },
    getUsers: (state) => {},
    updateUser: (state, action) => {
      const updatedUser = {...action.payload};
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index != -1) {
        updatedUser.updatedAt = new Date().toLocaleDateString();
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const deletedUserId = action.payload;
      state.users = state.users.filter((user) => user.id !== deletedUserId);
    },
  },
});

export const { addUser, getUsers, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
