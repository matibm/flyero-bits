import { useRef, useState, useEffect, useCallback } from 'react';
import EditorStage from './EditorStage';
import type { EditorStageHandle } from './EditorStage';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 1200;

export interface CanvasWorkspaceHandle {
    getStageRef: () => EditorStageHandle | null;
}

const CanvasWorkspace: React.FC<{ stageRef: React.RefObject<EditorStageHandle | null> }> = ({
    stageRef,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5);
    const [fontsReady, setFontsReady] = useState(false);

    // Wait for web fonts before rendering canvas
    useEffect(() => {
        document.fonts.ready.then(() => setFontsReady(true));
    }, []);

    // Responsive scale calculation
    const computeScale = useCallback(() => {
        if (!containerRef.current) return;
        const padding = 60;
        const cw = containerRef.current.offsetWidth - padding;
        const ch = containerRef.current.offsetHeight - padding;
        const sx = cw / CANVAS_WIDTH;
        const sy = ch / CANVAS_HEIGHT;
        setScale(Math.min(sx, sy, 1)); // never scale above 1
    }, []);

    useEffect(() => {
        computeScale();
        window.addEventListener('resize', computeScale);
        return () => window.removeEventListener('resize', computeScale);
    }, [computeScale]);

    return (
        <div
            ref={containerRef}
            className="flex-1 bg-neutral-900 flex items-center justify-center overflow-hidden relative select-none"
        >
            {/* Zoom indicator */}
            <div className="absolute top-4 left-4 bg-black/50 text-white/60 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                {Math.round(scale * 100)}% zoom
            </div>

            {!fontsReady ? (
                <div className="text-white/70 text-base flex items-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-white/50 border-t-transparent rounded-full" />
                    Cargando motor de renderizado...
                </div>
            ) : (
                <EditorStage ref={stageRef} scale={scale} />
            )}
        </div>
    );
};

export default CanvasWorkspace;
