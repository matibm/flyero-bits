import type { TemplateLayout } from '../types';

// ============================================================================
// TEMPLATE 1: PAZ CELESTIAL
// Soft blue/white ethereal design with cross motif
// ============================================================================

const BG_PAZ_CELESTIAL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <radialGradient id="pc_radial" cx="50%" cy="35%" r="70%" fx="50%" fy="35%">
      <stop offset="0%" style="stop-color:#e8f0fe;stop-opacity:1"/>
      <stop offset="40%" style="stop-color:#c5d8f0;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#8ba7cc;stop-opacity:1"/>
    </radialGradient>
    <linearGradient id="pc_top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/>
    </linearGradient>
    <linearGradient id="pc_gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7a99be;stop-opacity:0"/>
      <stop offset="30%" style="stop-color:#7a99be;stop-opacity:0.6"/>
      <stop offset="50%" style="stop-color:#9ab5d4;stop-opacity:1"/>
      <stop offset="70%" style="stop-color:#7a99be;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#7a99be;stop-opacity:0"/>
    </linearGradient>
    <filter id="pc_glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="pc_inner_clip">
      <rect x="30" y="30" width="740" height="1140" rx="12"/>
    </clipPath>
  </defs>
  <!-- Background -->
  <rect width="800" height="1200" fill="url(#pc_radial)"/>
  <rect width="800" height="400" fill="url(#pc_top)"/>
  <!-- Subtle light rays from center top -->
  <g opacity="0.08" clip-path="url(#pc_inner_clip)">
    <line x1="400" y1="0" x2="100" y2="1200" stroke="#ffffff" stroke-width="40"/>
    <line x1="400" y1="0" x2="300" y2="1200" stroke="#ffffff" stroke-width="30"/>
    <line x1="400" y1="0" x2="500" y2="1200" stroke="#ffffff" stroke-width="30"/>
    <line x1="400" y1="0" x2="700" y2="1200" stroke="#ffffff" stroke-width="40"/>
    <line x1="400" y1="0" x2="0" y2="800" stroke="#ffffff" stroke-width="25"/>
    <line x1="400" y1="0" x2="800" y2="800" stroke="#ffffff" stroke-width="25"/>
  </g>
  <!-- Delicate outer border -->
  <rect x="20" y="20" width="760" height="1160" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5" rx="14"/>
  <rect x="28" y="28" width="744" height="1144" fill="none" stroke="#7a99be" stroke-width="0.5" opacity="0.4" rx="10"/>
  <!-- Subtle cross motif center top -->
  <g filter="url(#pc_glow)" opacity="0.12">
    <rect x="392" y="30" width="16" height="120" rx="8" fill="#ffffff"/>
    <rect x="350" y="62" width="100" height="16" rx="8" fill="#ffffff"/>
  </g>
  <!-- Corner ornaments -->
  <g opacity="0.25" fill="none" stroke="#5a7da8" stroke-width="1">
    <path d="M 50,50 Q 50,80 80,80" />
    <path d="M 50,50 Q 80,50 80,80" />
    <path d="M 750,50 Q 750,80 720,80" />
    <path d="M 750,50 Q 720,50 720,80" />
    <path d="M 50,1150 Q 50,1120 80,1120" />
    <path d="M 50,1150 Q 80,1150 80,1120" />
    <path d="M 750,1150 Q 750,1120 720,1120" />
    <path d="M 750,1150 Q 720,1150 720,1120" />
  </g>
  <!-- Decorative corner flourishes -->
  <g opacity="0.18" fill="none" stroke="#5a7da8" stroke-width="0.8">
    <path d="M 45,45 C 45,100 45,100 100,100 C 60,100 45,85 45,45"/>
    <path d="M 755,45 C 755,100 755,100 700,100 C 740,100 755,85 755,45"/>
    <path d="M 45,1155 C 45,1100 45,1100 100,1100 C 60,1100 45,1115 45,1155"/>
    <path d="M 755,1155 C 755,1100 755,1100 700,1100 C 740,1100 755,1115 755,1155"/>
  </g>
  <!-- Divider lines -->
  <line x1="150" y1="780" x2="650" y2="780" stroke="url(#pc_gold)" stroke-width="1"/>
  <line x1="150" y1="910" x2="650" y2="910" stroke="url(#pc_gold)" stroke-width="1"/>
  <!-- Small decorative dots on dividers -->
  <circle cx="400" cy="780" r="3" fill="#7a99be" opacity="0.5"/>
  <circle cx="400" cy="910" r="3" fill="#7a99be" opacity="0.5"/>
  <!-- Bottom soft vignette -->
  <rect x="0" y="1050" width="800" height="150" fill="url(#pc_top)" opacity="0.15" transform="rotate(180,400,1125)"/>
</svg>
`)}`;

const templatePazCelestial: TemplateLayout = {
  id: 'tpl_paz_celestial',
  fondo_url: BG_PAZ_CELESTIAL,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'En Memoria De',
      x: 0,
      y: 80,
      width: 800,
      fontSize: 34,
      fontFamily: 'Georgia',
      fill: '#2c4a6e',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: '~ VELATORIO ~',
      x: 0,
      y: 800,
      width: 800,
      fontSize: 20,
      fontFamily: 'Georgia',
      fill: '#3a6090',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: '~ SEPELIO ~',
      x: 0,
      y: 930,
      width: 800,
      fontSize: 20,
      fontFamily: 'Georgia',
      fill: '#3a6090',
      align: 'center',
    },
  ],
  mapeo_dinamico: {
    nombres: {
      x: 0,
      y: 600,
      width: 800,
      fontSize: 44,
      fontFamily: 'Georgia',
      fill: '#1a3350',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 655,
      width: 800,
      fontSize: 44,
      fontFamily: 'Georgia',
      fill: '#1a3350',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 730,
      width: 800,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#4a6a8a',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 840,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#1a3350',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 875,
      width: 800,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#4a6a8a',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 970,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#1a3350',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 1005,
      width: 800,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#4a6a8a',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 100,
      y: 1070,
      width: 600,
      fontSize: 17,
      fontFamily: 'Georgia',
      fill: '#3a6090',
      align: 'center',
      fontStyle: 'italic',
    },
    foto_difunto: {
      x: 250,
      y: 160,
      width: 300,
      height: 400,
      draggable: true,
    },
  },
};

// ============================================================================
// TEMPLATE 2: ROSA ETERNA
// Warm rose/burgundy tones, floral corner decorative elements
// ============================================================================

const BG_ROSA_ETERNA = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <linearGradient id="re_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3b1520;stop-opacity:1"/>
      <stop offset="30%" style="stop-color:#4a1a2a;stop-opacity:1"/>
      <stop offset="70%" style="stop-color:#3b1520;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#2a0e18;stop-opacity:1"/>
    </linearGradient>
    <radialGradient id="re_center" cx="50%" cy="40%" r="50%">
      <stop offset="0%" style="stop-color:#5a2035;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#3b1520;stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="re_line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#c9a07a;stop-opacity:0"/>
      <stop offset="20%" style="stop-color:#c9a07a;stop-opacity:0.5"/>
      <stop offset="50%" style="stop-color:#d4b896;stop-opacity:0.8"/>
      <stop offset="80%" style="stop-color:#c9a07a;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#c9a07a;stop-opacity:0"/>
    </linearGradient>
    <linearGradient id="re_rose_g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d4a0a0;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#c9a07a;stop-opacity:0.15"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="1200" fill="url(#re_bg)"/>
  <rect width="800" height="1200" fill="url(#re_center)"/>
  <!-- Double border -->
  <rect x="30" y="30" width="740" height="1140" fill="none" stroke="#c9a07a" stroke-width="1.5" opacity="0.35" rx="6"/>
  <rect x="40" y="40" width="720" height="1120" fill="none" stroke="#c9a07a" stroke-width="0.5" opacity="0.2" rx="4"/>
  <!-- Top-left floral ornament -->
  <g transform="translate(35,35)" opacity="0.3" fill="none" stroke="#d4a0a0" stroke-width="1">
    <path d="M 0,60 C 10,40 25,20 60,0"/>
    <path d="M 0,60 C 20,50 40,45 60,0"/>
    <path d="M 0,60 C 15,30 35,15 60,0"/>
    <!-- Rose petals -->
    <g transform="translate(20,25)" fill="url(#re_rose_g)" stroke="#d4a0a0" stroke-width="0.6">
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(-30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(90)"/>
      <circle cx="0" cy="0" r="4" fill="#d4a0a0" opacity="0.4"/>
    </g>
    <!-- Leaves -->
    <path d="M 5,50 Q 15,42 10,32" fill="none" stroke-width="0.7"/>
    <path d="M 40,8 Q 48,18 38,22" fill="none" stroke-width="0.7"/>
    <!-- Small buds -->
    <circle cx="8" cy="42" r="2.5" fill="#d4a0a0" opacity="0.25"/>
    <circle cx="42" cy="12" r="2.5" fill="#d4a0a0" opacity="0.25"/>
  </g>
  <!-- Top-right floral ornament (mirrored) -->
  <g transform="translate(765,35) scale(-1,1)" opacity="0.3" fill="none" stroke="#d4a0a0" stroke-width="1">
    <path d="M 0,60 C 10,40 25,20 60,0"/>
    <path d="M 0,60 C 20,50 40,45 60,0"/>
    <path d="M 0,60 C 15,30 35,15 60,0"/>
    <g transform="translate(20,25)" fill="url(#re_rose_g)" stroke="#d4a0a0" stroke-width="0.6">
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(-30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(90)"/>
      <circle cx="0" cy="0" r="4" fill="#d4a0a0" opacity="0.4"/>
    </g>
    <path d="M 5,50 Q 15,42 10,32" fill="none" stroke-width="0.7"/>
    <path d="M 40,8 Q 48,18 38,22" fill="none" stroke-width="0.7"/>
    <circle cx="8" cy="42" r="2.5" fill="#d4a0a0" opacity="0.25"/>
    <circle cx="42" cy="12" r="2.5" fill="#d4a0a0" opacity="0.25"/>
  </g>
  <!-- Bottom-left floral ornament -->
  <g transform="translate(35,1165) scale(1,-1)" opacity="0.3" fill="none" stroke="#d4a0a0" stroke-width="1">
    <path d="M 0,60 C 10,40 25,20 60,0"/>
    <path d="M 0,60 C 20,50 40,45 60,0"/>
    <path d="M 0,60 C 15,30 35,15 60,0"/>
    <g transform="translate(20,25)" fill="url(#re_rose_g)" stroke="#d4a0a0" stroke-width="0.6">
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(-30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(90)"/>
      <circle cx="0" cy="0" r="4" fill="#d4a0a0" opacity="0.4"/>
    </g>
    <circle cx="8" cy="42" r="2.5" fill="#d4a0a0" opacity="0.25"/>
    <circle cx="42" cy="12" r="2.5" fill="#d4a0a0" opacity="0.25"/>
  </g>
  <!-- Bottom-right floral ornament -->
  <g transform="translate(765,1165) scale(-1,-1)" opacity="0.3" fill="none" stroke="#d4a0a0" stroke-width="1">
    <path d="M 0,60 C 10,40 25,20 60,0"/>
    <path d="M 0,60 C 20,50 40,45 60,0"/>
    <path d="M 0,60 C 15,30 35,15 60,0"/>
    <g transform="translate(20,25)" fill="url(#re_rose_g)" stroke="#d4a0a0" stroke-width="0.6">
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(-30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" transform="rotate(90)"/>
      <circle cx="0" cy="0" r="4" fill="#d4a0a0" opacity="0.4"/>
    </g>
    <circle cx="8" cy="42" r="2.5" fill="#d4a0a0" opacity="0.25"/>
    <circle cx="42" cy="12" r="2.5" fill="#d4a0a0" opacity="0.25"/>
  </g>
  <!-- Side decorative vines -->
  <g opacity="0.1" fill="none" stroke="#d4a0a0" stroke-width="0.8">
    <path d="M 40,200 C 42,300 38,400 40,500 C 42,600 38,700 40,800 C 42,900 38,1000 40,1050"/>
    <path d="M 760,200 C 758,300 762,400 760,500 C 758,600 762,700 760,800 C 758,900 762,1000 760,1050"/>
    <!-- Tiny leaves on left vine -->
    <path d="M 40,350 C 30,340 25,350 35,355"/>
    <path d="M 40,550 C 30,540 25,550 35,555"/>
    <path d="M 40,750 C 30,740 25,750 35,755"/>
    <!-- Tiny leaves on right vine -->
    <path d="M 760,350 C 770,340 775,350 765,355"/>
    <path d="M 760,550 C 770,540 775,550 765,555"/>
    <path d="M 760,750 C 770,740 775,750 765,755"/>
  </g>
  <!-- Divider lines -->
  <line x1="120" y1="800" x2="680" y2="800" stroke="url(#re_line)" stroke-width="1"/>
  <line x1="120" y1="930" x2="680" y2="930" stroke="url(#re_line)" stroke-width="1"/>
  <!-- Ornamental diamonds on dividers -->
  <rect x="396" y="796" width="8" height="8" rx="1" fill="#c9a07a" opacity="0.4" transform="rotate(45,400,800)"/>
  <rect x="396" y="926" width="8" height="8" rx="1" fill="#c9a07a" opacity="0.4" transform="rotate(45,400,930)"/>
</svg>
`)}`;

const templateRosaEterna: TemplateLayout = {
  id: 'tpl_rosa_eterna',
  fondo_url: BG_ROSA_ETERNA,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'En Amorosa Memoria De',
      x: 0,
      y: 90,
      width: 800,
      fontSize: 30,
      fontFamily: 'Georgia',
      fill: '#d4a0a0',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: 'VELATORIO',
      x: 0,
      y: 820,
      width: 800,
      fontSize: 18,
      fontFamily: 'Georgia',
      fill: '#c9a07a',
      align: 'center',
      fontStyle: 'normal',
    },
    {
      tipo: 'texto',
      contenido: 'SEPELIO',
      x: 0,
      y: 950,
      width: 800,
      fontSize: 18,
      fontFamily: 'Georgia',
      fill: '#c9a07a',
      align: 'center',
      fontStyle: 'normal',
    },
  ],
  mapeo_dinamico: {
    nombres: {
      x: 0,
      y: 610,
      width: 800,
      fontSize: 42,
      fontFamily: 'Georgia',
      fill: '#f0e0d0',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 665,
      width: 800,
      fontSize: 42,
      fontFamily: 'Georgia',
      fill: '#f0e0d0',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 740,
      width: 800,
      fontSize: 19,
      fontFamily: 'Arial',
      fill: '#b09080',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 852,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#f0e0d0',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 887,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#b09080',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 982,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#f0e0d0',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 1017,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#b09080',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 110,
      y: 1080,
      width: 580,
      fontSize: 17,
      fontFamily: 'Georgia',
      fill: '#d4a0a0',
      align: 'center',
      fontStyle: 'italic',
    },
    foto_difunto: {
      x: 250,
      y: 170,
      width: 300,
      height: 400,
      draggable: true,
    },
  },
};

// ============================================================================
// TEMPLATE 3: LUZ DORADA
// Rich dark green/gold, ornate gold borders, classic funeral home feel
// ============================================================================

const BG_LUZ_DORADA = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <linearGradient id="ld_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1f0a;stop-opacity:1"/>
      <stop offset="25%" style="stop-color:#0f2b12;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#132f16;stop-opacity:1"/>
      <stop offset="75%" style="stop-color:#0f2b12;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0a1f0a;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="ld_gold_h" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8B7332;stop-opacity:0.3"/>
      <stop offset="15%" style="stop-color:#C5A53A;stop-opacity:0.7"/>
      <stop offset="30%" style="stop-color:#D4AF37;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#F0D060;stop-opacity:1"/>
      <stop offset="70%" style="stop-color:#D4AF37;stop-opacity:1"/>
      <stop offset="85%" style="stop-color:#C5A53A;stop-opacity:0.7"/>
      <stop offset="100%" style="stop-color:#8B7332;stop-opacity:0.3"/>
    </linearGradient>
    <linearGradient id="ld_gold_v" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8B7332;stop-opacity:0.3"/>
      <stop offset="15%" style="stop-color:#C5A53A;stop-opacity:0.7"/>
      <stop offset="50%" style="stop-color:#D4AF37;stop-opacity:1"/>
      <stop offset="85%" style="stop-color:#C5A53A;stop-opacity:0.7"/>
      <stop offset="100%" style="stop-color:#8B7332;stop-opacity:0.3"/>
    </linearGradient>
    <radialGradient id="ld_vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" style="stop-color:#1a3d1a;stop-opacity:0"/>
      <stop offset="100%" style="stop-color:#050f05;stop-opacity:0.5"/>
    </radialGradient>
    <pattern id="ld_damask" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 40,0 C 50,15 60,20 40,40 C 20,20 30,15 40,0 Z" fill="#D4AF37" opacity="0.03"/>
      <path d="M 0,40 C 15,50 20,60 40,40 C 20,20 15,30 0,40 Z" fill="#D4AF37" opacity="0.03"/>
      <path d="M 80,40 C 65,50 60,60 40,40 C 60,20 65,30 80,40 Z" fill="#D4AF37" opacity="0.03"/>
      <path d="M 40,80 C 50,65 60,60 40,40 C 20,60 30,65 40,80 Z" fill="#D4AF37" opacity="0.03"/>
    </pattern>
  </defs>
  <!-- Base -->
  <rect width="800" height="1200" fill="url(#ld_bg)"/>
  <rect width="800" height="1200" fill="url(#ld_vignette)"/>
  <rect width="800" height="1200" fill="url(#ld_damask)"/>
  <!-- Ornate triple border -->
  <rect x="18" y="18" width="764" height="1164" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.5" rx="4"/>
  <rect x="26" y="26" width="748" height="1148" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="0.3" rx="3"/>
  <rect x="34" y="34" width="732" height="1132" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.4" rx="2"/>
  <!-- Top ornamental bar -->
  <line x1="60" y1="75" x2="740" y2="75" stroke="url(#ld_gold_h)" stroke-width="1.5"/>
  <line x1="60" y1="78" x2="740" y2="78" stroke="url(#ld_gold_h)" stroke-width="0.5" opacity="0.5"/>
  <!-- Corner ornaments - Top Left -->
  <g opacity="0.55" fill="#D4AF37" stroke="#D4AF37" stroke-width="0.5">
    <path d="M 34,34 L 34,100 C 38,80 50,60 90,34 Z" fill="none"/>
    <path d="M 44,44 C 44,65 55,75 80,44" fill="none"/>
    <circle cx="52" cy="52" r="3"/>
    <!-- Fleur-de-lis inspired -->
    <path d="M 34,65 C 42,58 48,62 42,70 C 48,65 52,58 58,65 C 50,70 48,62 42,70" fill="none" stroke-width="0.8"/>
  </g>
  <!-- Corner ornaments - Top Right -->
  <g opacity="0.55" fill="#D4AF37" stroke="#D4AF37" stroke-width="0.5">
    <path d="M 766,34 L 766,100 C 762,80 750,60 710,34 Z" fill="none"/>
    <path d="M 756,44 C 756,65 745,75 720,44" fill="none"/>
    <circle cx="748" cy="52" r="3"/>
    <path d="M 766,65 C 758,58 752,62 758,70 C 752,65 748,58 742,65 C 750,70 752,62 758,70" fill="none" stroke-width="0.8"/>
  </g>
  <!-- Corner ornaments - Bottom Left -->
  <g opacity="0.55" fill="#D4AF37" stroke="#D4AF37" stroke-width="0.5">
    <path d="M 34,1166 L 34,1100 C 38,1120 50,1140 90,1166 Z" fill="none"/>
    <path d="M 44,1156 C 44,1135 55,1125 80,1156" fill="none"/>
    <circle cx="52" cy="1148" r="3"/>
  </g>
  <!-- Corner ornaments - Bottom Right -->
  <g opacity="0.55" fill="#D4AF37" stroke="#D4AF37" stroke-width="0.5">
    <path d="M 766,1166 L 766,1100 C 762,1120 750,1140 710,1166 Z" fill="none"/>
    <path d="M 756,1156 C 756,1135 745,1125 720,1156" fill="none"/>
    <circle cx="748" cy="1148" r="3"/>
  </g>
  <!-- Center top ornament (above photo area) -->
  <g transform="translate(400,95)" opacity="0.45" fill="none" stroke="#D4AF37" stroke-width="0.8">
    <path d="M -60,0 C -40,-15 -20,-10 0,-20 C 20,-10 40,-15 60,0"/>
    <path d="M -40,0 C -25,-10 -10,-8 0,-14 C 10,-8 25,-10 40,0"/>
    <circle cx="0" cy="-20" r="2.5" fill="#D4AF37"/>
    <path d="M -8,-17 L 0,-25 L 8,-17" fill="none"/>
  </g>
  <!-- Section dividers -->
  <g opacity="0.8">
    <line x1="100" y1="800" x2="700" y2="800" stroke="url(#ld_gold_h)" stroke-width="1"/>
    <!-- Ornamental center piece on divider -->
    <path d="M 390,795 L 400,790 L 410,795 L 400,800 Z" fill="#D4AF37" opacity="0.6"/>
  </g>
  <g opacity="0.8">
    <line x1="100" y1="930" x2="700" y2="930" stroke="url(#ld_gold_h)" stroke-width="1"/>
    <path d="M 390,925 L 400,920 L 410,925 L 400,930 Z" fill="#D4AF37" opacity="0.6"/>
  </g>
  <!-- Bottom ornamental bar -->
  <line x1="60" y1="1130" x2="740" y2="1130" stroke="url(#ld_gold_h)" stroke-width="1.5"/>
  <line x1="60" y1="1127" x2="740" y2="1127" stroke="url(#ld_gold_h)" stroke-width="0.5" opacity="0.5"/>
  <!-- Side accent lines -->
  <line x1="34" y1="100" x2="34" y2="1100" stroke="url(#ld_gold_v)" stroke-width="0.5" opacity="0.15"/>
  <line x1="766" y1="100" x2="766" y2="1100" stroke="url(#ld_gold_v)" stroke-width="0.5" opacity="0.15"/>
</svg>
`)}`;

const templateLuzDorada: TemplateLayout = {
  id: 'tpl_luz_dorada',
  fondo_url: BG_LUZ_DORADA,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'En Memoria De',
      x: 0,
      y: 110,
      width: 800,
      fontSize: 28,
      fontFamily: 'Georgia',
      fill: '#D4AF37',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: '--- VELATORIO ---',
      x: 0,
      y: 818,
      width: 800,
      fontSize: 18,
      fontFamily: 'Georgia',
      fill: '#D4AF37',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: '--- SEPELIO ---',
      x: 0,
      y: 948,
      width: 800,
      fontSize: 18,
      fontFamily: 'Georgia',
      fill: '#D4AF37',
      align: 'center',
    },
  ],
  mapeo_dinamico: {
    nombres: {
      x: 0,
      y: 610,
      width: 800,
      fontSize: 44,
      fontFamily: 'Georgia',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 668,
      width: 800,
      fontSize: 44,
      fontFamily: 'Georgia',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 745,
      width: 800,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#A0A080',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 852,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 887,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#A0A080',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 982,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 1017,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#A0A080',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 100,
      y: 1070,
      width: 600,
      fontSize: 17,
      fontFamily: 'Georgia',
      fill: '#D4AF37',
      align: 'center',
      fontStyle: 'italic',
    },
    foto_difunto: {
      x: 225,
      y: 170,
      width: 350,
      height: 400,
      draggable: true,
    },
  },
};

// ============================================================================
// TEMPLATE 4: SERENIDAD
// Clean modern minimalist, white/light gray, photo on top
// ============================================================================

const BG_SERENIDAD = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <linearGradient id="sr_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f8f8f8;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#f2f2f2;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#e8e8e8;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="sr_accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2c2c2c;stop-opacity:0"/>
      <stop offset="30%" style="stop-color:#2c2c2c;stop-opacity:0.3"/>
      <stop offset="50%" style="stop-color:#2c2c2c;stop-opacity:0.6"/>
      <stop offset="70%" style="stop-color:#2c2c2c;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#2c2c2c;stop-opacity:0"/>
    </linearGradient>
    <linearGradient id="sr_top_bar" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#333333;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="sr_subtle" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#d0d0d0;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#b0b0b0;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#d0d0d0;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <!-- Clean white background -->
  <rect width="800" height="1200" fill="url(#sr_bg)"/>
  <!-- Top dark accent bar -->
  <rect x="0" y="0" width="800" height="8" fill="url(#sr_top_bar)"/>
  <!-- Bottom dark accent bar -->
  <rect x="0" y="1192" width="800" height="8" fill="url(#sr_top_bar)"/>
  <!-- Minimal border -->
  <rect x="40" y="40" width="720" height="1120" fill="none" stroke="#cccccc" stroke-width="0.5" rx="0"/>
  <!-- Photo area background hint -->
  <rect x="40" y="40" width="720" height="420" fill="#eaeaea" opacity="0.5"/>
  <!-- Subtle geometric pattern in photo area -->
  <g opacity="0.04">
    <line x1="40" y1="40" x2="760" y2="460" stroke="#888" stroke-width="0.5"/>
    <line x1="760" y1="40" x2="40" y2="460" stroke="#888" stroke-width="0.5"/>
    <line x1="400" y1="40" x2="400" y2="460" stroke="#888" stroke-width="0.5"/>
    <line x1="40" y1="250" x2="760" y2="250" stroke="#888" stroke-width="0.5"/>
  </g>
  <!-- Accent line below photo area -->
  <line x1="80" y1="480" x2="720" y2="480" stroke="url(#sr_accent)" stroke-width="2"/>
  <!-- Section heading underlines -->
  <line x1="200" y1="770" x2="600" y2="770" stroke="url(#sr_subtle)" stroke-width="0.8"/>
  <line x1="200" y1="920" x2="600" y2="920" stroke="url(#sr_subtle)" stroke-width="0.8"/>
  <!-- Minimal left accent line -->
  <line x1="60" y1="500" x2="60" y2="1140" stroke="#2c2c2c" stroke-width="1.5" opacity="0.08"/>
  <!-- Bottom decorative line -->
  <line x1="80" y1="1100" x2="720" y2="1100" stroke="url(#sr_accent)" stroke-width="0.5" opacity="0.3"/>
  <!-- Small square accents -->
  <rect x="388" y="474" width="24" height="12" fill="#2c2c2c" opacity="0.15"/>
  <rect x="388" y="764" width="24" height="12" fill="#2c2c2c" opacity="0.08"/>
  <rect x="388" y="914" width="24" height="12" fill="#2c2c2c" opacity="0.08"/>
</svg>
`)}`;

const templateSerenidad: TemplateLayout = {
  id: 'tpl_serenidad',
  fondo_url: BG_SERENIDAD,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'EN MEMORIA',
      x: 0,
      y: 505,
      width: 800,
      fontSize: 16,
      fontFamily: 'Arial',
      fill: '#888888',
      align: 'center',
      fontStyle: 'normal',
    },
    {
      tipo: 'texto',
      contenido: 'VELATORIO',
      x: 0,
      y: 780,
      width: 800,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: '#999999',
      align: 'center',
      fontStyle: 'normal',
    },
    {
      tipo: 'texto',
      contenido: 'SEPELIO',
      x: 0,
      y: 930,
      width: 800,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: '#999999',
      align: 'center',
      fontStyle: 'normal',
    },
  ],
  mapeo_dinamico: {
    foto_difunto: {
      x: 175,
      y: 50,
      width: 450,
      height: 400,
      draggable: true,
    },
    nombres: {
      x: 0,
      y: 545,
      width: 800,
      fontSize: 48,
      fontFamily: 'Arial',
      fill: '#1a1a1a',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 605,
      width: 800,
      fontSize: 48,
      fontFamily: 'Arial',
      fill: '#1a1a1a',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 685,
      width: 800,
      fontSize: 19,
      fontFamily: 'Arial',
      fill: '#666666',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 810,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#333333',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 845,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#777777',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 960,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#333333',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 995,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#777777',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 100,
      y: 1060,
      width: 600,
      fontSize: 17,
      fontFamily: 'Georgia',
      fill: '#555555',
      align: 'center',
      fontStyle: 'italic',
    },
  },
};

// ============================================================================
// TEMPLATE 5: ATARDECER
// Warm sunset gradient (orange to deep purple), stars
// ============================================================================

const BG_ATARDECER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <linearGradient id="at_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0533;stop-opacity:1"/>
      <stop offset="15%" style="stop-color:#2d1054;stop-opacity:1"/>
      <stop offset="35%" style="stop-color:#4a1942;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#7a2e3a;stop-opacity:1"/>
      <stop offset="65%" style="stop-color:#b5543a;stop-opacity:1"/>
      <stop offset="80%" style="stop-color:#d4884a;stop-opacity:1"/>
      <stop offset="92%" style="stop-color:#e8b060;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#f0c878;stop-opacity:1"/>
    </linearGradient>
    <radialGradient id="at_sun" cx="50%" cy="82%" r="25%" fx="50%" fy="82%">
      <stop offset="0%" style="stop-color:#ffe8a0;stop-opacity:0.6"/>
      <stop offset="40%" style="stop-color:#f0c060;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#d4884a;stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="at_line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e8c078;stop-opacity:0"/>
      <stop offset="25%" style="stop-color:#e8c078;stop-opacity:0.4"/>
      <stop offset="50%" style="stop-color:#f0d8a0;stop-opacity:0.7"/>
      <stop offset="75%" style="stop-color:#e8c078;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#e8c078;stop-opacity:0"/>
    </linearGradient>
    <radialGradient id="at_star_g" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/>
    </radialGradient>
    <filter id="at_glow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="at_glow_big">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Sky gradient -->
  <rect width="800" height="1200" fill="url(#at_sky)"/>
  <!-- Sun glow -->
  <rect width="800" height="1200" fill="url(#at_sun)"/>
  <!-- Horizon haze -->
  <rect x="0" y="900" width="800" height="300" fill="#f0c878" opacity="0.05"/>
  <!-- Stars in upper area -->
  <g filter="url(#at_glow)">
    <!-- Bright stars -->
    <circle cx="120" cy="60" r="2" fill="#ffffff" opacity="0.9"/>
    <circle cx="680" cy="45" r="2.5" fill="#ffffff" opacity="0.85"/>
    <circle cx="350" cy="30" r="1.8" fill="#ffffff" opacity="0.8"/>
    <circle cx="550" cy="80" r="2" fill="#ffffff" opacity="0.75"/>
    <circle cx="200" cy="120" r="1.5" fill="#ffffff" opacity="0.7"/>
    <circle cx="720" cy="130" r="1.8" fill="#ffffff" opacity="0.65"/>
    <circle cx="450" cy="55" r="1.5" fill="#ffffff" opacity="0.7"/>
    <circle cx="90" cy="150" r="2" fill="#ffffff" opacity="0.6"/>
  </g>
  <!-- Dimmer stars -->
  <g opacity="0.4">
    <circle cx="160" cy="40" r="1" fill="#ffffff"/>
    <circle cx="250" cy="75" r="0.8" fill="#ffffff"/>
    <circle cx="310" cy="95" r="1" fill="#ffffff"/>
    <circle cx="490" cy="35" r="0.8" fill="#ffffff"/>
    <circle cx="580" cy="60" r="1" fill="#ffffff"/>
    <circle cx="640" cy="100" r="0.8" fill="#ffffff"/>
    <circle cx="100" cy="95" r="0.7" fill="#ffffff"/>
    <circle cx="420" cy="110" r="0.8" fill="#ffffff"/>
    <circle cx="750" cy="80" r="0.7" fill="#ffffff"/>
    <circle cx="60" cy="55" r="1" fill="#ffffff"/>
    <circle cx="520" cy="25" r="0.7" fill="#ffffff"/>
    <circle cx="180" cy="160" r="0.8" fill="#ffffff"/>
    <circle cx="650" cy="155" r="0.7" fill="#ffffff"/>
    <circle cx="380" cy="140" r="1" fill="#ffffff"/>
    <circle cx="280" cy="170" r="0.7" fill="#ffffff"/>
    <circle cx="560" cy="145" r="0.8" fill="#ffffff"/>
    <circle cx="470" cy="160" r="0.6" fill="#ffffff"/>
    <circle cx="330" cy="190" r="0.7" fill="#ffffff"/>
    <circle cx="700" cy="180" r="0.9" fill="#ffffff"/>
    <circle cx="50" cy="190" r="0.6" fill="#ffffff"/>
  </g>
  <!-- One prominent star with sparkle -->
  <g filter="url(#at_glow_big)" transform="translate(300,50)">
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#ffffff" stroke-width="1" opacity="0.9"/>
    <line x1="0" y1="-6" x2="0" y2="6" stroke="#ffffff" stroke-width="1" opacity="0.9"/>
    <line x1="-4" y1="-4" x2="4" y2="4" stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>
    <line x1="4" y1="-4" x2="-4" y2="4" stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>
    <circle cx="0" cy="0" r="1.5" fill="#ffffff"/>
  </g>
  <!-- Soft cloud wisps at horizon -->
  <g opacity="0.06">
    <ellipse cx="200" cy="950" rx="200" ry="20" fill="#ffffff"/>
    <ellipse cx="600" cy="980" rx="180" ry="15" fill="#ffffff"/>
    <ellipse cx="400" cy="1000" rx="250" ry="18" fill="#ffffff"/>
    <ellipse cx="100" cy="1020" rx="150" ry="12" fill="#ffffff"/>
    <ellipse cx="700" cy="1010" rx="140" ry="14" fill="#ffffff"/>
  </g>
  <!-- Delicate border -->
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#e8c078" stroke-width="0.8" opacity="0.25" rx="8"/>
  <rect x="35" y="35" width="730" height="1130" fill="none" stroke="#e8c078" stroke-width="0.3" opacity="0.15" rx="5"/>
  <!-- Divider lines -->
  <line x1="140" y1="770" x2="660" y2="770" stroke="url(#at_line)" stroke-width="0.8"/>
  <line x1="140" y1="900" x2="660" y2="900" stroke="url(#at_line)" stroke-width="0.8"/>
  <!-- Small star accents on dividers -->
  <g opacity="0.4">
    <circle cx="400" cy="770" r="2" fill="#f0d8a0"/>
    <circle cx="380" cy="770" r="1" fill="#f0d8a0"/>
    <circle cx="420" cy="770" r="1" fill="#f0d8a0"/>
    <circle cx="400" cy="900" r="2" fill="#f0d8a0"/>
    <circle cx="380" cy="900" r="1" fill="#f0d8a0"/>
    <circle cx="420" cy="900" r="1" fill="#f0d8a0"/>
  </g>
</svg>
`)}`;

const templateAtardecer: TemplateLayout = {
  id: 'tpl_atardecer',
  fondo_url: BG_ATARDECER,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'En Memoria De',
      x: 0,
      y: 220,
      width: 800,
      fontSize: 28,
      fontFamily: 'Georgia',
      fill: '#f0d8a0',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: 'VELATORIO',
      x: 0,
      y: 788,
      width: 800,
      fontSize: 18,
      fontFamily: 'Georgia',
      fill: '#e8c078',
      align: 'center',
      fontStyle: 'normal',
    },
    {
      tipo: 'texto',
      contenido: 'SEPELIO',
      x: 0,
      y: 918,
      width: 800,
      fontSize: 18,
      fontFamily: 'Georgia',
      fill: '#e8c078',
      align: 'center',
      fontStyle: 'normal',
    },
  ],
  mapeo_dinamico: {
    foto_difunto: {
      x: 80,
      y: 290,
      width: 280,
      height: 380,
      draggable: true,
    },
    nombres: {
      x: 380,
      y: 330,
      width: 380,
      fontSize: 38,
      fontFamily: 'Georgia',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 380,
      y: 385,
      width: 380,
      fontSize: 38,
      fontFamily: 'Georgia',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 380,
      y: 460,
      width: 380,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#d4b896',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 380,
      y: 520,
      width: 370,
      fontSize: 16,
      fontFamily: 'Georgia',
      fill: '#f0d8a0',
      align: 'center',
      fontStyle: 'italic',
    },
    velatorio_lugar: {
      x: 0,
      y: 822,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 857,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#d4b896',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 952,
      width: 800,
      fontSize: 22,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 987,
      width: 800,
      fontSize: 17,
      fontFamily: 'Arial',
      fill: '#d4b896',
      align: 'center',
    },
  },
};

// ============================================================================
// TEMPLATE 6: CRUZ ETERNA
// White background with golden cross — classic Catholic feel
// ============================================================================

const BG_CRUZ_ETERNA = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <linearGradient id="ce_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fdfbf6;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#f3eede;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="ce_gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#bf953f;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#fcf6ba;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#aa771c;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="ce_line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#bf953f;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#bf953f;stop-opacity:0.7"/>
      <stop offset="100%" style="stop-color:#bf953f;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1200" fill="url(#ce_bg)"/>
  <!-- Outer thin border -->
  <rect x="30" y="30" width="740" height="1140" fill="none" stroke="#bf953f" stroke-width="0.6" opacity="0.4"/>
  <rect x="42" y="42" width="716" height="1116" fill="none" stroke="#bf953f" stroke-width="0.3" opacity="0.3"/>
  <!-- Top golden cross watermark -->
  <g opacity="0.18">
    <rect x="385" y="60" width="30" height="120" fill="url(#ce_gold)"/>
    <rect x="345" y="90" width="110" height="30" fill="url(#ce_gold)"/>
  </g>
  <!-- Dividers -->
  <line x1="120" y1="790" x2="680" y2="790" stroke="url(#ce_line)" stroke-width="1.2"/>
  <line x1="120" y1="920" x2="680" y2="920" stroke="url(#ce_line)" stroke-width="1.2"/>
  <!-- Decorative diamond on dividers -->
  <rect x="395" y="785" width="10" height="10" fill="#bf953f" opacity="0.7" transform="rotate(45,400,790)"/>
  <rect x="395" y="915" width="10" height="10" fill="#bf953f" opacity="0.7" transform="rotate(45,400,920)"/>
  <!-- Bottom small cross -->
  <g opacity="0.25" transform="translate(400,1110)">
    <rect x="-3" y="-15" width="6" height="30" fill="#bf953f"/>
    <rect x="-12" y="-6" width="24" height="6" fill="#bf953f"/>
  </g>
</svg>
`)}`;

const templateCruzEterna: TemplateLayout = {
  id: 'tpl_cruz_eterna',
  fondo_url: BG_CRUZ_ETERNA,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'Descansa en Paz',
      x: 0,
      y: 200,
      width: 800,
      fontSize: 26,
      fontFamily: 'Cormorant Garamond',
      fill: '#8b6914',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: 'VELATORIO',
      x: 0,
      y: 805,
      width: 800,
      fontSize: 16,
      fontFamily: 'Cormorant Garamond',
      fill: '#bf953f',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: 'SEPELIO',
      x: 0,
      y: 935,
      width: 800,
      fontSize: 16,
      fontFamily: 'Cormorant Garamond',
      fill: '#bf953f',
      align: 'center',
    },
  ],
  mapeo_dinamico: {
    foto_difunto: { x: 250, y: 240, width: 300, height: 380, draggable: true },
    nombres: {
      x: 0,
      y: 645,
      width: 800,
      fontSize: 44,
      fontFamily: 'Playfair Display',
      fill: '#1a1a1a',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 700,
      width: 800,
      fontSize: 44,
      fontFamily: 'Playfair Display',
      fill: '#1a1a1a',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 760,
      width: 800,
      fontSize: 19,
      fontFamily: 'Cormorant Garamond',
      fill: '#665544',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 838,
      width: 800,
      fontSize: 22,
      fontFamily: 'Playfair Display',
      fill: '#1a1a1a',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 875,
      width: 800,
      fontSize: 17,
      fontFamily: 'Cormorant Garamond',
      fill: '#665544',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 968,
      width: 800,
      fontSize: 22,
      fontFamily: 'Playfair Display',
      fill: '#1a1a1a',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 1005,
      width: 800,
      fontSize: 17,
      fontFamily: 'Cormorant Garamond',
      fill: '#665544',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 110,
      y: 1055,
      width: 580,
      fontSize: 16,
      fontFamily: 'Cormorant Garamond',
      fill: '#8b6914',
      align: 'center',
      fontStyle: 'italic',
    },
  },
};

// ============================================================================
// TEMPLATE 7: MINIMAL MARFIL
// Ultra-clean, beige/ivory tones, sans-serif modern
// ============================================================================

const BG_MINIMAL_MARFIL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <rect width="800" height="1200" fill="#f5efe6"/>
  <rect x="50" y="50" width="700" height="1100" fill="none" stroke="#5c5240" stroke-width="0.5" opacity="0.25"/>
  <line x1="100" y1="780" x2="700" y2="780" stroke="#5c5240" stroke-width="0.4" opacity="0.5"/>
  <line x1="100" y1="920" x2="700" y2="920" stroke="#5c5240" stroke-width="0.4" opacity="0.5"/>
  <!-- Tiny circle accents -->
  <circle cx="400" cy="780" r="2" fill="#5c5240" opacity="0.6"/>
  <circle cx="400" cy="920" r="2" fill="#5c5240" opacity="0.6"/>
  <!-- Top tiny serif marker -->
  <line x1="385" y1="160" x2="415" y2="160" stroke="#5c5240" stroke-width="0.6"/>
</svg>
`)}`;

const templateMinimalMarfil: TemplateLayout = {
  id: 'tpl_minimal_marfil',
  fondo_url: BG_MINIMAL_MARFIL,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: 'IN MEMORIAM',
      x: 0,
      y: 100,
      width: 800,
      fontSize: 14,
      fontFamily: 'Inter',
      fill: '#5c5240',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: 'velatorio',
      x: 0,
      y: 800,
      width: 800,
      fontSize: 12,
      fontFamily: 'Inter',
      fill: '#7a6e58',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: 'sepelio',
      x: 0,
      y: 940,
      width: 800,
      fontSize: 12,
      fontFamily: 'Inter',
      fill: '#7a6e58',
      align: 'center',
    },
  ],
  mapeo_dinamico: {
    foto_difunto: { x: 280, y: 200, width: 240, height: 320, draggable: true },
    nombres: {
      x: 0,
      y: 560,
      width: 800,
      fontSize: 38,
      fontFamily: 'Marcellus',
      fill: '#2a2418',
      align: 'center',
    },
    apellidos: {
      x: 0,
      y: 610,
      width: 800,
      fontSize: 38,
      fontFamily: 'Marcellus',
      fill: '#2a2418',
      align: 'center',
    },
    fechas: {
      x: 0,
      y: 685,
      width: 800,
      fontSize: 16,
      fontFamily: 'Inter',
      fill: '#7a6e58',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 830,
      width: 800,
      fontSize: 20,
      fontFamily: 'Marcellus',
      fill: '#2a2418',
      align: 'center',
    },
    velatorio_direccion: {
      x: 0,
      y: 865,
      width: 800,
      fontSize: 15,
      fontFamily: 'Inter',
      fill: '#7a6e58',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 970,
      width: 800,
      fontSize: 20,
      fontFamily: 'Marcellus',
      fill: '#2a2418',
      align: 'center',
    },
    sepelio_lugar: {
      x: 0,
      y: 1005,
      width: 800,
      fontSize: 15,
      fontFamily: 'Inter',
      fill: '#7a6e58',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 130,
      y: 1075,
      width: 540,
      fontSize: 14,
      fontFamily: 'Inter',
      fill: '#5c5240',
      align: 'center',
      fontStyle: 'italic',
    },
  },
};

// ============================================================================
// TEMPLATE 8: NOCTURNO PROFUNDO
// Deep black with silver/blue accents, modern feel
// ============================================================================

const BG_NOCTURNO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <radialGradient id="nc_bg" cx="50%" cy="40%" r="80%">
      <stop offset="0%" style="stop-color:#1a1d2e;stop-opacity:1"/>
      <stop offset="60%" style="stop-color:#0c0f1c;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#040611;stop-opacity:1"/>
    </radialGradient>
    <linearGradient id="nc_silver" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#bcc6e0;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#dde3f2;stop-opacity:0.85"/>
      <stop offset="100%" style="stop-color:#bcc6e0;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1200" fill="url(#nc_bg)"/>
  <!-- Tiny stars -->
  <g fill="#dde3f2">
    <circle cx="120" cy="80" r="1" opacity="0.7"/>
    <circle cx="650" cy="120" r="0.8" opacity="0.6"/>
    <circle cx="260" cy="50" r="1" opacity="0.5"/>
    <circle cx="490" cy="60" r="0.7" opacity="0.6"/>
    <circle cx="710" cy="180" r="0.9" opacity="0.5"/>
    <circle cx="80" cy="170" r="0.7" opacity="0.5"/>
    <circle cx="380" cy="180" r="0.7" opacity="0.4"/>
  </g>
  <!-- Outer border -->
  <rect x="30" y="30" width="740" height="1140" fill="none" stroke="#dde3f2" stroke-width="0.5" opacity="0.25"/>
  <!-- Dividers -->
  <line x1="100" y1="790" x2="700" y2="790" stroke="url(#nc_silver)" stroke-width="0.8"/>
  <line x1="100" y1="930" x2="700" y2="930" stroke="url(#nc_silver)" stroke-width="0.8"/>
  <!-- Bottom luminous accent -->
  <rect x="0" y="1192" width="800" height="8" fill="url(#nc_silver)" opacity="0.6"/>
</svg>
`)}`;

const templateNocturno: TemplateLayout = {
  id: 'tpl_nocturno',
  fondo_url: BG_NOCTURNO,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: '— En memoria eterna —',
      x: 0,
      y: 220,
      width: 800,
      fontSize: 22,
      fontFamily: 'Cormorant Garamond',
      fill: '#bcc6e0',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: 'VELATORIO',
      x: 0,
      y: 808,
      width: 800,
      fontSize: 14,
      fontFamily: 'Inter',
      fill: '#bcc6e0',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: 'SEPELIO',
      x: 0,
      y: 948,
      width: 800,
      fontSize: 14,
      fontFamily: 'Inter',
      fill: '#bcc6e0',
      align: 'center',
    },
  ],
  mapeo_dinamico: {
    foto_difunto: { x: 250, y: 270, width: 300, height: 380, draggable: true },
    nombres: {
      x: 0,
      y: 670,
      width: 800,
      fontSize: 44,
      fontFamily: 'Playfair Display',
      fill: '#f5f7ff',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 720,
      width: 800,
      fontSize: 44,
      fontFamily: 'Playfair Display',
      fill: '#f5f7ff',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 765,
      width: 800,
      fontSize: 19,
      fontFamily: 'Cormorant Garamond',
      fill: '#9aa6c4',
      align: 'center',
    },
    velatorio_lugar: {
      x: 0,
      y: 845,
      width: 800,
      fontSize: 22,
      fontFamily: 'Playfair Display',
      fill: '#f5f7ff',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 880,
      width: 800,
      fontSize: 17,
      fontFamily: 'Cormorant Garamond',
      fill: '#9aa6c4',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 980,
      width: 800,
      fontSize: 22,
      fontFamily: 'Playfair Display',
      fill: '#f5f7ff',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 1015,
      width: 800,
      fontSize: 17,
      fontFamily: 'Cormorant Garamond',
      fill: '#9aa6c4',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 100,
      y: 1075,
      width: 600,
      fontSize: 16,
      fontFamily: 'Cormorant Garamond',
      fill: '#bcc6e0',
      align: 'center',
      fontStyle: 'italic',
    },
  },
};

// ============================================================================
// TEMPLATE 9: VINTAGE SEPIA
// Aged sepia tones with vintage frame
// ============================================================================

const BG_VINTAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200">
  <defs>
    <radialGradient id="vt_bg" cx="50%" cy="50%" r="75%">
      <stop offset="0%" style="stop-color:#f6e8c8;stop-opacity:1"/>
      <stop offset="60%" style="stop-color:#e6cda0;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#c9a26a;stop-opacity:1"/>
    </radialGradient>
    <pattern id="vt_grain" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.3" fill="#3a2a14" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="800" height="1200" fill="url(#vt_bg)"/>
  <rect width="800" height="1200" fill="url(#vt_grain)"/>
  <!-- Heavy ornate border -->
  <rect x="22" y="22" width="756" height="1156" fill="none" stroke="#5c3d1c" stroke-width="3" opacity="0.45"/>
  <rect x="34" y="34" width="732" height="1132" fill="none" stroke="#5c3d1c" stroke-width="0.8" opacity="0.5"/>
  <rect x="42" y="42" width="716" height="1116" fill="none" stroke="#5c3d1c" stroke-width="0.4" opacity="0.4"/>
  <!-- Corner ornaments -->
  <g stroke="#5c3d1c" stroke-width="1" fill="none" opacity="0.55">
    <path d="M 50,50 L 110,50 M 50,50 L 50,110 M 60,60 Q 90,60 90,90"/>
    <path d="M 750,50 L 690,50 M 750,50 L 750,110 M 740,60 Q 710,60 710,90"/>
    <path d="M 50,1150 L 110,1150 M 50,1150 L 50,1090 M 60,1140 Q 90,1140 90,1110"/>
    <path d="M 750,1150 L 690,1150 M 750,1150 L 750,1090 M 740,1140 Q 710,1140 710,1110"/>
  </g>
  <!-- Aged divider lines -->
  <line x1="120" y1="780" x2="680" y2="780" stroke="#5c3d1c" stroke-width="1.2" opacity="0.5"/>
  <line x1="120" y1="920" x2="680" y2="920" stroke="#5c3d1c" stroke-width="1.2" opacity="0.5"/>
  <!-- Vignette -->
  <radialGradient id="vt_vignette" cx="50%" cy="50%" r="75%">
    <stop offset="60%" style="stop-color:#000;stop-opacity:0"/>
    <stop offset="100%" style="stop-color:#000;stop-opacity:0.25"/>
  </radialGradient>
  <rect width="800" height="1200" fill="url(#vt_vignette)"/>
</svg>
`)}`;

const templateVintageSepia: TemplateLayout = {
  id: 'tpl_vintage_sepia',
  fondo_url: BG_VINTAGE,
  elementos_fijos: [
    {
      tipo: 'texto',
      contenido: '~ En Memoria de un Ser Querido ~',
      x: 0,
      y: 105,
      width: 800,
      fontSize: 26,
      fontFamily: 'EB Garamond',
      fill: '#3a2a14',
      align: 'center',
      fontStyle: 'italic',
    },
    {
      tipo: 'texto',
      contenido: 'V E L A T O R I O',
      x: 0,
      y: 800,
      width: 800,
      fontSize: 16,
      fontFamily: 'EB Garamond',
      fill: '#5c3d1c',
      align: 'center',
    },
    {
      tipo: 'texto',
      contenido: 'S E P E L I O',
      x: 0,
      y: 940,
      width: 800,
      fontSize: 16,
      fontFamily: 'EB Garamond',
      fill: '#5c3d1c',
      align: 'center',
    },
  ],
  mapeo_dinamico: {
    foto_difunto: { x: 240, y: 165, width: 320, height: 400, draggable: true },
    nombres: {
      x: 0,
      y: 600,
      width: 800,
      fontSize: 44,
      fontFamily: 'EB Garamond',
      fill: '#2c1d0a',
      align: 'center',
      fontStyle: 'bold',
    },
    apellidos: {
      x: 0,
      y: 655,
      width: 800,
      fontSize: 44,
      fontFamily: 'EB Garamond',
      fill: '#2c1d0a',
      align: 'center',
      fontStyle: 'bold',
    },
    fechas: {
      x: 0,
      y: 730,
      width: 800,
      fontSize: 19,
      fontFamily: 'EB Garamond',
      fill: '#5c3d1c',
      align: 'center',
      fontStyle: 'italic',
    },
    velatorio_lugar: {
      x: 0,
      y: 833,
      width: 800,
      fontSize: 22,
      fontFamily: 'EB Garamond',
      fill: '#2c1d0a',
      align: 'center',
      fontStyle: 'bold',
    },
    velatorio_direccion: {
      x: 0,
      y: 870,
      width: 800,
      fontSize: 17,
      fontFamily: 'EB Garamond',
      fill: '#5c3d1c',
      align: 'center',
    },
    sepelio_fecha_hora: {
      x: 0,
      y: 973,
      width: 800,
      fontSize: 22,
      fontFamily: 'EB Garamond',
      fill: '#2c1d0a',
      align: 'center',
      fontStyle: 'bold',
    },
    sepelio_lugar: {
      x: 0,
      y: 1010,
      width: 800,
      fontSize: 17,
      fontFamily: 'EB Garamond',
      fill: '#5c3d1c',
      align: 'center',
    },
    frase_dedicatoria: {
      x: 100,
      y: 1070,
      width: 600,
      fontSize: 16,
      fontFamily: 'EB Garamond',
      fill: '#3a2a14',
      align: 'center',
      fontStyle: 'italic',
    },
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export const templates: TemplateLayout[] = [
  templatePazCelestial,
  templateRosaEterna,
  templateLuzDorada,
  templateSerenidad,
  templateAtardecer,
  templateCruzEterna,
  templateMinimalMarfil,
  templateNocturno,
  templateVintageSepia,
];

export const templatesList: { id: string; name: string; preview_color: string }[] = [
  { id: 'tpl_paz_celestial', name: 'Paz Celestial', preview_color: '#8ba7cc' },
  { id: 'tpl_rosa_eterna', name: 'Rosa Eterna', preview_color: '#4a1a2a' },
  { id: 'tpl_luz_dorada', name: 'Luz Dorada', preview_color: '#0f2b12' },
  { id: 'tpl_serenidad', name: 'Serenidad', preview_color: '#f2f2f2' },
  { id: 'tpl_atardecer', name: 'Atardecer', preview_color: '#7a2e3a' },
  { id: 'tpl_cruz_eterna', name: 'Cruz Eterna', preview_color: '#f3eede' },
  { id: 'tpl_minimal_marfil', name: 'Minimal Marfil', preview_color: '#f5efe6' },
  { id: 'tpl_nocturno', name: 'Nocturno', preview_color: '#0c0f1c' },
  { id: 'tpl_vintage_sepia', name: 'Vintage Sepia', preview_color: '#c9a26a' },
];
