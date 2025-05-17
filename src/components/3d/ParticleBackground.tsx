'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js with custom shader material
class CustomPointsMaterial extends THREE.PointsMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.transparent = true;
    this.depthWrite = false;
    this.blending = THREE.AdditiveBlending;
  }
}

extend({ CustomPointsMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customPointsMaterial: any;
    }
  }
}

type ParticleSystemProps = {
  count?: number;
  color?: string;  
};

const ParticleSystem = ({ count = 200, color: particleColor = '#FF6B6B' }: ParticleSystemProps) => {
  const { camera, mouse, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const [mounted, setMounted] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  
  // Create particle positions and colors
  const { positions, colors, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const color = new THREE.Color(particleColor);
    const radius = 40; // Further increased radius for more spread
    
    for (let i = 0; i < count; i++) {
      // Position particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Store original positions for animation
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      // Set initial positions (will be animated)
      positions[i * 3] = x + (Math.random() - 0.5) * 5; // Slight random offset
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 5;
      
      // Set colors with some variation
      // Use the provided color with some variation
      const baseColor = new THREE.Color(particleColor);
      const hue = (baseColor.getHSL({ h: 0, s: 0, l: 0 }).h + (Math.random() * 0.1 - 0.05)) % 1;
      const saturation = 0.8 + (Math.random() * 0.2 - 0.1);
      const lightness = 0.6 + (Math.random() * 0.2 - 0.1);
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors, originalPositions };
  }, [count, particleColor]);
  
  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY * 0.1; // Adjust scroll sensitivity
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set up animation frame
  useEffect(() => {
    if (!pointsRef.current) return;
    
    let frameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      if (!pointsRef.current) return;
      
      const elapsedTime = (Date.now() - startTime) * 0.001;
      const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute)
        .array as Float32Array;
      
      // Smooth rotation
      pointsRef.current.rotation.x = elapsedTime * 0.05;
      pointsRef.current.rotation.y = elapsedTime * 0.03;
      
      // Update particle positions
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Get original positions
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];
        
        // Add subtle noise with different frequencies for organic movement
        const noise1 = Math.sin(elapsedTime * 0.3 + i * 0.05) * 0.2;
        const noise2 = Math.cos(elapsedTime * 0.2 + i * 0.07) * 0.15;
        const noise3 = Math.sin(elapsedTime * 0.4 + i * 0.03) * 0.1;
        
        // Mouse interaction - stronger effect on closer particles
        const dx = mousePosition.current.x * 20 - ox * 0.2;
        const dy = mousePosition.current.y * 20 - oy * 0.2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Smooth mouse repulsion with distance falloff
        const mouseInfluence = Math.min(1, 80 / (dist + 0.0001));
        const mx = dx * mouseInfluence * 0.15;
        const my = dy * mouseInfluence * 0.15;
        
        // Subtle scroll effect
        const scrollOffset = scrollY.current * 0.0008;
        
        // Update positions with all effects
        positions[i3] = ox + noise1 + mx;
        positions[i3 + 1] = oy + noise2 + my - scrollOffset;
        positions[i3 + 2] = oz + noise3;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      frameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [count]);
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.25}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        alphaTest={0.01}
        depthTest={true}
      />
    </points>
  );
};

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      isolation: 'isolate'
    }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        camera={{
          position: [0, 0, 20],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        onCreated={({ gl }) => {
          gl.setClearColor(0x0e1824, 1);
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleSystem count={2000} color="#FF6B6B" />
      </Canvas>
    </div>
  );
}
