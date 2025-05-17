'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'; // Using Drei for OrbitControls

const SYNAPSE_SCALE = 3; // General scale of the visualization

// --- Configuration Constants ---
const NUM_LAYERS = 3;
const NODES_PER_LAYER_BASE = [8, 15, 25]; // Nodes per layer
const LAYER_RADIUS_INCREMENT = 1.2 * SYNAPSE_SCALE;
const CORE_NODE_SIZE = 0.3 * SYNAPSE_SCALE;
const SATELLITE_NODE_SIZE = 0.15 * SYNAPSE_SCALE;
const CONNECTION_PROBABILITY = 0.15; // Chance to connect nodes between layers or within a layer

const COLOR_BACKGROUND = '#03001C'; // Dark deep blue/purple
const COLOR_CORE_NODE = new THREE.Color(0xffaa44); // Warm core
const COLOR_SATELLITE_NODE = new THREE.Color(0x44aaff); // Cool satellites
const COLOR_EDGE = new THREE.Color(0x00dddd); // Cyan edges
const COLOR_PARTICLE = new THREE.Color(0xffffff); // Bright white particles
const COLOR_NODE_HOVER = new THREE.Color(0xff00ff); // Magenta hover
const COLOR_EDGE_HOVER_ORIGIN = new THREE.Color(0xff88ff); // Lighter magenta for edges from hovered node
const COLOR_EDGE_HOVER_TARGET = new THREE.Color(0x88ffff); // Lighter cyan for edges to hovered node


interface NodeData {
  id: string;
  position: THREE.Vector3;
  color: THREE.Color;
  size: number;
  layer: number;
}

interface EdgeData {
  id: string;
  from: string;
  to: string;
  color: THREE.Color;
  originalColor: THREE.Color;
}

interface ParticleData {
  id: string;
  edgeId: string;
  progress: number; // 0 to 1
  speed: number;
  position: THREE.Vector3;
}

// --- Helper Functions ---
const generateNodeId = (layer: number, index: number) => `l${layer}-n${index}`;

const generateFibonacciSpherePosition = (index: number, totalPoints: number, radius: number, randomOffsetFactor: number = 0.1): THREE.Vector3 => {
  const phi = Math.acos(-1 + (2 * index) / totalPoints);
  const theta = Math.sqrt(totalPoints * Math.PI) * phi;
  
  let x = radius * Math.sin(phi) * Math.cos(theta);
  let y = radius * Math.sin(phi) * Math.sin(theta);
  let z = radius * Math.cos(phi);

  // Add slight random offset to break perfect symmetry
  x += (Math.random() - 0.5) * radius * randomOffsetFactor;
  y += (Math.random() - 0.5) * radius * randomOffsetFactor;
  z += (Math.random() - 0.5) * radius * randomOffsetFactor;
  
  return new THREE.Vector3(x, y, z);
};


// --- SynapseNode Component ---
interface SynapseNodeProps {
  nodeData: NodeData;
  onPointerOver: (id: string) => void;
  onPointerOut: () => void;
  isHovered: boolean;
  baseColor: THREE.Color;
}

function SynapseNode({ nodeData, onPointerOver, onPointerOut, isHovered, baseColor }: SynapseNodeProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [currentColor, setCurrentColor] = useState(baseColor);

  useEffect(() => {
    setCurrentColor(isHovered ? COLOR_NODE_HOVER : baseColor);
  }, [isHovered, baseColor]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Subtle pulsing animation
    const pulse = Math.sin(time * 2 + nodeData.position.x) * 0.1 + 0.95;
    ref.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh
      ref={ref}
      position={nodeData.position}
      castShadow
      onPointerOver={(e) => { e.stopPropagation(); onPointerOver(nodeData.id); }}
      onPointerOut={(e) => { e.stopPropagation(); onPointerOut(); }}
    >
      <sphereGeometry args={[nodeData.size, 16, 16]} />
      <meshStandardMaterial
        color={currentColor}
        emissive={currentColor}
        emissiveIntensity={isHovered ? 1.5 : 0.7}
        metalness={0.2}
        roughness={0.5}
      />
    </mesh>
  );
}


// --- DigitalSynapse Core Component ---
function DigitalSynapseModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const { clock } = useThree();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const newNodes: NodeData[] = [];
    const newEdges: EdgeData[] = [];

    // Create core node
    const coreNodeId = generateNodeId(0, 0);
    newNodes.push({
      id: coreNodeId,
      position: new THREE.Vector3(0, 0, 0),
      color: COLOR_CORE_NODE,
      size: CORE_NODE_SIZE,
      layer: 0,
    });

    let currentRadius = LAYER_RADIUS_INCREMENT;
    for (let i = 0; i < NUM_LAYERS; i++) {
      const numNodesInLayer = Math.floor(NODES_PER_LAYER_BASE[i] * (1 + (Math.random() - 0.5) * 0.3)); // Vary count slightly
      for (let j = 0; j < numNodesInLayer; j++) {
        const nodeId = generateNodeId(i + 1, j);
        newNodes.push({
          id: nodeId,
          position: generateFibonacciSpherePosition(j, numNodesInLayer, currentRadius, 0.2),
          color: COLOR_SATELLITE_NODE,
          size: SATELLITE_NODE_SIZE * (1 - i * 0.1), // Smaller nodes in outer layers
          layer: i + 1,
        });
      }
      currentRadius += LAYER_RADIUS_INCREMENT * (1 + (Math.random() - 0.5) * 0.2);
    }

    // Create edges
    newNodes.forEach(node1 => {
      newNodes.forEach(node2 => {
        if (node1.id === node2.id) return;

        const d = node1.position.distanceTo(node2.position);
        let connectionProb = 0;

        if (node1.layer === 0 && node2.layer === 1) { // Core to Layer 1
          connectionProb = 0.8;
        } else if (Math.abs(node1.layer - node2.layer) === 1) { // Between adjacent layers
          connectionProb = CONNECTION_PROBABILITY * 2;
        } else if (node1.layer === node2.layer && node1.layer !== 0) { // Within the same non-core layer
          connectionProb = CONNECTION_PROBABILITY * 0.5;
        }
        
        // Increase probability for closer nodes within reason
        if (d < LAYER_RADIUS_INCREMENT * 1.5) connectionProb *= 1.5;
        if (d > LAYER_RADIUS_INCREMENT * 2.5) connectionProb *= 0.2;


        if (Math.random() < connectionProb) {
          // Avoid duplicate edges
          if (!newEdges.find(e => (e.from === node1.id && e.to === node2.id) || (e.from === node2.id && e.to === node1.id))) {
             newEdges.push({
                id: `${node1.id}-${node2.id}`,
                from: node1.id,
                to: node2.id,
                color: COLOR_EDGE,
                originalColor: COLOR_EDGE,
             });
          }
        }
      });
    });
    return { nodes: newNodes, edges: newEdges };
  }, []);

  const [particles, setParticles] = useState<ParticleData[]>([]);

  // Initialize and update particles
  useEffect(() => {
    if (!edges.length || !nodes.length) return;
    
    const initialParticles: ParticleData[] = [];
    edges.forEach((edge, index) => {
      if (index % 4 === 0) { // Don't overpopulate with particles, one for every few edges
        initialParticles.push({
          id: `p-${edge.id}-${Math.random().toString(36).substr(2, 5)}`,
          edgeId: edge.id,
          progress: Math.random(), // Start at random points
          speed: (Math.random() * 0.003 + 0.001) * SYNAPSE_SCALE, // Vary speeds
          position: new THREE.Vector3(), // Will be calculated
        });
      }
    });
    setParticles(initialParticles);
  }, [edges, nodes]);


  useFrame((state, delta) => {
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y += delta * 0.03; // Slow rotation of the whole structure
    groupRef.current.rotation.x += delta * 0.015;

    // Animate particles
    setParticles(prevParticles => 
      prevParticles.map(p => {
        let newProgress = p.progress + p.speed;
        if (newProgress >= 1) {
          newProgress = 0; // Reset particle
        }
        const edge = edges.find(e => e.id === p.edgeId);
        if (!edge) return { ...p, position: new THREE.Vector3(10000,10000,10000) }; // Hide if edge not found

        const sourceNode = nodes.find(n => n.id === edge.from);
        const targetNode = nodes.find(n => n.id === edge.to);

        if (!sourceNode || !targetNode) return { ...p, position: new THREE.Vector3(10000,10000,10000) };

        const newPosition = new THREE.Vector3().lerpVectors(sourceNode.position, targetNode.position, newProgress);
        return { ...p, progress: newProgress, position: newPosition };
      }).filter(p => p.position.x < 9999) // Remove particles whose edges disappeared (defensive)
    );
  });


  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    });
    return positions;
  }, [particles]);

  const edgeLineSegments = useMemo(() => {
    const lines: JSX.Element[] = [];
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.from);
      const targetNode = nodes.find(n => n.id === edge.to);
      if (!sourceNode || !targetNode) return;

      let edgeColor = edge.originalColor;
      if (hoveredNodeId) {
        if (edge.from === hoveredNodeId) edgeColor = COLOR_EDGE_HOVER_ORIGIN;
        else if (edge.to === hoveredNodeId) edgeColor = COLOR_EDGE_HOVER_TARGET;
      }

      lines.push(
        <line key={edge.id}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...sourceNode.position.toArray(), ...targetNode.position.toArray()])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            attach="material"
            color={edgeColor}
            linewidth={hoveredNodeId && (edge.from === hoveredNodeId || edge.to === hoveredNodeId) ? 1.5 : 0.7}
            transparent
            opacity={hoveredNodeId && (edge.from === hoveredNodeId || edge.to === hoveredNodeId) ? 0.9 : 0.35}
          />
        </line>
      );
    });
    return lines;
  }, [edges, nodes, hoveredNodeId]);


  return (
    <group ref={groupRef}>
      {nodes.map(node => (
        <SynapseNode
          key={node.id}
          nodeData={node}
          onPointerOver={setHoveredNodeId}
          onPointerOut={() => setHoveredNodeId(null)}
          isHovered={hoveredNodeId === node.id || (edges.some(e => (e.from === hoveredNodeId && e.to === node.id) || (e.to === hoveredNodeId && e.from === node.id)))}
          baseColor={node.color}
        />
      ))}
      
      {edgeLineSegments}

      {particles.length > 0 && (
        <points>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={particles.length}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            attach="material"
            size={SYNAPSE_SCALE * 0.035}
            color={COLOR_PARTICLE}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false} 
          />
        </points>
      )}
    </group>
  );
}

// --- Main Export Component ---
export default function InteractiveSynapse() {
  return (
    <div className="w-full h-screen lg:h-[calc(100vh-4rem)] relative cursor-grab active:cursor-grabbing" style={{ background: COLOR_BACKGROUND }}>
      <Canvas
        shadows
        camera={{
          position: [0, SYNAPSE_SCALE * 1.5, SYNAPSE_SCALE * 5],
          fov: 60,
          near: 0.1,
          far: 100 * SYNAPSE_SCALE,
        }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} color="#5588ff" />
        <pointLight
          position={[0, 0, SYNAPSE_SCALE * 2]}
          intensity={1.5}
          color="#ffffff"
          distance={SYNAPSE_SCALE * 15}
        />
        <directionalLight
            position={[SYNAPSE_SCALE * 5, SYNAPSE_SCALE * 5, SYNAPSE_SCALE * 3]}
            intensity={0.8}
            color="#ffccaa"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
        
        <DigitalSynapseModel />
        
        <OrbitControls
          enablePan={false}
          minDistance={SYNAPSE_SCALE * 1.5}
          maxDistance={SYNAPSE_SCALE * 10}
          autoRotate
          autoRotateSpeed={0.3}
        />
        {/* For a more "amazing" feel, consider adding post-processing effects like Bloom if performance allows */}
        {/* Example with @react-three/postprocessing:
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.8} />
          </EffectComposer>
        */}
      </Canvas>
    </div>
  );
}