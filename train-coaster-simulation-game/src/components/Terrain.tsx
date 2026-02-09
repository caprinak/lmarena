import { useMemo, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import * as THREE from "three";
import { useGameStore } from "../store/gameStore";

export function Terrain() {
  const noise2D = createNoise2D();
  const { isNight } = useGameStore();

  const { geometry, trees, rocks, flags } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(150, 150, 80, 80);
    const posAttribute = geometry.attributes.position;

    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const distToLake = Math.sqrt((x - 15) ** 2 + (y + 12) ** 2);
      let z: number;

      if (distToLake < 20) {
        z = -3 + Math.sin(x * 0.2) * 0.2 + Math.cos(y * 0.2) * 0.2;
      } else {
        z = noise2D(x * 0.03, y * 0.03) * 3 + noise2D(x * 0.08, y * 0.08) * 0.5;
      }

      posAttribute.setZ(i, z);
    }

    geometry.computeVertexNormals();
    geometry.rotateX(-Math.PI / 2);

    const trees = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 0.5) * 120;
      const distToLake = Math.sqrt((x - 15) ** 2 + (z + 12) ** 2);
      if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;
      if (distToLake < 22) continue;
      const y = noise2D(x * 0.03, -z * 0.03) * 3;
      trees.push({ x, y, z });
    }

    const rocks = [];
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      const distToLake = Math.sqrt((x - 15) ** 2 + (z + 12) ** 2);
      if (distToLake < 25) continue;
      const y = noise2D(x * 0.03, -z * 0.03) * 3;
      rocks.push({ x, y, z, scale: 0.3 + Math.random() * 0.5 });
    }

    const flags = [
      { x: 0, y: 15, z: 0, color: "#ef4444" },
      { x: 5, y: 10, z: 5, color: "#3b82f6" },
      { x: 15, y: 3, z: -5, color: "#22c55e" },
      { x: -10, y: 8, z: 0, color: "#eab308" },
    ];

    return { geometry, trees, rocks, flags };
  }, []);

  return (
    <group>
      <mesh geometry={geometry} receiveShadow position={[0, -2, 0]}>
        <meshStandardMaterial color={isNight ? "#1a3d1a" : "#65a30d"} roughness={1} />
      </mesh>

      <gridHelper args={[150, 75, isNight ? "#0a3d0a" : "#4d7c0f", isNight ? "#1a5a1a" : "#84cc16"]} position={[0, -2, 0]} />

      <Lake />

      {trees.map((pos, i) => (
        <Tree key={i} position={[pos.x, pos.y - 2, pos.z]} isNight={isNight} />
      ))}

      {rocks.map((rock, i) => (
        <Rock key={i} position={[rock.x, rock.y - 2, rock.z]} scale={rock.scale} />
      ))}

      <Bridge position={[22.5, 0.5, -7.5]} />
      <Bridge position={[-15, 9, 2.5]} />

      {flags.map((flag, i) => (
        <Flag key={i} position={[flag.x, flag.y, flag.z]} color={flag.color} />
      ))}

      <Tunnel position={[25, 1, -12]} rotation={[0, Math.PI / 4, 0]} />
      <Tunnel position={[-5, 12, 0]} rotation={[0, 0, 0]} />

      <Clouds isNight={isNight} />

      {isNight && <NightLights />}
    </group>
  );
}

function Lake() {
  return (
    <group position={[15, -2.8, -12]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[18, 32]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} roughness={0.1} metalness={0.3} />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 18 + Math.random() * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Rock
            key={i}
            position={[x, 0, z]}
            scale={0.8 + Math.random() * 0.6}
          />
        );
      })}

      <pointLight position={[0, 5, 0]} intensity={0.5} color="#7dd3fc" distance={30} />
    </group>
  );
}

function Tree({ position, isNight }: { position: [number, number, number]; isNight: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.35, 2.5, 8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow>
        <coneGeometry args={[1.8, 4, 8]} />
        <meshStandardMaterial color={isNight ? "#0f4c1e" : "#15803d"} />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color={isNight ? "#14651d" : "#16a34a"} />
      </mesh>
    </group>
  );
}

function Rock({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <mesh position={position} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} castShadow>
      <dodecahedronGeometry args={[scale, 0]} />
      <meshStandardMaterial color="#6b7280" roughness={0.9} />
    </mesh>
  );
}

function Bridge({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[8, 0.3, 3]} />
        <meshStandardMaterial color="#92400e" roughness={0.8} />
      </mesh>
      <mesh position={[-3, -1.5, -1.2]} castShadow>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[3, -1.5, -1.2]} castShadow>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[-3, -1.5, 1.2]} castShadow>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[3, -1.5, 1.2]} castShadow>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[7.5, 0.1, 2.5]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  );
}

function Flag({ position, color }: { position: [number, number, number]; color: string }) {
  const flagRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
        <meshStandardMaterial color="#71717a" />
      </mesh>
      <mesh ref={flagRef} position={[0.4, 3.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Tunnel({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.5, 2.5, 6, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#374151" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 6, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#1f2937" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Clouds({ isNight }: { isNight: boolean }) {
  const clouds = useMemo(() => {
    const c = [];
    for (let i = 0; i < 15; i++) {
      c.push({
        x: (Math.random() - 0.5) * 100,
        y: 20 + Math.random() * 15,
        z: (Math.random() - 0.5) * 100,
        scale: 2 + Math.random() * 4,
      });
    }
    return c;
  }, []);

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={[cloud.x, cloud.y, cloud.z]}>
          <sphereGeometry args={[cloud.scale, 8, 8]} />
          <meshStandardMaterial color={isNight ? "#374151" : "white"} transparent opacity={isNight ? 0.3 : 0.9} />
        </mesh>
      ))}
    </group>
  );
}

function NightLights() {
  const lights = useMemo(() => {
    const l = [];
    for (let i = 0; i < 20; i++) {
      l.push({
        x: (Math.random() - 0.5) * 80,
        z: (Math.random() - 0.5) * 80,
      });
    }
    return l;
  }, []);

  return (
    <group>
      {lights.map((light, i) => (
        <pointLight key={i} position={[light.x, 5, light.z]} intensity={0.3} distance={15} color="#fef08a" />
      ))}
      <ambientLight intensity={0.2} />
    </group>
  );
}
