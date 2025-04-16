import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaSpinner } from 'react-icons/fa';
import './SplashScreen.css';

const loadingTips = [
  "Loading 3D models...",
  "Preparing interactive environment...",
  "Setting up lighting and textures...",
  "Initializing controls..."
];

const SplashScreen = ({ loadingProgress }) => {
  const [tip, setTip] = useState(loadingTips[0]);

  // Change tip every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTips.length);
      setTip(loadingTips[randomIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Fade out animation
  const styles = useSpring({
    opacity: loadingProgress === 100 ? 0 : 1,
    pointerEvents: loadingProgress === 100 ? 'none' : 'all',
    config: { tension: 120, friction: 14 },
  });

  // Progress bar animation with smoother transition
  const progressStyles = useSpring({
    width: `${Math.max(5, loadingProgress)}%`, // Minimum 5% to show something initially
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={styles} className="splash-screen">
      <div className="loading-container">
        {/* Animated Spinner Icon */}
        <FaSpinner className="loading-icon" />

        {/* Loading Text */}
        <div className="loading-text">
          <h1>Loading My Portfolio</h1>
          <p>{Math.round(loadingProgress)}%</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <animated.div style={progressStyles} className="progress-fill" />
        </div>
        
        {/* Loading Tip */}
        <div className="loading-tip">
          <p>{tip}</p>
        </div>
      </div>
    </animated.div>
  );
};

export default SplashScreen;