import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer } from 'react-konva';
import { useEditorStore } from '../../store/useEditorStore';
import Background from './Background';
import DeceasedPhoto from './DeceasedPhoto';
import DynamicTexts from './DynamicTexts';
import MasterTransformer from './MasterTransformer';
import type Konva from 'konva';

export interface EditorStageHandle {
  getStage: () => Konva.Stage | null;
}

interface EditorStageProps {
  scale: number;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 1200;

const EditorStage = forwardRef<EditorStageHandle, EditorStageProps>(({ scale }, ref) => {
  const stageRef = useRef<Konva.Stage>(null);
  const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);

  useImperativeHandle(ref, () => ({
    getStage: () => stageRef.current,
  }));

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Clicked on empty area → deselect
    if (e.target === e.target.getStage()) {
      setSelectedNodeId(null);
    }
  };

  return (
    <div
      style={{
        width: CANVAS_WIDTH * scale,
        height: CANVAS_HEIGHT * scale,
      }}
      className="shadow-2xl ring-1 ring-white/10 rounded-sm overflow-hidden"
    >
      <Stage
        ref={stageRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleStageClick as (e: Konva.KonvaEventObject<MouseEvent>) => void}
        onTap={handleStageClick as (e: Konva.KonvaEventObject<TouchEvent>) => void}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <Layer>
          <Background />
          <DeceasedPhoto />
          <DynamicTexts />
          <MasterTransformer stageRef={stageRef} />
        </Layer>
      </Stage>
    </div>
  );
});

EditorStage.displayName = 'EditorStage';

export default EditorStage;
