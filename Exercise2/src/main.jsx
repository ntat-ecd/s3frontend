import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Fonts
import './assets/fonts/roboto.css';
import './assets/fonts/razerf5.css';

// Global CSS
import './styles/globals.css'

// import './assets/css/dropdown.css';
// import './assets/css/switch.css';
// import './assets/css/slider.css';
// import './assets/css/checkbox.css';
// import './assets/css/tooltip.css';


// ProfilePanel.jsx
// import './assets/css/profile-bar.css';


import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
