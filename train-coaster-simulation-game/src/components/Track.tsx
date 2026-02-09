import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../store/gameStore";

export function Track() {
  const { trackPoints, isPlaying } = useGameStore();
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  const { curve, tubeGeometry } = useMemo(() => {
    if (trackPoints.length < 2) {
      return { curve: null, tubeGeometry: null };
    }

    const curve = new THREE.CatmullRomCurve3(trackPoints);
    curve.curveType = "catmullrom";
    curve.tension = 0.5;
    curveRef.current = curve;

    // Create tube geometry
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.2, 8, false);
    
    return { curve, tubeGeometry };
  }, [trackPoints]);

  // Calculate supports
  const supports = useMemo(() => {
    if (!curve) return [];
    const points = [];
    const divisions = Math.floor(curve.getLength() / 2); // Support every 2 units
    for (let i = 0; i <= divisions; i++) {
      const t = i / divisions;
      const point = curve.getPointAt(t);
      points.push(point);
    }
    return points;
  }, [curve]);

  if (!curve) return null;

  return (
    <group>
      {/* Track Rails */}
      <mesh geometry={tubeGeometry} castShadow receiveShadow>
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Track Bed ( Wooden planks or metal bed ) */}
      <mesh geometry={tubeGeometry} castShadow receiveShadow scale={[1.5, 0.5, 1.5]}>
         <meshStandardMaterial color="#475569" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Supports */}
      {supports.map((point, i) => (
        <group key={i} position={[point.x, point.y / 2, point.z]}>
          {/* Vertical beam */}
          <mesh position={[0, -point.y/2, 0]} castShadow>
            <boxGeometry args={[0.3, point.y, 0.3]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          {/* Base plate */}
          <mesh position={[0, -point.y + 0.1, 0]} receiveShadow>
            <cylinderGeometry args={[1, 1, 0.2, 8]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          {/* Cross braces */}
          {i < supports.length - 1 && (
            <mesh 
              position={[0, -point.y + 2, 0]} 
              rotation={[0, 0, Math.PI / 4]}
            >
              <boxGeometry args={[0.1, 2, 0.1]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          )}
        </group>
      ))}

      {/* Control Points (Visible only in edit mode) */}
      {!isPlaying && trackPoints.map((point, i) => (
        <ControlPoint key={i} position={point} />
      ))}
    </group>
  );
}

function ControlPoint({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial 
        color="#f59e0b" 
        emissive="#f59e0b" 
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
