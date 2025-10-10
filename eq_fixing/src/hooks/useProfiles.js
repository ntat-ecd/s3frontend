import { useRef, useState } from 'react';

const useProfiles = () => {
  const initialProfiles = [
    { id: 1, name: 'Default Profile' },
    { id: 2, name: 'Profile 1' },
    { id: 3, name: 'Profile 2' },
    { id: 4, name: 'Profile 3' },
    { id: 5, name: 'Profile 4' },
    { id: 6, name: 'Profile 5' },
    { id: 7, name: 'Profile 6' },
    { id: 8, name: 'Profile 7' },
    { id: 9, name: 'Profile 8' },
  ];
  const [profiles, setProfiles] = useState(initialProfiles);

  const [selectedId, setSelectedId] = useState(initialProfiles[0].id);

  const selected = profiles.find((p) => p.id === selectedId);

  const nextIdRef = useRef(initialProfiles.length + 1);

  const addProfile = () => {
    let base = 'New Profile';
    let counter = 1;
    let newName = base;

    while (profiles.some((p) => p.name === newName)) {
      newName = `${base} (${counter++})`;
    }
    const newProfile = { id: nextIdRef.current++, name: newName };

    setProfiles((prev) => [...prev, newProfile]);
    setSelectedId(newProfile.id);
  };

  const renameProfile = (newName) => {
    let trimmedName = newName.trim();
    if (!trimmedName) return;
    setProfiles((prev) => prev.map((p) => (p.id === selectedId ? { ...p, name: trimmedName } : p)));
  };

  const duplicateProfile = () => {
    const current = profiles.find((p) => p.id === selectedId);
    if (!current) return;

    const base = current.name.replace(/\s\(\d+\)$/, '');
    let counter = 1;
    let newName = base;

    while (profiles.some((p) => p.name === newName)) {
      newName = `${base} (${counter++})`;
    }

    const newProfile = { id: nextIdRef.current++, name: newName };

    setProfiles((prev) => [...prev, newProfile]);

    setSelectedId(newProfile.id);
  };

  const deleteProfile = () => {
    const newList = profiles.filter((p) => p.id !== selectedId);
    const newSelectedId = newList.length > 0 ? newList.at(-1).id : null;
    setProfiles(newList);
    setSelectedId(newSelectedId);
  };

  return {
    profiles,
    selected,
    selectedId,
    setSelectedId,
    addProfile,
    renameProfile,
    duplicateProfile,
    deleteProfile,
  };
};

export default useProfiles;
