import { useState } from 'react';
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ChevronUp,
  ChevronDown,
  Trash2,
  Image as ImageIcon,
  Type as TypeIcon,
  User,
} from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';

const iconForId = (id: string) => {
  if (id === 'foto_difunto') return <User size={13} className="text-sky-600" />;
  if (id.startsWith('img_')) return <ImageIcon size={13} className="text-emerald-600" />;
  return <TypeIcon size={13} className="text-amber-600" />;
};

const LayersPanel: React.FC = () => {
  const layerOrder = useEditorStore((s) => s.layerOrder);
  const nodeMeta = useEditorStore((s) => s.nodeMeta);
  const selectedIds = useEditorStore((s) => s.selectedNodeIds);
  const setSelectedNodeIds = useEditorStore((s) => s.setSelectedNodeIds);
  const updateNodeMeta = useEditorStore((s) => s.updateNodeMeta);
  const bringForward = useEditorStore((s) => s.bringForward);
  const sendBackward = useEditorStore((s) => s.sendBackward);
  const removeImage = useEditorStore((s) => s.removeImage);

  const [collapsed, setCollapsed] = useState(false);

  // Top of canvas = end of array; show in reverse so top layers appear first
  const reversed = [...layerOrder].reverse();

  const handleSelect = (id: string) => setSelectedNodeIds([id]);

  const handleDelete = (id: string) => {
    if (id.startsWith('img_')) removeImage(id);
  };

  return (
    <section>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors"
      >
        <Layers size={14} /> Capas
        <span className="ml-auto text-[10px] font-normal text-gray-400">{layerOrder.length}</span>
      </button>
      {!collapsed && (
        <div className="bg-white rounded-xl border border-gray-100 max-h-72 overflow-y-auto custom-scrollbar">
          {reversed.length === 0 && (
            <p className="p-4 text-xs text-gray-400 text-center">Sin capas</p>
          )}
          {reversed.map((id) => {
            const meta = nodeMeta[id];
            const isSelected = selectedIds.includes(id);
            const canDelete = id.startsWith('img_');
            return (
              <div
                key={id}
                onClick={() => handleSelect(id)}
                className={`flex items-center gap-1.5 px-2 py-1.5 border-b border-gray-50 last:border-0 cursor-pointer transition-colors group ${
                  isSelected ? 'bg-sky-50' : 'hover:bg-gray-50'
                }`}
              >
                {iconForId(id)}
                <span
                  className={`flex-1 text-xs truncate ${
                    meta?.visible === false ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                  title={meta?.name ?? id}
                >
                  {meta?.name ?? id}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    bringForward(id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Subir capa"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendBackward(id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Bajar capa"
                >
                  <ChevronDown size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateNodeMeta(id, { visible: !(meta?.visible ?? true) });
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title={meta?.visible === false ? 'Mostrar' : 'Ocultar'}
                >
                  {meta?.visible === false ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateNodeMeta(id, { locked: !(meta?.locked ?? false) });
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title={meta?.locked ? 'Desbloquear' : 'Bloquear'}
                >
                  {meta?.locked ? <Lock size={12} /> : <Unlock size={12} />}
                </button>
                {canDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Eliminar"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LayersPanel;
