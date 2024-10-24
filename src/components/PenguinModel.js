// src/components/PenguinModel.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

const PenguinModel = ({ position = [0, 0, 0], scale = 1 }) => {
  const { scene } = useGLTF('assets/models/peng.gltf');

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position} 
    />
  );
};

export default PenguinModel;

useGLTF.preload('assets/models/peng.gltf');
