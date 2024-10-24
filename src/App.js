import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import ComputerModel from "./components/ComputerModel";
import PenguinModel from "./components/PenguinModel";
import Nes from "./components/Nes";
import PaperModel from "./components/PaperModel";
import TableModel from "./components/TableModel";
import SplashScreen from "./components/SplashScreen";
import { FaSyncAlt, FaMousePointer } from "react-icons/fa";
import "./App.css";

const initialCameraPosition = { x: -39, y: 36, z: 69 };

// CameraController as before
const CameraController = ({ resetTrigger }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (resetTrigger) {
      camera.position.set(
        initialCameraPosition.x,
        initialCameraPosition.y,
        initialCameraPosition.z
      );
      camera.lookAt(0, 0, 0);
      gl.domElement.dispatchEvent(new Event("resize"));
    }
  }, [resetTrigger, camera, gl]);

  return null;
};

// ResetCameraButton as before
const ResetCameraButton = ({ resetCamera }) => (
  <button
    className="reset-camera-btn"
    onClick={resetCamera}
    style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      padding: "10px",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "20px",
    }}
  >
    <FaSyncAlt />
  </button>
);

// HelpWidgets as before
const HelpWidgets = () => (
  <div
    className="help-widgets"
    style={{
      position: "absolute",
      bottom: "20px",
      left: "80px",
      display: "flex",
      gap: "20px",
      color: "#fff",
      backgroundColor: "#333",
      padding: "10px",
      borderRadius: "5px",
      maxWidth: "600px",
      lineHeight: "1.5",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FaMousePointer style={{ fontSize: "20px" }} />
      <span>Left-click: Rotate</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FaMousePointer style={{ fontSize: "20px" }} />
      <span>Right-click: Pan</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FaMousePointer style={{ fontSize: "20px" }} />
      <span>Scroll: Zoom</span>
    </div>
  </div>
);

// Main App component
const App = () => {
  const { progress } = useProgress(); // Get loading progress
  const [loading, setLoading] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setLoading(false), 500); // Delay to smooth transition
    }
  }, [progress]);

  const resetCamera = () => {
    setResetTrigger((prev) => !prev);
  };

  return (
    <>
      {loading && <SplashScreen loadingProgress={progress} />}

      <Canvas
        className="canvas-container"
        shadows
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          position: [
            initialCameraPosition.x,
            initialCameraPosition.y,
            initialCameraPosition.z,
          ],
          fov: 50,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <ComputerModel />
        <PenguinModel position={[-24, 0.2, 0]} scale={3} />
        <Nes position={[36, 0.4, 16]} scale={2} />;
        <PaperModel
          position={[16, 0.35, 15]}
          rotationZ={8} 
          scale={69}
          textureUrl="assets/models/textures/pad.jpg" 
        />
        <PaperModel
          position={[-65, 0.35, 15]}
          rotationZ={6} 
          scale={54}
          textureUrl="assets/models/textures/page1.jpg" 
        />
        <PaperModel
          position={[-48, 0.35, 10]}
          rotationZ={0.2} 
          scale={54}
          textureUrl="assets/models/textures/page2.jpg" 
        />
        <PaperModel
          position={[-81, 0.35, 13]}
          rotationZ={-0.05} 
          scale={54}
          textureUrl="assets/models/textures/page3.jpg" 
        />
        <TableModel position={[-20, -41.8, -10]} scale={[8, 8, 8]} />

        <OrbitControls enableZoom={true} minDistance={5} maxDistance={140} />
        <CameraController resetTrigger={resetTrigger} />
      </Canvas>

      <ResetCameraButton resetCamera={resetCamera} />
      <HelpWidgets />
    </>
  );
};

export default App;
