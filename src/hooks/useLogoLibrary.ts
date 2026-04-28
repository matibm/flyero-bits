import { useCallback, useEffect, useState } from 'react';
import type { LogoLibraryItem } from '../types';

const STORAGE_KEY = 'flyer-gen-logo-library';
const MAX_DIMENSION = 512;

function readLibrary(): LogoLibraryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LogoLibraryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLibrary(items: LogoLibraryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('Logo library write failed (likely quota):', err);
  }
}

/** Resizes a file to max 512px and returns a base64 data URL. */
export function fileToResizedDataUrl(file: File): Promise<{
  dataUrl: string;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        const ratio = img.width / img.height;
        let w = img.width;
        let h = img.height;
        if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
          if (w >= h) {
            w = MAX_DIMENSION;
            h = Math.round(MAX_DIMENSION / ratio);
          } else {
            h = MAX_DIMENSION;
            w = Math.round(MAX_DIMENSION * ratio);
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D not available'));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        // PNG to preserve transparency for logos
        const dataUrl = canvas.toDataURL('image/png');
        resolve({ dataUrl, width: w, height: h });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function useLogoLibrary() {
  const [library, setLibrary] = useState<LogoLibraryItem[]>(() => readLibrary());

  useEffect(() => {
    // Re-sync when other tabs / windows mutate the library
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setLibrary(readLibrary());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addLogo = useCallback(async (file: File, name?: string) => {
    const { dataUrl } = await fileToResizedDataUrl(file);
    const item: LogoLibraryItem = {
      id: `lib_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      name: name ?? file.name.replace(/\.[^.]+$/, '').slice(0, 40),
      dataUrl,
      addedAt: Date.now(),
    };
    const next = [item, ...readLibrary()];
    writeLibrary(next);
    setLibrary(next);
    return item;
  }, []);

  const removeLogo = useCallback((id: string) => {
    const next = readLibrary().filter((l) => l.id !== id);
    writeLibrary(next);
    setLibrary(next);
  }, []);

  const renameLogo = useCallback((id: string, name: string) => {
    const next = readLibrary().map((l) => (l.id === id ? { ...l, name } : l));
    writeLibrary(next);
    setLibrary(next);
  }, []);

  return { library, addLogo, removeLogo, renameLogo };
}
