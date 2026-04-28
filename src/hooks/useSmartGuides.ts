import { useCallback, useState } from 'react';
import type Konva from 'konva';

/**
 * Smart guides + snap-to-edge helper.
 *
 * Returns:
 *  - guides: lines to render in a Konva overlay layer while dragging
 *  - handleDragMove(e): call from a Konva node's `onDragMove`. Snaps the
 *    node to nearest center / edge of either the canvas or a sibling node
 *    when within `threshold` px and emits guide lines for the matched anchors.
 *  - handleDragEnd: clears guides.
 *
 * "Sibling" candidates are derived live from the stage by tag-matching
 * draggable nodes other than the one being dragged.
 */
export interface Guide {
  orientation: 'V' | 'H';
  /** x for vertical guide, y for horizontal guide. */
  position: number;
}

interface UseSmartGuidesOptions {
  enabled: boolean;
  canvasWidth: number;
  canvasHeight: number;
  threshold?: number;
}

interface NodeBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function getNodeBox(node: Konva.Node): NodeBox | null {
  const id = node.id();
  if (!id) return null;
  const rect = node.getClientRect({ skipTransform: false, skipShadow: true });
  return { id, x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

export function useSmartGuides({
  enabled,
  canvasWidth,
  canvasHeight,
  threshold = 6,
}: UseSmartGuidesOptions) {
  const [guides, setGuides] = useState<Guide[]>([]);

  const handleDragMove = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      if (!enabled) return;
      const target = e.target;
      const stage = target.getStage();
      if (!stage) return;

      const box = getNodeBox(target);
      if (!box) return;

      // Anchors of the dragged node
      const movingV = [box.x, box.x + box.width / 2, box.x + box.width];
      const movingH = [box.y, box.y + box.height / 2, box.y + box.height];

      // Static anchors: canvas edges + center
      const staticV = [0, canvasWidth / 2, canvasWidth];
      const staticH = [0, canvasHeight / 2, canvasHeight];

      // Sibling anchors
      stage.find('.snap-target').forEach((node) => {
        if (node === target) return;
        const sibBox = getNodeBox(node);
        if (!sibBox) return;
        staticV.push(sibBox.x, sibBox.x + sibBox.width / 2, sibBox.x + sibBox.width);
        staticH.push(sibBox.y, sibBox.y + sibBox.height / 2, sibBox.y + sibBox.height);
      });

      let bestVDelta = Infinity;
      let bestVAnchor: number | null = null;
      let bestVMovingIndex = 0;
      for (const sv of staticV) {
        for (let i = 0; i < movingV.length; i++) {
          const d = sv - movingV[i];
          if (Math.abs(d) < Math.abs(bestVDelta) && Math.abs(d) <= threshold) {
            bestVDelta = d;
            bestVAnchor = sv;
            bestVMovingIndex = i;
          }
        }
      }

      let bestHDelta = Infinity;
      let bestHAnchor: number | null = null;
      let bestHMovingIndex = 0;
      for (const sh of staticH) {
        for (let i = 0; i < movingH.length; i++) {
          const d = sh - movingH[i];
          if (Math.abs(d) < Math.abs(bestHDelta) && Math.abs(d) <= threshold) {
            bestHDelta = d;
            bestHAnchor = sh;
            bestHMovingIndex = i;
          }
        }
      }

      const newGuides: Guide[] = [];
      if (bestVAnchor !== null) {
        target.x(target.x() + bestVDelta);
        newGuides.push({ orientation: 'V', position: bestVAnchor });
      }
      if (bestHAnchor !== null) {
        target.y(target.y() + bestHDelta);
        newGuides.push({ orientation: 'H', position: bestHAnchor });
      }
      void bestVMovingIndex;
      void bestHMovingIndex;
      setGuides(newGuides);
    },
    [enabled, canvasWidth, canvasHeight, threshold],
  );

  const handleDragEnd = useCallback(() => setGuides([]), []);

  return { guides, handleDragMove, handleDragEnd };
}
