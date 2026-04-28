import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { useEditorStore } from '../../store/useEditorStore';
import Background from './Background';
import CanvasNodes from './CanvasNodes';
import MasterTransformer from './MasterTransformer';
import SmartGuides from './SmartGuides';
import { useSmartGuides } from '../../hooks/useSmartGuides';
import { CURATED_FONTS, loadGoogleFont } from '../../data/fonts';
import type Konva from 'konva';

export interface EditorStageHandle {
  getStage: () => Konva.Stage | null;
}

interface EditorStageProps {
  scale: number;
}

const EditorStage = forwardRef<EditorStageHandle, EditorStageProps>(({ scale }, ref) => {
  const stageRef = useRef<Konva.Stage>(null);
  const setSelectedNodeIds = useEditorStore((s) => s.setSelectedNodeIds);
  const canvas = useEditorStore((s) => s.canvasSize);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const gridEnabled = useEditorStore((s) => s.gridEnabled);
  const customFonts = useEditorStore((s) => s.customFonts);

  const { guides, handleDragMove, handleDragEnd } = useSmartGuides({
    enabled: snapEnabled,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  });

  useImperativeHandle(ref, () => ({
    getStage: () => stageRef.current,
  }));

  // Inject curated + user-added Google Fonts on first mount and when list changes
  useEffect(() => {
    CURATED_FONTS.forEach((f) => loadGoogleFont(f.family, f.url));
    customFonts.forEach((f) => loadGoogleFont(f.family, f.url));
  }, [customFonts]);

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectedNodeIds([]);
    }
  };

  // Build grid lines (every 40px in the larger axis, every 30px on the smaller)
  const gridStep = Math.max(40, Math.round(Math.min(canvas.width, canvas.height) / 30));
  const gridLines: number[][] = [];
  if (gridEnabled) {
    for (let x = gridStep; x < canvas.width; x += gridStep) {
      gridLines.push([x, 0, x, canvas.height]);
    }
    for (let y = gridStep; y < canvas.height; y += gridStep) {
      gridLines.push([0, y, canvas.width, y]);
    }
  }

  return (
    <div
      style={{
        width: canvas.width * scale,
        height: canvas.height * scale,
      }}
      className="shadow-2xl ring-1 ring-white/10 rounded-sm overflow-hidden bg-white"
    >
      <Stage
        ref={stageRef}
        width={canvas.width}
        height={canvas.height}
        onClick={handleStageClick as (e: Konva.KonvaEventObject<MouseEvent>) => void}
        onTap={handleStageClick as (e: Konva.KonvaEventObject<TouchEvent>) => void}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <Layer>
          <Background />
          {gridEnabled &&
            gridLines.map((pts, i) => (
              <Line
                key={`grid_${i}`}
                points={pts}
                stroke="#0ea5e9"
                strokeWidth={0.4}
                opacity={0.3}
                listening={false}
              />
            ))}
          <CanvasNodes onDragMove={handleDragMove} onDragEnd={handleDragEnd} />
          <SmartGuides guides={guides} canvasWidth={canvas.width} canvasHeight={canvas.height} />
          <MasterTransformer stageRef={stageRef} />
        </Layer>
      </Stage>
    </div>
  );
});

EditorStage.displayName = 'EditorStage';

export default EditorStage;
