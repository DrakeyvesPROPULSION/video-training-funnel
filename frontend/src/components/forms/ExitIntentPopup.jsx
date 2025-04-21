import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from '../video/VideoPlayer'; // Re-use the existing VideoPlayer
import EmailCaptureForm from './EmailCaptureForm'; // Create this next
import './ExitIntentPopup.css'; // Create this next

/**
 * ExitIntentPopup Component
 *
 * Displays a modal overlay when triggered by exit intent detection.
 * Features a promotional video and an email capture form.
 *
 * @param {boolean} isOpen - Controls the visibility of the popup.
 * @param {Function} onClose - Callback function to close the popup.
 * @param {string} videoSrc - Source URL for the promotional video.
 */
function ExitIntentPopup({ isOpen, onClose, videoSrc = "/assets/videos/promo_video.mp4" }) { // Default promo video
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContent, setShowContent] = useState(false); // For animation timing
  const popupRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Effect for handling modal open/close animations and focus management
  useEffect(() => {
    if (isOpen) {
      // Store the element that had focus before opening
      previouslyFocusedElement.current = document.activeElement;

      // Delay showing content slightly for entry animation
      const timer = setTimeout(() => {
        setShowContent(true);
        // Focus the first focusable element inside the popup (e.g., the close button)
        popupRef.current?.querySelector('button, input, [href], textarea')?.focus();
      }, 100); // Match animation duration if needed

      // Add class to body to prevent background scrolling
      document.body.classList.add('modal-open');

      return () => {
        clearTimeout(timer);
        document.body.classList.remove('modal-open');
        // Restore focus to the previously focused element
        previouslyFocusedElement.current?.focus();
      };
    } else {
      setShowContent(false); // Hide content immediately on close
      setIsSubmitted(false); // Reset submission state when closed
    }
  }, [isOpen]);

  // Effect for handling Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Effect for focus trapping within the modal
  useEffect(() => {
    if (!isOpen || !popupRef.current) return;

    const focusableElements = popupRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    const currentPopupRef = popupRef.current;
    currentPopupRef.addEventListener('keydown', handleTabKeyPress);
    return () => currentPopupRef?.removeEventListener('keydown', handleTabKeyPress);

  }, [isOpen, showContent]); // Re-run when content is shown

  // Handle click outside the popup content to close
  const handleOverlayClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Handle successful form submission
  const handleFormSubmitSuccess = (formData) => {
    console.log('Exit Intent Form submitted:', formData);
    // TODO: Send data to backend API (Phase 6)
    setIsSubmitted(true); // Show thank you message
    // Optionally close popup after a delay or keep it open
    // setTimeout(onClose, 3000); // Example: Close after 3 seconds
  };

  if (!isOpen) {
    return null; // Don't render anything if not open
  }

  return (
    <div
      className={`exit-intent-overlay ${showContent ? 'visible' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="exit-intent-popup"
        ref={popupRef}
        onClick={(e) => e.stopPropagation()} // Prevent overlay click from triggering inside popup
      >
        <button className="close-button" onClick={onClose} aria-label="Close popup">
          &times; {/* Close icon */}
        </button>

        {isSubmitted ? (
          // Thank You State
          <div className="thank-you-content">
            <h2 id="exit-intent-title">Thank You!</h2>
            <p>Your free resource is on its way to your inbox.</p>
            <button className="cta-button" onClick={onClose}>
              Continue Browsing
            </button>
          </div>
        ) : (
          // Initial State (Video + Form)
          <div className="initial-content">
            <h2 id="exit-intent-title">Wait! Before You Go...</h2>
            <p className="incentive-message">Get our exclusive free training video by signing up below:</p>
            <div className="popup-video-container">
              {/*
                Pass necessary props to VideoPlayer.
                Consider creating a specific context or state management for the popup video if needed.
                For now, assuming VideoPlayer can handle src directly and basic controls.
                Autoplay might be restricted by browsers, handle gracefully.
              */}
              <VideoPlayer /* src={videoSrc} autoPlay={true} initialVolume={0.5} */ />
              <p style={{fontSize: '0.8em', color: 'grey', marginTop: '5px'}}>
                (Note: VideoPlayer needs props like src, autoPlay, initialVolume passed correctly)
              </p>
            </div>
            <EmailCaptureForm onSubmit={handleFormSubmitSuccess} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExitIntentPopup;