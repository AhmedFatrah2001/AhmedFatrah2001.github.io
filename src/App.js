// src/App.js
import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import ComputerModel from './components/ComputerModel';
import SplashScreen from './components/SplashScreen';
import { FaSyncAlt, FaMousePointer } from 'react-icons/fa'; // Icons for reset button and mouse pointer
import './App.css'; // Make sure your background is still here

const initialCameraPosition = { x: -39, y: 36, z: 69 }; // Rounded initial camera position

// This component handles the camera controls, including resetting the camera
const CameraController = ({ resetTrigger }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (resetTrigger) {
      camera.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z);
      camera.lookAt(0, 0, 0); // Make sure camera looks at the origin
      gl.domElement.dispatchEvent(new Event('resize')); // Ensure the scene is updated after resetting
    }
  }, [resetTrigger, camera, gl]);

  return null;
};

const ResetCameraButton = ({ resetCamera }) => (
  <button 
    className="reset-camera-btn" 
    onClick={resetCamera}
    style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      padding: '10px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '20px'
    }}
  >
    <FaSyncAlt /> {/* Circular arrow icon for reset */}
  </button>
);

const HelpWidgets = () => (
  <div 
    className="help-widgets" 
    style={{
      position: 'absolute',
      bottom: '20px',
      left: '80px', // Adjust to be next to the reset button
      display: 'flex',
      gap: '20px',
      color: '#fff',
      backgroundColor: '#333',
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '600px',
      lineHeight: '1.5',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <FaMousePointer style={{ fontSize: '20px' }} />
      <span>Left-click: Rotate</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <FaMousePointer style={{ fontSize: '20px' }} />
      <span>Right-click: Pan</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <FaMousePointer style={{ fontSize: '20px' }} />
      <span>Scroll: Zoom</span>
    </div>
  </div>
);

const App = () => {
  const { progress } = useProgress(); // Get loading progress
  const [loading, setLoading] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(false); // State to trigger camera reset

  // Handle the loading splash screen
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setLoading(false), 500); // Add a small delay after 100% to make it smooth
    }
  }, [progress]);

  // Function to trigger camera reset
  const resetCamera = () => {
    setResetTrigger((prev) => !prev); // Toggle the reset trigger to force a camera reset
  };

  return (
    <>
      {/* Show splash screen while loading */}
      {loading && <SplashScreen loadingProgress={progress} />}

      {/* The 3D scene */}
      <Canvas className='canvas-container' shadows style={{ width: '100vw', height: '100vh' }} camera={{ position: [initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <ComputerModel />

        {/* Orbit controls with zoom limits and pan enabled */}
        <OrbitControls
          enableZoom={true}
          minDistance={5}  
          maxDistance={140} 
        />

        {/* Camera Controller to handle reset */}
        <CameraController resetTrigger={resetTrigger} />
      </Canvas>

      {/* Reset camera button */}
      <ResetCameraButton resetCamera={resetCamera} />

      {/* Help widgets for navigation */}
      <HelpWidgets />
    </>
  );
};

export default App;
