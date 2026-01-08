"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Stars,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function Planet({ position, color, size, speed, distort }: any) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing({ radius, color, rotationSpeed, opacity = 0.1 }: any) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += rotationSpeed;
      ref.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.02, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Particles({ count = 40 }) {
  const { viewport } = useThree();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 500;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      const s = Math.cos(t) * 0.5 + 0.5;
      dummy.position.set(
        xFactor + Math.cos(t / 10) * factor + viewport.width / 2,
        yFactor + Math.sin(t / factor) * factor + viewport.height / 2,
        zFactor + Math.cos(t / 10) * factor
      );
      dummy.scale.set(s * 0.5, s * 0.5, s * 0.5);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[new THREE.DodecahedronGeometry(0.1, 0), undefined, count]}
    >
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={2}
      />
    </instancedMesh>
  );
}

function Scene() {
  const { mouse, camera } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 15));

  useFrame(() => {
    targetCameraPos.current.x = THREE.MathUtils.lerp(
      targetCameraPos.current.x,
      mouse.x * 2,
      0.02
    );
    targetCameraPos.current.y = THREE.MathUtils.lerp(
      targetCameraPos.current.y,
      mouse.y * 2,
      0.02
    );
    camera.position.copy(targetCameraPos.current);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#020205"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />

      {/* Central "Sun" or Core */}
      <Planet position={[0, 0, -5]} color="#06b6d4" size={1.5} speed={0.4} distort={0.2} />
      
      {/* Orbital Rings */}
      <OrbitalRing radius={4} color="#06b6d4" rotationSpeed={0.001} opacity={0.15} />
      <OrbitalRing radius={7} color="#8b5cf6" rotationSpeed={-0.0005} opacity={0.1} />
      <OrbitalRing radius={10} color="#06b6d4" rotationSpeed={0.0008} opacity={0.05} />

      {/* Floating Planets */}
      <Planet position={[-6, 3, -8]} color="#8b5cf6" size={0.8} speed={0.6} distort={0.4} />
      <Planet position={[7, -4, -10]} color="#0ea5e9" size={1.2} speed={0.3} distort={0.3} />
      <Planet position={[-8, -5, -6]} color="#2dd4bf" size={0.5} speed={0.8} distort={0.5} />

      <Particles count={50} />

      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  );
}

export default function ThreeDBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#020205]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/20 via-[#020205]/80 to-[#020205] pointer-events-none" />
    </div>
  );
}
