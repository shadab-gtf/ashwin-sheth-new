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

interface GlobeWithMarkersProps {
  enableControls?: boolean;
  autoRotate?: boolean;
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
function GlobeMarkers({
  radius = 5,
  enableInteraction = true,
}: {
  radius?: number;
  enableInteraction?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const normalPositions = useMemo(
    () =>
      normalMarkers.map((m) => latLongToVector3(m.lat, m.lon, radius, 0.01)),
    [radius]
  );

  const dubaiPositions = useMemo(
    () => dubaiMarkers.map((m) => latLongToVector3(m.lat, m.lon, radius, 0.01)),
    [radius]
  );

  return (
    <>
      <Instances limit={normalMarkers.length}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#FF863F"
          roughness={0.3}
          metalness={0.6}
          emissive="#FF863F"
          emissiveIntensity={0.5}
        />

        {normalMarkers.map((marker, i) => (
          <Instance
            key={marker.label}
            position={normalPositions[i]}
            scale={[1, 1, 1.4]}
            onPointerOver={
              enableInteraction
                ? (e) => {
                    e.stopPropagation();
                    document.body.style.cursor = "pointer";
                    setHovered(i);
                  }
                : undefined
            }
            onPointerOut={
              enableInteraction
                ? () => {
                    document.body.style.cursor = "grab";
                    setHovered(null);
                  }
                : undefined
            }
          />
        ))}
      </Instances>

      {/* dubai markers */}
      <Instances limit={dubaiMarkers.length}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#FF863F"
          roughness={0.2}
          metalness={0.9}
          emissive="#FF863F"
          emissiveIntensity={0.4}
        />

        {dubaiMarkers.map((marker, i) => (
          <Instance
            key={marker.label}
            position={dubaiPositions[i]}
            scale={[1, 1, 1.4]}
            onPointerOver={
              enableInteraction
                ? (e) => {
                    e.stopPropagation();
                    document.body.style.cursor = "pointer";
                    setHovered(i + normalMarkers.length);
                  }
                : undefined
            }
            onPointerOut={
              enableInteraction
                ? () => {
                    document.body.style.cursor = "grab";
                    setHovered(null);
                  }
                : undefined
            }
          />
        ))}
      </Instances>

      {enableInteraction && hovered !== null && (
        <Html
          position={
            hovered < normalMarkers.length
              ? normalPositions[hovered]
              : dubaiPositions[hovered - normalMarkers.length]
          }
          center
          distanceFactor={8}
          style={{
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transform: "translateY(-30px)",
            fontWeight: "500",
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
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial 
        map={texture}
        metalness={0.1}
        roughness={0.7}
      />
    </mesh>
  );
}

// scene
function Scene({
  enableControls = true,
  autoRotate = false,
}: {
  enableControls?: boolean;
  autoRotate?: boolean;
}) {
  const rotation = useMemo(
    () =>
      [
        THREE.MathUtils.degToRad(20),
        THREE.MathUtils.degToRad(-165),
        0,
      ] as [number, number, number],
    []
  );

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, 0, -10]} intensity={0.5} distance={30} />

      <group rotation={rotation}>
        <Earth />
        <GlobeMarkers radius={5} enableInteraction={enableControls} />
      </group>

      <OrbitControls
        enableZoom={enableControls}
        enableRotate={enableControls}
        enablePan={enableControls}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

// canvas
export default function GlobeWithMarkers({
  enableControls = false,
  autoRotate = false,
}: GlobeWithMarkersProps) {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: enableControls ? "auto" : "none",
      }}
     camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      className={enableControls ? "cursor-grab active:cursor-grabbing" : ""}
    >
      <Scene enableControls={enableControls} autoRotate={autoRotate} />
    </Canvas>
  );
}