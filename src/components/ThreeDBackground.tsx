"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial, Environment, ContactShadows, PresentationControls, Text } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, type, speed = 1 }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time / 4) * 0.2;
      mesh.current.rotation.y = Math.cos(time / 4) * 0.2;
      mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1.5} floatIntensity={2}>
      {type === "sphere" && (
        <Sphere ref={mesh} args={[1, 64, 64]} position={position}>
          <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} />
        </Sphere>
      )}
      {type === "box" && (
        <mesh ref={mesh} position={position}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <MeshWobbleMaterial color={color} speed={1} factor={0.6} />
        </mesh>
      )}
      {type === "torus" && (
        <mesh ref={mesh} position={position} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.4, 32, 100]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
        </mesh>
      )}
    </Float>
  );
}

function Rig() {
  return useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2, 10), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}

export default function ThreeDBackground() {
  const shapes = useMemo(() => [
    { position: [-5, 3, -2], color: "#a855f7", type: "sphere", speed: 0.8 },
    { position: [5, -2, -3], color: "#3b82f6", type: "box", speed: 1.2 },
    { position: [-4, -4, -1], color: "#ec4899", type: "torus", speed: 0.5 },
    { position: [6, 4, -4], color: "#10b981", type: "sphere", speed: 1.5 },
    { position: [0, 6, -5], color: "#f59e0b", type: "torus", speed: 0.7 },
  ], []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <group position={[0, 0, 0]}>
            {shapes.map((shape, i) => (
              <FloatingShape key={i} {...shape} />
            ))}
          </group>
        </PresentationControls>

        <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
        <Rig />
      </Canvas>
    </div>
  );
}
