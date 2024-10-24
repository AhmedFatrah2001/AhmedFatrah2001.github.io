import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const A4_SIZE = { width: 0.21, height: 0.297, depth: 0.001 };

const PaperModel = ({ position = [0, 0, 0], scale = [1, 1, 1], rotationZ = 0, textureUrl }) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl); 

  return (
    <mesh
      position={position}
      scale={scale}
      rotation={[11, 0, rotationZ]} 
    >
      <boxGeometry args={[A4_SIZE.width, A4_SIZE.height, A4_SIZE.depth]} /> 
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} /> 
    </mesh>
  );
};

export default PaperModel;
