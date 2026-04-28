import { Line } from 'react-konva';
import type { Guide } from '../../hooks/useSmartGuides';

interface Props {
  guides: Guide[];
  canvasWidth: number;
  canvasHeight: number;
}

const SmartGuides: React.FC<Props> = ({ guides, canvasWidth, canvasHeight }) => {
  if (guides.length === 0) return null;

  return (
    <>
      {guides.map((g, i) => {
        const points =
          g.orientation === 'V'
            ? [g.position, 0, g.position, canvasHeight]
            : [0, g.position, canvasWidth, g.position];
        return (
          <Line
            key={i}
            points={points}
            stroke="#ec4899"
            strokeWidth={1}
            dash={[4, 4]}
            listening={false}
          />
        );
      })}
    </>
  );
};

export default SmartGuides;
