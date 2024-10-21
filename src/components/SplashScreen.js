// src/components/SplashScreen.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaSpinner } from 'react-icons/fa';
import './SplashScreen.css'; // Make sure to create this CSS file for custom styling

const SplashScreen = ({ loadingProgress }) => {
  // Fade out animation using react-spring
  const styles = useSpring({
    opacity: loadingProgress === 100 ? 0 : 1,
    pointerEvents: loadingProgress === 100 ? 'none' : 'all',
    config: { tension: 120, friction: 14 },
  });

  // Loading progress bar animation
  const progressStyles = useSpring({
    width: `${loadingProgress}%`,
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={styles} className="splash-screen">
      <div className="loading-container">
        {/* Animated Spinner Icon */}
        <FaSpinner className="loading-icon" />

        {/* Loading Text */}
        <div className="loading-text">
          <h1>Loading...</h1>
          <p>{Math.round(loadingProgress)}%</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <animated.div style={progressStyles} className="progress-fill" />
        </div>
      </div>
    </animated.div>
  );
};

export default SplashScreen;
