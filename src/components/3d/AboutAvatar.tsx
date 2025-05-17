'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingHead() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  // Create a custom head shape
  const headShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Create a stylized head silhouette
    shape.moveTo(0, -1);
    shape.quadraticCurveTo(0.7, -1, 1, -0.5);
    shape.quadraticCurveTo(1.2, 0, 1, 0.5);
    shape.quadraticCurveTo(0.8, 1.2, 0, 1.2);
    shape.quadraticCurveTo(-0.8, 1.2, -1, 0.5);
    shape.quadraticCurveTo(-1.2, 0, -1, -0.5);
    shape.quadraticCurveTo(-0.7, -1, 0, -1);
    return shape;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle floating and rotation
      groupRef.current.rotation.y = t * 0.2 + (mouse.x * Math.PI) / 10;
      groupRef.current.rotation.x = (mouse.y * Math.PI) / 20;
      
      // Gentle floating effect
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      
      // Slight scale on hover
      groupRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <extrudeGeometry args={[headShape, { depth: 0.2, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.1 }]} />
        <meshPhysicalMaterial
          color={hovered ? '#8B5CF6' : '#3B82F6'}
          roughness={0.3}
          metalness={0.7}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.1}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>
      
      {/* Add some floating particles around the head */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 6) * Math.PI;
        const radius = 1.5 + Math.sin(Date.now() * 0.001 + i) * 0.1;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + Date.now() * 0.001) * radius,
              Math.sin(angle * 0.5 + Date.now() * 0.002) * radius * 0.8,
              0
            ]}
            scale={0.03}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#8B5CF6" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function AboutAvatar() {
  return (
    <div style={{ width: 200, height: 200 }} className="mx-auto">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.3} color="#8B5CF6" />
        <pointLight position={[3, -2, 3]} intensity={0.3} color="#3B82F6" />
        <FloatingHead />
      </Canvas>
    </div>
  );
}
