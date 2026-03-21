import { Undo2, Redo2 } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';
import { useStore } from 'zustand';
import type { TemporalState } from 'zundo';

const useTemporalStore = <T,>(selector: (state: TemporalState<unknown>) => T): T =>
  useStore(useEditorStore.temporal, selector);

const UndoRedoButtons: React.FC = () => {
  const undo = useTemporalStore((state) => state.undo);
  const redo = useTemporalStore((state) => state.redo);
  const pastStates = useTemporalStore((state) => state.pastStates);
  const futureStates = useTemporalStore((state) => state.futureStates);

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => undo()}
        disabled={!canUndo}
        title="Deshacer (Ctrl+Z)"
        className="p-2 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-300"
      >
        <Undo2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => redo()}
        disabled={!canRedo}
        title="Rehacer (Ctrl+Y)"
        className="p-2 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-300"
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
};

export default UndoRedoButtons;
