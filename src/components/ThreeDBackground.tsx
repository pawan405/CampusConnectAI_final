"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial, Environment, ContactShadows, PresentationControls, Sparkles, TorusKnot, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, type, speed = 1, size = 1 }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time / 4) * 0.3;
      mesh.current.rotation.y = Math.cos(time / 4) * 0.3;
      mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.6;
      // Mouse interaction
      const targetX = (state.mouse.x * 2);
      const targetY = (state.mouse.y * 2);
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, position[0] + targetX, 0.05);
      mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, position[2] + targetY, 0.05);
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={2} floatIntensity={2}>
      {type === "sphere" && (
        <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
          <MeshDistortMaterial color={color} speed={3} distort={0.5} radius={1} />
        </Sphere>
      )}
      {type === "box" && (
        <mesh ref={mesh} position={position}>
          <boxGeometry args={[size * 1.5, size * 1.5, size * 1.5]} />
          <MeshWobbleMaterial color={color} speed={2} factor={0.8} />
        </mesh>
      )}
      {type === "torus" && (
        <mesh ref={mesh} position={position} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size, 0.4 * size, 32, 100]} />
          <meshStandardMaterial color={color} roughness={0} metalness={1} envMapIntensity={2} />
        </mesh>
      )}
      {type === "knot" && (
        <TorusKnot ref={mesh} args={[size, 0.3 * size, 128, 32]} position={position}>
          <meshPhysicalMaterial 
            color={color} 
            roughness={0.1} 
            metalness={0.8} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </TorusKnot>
      )}
    </Float>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 4, mouse.y * 4, 12), 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ThreeDBackground() {
  const shapes = useMemo(() => [
    { position: [-6, 4, -5], color: "#a855f7", type: "sphere", speed: 0.8, size: 1.2 },
    { position: [7, -3, -4], color: "#3b82f6", type: "box", speed: 1.2, size: 1 },
    { position: [-5, -5, -2], color: "#ec4899", type: "torus", speed: 0.5, size: 1.1 },
    { position: [8, 5, -6], color: "#10b981", type: "knot", speed: 1.5, size: 0.8 },
    { position: [0, 8, -8], color: "#f59e0b", type: "torus", speed: 0.7, size: 1.5 },
    { position: [-8, 0, -3], color: "#ef4444", type: "knot", speed: 0.9, size: 0.7 },
  ], []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <ambientLight intensity={0.4} />
        <spotLight position={[15, 15, 15]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#3b82f6" />
        
        <PresentationControls
          global
          config={{ mass: 1, tension: 200 }}
          snap={{ mass: 2, tension: 400 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <group position={[0, 0, 0]}>
            {shapes.map((shape, i) => (
              <FloatingShape key={i} {...shape} />
            ))}
          </group>
        </PresentationControls>

        <Sparkles count={80} scale={20} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
        
        <ContactShadows 
          position={[0, -6, 0]} 
          opacity={0.5} 
          scale={30} 
          blur={2.5} 
          far={10} 
          color="#000000"
        />
        
        <Environment preset="night" />
        <Rig />
      </Canvas>
    </div>
  );
}
