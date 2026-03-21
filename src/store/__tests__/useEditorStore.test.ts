import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorStore } from '../useEditorStore';
import { initialDeceasedData, defaultTemplate } from '../../data/mockData';

// Helper: get a fresh snapshot of the store state
const getState = () => useEditorStore.getState();

// Helper: reset the store to its initial state before each test
beforeEach(() => {
  useEditorStore.setState({
    deceasedData: initialDeceasedData,
    activeTemplate: defaultTemplate,
    selectedNodeId: null,
    nodeTransforms: {
      foto_difunto: {
        x: defaultTemplate.mapeo_dinamico.foto_difunto.x,
        y: defaultTemplate.mapeo_dinamico.foto_difunto.y,
        width: defaultTemplate.mapeo_dinamico.foto_difunto.width,
        height: defaultTemplate.mapeo_dinamico.foto_difunto.height,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      },
    },
    textOverrides: {},
    bgOverlay: { color: '#000000', opacity: 0 },
    customBackgroundUrl: null,
  });
});

// ============================================================================
// INITIAL STATE
// ============================================================================
describe('useEditorStore – initial state', () => {
  it('should have the initial deceased data from mockData', () => {
    expect(getState().deceasedData).toEqual(initialDeceasedData);
  });

  it('should have the default template as activeTemplate', () => {
    expect(getState().activeTemplate).toEqual(defaultTemplate);
  });

  it('should have no selected node', () => {
    expect(getState().selectedNodeId).toBeNull();
  });

  it('should have initial nodeTransforms for foto_difunto', () => {
    const ft = getState().nodeTransforms['foto_difunto'];
    expect(ft).toBeDefined();
    expect(ft.x).toBe(defaultTemplate.mapeo_dinamico.foto_difunto.x);
    expect(ft.y).toBe(defaultTemplate.mapeo_dinamico.foto_difunto.y);
    expect(ft.width).toBe(defaultTemplate.mapeo_dinamico.foto_difunto.width);
    expect(ft.height).toBe(defaultTemplate.mapeo_dinamico.foto_difunto.height);
    expect(ft.scaleX).toBe(1);
    expect(ft.scaleY).toBe(1);
    expect(ft.rotation).toBe(0);
  });

  it('should have empty textOverrides', () => {
    expect(getState().textOverrides).toEqual({});
  });

  it('should have default bgOverlay with black color and zero opacity', () => {
    expect(getState().bgOverlay).toEqual({ color: '#000000', opacity: 0 });
  });

  it('should have null customBackgroundUrl', () => {
    expect(getState().customBackgroundUrl).toBeNull();
  });
});

// ============================================================================
// setDeceasedData
// ============================================================================
describe('useEditorStore – setDeceasedData', () => {
  it('should merge partial data into deceasedData', () => {
    getState().setDeceasedData({ nombres: 'MARIA' });
    expect(getState().deceasedData.nombres).toBe('MARIA');
    // Other fields remain unchanged
    expect(getState().deceasedData.apellidos).toBe(initialDeceasedData.apellidos);
  });

  it('should update multiple fields at once', () => {
    getState().setDeceasedData({
      nombres: 'ANA',
      apellidos: 'GARCIA RUIZ',
      frase_dedicatoria: 'Siempre te recordaremos.',
    });
    const d = getState().deceasedData;
    expect(d.nombres).toBe('ANA');
    expect(d.apellidos).toBe('GARCIA RUIZ');
    expect(d.frase_dedicatoria).toBe('Siempre te recordaremos.');
  });

  it('should update nested velatorio data', () => {
    getState().setDeceasedData({
      velatorio: { lugar: 'Capilla Norte', direccion: 'Calle Falsa 456' },
    });
    expect(getState().deceasedData.velatorio.lugar).toBe('Capilla Norte');
    expect(getState().deceasedData.velatorio.direccion).toBe('Calle Falsa 456');
  });

  it('should update nested sepelio data', () => {
    getState().setDeceasedData({
      sepelio: { fecha: '5 de Abril', hora: '3:00 PM', lugar: 'Cementerio Sur' },
    });
    const s = getState().deceasedData.sepelio;
    expect(s.fecha).toBe('5 de Abril');
    expect(s.hora).toBe('3:00 PM');
    expect(s.lugar).toBe('Cementerio Sur');
  });
});

// ============================================================================
// setSelectedNodeId (selectNode)
// ============================================================================
describe('useEditorStore – setSelectedNodeId', () => {
  it('should set selectedNodeId to a given id', () => {
    getState().setSelectedNodeId('foto_difunto');
    expect(getState().selectedNodeId).toBe('foto_difunto');
  });

  it('should clear selectedNodeId when set to null', () => {
    getState().setSelectedNodeId('nombres');
    expect(getState().selectedNodeId).toBe('nombres');

    getState().setSelectedNodeId(null);
    expect(getState().selectedNodeId).toBeNull();
  });
});

// ============================================================================
// updateTextOverride
// ============================================================================
describe('useEditorStore – updateTextOverride', () => {
  it('should create a new text override for a given id', () => {
    getState().updateTextOverride('nombres', { fill: '#FF0000', fontSize: 30 });
    const override = getState().textOverrides['nombres'];
    expect(override).toBeDefined();
    expect(override.fill).toBe('#FF0000');
    expect(override.fontSize).toBe(30);
  });

  it('should merge into an existing text override', () => {
    getState().updateTextOverride('nombres', { fill: '#FF0000' });
    getState().updateTextOverride('nombres', { fontSize: 24 });
    const override = getState().textOverrides['nombres'];
    expect(override.fill).toBe('#FF0000');
    expect(override.fontSize).toBe(24);
  });

  it('should not affect other text overrides', () => {
    getState().updateTextOverride('nombres', { fill: '#FF0000' });
    getState().updateTextOverride('apellidos', { fill: '#00FF00' });
    expect(getState().textOverrides['nombres'].fill).toBe('#FF0000');
    expect(getState().textOverrides['apellidos'].fill).toBe('#00FF00');
  });

  it('should support isBold and isItalic flags', () => {
    getState().updateTextOverride('frase_dedicatoria', { isBold: true, isItalic: true });
    const override = getState().textOverrides['frase_dedicatoria'];
    expect(override.isBold).toBe(true);
    expect(override.isItalic).toBe(true);
  });

  it('should support changing align', () => {
    getState().updateTextOverride('nombres', { align: 'left' });
    expect(getState().textOverrides['nombres'].align).toBe('left');

    getState().updateTextOverride('nombres', { align: 'right' });
    expect(getState().textOverrides['nombres'].align).toBe('right');
  });
});

// ============================================================================
// setBgOverlay
// ============================================================================
describe('useEditorStore – setBgOverlay', () => {
  it('should update overlay color', () => {
    getState().setBgOverlay({ color: '#FFFFFF' });
    expect(getState().bgOverlay.color).toBe('#FFFFFF');
    // Opacity should remain untouched
    expect(getState().bgOverlay.opacity).toBe(0);
  });

  it('should update overlay opacity', () => {
    getState().setBgOverlay({ opacity: 0.5 });
    expect(getState().bgOverlay.opacity).toBe(0.5);
    expect(getState().bgOverlay.color).toBe('#000000');
  });

  it('should update both color and opacity together', () => {
    getState().setBgOverlay({ color: '#112233', opacity: 0.8 });
    expect(getState().bgOverlay).toEqual({ color: '#112233', opacity: 0.8 });
  });
});

// ============================================================================
// setCustomBackground
// ============================================================================
describe('useEditorStore – setCustomBackground', () => {
  it('should set a custom background URL', () => {
    getState().setCustomBackground('https://example.com/bg.jpg');
    expect(getState().customBackgroundUrl).toBe('https://example.com/bg.jpg');
  });

  it('should clear the custom background URL when set to null', () => {
    getState().setCustomBackground('https://example.com/bg.jpg');
    getState().setCustomBackground(null);
    expect(getState().customBackgroundUrl).toBeNull();
  });
});

// ============================================================================
// updateNodeTransform
// ============================================================================
describe('useEditorStore – updateNodeTransform', () => {
  it('should update an existing node transform partially', () => {
    getState().updateNodeTransform('foto_difunto', { x: 100, y: 200 });
    const t = getState().nodeTransforms['foto_difunto'];
    expect(t.x).toBe(100);
    expect(t.y).toBe(200);
    // Other props remain
    expect(t.scaleX).toBe(1);
    expect(t.scaleY).toBe(1);
    expect(t.rotation).toBe(0);
  });

  it('should create a new transform entry for an unknown id with defaults', () => {
    getState().updateNodeTransform('some_new_node', { x: 50 });
    const t = getState().nodeTransforms['some_new_node'];
    expect(t).toBeDefined();
    expect(t.x).toBe(50);
    expect(t.y).toBe(0); // default
    expect(t.scaleX).toBe(1); // default
  });

  it('should update rotation', () => {
    getState().updateNodeTransform('foto_difunto', { rotation: 45 });
    expect(getState().nodeTransforms['foto_difunto'].rotation).toBe(45);
  });
});

// ============================================================================
// setActiveTemplate (resets related state)
// ============================================================================
describe('useEditorStore – setActiveTemplate', () => {
  it('should set the active template', () => {
    const customTemplate = {
      ...defaultTemplate,
      id: 'tpl_custom',
      fondo_url: 'https://example.com/custom.jpg',
    };
    getState().setActiveTemplate(customTemplate);
    expect(getState().activeTemplate.id).toBe('tpl_custom');
  });

  it('should reset textOverrides when template changes', () => {
    getState().updateTextOverride('nombres', { fill: '#FF0000' });
    expect(Object.keys(getState().textOverrides).length).toBeGreaterThan(0);

    getState().setActiveTemplate(defaultTemplate);
    expect(getState().textOverrides).toEqual({});
  });

  it('should reset selectedNodeId when template changes', () => {
    getState().setSelectedNodeId('nombres');
    getState().setActiveTemplate(defaultTemplate);
    expect(getState().selectedNodeId).toBeNull();
  });

  it('should reset customBackgroundUrl when template changes', () => {
    getState().setCustomBackground('https://example.com/bg.jpg');
    getState().setActiveTemplate(defaultTemplate);
    expect(getState().customBackgroundUrl).toBeNull();
  });

  it('should reset nodeTransforms to match new template foto_difunto config', () => {
    getState().updateNodeTransform('foto_difunto', { x: 999, y: 888 });

    const customTemplate = {
      ...defaultTemplate,
      id: 'tpl_other',
      mapeo_dinamico: {
        ...defaultTemplate.mapeo_dinamico,
        foto_difunto: { x: 10, y: 20, width: 100, height: 150, draggable: true },
      },
    };
    getState().setActiveTemplate(customTemplate);

    const ft = getState().nodeTransforms['foto_difunto'];
    expect(ft.x).toBe(10);
    expect(ft.y).toBe(20);
    expect(ft.width).toBe(100);
    expect(ft.height).toBe(150);
    expect(ft.scaleX).toBe(1);
    expect(ft.scaleY).toBe(1);
    expect(ft.rotation).toBe(0);
  });
});
