'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function FloatingParticles() {
  const particles = useRef<THREE.Points>(null);
  const count = 2000;
  
  // Create particle positions
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  
  // Initialize particles in a sphere
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 10 + Math.random() * 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    scales[i] = Math.random() * 2 + 1;
  }
  
  useFrame(({ clock }) => {
    if (particles.current) {
      particles.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FF6B6B"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function SceneWrapper() {
  const { gl } = useThree();
  
  useEffect(() => {
    // Ensure WebGL context is transparent
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FF6B6B" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF8E53" />
      <FloatingParticles />
    </>
  );
}

export default function NotFoundAnimation() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <SceneWrapper />
        </Suspense>
      </Canvas>
    </div>
  );
}
