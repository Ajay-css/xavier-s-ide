// src/components/SpaceBackground.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Rocket() {
  const rocketRef = useRef();

  useFrame(({ mouse }) => {
    if (rocketRef.current) {
      rocketRef.current.position.x = mouse.x * 6;
      rocketRef.current.position.y = mouse.y * 3;
    }
  });

  return (
    <group ref={rocketRef}>
      {/* Rocket body */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.3, 1.2, 32]} />
        <meshStandardMaterial emissive="red" emissiveIntensity={1} />
      </mesh>

      {/* Fire trail */}
      <mesh position={[0, -0.8, 0]}>
        <coneGeometry args={[0.15, 0.4, 16]} />
        <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Asteroid({ position }) {
  const asteroidRef = useRef();

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.x += 0.01;
      asteroidRef.current.rotation.y += 0.01;
      asteroidRef.current.position.z += 0.08;

      if (asteroidRef.current.position.z > 5) {
        asteroidRef.current.position.z = -80;
        asteroidRef.current.position.x = Math.random() * 20 - 10;
        asteroidRef.current.position.y = Math.random() * 10 - 5;
      }
    }
  });

  return (
    <mesh ref={asteroidRef} position={position}>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial color="#888" metalness={0.4} roughness={0.8} />
    </mesh>
  );
}

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: "100%", height: "100vh", background: "black" }}
      >
        <color attach="background" args={["black"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <Stars radius={120} depth={60} count={8000} factor={3} saturation={0} fade />

        <Rocket />

        {Array.from({ length: 25 }).map((_, i) => (
          <Asteroid
            key={i}
            position={[
              Math.random() * 20 - 10,
              Math.random() * 10 - 5,
              -Math.random() * 80,
            ]}
          />
        ))}
      </Canvas>
    </div>
  );
}
