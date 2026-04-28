/**
 * Curated Google Fonts list — selected for obituary/memorial flyers.
 * Each entry maps a CSS family name to a Google Fonts CSS2 URL with
 * weights typically needed for headlines + body.
 */
export interface CuratedFont {
  family: string;
  url: string;
  category: 'serif' | 'sans' | 'display' | 'script' | 'mono';
  /** Hint for the description shown next to the family in pickers. */
  hint: string;
}

const gf = (family: string, params = 'wght@400;500;600;700') =>
  `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${params}&display=swap`;

export const CURATED_FONTS: CuratedFont[] = [
  // Serifs (clásicas, óptimas para obituarios)
  {
    family: 'Playfair Display',
    url: gf('Playfair Display', 'wght@400;500;700;900'),
    category: 'serif',
    hint: 'Serif elegante',
  },
  {
    family: 'Cormorant Garamond',
    url: gf('Cormorant Garamond', 'wght@300;400;500;600;700'),
    category: 'serif',
    hint: 'Serif refinada',
  },
  {
    family: 'EB Garamond',
    url: gf('EB Garamond', 'wght@400;500;600;700'),
    category: 'serif',
    hint: 'Serif clásica',
  },
  { family: 'Lora', url: gf('Lora'), category: 'serif', hint: 'Serif legible' },
  {
    family: 'Merriweather',
    url: gf('Merriweather', 'wght@300;400;700;900'),
    category: 'serif',
    hint: 'Serif tradicional',
  },
  {
    family: 'Crimson Text',
    url: gf('Crimson Text', 'wght@400;600;700'),
    category: 'serif',
    hint: 'Serif suave',
  },
  { family: 'Cardo', url: gf('Cardo', 'wght@400;700'), category: 'serif', hint: 'Serif litúrgica' },
  {
    family: 'Cinzel',
    url: gf('Cinzel', 'wght@400;500;700;900'),
    category: 'serif',
    hint: 'Romana clásica',
  },
  {
    family: 'Trajan Pro 3',
    url: gf('Cinzel', 'wght@400;700'),
    category: 'serif',
    hint: 'Romana monumental',
  },

  // Sans
  {
    family: 'Inter',
    url: gf('Inter', 'wght@300;400;500;600;700'),
    category: 'sans',
    hint: 'Sans moderna',
  },
  {
    family: 'Lato',
    url: gf('Lato', 'wght@300;400;700;900'),
    category: 'sans',
    hint: 'Sans humanista',
  },
  {
    family: 'Montserrat',
    url: gf('Montserrat', 'wght@300;400;500;600;700;900'),
    category: 'sans',
    hint: 'Sans geométrica',
  },
  { family: 'Open Sans', url: gf('Open Sans'), category: 'sans', hint: 'Sans neutra' },
  {
    family: 'Poppins',
    url: gf('Poppins', 'wght@300;400;500;600;700'),
    category: 'sans',
    hint: 'Sans amigable',
  },
  { family: 'Raleway', url: gf('Raleway'), category: 'sans', hint: 'Sans estilizada' },
  { family: 'Source Sans 3', url: gf('Source Sans 3'), category: 'sans', hint: 'Sans limpia' },

  // Display / únicas
  {
    family: 'Marcellus',
    url: gf('Marcellus', 'wght@400'),
    category: 'display',
    hint: 'Display patricia',
  },
  {
    family: 'Cinzel Decorative',
    url: gf('Cinzel Decorative', 'wght@400;700;900'),
    category: 'display',
    hint: 'Display ornamental',
  },
  {
    family: 'Yeseva One',
    url: gf('Yeseva One', 'wght@400'),
    category: 'display',
    hint: 'Display dramática',
  },
  {
    family: 'Italiana',
    url: gf('Italiana', 'wght@400'),
    category: 'display',
    hint: 'Display italianizante',
  },

  // Script / cursivas elegantes
  {
    family: 'Great Vibes',
    url: gf('Great Vibes', 'wght@400'),
    category: 'script',
    hint: 'Script ceremoniosa',
  },
  {
    family: 'Allura',
    url: gf('Allura', 'wght@400'),
    category: 'script',
    hint: 'Script estilizada',
  },
  {
    family: 'Pinyon Script',
    url: gf('Pinyon Script', 'wght@400'),
    category: 'script',
    hint: 'Script clásica',
  },
  {
    family: 'Parisienne',
    url: gf('Parisienne', 'wght@400'),
    category: 'script',
    hint: 'Script suave',
  },
  {
    family: 'Dancing Script',
    url: gf('Dancing Script'),
    category: 'script',
    hint: 'Script informal',
  },
  {
    family: 'Cormorant Upright',
    url: gf('Cormorant Upright', 'wght@400;600;700'),
    category: 'serif',
    hint: 'Serif vertical',
  },
];

export function loadGoogleFont(family: string, url: string): void {
  const existing = document.querySelector(
    `link[data-flyer-font="${family}"]`,
  ) as HTMLLinkElement | null;
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.dataset.flyerFont = family;
  document.head.appendChild(link);
}

/**
 * Tries to extract the family name from a pasted Google Fonts CSS URL.
 * Supports https://fonts.googleapis.com/css2?family=Name+Variant:...
 */
export function extractFamilyFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const family = u.searchParams.get('family');
    if (!family) return null;
    return family.split(':')[0].replace(/\+/g, ' ');
  } catch {
    return null;
  }
}
