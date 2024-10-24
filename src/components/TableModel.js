// src/components/TableModel.js
import React from 'react';
import { useTexture } from '@react-three/drei';
const TableModel = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
    const texture = useTexture('assets/models/textures/oak.jpg');

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Tabletop */}
      <mesh position={[0, 5, 0]} receiveShadow castShadow>
        <boxGeometry args={[20, 0.5, 10]} /> {/* Thinner Tabletop */}
        <meshStandardMaterial map={texture} /> {/* Brown wooden texture */}
      </mesh>

      {/* Table Legs (4 cylindrical legs) */}
      {/* Front-left leg */}
      <mesh position={[-9, 2.5, 4.45]} receiveShadow castShadow>
        <cylinderGeometry args={[0.3, 0.3, 5, 32]} /> {/* Thinner, circular legs */}
        <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} roughness={0.3} /> {/* Metallic texture */}
      </mesh>

      {/* Front-right leg */}
      <mesh position={[9, 2.5, 4.45]} receiveShadow castShadow>
        <cylinderGeometry args={[0.3, 0.3, 5, 32]} />
        <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Back-left leg */}
      <mesh position={[-9, 2.5, -4.45]} receiveShadow castShadow>
        <cylinderGeometry args={[0.3, 0.3, 5, 32]} />
        <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Back-right leg */}
      <mesh position={[9, 2.5, -4.45]} receiveShadow castShadow>
        <cylinderGeometry args={[0.3, 0.3, 5, 32]} />
        <meshStandardMaterial color={'#C0C0C0'} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

export default TableModel;
