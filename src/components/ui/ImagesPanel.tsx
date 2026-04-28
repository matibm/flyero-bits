import { useRef, useState } from 'react';
import { ImagePlus, Library, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useEditorStore } from '../../store/useEditorStore';
import { useLogoLibrary, fileToResizedDataUrl } from '../../hooks/useLogoLibrary';
import type { ImageNode } from '../../types';

const ImagesPanel: React.FC = () => {
  const addImage = useEditorStore((s) => s.addImage);
  const canvas = useEditorStore((s) => s.canvasSize);
  const { library, addLogo, removeLogo } = useLogoLibrary();

  const inputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<'subir' | 'biblioteca'>('subir');

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    let added = 0;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const { dataUrl, width, height } = await fileToResizedDataUrl(file);
        const initial = scaleToCanvas(width, height, canvas.width, canvas.height);
        const node: Omit<ImageNode, 'id'> = {
          url: dataUrl,
          name: file.name.replace(/\.[^.]+$/, '').slice(0, 30) || 'imagen',
          kind: 'image',
          width: initial.w,
          height: initial.h,
        };
        addImage(node);
        added += 1;
      } catch (err) {
        console.error('Image upload failed', err);
      }
    }
    if (added > 0)
      toast.success(`${added} imagen${added > 1 ? 'es' : ''} agregada${added > 1 ? 's' : ''}.`);
    e.target.value = '';
  };

  const handleSaveLogoToLibrary = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    let added = 0;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        await addLogo(file);
        added += 1;
      } catch (err) {
        console.error('Logo save failed', err);
      }
    }
    if (added > 0)
      toast.success(
        `${added} logo${added > 1 ? 's' : ''} guardado${added > 1 ? 's' : ''} en biblioteca.`,
      );
    e.target.value = '';
  };

  const handleInsertFromLibrary = async (id: string) => {
    const item = library.find((l) => l.id === id);
    if (!item) return;
    const img = new Image();
    img.onload = () => {
      const initial = scaleToCanvas(img.width, img.height, canvas.width, canvas.height);
      addImage({
        url: item.dataUrl,
        name: item.name,
        kind: 'logo',
        width: initial.w,
        height: initial.h,
      });
      toast.success(`Logo "${item.name}" insertado.`);
    };
    img.src = item.dataUrl;
  };

  return (
    <section>
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <ImagePlus size={14} /> Imágenes y logos
      </h2>

      <div className="flex bg-gray-100 rounded-lg p-0.5 mb-3 text-xs">
        <button
          onClick={() => setTab('subir')}
          className={`flex-1 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            tab === 'subir' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
          }`}
        >
          Subir
        </button>
        <button
          onClick={() => setTab('biblioteca')}
          className={`flex-1 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            tab === 'biblioteca' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
          }`}
        >
          Biblioteca ({library.length})
        </button>
      </div>

      {tab === 'subir' && (
        <div className="space-y-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 hover:border-sky-300 hover:bg-sky-50/30 rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer transition-colors"
          >
            <Plus size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Agregar imágenes al flyer</span>
            <span className="text-[11px] text-gray-400">Selecciona una o varias (PNG, JPG)</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadImage}
            className="hidden"
          />
          <button
            onClick={() => logoInputRef.current?.click()}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm text-gray-600"
          >
            <Library size={14} />
            Guardar como logo en biblioteca
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleSaveLogoToLibrary}
            className="hidden"
          />
          <p className="text-[11px] text-gray-400 leading-snug">
            Los logos guardados se conservan en este navegador y podrás reutilizarlos en cualquier
            flyer.
          </p>
        </div>
      )}

      {tab === 'biblioteca' && (
        <div className="space-y-2">
          {library.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4 bg-white rounded-xl border border-gray-100">
              Aún no hay logos guardados.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {library.map((item) => (
                <div
                  key={item.id}
                  className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-sky-300 transition-colors"
                >
                  <button
                    onClick={() => handleInsertFromLibrary(item.id)}
                    className="block w-full aspect-square bg-gray-50 cursor-pointer"
                    title={`Insertar ${item.name}`}
                  >
                    <img
                      src={item.dataUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <div className="px-1.5 pb-1.5 pt-1">
                    <p className="text-[10px] text-gray-700 truncate">{item.name}</p>
                  </div>
                  <button
                    onClick={() => removeLogo(item.id)}
                    className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur rounded-full text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    title="Eliminar de biblioteca"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

function scaleToCanvas(
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number,
): { w: number; h: number } {
  const maxW = canvasW * 0.4;
  const maxH = canvasH * 0.4;
  const ratio = imgW / imgH;
  let w = imgW;
  let h = imgH;
  if (w > maxW) {
    w = maxW;
    h = w / ratio;
  }
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

export default ImagesPanel;
