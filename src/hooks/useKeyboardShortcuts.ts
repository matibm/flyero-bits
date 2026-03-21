import { useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';

/**
 * Registers global keyboard shortcuts for the editor.
 *
 * - Ctrl+Z / Cmd+Z: Undo
 * - Ctrl+Y / Cmd+Y: Redo
 * - Ctrl+Shift+Z / Cmd+Shift+Z: Redo
 */
export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
