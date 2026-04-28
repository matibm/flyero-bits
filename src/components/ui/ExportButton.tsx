import { useCallback, useState } from 'react';
import { FileImage, FileText, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';
import { useEditorStore } from '../../store/useEditorStore';
import type { EditorStageHandle } from '../canvas/EditorStage';

type ExportFormat = 'jpg' | 'pdf';

interface ExportButtonProps {
  stageRef: React.RefObject<EditorStageHandle | null>;
}

const ExportButton: React.FC<ExportButtonProps> = ({ stageRef }) => {
  const data = useEditorStore((s) => s.deceasedData);
  const canvas = useEditorStore((s) => s.canvasSize);
  const setSelectedNodeIds = useEditorStore((s) => s.setSelectedNodeIds);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);

  const buildFileName = useCallback(
    (ext: string): string => {
      const nombres = data.nombres.replace(/\s+/g, '_');
      const apellidos = data.apellidos.replace(/\s+/g, '_');
      return `Obituario_${nombres}_${apellidos}.${ext}`;
    },
    [data.nombres, data.apellidos],
  );

  const captureStage = useCallback(
    (): Promise<string> =>
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
            // Cap pixelRatio so very large canvases (A4 print) stay reasonable
            const maxDim = Math.max(canvas.width, canvas.height);
            const pixelRatio = maxDim >= 1920 ? 2 : 3;
            const uri = stage.toDataURL({
              pixelRatio,
              mimeType: 'image/jpeg',
              quality: 0.92,
            });
            resolve(uri);
          } catch (err) {
            reject(err);
          }
        }, 150);
      }),
    [stageRef, setSelectedNodeIds, canvas.width, canvas.height],
  );

  const handleExportJPG = useCallback(async () => {
    if (exportingFormat) return;
    setExportingFormat('jpg');
    try {
      const uri = await captureStage();
      const link = document.createElement('a');
      link.download = buildFileName('jpg');
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Flyer exportado como JPG.');
    } catch (err) {
      console.error('JPG export error:', err);
      toast.error('Error al generar el archivo.');
    } finally {
      setExportingFormat(null);
    }
  }, [captureStage, buildFileName, exportingFormat]);

  const handleExportPDF = useCallback(async () => {
    if (exportingFormat) return;
    setExportingFormat('pdf');
    try {
      const uri = await captureStage();
      // Map canvas pixels to mm preserving aspect ratio.
      // Use 96 dpi → mm: 1 px = 0.2645833 mm. Cap width to 297mm (A4) for print sizes.
      const ratio = canvas.height / canvas.width;
      const pdfWidthMM = canvas.width >= 1240 ? 210 : 180;
      const pdfHeightMM = pdfWidthMM * ratio;
      const orientation = pdfWidthMM > pdfHeightMM ? 'landscape' : 'portrait';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [pdfWidthMM, pdfHeightMM],
      });
      pdf.setProperties({
        title: `Obituario - ${data.nombres} ${data.apellidos}`,
        creator: 'Flyer Generator - Imperial',
      });
      pdf.addImage(uri, 'JPEG', 0, 0, pdfWidthMM, pdfHeightMM);
      pdf.save(buildFileName('pdf'));
      toast.success('Flyer exportado como PDF.');
    } catch (err) {
      console.error('PDF export error:', err);
      toast.error('Error al generar el PDF.');
    } finally {
      setExportingFormat(null);
    }
  }, [
    captureStage,
    buildFileName,
    data.nombres,
    data.apellidos,
    canvas.width,
    canvas.height,
    exportingFormat,
  ]);

  const isExporting = exportingFormat !== null;

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleExportJPG}
        disabled={isExporting}
        className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-slate-900/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {exportingFormat === 'jpg' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Exportando...
          </>
        ) : (
          <>
            <FileImage size={18} /> JPG
          </>
        )}
      </button>
      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="flex-1 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-red-900/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {exportingFormat === 'pdf' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Exportando...
          </>
        ) : (
          <>
            <FileText size={18} /> PDF
          </>
        )}
      </button>
    </div>
  );
};

export default ExportButton;
