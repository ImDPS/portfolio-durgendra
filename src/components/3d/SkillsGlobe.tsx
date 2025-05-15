'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/store/theme-store';
import { useReducedMotion } from '@/utils/use-reduced-motion';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Skill {
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

const skillsData: Skill[] = [
  { name: 'React', level: 9, category: 'frontend' },
  { name: 'TypeScript', level: 8, category: 'frontend' },
  { name: 'Node.js', level: 7, category: 'backend' },
  { name: 'Next.js', level: 8, category: 'frontend' },
  { name: 'GraphQL', level: 6, category: 'backend' },
  { name: 'Three.js', level: 7, category: 'frontend' },
  { name: 'GSAP', level: 8, category: 'frontend' },
  { name: 'Framer Motion', level: 8, category: 'frontend' },
  { name: 'Figma', level: 7, category: 'design' },
  { name: 'Git', level: 9, category: 'tools' },
  { name: 'Docker', level: 6, category: 'tools' },
  { name: 'PostgreSQL', level: 7, category: 'backend' },
  { name: 'MongoDB', level: 7, category: 'backend' },
  { name: 'Tailwind CSS', level: 9, category: 'frontend' },
  { name: 'REST API', level: 8, category: 'backend' },
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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const { positions, colors, sizes } = generateGlobePoints();
  
  // Set up points geometry and material
  useEffect(() => {
    if (pointsRef.current) {
      // Create geometry with positions and colors
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      // Apply to the mesh
      pointsRef.current.geometry = geometry;
    }
  }, [positions, colors]);
  
  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    
    const t = clock.getElapsedTime() * 0.1;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t;
      pointsRef.current.rotation.z = Math.sin(t) * 0.1;
    }
  });

  // Custom ray casting for hover effects
  const handlePointerMove = (event: any) => {
    if (pointsRef.current && event.intersections && event.intersections.length > 0) {
      const intersection = event.intersections[0];
      if (intersection.index !== undefined) {
        setHovered(intersection.index);
        setHoveredSkill(skillsData[intersection.index]?.name || null);
      }
    } else {
      setHovered(null);
      setHoveredSkill(null);
    }
  };

  return (
    <group>
      <points 
        ref={pointsRef}
        onPointerMove={handlePointerMove}
        onPointerOut={() => {
          setHovered(null);
          setHoveredSkill(null);
        }}
      >
        <bufferGeometry />
        <pointsMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
      
      {/* Render skill name on hover */}
      {hovered !== null && (
        <mesh position={[positions[hovered * 3], positions[hovered * 3 + 1], positions[hovered * 3 + 2]]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      )}
      
      {hoveredSkill && (
        <mesh>
          {/* This is just a dummy mesh to hold the userData for skill name display */}
          <boxGeometry args={[0.01, 0.01, 0.01]} />
          <meshBasicMaterial opacity={0} transparent />
          <primitive
            object={new THREE.Object3D()}
            userData={{ skillName: hoveredSkill }}
          />
        </mesh>
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
    <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 p-3 rounded-md text-sm">
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