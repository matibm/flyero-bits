import { Text } from 'react-konva';
import { useEditorStore } from '../../store/useEditorStore';
import type { TextConfig } from '../../types';
import type Konva from 'konva';

/**
 * Renders all text elements on the canvas (fixed + dynamic).
 * Now supports dragging, transforming, and styling overrides.
 */
const DynamicTexts: React.FC = () => {
    const data = useEditorStore((s) => s.deceasedData);
    const template = useEditorStore((s) => s.activeTemplate);
    const m = template.mapeo_dinamico;

    const nodeTransforms = useEditorStore((s) => s.nodeTransforms);
    const textOverrides = useEditorStore((s) => s.textOverrides);
    const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
    const updateTransform = useEditorStore((s) => s.updateNodeTransform);

    const renderText = (config: TextConfig, text: string, id: string) => {
        // Merge base config with any manual overrides
        const override = textOverrides[id] || {};
        const finalFontSize = override.fontSize ?? config.fontSize;
        const finalFill = override.fill ?? config.fill;
        const finalAlign = override.align ?? config.align;
        const finalFontFamily = override.fontFamily ?? config.fontFamily;
        const finalText = override.text ?? text;

        // Compute Font Style
        const baseStyle = config.fontStyle ?? 'normal';
        const isBold = override.isBold ?? (baseStyle.includes('bold'));
        const isItalic = override.isItalic ?? (baseStyle.includes('italic'));

        let finalFontStyle = '';
        if (isItalic) finalFontStyle += 'italic ';
        if (isBold) finalFontStyle += 'bold ';
        finalFontStyle = finalFontStyle.trim() || 'normal';

        // Get current transform or fallback to initial config
        const tf = nodeTransforms[id] || {
            x: config.x,
            y: config.y,
            width: config.width ?? 800,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
        };

        const handleSelect = (e: Konva.KonvaEventObject<Event>) => {
            e.cancelBubble = true;
            setSelectedNodeId(id);
        };

        const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
            updateTransform(id, { x: e.target.x(), y: e.target.y() });
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
                key={id}
                id={id}
                name={id}
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
                draggable
                onClick={handleSelect}
                onTap={handleSelect}
                onDragEnd={handleDragEnd}
                onTransformEnd={handleTransformEnd}
                wrap="word"
                // Cursor hints
                onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = 'text';
                }}
                onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = 'default';
                }}
            />
        );
    };

    return (
        <>
            {/* Fixed template text elements */}
            {template.elementos_fijos
                .filter((el) => el.tipo === 'texto')
                .map((el, i) =>
                    renderText(el as TextConfig, el.contenido ?? '', `fix_txt_${i}`)
                )}

            {/* Dynamic data-mapped text fields */}
            {renderText(m.nombres, data.nombres, 'nombres')}
            {renderText(m.apellidos, data.apellidos, 'apellidos')}
            {renderText(
                m.fechas,
                `${data.fecha_nacimiento}  —  ${data.fecha_fallecimiento}`,
                'fechas'
            )}
            {renderText(m.velatorio_lugar, data.velatorio.lugar, 'velatorio_lugar')}
            {renderText(m.velatorio_direccion, data.velatorio.direccion, 'velatorio_direccion')}
            {renderText(
                m.sepelio_fecha_hora,
                `${data.sepelio.fecha}  |  ${data.sepelio.hora}`,
                'sepelio_fecha_hora'
            )}
            {renderText(m.sepelio_lugar, data.sepelio.lugar, 'sepelio_lugar')}
            {renderText(m.frase_dedicatoria, data.frase_dedicatoria, 'frase_dedicatoria')}
        </>
    );
};

export default DynamicTexts;
