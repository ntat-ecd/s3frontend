import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [
    { id: 'profile1', name: 'Default', isDefault: true },
    { id: 'profile2', name: 'Game', isDefault: true },
    { id: 'profile3', name: 'Movie', isDefault: true },
    { id: 'profile4', name: 'Music', isDefault: true },
  ],
  selectedProfileId: 'profile1',
  editingProfileId: null,
  globalId: 5,
};

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    selectProfile: (state, action) => {
      state.selectedProfileId = action.payload;
    },
    addProfile: (state) => {
      const newProfile = {
        id: `profile${state.globalId++}`,
        name: 'New Profile',
        isDefault: false,
      };

      state.profiles.push(newProfile);
      state.selectedProfileId = newProfile.id;
    },
    deleteProfile: (state, action) => {
      const idToDelete = action.payload;
      const indexToDelete = state.profiles.findIndex((p) => p.id === idToDelete);
      const newIndex = indexToDelete === 0 ? 0 : indexToDelete - 1;
      const profilesAfterDelete = state.profiles.filter((p) => p.id !== idToDelete);
      state.profiles = profilesAfterDelete;
      state.selectedProfileId = state.profiles[newIndex].id;
    },
    moveProfileUp: (state, action) => {
      const idToMove = action.payload;
      const index = state.profiles.findIndex((p) => p.id === idToMove);

      if (index > 0) {
        const temp = state.profiles[index];
        state.profiles[index] = state.profiles[index - 1];
        state.profiles[index - 1] = temp;
      }
    },
    moveProfileDown: (state, action) => {
      const idToMove = action.payload;
      const index = state.profiles.findIndex((p) => p.id === idToMove);
      if (index < state.profiles.length - 1) {
        const temp = state.profiles[index];
        state.profiles[index] = state.profiles[index + 1];
        state.profiles[index + 1] = temp;
      }
    },
    startEditing: (state, action) => {
      state.editingProfileId = action.payload;
    },
    stopEditing: (state) => {
      state.editingProfileId = null;
    },
    renameProfile: (state, action) => {
      const { id, newName } = action.payload;
      const profileToRename = state.profiles.find((p) => p.id === id);
      //Trim and check if empty
      const trimmedName = newName.trim();
      if (profileToRename && trimmedName) {
        profileToRename.name = trimmedName;
      } else return;
    //  state.editingProfileId = null;
    },
  },
});

export const {
  selectProfile,
  addProfile,
  deleteProfile,
  moveProfileDown,
  moveProfileUp,
  startEditing,
  stopEditing,
  renameProfile,
} = profilesSlice.actions;

export default profilesSlice.reducer;
