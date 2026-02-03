"use client";

import { useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Instances, Instance, Html, OrbitControls } from "@react-three/drei";

// type
interface Marker {
  lat: number;
  lon: number;
  label: string;
}

// markers data
const markers: Marker[] = [
  { lat: 28.6139, lon: 77.209, label: "New Delhi-NCR (Upcoming)" },
  { lat: 18.9167, lon: 73.3333, label: "Karjat (35 Acres)" },
  { lat: 18.6417, lon: 72.8792, label: "Alibaug (40 Acres)" },
  { lat: 18.7546, lon: 73.4062, label: "Lonavala (148 Acres)" },
  { lat: 19.7667, lon: 74.4774, label: "Shirdi (123 Acres)" },
  { lat: 17.385, lon: 78.4867, label: "Hyderabad (Upcoming)" },
  { lat: 20.9372, lon: 77.7797, label: "Amravati (Upcoming)" },
  { lat: 12.9716, lon: 77.5946, label: "Bengaluru (50 Acres)" },
  { lat: 12.2958, lon: 76.6394, label: "Mysuru (110 Acres)" },
  { lat: 13.0827, lon: 80.2707, label: "Chennai (Upcoming)" },
  { lat: 25.185, lon: 55.265, label: "Iris Bay" },
  { lat: 25.7845, lon: 55.4648, label: "Iris Blue" },
];
const DUBAI_MARKERS = ["Iris Bay", "Iris Blue"];
function latLongToVector3(lat: number, lon: number, radius = 5, height = 0.05) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius + height) * Math.sin(phi) * Math.cos(theta);
  const y = (radius + height) * Math.cos(phi);
  const z = (radius + height) * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}
const normalMarkers = markers.filter((m) => !DUBAI_MARKERS.includes(m.label));

const dubaiMarkers = markers.filter((m) => DUBAI_MARKERS.includes(m.label));
// markers
function GlobeMarkers({ radius = 1 }: { radius?: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  //   const positions = useMemo(
  //     () => markers.map((m) => latLongToVector3(m.lat, m.lon, radius, -0.01)),
  //     [radius],
  //   );
  const normalPositions = useMemo(
    () =>
      normalMarkers.map((m) => latLongToVector3(m.lat, m.lon, radius, -0.01)),
    [radius],
  );

  const dubaiPositions = useMemo(
    () =>
      dubaiMarkers.map((m) => latLongToVector3(m.lat, m.lon, radius, -0.01)),
    [radius],
  );
  return (
    <>
      <Instances limit={normalMarkers.length}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#FF863F"
          roughness={0.3}
          metalness={0.6}
          emissive="#FF863F"
          emissiveIntensity={0.25}
        />

        {normalMarkers.map((marker, i) => (
          <Instance
            key={marker.label}
            position={normalPositions[i]}
            scale={[1, 1, 1.4]}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setHovered(i);
            }}
            onPointerOut={() => {
              document.body.style.cursor = "grab";
              setHovered(null);
            }}
          />
        ))}
      </Instances>

      {/* dubai markers  */}
      <Instances limit={dubaiMarkers.length}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial
          color="#FF863F"
          roughness={0.2}
          metalness={0.9}
          emissive="#FF863F"
          emissiveIntensity={0.15}
        />

        {dubaiMarkers.map((marker, i) => (
          <Instance
            key={marker.label}
            position={dubaiPositions[i]}
            scale={[1, 1, 1.4]}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setHovered(i + normalMarkers.length);
            }}
            onPointerOut={() => {
              document.body.style.cursor = "grab";
              setHovered(null);
            }}
          />
        ))}
      </Instances>

      {hovered !== null && (
        <Html
          position={
            hovered < normalMarkers.length
              ? normalPositions[hovered]
              : dubaiPositions[hovered - normalMarkers.length]
          }
          center
          distanceFactor={10}
          style={{
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "2px",
            fontSize: "4px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transform: "translateY(-24px)",
          }}
        >
          {hovered < normalMarkers.length
            ? normalMarkers[hovered].label
            : dubaiMarkers[hovered - normalMarkers.length].label}
        </Html>
      )}
    </>
  );
}

// earth
function Earth() {
  const texture = useLoader(THREE.TextureLoader, "/texture/day.jpg");

  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// scene
function Scene() {
  const rotation = useMemo(
  () =>
    [
      THREE.MathUtils.degToRad(20),   
      THREE.MathUtils.degToRad(-165), 
      0,
    ] as [number, number, number],
  [],
);
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 0, 10]} intensity={0.6} distance={25} />

      <group rotation={rotation}>
        <Earth />
        <GlobeMarkers radius={5} />
      </group>

      {/* <OrbitControls enableZoom enablePan={true} enableRotate={true} /> */}
       <OrbitControls
        enableZoom={false}
         enableRotate={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

// canvas
export default function GlobeWithMarkers() {
  return (
    <Canvas
     style={{ width: '100%', height: '100%', pointerEvents: 'none', }}
      camera={{ position: [0, 0, 10], fov: 75 }}
    //   dpr={[1, 1.25]}
     dpr={1} 
    //   gl={{ antialias: true, powerPreference: "high-performance" }}
     gl={{
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      }}
      className="cursor-grab"
    >
      <Scene />
    </Canvas>
  );
}
