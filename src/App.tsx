import { useRef } from 'react';
import Sidebar from './components/ui/Sidebar';
import CanvasWorkspace from './components/canvas/CanvasWorkspace';
import type { EditorStageHandle } from './components/canvas/EditorStage';

function App() {
  const stageRef = useRef<EditorStageHandle>(null);

  return (
    <div className="flex w-full h-screen font-sans bg-neutral-900">
      <Sidebar stageRef={stageRef} />
      <CanvasWorkspace stageRef={stageRef} />
    </div>
  );
}

export default App;
