
const ProfilePanel = ({ children }) => {
  return (
    <div className='thx-drawer flex'>
      <div className='main-title'>Profile List</div>
      <div className='drawer-select flex' id='profileWrapper'>
        {children}
      </div>
    </div>
  );
};

export default ProfilePanel;
