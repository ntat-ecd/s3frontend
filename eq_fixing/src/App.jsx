//import './assets/css/main.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SoundPage from './pages/SoundPage';
import MixerPage from './pages/MixerPage';
import EnhancementPage from './pages/EnhancementPage';
import EqPage from './pages/EqPage';
import MicPage from './pages/MicPage';
import LightingPage from './pages/LightingPage';
import PowerPage from './pages/PowerPage';
import MainContainer from './components/MainContainer';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <MainContainer>
        <Navbar />
        <div className='body-wrapper'>
          <Routes>
            <Route path='/sound' element={<SoundPage />} />
            <Route path='/mixer' element={<MixerPage />} />
            <Route path='/enhancement' element={<EnhancementPage />} />
            <Route path='/eq' element={<EqPage />} />
            <Route path='/mic' element={<MicPage />} />
            <Route path='/lighting' element={<LightingPage />} />
            <Route path='/power' element={<PowerPage />} />
          </Routes>
        </div>
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
