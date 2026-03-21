import { Upload, ImageIcon, Settings, FileText, Type } from 'lucide-react';
import { useEditorStore } from '../../store/useEditorStore';
import ExportButton from './ExportButton';
import TextPropertiesPanel from './TextPropertiesPanel';
import BgOverlayControls from './BgOverlayControls';
import type { EditorStageHandle } from '../canvas/EditorStage';

interface SidebarProps {
    stageRef: React.RefObject<EditorStageHandle | null>;
}

const Sidebar: React.FC<SidebarProps> = ({ stageRef }) => {
    const data = useEditorStore((s) => s.deceasedData);
    const setData = useEditorStore((s) => s.setDeceasedData);
    const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
    const setCustomBackground = useEditorStore((s) => s.setCustomBackground);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const blobUrl = URL.createObjectURL(e.target.files[0]);
            setData({ foto_url: blobUrl });
            setSelectedNodeId('foto_difunto');
        }
    };

    const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const blobUrl = URL.createObjectURL(e.target.files[0]);
            setCustomBackground(blobUrl);
            setSelectedNodeId(null);
        }
    };

    const inputBase =
        'w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 outline-none transition-all duration-150 bg-white';

    return (
        <div className="w-[380px] bg-gray-50 border-r border-gray-200 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-200 bg-white flex items-center gap-3">
                <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-2.5 rounded-xl text-white shadow-md shadow-slate-800/20">
                    <FileText size={20} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">
                        Flyer Obits
                    </h1>
                    <p className="text-[11px] text-gray-400 font-medium">
                        Generador de Alta Resolución
                    </p>
                </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
                {/* Dynamic Text Properties (only visible when text is selected) */}
                <TextPropertiesPanel />

                {/* Background Overlay Controls */}
                <BgOverlayControls />

                {/* Background Upload */}
                <section>
                    <SectionTitle icon={<ImageIcon size={14} />} title="Fondo Personalizado" />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:bg-white hover:border-sky-300 transition-all duration-200 cursor-pointer relative group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload
                            className="mx-auto text-gray-400 mb-2 group-hover:text-sky-500 transition-colors"
                            size={24}
                        />
                        <p className="text-sm font-medium text-gray-700 group-hover:text-sky-600">
                            Subir nuevo fondo
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Reemplaza el diseño
                        </p>
                    </div>
                </section>

                {/* Photo Upload */}
                <section>
                    <SectionTitle icon={<ImageIcon size={14} />} title="Fotografía" />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:bg-white hover:border-sky-300 transition-all duration-200 cursor-pointer relative group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload
                            className="mx-auto text-gray-400 mb-2 group-hover:text-sky-500 transition-colors"
                            size={24}
                        />
                        <p className="text-sm font-medium text-gray-700 group-hover:text-sky-600">
                            Subir nueva foto
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Arrastra o haz clic (JPG, PNG)
                        </p>
                    </div>
                    <p className="text-xs text-amber-700 mt-2.5 bg-amber-50 p-2.5 rounded-lg border border-amber-100">
                        💡 Haz clic en la foto dentro del editor para moverla o cambiar su
                        tamaño.
                    </p>
                </section>

                {/* Personal Data */}
                <section>
                    <SectionTitle icon={<Type size={14} />} title="Datos Personales" />
                    <div className="space-y-3">
                        <Field label="Nombres">
                            <input
                                type="text"
                                value={data.nombres}
                                onChange={(e) => setData({ nombres: e.target.value })}
                                className={inputBase}
                            />
                        </Field>
                        <Field label="Apellidos">
                            <input
                                type="text"
                                value={data.apellidos}
                                onChange={(e) => setData({ apellidos: e.target.value })}
                                className={inputBase}
                            />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Nacimiento">
                                <input
                                    type="text"
                                    value={data.fecha_nacimiento}
                                    onChange={(e) =>
                                        setData({ fecha_nacimiento: e.target.value })
                                    }
                                    className={inputBase}
                                />
                            </Field>
                            <Field label="Fallecimiento">
                                <input
                                    type="text"
                                    value={data.fecha_fallecimiento}
                                    onChange={(e) =>
                                        setData({ fecha_fallecimiento: e.target.value })
                                    }
                                    className={inputBase}
                                />
                            </Field>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section>
                    <SectionTitle icon={<Settings size={14} />} title="Servicios" />
                    <div className="space-y-4">
                        <ServiceCard title="Velatorio">
                            <input
                                type="text"
                                placeholder="Lugar"
                                value={data.velatorio.lugar}
                                onChange={(e) =>
                                    setData({
                                        velatorio: { ...data.velatorio, lugar: e.target.value },
                                    })
                                }
                                className={`${inputBase} mb-2`}
                            />
                            <input
                                type="text"
                                placeholder="Dirección"
                                value={data.velatorio.direccion}
                                onChange={(e) =>
                                    setData({
                                        velatorio: {
                                            ...data.velatorio,
                                            direccion: e.target.value,
                                        },
                                    })
                                }
                                className={inputBase}
                            />
                        </ServiceCard>

                        <ServiceCard title="Sepelio">
                            <input
                                type="text"
                                placeholder="Lugar"
                                value={data.sepelio.lugar}
                                onChange={(e) =>
                                    setData({
                                        sepelio: { ...data.sepelio, lugar: e.target.value },
                                    })
                                }
                                className={`${inputBase} mb-2`}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="Fecha"
                                    value={data.sepelio.fecha}
                                    onChange={(e) =>
                                        setData({
                                            sepelio: { ...data.sepelio, fecha: e.target.value },
                                        })
                                    }
                                    className={inputBase}
                                />
                                <input
                                    type="text"
                                    placeholder="Hora"
                                    value={data.sepelio.hora}
                                    onChange={(e) =>
                                        setData({
                                            sepelio: { ...data.sepelio, hora: e.target.value },
                                        })
                                    }
                                    className={inputBase}
                                />
                            </div>
                        </ServiceCard>
                    </div>
                </section>

                {/* Dedication */}
                <section>
                    <SectionTitle
                        icon={<Type size={14} />}
                        title="Frase Dedicatoria"
                    />
                    <textarea
                        rows={3}
                        value={data.frase_dedicatoria}
                        onChange={(e) => setData({ frase_dedicatoria: e.target.value })}
                        className={`${inputBase} resize-none`}
                    />
                </section>
            </div>

            {/* Export Footer */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <ExportButton stageRef={stageRef} />
            </div>
        </div>
    );
};

// ── Helper sub-components ────────────────────────────────────────────

const SectionTitle: React.FC<{
    icon: React.ReactNode;
    title: string;
}> = ({ icon, title }) => (
    <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        {icon} {title}
    </h2>
);

const Field: React.FC<{
    label: string;
    children: React.ReactNode;
}> = ({ label, children }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
            {label}
        </label>
        {children}
    </div>
);

const ServiceCard: React.FC<{
    title: string;
    children: React.ReactNode;
}> = ({ title, children }) => (
    <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm">
        <label className="block text-xs font-semibold text-gray-800 mb-2.5">
            {title}
        </label>
        {children}
    </div>
);

export default Sidebar;
