import { useMemo } from "react";
import { createNoise2D } from "simplex-noise";
import * as THREE from "three";

export function Terrain() {
  const noise2D = createNoise2D();

  const { geometry, trees, rocks } = useMemo(() => {
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

    return { geometry, trees, rocks };
  }, []);

  return (
    <group>
      <mesh geometry={geometry} receiveShadow position={[0, -2, 0]}>
        <meshStandardMaterial color="#65a30d" roughness={1} />
      </mesh>

      <gridHelper args={[150, 75, "#4d7c0f", "#84cc16"]} position={[0, -2, 0]} />

      <Lake />

      {trees.map((pos, i) => (
        <Tree key={i} position={[pos.x, pos.y - 2, pos.z]} />
      ))}

      {rocks.map((rock, i) => (
        <Rock key={i} position={[rock.x, rock.y - 2, rock.z]} scale={rock.scale} />
      ))}

      <Clouds />
    </group>
  );
}

function Lake() {
  const lakeGeometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(18, 32);
    return geo;
  }, []);

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

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.35, 2.5, 8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow>
        <coneGeometry args={[1.8, 4, 8]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#16a34a" />
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

function Clouds() {
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
          <meshStandardMaterial color="white" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
