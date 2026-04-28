import { useRef, useMemo } from 'react';
import { Image as KImage, Text } from 'react-konva';
import useImage from 'use-image';
import { useEditorStore } from '../../store/useEditorStore';
import type { TextConfig } from '../../types';
import type Konva from 'konva';

// ============================================================================
// Helpers
// ============================================================================

interface DragHandlers {
  onDragMove?: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragEnd?: () => void;
}

const cursorOnEnter = (e: Konva.KonvaEventObject<Event>, cursor: string) => {
  const c = e.target.getStage()?.container();
  if (c) c.style.cursor = cursor;
};

const cursorOnLeave = (e: Konva.KonvaEventObject<Event>) => {
  const c = e.target.getStage()?.container();
  if (c) c.style.cursor = 'default';
};

// ============================================================================
// Photo (foto_difunto)
// ============================================================================

const PhotoNode: React.FC<DragHandlers> = ({ onDragMove, onDragEnd }) => {
  const id = 'foto_difunto';
  const url = useEditorStore((s) => s.deceasedData.foto_url);
  const transform = useEditorStore((s) => s.nodeTransforms[id]);
  const meta = useEditorStore((s) => s.nodeMeta[id]);
  const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
  const toggleSelectedNodeId = useEditorStore((s) => s.toggleSelectedNodeId);
  const updateTransform = useEditorStore((s) => s.updateNodeTransform);
  const [image] = useImage(url, 'anonymous');
  const ref = useRef<Konva.Image>(null);

  if (!transform || meta?.visible === false) return null;

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    if (e.evt && (e.evt as MouseEvent).shiftKey) toggleSelectedNodeId(id);
    else setSelectedNodeId(id);
  };
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    updateTransform(id, { x: e.target.x(), y: e.target.y() });
    onDragEnd?.();
  };
  const handleTransformEnd = () => {
    const k = ref.current;
    if (!k) return;
    const sx = k.scaleX();
    const sy = k.scaleY();
    k.scaleX(1);
    k.scaleY(1);
    updateTransform(id, {
      x: k.x(),
      y: k.y(),
      width: Math.max(20, k.width() * sx),
      height: Math.max(20, k.height() * sy),
      rotation: k.rotation(),
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <KImage
      id={id}
      name="snap-target"
      ref={ref}
      image={image}
      x={transform.x}
      y={transform.y}
      width={transform.width}
      height={transform.height}
      scaleX={transform.scaleX}
      scaleY={transform.scaleY}
      rotation={transform.rotation}
      draggable={!meta?.locked}
      listening={!meta?.locked}
      onClick={handleSelect}
      onTap={handleSelect}
      onDragMove={onDragMove}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      onMouseEnter={(e) => cursorOnEnter(e, 'move')}
      onMouseLeave={cursorOnLeave}
    />
  );
};

// ============================================================================
// Text node (fixed or dynamic)
// ============================================================================

interface TextNodeProps extends DragHandlers {
  id: string;
}

const TextNode: React.FC<TextNodeProps> = ({ id, onDragMove, onDragEnd }) => {
  const data = useEditorStore((s) => s.deceasedData);
  const template = useEditorStore((s) => s.activeTemplate);
  const canvas = useEditorStore((s) => s.canvasSize);
  const transformsMap = useEditorStore((s) => s.nodeTransforms);
  const overrides = useEditorStore((s) => s.textOverrides[id]);
  const meta = useEditorStore((s) => s.nodeMeta[id]);
  const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
  const toggleSelectedNodeId = useEditorStore((s) => s.toggleSelectedNodeId);
  const updateTransform = useEditorStore((s) => s.updateNodeTransform);

  const ref = useRef<Konva.Text>(null);

  // Scale ratio between the canvas and the template's design baseline (default 800x1200).
  const baseW = template.base_width ?? 800;
  const baseH = template.base_height ?? 1200;
  const scaleRatioX = canvas.width / baseW;
  const scaleRatioY = canvas.height / baseH;
  const fontScale = Math.min(scaleRatioX, scaleRatioY);

  const resolved = useMemo(() => {
    let config: TextConfig | null = null;
    let baseText = '';

    const m = template.mapeo_dinamico;
    if (id === 'nombres') {
      config = m.nombres;
      baseText = data.nombres;
    } else if (id === 'apellidos') {
      config = m.apellidos;
      baseText = data.apellidos;
    } else if (id === 'fechas') {
      config = m.fechas;
      baseText = `(*) ${data.fecha_nacimiento}    ${data.fecha_fallecimiento} (†)`;
    } else if (id === 'velatorio_lugar') {
      config = m.velatorio_lugar;
      baseText = data.velatorio.lugar;
    } else if (id === 'velatorio_direccion') {
      config = m.velatorio_direccion;
      baseText = data.velatorio.direccion;
    } else if (id === 'sepelio_fecha_hora') {
      config = m.sepelio_fecha_hora;
      baseText = `${data.sepelio.fecha}  |  ${data.sepelio.hora}`;
    } else if (id === 'sepelio_lugar') {
      config = m.sepelio_lugar;
      baseText = data.sepelio.lugar;
    } else if (id === 'frase_dedicatoria') {
      config = m.frase_dedicatoria;
      baseText = data.frase_dedicatoria;
    } else if (id.startsWith('fix_txt_')) {
      const idx = parseInt(id.replace('fix_txt_', ''), 10);
      const fixedTexts = template.elementos_fijos.filter((el) => el.tipo === 'texto');
      const f = fixedTexts[idx];
      if (f) {
        config = f as TextConfig;
        baseText = f.contenido ?? '';
      }
    }

    return { config, baseText };
  }, [id, template, data]);

  if (!resolved.config || !meta || !meta.visible) return null;
  const config = resolved.config;

  const o = overrides ?? {};
  const finalFontSize = o.fontSize ?? Math.round(config.fontSize * fontScale);
  const finalFill = o.fill ?? config.fill;
  const finalAlign = o.align ?? config.align;
  const finalFontFamily = o.fontFamily ?? config.fontFamily;
  const finalText = o.text ?? resolved.baseText;
  const baseStyle = config.fontStyle ?? 'normal';
  const isBold = o.isBold ?? baseStyle.includes('bold');
  const isItalic = o.isItalic ?? baseStyle.includes('italic');
  let finalFontStyle = '';
  if (isItalic) finalFontStyle += 'italic ';
  if (isBold) finalFontStyle += 'bold ';
  finalFontStyle = finalFontStyle.trim() || 'normal';

  const tf = transformsMap[id] ?? {
    x: config.x * scaleRatioX,
    y: config.y * scaleRatioY,
    width: (config.width ?? baseW) * scaleRatioX,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    if (e.evt && (e.evt as MouseEvent).shiftKey) toggleSelectedNodeId(id);
    else setSelectedNodeId(id);
  };
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    updateTransform(id, { x: e.target.x(), y: e.target.y() });
    onDragEnd?.();
  };
  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = e.target as Konva.Text;
    updateTransform(id, {
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
      rotation: node.rotation(),
    });
  };

  return (
    <Text
      id={id}
      name="snap-target"
      ref={ref}
      x={tf.x}
      y={tf.y}
      width={tf.width}
      scaleX={tf.scaleX}
      scaleY={tf.scaleY}
      rotation={tf.rotation}
      fontSize={finalFontSize}
      fontFamily={finalFontFamily}
      fontStyle={finalFontStyle}
      fill={finalFill}
      align={finalAlign}
      text={finalText}
      draggable={!meta.locked}
      listening={!meta.locked}
      onClick={handleSelect}
      onTap={handleSelect}
      onDragMove={onDragMove}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      wrap="word"
      onMouseEnter={(e) => cursorOnEnter(e, 'text')}
      onMouseLeave={cursorOnLeave}
    />
  );
};

// ============================================================================
// User image node
// ============================================================================

interface ImageNodeProps extends DragHandlers {
  id: string;
}

const UserImageNode: React.FC<ImageNodeProps> = ({ id, onDragMove, onDragEnd }) => {
  const node = useEditorStore((s) => s.images.find((i) => i.id === id));
  const transform = useEditorStore((s) => s.nodeTransforms[id]);
  const meta = useEditorStore((s) => s.nodeMeta[id]);
  const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
  const toggleSelectedNodeId = useEditorStore((s) => s.toggleSelectedNodeId);
  const updateTransform = useEditorStore((s) => s.updateNodeTransform);

  const [image] = useImage(node?.url ?? '', 'anonymous');
  const ref = useRef<Konva.Image>(null);

  if (!node || !transform || !meta?.visible) return null;

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    if (e.evt && (e.evt as MouseEvent).shiftKey) toggleSelectedNodeId(id);
    else setSelectedNodeId(id);
  };
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    updateTransform(id, { x: e.target.x(), y: e.target.y() });
    onDragEnd?.();
  };
  const handleTransformEnd = () => {
    const k = ref.current;
    if (!k) return;
    const sx = k.scaleX();
    const sy = k.scaleY();
    k.scaleX(1);
    k.scaleY(1);
    updateTransform(id, {
      x: k.x(),
      y: k.y(),
      width: Math.max(20, (transform.width ?? node.width) * sx),
      height: Math.max(20, (transform.height ?? node.height) * sy),
      rotation: k.rotation(),
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <KImage
      id={id}
      name="snap-target"
      ref={ref}
      image={image}
      x={transform.x}
      y={transform.y}
      width={transform.width ?? node.width}
      height={transform.height ?? node.height}
      scaleX={transform.scaleX}
      scaleY={transform.scaleY}
      rotation={transform.rotation}
      draggable={!meta.locked}
      listening={!meta.locked}
      onClick={handleSelect}
      onTap={handleSelect}
      onDragMove={onDragMove}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      onMouseEnter={(e) => cursorOnEnter(e, 'move')}
      onMouseLeave={cursorOnLeave}
    />
  );
};

// ============================================================================
// Layered renderer
// ============================================================================

const KNOWN_TEXT_IDS = new Set([
  'nombres',
  'apellidos',
  'fechas',
  'velatorio_lugar',
  'velatorio_direccion',
  'sepelio_fecha_hora',
  'sepelio_lugar',
  'frase_dedicatoria',
]);

type CanvasNodesProps = DragHandlers;

const CanvasNodes: React.FC<CanvasNodesProps> = ({ onDragMove, onDragEnd }) => {
  const layerOrder = useEditorStore((s) => s.layerOrder);

  return (
    <>
      {layerOrder.map((id) => {
        if (id === 'foto_difunto') {
          return <PhotoNode key={id} onDragMove={onDragMove} onDragEnd={onDragEnd} />;
        }
        if (id.startsWith('fix_txt_') || KNOWN_TEXT_IDS.has(id)) {
          return <TextNode key={id} id={id} onDragMove={onDragMove} onDragEnd={onDragEnd} />;
        }
        if (id.startsWith('img_')) {
          return <UserImageNode key={id} id={id} onDragMove={onDragMove} onDragEnd={onDragEnd} />;
        }
        return null;
      })}
    </>
  );
};

export default CanvasNodes;
