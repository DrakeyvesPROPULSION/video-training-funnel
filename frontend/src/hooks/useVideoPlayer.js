import { useState, useEffect, useRef, useCallback } from 'react';
import { useVideo } from '../context/VideoContext'; // Import context hook

/**
 * Custom hook to manage video player state and interactions.
 * Integrates with VideoContext for shared state.
 *
 * @param {React.RefObject<HTMLVideoElement>} videoRef - Ref to the video element.
 */
function useVideoPlayer(videoRef) {
  const {
    currentVideo,
    isPlaying,
    volume,
    playbackRate,
    updateVideoProgress,
    togglePlay,
    setVolume,
    setPlaybackRate,
    nextVideo, // Get nextVideo function from context
  } = useVideo();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Effect to handle video source changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && currentVideo) {
      // Reset state for new video
      setIsMetadataLoaded(false);
      setCurrentTime(0);
      setDuration(0);
      setError(null);
      // Load the new source
      videoElement.src = currentVideo.src;
      // Optionally load metadata or start playback based on requirements
    }
  }, [currentVideo, videoRef]);

  // Effect to sync player state with context state
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Sync play/pause
    if (isPlaying && videoElement.paused) {
      videoElement.play().catch(err => {
        console.error("Error playing video:", err);
        setError("Playback failed.");
        // togglePlay(); // Optionally revert context state
      });
    } else if (!isPlaying && !videoElement.paused) {
      videoElement.pause();
    }

    // Sync volume
    if (videoElement.volume !== volume) {
      videoElement.volume = volume;
    }

    // Sync playback rate
    if (videoElement.playbackRate !== playbackRate) {
      videoElement.playbackRate = playbackRate;
    }

  }, [isPlaying, volume, playbackRate, videoRef, currentVideo]); // Add currentVideo dependency

  // Event Handlers for video element
  const handleLoadedMetadata = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      setDuration(videoElement.duration);
      setIsMetadataLoaded(true);
      // Restore progress if needed
      // videoElement.currentTime = currentVideo.progress * videoElement.duration / 100;
    }
  }, [videoRef]);

  const handleTimeUpdate = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement && !isSeeking) {
      const newTime = videoElement.currentTime;
      setCurrentTime(newTime);
      if (duration > 0) {
        const progressPercentage = (newTime / duration) * 100;
        updateVideoProgress(currentVideo.id, progressPercentage, newTime);
      }
    }
  }, [videoRef, isSeeking, duration, updateVideoProgress, currentVideo?.id]);

  const handleVideoEnd = useCallback(() => {
    // Mark as complete
    updateVideoProgress(currentVideo.id, 100, duration);
    // Optionally move to next video automatically
    nextVideo();
  }, [updateVideoProgress, currentVideo?.id, duration, nextVideo]);

  const handlePlay = useCallback(() => {
    if (!isPlaying) togglePlay(); // Sync context if played externally
  }, [isPlaying, togglePlay]);

  const handlePause = useCallback(() => {
    if (isPlaying) togglePlay(); // Sync context if paused externally
  }, [isPlaying, togglePlay]);

  const handleError = useCallback((e) => {
    console.error("Video Error:", e);
    setError("An error occurred during video playback.");
  }, []);

  // Functions to control the player
  const seek = useCallback((time) => {
    const videoElement = videoRef.current;
    if (videoElement && isMetadataLoaded) {
      const newTime = Math.max(0, Math.min(duration, time));
      videoElement.currentTime = newTime;
      setCurrentTime(newTime); // Update immediately for responsiveness
    }
  }, [videoRef, duration, isMetadataLoaded]);

  const startSeeking = useCallback(() => setIsSeeking(true), []);
  const endSeeking = useCallback((time) => {
    setIsSeeking(false);
    seek(time); // Seek to the final position after dragging
  }, [seek]);

  // Attach event listeners
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleVideoEnd);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('error', handleError);

    // Cleanup
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleVideoEnd);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoRef, handleLoadedMetadata, handleTimeUpdate, handleVideoEnd, handlePlay, handlePause, handleError]);

  return {
    // State from context
    isPlaying,
    volume,
    playbackRate,
    currentVideo,
    // Local player state
    currentTime,
    duration,
    isSeeking,
    isMetadataLoaded,
    error,
    // Control functions derived from context
    togglePlay,
    setVolume,
    setPlaybackRate,
    // Local control functions
    seek,
    startSeeking,
    endSeeking,
  };
}

export default useVideoPlayer;