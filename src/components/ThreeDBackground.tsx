"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial, Environment, ContactShadows, PresentationControls, Sparkles, TorusKnot, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Use React.createElement to bypass the component tagger loader for Three.js elements
const c = React.createElement;

function FloatingShape({ position, color, type, speed = 1, size = 1 }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time / 4) * 0.3;
      mesh.current.rotation.y = Math.cos(time / 4) * 0.3;
      mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.6;
      const targetX = (state.mouse.x * 2);
      const targetY = (state.mouse.y * 2);
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, position[0] + targetX, 0.05);
      mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, position[2] + targetY, 0.05);
    }
  });

  const content = useMemo(() => {
    if (type === "sphere") {
      return c(Sphere, { ref: mesh, args: [size, 64, 64], position }, 
        c(MeshDistortMaterial, { color, speed: 3, distort: 0.5, radius: 1 })
      );
    }
    if (type === "box") {
      return c("mesh", { ref: mesh, position },
        c("boxGeometry", { args: [size * 1.5, size * 1.5, size * 1.5] }),
        c(MeshWobbleMaterial, { color, speed: 2, factor: 0.8 })
      );
    }
    if (type === "torus") {
      return c("mesh", { ref: mesh, position, rotation: [Math.PI / 2, 0, 0] },
        c("torusGeometry", { args: [size, 0.4 * size, 32, 100] }),
        c("meshStandardMaterial", { color, roughness: 0, metalness: 1, envMapIntensity: 2 })
      );
    }
    if (type === "knot") {
      return c(TorusKnot, { ref: mesh, args: [size, 0.3 * size, 128, 32], position },
        c("meshPhysicalMaterial", { 
          color, 
          roughness: 0.1, 
          metalness: 0.8, 
          clearcoat: 1, 
          clearcoatRoughness: 0.1 
        })
      );
    }
    return null;
  }, [type, size, position, color]);

  return c(Float, { speed: 2 * speed, rotationIntensity: 2, floatIntensity: 2 }, content);
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
      {c(Canvas, { shadows: true, dpr: [1, 2] },
        c(PerspectiveCamera, { makeDefault: true, position: [0, 0, 12], fov: 45 }),
        c("ambientLight", { intensity: 0.4 }),
        c("spotLight", { position: [15, 15, 15], angle: 0.15, penumbra: 1, intensity: 2, castShadow: true }),
        c("pointLight", { position: [-15, -15, -15], intensity: 1.5, color: "#3b82f6" }),
        
        c(PresentationControls, {
          global: true,
          config: { mass: 1, tension: 200 },
          snap: { mass: 2, tension: 400 },
          rotation: [0, 0, 0],
          polar: [-Math.PI / 4, Math.PI / 4],
          azimuth: [-Math.PI / 2, Math.PI / 2]
        }, 
          c("group", { position: [0, 0, 0] },
            shapes.map((shape, i) => c(FloatingShape, { key: i, ...shape }))
          )
        ),

        c(Sparkles, { count: 80, scale: 20, size: 2, speed: 0.4, opacity: 0.3, color: "#ffffff" }),
        
        c(ContactShadows, { 
          position: [0, -6, 0], 
          opacity: 0.5, 
          scale: 30, 
          blur: 2.5, 
          far: 10, 
          color: "#000000"
        }),
        
        c(Environment, { preset: "night" }),
        c(Rig)
      )}
    </div>
  );
}
