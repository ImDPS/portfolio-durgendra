// components/3d/InteractiveRocket.tsx
'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'; // useThree is still needed by SceneSetup and RocketModel
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

// Design System Colors (ensure these are defined or imported)
const COLOR_ROCKET_BODY = new THREE.Color('#1A2837');
const COLOR_ROCKET_ACCENT_CORAL = new THREE.Color('#FF6B6B');
const COLOR_ROCKET_WINDOW_EMISSIVE = new THREE.Color('#B6FFD3');
const COLOR_ROCKET_FINS = new THREE.Color('#1A2837');
const COLOR_FLAME_PRIMARY = new THREE.Color('#FF6B6B');
const COLOR_FLAME_SECONDARY = new THREE.Color('#FF8E53');
const COLOR_TEXT_WHITE = new THREE.Color('#FFFFFF');

const ROCKET_SCALE = 0.5;
const PATH_ANIMATION_SPEED_FACTOR = 0.035;

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

const pathDefinitions: (() => THREE.Vector3[])[] = [
  () => [
    INITIAL_POINT.clone(),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.7, INITIAL_POINT.y + 1, INITIAL_POINT.z - 2),
    new THREE.Vector3(-WORLD_X_EXTENT * OFFSCREEN_X_FACTOR, INITIAL_POINT.y + Math.random() * 2 - 1, INITIAL_POINT.z + Math.random() * 4 - 2),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.5, INITIAL_POINT.y - 1, INITIAL_POINT.z + 2),
    INITIAL_POINT.clone(),
  ],
  () => [
    INITIAL_POINT.clone(),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.4, INITIAL_POINT.y + 2, INITIAL_POINT.z + 1.5),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.85, INITIAL_POINT.y + Math.random() * 1, INITIAL_POINT.z - 1),
    new THREE.Vector3(-WORLD_X_EXTENT * 0.3, INITIAL_POINT.y - 0.5, INITIAL_POINT.z - 2.5),
    INITIAL_POINT.clone(),
  ],
  () => [
    INITIAL_POINT.clone(),
    new THREE.Vector3(WORLD_X_EXTENT * 0.7, INITIAL_POINT.y - 1, INITIAL_POINT.z + 2),
    new THREE.Vector3(WORLD_X_EXTENT * OFFSCREEN_X_FACTOR, INITIAL_POINT.y + Math.random() * 2 - 1, INITIAL_POINT.z + Math.random() * 4 - 2),
    new THREE.Vector3(WORLD_X_EXTENT * 0.5, INITIAL_POINT.y + 1, INITIAL_POINT.z - 2),
    INITIAL_POINT.clone(),
  ],
  () => [
    INITIAL_POINT.clone(),
    new THREE.Vector3(WORLD_X_EXTENT * 0.4, INITIAL_POINT.y - 1.5, INITIAL_POINT.z - 1),
    new THREE.Vector3(WORLD_X_EXTENT * 0.85, INITIAL_POINT.y + Math.random() * 1, INITIAL_POINT.z + 1.5),
    new THREE.Vector3(WORLD_X_EXTENT * 0.3, INITIAL_POINT.y + 0.5, INITIAL_POINT.z + 2.5),
    INITIAL_POINT.clone(),
  ],
  () => [
    INITIAL_POINT.clone(),
    new THREE.Vector3(INITIAL_POINT.x + 1, INITIAL_POINT.y + 3, INITIAL_POINT.z - 2.5),
    new THREE.Vector3(INITIAL_POINT.x, INITIAL_POINT.y + 1.5, INITIAL_POINT.z - 4),
    new THREE.Vector3(INITIAL_POINT.x - 1, INITIAL_POINT.y - 1, INITIAL_POINT.z - 2.5),
    INITIAL_POINT.clone(),
  ],
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
    const { clock } = state;
    const time = clock.getElapsedTime();

    if (currentCurve && pathFollowingGroupRef.current) {
      const newProgress = pathProgress + delta * PATH_ANIMATION_SPEED_FACTOR;
      if (newProgress < 1) {
        setPathProgress(newProgress);
        const point = currentCurve.getPointAt(newProgress);
        pathFollowingGroupRef.current.position.copy(point);
        const tangent = currentCurve.getTangentAt(newProgress).normalize();
        const worldUpForOrientation = new THREE.Vector3(0, 1, 0);
        alignmentMatrix.lookAt(point, point.clone().add(tangent), worldUpForOrientation);
        targetQuaternion.setFromRotationMatrix(alignmentMatrix);
        targetQuaternion.multiply(yToZRotation);
        pathFollowingGroupRef.current.quaternion.slerp(targetQuaternion, 0.1);
      } else {
        pathFollowingGroupRef.current.position.copy(INITIAL_POINT);
        selectNextPath();
      }
    }

    if (flameRef.current) {
      const flameScaleBase = 0.9;
      const flameScaleFluctuation = 0.15;
      const flameScale = flameScaleBase + Math.sin(time * 30) * flameScaleFluctuation;
      flameRef.current.scale.set(flameScale, flameScale * 1.3, flameScale);
      (flameRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.random() * 0.8 + 2.8;
      (flameRef.current.material as THREE.MeshStandardMaterial).opacity = Math.random() * 0.25 + 0.7;
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
  // const { viewport } = useThree(); // <<-- THIS LINE WAS REMOVED/COMMENTED
  // It was causing the error because useThree() must be inside a Canvas descendant.

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [INITIAL_POINT.x, INITIAL_POINT.y + 2, 12], fov: 55, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneSetup /> {/* useThree() is correctly used here */}
          <ambientLight intensity={0.6} color={COLOR_TEXT_WHITE} />
          <directionalLight
            position={[INITIAL_POINT.x + 5, INITIAL_POINT.y + 8, 10]} intensity={1.8} color={COLOR_TEXT_WHITE} castShadow
            shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.0001}
          />
          <pointLight position={[INITIAL_POINT.x, INITIAL_POINT.y + 5, INITIAL_POINT.z + 5]} intensity={0.7} color={COLOR_ROCKET_WINDOW_EMISSIVE} distance={30} />
          <pointLight position={[INITIAL_POINT.x, INITIAL_POINT.y - 5, INITIAL_POINT.z]} intensity={0.5} color={COLOR_FLAME_PRIMARY} distance={20} />

          <React.Suspense fallback={null}>
            <RocketModel /> {/* useThree() could be used inside RocketModel if needed */}
          </React.Suspense>

          <OrbitControls
            enableZoom={true} enablePan={true}
            minDistance={3} maxDistance={50}
            autoRotate={false}
            target={INITIAL_POINT}
          />
        </Canvas>
      </div>
    </div>
  );
}