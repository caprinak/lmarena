import { create } from "zustand";
import * as THREE from "three";

export type CameraMode = "orbit" | "ride";

interface GameState {
  // Track Data
  trackPoints: THREE.Vector3[];

  // Game State
  isPlaying: boolean;
  speed: number;
  progress: number;
  cameraMode: CameraMode;
  coachCount: number;

  // Actions
  addPoint: (point: THREE.Vector3) => void;
  removeLastPoint: () => void;
  updatePoint: (index: number, point: THREE.Vector3) => void;
  resetTrack: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setProgress: (progress: number) => void;
  setCameraMode: (mode: CameraMode) => void;
  setCoachCount: (count: number) => void;
}

const INITIAL_POINTS = [
  new THREE.Vector3(-30, 8, 0),
  new THREE.Vector3(-20, 12, 5),
  new THREE.Vector3(-10, 5, 0),
  new THREE.Vector3(-5, 8, -5),
  new THREE.Vector3(0, 15, 0),
  new THREE.Vector3(5, 10, 5),
  new THREE.Vector3(10, 5, 0),
  new THREE.Vector3(15, 3, -5),
  new THREE.Vector3(20, 2, 0),
  new THREE.Vector3(25, 1, 0),
  new THREE.Vector3(30, 0.5, 0),
  new THREE.Vector3(35, 0, 0),
  new THREE.Vector3(30, 0, -10),
  new THREE.Vector3(20, 0, -15),
  new THREE.Vector3(10, 2, -15),
  new THREE.Vector3(0, 5, -10),
  new THREE.Vector3(-10, 8, 0),
  new THREE.Vector3(-20, 10, 5),
  new THREE.Vector3(-30, 8, 0),
];

export const useGameStore = create<GameState>((set) => ({
  trackPoints: INITIAL_POINTS,
  isPlaying: false,
  speed: 0.0003,
  progress: 0,
  cameraMode: "orbit",
  coachCount: 3,

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

  setCoachCount: (count) => set({ coachCount: Math.max(0, Math.min(5, count)) }),
}));
