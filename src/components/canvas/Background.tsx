import { Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { useEditorStore } from '../../store/useEditorStore';

const Background: React.FC = () => {
  const fondo_url = useEditorStore((s) => s.activeTemplate.fondo_url);
  const customBackgroundUrl = useEditorStore((s) => s.customBackgroundUrl);
  const bgOverlay = useEditorStore((s) => s.bgOverlay);
  const [image] = useImage(customBackgroundUrl || fondo_url);

  return (
    <>
      <Image image={image} x={0} y={0} width={800} height={1200} listening={false} />
      {bgOverlay.opacity > 0 && (
        <Rect
          x={0}
          y={0}
          width={800}
          height={1200}
          fill={bgOverlay.color}
          opacity={bgOverlay.opacity}
          listening={false}
        />
      )}
    </>
  );
};

export default Background;
