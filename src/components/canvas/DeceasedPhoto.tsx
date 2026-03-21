import { useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { useEditorStore } from '../../store/useEditorStore';
import type Konva from 'konva';

const DeceasedPhoto: React.FC = () => {
  const foto_url = useEditorStore((s) => s.deceasedData.foto_url);

  // Generic transform fallback
  const transform = useEditorStore((s) => s.nodeTransforms['foto_difunto']) || {
    x: 250,
    y: 180,
    width: 300,
    height: 400,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
  const updateTransform = useEditorStore((s) => s.updateNodeTransform);

  const [image] = useImage(foto_url);
  const imageRef = useRef<Konva.Image>(null);

  const handleSelect = (e: Konva.KonvaEventObject<Event>) => {
    e.cancelBubble = true; // Prevent stage click from firing
    setSelectedNodeId('foto_difunto');
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    updateTransform('foto_difunto', {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = () => {
    const node = imageRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale and apply to width/height for cleaner state
    node.scaleX(1);
    node.scaleY(1);

    updateTransform('foto_difunto', {
      x: node.x(),
      y: node.y(),
      width: Math.max(30, node.width() * scaleX),
      height: Math.max(30, node.height() * scaleY),
      rotation: node.rotation(),
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <Image
      id="foto_difunto"
      name="foto_difunto"
      ref={imageRef}
      image={image}
      x={transform.x}
      y={transform.y}
      width={transform.width}
      height={transform.height}
      scaleX={transform.scaleX}
      scaleY={transform.scaleY}
      rotation={transform.rotation}
      draggable
      onClick={handleSelect}
      onTap={handleSelect}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      // Add a visual cue when not selected but hovered (optional but good UI)
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = 'move';
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = 'default';
      }}
    />
  );
};

export default DeceasedPhoto;
