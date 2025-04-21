import React, { useEffect, useRef, useState } from 'react'; // Import hooks
import './LandingPage.css';
import VideoPlayer from '../components/video/VideoPlayer';
// import useScrollPosition from '../hooks/useScrollPosition'; // Using IntersectionObserver instead

function LandingPage() {
  const videoSectionRef = useRef(null); // Ref for the video section
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Placeholder function for smooth scroll
  const handleScrollToVideo = (event) => {
    event.preventDefault();
    const videoSection = document.getElementById('video-intro-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to observe video section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection changes
        setIsVideoVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          console.log("Video section is now visible. Trigger playback here.");
          // TODO: Trigger video auto-play (e.g., call a function from useVideoPlayer or context)
          // Ensure this only triggers once if needed
        } else {
          console.log("Video section is no longer visible.");
          // TODO: Optionally pause video if needed
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
      }
    );

    const currentRef = videoSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section id="hero-section" className="hero-section">
        <div className="container">
          <h1>Compelling Headline About Video Training</h1>
          <p className="subheadline">Engaging subheadline explaining the value proposition and benefits.</p>
          <button className="cta-button hero-cta" onClick={handleScrollToVideo}>
            Watch Introduction Video
          </button>
        </div>
      </section>

      {/* Video Introduction Section */}
      {/* Attach the ref here */}
      <section id="video-intro-section" ref={videoSectionRef} className="video-intro-section">
        <div className="container">
          <h2>Video Introduction {isVideoVisible ? '(Visible)' : '(Hidden)'}</h2> {/* Example indicator */}
          {/* Render the VideoPlayer component */}
          <VideoPlayer />
        </div>
      </section>

      {/* Call-to-Action Section (Placeholder) */}
      <section id="cta-section" className="cta-section">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Clear value proposition messaging.</p>
          {/* CTA button linking to training videos page */}
          <a href="/training-videos" className="cta-button main-cta">
            Access Training Videos Now
          </a>
          {/* Social proof elements */}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;