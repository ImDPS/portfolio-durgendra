'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouse, size } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    // Floating animation
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3 + (mouse.y * Math.PI) / 8;
      meshRef.current.rotation.y = t * 0.5 + (mouse.x * Math.PI) / 8;
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.2;
      meshRef.current.scale.setScalar(hovered ? 1.15 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={hovered ? '#2563eb' : '#38bdf8'}
        roughness={0.3}
        metalness={0.7}
        flatShading
      />
    </mesh>
  );
}

export default function InteractiveAvatar() {
  return (
    <div style={{ width: 128, height: 128 }}>
      <Canvas camera={{ position: [0, 0, 3] }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} castShadow />
        <FloatingShape />
      </Canvas>
    </div>
  );
} 