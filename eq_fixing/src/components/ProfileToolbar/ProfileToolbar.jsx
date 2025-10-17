import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProfile,
  deleteProfile,
  moveProfileDown,
  moveProfileUp,
  startEditing,
  stopEditing,
} from '../../features/profilesSlice';
import useClickOutside from '../../hooks/useClickOutside';

const ProfileToolbar = () => {
  const dispatch = useDispatch();
  //get data from store
  const { profiles, selectedProfileId, editingProfileId } = useSelector((state) => state.profiles);

  //derive data
  const selectedIndex = profiles.findIndex((p) => p.id === selectedProfileId);
  const selectedProfile = profiles[selectedIndex];

  //ui logic
  const isMoveUpDisabled = selectedIndex === 0;
  const isMoveDownDisabled = selectedIndex === profiles.length - 1;
  const showEditDeleteButtons = !selectedProfile.isDefault;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //event handlers
  //ADD logic
  const handleAdd = () => dispatch(addProfile());
  //MOVE logic
  const handleMoveUp = (id) => {
    dispatch(moveProfileUp(id));
  };
  const handleMoveDown = (id) => {
    dispatch(moveProfileDown(id));
  };
  //DELETE logic
  const handleDelete = (id) => {
    dispatch(deleteProfile(id));
    setIsDeleteModalVisible(false);
  };
  const closeModal = () => {
    setIsDeleteModalVisible(false);
  };
  const toggleDeleteModal = (e) => {
    e.stopPropagation();
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  //RENAME logic
  const handleEdit = (e, id) => {
    //prevent conflicts with useClickOutside DOM listener
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    if (editingProfileId === id) {
      dispatch(stopEditing());
    } else {
      dispatch(startEditing(id));
    }
  };

  //useClickOutside and delete modal logic
  const iconDeleteRef = useRef(null);
  const modalRef = useRef(null);
  useClickOutside([modalRef, iconDeleteRef], closeModal);
  const iconEditRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (isDeleteModalVisible && iconDeleteRef.current) {
      const buttonRect = iconDeleteRef.current.getBoundingClientRect();

      const top = buttonRect.top-250;
      const left = buttonRect.left-30;
      console.log(modalPosition)
      setModalPosition({ top, left });
    }
  }, [isDeleteModalVisible]);
  return (
    <>
      <div className='toolbar flex'>
        <div className='icon add' id='profileAdd' onClick={handleAdd}></div>
        {showEditDeleteButtons && (
          <>
            <div
              className='icon edit show'
              id='profileEdit'
              ref={iconEditRef}
              onMouseDown={(e) => handleEdit(e, selectedProfileId)}
            ></div>

            <div className='icon delete show' id='profileDelete' onClick={toggleDeleteModal} ref={iconDeleteRef}></div>
          </>
        )}

        <div
          className={`icon down ${isMoveDownDisabled ? 'disabled' : ''}`}
          id='profileDown'
          onClick={!isMoveDownDisabled ? () => handleMoveDown(selectedProfileId) : undefined}
        ></div>

        <div
          className={`icon up ${isMoveUpDisabled ? 'disabled' : ''}`}
          onClick={!isMoveUpDisabled ? () => handleMoveUp(selectedProfileId) : undefined}
        ></div>
      </div>
      {/* DELETE MODAL */}
      {isDeleteModalVisible && (
        <div ref={modalRef} className='profile-del alert flex show' style={modalPosition}>
          <div className='title'>Delete EQ Profile</div>
          <div className='body-text t-center'>{selectedProfile?.name}</div>
          <div className='thx-btn' onClick={() => handleDelete(selectedProfileId)}>
            Delete
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileToolbar;
