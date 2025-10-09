import '../assets/css/profile.css';
import ProfileList from '../components/ProfileList/ProfileList';
import ProfilePanel from '../components/ProfilePanel/ProfilePanel';
import ProfileToolbar from '../components/ProfileToolbar/ProfileToolbar';
import DetailsPanel from '../components/DetailsPanel/DetailsPanel';

const EqPage = () => {
  return (
    <div className='thx-wrapper flex'>
      <ProfilePanel>
        <ProfileList/>
        <ProfileToolbar />
      </ProfilePanel>
      <DetailsPanel/>
    </div>
  );
};

export default EqPage;
