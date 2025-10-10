import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../features/profilesSlice';
import ProfileItem from '../ProfileItem/ProfileItem';

const ProfileList = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const selectedProfileId = useSelector((state) => state.profiles.selectedProfileId);

  const dispatch = useDispatch();

  const handleProfileClick = (id) => {
    dispatch(selectProfile(id));
  };

  return (
    <div id='profileList' className='scrollable'>
      {profiles.map((profile) => (
        <ProfileItem
          key={profile.id}
          profile={profile}
          isSelected={profile.id === selectedProfileId}
          onSelect={() => handleProfileClick(profile.id)}
        />
      ))}
    </div>
  );
};

export default ProfileList;
