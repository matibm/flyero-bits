// ============================================================================
// DATA MODELS
// ============================================================================

export interface DeceasedData {
  id: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  fecha_fallecimiento: string;
  foto_url: string;
  velatorio: { lugar: string; direccion: string };
  sepelio: { fecha: string; hora: string; lugar: string };
  frase_dedicatoria: string;
}

export interface TextConfig {
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  align: 'left' | 'center' | 'right';
  width?: number;
  fontStyle?: string;
}

export interface ImageConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  draggable?: boolean;
}

export type FixedElement = {
  tipo: 'imagen' | 'texto';
  contenido?: string;
  src?: string;
} & (TextConfig | ImageConfig);

export interface TemplateLayout {
  id: string;
  fondo_url: string;
  elementos_fijos: FixedElement[];
  /** Native canvas size for which the template was designed (default 800x1200). */
  base_width?: number;
  base_height?: number;
  mapeo_dinamico: {
    nombres: TextConfig;
    apellidos: TextConfig;
    fechas: TextConfig;
    velatorio_lugar: TextConfig;
    velatorio_direccion: TextConfig;
    sepelio_fecha_hora: TextConfig;
    sepelio_lugar: TextConfig;
    frase_dedicatoria: TextConfig;
    foto_difunto: ImageConfig;
  };
}

export interface TransformState {
  x: number;
  y: number;
  width?: number;
  height?: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export interface TextOverride {
  fill?: string;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  fontFamily?: string;
  text?: string;
  isBold?: boolean;
  isItalic?: boolean;
}

export interface BgOverlayState {
  color: string;
  opacity: number;
}

// ============================================================================
// CANVAS PRESETS
// ============================================================================

export interface CanvasSize {
  presetId: string;
  width: number;
  height: number;
  name: string;
  description?: string;
}

export const CANVAS_PRESETS: CanvasSize[] = [
  {
    presetId: 'portrait_2_3',
    width: 800,
    height: 1200,
    name: 'Vertical clásico',
    description: '2:3 — flyer tradicional',
  },
  {
    presetId: 'square_1_1',
    width: 1080,
    height: 1080,
    name: 'Cuadrado',
    description: '1:1 — post Instagram / Facebook',
  },
  {
    presetId: 'post_4_5',
    width: 1080,
    height: 1350,
    name: 'Post vertical',
    description: '4:5 — feed de Instagram',
  },
  {
    presetId: 'story_9_16',
    width: 1080,
    height: 1920,
    name: 'Historia',
    description: '9:16 — Instagram / WhatsApp story',
  },
  {
    presetId: 'a4_portrait',
    width: 1240,
    height: 1754,
    name: 'A4 imprenta',
    description: 'Tamaño folio para impresión',
  },
  {
    presetId: 'landscape_16_9',
    width: 1920,
    height: 1080,
    name: 'Apaisado',
    description: '16:9 — pantalla horizontal',
  },
];

// ============================================================================
// NODES (multi-image)
// ============================================================================

export interface ImageNode {
  /** Unique node id (e.g. img_<uuid>) */
  id: string;
  url: string;
  /** Friendly name shown in layers panel */
  name: string;
  /** Distinguishes user-uploaded logos from photos / generic images. */
  kind: 'logo' | 'photo' | 'image';
  /** Initial dimensions when added (used as baseline for transform). */
  width: number;
  height: number;
}

export interface NodeMeta {
  visible: boolean;
  locked: boolean;
  /** Friendly display name editable in layers panel. */
  name: string;
}

// ============================================================================
// LOGO LIBRARY (separate localStorage)
// ============================================================================

export interface LogoLibraryItem {
  id: string;
  name: string;
  /** Resized base64 data URL (max 512px). */
  dataUrl: string;
  addedAt: number;
}

// ============================================================================
// CUSTOM FONTS
// ============================================================================

export interface CustomFont {
  family: string;
  /** Google Fonts CSS URL injected into document head. */
  url: string;
}
