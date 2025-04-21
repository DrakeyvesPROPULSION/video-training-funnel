import React, { createContext, useState, useContext, useCallback } from 'react';

// Define the shape of the video data (adjust as needed)
const initialVideoData = [
  { id: 'vid1', title: 'Training Video 1', src: '/assets/videos/video1.mp4', duration: 300, watched: false, progress: 0 },
  { id: 'vid2', title: 'Training Video 2', src: '/assets/videos/video2.mp4', duration: 450, watched: false, progress: 0 },
  { id: 'vid3', title: 'Training Video 3', src: '/assets/videos/video3.mp4', duration: 600, watched: false, progress: 0 },
  { id: 'vid4', title: 'Training Video 4', src: '/assets/videos/video4.mp4', duration: 500, watched: false, progress: 0 },
];

// Create the context
const VideoContext = createContext();

// Create a provider component
export function VideoProvider({ children }) {
  const [videos, setVideos] = useState(initialVideoData);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Index of the currently active video
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume 50%
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(null);

  const currentVideo = videos[currentVideoIndex];

  // Function to select a video
  const selectVideo = useCallback((index) => {
    if (index >= 0 && index < videos.length) {
      setCurrentVideoIndex(index);
      setIsPlaying(false); // Stop playback when changing video
    } else {
      console.error("Invalid video index selected:", index);
      setError("Invalid video selected.");
    }
  }, [videos.length]);

  // Function to go to the next video
  const nextVideo = useCallback(() => {
    if (currentVideoIndex < videos.length - 1) {
      selectVideo(currentVideoIndex + 1);
    }
    // Optionally handle end of playlist
  }, [currentVideoIndex, videos.length, selectVideo]);

  // Function to update video progress
  const updateVideoProgress = useCallback((videoId, progressPercentage, currentTime) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? {
              ...video,
              progress: progressPercentage,
              watched: progressPercentage >= 95, // Mark as watched if near the end
              // Add currentTime if needed for resuming later
            }
          : video
      )
    );
    // Placeholder: Add API call here to save progress to backend if needed
    // apiService.trackVideoProgress(videoId, progressPercentage, currentTime);
  }, []);

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Set volume
  const handleSetVolume = useCallback((newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume))); // Clamp between 0 and 1
  }, []);

  // Set playback rate
  const handleSetPlaybackRate = useCallback((rate) => {
    setPlaybackRate(rate);
  }, []);


  // Value provided to consuming components
  const value = {
    videos,
    currentVideo,
    currentVideoIndex,
    isPlaying,
    volume,
    playbackRate,
    error,
    selectVideo,
    nextVideo,
    updateVideoProgress,
    togglePlay,
    setVolume: handleSetVolume,
    setPlaybackRate: handleSetPlaybackRate,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
}

// Custom hook to use the VideoContext
export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}