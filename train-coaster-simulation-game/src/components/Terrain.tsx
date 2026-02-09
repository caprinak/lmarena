import { useMemo } from "react";
import { createNoise2D } from "simplex-noise";
import * as THREE from "three";

export function Terrain() {
  const noise2D = createNoise2D();
  
  const { geometry, trees } = useMemo(() => {
    // Ground Plane
    const geometry = new THREE.PlaneGeometry(100, 100, 64, 64);
    const posAttribute = geometry.attributes.position;
    
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      // Create some rolling hills
      const z = noise2D(x * 0.05, y * 0.05) * 2 + noise2D(x * 0.1, y * 0.1) * 0.5;
      posAttribute.setZ(i, z);
    }
    
    geometry.computeVertexNormals();
    geometry.rotateX(-Math.PI / 2);

    // Trees placement
    const trees = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      // Keep center somewhat clear
      if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;
      
      const y = noise2D(x * 0.05, -z * 0.05) * 2; // Approximate height
      trees.push({ x, y, z });
    }

    return { geometry, trees };
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh geometry={geometry} receiveShadow position={[0, -2, 0]}>
        <meshStandardMaterial color="#10b981" roughness={1} />
      </mesh>
      
      {/* Grid Helper for editing context */}
      <gridHelper args={[100, 50, "#94a3b8", "#cbd5e1"]} position={[0, -2, 0]} />

      {/* Trees */}
      {trees.map((pos, i) => (
        <Tree key={i} position={[pos.x, pos.y - 2, pos.z]} />
      ))}
      
      {/* Clouds */}
      <Clouds />
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
    </group>
  );
}

function Clouds() {
  const clouds = useMemo(() => {
    const c = [];
    for (let i = 0; i < 10; i++) {
      c.push({
        x: (Math.random() - 0.5) * 60,
        y: 15 + Math.random() * 10,
        z: (Math.random() - 0.5) * 60,
        scale: 1 + Math.random() * 2,
      });
    }
    return c;
  }, []);

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={[cloud.x, cloud.y, cloud.z]}>
          <sphereGeometry args={[cloud.scale, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
