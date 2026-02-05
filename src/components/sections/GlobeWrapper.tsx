"use client";

import React from "react";
import dynamic from "next/dynamic";

const GlobeWithMarkers = dynamic(
  () => import("@/components/model/GlobeWithMarkers"),
  {
    ssr: false,
  }
);

interface GlobeWrapperProps {
  globeRef: React.RefObject<HTMLDivElement | null>;
  isInteractive: boolean;
}

export default function GlobeWrapper({
  globeRef,
  isInteractive,
}: GlobeWrapperProps) {
  return (
    <div
      ref={globeRef}
      className="absolute left-1/2 w-[85vw] md:w-[60vh] aspect-square"
      style={{
        transform: "translateX(-50%)",
        opacity: 0,
        zIndex: 29,
        pointerEvents: isInteractive ? "auto" : "none",
      }}
    >
      <GlobeWithMarkers
        enableControls={isInteractive}
        autoRotate={!isInteractive}
      />
    </div>
  );
}