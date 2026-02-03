"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Instances, Instance, Html, OrbitControls } from "@react-three/drei";

/* =======================
   TYPES
======================= */
interface Marker {
  lat: number;
  lon: number;
  label: string;
}

/* =======================
   DATA
======================= */
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

/* =======================
   HELPERS
======================= */
function latLongToVector3(lat: number, lon: number, radius = 5, height = 0.05) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius + height) * Math.sin(phi) * Math.cos(theta),
    (radius + height) * Math.cos(phi),
    (radius + height) * Math.sin(phi) * Math.sin(theta),
  );
}

/* =======================
   CAMERA FOCUS
======================= */
function useCameraFocus(target: THREE.Vector3 | null) {
  const { camera, controls } = useThree() as any;
  const current = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!target || !controls) return;

    current.current.lerp(target, 0.06);
    controls.target.copy(current.current);

    camera.position.lerp(target.clone().multiplyScalar(2.25), 0.06);
    camera.lookAt(controls.target);
  });
}

/* =======================
   MARKER CALLOUT
======================= */
function MarkerCallout({
  position,
  label,
  active,
}: {
  position: THREE.Vector3;
  label: string;
  active: boolean;
}) {
  const progress = useRef(0);

  const start = useMemo(() => position.clone(), [position]);
  const end = useMemo(() => position.clone().multiplyScalar(1.22), [position]);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#FF863F",
        transparent: true,
        opacity: 0,
      }),
    [],
  );

  const line = useMemo(() => new THREE.Line(geometry, material), []);
  const htmlRef = useRef<HTMLDivElement>(null);

  useFrame((_, delta) => {
    const speed = 3.8;

    progress.current = active
      ? Math.min(progress.current + delta * speed, 1)
      : Math.max(progress.current - delta * speed, 0);

    const eased = THREE.MathUtils.smoothstep(progress.current, 0, 1);

    // LINE animation
    geometry.setFromPoints([
      start,
      start.clone().lerp(end, eased),
    ]);
    material.opacity = eased;

    // LABEL animation (NO React re-render)
    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(eased);
      htmlRef.current.style.transform = `translateY(${(1 - eased) * 8}px)`;
    }
  });

  return (
    <>
      <primitive object={line} />

      <Html
        position={end}
        center
        distanceFactor={10}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={htmlRef}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.3px",
            color: "#FF863F",
            whiteSpace: "nowrap",
            opacity: 0,
            transform: "translateY(8px)",
            transition: "none", // IMPORTANT
          }}
        >
          {label}
        </div>
      </Html>
    </>
  );
}


/* =======================
   MARKERS
======================= */
const allMarkers = markers;

function GlobeMarkers({ radius = 5 }: { radius?: number }) {
  const positions = useMemo(
    () => allMarkers.map((m) => latLongToVector3(m.lat, m.lon, radius, -0.01)),
    [radius],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % positions.length),
      3600,
    );
    return () => clearInterval(t);
  }, [positions.length]);

  useCameraFocus(positions[activeIndex]);

  return (
    <>
      <Instances limit={positions.length}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#FF863F"
          emissive="#FF863F"
          emissiveIntensity={0.35}
        />
        {positions.map((p, i) => (
          <Instance
            key={i}
            position={p}
            scale={i === activeIndex ? 1.4 : 1}
          />
        ))}
      </Instances>

      {allMarkers.map((m, i) => (
        <MarkerCallout
          key={m.label}
          position={positions[i]}
          label={m.label}
          active={i === activeIndex}
        />
      ))}
    </>
  );
}

/* =======================
   EARTH
======================= */
function Earth() {
  const texture = useLoader(THREE.TextureLoader, "/texture/day.jpg");

  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

/* =======================
   SCENE
======================= */
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
      <pointLight position={[0, 0, 10]} intensity={0.6} />

      <group rotation={rotation}>
        <Earth />
        <GlobeMarkers />
      </group>

      <OrbitControls
        enableZoom
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

/* =======================
   CANVAS
======================= */
export default function GlobeWithMarkers() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 90 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  );
}
