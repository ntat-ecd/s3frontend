//store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice"
//import productReducer

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (error) {
    console.warn("Could not load state from localStorage", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const stateToSave = {
      auth: state.auth,
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.warn("Could not save state to localStorage", error);
  }
};
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    //products:productReducer,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState(store.getState())
})
