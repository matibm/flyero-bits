import { RotateCcw } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';

const ResetButton: React.FC = () => {
  const startNewFlyer = useEditorStore((s) => s.startNewFlyer);

  const handleReset = () => {
    const confirmed = window.confirm(
      '¿Crear un nuevo flyer? Se perderán los cambios no guardados.',
    );
    if (!confirmed) return;
    startNewFlyer();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      title="Crear nuevo flyer"
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-colors duration-150 cursor-pointer"
    >
      <RotateCcw size={14} />
      Nuevo
    </button>
  );
};

export default ResetButton;
