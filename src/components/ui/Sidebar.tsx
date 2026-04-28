import { useState } from 'react';
import { Upload, ImageIcon, Settings, FileText, Type, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEditorStore } from '../../store/useEditorStore';
import ExportButton from './ExportButton';
import ResetButton from './ResetButton';
import TemplateSelector from './TemplateSelector';
import TextPropertiesPanel from './TextPropertiesPanel';
import BgOverlayControls from './BgOverlayControls';
import CanvasSizeSelector from './CanvasSizeSelector';
import LayersPanel from './LayersPanel';
import ImagesPanel from './ImagesPanel';
import FontsPanel from './FontsPanel';
import type { EditorStageHandle } from '../canvas/EditorStage';

interface SidebarProps {
  stageRef: React.RefObject<EditorStageHandle | null>;
}

const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const formatDateToSpanish = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return `${day} de ${MESES[month - 1]} de ${year}`;
};

const parseSpanishToISO = (spanish: string): string => {
  const match = spanish.match(/(\d{1,2}) de (\w+) de (\d{4})/);
  if (!match) return '';
  const day = match[1].padStart(2, '0');
  const monthIdx = MESES.findIndex((m) => m.toLowerCase() === match[2].toLowerCase());
  if (monthIdx === -1) return '';
  const month = String(monthIdx + 1).padStart(2, '0');
  return `${match[3]}-${month}-${day}`;
};

const Sidebar: React.FC<SidebarProps> = ({ stageRef }) => {
  const data = useEditorStore((s) => s.deceasedData);
  const setData = useEditorStore((s) => s.setDeceasedData);
  const setSelectedNodeId = useEditorStore((s) => s.setSelectedNodeId);
  const setCustomBackground = useEditorStore((s) => s.setCustomBackground);

  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo seleccionado no es una imagen válida.');
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setData({ foto_url: blobUrl });
    setSelectedNodeId('foto_difunto');
    setPhotoLoaded(true);
    toast.success('Fotografía cargada correctamente.');
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo seleccionado no es una imagen válida.');
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setCustomBackground(blobUrl);
    setSelectedNodeId(null);
    setBgLoaded(true);
    toast.success('Fondo personalizado aplicado.');
  };

  const inputBase =
    'w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 outline-none transition-all duration-150 bg-white';

  return (
    <div className="w-[400px] bg-gray-50 border-r border-gray-200 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-white flex items-center gap-3">
        <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-2.5 rounded-xl text-white shadow-md shadow-slate-800/20">
          <FileText size={20} />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">
            Flyer Obits
          </h1>
          <p className="text-[11px] text-gray-400 font-medium">Editor profesional</p>
        </div>
        <ResetButton />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        <CanvasSizeSelector />
        <TemplateSelector />
        <TextPropertiesPanel />
        <LayersPanel />
        <ImagesPanel />
        <FontsPanel />
        <BgOverlayControls />

        {/* Background Upload */}
        <section>
          <SectionTitle icon={<ImageIcon size={14} />} title="Fondo personalizado" />
          <div
            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 cursor-pointer relative group ${
              bgLoaded
                ? 'border-emerald-300 bg-emerald-50/50'
                : 'border-gray-200 hover:bg-white hover:border-sky-300'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {bgLoaded ? (
              <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={22} />
            ) : (
              <Upload
                className="mx-auto text-gray-400 mb-2 group-hover:text-sky-500 transition-colors"
                size={22}
              />
            )}
            <p
              className={`text-sm font-medium ${
                bgLoaded ? 'text-emerald-700' : 'text-gray-700 group-hover:text-sky-600'
              }`}
            >
              {bgLoaded ? 'Fondo cargado' : 'Subir fondo'}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {bgLoaded ? 'Clic para reemplazar' : 'Reemplaza el diseño base'}
            </p>
          </div>
        </section>

        {/* Photo Upload */}
        <section>
          <SectionTitle icon={<ImageIcon size={14} />} title="Fotografía del difunto" />
          <div
            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 cursor-pointer relative group ${
              photoLoaded
                ? 'border-emerald-300 bg-emerald-50/50'
                : 'border-gray-200 hover:bg-white hover:border-sky-300'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {photoLoaded ? (
              <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={22} />
            ) : (
              <Upload
                className="mx-auto text-gray-400 mb-2 group-hover:text-sky-500 transition-colors"
                size={22}
              />
            )}
            <p
              className={`text-sm font-medium ${
                photoLoaded ? 'text-emerald-700' : 'text-gray-700 group-hover:text-sky-600'
              }`}
            >
              {photoLoaded ? 'Foto cargada' : 'Subir foto'}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {photoLoaded ? 'Clic para reemplazar' : 'JPG, PNG'}
            </p>
          </div>
        </section>

        {/* Personal Data */}
        <section>
          <SectionTitle icon={<Type size={14} />} title="Datos personales" />
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
              <Field label="(*) Nacimiento">
                <input
                  type="date"
                  value={parseSpanishToISO(data.fecha_nacimiento)}
                  onChange={(e) =>
                    setData({ fecha_nacimiento: formatDateToSpanish(e.target.value) })
                  }
                  className={inputBase}
                />
              </Field>
              <Field label="(†) Fallecimiento">
                <input
                  type="date"
                  value={parseSpanishToISO(data.fecha_fallecimiento)}
                  onChange={(e) =>
                    setData({ fecha_fallecimiento: formatDateToSpanish(e.target.value) })
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
                  setData({ velatorio: { ...data.velatorio, lugar: e.target.value } })
                }
                className={`${inputBase} mb-2`}
              />
              <input
                type="text"
                placeholder="Dirección"
                value={data.velatorio.direccion}
                onChange={(e) =>
                  setData({
                    velatorio: { ...data.velatorio, direccion: e.target.value },
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
                onChange={(e) => setData({ sepelio: { ...data.sepelio, lugar: e.target.value } })}
                className={`${inputBase} mb-2`}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={parseSpanishToISO(data.sepelio.fecha)}
                  onChange={(e) =>
                    setData({
                      sepelio: { ...data.sepelio, fecha: formatDateToSpanish(e.target.value) },
                    })
                  }
                  className={inputBase}
                />
                <input
                  type="time"
                  onChange={(e) => {
                    const [h, m] = e.target.value.split(':').map(Number);
                    const ampm = h >= 12 ? 'PM' : 'AM';
                    const h12 = h % 12 || 12;
                    setData({
                      sepelio: {
                        ...data.sepelio,
                        hora: `${h12}:${String(m).padStart(2, '0')} ${ampm}`,
                      },
                    });
                  }}
                  className={inputBase}
                />
              </div>
            </ServiceCard>
          </div>
        </section>

        {/* Dedication */}
        <section>
          <SectionTitle icon={<Type size={14} />} title="Frase dedicatoria" />
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

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
    {icon} {title}
  </h2>
);

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
    {children}
  </div>
);

const ServiceCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm">
    <label className="block text-xs font-semibold text-gray-800 mb-2.5">{title}</label>
    {children}
  </div>
);

export default Sidebar;
