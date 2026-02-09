import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGameStore } from "../store/gameStore";
import { Coach } from "./Coach";

export function Train() {
  const { trackPoints, isPlaying, speed, progress, setProgress, cameraMode, coachCount } = useGameStore();
  const trainRef = useRef<THREE.Group>(null);
  const coachRefs = useRef<(THREE.Group | null)[]>([]);
  const camera = useThree((state) => state.camera);
  const lastRearCoachRef = useRef<THREE.Group | null>(null);

  const curve = useMemo(() => {
    if (trackPoints.length < 2) return null;
    const c = new THREE.CatmullRomCurve3(trackPoints);
    c.curveType = "catmullrom";
    c.tension = 0.5;
    c.closed = true;
    return c;
  }, [trackPoints]);

  useFrame((_, delta) => {
    if (!curve || !trainRef.current) return;

    const COACH_SPACING = 0.04;
    const lastCoachIndex = coachCount - 1;

    if (isPlaying) {
      const newProgress = (progress + speed * delta * 60) % 1;
      setProgress(newProgress);

      const position = curve.getPointAt(newProgress);
      const tangent = curve.getTangentAt(newProgress).normalize();

      trainRef.current.position.copy(position);
      const lookAtPos = curve.getPointAt((newProgress + 0.01) % 1);
      trainRef.current.lookAt(lookAtPos);

      coachRefs.current.forEach((coach, index) => {
        if (!coach) return;
        const coachProgress = (newProgress - (index + 1) * COACH_SPACING + 1) % 1;
        const coachPosition = curve.getPointAt(coachProgress);
        const coachLookAt = curve.getPointAt((coachProgress + 0.01) % 1);
        coach.position.copy(coachPosition);
        coach.lookAt(coachLookAt);

        if (index === lastCoachIndex) {
          lastRearCoachRef.current = coach;
        }
      });

      const targetProgress = newProgress - (lastCoachIndex + 1) * COACH_SPACING + 1;
      const rearProgress = (targetProgress + 1) % 1;
      const rearPosition = curve.getPointAt(rearProgress);
      const rearTangent = curve.getTangentAt(rearProgress).normalize();

      if (cameraMode === "ride") {
        const camOffset = tangent.clone().multiplyScalar(-3).add(new THREE.Vector3(0, 2, 0));
        const camPos = position.clone().add(camOffset);
        camera.position.lerp(camPos, 0.1);
        camera.lookAt(position.clone().add(tangent.multiplyScalar(5)));
      } else if (cameraMode === "rear") {
        const camOffset = rearTangent.clone().multiplyScalar(4).add(new THREE.Vector3(0, 2, 0));
        const camPos = rearPosition.clone().add(camOffset);
        camera.position.lerp(camPos, 0.1);

        const lookAtPoint = position.clone();
        if (lastRearCoachRef.current) {
          lookAtPoint.copy(lastRearCoachRef.current.position);
        }
        camera.lookAt(lookAtPoint);
      } else if (cameraMode === "side") {
        const sideOffset = new THREE.Vector3(0, 3, 0).cross(tangent).normalize().multiplyScalar(8);
        const camPos = position.clone().add(sideOffset);
        camera.position.lerp(camPos, 0.05);
        camera.lookAt(position.clone().add(new THREE.Vector3(0, 5, 0)));
      } else if (cameraMode === "top") {
        const camPos = position.clone().add(new THREE.Vector3(0, 20, 0));
        camera.position.lerp(camPos, 0.05);
        camera.lookAt(position);
      }
    } else {
      if (progress === 0 && trainRef.current) {
        const startPos = curve.getPointAt(0);
        const nextPos = curve.getPointAt(0.01);
        trainRef.current.position.copy(startPos);
        trainRef.current.lookAt(nextPos);

        coachRefs.current.forEach((coach, index) => {
          if (!coach) return;
          const coachProgress = (0 - (index + 1) * COACH_SPACING + 1) % 1;
          const coachPosition = curve.getPointAt(coachProgress);
          const coachLookAt = curve.getPointAt((coachProgress + 0.01) % 1);
          coach.position.copy(coachPosition);
          coach.lookAt(coachLookAt);
        });
      }
    }
  });

  if (!curve) return null;

  const coachColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6"];

  return (
    <group>
      <group ref={trainRef}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.8, 2.5]} />
          <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[1.2, 0.6, 2]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        <mesh position={[0, 0.2, -1.26]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.4, 0.1]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
        </mesh>

        {[-0.8, 0.8].map((x) =>
          [-0.8, 0.8].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -0.5, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
              <meshStandardMaterial color="#111827" />
            </mesh>
          ))
        )}

        <mesh position={[-0.5, -0.1, -1.3]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.5, -0.1, -1.3]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2} />
        </mesh>

        <spotLight
          position={[0, 0, -1.5]}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={2}
          distance={20}
          castShadow
        />
      </group>

      {Array.from({ length: coachCount }).map((_, index) => (
        <Coach
          key={index}
          ref={(el) => {
            coachRefs.current[index] = el;
          }}
          color={coachColors[index % coachColors.length]}
        />
      ))}
    </group>
  );
}
