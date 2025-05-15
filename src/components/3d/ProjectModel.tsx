'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/utils/use-reduced-motion';
import { useThemeStore } from '@/store/theme-store';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Define the project model types
type ModelType = 'website' | 'mobile' | 'dashboard' | 'generic';

interface ProjectModelProps {
  type: ModelType;
  image?: string;
  height?: number;
  interactive?: boolean;
}

// Simple responsive box model with image texture
function BoxModel({ type, image, prefersReducedMotion }: { type: ModelType; image?: string; prefersReducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  // Use a placeholder texture if no image is provided
  const texturePath = image || '/placeholder.jpg';
  
  // Load texture manually
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      texturePath, 
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
    
    // Cleanup
    return () => {
      if (texture) texture.dispose();
    };
  }, [texturePath]);
  
  // Determine dimensions based on type
  let width = 1.5;
  let height = 1;
  let depth = 0.1;
  
  if (type === 'mobile') {
    width = 0.7;
    height = 1.4;
  } else if (type === 'dashboard') {
    width = 1.6;
    height = 0.9;
  }
  
  useFrame(({ clock }) => {
    if (prefersReducedMotion || !meshRef.current) return;
    
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.05;
  });
  
  if (!texture) return null;
  
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Front face with texture */}
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} />
      
      {/* Back face */}
      <mesh position={[0, 0, -depth]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Top edge */}
      <mesh position={[0, height/2, -depth/2]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Bottom edge */}
      <mesh position={[0, -height/2, -depth/2]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Left edge */}
      <mesh position={[-width/2, 0, -depth/2]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Right edge */}
      <mesh position={[width/2, 0, -depth/2]} rotation={[0, -Math.PI/2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </mesh>
  );
}

// Simple environment implementation
function SimpleEnvironment({ preset }: { preset: 'sunset' | 'night' }) {
  const color = preset === 'night' ? '#0a0a1a' : '#feeac8';
  const intensity = preset === 'night' ? 0.3 : 0.8;
  
  return (
    <>
      <ambientLight intensity={intensity} color={color} />
      <hemisphereLight 
        color={preset === 'night' ? '#0a0a3a' : '#ffd5a3'} 
        groundColor={preset === 'night' ? '#000011' : '#907060'}
        intensity={intensity * 0.6}
      />
    </>
  );
}

// Fallback for Suspense
function ModelLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

export default function ProjectModel({ type = 'website', image, height = 300, interactive = false }: ProjectModelProps) {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div style={{ height }} className="w-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <LoadingSpinner size="md" color="primary" />
        </div>
      )}
      <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
          castShadow 
        />
        <Suspense fallback={<ModelLoader />}>
          <BoxModel type={type} image={image} prefersReducedMotion={prefersReducedMotion} />
          {interactive && <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />}
          <SimpleEnvironment preset={resolvedTheme === 'dark' ? 'night' : 'sunset'} />
        </Suspense>
      </Canvas>
    </div>
  );
} 