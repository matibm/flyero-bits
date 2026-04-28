import { Layout } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';
import { CANVAS_PRESETS } from '../../types';

const CanvasSizeSelector: React.FC = () => {
  const canvas = useEditorStore((s) => s.canvasSize);
  const setCanvasSize = useEditorStore((s) => s.setCanvasSize);

  return (
    <section>
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Layout size={14} /> Formato
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {CANVAS_PRESETS.map((preset) => {
          const isActive = preset.presetId === canvas.presetId;
          return (
            <button
              key={preset.presetId}
              type="button"
              onClick={() => setCanvasSize(preset)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sky-300'
              }`}
              title={`${preset.description ?? ''} (${preset.width}×${preset.height})`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CanvasSizeSelector;
