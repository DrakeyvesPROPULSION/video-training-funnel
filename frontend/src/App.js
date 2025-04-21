import React, { useEffect } from 'react'; // Removed useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './styles/main-styles.css'; // CSS already imported in index.js

// Import Page Components
import LandingPage from './pages/LandingPage';
import TrainingVideosPage from './pages/TrainingVideosPage';
import ThankYouPage from './pages/ThankYouPage';
// import NotFoundPage from './pages/NotFoundPage'; // Optional: Add later

// Import Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import Exit Intent System
import { initializeExitIntent, cleanupExitIntent } from './services/ExitIntentService';
import ExitIntentPopup from './components/forms/ExitIntentPopup';
import { useUI } from './context/UIContext'; // Import useUI hook

function App() {
  const { showExitPopup, openExitPopup, closeExitPopup } = useUI(); // Get state and functions from context

  // Initialize Exit Intent detection on mount
  useEffect(() => {
    // Initialize after a short delay to ensure page is stable
    // The service will now call openExitPopup directly when intent is detected
    const initTimer = setTimeout(() => {
      initializeExitIntent(openExitPopup); // Pass openExitPopup from context
    }, 500); // Small delay before initializing listeners

    // Cleanup on component unmount
    return () => {
      clearTimeout(initTimer);
      cleanupExitIntent();
    };
  }, [openExitPopup]); // Add openExitPopup to dependency array

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/training-videos" element={<TrainingVideosPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />

        {/* Render Exit Intent Popup */}
        <ExitIntentPopup
          isOpen={showExitPopup}
          onClose={closeExitPopup} // Use closeExitPopup from context
          // videoSrc="/path/to/your/promo_video.mp4" // Optional: override default src
        />
      </div>
    </Router>
  );
}

export default App;