# Train Coaster Simulation Game

A 3D roller coaster simulation game built with React, Three.js, and React Three Fiber. Design, build, and ride your own roller coaster with multiple train cars!

## Features

### 🎢 Ride the Coaster
- **Start/Stop Ride** - Toggle between editing and riding modes
- **Camera Modes** - Orbit view for editing, first-person ride view
- **Speed Control** - Adjust train speed with slider (0.1x - 2.0x)

### 🚂 Multi-Car Train
- **Locomotive** - Red engine with headlights and detailed interior
- **Coaches** - Add up to 5 passenger cars (0-5 configurable)
- **Physics-based Following** - Coaches smoothly follow the locomotive
- **Color-coded Cars** - Each coach has a distinct color

### 🏗️ Track Builder
- **Add Points** - Extend track with new control points
- **Undo** - Remove last added point
- **Reset Track** - Clear all points and start fresh
- **Catmull-Rom Spline** - Smooth curved tracks from control points

### 🏞️ Environment
- **Procedural Terrain** - Rolling hills with simplex noise
- **Lake** - Water feature with rocky shoreline
- **Trees** - Randomly placed pine trees
- **Rocks** - Decorative boulders around the landscape
- **Clouds** - Floating clouds for atmosphere

## Tech Stack

- **React 19** - UI framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **TypeScript** - Type safety

## Project Structure

```
train-coaster-simulation-game/
├── src/
│   ├── components/
│   │   ├── Scene.tsx       # Main 3D scene setup
│   │   ├── Train.tsx       # Locomotive with coach management
│   │   ├── Coach.tsx       # Passenger car component
│   │   ├── Track.tsx       # Rail rendering with supports
│   │   └── Terrain.tsx     # Ground, trees, lake, clouds
│   ├── store/
│   │   └── gameStore.ts    # Zustand state management
│   ├── utils/
│   │   └── cn.ts          # Class name utility
│   ├── App.tsx             # Main app with UI
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Installation

```bash
cd train-coaster-simulation-game
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 (or the port shown in terminal)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Controls

| Action | Control |
|--------|---------|
| Add Track Point | Click "+ Add Point" button |
| Undo Last Point | Click "Undo" button |
| Reset Track | Click "Reset Track" button |
| Start Ride | Click "Start Ride" button |
| Stop Ride | Click "Stop Ride" button |
| Change Speed | Drag speed slider |
| Add Coach | Click "+" button (max 5) |
| Remove Coach | Click "-" button (min 0) |
| Orbit Camera | Left-click + drag (editing mode) |
| Zoom | Scroll wheel |
| Pan | Right-click + drag |

## Game State

### Track Points
The track is defined by a series of 3D control points. The game uses Catmull-Rom spline interpolation to create smooth curves between points.

### Progress (0-1)
The train's position along the track is represented as a value between 0 and 1, where 0 is the start and 1 is the end (before looping).

### Coach Spacing
Coaches follow the locomotive at fixed intervals (0.04 progress units) to maintain realistic train formation.

## Customization

### Adding New Terrain Features

Edit `src/components/Terrain.tsx` to add:
- Mountains (modify height calculation)
- Rivers (add water bodies)
- Buildings (add structures)
- Vegetation (different tree types)

### Modifying Train

Edit `src/components/Train.tsx` for:
- Different locomotive designs
- Coach configurations
- Train physics
- Camera behavior

### Extending Track Behavior

Edit `src/store/gameStore.ts` to:
- Change initial track layout
- Modify speed defaults
- Adjust coach limits
- Add new game modes

## Performance Tips

- Reduce coach count for better performance on lower-end devices
- Use orbit mode for smoother camera when editing
- Close unnecessary browser tabs

## License

MIT License - Feel free to modify and distribute!

## Credits

Built with:
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js](https://threejs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
