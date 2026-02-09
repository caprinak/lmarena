import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGameStore } from "../store/gameStore";

export function Train() {
  const { trackPoints, isPlaying, speed, progress, setProgress, cameraMode } = useGameStore();
  const trainRef = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  
  const curve = useMemo(() => {
    if (trackPoints.length < 2) return null;
    const c = new THREE.CatmullRomCurve3(trackPoints);
    c.curveType = "catmullrom";
    c.tension = 0.5;
    return c;
  }, [trackPoints]);

  useFrame((_, delta) => {
    if (!curve || !trainRef.current) return;

    if (isPlaying) {
      // Update progress
      const newProgress = (progress + speed * delta * 60) % 1;
      setProgress(newProgress);

      // Get position and tangent
      const position = curve.getPointAt(newProgress);
      const tangent = curve.getTangentAt(newProgress).normalize();
      
      trainRef.current.position.copy(position);
      
      // Look ahead
      const lookAtPos = curve.getPointAt((newProgress + 0.01) % 1);
      trainRef.current.lookAt(lookAtPos);

      // Camera follow logic
      if (cameraMode === "ride") {
        const camOffset = tangent.clone().multiplyScalar(-3).add(new THREE.Vector3(0, 2, 0));
        const camPos = position.clone().add(camOffset);
        camera.position.lerp(camPos, 0.1);
        camera.lookAt(position.clone().add(tangent.multiplyScalar(5)));
      }
    } else {
      // Reset to start when stopped
      if (progress === 0 && trainRef.current) {
        const startPos = curve.getPointAt(0);
        const nextPos = curve.getPointAt(0.01);
        trainRef.current.position.copy(startPos);
        trainRef.current.lookAt(nextPos);
      }
    }
  });

  if (!curve) return null;

  return (
    <group ref={trainRef}>
      {/* Main Cart Body */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.8, 2.5]} />
        <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.3} />
      </mesh>
      
      {/* Seats/Interior */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Front Window */}
      <mesh position={[0, 0.2, -1.26]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.1]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
      </mesh>

      {/* Wheels */}
      {[-0.8, 0.8].map((x) =>
        [-0.8, 0.8].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.5, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        ))
      )}

      {/* Headlights */}
      <mesh position={[-0.5, -0.1, -1.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.5, -0.1, -1.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2} />
      </mesh>
      
      {/* Spotlight for headlights */}
      <spotLight
        position={[0, 0, -1.5]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={2}
        distance={20}
        castShadow
      />
    </group>
  );
}
