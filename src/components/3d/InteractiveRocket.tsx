// components/3d/InteractiveRocket.tsx
'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'; // useThree is still needed by SceneSetup and RocketModel
import * as THREE from 'three';
// OrbitControls removed to disable user interaction

// Design System Colors (ensure these are defined or imported)
const COLOR_ROCKET_BODY = new THREE.Color('#1A2837');
const COLOR_ROCKET_ACCENT_CORAL = new THREE.Color('#FF6B6B');
const COLOR_ROCKET_WINDOW_EMISSIVE = new THREE.Color('#B6FFD3');
const COLOR_ROCKET_FINS = new THREE.Color('#1A2837');
const COLOR_FLAME_PRIMARY = new THREE.Color('#FF6B6B');
const COLOR_FLAME_SECONDARY = new THREE.Color('#FF8E53');
const COLOR_TEXT_WHITE = new THREE.Color('#FFFFFF');

const ROCKET_SCALE = 1.2; // Increased from 0.5
// Slower, more subtle floating animation
const PATH_ANIMATION_SPEED_FACTOR = 0.04; // Increased from 0.02

// --- Path Constants ---
const INITIAL_POINT = new THREE.Vector3(0, 1.5, 0);
const WORLD_X_EXTENT = 7;
const OFFSCREEN_X_FACTOR = 1.5;

function SceneSetup() {
  const { gl } = useThree(); // This is correct as SceneSetup is inside Canvas
  useEffect(() => {
    gl.setClearAlpha(0);
  }, [gl]);
  return null;
}

// Path definitions covering the entire hero section
const pathDefinitions: (() => THREE.Vector3[])[] = [
  // Horizontal figure-8 pattern
  () => [
    new THREE.Vector3(-WORLD_X_EXTENT * 0.8, 0, 0),
    new THREE.Vector3(0, WORLD_X_EXTENT * 0.2, -2),
    new THREE.Vector3(WORLD_X_EXTENT * 0.8, 0, 0),
    new THREE.Vector3(0, -WORLD_X_EXTENT * 0.2, 2),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.8, 0, 0),
  ],
  // Diagonal cross pattern
  () => [
    new THREE.Vector3(-WORLD_X_EXTENT * 0.8, -WORLD_X_EXTENT * 0.2, 0),
    new THREE.Vector3(WORLD_X_EXTENT * 0.8, WORLD_X_EXTENT * 0.2, -2),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.8, WORLD_X_EXTENT * 0.2, 2),
    new THREE.Vector3(WORLD_X_EXTENT * 0.8, -WORLD_X_EXTENT * 0.2, 0),
  ],
  // Large circular pattern
  () => {
    const points = [];
    const radius = WORLD_X_EXTENT * 0.6;
    const segments = 12;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        Math.sin(angle) * 0.5
      ));
    }
    return points;
  }
];

function getRandomPathPoints(): THREE.Vector3[] {
  const randomIndex = Math.floor(Math.random() * pathDefinitions.length);
  return pathDefinitions[randomIndex]();
}

function RocketModel() {
  const pathFollowingGroupRef = useRef<THREE.Group>(null!);
  const modelGroupRef = useRef<THREE.Group>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);
  // const { viewport } = useThree(); // If WORLD_X_EXTENT were dynamic, you'd use useThree() here.

  const [currentCurve, setCurrentCurve] = useState<THREE.CatmullRomCurve3 | null>(null);
  const [pathProgress, setPathProgress] = useState(0);

  const alignmentMatrix = useMemo(() => new THREE.Matrix4(), []);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const yToZRotation = useMemo(() => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2), []);

  const selectNextPath = useCallback(() => {
    // Example of how you *could* use viewport if it were dynamic:
    // const currentWorldXExtent = viewport.width / 2 * 0.8; // e.g. 80% of viewport half-width
    // const points = getRandomPathPoints(currentWorldXExtent); // Path definitions would need to accept this
    const points = getRandomPathPoints(); // Using global WORLD_X_EXTENT for now
    const newCurve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
    setCurrentCurve(newCurve);
    setPathProgress(0);
    if (pathFollowingGroupRef.current) {
      pathFollowingGroupRef.current.position.copy(INITIAL_POINT);
    }
  }, []); // Add viewport to dependencies if it's used: [selectNextPath, viewport]

  useEffect(() => {
    if (pathFollowingGroupRef.current) {
      pathFollowingGroupRef.current.position.copy(INITIAL_POINT);
    }
    selectNextPath();
  }, [selectNextPath]);

  useFrame((state, delta) => {
    if (!currentCurve) return;

    const newProgress = (pathProgress + delta * PATH_ANIMATION_SPEED_FACTOR) % 1;
    setPathProgress(newProgress);

    // Get position and tangent for orientation
    const point = currentCurve.getPoint(newProgress);
    const tangent = currentCurve.getTangent(newProgress).normalize();

    // Smoothly move to the target position (faster follow)
    pathFollowingGroupRef.current.position.lerp(point, 0.08);

    // Update rotation to face direction of movement
    if (tangent.length() > 0) {
      alignmentMatrix.lookAt(
        pathFollowingGroupRef.current.position,
        new THREE.Vector3().addVectors(pathFollowingGroupRef.current.position, tangent),
        new THREE.Vector3(0, 1, 0)
      );
      targetQuaternion.setFromRotationMatrix(alignmentMatrix);
      targetQuaternion.multiply(yToZRotation);
      modelGroupRef.current.quaternion.slerp(targetQuaternion, 0.15); // Faster rotation
    }

    // Add subtle floating effect
    modelGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;

    // Flame animation
    if (flameRef.current) {
      const flameScale = 0.8 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
      flameRef.current.scale.set(flameScale, flameScale, flameScale);
      
      // Make flame more intense when moving faster
      const speed = tangent.length();
      const intensity = 0.8 + speed * 0.5;
      (flameRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }

    // Select new path when current one is complete
    if (newProgress < pathProgress) {
      selectNextPath();
    }
  });

  return (
    <group ref={pathFollowingGroupRef}>
      <group ref={modelGroupRef} scale={[ROCKET_SCALE, ROCKET_SCALE, ROCKET_SCALE]}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.7, 2, 32]} />
          <meshStandardMaterial color={COLOR_ROCKET_BODY} metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.5, 1, 32]} />
          <meshStandardMaterial color={COLOR_ROCKET_ACCENT_CORAL} metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.5, 0.45]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={COLOR_ROCKET_WINDOW_EMISSIVE.clone().multiplyScalar(0.3)}
            emissive={COLOR_ROCKET_WINDOW_EMISSIVE}
            emissiveIntensity={2.5} roughness={0.1} metalness={0.1} transparent opacity={0.7}
          />
        </mesh>
        {[...Array(3)].map((_, i) => (
          <group
            key={i}
            position={[Math.sin((i * 2 * Math.PI) / 3) * 0.7, 0.2, Math.cos((i * 2 * Math.PI) / 3) * 0.7]}
            rotation={[0, (i * 2 * Math.PI) / 3, -Math.PI / 5]}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.15, 1, 0.7]} />
              <meshStandardMaterial color={COLOR_ROCKET_FINS} metalness={0.7} roughness={0.4} />
            </mesh>
            <mesh position={[0.075 + 0.005, 0, 0]}>
              <boxGeometry args={[0.03, 1, 0.7]} />
              <meshStandardMaterial color={COLOR_ROCKET_ACCENT_CORAL} metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        ))}
        <mesh ref={flameRef} position={[0, -0.75, 0]}>
          <coneGeometry args={[0.45, 2, 32]} />
          <meshStandardMaterial
            color={COLOR_FLAME_PRIMARY} emissive={COLOR_FLAME_SECONDARY}
            emissiveIntensity={3} transparent opacity={0.75}
            blending={THREE.AdditiveBlending} depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function InteractiveRocket() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ 
          position: [0, 0, 12], // Moved camera closer
          fov: 65, // Slightly increased FOV
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <SceneSetup />
        <ambientLight intensity={0.6} color={COLOR_TEXT_WHITE} />
        <directionalLight
          position={[5, 8, 10]} 
          intensity={1.8} 
          color={COLOR_TEXT_WHITE} 
          castShadow
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
          shadow-bias={-0.0001}
        />
        <pointLight 
          position={[0, 5, 5]} 
          intensity={0.7} 
          color={COLOR_ROCKET_WINDOW_EMISSIVE} 
          distance={30} 
        />
        <React.Suspense fallback={null}>
          <RocketModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
}