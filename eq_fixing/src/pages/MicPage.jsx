import { useEffect } from 'react';

import BodyWidgets from '../components/Widgets/BodyWidgets';
import ProfileBar from '../components/ProfileBar/ProfileBar';

const MicPage = () => {
  // useEffect(() => {
  //   document.title = 'Razer Nari Ultimate | Mic';
  // }, []);
  return (
    <>
      <ProfileBar />
      <BodyWidgets />
    </>
  );
};

export default MicPage;
