import { useSelector } from 'react-redux';

const DetailsPanel = () => {
  const selectedProfile = useSelector((state) =>
    state.profiles.profiles.find((p) => p.id === state.profiles.selectedProfileId));
  return (
    <div className='thx-window'>
      <div className='sub-title flex'>
        <h1 id='eqTitle' className='eq-title'>
          {selectedProfile.name}
        </h1>
      </div>
    </div>
  );
};

export default DetailsPanel;
