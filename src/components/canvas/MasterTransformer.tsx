import { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { useEditorStore } from '../../store/useEditorStore';
import type Konva from 'konva';

interface MasterTransformerProps {
    stageRef: React.RefObject<Konva.Stage | null>;
}

const MasterTransformer: React.FC<MasterTransformerProps> = ({ stageRef }) => {
    const selectedNodeId = useEditorStore((s) => s.selectedNodeId);
    const transformerRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (!transformerRef.current || !stageRef.current) return;

        if (selectedNodeId) {
            // Find the node in the stage by its ID
            const stage = stageRef.current;
            const selectedNode = stage.findOne(`#${selectedNodeId}`);

            if (selectedNode) {
                transformerRef.current.nodes([selectedNode]);
            } else {
                transformerRef.current.nodes([]);
            }
        } else {
            transformerRef.current.nodes([]);
        }

        // Force a redraw of the layer containing the transformer
        transformerRef.current.getLayer()?.batchDraw();
    }, [selectedNodeId, stageRef]);

    // Keep transformer visible but hidden if no node selected
    if (!selectedNodeId) return null;

    return (
        <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
                // Minimum size constraint
                if (Math.abs(newBox.width) < 30 || Math.abs(newBox.height) < 30) {
                    return oldBox;
                }
                return newBox;
            }}
            borderStroke="#0ea5e9"
            borderStrokeWidth={2}
            anchorStroke="#0ea5e9"
            anchorFill="#ffffff"
            anchorSize={10}
            anchorCornerRadius={5}
            padding={4}
        />
    );
};

export default MasterTransformer;
