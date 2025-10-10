import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameProfile, stopEditing } from '../../features/profilesSlice';
import useClickOutside from '../../hooks/useClickOutside';

const ProfileItem = ({ profile, isSelected, onSelect }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const editingProfileId = useSelector((state) => state.profiles.editingProfileId);
  const isEditing = editingProfileId === profile.id; //check itself if it's the selected
  const [editText, setEditText] = useState(profile.name);
  const profileTypeClass = profile.isDefault ? `${profile.name.toLowerCase()} no-edit` : 'custom';

  useEffect(() => {
    if (isEditing) setEditText(profile.name);
  }, [isEditing, profile.name]);

  const handleSave = () => {
    dispatch(renameProfile({ id: profile.id, newName: editText }));
  };
  const handleCancel = () => {
    dispatch(stopEditing());
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };
  useClickOutside(inputRef, handleSave);
  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type='text'
        id='profileRename'
        className='profile-item show'
        placeholder='Enter Profile Name'
        maxLength={25}
        // style={{top: '210px'}}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          handleSave();
          handleCancel();
        }}
        autoFocus
      />
    );
  }
  return (
    <div className={`profile-item ${profileTypeClass} ${isSelected ? 'active' : ''}`} onClick={onSelect}>
      {profile.name}
    </div>
  );
};

export default ProfileItem;
