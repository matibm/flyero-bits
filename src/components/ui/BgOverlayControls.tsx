import { useEditorStore } from '../../store/useEditorStore';
import { Layers } from 'lucide-react';

const BgOverlayControls: React.FC = () => {
    const bgOverlay = useEditorStore((s) => s.bgOverlay);
    const setBgOverlay = useEditorStore((s) => s.setBgOverlay);

    return (
        <div className="space-y-3">
            <SectionTitle icon={<Layers size={14} />} title="Filtro de Fondo" />
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex-1">
                    <label className="block text-[10px] font-semibold text-gray-500 mb-2">Opacidad</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={bgOverlay.opacity}
                        onChange={(e) => setBgOverlay({ opacity: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-gray-500 mb-1">Color</label>
                    <input
                        type="color"
                        value={bgOverlay.color}
                        onChange={(e) => setBgOverlay({ color: e.target.value })}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                        title="Color del Filtro"
                    />
                </div>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{
    icon: React.ReactNode;
    title: string;
}> = ({ icon, title }) => (
    <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
        {icon} {title}
    </h2>
);

export default BgOverlayControls;
