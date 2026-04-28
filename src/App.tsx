import { useRef } from 'react';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/ui/Sidebar';
import CanvasWorkspace from './components/canvas/CanvasWorkspace';
import UndoRedoButtons from './components/ui/UndoRedoButtons';
import CanvasSetupModal from './components/ui/CanvasSetupModal';
import type { EditorStageHandle } from './components/canvas/EditorStage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const stageRef = useRef<EditorStageHandle>(null);
  useKeyboardShortcuts();

  return (
    <ErrorBoundary>
      <div className="flex w-full h-screen font-sans bg-neutral-900">
        <Sidebar stageRef={stageRef} />
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className="absolute top-4 right-4 z-20">
            <UndoRedoButtons />
          </div>
          <CanvasWorkspace stageRef={stageRef} />
        </div>
      </div>
      <CanvasSetupModal />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1e1e1e',
            border: '1px solid #333',
            color: '#f5f5f5',
          },
        }}
        richColors
        closeButton
      />
    </ErrorBoundary>
  );
}

export default App;
