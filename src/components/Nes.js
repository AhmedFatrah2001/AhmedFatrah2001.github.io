import React from 'react';
import { useGLTF } from '@react-three/drei';

const Nes = ({ position = [0, 0, 0], scale = 1 }) => {
  const { scene } = useGLTF('assets/models/nes.gltf');

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position} 
      rotation={[11, 0, 6]} 
    />
  );
};

export default Nes;


useGLTF.preload('assets/models/nes.gltf');
