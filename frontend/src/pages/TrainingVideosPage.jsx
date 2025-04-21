import React from 'react';
import { useVideo } from '../context/VideoContext';
import { useUI } from '../context/UIContext'; // Import the UI context hook
import VideoPlayer from '../components/video/VideoPlayer';
import './TrainingVideosPage.css';

function TrainingVideosPage() {
  const {
    currentVideo,
    currentVideoIndex,
    videos,
    nextVideo, // Ensure nextVideo is destructured
  } = useVideo();
  const { openExitPopup } = useUI(); // Get function to open popup

  const isLastVideo = currentVideoIndex === videos.length - 1;

  // Placeholder CTA handlers
  const handlePrimaryCTA = () => {
    console.log(`Primary CTA clicked for video: ${currentVideo?.title}, advancing to next video.`);
    if (nextVideo) { // Check if nextVideo exists before calling
      nextVideo(); // Call nextVideo function from context
    } else {
      console.error("nextVideo function is not available from context.");
    }
  };

  const handleSecondaryCTA = () => {
    console.log(`Secondary CTA clicked after last video`);
    // Add logic for "Join Community"
  };

  const handleBookCallCTA = () => {
    console.log(`Book a Call CTA clicked after last video`);
    // Add logic for booking a call
  };

  // Handler for the new "Leave" button
  const handleLeaveClick = () => {
    console.log("Leave button clicked, opening exit popup.");
    openExitPopup(); // Trigger the popup using context function
  };

  if (!currentVideo) {
    return <div>Loading training videos...</div>;
  }

  return (
    <div className="training-videos-page container">
      <h1>{currentVideo.title}</h1>
      <p>Video {currentVideoIndex + 1} of {videos.length}</p>

      {/* Video Player */}
      <VideoPlayer />

      {/* Removed Video Navigation div */}

      {/* Call-to-Action Buttons */}
      <div className="cta-section-videos">
        {/* Leave Button */}
        <button className="cta-button leave-button" onClick={handleLeaveClick}>
          Leave
        </button>

        {/* Conditional CTAs */}
        {!isLastVideo ? (
          // CTA for videos 1-3
          <button className="cta-button video-cta" onClick={handlePrimaryCTA}>
            {/* Dynamic CTA Text: Default to "Next Video" or use video-specific text */}
            Next Video: {videos[currentVideoIndex + 1]?.title || 'Finish'}
          </button>
        ) : (
          // Dual CTAs for the last video
          <div className="dual-cta">
            <button className="cta-button primary-cta" onClick={handleBookCallCTA}>
              Book a Call
            </button>
            <button className="cta-button secondary-cta" onClick={handleSecondaryCTA}>
              Join Community
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainingVideosPage;