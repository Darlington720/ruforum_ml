import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const splashScreen = document.getElementById('fuse-splash-screen');
if (splashScreen) {
  // Wait a bit to ensure the app is rendered
  setTimeout(() => {
    // First set opacity to 0
    splashScreen.style.opacity = '0';
    
    // Then remove it from the DOM after the transition completes
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 400); // Match this with the transition duration in your CSS (400ms)
  }, 500); // Adjust this delay as needed
}
