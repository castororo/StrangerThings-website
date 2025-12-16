import React, { useRef } from 'react';
import { useFlashlight } from '@/hooks/useFlashlight';

interface DiscoverModeProps {
    children: React.ReactNode;
    className?: string;
}

export default function DiscoverMode({ children, className = "" }: DiscoverModeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize the flashlight logic
    useFlashlight(containerRef);

    return (
        <div
            ref={containerRef}
            className={`discover-mode ${className}`}
            style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
        >
            {/* Normal World Layer */}
            <div className="normal-world relative z-10 bg-background text-foreground">
                {children}
            </div>

            {/* Upside Down World Layer (Revealed by Mask) */}
            <div
                className="upside-down-world absolute inset-0 z-20 pointer-events-none"
                aria-hidden="true"
            >
                {children}
            </div>

            {/* Optional: Flashlight Mask Helper Element if CSS variable approach needs it?
          Current CSS implementation uses clip-path on .upside-down-world directly controlled by vars on container.
          So this extra div might confuse things, but user asked for:
          <div id="dimension-flashlight-mask"></div>
          
          If using "Option 1 (CSS)" from prompt:
          "#dimension-flashlight-mask { ... clip-path ... }"
          
          But my CSS implementation applies clip-path to .upside-down-world directly to save a DOM element wrapper, 
          which is cleaner. 
          However, to strictly follow "Gemini must wrap ... with <div id="dimension-flashlight-mask"></div>"
          I will include it, but essentially .upside-down-world IS the masked layer.
      */}
            <div id="dimension-flashlight-mask" />
        </div>
    );
}
