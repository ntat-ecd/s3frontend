import React, { useEffect, useRef, useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';

import './ProfileBar.css';
import useProfiles from '../../hooks/useProfiles';
import useClickOutside from '../../hooks/useClickOutside';

const ProfileBar = () => {
  const { profiles, selected, selectedId, setSelectedId, addProfile, renameProfile, duplicateProfile, deleteProfile } =
    useProfiles();

  const [mode, setMode] = useState(null); //dropdown, menu, rename, delete, null
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);
  const menuToggleRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (mode === 'rename' && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [mode]);

  const handleRename = () => {
    renameProfile(inputValue);
    setMode(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRename();
  };

  useClickOutside(dropdownRef, () => {
    if (mode === 'dropdown') {
      setMode(null);
    }
  });
  return (
    <div className='profile-bar flex'>
      <div className='loader'></div>
      <div>profile</div>
      {mode === 'rename' && (
        <input
          ref={inputRef}
          type='text'
          name='profile'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          id='profileEdit'
          maxLength='25'
          className={`profileEdit show`}
        />
      )}

      <Dropdown ref={dropdownRef}>
        <Dropdown.ProfileDrop
          isExpand={mode === 'dropdown'}
          selected={selected.name}
          disabled={profiles.length <= 1}
          onClick={() => {
            setMode(mode === 'dropdown' ? null : 'dropdown');
          }}
        />
        <Dropdown.ProfileDropOpt isExpand={mode === 'dropdown'}>
          {profiles.map((profile) => (
            <Dropdown.Option
              key={profile.id}
              selected={profile.id === selectedId}
              onClick={() => {
                setSelectedId(profile.id);
                setMode(null);
              }}
            >
              {profile.name}
            </Dropdown.Option>
          ))}
        </Dropdown.ProfileDropOpt>
      </Dropdown>

      <ProfileMenuToggle ref={menuToggleRef} onClick={() => setMode(mode === 'menu' ? null : 'menu')}>
        {mode === 'menu' && (
          <ProfileMenu
            onAdd={() => {
              addProfile();
              setMode(null);
            }}
            onRename={() => {
              setMode('rename');
              setInputValue(selected.name);
            }}
            onDuplicate={duplicateProfile}
            onDelete={() => setMode('delete')}
            onClose={() => setMode(null)}
            menuToggleRef={menuToggleRef}
            profilesLength={profiles.length}
          />
        )}
      </ProfileMenuToggle>

      {mode === 'delete' && (
        <DeleteAlert
          onConfirm={() => {
            deleteProfile();
            setMode(null);
          }}
          onClose={() => setMode(null)}
        />
      )}

      <OnboardProfiles />
      <Divider />
      <Battery percent={30} />
    </div>
  );
};

const ProfileMenuToggle = React.forwardRef(({ isActive, children, onClick }, ref) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <div
      className={`dots3 hover-border ${isActive ? 'active' : ''}`}
      id='profileMenuToggle'
      onClick={handleClick}
      ref={ref}
    >
      {children}
    </div>
  );
});

const ProfileMenu = ({ onAdd, onRename, onDuplicate, onDelete, onClose, profilesLength, menuToggleRef }) => {
  const menuRef = useRef(null);
  const handleClose = (e) => {
    if (menuToggleRef.current && menuToggleRef.current.contains(e.target)) return;
    //menuToggleRef is not defined at handleClose
    onClose();
  };

  useClickOutside(menuRef, handleClose);
  return (
    <div className={`profile-act show`} ref={menuRef} id='profileMenu' onClick={(e) => e.stopPropagation()}>
      <div className='act action' onClick={onAdd}>
        add
      </div>
      <div className='act action'>import</div>
      <div className='act divider'></div>
      <div className='act action' onClick={onRename}>
        rename
      </div>
      <div className='act action' onClick={onDuplicate}>
        duplicate
      </div>
      <div className='act action'>export</div>
      <div className='act divider'></div>
      <div className={`act action ${profilesLength <= 1 ? 'disabled' : ''}`} id='deleteAction' onClick={onDelete}>
        delete
      </div>
    </div>
  );
};

const DeleteAlert = ({ onConfirm, onClose }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  return (
    <div className='flex alert profile-del show' ref={ref} id='deleteAlert'>
      <div className='title'>delete profile</div>
      <div className='t-center body-text'>
        You're about to delete this profile. All bindings in this profile will be deleted.
      </div>
      <div className='thx-btn' onClick={onConfirm} id='deleteConfirm'>
        delete
      </div>
    </div>
  );
};

const OnboardProfiles = () => {
  return <div className='obm hover-border' tooltip='On-board Profiles'></div>;
};

const Battery = ({ percent }) => {
  return <div className={`batt batt-${percent}`} tooltip={`${percent}% Battery`}></div>;
};

const Divider = () => {
  return <div className='divider'></div>;
};

ProfileBar.ProfileMenuToggle = ProfileMenuToggle;
ProfileBar.ProfileMenu = ProfileMenu;
ProfileBar.DeleteAlert = DeleteAlert;
ProfileBar.OnboardProfiles = OnboardProfiles;
ProfileBar.Battery = Battery;
ProfileBar.Divider = Divider;

export default ProfileBar;
