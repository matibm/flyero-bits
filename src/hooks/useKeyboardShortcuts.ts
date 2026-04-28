import { useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';

/**
 * Global keyboard shortcuts.
 *  - Ctrl/Cmd+Z: Undo
 *  - Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z: Redo
 *  - Delete / Backspace: remove selected user-added image
 *  - Esc: deselect
 */
export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === 'Escape') {
        useEditorStore.getState().setSelectedNodeIds([]);
        return;
      }

      if (!isTyping && (e.key === 'Delete' || e.key === 'Backspace')) {
        const ids = useEditorStore.getState().selectedNodeIds;
        if (ids.length === 0) return;
        e.preventDefault();
        const { removeImage } = useEditorStore.getState();
        ids.forEach((id) => {
          if (id.startsWith('img_')) removeImage(id);
        });
        return;
      }

      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      // Redo: Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z
      if (
        (e.key === 'y' && !e.shiftKey) ||
        (e.key === 'z' && e.shiftKey) ||
        (e.key === 'Z' && e.shiftKey)
      ) {
        e.preventDefault();
        useEditorStore.temporal.getState().redo();
        return;
      }

      // Undo: Ctrl/Cmd+Z (without Shift)
      if ((e.key === 'z' || e.key === 'Z') && !e.shiftKey) {
        e.preventDefault();
        useEditorStore.temporal.getState().undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
