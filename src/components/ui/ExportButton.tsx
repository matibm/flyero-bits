import { useCallback } from 'react';
import { Download } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';
import type { EditorStageHandle } from '../canvas/EditorStage';

interface ExportButtonProps {
    stageRef: React.RefObject<EditorStageHandle | null>;
}

const ExportButton: React.FC<ExportButtonProps> = ({ stageRef }) => {
    const data = useEditorStore((s) => s.deceasedData);
    const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);

    const handleExport = useCallback(() => {
        const stage = stageRef.current?.getStage();
        if (!stage) return;

        // Deselect to hide transformer handles in export
        setSelectedNodeId(null);

        // Small delay to let React re-render without the transformer
        setTimeout(() => {
            try {
                const uri = stage.toDataURL({
                    pixelRatio: 3,
                    mimeType: 'image/jpeg',
                    quality: 0.9,
                });

                const link = document.createElement('a');
                link.download = `Obituario_${data.nombres.replace(/\s+/g, '_')}_${data.apellidos.replace(/\s+/g, '_')}.jpg`;
                link.href = uri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error('Export error:', err);
                alert(
                    'Error al generar el archivo. Si subió una imagen externa, intente con una imagen local.'
                );
            }
        }, 150);
    }, [stageRef, data.nombres, data.apellidos, setSelectedNodeId]);

    return (
        <button
            onClick={handleExport}
            className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-slate-900/30 cursor-pointer"
        >
            <Download size={18} />
            Exportar Flyer (JPG)
        </button>
    );
};

export default ExportButton;
