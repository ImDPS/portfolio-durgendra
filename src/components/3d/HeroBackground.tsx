'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
// Assuming these are your custom hooks/stores
import { useThemeStore } from '@/store/theme-store'; 
import { useReducedMotion } from '@/utils/use-reduced-motion';

// Function to create initial particle data with more uniform distribution
function createDynamicParticles(count = 50, theme = 'dark') { 
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const baseColors = new Float32Array(count * 3);
  const sizes = new Float32Array(count); 
  const startupOffsets = new Float32Array(count * 2);

  // --- Grid-based distribution logic ---
  const xRange = 28; // Total width for particle distribution
  const yRange = 24; // Total height
  const zRange = 18; // Total depth

  // Approximate grid dimensions to distribute 'count' particles
  // Aim for cells that are roughly cubic or match the aspect ratio of the space
  const particlesPerDim = Math.cbrt(count);
  const nx = Math.ceil(particlesPerDim * (xRange / ((xRange+yRange+zRange)/3))); // Grid cells in X
  const ny = Math.ceil(particlesPerDim * (yRange / ((xRange+yRange+zRange)/3))); // Grid cells in Y
  const nz = Math.ceil(count / (nx * ny));                                     // Grid cells in Z

  const cellWidth = xRange / nx;
  const cellHeight = yRange / ny;
  const cellDepth = zRange / nz;

  let particleIndex = 0;

  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      for (let k = 0; k < nz; k++) {
        if (particleIndex >= count) break; // Stop if we've placed all particles

        const i3 = particleIndex * 3;
        const i2 = particleIndex * 2;

        // Base position of the current cell's corner
        const baseX = -xRange / 2 + i * cellWidth;
        const baseY = -yRange / 2 + j * cellHeight;
        const baseZ = -zRange / 2 + k * cellDepth;

        // Add random jitter within the cell
        positions[i3]     = baseX + Math.random() * cellWidth;
        positions[i3 + 1] = baseY + Math.random() * cellHeight;
        positions[i3 + 2] = baseZ + Math.random() * cellDepth;

        const depth = (positions[i3 + 2] + zRange / 2) / zRange; // Normalize depth from 0 to 1

        velocities[i3] = (Math.random() - 0.5) * (0.0008 + depth * 0.004); 
        velocities[i3 + 1] = (Math.random() - 0.5) * (0.0008 + depth * 0.004);
        velocities[i3 + 2] = (Math.random() - 0.5) * (0.0004 + depth * 0.0015);

        if (theme === 'dark') {
          const rFar = 0.3, gFar = 0.6, bFar = 0.9;   
          const rNear = 0.6, gNear = 0.8, bNear = 1.0; 
          baseColors[i3]     = rFar + (rNear - rFar) * depth;       
          baseColors[i3 + 1] = gFar + (gNear - gFar) * depth;     
          baseColors[i3 + 2] = bFar + (bNear - bFar) * depth;     
        } else { 
          const rFar = 0.1, gFar = 0.2, bFar = 0.6;   
          const rNear = 0.2, gNear = 0.35, bNear = 0.75;  
          baseColors[i3]     = rFar + (rNear - rFar) * depth;       
          baseColors[i3 + 1] = gFar + (gNear - gFar) * depth;     
          baseColors[i3 + 2] = bFar + (bNear - bFar) * depth;    
        }
        sizes[i3 / 3] = (0.7 + Math.random() * 0.6) * (0.45 + depth * 0.45); 

        startupOffsets[i2] = (Math.random() - 0.5) * 8; 
        startupOffsets[i2 + 1] = (Math.random() - 0.5) * 4; 

        particleIndex++;
      }
      if (particleIndex >= count) break;
    }
    if (particleIndex >= count) break;
  }
  // If count wasn't perfectly divisible, remaining particles could be placed randomly or by extending grid logic
  // For simplicity, we stop once 'count' particles are placed.

  return { positions, velocities, baseColors, sizes, startupOffsets, count };
}

// Shader for round, soft particles (remains unchanged)
const particleVertexShader = `
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color; 
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (100.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard; 
    float opacity = 1.0 - smoothstep(0.3, 0.5, dist); 
    gl_FragColor = vec4(vColor, opacity * 0.65); 
  }
`;


function DynamicParticles({ 
  prefersReducedMotion, 
  scrollY,
  resolvedTheme 
}: { 
  prefersReducedMotion: boolean; 
  scrollY: number;
  resolvedTheme: string; 
}) {
  const meshRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { viewport } = useThree(); 
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const particleData = useMemo(() => 
    createDynamicParticles(100, resolvedTheme),
    [resolvedTheme] 
  );

  const [startup, setStartup] = useState(0); 
  
  const originalPositionsRef = useRef(new Float32Array(particleData.positions)); 
  const currentPositionsRef = useRef(new Float32Array(particleData.positions)); 
  const dynamicColorsRef = useRef(new Float32Array(particleData.baseColors.length));
  const startupOffsetsRef = useRef(new Float32Array(particleData.startupOffsets));


  const linePositions = useMemo(() => new Float32Array(particleData.count * particleData.count * 3 * 2), [particleData.count]); 
  const lineColors = useMemo(() => new Float32Array(particleData.count * particleData.count * 3 * 2), [particleData.count]);


  useEffect(() => {
    dynamicColorsRef.current.set(particleData.baseColors);
    currentPositionsRef.current.set(particleData.positions); 
    originalPositionsRef.current.set(particleData.positions);
    startupOffsetsRef.current.set(particleData.startupOffsets);

    if (meshRef.current) {
        const geometry = meshRef.current.geometry;
        geometry.setAttribute('position', new THREE.BufferAttribute(currentPositionsRef.current, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(dynamicColorsRef.current, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(particleData.sizes, 1));
    }
    if (lineRef.current) {
        const lineGeometry = lineRef.current.geometry;
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    }

  }, [particleData, linePositions, lineColors]);


  const particleShaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending, 
    vertexColors: true,
  }), []);


  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    let frame: number;
    const animateIn = () => {
      setStartup((s) => {
        if (s < 1) return s + 0.015; 
        return 1;
      });
      if (startup < 1) frame = requestAnimationFrame(animateIn);
    };
    animateIn(); 
    return () => cancelAnimationFrame(frame);
  }, [startup]); 

  useFrame(() => { 
    if (!meshRef.current || !meshRef.current.geometry || !lineRef.current || !lineRef.current.geometry) return; 

    const pos = currentPositionsRef.current; 
    const originalPos = originalPositionsRef.current;
    const startupOffsets = startupOffsetsRef.current;
    const dynColors = dynamicColorsRef.current;
    const baseColors = particleData.baseColors;
    const velocities = particleData.velocities;
    const count = particleData.count;

    let lineVertexCount = 0;
    const connectDistance = 2.8; // Adjusted for potentially sparser but more uniform particles
    const maxConnectionsPerParticle = 1; 


    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i2 = i * 2; 

      const targetX = originalPos[i3];
      const targetY = originalPos[i3 + 1];
      const targetZ = originalPos[i3 + 2];

      if (startup < 1) {
        const sourceX = viewport.width * 0.35 + startupOffsets[i2] * 0.2; 
        const sourceY = startupOffsets[i2]; 
        
        const startZOffset = 15; 
        const sourceZ = targetZ + startZOffset + startupOffsets[i2+1];

        pos[i3]     = targetX * startup + sourceX * (1 - startup);
        pos[i3 + 1] = targetY * startup + sourceY * (1 - startup);
        pos[i3 + 2] = targetZ * startup + sourceZ * (1 - startup);

      } else {
        pos[i3]     += velocities[i3] * 0.6; 
        pos[i3 + 1] += velocities[i3 + 1] * 0.6 - (scrollY || 0) * 0.00007; 
        pos[i3 + 2] += velocities[i3 + 2] * 0.6;
      }
      
      const mx = mouse.x * viewport.width * 0.5;
      const my = mouse.y * viewport.height * 0.5;
      const dx = pos[i3] - mx; 
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const interactionRadius = 1.8; 
      if (dist < interactionRadius) {
        const forceFactor = 0.018 * (interactionRadius - dist) / interactionRadius; 
        pos[i3] += (dx / dist) * forceFactor * viewport.width * 0.1; 
        pos[i3 + 1] += (dy / dist) * forceFactor * viewport.height * 0.1;
      }

      if (startup >= 1) {
        const xBound = viewport.width / 2 + 3; 
        const yBound = viewport.height / 2 + 3; 
        const zBound = 9.5; // Corresponds to zRange/2 + buffer

        if (pos[i3] < -xBound) pos[i3] = xBound;
        if (pos[i3] > xBound) pos[i3] = -xBound;
        if (pos[i3 + 1] < -yBound) pos[i3 + 1] = yBound;
        if (pos[i3 + 1] > yBound) pos[i3 + 1] = -yBound;
        if (pos[i3 + 2] < -zBound) pos[i3 + 2] = zBound; 
        if (pos[i3 + 2] > zBound) pos[i3 + 2] = -zBound; 
      }

      const highlight = dist < interactionRadius ? 0.6 * (interactionRadius - dist) / interactionRadius : 0;
      dynColors[i3]     = Math.min(1, baseColors[i3] + highlight * 1.2); 
      dynColors[i3 + 1] = Math.min(1, baseColors[i3 + 1] + highlight * 1.0); 
      dynColors[i3 + 2] = Math.min(1, baseColors[i3 + 2] + highlight * 0.8); 

      if (startup >= 1) { 
        let connections = 0;
        for (let j = i + 1; j < count; j++) { 
            if (connections >= maxConnectionsPerParticle) break;

            const j3 = j * 3;
            const dX = pos[i3] - pos[j3];
            const dY = pos[i3 + 1] - pos[j3 + 1];
            const dZ = pos[i3 + 2] - pos[j3 + 2];
            const distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);

            if (distance < connectDistance) {
                const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
                const lineColorAttr = lineRef.current.geometry.attributes.color as THREE.BufferAttribute;

                linePosAttr.setXYZ(lineVertexCount, pos[i3], pos[i3+1], pos[i3+2]);
                lineColorAttr.setXYZ(lineVertexCount, dynColors[i3], dynColors[i3+1], dynColors[i3+2]); 
                lineVertexCount++;
                
                linePosAttr.setXYZ(lineVertexCount, pos[j3], pos[j3+1], pos[j3+2]);
                lineColorAttr.setXYZ(lineVertexCount, dynColors[j3], dynColors[j3+1], dynColors[j3+2]);
                lineVertexCount++;
                connections++;
            }
        }
      }
    }
    (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (meshRef.current.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    
    const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineColorAttr = lineRef.current.geometry.attributes.color as THREE.BufferAttribute;
    linePosAttr.needsUpdate = true;
    lineColorAttr.needsUpdate = true;
    lineRef.current.geometry.setDrawRange(0, lineVertexCount); 
  });


  return (
    <>
      <points ref={meshRef} material={particleShaderMaterial}>
        {/* Geometry is managed via attributes */}
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors={true} transparent={true} opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending}/>
      </lineSegments>
    </>
  );
}

// Main background component
export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useThemeStore(); 
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-10" style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}> 
        <DynamicParticles 
            prefersReducedMotion={prefersReducedMotion} 
            scrollY={scrollY} 
            resolvedTheme={resolvedTheme || 'dark'} 
        />
        <fog
          attach="fog"
          color={resolvedTheme === 'dark' ? '#05070f' : '#dde4ed'} 
          near={4.5} 
          far={17}   
        />
      </Canvas>
    </div>
  );
}
