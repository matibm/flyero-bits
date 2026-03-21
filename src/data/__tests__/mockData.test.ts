import { describe, it, expect } from 'vitest';
import { initialDeceasedData, defaultTemplate } from '../mockData';

// ============================================================================
// initialDeceasedData
// ============================================================================
describe('initialDeceasedData', () => {
  it('should have a non-empty id', () => {
    expect(initialDeceasedData.id).toBeTruthy();
  });

  it('should have nombres and apellidos as non-empty strings', () => {
    expect(typeof initialDeceasedData.nombres).toBe('string');
    expect(initialDeceasedData.nombres.length).toBeGreaterThan(0);
    expect(typeof initialDeceasedData.apellidos).toBe('string');
    expect(initialDeceasedData.apellidos.length).toBeGreaterThan(0);
  });

  it('should have fecha_nacimiento and fecha_fallecimiento', () => {
    expect(initialDeceasedData.fecha_nacimiento).toBeTruthy();
    expect(initialDeceasedData.fecha_fallecimiento).toBeTruthy();
  });

  it('should have a foto_url string', () => {
    expect(typeof initialDeceasedData.foto_url).toBe('string');
    expect(initialDeceasedData.foto_url.length).toBeGreaterThan(0);
  });

  it('should have velatorio with lugar and direccion', () => {
    expect(initialDeceasedData.velatorio).toBeDefined();
    expect(typeof initialDeceasedData.velatorio.lugar).toBe('string');
    expect(initialDeceasedData.velatorio.lugar.length).toBeGreaterThan(0);
    expect(typeof initialDeceasedData.velatorio.direccion).toBe('string');
    expect(initialDeceasedData.velatorio.direccion.length).toBeGreaterThan(0);
  });

  it('should have sepelio with fecha, hora, and lugar', () => {
    expect(initialDeceasedData.sepelio).toBeDefined();
    expect(initialDeceasedData.sepelio.fecha).toBeTruthy();
    expect(initialDeceasedData.sepelio.hora).toBeTruthy();
    expect(initialDeceasedData.sepelio.lugar).toBeTruthy();
  });

  it('should have a non-empty frase_dedicatoria', () => {
    expect(typeof initialDeceasedData.frase_dedicatoria).toBe('string');
    expect(initialDeceasedData.frase_dedicatoria.length).toBeGreaterThan(0);
  });
});

// ============================================================================
// defaultTemplate
// ============================================================================
describe('defaultTemplate', () => {
  it('should have a non-empty id', () => {
    expect(defaultTemplate.id).toBeTruthy();
  });

  it('should have a fondo_url string', () => {
    expect(typeof defaultTemplate.fondo_url).toBe('string');
    expect(defaultTemplate.fondo_url.length).toBeGreaterThan(0);
  });

  it('should have elementos_fijos as a non-empty array', () => {
    expect(Array.isArray(defaultTemplate.elementos_fijos)).toBe(true);
    expect(defaultTemplate.elementos_fijos.length).toBeGreaterThan(0);
  });

  it('should have each fixed element with a tipo field', () => {
    for (const el of defaultTemplate.elementos_fijos) {
      expect(['imagen', 'texto']).toContain(el.tipo);
    }
  });

  it('should have mapeo_dinamico with all required text config keys', () => {
    const requiredTextKeys = [
      'nombres',
      'apellidos',
      'fechas',
      'velatorio_lugar',
      'velatorio_direccion',
      'sepelio_fecha_hora',
      'sepelio_lugar',
      'frase_dedicatoria',
    ] as const;

    for (const key of requiredTextKeys) {
      const cfg = defaultTemplate.mapeo_dinamico[key];
      expect(cfg).toBeDefined();
      expect(typeof cfg.x).toBe('number');
      expect(typeof cfg.y).toBe('number');
      expect(typeof cfg.fontSize).toBe('number');
      expect(typeof cfg.fontFamily).toBe('string');
      expect(typeof cfg.fill).toBe('string');
      expect(['left', 'center', 'right']).toContain(cfg.align);
    }
  });

  it('should have mapeo_dinamico.foto_difunto with position and dimensions', () => {
    const foto = defaultTemplate.mapeo_dinamico.foto_difunto;
    expect(foto).toBeDefined();
    expect(typeof foto.x).toBe('number');
    expect(typeof foto.y).toBe('number');
    expect(typeof foto.width).toBe('number');
    expect(typeof foto.height).toBe('number');
    expect(foto.width).toBeGreaterThan(0);
    expect(foto.height).toBeGreaterThan(0);
  });

  it('should have foto_difunto marked as draggable', () => {
    expect(defaultTemplate.mapeo_dinamico.foto_difunto.draggable).toBe(true);
  });
});
