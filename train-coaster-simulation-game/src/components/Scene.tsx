import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Track } from "./Track";
import { Train } from "./Train";
import { Terrain } from "./Terrain";
import { useGameStore } from "../store/gameStore";

export function Scene() {
  const { cameraMode, isNight } = useGameStore();

  return (
    <Canvas
      shadows
      camera={{ position: [20, 20, 20], fov: 50 }}
      gl={{ antialias: true }}
      className={isNight ? "bg-slate-900" : "bg-sky-100"}
    >
      {isNight ? (
        <>
          <Sky sunPosition={[-100, -10, -100]} />
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[-10, 20, -10]}
            intensity={0.3}
            color="#6366f1"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <fog attach="fog" args={["#0f172a", 30, 100]} />
        </>
      ) : (
        <>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
        </>
      )}

      <Terrain />
      <Track />
      <Train />

      {cameraMode === "orbit" && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      )}
    </Canvas>
  );
}
