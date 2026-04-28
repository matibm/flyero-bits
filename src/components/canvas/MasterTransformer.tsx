import { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { useEditorStore } from '../../store/useEditorStore';
import type Konva from 'konva';

interface MasterTransformerProps {
  stageRef: React.RefObject<Konva.Stage | null>;
}

const MasterTransformer: React.FC<MasterTransformerProps> = ({ stageRef }) => {
  const selectedIds = useEditorStore((s) => s.selectedNodeIds);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!transformerRef.current || !stageRef.current) return;
    const stage = stageRef.current;

    const nodes = selectedIds
      .map((id) => stage.findOne(`#${id}`))
      .filter((n): n is Konva.Node => Boolean(n));

    transformerRef.current.nodes(nodes);
    transformerRef.current.getLayer()?.batchDraw();
  }, [selectedIds, stageRef]);

  if (selectedIds.length === 0) return null;

  return (
    <Transformer
      ref={transformerRef}
      boundBoxFunc={(oldBox, newBox) => {
        if (Math.abs(newBox.width) < 20 || Math.abs(newBox.height) < 20) return oldBox;
        return newBox;
      }}
      borderStroke="#0ea5e9"
      borderStrokeWidth={2}
      anchorStroke="#0ea5e9"
      anchorFill="#ffffff"
      anchorSize={10}
      anchorCornerRadius={5}
      padding={4}
      rotateAnchorOffset={28}
    />
  );
};

export default MasterTransformer;
