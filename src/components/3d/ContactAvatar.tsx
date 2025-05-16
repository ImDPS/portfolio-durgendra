'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

export default function ContactAvatar() {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <AnimatedEnvelope />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={1.5} far={4.5} />
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function AnimatedEnvelope() {
  const meshRef = useRef();
  const materialRef = useRef();
  const envelopeGroup = useRef();
  
  // Create envelope geometry on mount
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Colors
    const primaryColor = new THREE.Color('#3b82f6');  // Adjust to match your primary color
    const accentColor = new THREE.Color('#f97316');   // Optional accent color
    
    // Update material
    if (materialRef.current) {
      materialRef.current.color = primaryColor;
      materialRef.current.emissive = primaryColor;
      materialRef.current.emissiveIntensity = 0.2;
    }
  }, []);
  
  // Animation logic
  useFrame((state) => {
    if (!envelopeGroup.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Gentle floating motion
    envelopeGroup.current.position.y = Math.sin(t * 0.5) * 0.2;
    
    // Gentle rotation
    envelopeGroup.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    
    // Pulse effect
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.2 + Math.sin(t * 2) * 0.1;
    }
  });
  
  return (
    <group ref={envelopeGroup}>
      {/* Main envelope body */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 2, 0.2]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#3b82f6"
          metalness={0.5}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>
      
      {/* Envelope flap */}
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[3, 1.5, 0.05]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          metalness={0.5}
          roughness={0.3}
          clearcoat={0.5}
        />
      </mesh>
      
      {/* @ Symbol - floating above */}
      <mesh position={[0, 0.5, 0.5]} castShadow>
        <torusGeometry args={[0.5, 0.15, 16, 50]} />
        <meshPhysicalMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      
      {/* Line for @ symbol */}
      <mesh position={[0.1, 0.5, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 20]} />
        <meshPhysicalMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* Particles around the envelope */}
      {[...Array(15)].map((_, i) => {
        const radius = 2.5 + Math.random() * 2;
        const angle = (i / 15) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        const z = Math.cos(angle) * radius;
        
        return (
          <mesh 
            key={i} 
            position={[x, y, z]}
            scale={[0.1 + Math.random() * 0.1, 0.1 + Math.random() * 0.1, 0.1 + Math.random() * 0.1]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#3b82f6"
              emissiveIntensity={0.5 + Math.random() * 0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}