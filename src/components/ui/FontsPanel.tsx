import { useState, useEffect } from 'react';
import { Type, Plus, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useEditorStore } from '../../store/useEditorStore';
import { CURATED_FONTS, loadGoogleFont, extractFamilyFromUrl } from '../../data/fonts';

const FontsPanel: React.FC = () => {
  const customFonts = useEditorStore((s) => s.customFonts);
  const addCustomFont = useEditorStore((s) => s.addCustomFont);
  const removeCustomFont = useEditorStore((s) => s.removeCustomFont);

  const [collapsed, setCollapsed] = useState(true);
  const [urlInput, setUrlInput] = useState('');

  // Lazy-load curated fonts when panel opens (already done at startup,
  // but harmless to re-call — the loader dedupes).
  useEffect(() => {
    if (!collapsed) {
      CURATED_FONTS.forEach((f) => loadGoogleFont(f.family, f.url));
    }
  }, [collapsed]);

  const handleAddByUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!url.startsWith('https://fonts.googleapis.com')) {
      toast.error('La URL debe ser de fonts.googleapis.com');
      return;
    }
    const family = extractFamilyFromUrl(url);
    if (!family) {
      toast.error('No se pudo extraer la fuente de la URL.');
      return;
    }
    loadGoogleFont(family, url);
    addCustomFont({ family, url });
    setUrlInput('');
    toast.success(`Fuente "${family}" agregada.`);
  };

  return (
    <section>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors"
      >
        <Type size={14} /> Tipografías
        <span className="ml-auto text-[10px] font-normal text-gray-400">
          {CURATED_FONTS.length + customFonts.length}
        </span>
      </button>
      {!collapsed && (
        <div className="space-y-3">
          {/* Add by URL */}
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <label className="block text-[10px] font-semibold text-gray-500 mb-1">
              Pegar URL de Google Fonts
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://fonts.googleapis.com/css2?family=..."
                className="flex-1 text-[11px] p-1.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-sky-400 outline-none font-mono"
              />
              <button
                onClick={handleAddByUrl}
                className="bg-slate-900 hover:bg-black text-white p-1.5 rounded-md cursor-pointer"
                title="Agregar fuente"
              >
                <Plus size={14} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Buscar en{' '}
              <a
                href="https://fonts.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-sky-600 underline"
              >
                fonts.google.com
              </a>{' '}
              y copiar el {'<link>'} CSS.
            </p>
          </div>

          {/* Custom fonts */}
          {customFonts.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-gray-500 mb-1.5 uppercase">
                Mis fuentes
              </p>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                {customFonts.map((f) => (
                  <div key={f.family} className="flex items-center gap-2 px-2.5 py-1.5">
                    <span
                      className="flex-1 text-sm text-gray-800 truncate"
                      style={{ fontFamily: f.family }}
                    >
                      {f.family}
                    </span>
                    <button
                      onClick={() => removeCustomFont(f.family)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                      title="Quitar fuente"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curated catalog */}
          <div>
            <p className="text-[10px] font-semibold text-gray-500 mb-1.5 uppercase">
              Catálogo curado
            </p>
            <div className="bg-white rounded-xl border border-gray-100 max-h-60 overflow-y-auto custom-scrollbar">
              {CURATED_FONTS.map((f) => (
                <div
                  key={f.family}
                  className="flex items-center gap-2 px-2.5 py-1.5 border-b border-gray-50 last:border-0"
                >
                  <span
                    className="flex-1 text-sm text-gray-800 truncate"
                    style={{ fontFamily: f.family }}
                    title={f.hint}
                  >
                    {f.family}
                  </span>
                  <span className="text-[10px] text-gray-400 capitalize">{f.category}</span>
                  <Check size={11} className="text-emerald-500" />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Disponibles en el selector de fuentes al editar texto.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FontsPanel;
