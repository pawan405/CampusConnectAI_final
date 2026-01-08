"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Float,
  Stars,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function Blob({ position, color, speed, distort, radius, scale }: any) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[radius, 16, 16]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 30 }) {
  const { viewport } = useThree();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
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
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      dummy.position.set(
        xFactor + Math.cos(t / 10) * factor + viewport.width / 2,
        yFactor + Math.sin(t / factor) * factor + viewport.height / 2,
        zFactor + Math.cos(t / 10) * factor
      );
      dummy.scale.set(s, s, s);
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
        color="#2dd4bf"
        emissive="#2dd4bf"
        emissiveIntensity={1}
      />
    </instancedMesh>
  );
}

function Scene() {
  const { mouse, camera } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 10));

  useFrame(() => {
    targetCameraPos.current.x = THREE.MathUtils.lerp(
      targetCameraPos.current.x,
      mouse.x * 1,
      0.03
    );
    targetCameraPos.current.y = THREE.MathUtils.lerp(
      targetCameraPos.current.y,
      mouse.y * 1,
      0.03
    );
    camera.position.copy(targetCameraPos.current);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#020205"]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

      <Blob
        position={[-3, 2, -5]}
        color="#2dd4bf"
        speed={0.5}
        distort={0.3}
        radius={1.5}
        scale={1}
      />
      <Blob
        position={[4, -2, -8]}
        color="#8b5cf6"
        speed={0.4}
        distort={0.4}
        radius={2}
        scale={1.2}
      />

      <Particles count={25} />

      <Stars
        radius={50}
        depth={50}
        count={1000}
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
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/10 via-[#050508]/60 to-[#050508] pointer-events-none" />
    </div>
  );
}
