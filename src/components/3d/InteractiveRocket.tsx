'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Increase the size of the rocket
const ROCKET_SCALE = 1.5;

function RocketModel() {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [rotationSpeed] = useState(0.2);
  const [bobOffset] = useState(() => Math.random() * Math.PI * 2);
  const { clock } = useThree();
  
  // Animation loop
  useFrame(() => {
    const time = clock.getElapsedTime();
    
    // Rotate slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = time * rotationSpeed;
      // Bob up and down
      groupRef.current.position.y = Math.sin(time * 0.5 + bobOffset) * 0.2;
    }
    
    // Pulsing flame effect
    if (flameRef.current) {
      const pulse = Math.sin(time * 10) * 0.1 + 1;
      flameRef.current.scale.set(pulse, pulse * 1.5, pulse);
    }
  });
  
  // Create flame material with gradient
  const flameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FF6B6B',
      emissive: '#FF8E53',
      emissiveIntensity: hovered ? 2 : 1,
      transparent: true,
      opacity: 0.9,
    });
  }, [hovered]);

  // Rocket dimensions (scaled up)
  const bodyLength = 1.5 * ROCKET_SCALE;
  const bodyRadius = 0.3 * ROCKET_SCALE;
  const coneHeight = 0.6 * ROCKET_SCALE;
  const finSize = 0.4 * ROCKET_SCALE;

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Rocket body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[bodyRadius, bodyRadius * 0.8, bodyLength, 8, 1, false]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, bodyLength/2 + coneHeight/2, 0]} castShadow>
        <coneGeometry args={[bodyRadius * 0.8, 0, coneHeight, 8]} />
        <meshStandardMaterial 
          color="#FF6B6B" 
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      
      {/* Fins */}
      {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((angle, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(angle) * bodyRadius * 0.8, 
            0, 
            Math.sin(angle) * bodyRadius * 0.8
          ]}
          rotation={[0, angle, 0]}
          castShadow
        >
          <boxGeometry args={[finSize * 0.8, finSize * 0.1, finSize * 1.2]} />
          <meshStandardMaterial 
            color="#FF6B6B" 
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
      
      {/* Window */}
      <mesh position={[0, bodyLength * 0.2, bodyRadius * 0.8]} castShadow>
        <sphereGeometry args={[bodyRadius * 0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Flame */}
      <group position={[0, -bodyLength/2, 0]}>
        <mesh 
          ref={flameRef}
          position={[0, -0.2, 0]}
          rotation={[Math.PI, 0, 0]}
        >
          <coneGeometry args={[bodyRadius * 0.6, bodyRadius * 1.5, 6, 1, true]} />
          <meshStandardMaterial 
            color={hovered ? "#FF4500" : "#FF6B6B"} 
            emissive={hovered ? "#FF8E53" : "#FF6B6B"}
            emissiveIntensity={hovered ? 2 : 0.5}
            transparent
            opacity={0.9}
          />
          {hovered && (
            <pointLight 
              color="#FF6B6B" 
              intensity={3} 
              distance={5}
              decay={2}
            />
          )}
        </mesh>
      </group>
    </group>
  );
};

export default function InteractiveRocket() {
  return (
    <div className="w-full h-96 lg:h-[32rem] relative cursor-pointer">
      <Canvas 
        camera={{ 
          position: [0, 0, 5 * ROCKET_SCALE],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          color="#ffffff"
          castShadow
        />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.5}
          color="#ffffff"
        />
        <RocketModel />
      </Canvas>
    </div>
  );
}


