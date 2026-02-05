// "use client";
// import { createPortal } from "react-dom";

// export default function GlobalModal({ open, onClose, children , closeButton = true}) {
//   if (typeof window === "undefined") return null;

//   if (!open) return null;


//   retur(
    
//   );
// }


import React from 'react'

const GlobalModal = ({ open, onClose, children , closeButton = true}) => {
  if (typeof window === "undefined") return null;
   if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999999]">
      {closeButton &&
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-4xl"
      >
        &times;
      </button>
 }
      {children}
    </div>
  )
}

export default GlobalModal
