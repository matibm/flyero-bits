import { useEditorStore } from '../../store/useEditorStore';
import { AlignLeft, AlignCenter, AlignRight, Type, Bold, Italic } from 'lucide-react';
import type { TextOverride, TextConfig } from '../../types';

const AVAILABLE_FONTS = [
  'Arial',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Impact',
  'Trebuchet MS',
  'Oswald',
  'Cinzel',
];

const TextPropertiesPanel: React.FC = () => {
  const selectedNodeId = useEditorStore((s) => s.selectedNodeId);
  const textOverrides = useEditorStore((s) => s.textOverrides);
  const updateTextOverride = useEditorStore((s) => s.updateTextOverride);

  const data = useEditorStore((s) => s.deceasedData);
  const template = useEditorStore((s) => s.activeTemplate);
  const m = template.mapeo_dinamico;

  // Only show if a text node is selected (ids match what DynamicTexts uses)
  const isTextSelected = typeof selectedNodeId === 'string' && selectedNodeId !== 'foto_difunto';

  if (!isTextSelected || !selectedNodeId) return null;

  let baseText = '';
  let baseFont = 'Arial';
  let baseIsBold = false;
  let baseIsItalic = false;

  if (selectedNodeId === 'nombres') {
    baseText = data.nombres;
    baseFont = m.nombres.fontFamily;
    baseIsBold = m.nombres.fontStyle?.includes('bold') || false;
    baseIsItalic = m.nombres.fontStyle?.includes('italic') || false;
  } else if (selectedNodeId === 'apellidos') {
    baseText = data.apellidos;
    baseFont = m.apellidos.fontFamily;
    baseIsBold = m.apellidos.fontStyle?.includes('bold') || false;
    baseIsItalic = m.apellidos.fontStyle?.includes('italic') || false;
  } else if (selectedNodeId === 'fechas') {
    baseText = `${data.fecha_nacimiento}  —  ${data.fecha_fallecimiento}`;
    baseFont = m.fechas.fontFamily;
    baseIsBold = m.fechas.fontStyle?.includes('bold') || false;
    baseIsItalic = m.fechas.fontStyle?.includes('italic') || false;
  } else if (selectedNodeId === 'velatorio_lugar') {
    baseText = data.velatorio.lugar;
    baseFont = m.velatorio_lugar.fontFamily;
  } else if (selectedNodeId === 'velatorio_direccion') {
    baseText = data.velatorio.direccion;
    baseFont = m.velatorio_direccion.fontFamily;
  } else if (selectedNodeId === 'sepelio_fecha_hora') {
    baseText = `${data.sepelio.fecha}  |  ${data.sepelio.hora}`;
    baseFont = m.sepelio_fecha_hora.fontFamily;
  } else if (selectedNodeId === 'sepelio_lugar') {
    baseText = data.sepelio.lugar;
    baseFont = m.sepelio_lugar.fontFamily;
  } else if (selectedNodeId === 'frase_dedicatoria') {
    baseText = data.frase_dedicatoria;
    baseFont = m.frase_dedicatoria.fontFamily;
  } else if (selectedNodeId.startsWith('fix_txt_')) {
    const index = parseInt(selectedNodeId.replace('fix_txt_', ''), 10);
    const textosFijos = template.elementos_fijos.filter((el) => el.tipo === 'texto');
    baseText = textosFijos[index]?.contenido || '';
    const config = textosFijos[index] as TextConfig;
    baseFont = config?.fontFamily || 'Arial';
    baseIsBold = config?.fontStyle?.includes('bold') || false;
    baseIsItalic = config?.fontStyle?.includes('italic') || false;
  }

  const overrides = textOverrides[selectedNodeId] || {};

  const currentText = overrides.text ?? baseText;
  const currentFont = overrides.fontFamily ?? baseFont;
  const currentIsBold = overrides.isBold ?? baseIsBold;
  const currentIsItalic = overrides.isItalic ?? baseIsItalic;
  const currentFill = overrides.fill || '#FFFFFF';
  const currentSize = overrides.fontSize || 24;
  const currentAlign = overrides.align || 'center';

  const handleOverride = (updates: Partial<TextOverride>) => {
    updateTextOverride(selectedNodeId, updates);
  };

  return (
    <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-xl space-y-4 shadow-inner my-4">
      <h3 className="text-[11px] font-bold text-sky-700 uppercase tracking-wider flex items-center gap-2 mb-2">
        <Type size={14} /> Editar Texto Seleccionado ({selectedNodeId})
      </h3>

      {/* Content Edit */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">
          Contenido Manual
        </label>
        <textarea
          value={currentText}
          onChange={(e) => handleOverride({ text: e.target.value })}
          rows={2}
          className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-sky-400 outline-none resize-none"
          placeholder="Escribe aquí..."
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">Tipografía</label>
        <select
          value={currentFont}
          onChange={(e) => handleOverride({ fontFamily: e.target.value })}
          className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-sky-400 outline-none bg-white"
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Typography Styles */}
      <div className="flex gap-2">
        <button
          onClick={() => handleOverride({ isBold: !currentIsBold })}
          className={`flex-1 p-2 rounded-lg border flex justify-center items-center transition-colors ${currentIsBold ? 'bg-sky-100 border-sky-300 text-sky-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          title="Negrita"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => handleOverride({ isItalic: !currentIsItalic })}
          className={`flex-1 p-2 rounded-lg border flex justify-center items-center transition-colors ${currentIsItalic ? 'bg-sky-100 border-sky-300 text-sky-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          title="Cursiva"
        >
          <Italic size={16} />
        </button>
      </div>

      {/* Color & Size Row */}
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <label className="block text-[10px] font-semibold text-gray-500 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentFill}
              onChange={(e) => handleOverride({ fill: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-xs text-gray-600 font-mono uppercase">{currentFill}</span>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-[10px] font-semibold text-gray-500 mb-1">Tamaño</label>
          <input
            type="number"
            value={currentSize}
            onChange={(e) => handleOverride({ fontSize: Number(e.target.value) })}
            className="w-full text-sm p-1.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-sky-400 outline-none"
            min={8}
            max={120}
          />
        </div>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-[10px] font-semibold text-gray-500 mb-1">Alineación</label>
        <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => handleOverride({ align: 'left' })}
            className={`flex-1 p-1.5 flex justify-center hover:bg-gray-50 ${currentAlign === 'left' ? 'bg-sky-100 text-sky-700' : 'text-gray-500'}`}
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => handleOverride({ align: 'center' })}
            className={`flex-1 p-1.5 border-x border-gray-200 flex justify-center hover:bg-gray-50 ${currentAlign === 'center' ? 'bg-sky-100 text-sky-700' : 'text-gray-500'}`}
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => handleOverride({ align: 'right' })}
            className={`flex-1 p-1.5 flex justify-center hover:bg-gray-50 ${currentAlign === 'right' ? 'bg-sky-100 text-sky-700' : 'text-gray-500'}`}
          >
            <AlignRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextPropertiesPanel;
