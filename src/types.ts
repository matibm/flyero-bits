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
    width?: number; // Optional for text at original size
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
