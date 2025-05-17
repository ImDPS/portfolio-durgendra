'use client';

import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/store/theme-store';
import { useReducedMotion } from '@/utils/use-reduced-motion';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Html } from '@react-three/drei';

interface Skill {
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

const skillsData: Skill[] = [
  { name: 'React', level: 9, category: 'frontend' },
  { name: 'NextJS', level: 9, category: 'frontend' },
  { name: 'React Native', level: 8, category: 'frontend' },
  { name: 'Django', level: 8, category: 'backend' },
  { name: 'OpenLayer', level: 8, category: 'frontend' },
  { name: 'GeoServer', level: 8, category: 'backend' },
  { name: 'PostGIS', level: 8, category: 'backend' },
  { name: 'Maplibre GL JS', level: 7, category: 'frontend' },
  { name: 'Deck.gl', level: 7, category: 'frontend' },
  { name: 'Scikit-Learn', level: 9, category: 'tools' },
  { name: 'SciPy', level: 8, category: 'tools' },
  { name: 'NumPy', level: 9, category: 'tools' },
  { name: 'Pandas', level: 9, category: 'tools' },
  { name: 'TensorFlow', level: 8, category: 'tools' },
  { name: 'PyTorch', level: 7, category: 'tools' },
  { name: 'OpenCV', level: 7, category: 'tools' },
  { name: 'PostgreSQL', level: 8, category: 'backend' },
  { name: 'Firebase', level: 7, category: 'backend' },
  { name: 'MongoDB', level: 7, category: 'backend' },
  { name: 'Python', level: 10, category: 'tools' },
  { name: 'JavaScript', level: 9, category: 'frontend' },
  { name: 'R', level: 7, category: 'tools' },
  { name: 'HTML', level: 9, category: 'frontend' },
  { name: 'CSS', level: 9, category: 'frontend' },
  { name: 'SQL', level: 8, category: 'backend' },
  { name: 'Tableau', level: 7, category: 'tools' },
  { name: 'Power BI', level: 7, category: 'tools' },
  { name: 'Talend', level: 6, category: 'tools' },
  { name: 'KNIME', level: 6, category: 'tools' },
  { name: 'GCP', level: 7, category: 'tools' },
  { name: 'AWS', level: 7, category: 'tools' },
  { name: 'Arduino Uno', level: 6, category: 'tools' },
  { name: 'Raspberry Pi', level: 6, category: 'tools' },
];

// Convert skills to points on a sphere
function generateGlobePoints() {
  const points = new Float32Array(skillsData.length * 3);
  const colors = new Float32Array(skillsData.length * 3);
  const sizes = new Float32Array(skillsData.length);
  
  // Color categories
  const categoryColors = {
    frontend: new THREE.Color(0x3498db), // blue
    backend: new THREE.Color(0x2ecc71),  // green
    design: new THREE.Color(0xe74c3c),   // red
    tools: new THREE.Color(0xf39c12)     // orange
  };
  
  skillsData.forEach((skill, i) => {
    // Create points in a sphere using fibonacci sphere algorithm
    const phi = Math.acos(-1 + (2 * i) / skillsData.length);
    const theta = Math.sqrt(skillsData.length * Math.PI) * phi;
    
    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(phi);
    
    // Position
    points[i * 3] = x * 1.5;
    points[i * 3 + 1] = y * 1.5;
    points[i * 3 + 2] = z * 1.5;
    
    // Size (based on skill level)
    sizes[i] = (skill.level / 10) * 0.5 + 0.2;
    
    // Color
    const color = categoryColors[skill.category];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  });
  
  return { positions: points, colors, sizes };
}

function SkillsPoints({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<[number, number, number] | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout>();
  const lastHoverPosition = useRef<[number, number, number] | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const { positions, colors, sizes } = generateGlobePoints();
  
  // Set up points geometry and material
  useEffect(() => {
    if (pointsRef.current) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      pointsRef.current.geometry = geometry;
    }
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, [positions, colors]);
  
  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    
    const t = clock.getElapsedTime() * 0.1;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t;
      pointsRef.current.rotation.z = Math.sin(t) * 0.1;
    }
  });

  // Handle pointer move with debouncing
  const handlePointerMove = (event: any) => {
    if (!pointsRef.current) return;
    
    // Get all intersections
    const intersections = event.intersections || [];
    
    if (intersections.length === 0) {
      if (showTooltip) {
        setShowTooltip(false);
        setHovered(null);
        setHoveredSkill(null);
        setHoveredPosition(null);
      }
      return;
    }

    const intersection = intersections[0];
    if (intersection.index === undefined) return;
    
    const skill = skillsData[intersection.index];
    if (!skill) return;
    
    const newPosition: [number, number, number] = [
      positions[intersection.index * 3],
      positions[intersection.index * 3 + 1] + 0.3, // Slightly above the point
      positions[intersection.index * 3 + 2],
    ];
    
    // Update position immediately for smooth movement
    lastHoverPosition.current = newPosition;
    
    // Only update state if we don't have a current hover or if the skill changed
    if (hovered !== intersection.index || hoveredSkill?.name !== skill.name) {
      setHovered(intersection.index);
      setHoveredSkill(skill);
      setHoveredPosition(newPosition);
      
      // Small delay before showing tooltip to reduce flicker
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 100);
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <group>
      <points 
        ref={pointsRef}
        onPointerOver={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerOut={() => {
          setShowTooltip(false);
          setHovered(null);
          setHoveredSkill(null);
          setHoveredPosition(null);
          lastHoverPosition.current = null;
          if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
          }
        }}
      >
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
          transparent
          vertexColors
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
      
      {/* Highlight hovered point */}
      {hovered !== null && hoveredPosition && (
        <mesh position={hoveredPosition}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial 
            color="#f59e42" 
            emissive="#f59e42"
            emissiveIntensity={0.5}
            transparent 
            opacity={0.8}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      )}
      
      {/* Tooltip for hovered skill */}
      {hoveredSkill && hoveredPosition && showTooltip && (
        <Html
          position={hoveredPosition}
          center
          style={{
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            transform: 'translateY(10px)',
            opacity: showTooltip ? 1 : 0,
          }}
          zIndexRange={[100, 0]}
          className="transform -translate-x-1/2 -translate-y-full -mt-4"
        >
          <div 
            ref={tooltipRef}
            className="px-4 py-3 rounded-lg bg-gray-900/95 backdrop-blur-sm text-white text-sm shadow-xl border border-gray-700/50 transform transition-all duration-200 min-w-[140px]"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="font-semibold text-primary-300 mb-1">{hoveredSkill.name}</div>
            <div className="flex items-center">
              <div className="h-1.5 bg-gray-700 rounded-full flex-1 mr-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  style={{ width: `${(hoveredSkill.level / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-gray-300">{hoveredSkill.level}/10</span>
            </div>
            <div className="text-xs mt-2 text-gray-400 capitalize">{hoveredSkill.category}</div>
            
            {/* Tooltip arrow */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900/95 rotate-45 -z-10" 
                 style={{
                   clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
                   borderBottomRightRadius: '2px',
                   borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                   borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                 }}
            />
          </div>
        </Html>
      )}
    </group>
  );
}

// Fallback for Suspense
function GlobeLoader() {
  return (
    <mesh>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

// Display skills as a legend
const SkillLegend = () => {
  const categories = ['frontend', 'backend', 'design', 'tools'];
  const categoryColors = {
    frontend: '#3498db',
    backend: '#2ecc71',
    design: '#e74c3c',
    tools: '#f39c12'
  };
  
  return (
    <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 p-3 rounded-md text-sm z-20">
      <h4 className="font-medium mb-2">Legend</h4>
      <div className="space-y-1">
        {categories.map(category => (
          <div key={category} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] }}
            />
            <span className="capitalize">{category}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
        <span className="block">Hover over a point to see the skill and level.</span>
        <span className="block">Point size = skill level.</span>
      </div>
    </div>
  );
};

export default function SkillsGlobe() {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <LoadingSpinner size="lg" color="primary" />
        </div>
      )}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<GlobeLoader />}>
          <SkillsPoints prefersReducedMotion={prefersReducedMotion} />
          <fog
            attach="fog"
            color={resolvedTheme === 'dark' ? '#1e293b' : '#f8fafc'}
            near={3.5}
            far={15}
          />
        </Suspense>
      </Canvas>
      <SkillLegend />
      <div className="absolute bottom-4 left-4 text-xs text-gray-600 dark:text-gray-400">
        Hover over points to see skills
      </div>
    </div>
  );
} 