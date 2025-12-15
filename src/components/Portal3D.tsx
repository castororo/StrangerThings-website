import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Particle system for the portal
function PortalParticles({ count = 2000 }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff3333"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Spiral particles moving inward
function SpiralParticles({ count = 500 }) {
  const ref = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array>();
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const theta = t * Math.PI * 8;
      const radius = 3 - t * 2.5;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (t - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    initialPositions.current = positions.slice();
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current && initialPositions.current) {
      const positionArray = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const t = ((i / count) + state.clock.elapsedTime * 0.1) % 1;
        const theta = t * Math.PI * 8 + state.clock.elapsedTime;
        const radius = 3 - t * 2.5;
        positionArray[i * 3] = Math.cos(theta) * radius;
        positionArray[i * 3 + 1] = (t - 0.5) * 3;
        positionArray[i * 3 + 2] = Math.sin(theta) * radius;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff6666"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Glowing portal ring
function PortalRing() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.003;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2, 0.08, 16, 64]} />
      <meshStandardMaterial
        color="#ff0000"
        emissive="#ff0000"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

// Inner portal void
function PortalVoid() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z -= 0.001;
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.9, 64]} />
      <meshStandardMaterial
        color="#220000"
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Vine tendrils
function Vines() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((vine, i) => {
        vine.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.1;
      });
    }
  });

  const vines = useMemo(() => {
    const vineData = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      vineData.push({
        position: [Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, -0.5] as [number, number, number],
        rotation: [0, 0, angle + Math.PI / 2] as [number, number, number],
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    return vineData;
  }, []);

  return (
    <group ref={groupRef}>
      {vines.map((vine, i) => (
        <mesh key={i} position={vine.position} rotation={vine.rotation} scale={vine.scale}>
          <cylinderGeometry args={[0.02, 0.04, 1, 8]} />
          <meshStandardMaterial color="#1a0505" />
        </mesh>
      ))}
    </group>
  );
}

// Fog particles
function FogParticles({ count = 300 }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const positionArray = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positionArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff2222"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Scene component
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 3]} intensity={2} color="#ff3333" />
      <pointLight position={[0, 0, -3]} intensity={1} color="#ff0000" />
      
      <group ref={groupRef}>
        <PortalRing />
        <PortalVoid />
        <PortalParticles />
        <SpiralParticles />
        <Vines />
      </group>
      
      <FogParticles />
    </>
  );
}

interface Portal3DProps {
  className?: string;
}

export default function Portal3D({ className = '' }: Portal3DProps) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}