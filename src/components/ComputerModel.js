// src/components/ComputerModel.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

const ComputerModel = () => {
  // Load the GLTF model (adjust the path to match your folder structure)
  const { scene } = useGLTF('assets/models/computer.gltf');
  
  return <primitive object={scene} scale={0.69} />;
};

export default ComputerModel;

// Preload the GLTF model to avoid delays
useGLTF.preload('/models/scene.gltf');
