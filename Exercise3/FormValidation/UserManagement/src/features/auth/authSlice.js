//authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUser } from "../users/usersSlice";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { getState, rejectWithValue }) => {
    const state = getState();
    const allUsers = state.users.users;
    const { userName, userPassword } = credentials;
    // console.log("Credentials: ", credentials, "\nAll users: ", allUsers);
    const foundUser = allUsers.find(
      (user) => user.userName === userName && user.userPassword === userPassword
    );

    if (foundUser) return foundUser;
    else return rejectWithValue("Thông tin đăng nhập\n không hợp lệ.");
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const allUsers = state.users.users;
    const existingUser = allUsers.find(
      (user) =>
        user.email === userData.userEmail || user.name === userData.userName
    );

    if (existingUser) {
      return rejectWithValue("Email or username has already existed.");
    }

    const newUser = {
      name: userData.userName,
      password: userData.userPassword,
      email: userData.userEmail,
      status: true,
    };

    dispatch(addUser(newUser));

    return newUser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    authError: null,
    registrationSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authError = null;
    },
    firstMountCleanup: (state) => {
      state.authError = null;
    },
    resetRegistrationStatus: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.authError = action.payload;
        console.log(state.authError);
      })
      //REGISTER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.registrationSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.authError = action.payload;
      });
  },
});

export const { logout, firstMountCleanup, resetRegistrationStatus } =
  authSlice.actions;
export default authSlice.reducer;
