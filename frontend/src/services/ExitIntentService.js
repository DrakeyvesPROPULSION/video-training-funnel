/**
 * ExitIntentService.js
 *
 * Service to detect user exit intent based on device type.
 * Implements mouse tracking for desktop and inactivity/scroll for mobile.
 */

// --- Helper Functions ---

/**
 * Checks if the user agent indicates a mobile device or if screen width is small.
 * @returns {boolean} True if likely a mobile device.
 */
function isMobileDevice() {
  // Basic check, can be refined with more robust libraries if needed
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768; // Consider tablet width as potentially mobile-like interaction
}

/**
 * Throttles a function to limit how often it can be called.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The throttle limit in milliseconds.
 * @returns {Function} - The throttled function.
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// --- Session/Storage Helpers ---

const EXIT_INTENT_SHOWN_KEY = 'exitIntentShown';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Checks if the exit intent popup has been shown in the current session.
 * @returns {boolean} True if shown recently.
 */
function hasSeenExitIntentRecently() {
  const itemStr = localStorage.getItem(EXIT_INTENT_SHOWN_KEY);
  if (!itemStr) {
    return false;
  }
  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    // Check if the item exists and hasn't expired
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(EXIT_INTENT_SHOWN_KEY);
      return false;
    }
    return true;
  } catch (e) {
    // If parsing fails, remove the invalid item
    localStorage.removeItem(EXIT_INTENT_SHOWN_KEY);
    return false;
  }
}

/**
 * Marks the exit intent popup as shown for the current session.
 */
function markExitIntentShown() {
  const now = new Date();
  const item = {
    value: true,
    expiry: now.getTime() + SESSION_DURATION,
  };
  localStorage.setItem(EXIT_INTENT_SHOWN_KEY, JSON.stringify(item));
}

// --- Detection Logic ---

let desktopCleanup = null;
let mobileCleanup = null;
let initialDelayTimer = null;
const INITIAL_DELAY = 10 * 1000; // 10 seconds delay before enabling detection

/**
 * Sets up desktop exit intent detection (mouse leaving top of viewport).
 * @param {Function} callback - Function to call when exit intent is detected.
 * @param {number} throttleLimit - Throttle limit in ms for mouseleave event.
 */
function setupDesktopExitDetection(callback, throttleLimit = 200) {
  const handleMouseLeave = (e) => {
    // Check if already shown recently
    if (hasSeenExitIntentRecently()) return;

    // Check if the mouse is leaving through the top edge
    if (e.clientY <= 5) { // Small buffer zone
      console.log("Desktop Exit Intent Detected (Mouse Top)");
      markExitIntentShown(); // Mark as shown
      callback(); // Trigger the callback (e.g., show popup)
      if (desktopCleanup) desktopCleanup(); // Clean up listener after triggering once per session
    }
  };

  const throttledHandler = throttle(handleMouseLeave, throttleLimit);
  document.addEventListener('mouseleave', throttledHandler);

  // Return cleanup function
  return () => {
    console.log("Cleaning up desktop exit intent listener.");
    document.removeEventListener('mouseleave', throttledHandler);
  };
}

/**
 * Sets up mobile exit intent detection (inactivity timer).
 * @param {Function} callback - Function to call when exit intent is detected.
 * @param {number} inactivityTime - Inactivity duration in ms.
 */
function setupMobileExitDetection(callback, inactivityTime = 30 * 1000) { // 30 seconds
  let timer = null;

  const triggerCallback = () => {
    if (hasSeenExitIntentRecently()) return;

    console.log("Mobile Exit Intent Detected (Inactivity)");
    markExitIntentShown();
    callback();
    if (mobileCleanup) mobileCleanup(); // Clean up after triggering
  };

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(triggerCallback, inactivityTime);
  };

  // Events that indicate user activity
  const activityEvents = ['touchstart', 'touchmove', 'scroll', 'click', 'keypress'];
  activityEvents.forEach(event => document.addEventListener(event, resetTimer, { passive: true }));

  resetTimer(); // Start the initial timer

  // Return cleanup function
  return () => {
    console.log("Cleaning up mobile exit intent listener.");
    clearTimeout(timer);
    activityEvents.forEach(event => document.removeEventListener(event, resetTimer));
  };
}

// --- Public Service Interface ---

/**
 * Initializes the exit intent detection based on device type after an initial delay.
 * @param {Function} onExitIntentDetected - Callback function to execute when intent is detected.
 */
export function initializeExitIntent(onExitIntentDetected) {
  // Clear any previous listeners or timers
  if (desktopCleanup) desktopCleanup();
  if (mobileCleanup) mobileCleanup();
  if (initialDelayTimer) clearTimeout(initialDelayTimer);

  // Don't run if already shown recently
  if (hasSeenExitIntentRecently()) {
    console.log("Exit intent already shown this session.");
    return;
  }

  console.log(`Initializing exit intent detection after ${INITIAL_DELAY / 1000} seconds...`);

  initialDelayTimer = setTimeout(() => {
    console.log("Exit intent detection enabled.");
    if (isMobileDevice()) {
      mobileCleanup = setupMobileExitDetection(onExitIntentDetected);
    } else {
      desktopCleanup = setupDesktopExitDetection(onExitIntentDetected);
    }
  }, INITIAL_DELAY);
}

/**
 * Cleans up all exit intent listeners and timers.
 */
export function cleanupExitIntent() {
  console.log("Cleaning up all exit intent listeners and timers.");
  if (desktopCleanup) desktopCleanup();
  if (mobileCleanup) mobileCleanup();
  if (initialDelayTimer) clearTimeout(initialDelayTimer);
  desktopCleanup = null;
  mobileCleanup = null;
  initialDelayTimer = null;
}

// Example Usage (typically in a top-level component like App.js):
//
// import React, { useEffect, useState } from 'react';
// import { initializeExitIntent, cleanupExitIntent } from './services/ExitIntentService';
// import ExitIntentPopup from './components/forms/ExitIntentPopup';
//
// function App() {
//   const [showPopup, setShowPopup] = useState(false);
//
//   useEffect(() => {
//     const handleExitIntent = () => {
//       setShowPopup(true);
//     };
//
//     initializeExitIntent(handleExitIntent);
//
//     // Cleanup on component unmount
//     return () => {
//       cleanupExitIntent();
//     };
//   }, []); // Run only once on mount
//
//   return (
//     <div>
//       {/* Rest of your app */}
//       <ExitIntentPopup isOpen={showPopup} onClose={() => setShowPopup(false)} videoSrc="/path/to/promo.mp4" />
//     </div>
//   );
// }