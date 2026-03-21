import type { DeceasedData, TemplateLayout } from '../types';

// ============================================================================
// SVG-based placeholder assets (no external dependencies)
// ============================================================================

const MOCK_BG_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#16213e;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0f0f23;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1200" fill="url(#bg)"/>
  <rect x="40" y="40" width="720" height="1120" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.25" rx="8"/>
  <rect x="50" y="50" width="700" height="1100" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="0.15" rx="4"/>
  <line x1="100" y1="800" x2="700" y2="800" stroke="#D4AF37" stroke-width="0.5" opacity="0.2"/>
  <line x1="100" y1="920" x2="700" y2="920" stroke="#D4AF37" stroke-width="0.5" opacity="0.2"/>
</svg>
`)}`;

const MOCK_PHOTO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400">
  <rect width="300" height="400" rx="8" fill="#2a2a3e"/>
  <circle cx="150" cy="140" r="60" fill="#3a3a5e"/>
  <ellipse cx="150" cy="320" rx="90" ry="100" fill="#3a3a5e"/>
  <text x="150" y="390" text-anchor="middle" fill="#666" font-size="14" font-family="Arial">Foto</text>
</svg>
`)}`;

// ============================================================================
// INITIAL DECEASED DATA (MOCK)
// ============================================================================

export const initialDeceasedData: DeceasedData = {
    id: '1',
    nombres: 'JUAN CARLOS',
    apellidos: 'LÓPEZ PÉREZ',
    fecha_nacimiento: '12 de Mayo de 1945',
    fecha_fallecimiento: '28 de Febrero de 2026',
    foto_url: MOCK_PHOTO_SVG,
    velatorio: {
        lugar: 'Parque de la Paz',
        direccion: 'Av. Principal 123, Ciudad',
    },
    sepelio: {
        fecha: '1 de Marzo de 2026',
        hora: '10:00 AM',
        lugar: 'Cementerio General',
    },
    frase_dedicatoria:
        '"Tu recuerdo vivirá por siempre en nuestros corazones. Descansa en paz, amado padre y abuelo."',
};

// ============================================================================
// DEFAULT TEMPLATE LAYOUT
// ============================================================================

export const defaultTemplate: TemplateLayout = {
    id: 'tpl_elegance_1',
    fondo_url: MOCK_BG_SVG,
    elementos_fijos: [
        {
            tipo: 'texto',
            contenido: '✦ En Memoria De ✦',
            x: 0,
            y: 100,
            width: 800,
            fontSize: 32,
            fontFamily: 'Georgia',
            fill: '#D4AF37',
            align: 'center',
            fontStyle: 'italic',
        },
        {
            tipo: 'texto',
            contenido: '─────── VELATORIO ───────',
            x: 0,
            y: 820,
            width: 800,
            fontSize: 20,
            fontFamily: 'Georgia',
            fill: '#D4AF37',
            align: 'center',
        },
        {
            tipo: 'texto',
            contenido: '─────── SEPELIO ───────',
            x: 0,
            y: 950,
            width: 800,
            fontSize: 20,
            fontFamily: 'Georgia',
            fill: '#D4AF37',
            align: 'center',
        },
    ],
    mapeo_dinamico: {
        nombres: {
            x: 0,
            y: 620,
            width: 800,
            fontSize: 46,
            fontFamily: 'Georgia',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold',
        },
        apellidos: {
            x: 0,
            y: 680,
            width: 800,
            fontSize: 46,
            fontFamily: 'Georgia',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold',
        },
        fechas: {
            x: 0,
            y: 750,
            width: 800,
            fontSize: 20,
            fontFamily: 'Arial',
            fill: '#A0A0A0',
            align: 'center',
        },
        velatorio_lugar: {
            x: 0,
            y: 860,
            width: 800,
            fontSize: 22,
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold',
        },
        velatorio_direccion: {
            x: 0,
            y: 895,
            width: 800,
            fontSize: 18,
            fontFamily: 'Arial',
            fill: '#A0A0A0',
            align: 'center',
        },
        sepelio_fecha_hora: {
            x: 0,
            y: 990,
            width: 800,
            fontSize: 22,
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            align: 'center',
            fontStyle: 'bold',
        },
        sepelio_lugar: {
            x: 0,
            y: 1025,
            width: 800,
            fontSize: 18,
            fontFamily: 'Arial',
            fill: '#A0A0A0',
            align: 'center',
        },
        frase_dedicatoria: {
            x: 100,
            y: 1080,
            width: 600,
            fontSize: 18,
            fontFamily: 'Georgia',
            fill: '#D4AF37',
            align: 'center',
            fontStyle: 'italic',
        },
        foto_difunto: {
            x: 250,
            y: 180,
            width: 300,
            height: 400,
            draggable: true,
        },
    },
};
