import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';
import EditorStage from './EditorStage';
import type { EditorStageHandle } from './EditorStage';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 1200;

const ZOOM_STEPS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export interface CanvasWorkspaceHandle {
  getStageRef: () => EditorStageHandle | null;
}

const CanvasWorkspace: React.FC<{ stageRef: React.RefObject<EditorStageHandle | null> }> = ({
  stageRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.5);
  const [manualZoom, setManualZoom] = useState<number | null>(null);
  const [fontsReady, setFontsReady] = useState(false);

  const scale = manualZoom ?? autoScale;
  const isAuto = manualZoom === null;

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
    setAutoScale(Math.min(sx, sy, 1)); // never scale above 1
  }, []);

  useEffect(() => {
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, [computeScale]);

  // Zoom handlers
  const currentStepIndex = useMemo(() => {
    // Find the closest zoom step to the current scale
    let closest = 0;
    let minDiff = Math.abs(ZOOM_STEPS[0] - scale);
    for (let i = 1; i < ZOOM_STEPS.length; i++) {
      const diff = Math.abs(ZOOM_STEPS[i] - scale);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    }
    return closest;
  }, [scale]);

  const handleZoomIn = useCallback(() => {
    const nextIndex = Math.min(currentStepIndex + 1, ZOOM_STEPS.length - 1);
    setManualZoom(ZOOM_STEPS[nextIndex]);
  }, [currentStepIndex]);

  const handleZoomOut = useCallback(() => {
    const nextIndex = Math.max(currentStepIndex - 1, 0);
    setManualZoom(ZOOM_STEPS[nextIndex]);
  }, [currentStepIndex]);

  const handleResetZoom = useCallback(() => {
    setManualZoom(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-neutral-900 flex items-center justify-center overflow-auto relative select-none"
    >
      {!fontsReady ? (
        <div className="text-white/70 text-base flex items-center gap-3">
          <div className="animate-spin h-5 w-5 border-2 border-white/50 border-t-transparent rounded-full" />
          Cargando motor de renderizado...
        </div>
      ) : (
        <EditorStage ref={stageRef} scale={scale} />
      )}

      {/* Zoom toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur text-white rounded-full flex items-center gap-1 px-2 py-1.5 shadow-lg">
        <button
          onClick={handleZoomOut}
          disabled={currentStepIndex === 0}
          className="p-1.5 rounded-full hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Alejar"
        >
          <Minus size={14} />
        </button>

        <button
          onClick={handleResetZoom}
          className="px-2.5 py-0.5 text-xs font-medium min-w-[56px] text-center rounded-full hover:bg-white/15 transition-colors cursor-pointer"
          title="Restablecer zoom automático"
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          onClick={handleZoomIn}
          disabled={currentStepIndex === ZOOM_STEPS.length - 1}
          className="p-1.5 rounded-full hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Acercar"
        >
          <Plus size={14} />
        </button>

        {!isAuto && (
          <button
            onClick={handleResetZoom}
            className="ml-1 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
            title="Volver a zoom automático"
          >
            Auto
          </button>
        )}
      </div>
    </div>
  );
};

export default CanvasWorkspace;
