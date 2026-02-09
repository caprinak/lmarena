import { create } from "zustand";
import * as THREE from "three";

export type CameraMode = "orbit" | "ride";

interface GameState {
  // Track Data
  trackPoints: THREE.Vector3[];
  
  // Game State
  isPlaying: boolean;
  speed: number;
  progress: number; // 0 to 1
  cameraMode: CameraMode;
  
  // Actions
  addPoint: (point: THREE.Vector3) => void;
  removeLastPoint: () => void;
  updatePoint: (index: number, point: THREE.Vector3) => void;
  resetTrack: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setProgress: (progress: number) => void;
  setCameraMode: (mode: CameraMode) => void;
}

const INITIAL_POINTS = [
  new THREE.Vector3(-10, 5, 0),
  new THREE.Vector3(-5, 5, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(5, 2, 0),
  new THREE.Vector3(10, 2, 5),
  new THREE.Vector3(15, 8, 0),
];

export const useGameStore = create<GameState>((set) => ({
  trackPoints: INITIAL_POINTS,
  isPlaying: false,
  speed: 0.0005,
  progress: 0,
  cameraMode: "orbit",

  addPoint: (point) =>
    set((state) => ({ trackPoints: [...state.trackPoints, point] })),
  
  removeLastPoint: () =>
    set((state) => ({
      trackPoints: state.trackPoints.slice(0, -1),
    })),

  updatePoint: (index, point) =>
    set((state) => {
      const newPoints = [...state.trackPoints];
      newPoints[index] = point;
      return { trackPoints: newPoints };
    }),

  resetTrack: () => set({ trackPoints: [], progress: 0, isPlaying: false }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
      cameraMode: !state.isPlaying ? "ride" : "orbit",
    })),

  setSpeed: (speed) => set({ speed }),
  
  setProgress: (progress) => set({ progress }),

  setCameraMode: (mode) => set({ cameraMode: mode }),
}));
