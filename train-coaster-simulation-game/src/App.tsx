import { useGameStore } from "./store/gameStore";
import { Scene } from "./components/Scene";
import * as THREE from "three";

function App() {
  const {
    isPlaying,
    togglePlay,
    resetTrack,
    addPoint,
    removeLastPoint,
    trackPoints,
    speed,
    setSpeed,
    coachCount,
    setCoachCount,
    cameraMode,
    setCameraMode,
    isNight,
    toggleNight,
    showSpeedometer,
    toggleSpeedometer,
  } = useGameStore();

  const handleAddPoint = () => {
    let newPoint: THREE.Vector3;
    if (trackPoints.length > 0) {
      const last = trackPoints[trackPoints.length - 1];
      newPoint = new THREE.Vector3(
        last.x + 5,
        Math.max(2, last.y + (Math.random() - 0.5) * 5),
        last.z + (Math.random() - 0.5) * 5
      );
    } else {
      newPoint = new THREE.Vector3(0, 5, 0);
    }
    addPoint(newPoint);
  };

  const cameraModes = [
    { id: "ride", label: "🎢 Ride", icon: "🎢" },
    { id: "rear", label: "🚂 Rear", icon: "🚂" },
    { id: "side", label: "📐 Side", icon: "📐" },
    { id: "top", label: "⬆️ Top", icon: "⬆️" },
    { id: "orbit", label: "🪐 Orbit", icon: "🪐" },
  ];

  const currentSpeed = Math.round(speed * 100000);

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${isNight ? "bg-slate-900" : "bg-sky-100"}`}>
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {showSpeedometer && isPlaying && (
        <div className="absolute bottom-32 right-8 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl shadow-2xl pointer-events-none">
          <div className="text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Speed</div>
            <div className="text-3xl font-mono font-bold text-emerald-400">{currentSpeed}</div>
            <div className="text-xs text-slate-500">km/h</div>
          </div>
          <div className="mt-2 w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (currentSpeed / 200) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 z-10 p-6 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-2xl pointer-events-auto max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
            Infinity Rails
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Design, build, and ride your roller coaster.
          </p>

          <div className="space-y-4">
            <button
              onClick={togglePlay}
              className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                isPlaying
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
              }`}
            >
              {isPlaying ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Stop Ride
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Ride
                </>
              )}
            </button>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Train Speed</span>
                <span>{(speed * 1000).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.0001"
                max="0.002"
                step="0.0001"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                disabled={isPlaying}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Coaches</span>
                <span>{coachCount}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCoachCount(coachCount - 1)}
                  disabled={coachCount <= 0}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => setCoachCount(coachCount + 1)}
                  disabled={coachCount >= 5}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-slate-300">Camera View</div>
              <div className="grid grid-cols-5 gap-1">
                {cameraModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCameraMode(mode.id as any)}
                    className={`py-2 px-1 rounded-lg font-medium text-xs transition-colors ${
                      cameraMode === mode.id
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    }`}
                    title={mode.label}
                  >
                    {mode.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleNight}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                  isNight
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                }`}
              >
                {isNight ? "🌙 Night" : "☀️ Day"}
              </button>
              <button
                onClick={toggleSpeedometer}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                  showSpeedometer
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                }`}
              >
                {showSpeedometer ? "📊 Hide" : "📊 Show"} Speed
              </button>
            </div>

            <div className="h-px bg-slate-700/50 my-4" />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddPoint}
                disabled={isPlaying}
                className="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium text-sm transition-colors"
              >
                + Add Point
              </button>
              <button
                onClick={removeLastPoint}
                disabled={isPlaying || trackPoints.length === 0}
                className="py-2 px-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Undo
              </button>
            </div>

            <button
              onClick={resetTrack}
              disabled={isPlaying}
              className="w-full py-2 px-3 border border-slate-600 hover:bg-slate-800 disabled:opacity-50 text-slate-300 rounded-lg font-medium text-sm transition-colors"
            >
              Reset Track
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Points</div>
              <div className="text-xl font-mono text-slate-200">{trackPoints.length}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Coaches</div>
              <div className="text-xl font-mono text-slate-200">{coachCount}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</div>
              <div className="text-xl font-mono text-slate-200">
                {isPlaying ? "Riding" : "Editing"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isPlaying && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-6 py-3 rounded-full border border-slate-700 shadow-xl backdrop-blur-sm pointer-events-none">
          <p className="text-sm font-medium">
            🎥 5 Camera Views! • 🏗️ Bridges & Tunnels • 🏊 Lake • 🚂 Multi-Coach Train • ☀️/🌙 Day-Night
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
