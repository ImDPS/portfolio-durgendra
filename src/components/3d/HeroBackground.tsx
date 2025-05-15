'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/store/theme-store';
import { useReducedMotion } from '@/utils/use-reduced-motion';

// Generate random points in a 3D space
function generatePoints(count = 1000) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    points[i3] = (Math.random() - 0.5) * 10;
    points[i3 + 1] = (Math.random() - 0.5) * 10;
    points[i3 + 2] = (Math.random() - 0.5) * 10;
  }
  return points;
}

function StarField({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const meshRef = useRef<THREE.Points>(null!);
  const [positions] = useState(() => generatePoints(1500));
  
  useEffect(() => {
    if (meshRef.current) {
      // Create geometry with our positions
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Apply to the mesh
      meshRef.current.geometry = geometry;
    }
  }, [positions]);
  
  useFrame((state) => {
    if (prefersReducedMotion) return;
    const t = state.clock.getElapsedTime() * 0.1;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 4);
      meshRef.current.rotation.y = Math.sin(t / 2);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial 
        transparent
        color="#fff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <StarField prefersReducedMotion={prefersReducedMotion} />
        <fog
          attach="fog"
          color={resolvedTheme === 'dark' ? '#0f172a' : '#f8fafc'}
          near={8}
          far={20}
        />
      </Canvas>
    </div>
  );
} 