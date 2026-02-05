"use client";

import React from "react";

export const PageTransitionOverlay = () => {
  return (
    <div
      id="page-transition-overlay"
      className="
        fixed inset-0 z-[9999]
        pointer-events-none
      "
    />
  );
};
