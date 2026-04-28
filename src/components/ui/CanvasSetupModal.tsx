import { useState } from 'react';
import { X, Layout } from 'lucide-react';
import { CANVAS_PRESETS } from '../../types';
import type { CanvasSize } from '../../types';
import { useEditorStore } from '../../store/useEditorStore';

const CanvasSetupModal: React.FC = () => {
  const needsCanvasSetup = useEditorStore((s) => s.needsCanvasSetup);
  const setCanvasSize = useEditorStore((s) => s.setCanvasSize);
  const completeCanvasSetup = useEditorStore((s) => s.completeCanvasSetup);

  const [chosen, setChosen] = useState<CanvasSize>(CANVAS_PRESETS[0]);

  if (!needsCanvasSetup) return null;

  const handleConfirm = () => {
    setCanvasSize(chosen);
    completeCanvasSetup();
  };

  const handleSkip = () => {
    completeCanvasSetup();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-2.5 rounded-xl text-white">
              <Layout size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Elige el formato del flyer</h2>
              <p className="text-sm text-gray-500">
                Podrás cambiarlo más adelante desde la barra lateral.
              </p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            title="Continuar con el formato actual"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto">
          {CANVAS_PRESETS.map((preset) => {
            const isSelected = chosen.presetId === preset.presetId;
            const aspect = preset.width / preset.height;
            const previewW = aspect >= 1 ? 120 : 120 * aspect;
            const previewH = aspect >= 1 ? 120 / aspect : 120;
            return (
              <button
                key={preset.presetId}
                type="button"
                onClick={() => setChosen(preset)}
                className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50 shadow-md'
                    : 'border-gray-200 hover:border-sky-300 hover:bg-gray-50'
                }`}
              >
                <div className="h-32 flex items-center justify-center w-full">
                  <div
                    style={{ width: previewW, height: previewH }}
                    className={`rounded-md ${
                      isSelected
                        ? 'bg-gradient-to-br from-sky-200 to-sky-400'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300'
                    }`}
                  />
                </div>
                <div className="w-full">
                  <div
                    className={`text-sm font-semibold ${isSelected ? 'text-sky-700' : 'text-gray-800'}`}
                  >
                    {preset.name}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{preset.description}</div>
                  <div className="text-[10px] font-mono text-gray-400 mt-1">
                    {preset.width} × {preset.height}px
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Saltar — usar formato actual
          </button>
          <button
            onClick={handleConfirm}
            className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
          >
            Comenzar con {chosen.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasSetupModal;
