import { configureStore } from '@reduxjs/toolkit';

import profilesReducer from '../features/profilesSlice';

// LOCALSTORAGE LOGIC
const PROFILES_STATE_KEY = 'profilesState';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(PROFILES_STATE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load sate', err);
    return undefined;
  }
};

const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem(PROFILES_STATE_KEY, serializedState)
    } catch (err) {
        console.error("Could not save state", err)
    }
}

// END OF LOCALSTORAGE LOGIC
const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
  },
  preloadedState // --> if it's not undefined, it's used as initial state
});

store.subscribe(() => {
    saveState({profiles: store.getState().profiles})
})
