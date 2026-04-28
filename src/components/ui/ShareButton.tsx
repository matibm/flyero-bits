import { useCallback, useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEditorStore } from '../../store/useEditorStore';
import type { EditorStageHandle } from '../canvas/EditorStage';

interface ShareButtonProps {
  stageRef: React.RefObject<EditorStageHandle | null>;
}

const ShareButton: React.FC<ShareButtonProps> = ({ stageRef }) => {
  const setSelectedNodeIds = useEditorStore((s) => s.setSelectedNodeIds);
  const data = useEditorStore((s) => s.deceasedData);
  const [sharing, setSharing] = useState(false);

  const buildFileName = useCallback((): string => {
    const nombres = data.nombres.replace(/\s+/g, '_');
    const apellidos = data.apellidos.replace(/\s+/g, '_');
    return `Obituario_${nombres}_${apellidos}.jpg`;
  }, [data.nombres, data.apellidos]);

  /**
   * Captures the Konva stage as a Blob.
   * Deselects the active node first so transformer handles are hidden.
   */
  const captureBlob = useCallback(
    (): Promise<Blob> =>
      new Promise((resolve, reject) => {
        const stage = stageRef.current?.getStage();
        if (!stage) {
          reject(new Error('Stage not available'));
          return;
        }

        setSelectedNodeIds([]);

        // Small delay to let React re-render without the transformer
        setTimeout(() => {
          try {
            const uri = stage.toDataURL({
              pixelRatio: 3,
              mimeType: 'image/jpeg',
              quality: 0.9,
            });

            // Convert data URL to Blob
            const byteString = atob(uri.split(',')[1]);
            const mimeString = uri.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            resolve(blob);
          } catch (err) {
            reject(err);
          }
        }, 150);
      }),
    [stageRef, setSelectedNodeIds],
  );

  const handleShare = useCallback(async () => {
    if (sharing) return;
    setSharing(true);

    try {
      const blob = await captureBlob();
      const file = new File([blob], buildFileName(), { type: 'image/jpeg' });

      // Try Web Share API first
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Obituario - ${data.nombres} ${data.apellidos}`,
          files: [file],
        });
        toast.success('Flyer compartido exitosamente.');
      } else {
        // Fallback: open WhatsApp Web with pre-filled message
        const text = encodeURIComponent(`Obituario - ${data.nombres} ${data.apellidos}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
        toast.info('Se abrió WhatsApp. La imagen fue descargada para que puedas adjuntarla.');

        // Also download the image so the user can attach it manually
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = buildFileName();
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      // User cancelled share dialog is not an error
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Share error:', err);
      toast.error('Error al compartir. Si subió una imagen externa, intente con una imagen local.');
    } finally {
      setSharing(false);
    }
  }, [captureBlob, buildFileName, data.nombres, data.apellidos, sharing]);

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c55e] hover:to-[#0f766e] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-green-900/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
    >
      {sharing ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Compartiendo...
        </>
      ) : (
        <>
          <MessageCircle size={18} />
          WhatsApp
        </>
      )}
    </button>
  );
};

export default ShareButton;
