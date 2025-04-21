import React, { useRef, useEffect } from 'react';
import useVideoPlayer from '../../hooks/useVideoPlayer'; // Correct: default import
import './VideoPlayer.css';

function VideoPlayer() {
  const videoRef = useRef(null);
  const {
    // State from hook
    isPlaying,
    volume,
    playbackRate,
    currentTime,
    duration,
    isMetadataLoaded,
    error,
    // Control functions from hook
    togglePlay,
    setVolume,
    setPlaybackRate,
    seek,
    startSeeking,
    endSeeking,
    currentVideo // Get current video details from hook (which gets it from context)
  } = useVideoPlayer(videoRef);

  // Placeholder: Implement scroll-based triggering later
  // const { scrollY } = useScrollPosition();
  // useEffect(() => {
  //   // Logic to auto-play when scrolled into view
  // }, [scrollY, videoRef]);

  if (!currentVideo) {
    return <div>Loading video...</div>; // Or some placeholder
  }

  return (
    <div className="video-player-container">
      {error && <div className="video-error">Error: {error}</div>}
      <video
        ref={videoRef}
        className="video-element"
        // src={currentVideo.src} // Src is set within the hook now
        // controls // Use custom controls instead
        preload="metadata" // Important for getting duration early
        // poster="/path/to/poster.jpg" // Optional poster image
      >
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls Placeholder */}
      {isMetadataLoaded && (
        <div className="video-controls">
          <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            onMouseDown={startSeeking}
            onMouseUp={(e) => endSeeking(parseFloat(e.target.value))}
            aria-label="Video progress"
          />
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume"
          />
          {/* Add more controls: fullscreen, playback rate selector, etc. */}
        </div>
      )}
    </div>
  );
}

// Helper function to format time (MM:SS)
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default VideoPlayer;