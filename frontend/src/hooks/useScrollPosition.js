import { useState, useEffect } from 'react';

/**
 * Custom hook to track the window's scroll position.
 *
 * @param {number} throttleMs - Optional throttling delay in milliseconds to limit updates.
 * @returns {{ scrollX: number, scrollY: number }} - Object containing current scroll positions.
 */
function useScrollPosition(throttleMs = 100) {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: typeof window !== 'undefined' ? window.scrollX : 0,
    scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
  });

  useEffect(() => {
    // Ensure running in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    let throttleTimeout = null;

    const handleScroll = () => {
      setScrollPosition({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    const throttledHandleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          handleScroll();
          throttleTimeout = null;
        }, throttleMs);
      }
    };

    // Add event listener
    window.addEventListener('scroll', throttledHandleScroll);

    // Call handler once initially to set position
    handleScroll();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [throttleMs]); // Re-run effect if throttleMs changes

  return scrollPosition;
}

export default useScrollPosition;