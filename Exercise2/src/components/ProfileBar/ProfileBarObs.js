import '../assets/css/profile-bar.css'

const ProfileBar = () => {
  return (
    <div className="profile-bar flex">
      <div className="loader" tooltip="Syncing Profiles"></div>
      <div>profile</div>

      <input type="text" name="profile" id="profileEdit" maxLength="25" className="" />

      <div className="dropdown-area">
        
        <div id="profileDrop" className="s3-dropdown">
          <div className="selected">Profile 2</div>
          <div className="icon expand"></div>
        </div>

        <div id="profileDropOpt" className="s3-options flex" style={{bottom: 'unset', top: '27px' }}>
          <div className="option ">default profile</div>
          <div className="option selected">profile 2</div>
          <div className="option">profile 3</div>
          <div className="option">profile 4</div>
          <div className="option ">profile 5</div>
          <div className="option ">profile 6</div>
          <div className="option ">profile 7</div>
          <div className="option ">profile 8</div>
        </div>
      </div>

      <div className="dots3 hover-border" id="profileMenuToggle">
        <div className="profile-act" id="profileMenu">
          <div className="act action">add</div>
          <div className="act action">import</div>
          <div className="act divider"></div>
          <div className="act action">rename</div>
          <div className="act action">duplicate</div>
          <div className="act action">export</div>
          <div className="act divider"></div>
          <div className="act action" id="deleteAction">delete</div>
        </div>
      </div>

      <div id="deleteAlert" className="flex alert profile-del">
        <div className="title">delete profile</div>
        <div className="body-text t-center">
          You're about to delete this profile. All bindings in this profile will be deleted.
        </div>
        <div className="thx-btn" id="deleteConfirm">delete</div>
      </div>
      <div className="obm hover-border" tooltip="On-board Profiles"></div>
      <div className="divider"></div>
      <div className="batt batt-30" tooltip="30% Battery"></div>
    </div>
  );
};

export default ProfileBar;
