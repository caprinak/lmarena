import { forwardRef } from "react";
import * as THREE from "three";

interface CoachProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export const Coach = forwardRef<THREE.Group, CoachProps>(
  ({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#3b82f6" }, ref) => {
    return (
      <group ref={ref} position={position} rotation={rotation}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.7, 2.2]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>

        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[1.1, 0.5, 1.8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        <mesh position={[0, 0.2, -1.11]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.1, 0.35, 0.1]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.5} />
        </mesh>

        <mesh position={[0, 0.2, 1.11]} rotation={[0, Math.PI, 0]}>
          <boxGeometry args={[1.1, 0.35, 0.1]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.5} />
        </mesh>

        {[-0.6, 0.6].map((x) =>
          [-0.7, 0.7].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -0.45, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
              <meshStandardMaterial color="#1f2937" />
            </mesh>
          ))
        )}

        {[-0.5, 0.5].map((x, i) => (
          <mesh key={`window-${i}`} position={[x, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.6, 0.25, 0.05]} />
            <meshStandardMaterial color="#bfdbfe" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    );
  }
);

Coach.displayName = "Coach";
