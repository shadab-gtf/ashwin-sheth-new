'use client';

import { forwardRef } from 'react';

const CenterLogo = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div
            ref={ref}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            style={{ opacity: 0 }} 
        >
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-primary mix-blend-overlay">
                Antigravity
            </h1>
        </div>
    );
});

CenterLogo.displayName = 'CenterLogo';

export default CenterLogo;
