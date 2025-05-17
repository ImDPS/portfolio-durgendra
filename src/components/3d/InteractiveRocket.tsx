// components/3d/InteractiveRocket.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

// Design System Colors (ensure these match your source of truth)
const COLOR_ROCKET_BODY = new THREE.Color('#1A2837'); // Dark Blue-Green
const COLOR_ROCKET_ACCENT_CORAL = new THREE.Color('#FF6B6B'); // Vibrant coral pink
const COLOR_ROCKET_WINDOW_EMISSIVE = new THREE.Color('#B6FFD3'); // Pale mint green
const COLOR_ROCKET_FINS = new THREE.Color('#1A2837');
const COLOR_FLAME_PRIMARY = new THREE.Color('#FF6B6B');
const COLOR_FLAME_SECONDARY = new THREE.Color('#FF8E53'); // From hero text gradient
const COLOR_TEXT_WHITE = new THREE.Color('#FFFFFF'); // For lighting

const ROCKET_SCALE = 0.5; // Adjust as needed

// Helper component to set canvas clear alpha once GL context is available
function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearAlpha(0); // Set clear alpha to 0 for full transparency
  }, [gl]);
  return null;
}

function RocketModel({ bobOffset }: { bobOffset: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const rocketBodyRef = useRef<THREE.Mesh>(null!);
  const noseConeRef = useRef<THREE.Mesh>(null!);
  const windowRef = useRef<THREE.Mesh>(null!);
  const fin1Ref = useRef<THREE.Mesh>(null!);
  const fin2Ref = useRef<THREE.Mesh>(null!);
  const fin3Ref = useRef<THREE.Mesh>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);

  const { clock } = useThree();

  useFrame(() => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 2 + bobOffset) * 0.1 * ROCKET_SCALE;
    }

    if (flameRef.current) {
      const flameScaleBase = ROCKET_SCALE * 0.9; // Base scale for flame
      const flameScaleFluctuation = ROCKET_SCALE * 0.15; // How much it fluctuates
      const flameScale = flameScaleBase + Math.sin(time * 30) * flameScaleFluctuation; // Faster flicker for scale

      flameRef.current.scale.set(flameScale, flameScale * 1.3, flameScale); // Flame taller
      const flameMaterial = flameRef.current.material as THREE.MeshStandardMaterial;
      flameMaterial.emissiveIntensity = Math.random() * 0.8 + 2.8; // Slightly more intense flicker
      flameMaterial.opacity = Math.random() * 0.25 + 0.7; // Flicker opacity
    }
  });

  return (
    <group ref={groupRef} scale={[ROCKET_SCALE, ROCKET_SCALE, ROCKET_SCALE]} rotation={[0, Math.PI, 0]}>
      {/* Rocket Body */}
      <mesh ref={rocketBodyRef} position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.7, 2, 32]} />
        <meshStandardMaterial
          color={COLOR_ROCKET_BODY}
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Nose Cone - Coral Accent */}
      <mesh ref={noseConeRef} position={[0, 2.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial
          color={COLOR_ROCKET_ACCENT_CORAL}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Window - Pale Mint Green Emissive */}
      <mesh ref={windowRef} position={[0, 1.5, 0.45]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={COLOR_ROCKET_WINDOW_EMISSIVE.clone().multiplyScalar(0.3)} // Darker base for glass
          emissive={COLOR_ROCKET_WINDOW_EMISSIVE}
          emissiveIntensity={2.5} // Slightly brighter window
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.7} // Slightly more see-through
        />
      </mesh>

      {/* Fins - Body color with Coral edges */}
      {[fin1Ref, fin2Ref, fin3Ref].map((finRef, i) => (
        <group
          key={i}
          position={[
            Math.sin((i * 2 * Math.PI) / 3) * 0.7,
            0.2,
            Math.cos((i * 2 * Math.PI) / 3) * 0.7,
          ]}
          rotation={[
            0,
            (i * 2 * Math.PI) / 3,
            -Math.PI / 5,
          ]}
        >
          <mesh
            ref={finRef}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.15, 1, 0.7]} /> {/* Main Fin */}
            <meshStandardMaterial
              color={COLOR_ROCKET_FINS}
              metalness={0.7}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0.075 + 0.005, 0, 0]} name={`fin-edge-${i}`}> {/* Coral Edge, slightly offset */}
              <boxGeometry args={[0.03, 1, 0.7]} /> {/* Thinner edge */}
              <meshStandardMaterial color={COLOR_ROCKET_ACCENT_CORAL} metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Flame - Coral Themed */}
      <mesh ref={flameRef} position={[0, -0.75, 0]} > {/* Adjusted flame position */}
        <coneGeometry args={[0.45, 2, 32]} /> {/* Slightly adjusted flame shape */}
        <meshStandardMaterial
          color={COLOR_FLAME_PRIMARY}
          emissive={COLOR_FLAME_SECONDARY}
          emissiveIntensity={3}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function InteractiveRocket() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      {/* The background style is REMOVED from this div */}
      <Canvas
        shadows
        camera={{
          position: [3.2, 2.5, 4.8], // Fine-tuned camera position
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true, // IMPORTANT: Enable alpha channel for the renderer
        }}
      >
        <SceneSetup /> {/* IMPORTANT: Sets gl.clearAlpha(0) */}

        <ambientLight intensity={0.5} color={COLOR_TEXT_WHITE} />
        <directionalLight
          position={[4, 6, 5]} // Adjusted light position for better highlights
          intensity={1.5} // Slightly stronger directional light
          color={COLOR_TEXT_WHITE}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001} // Helps with shadow acne
        />
        <pointLight
            position={[0, ROCKET_SCALE * 3.5, ROCKET_SCALE * 2.5]} // Adjusted position
            color={COLOR_ROCKET_WINDOW_EMISSIVE}
            intensity={1.8} // Adjusted intensity
            distance={ROCKET_SCALE * 18}
        />
        <pointLight
            position={[0, ROCKET_SCALE * -2.5, 0]} // Adjusted position
            color={COLOR_FLAME_PRIMARY}
            intensity={2.5} // Adjusted intensity
            distance={ROCKET_SCALE * 12}
        />

        <React.Suspense fallback={null}>
          <RocketModel bobOffset={Math.random() * 100} />
        </React.Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5} // Adjusted distances
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.4} // Slightly slower rotation
          target={[0, ROCKET_SCALE * 1.1, 0]} // Fine-tuned target
        />
      </Canvas>
    </div>
  );
}