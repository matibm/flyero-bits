import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorStore } from '../useEditorStore';
import { initialDeceasedData, defaultTemplate } from '../../data/mockData';
import { CANVAS_PRESETS } from '../../types';

const getState = () => useEditorStore.getState();

beforeEach(() => {
  // Reset to a clean baseline before each test
  getState().resetToDefaults();
  useEditorStore.setState({ canvasSize: CANVAS_PRESETS[0], needsCanvasSetup: false });
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
    expect(getState().selectedNodeIds).toEqual([]);
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

  it('should start with no images', () => {
    expect(getState().images).toEqual([]);
  });

  it('should have a non-empty layerOrder', () => {
    expect(getState().layerOrder.length).toBeGreaterThan(0);
    expect(getState().layerOrder).toContain('foto_difunto');
  });
});

// ============================================================================
// setDeceasedData
// ============================================================================
describe('useEditorStore – setDeceasedData', () => {
  it('should merge partial data into deceasedData', () => {
    getState().setDeceasedData({ nombres: 'MARIA' });
    expect(getState().deceasedData.nombres).toBe('MARIA');
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
});

// ============================================================================
// Selection
// ============================================================================
describe('useEditorStore – selection', () => {
  it('should set a single selected node id', () => {
    getState().setSelectedNodeId('foto_difunto');
    expect(getState().selectedNodeIds).toEqual(['foto_difunto']);
  });

  it('should clear the selection when null is passed', () => {
    getState().setSelectedNodeId('nombres');
    expect(getState().selectedNodeIds).toEqual(['nombres']);
    getState().setSelectedNodeId(null);
    expect(getState().selectedNodeIds).toEqual([]);
  });

  it('should toggle a selected id in/out of the selection', () => {
    getState().toggleSelectedNodeId('nombres');
    expect(getState().selectedNodeIds).toContain('nombres');
    getState().toggleSelectedNodeId('apellidos');
    expect(getState().selectedNodeIds).toEqual(['nombres', 'apellidos']);
    getState().toggleSelectedNodeId('nombres');
    expect(getState().selectedNodeIds).toEqual(['apellidos']);
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
});

// ============================================================================
// setBgOverlay
// ============================================================================
describe('useEditorStore – setBgOverlay', () => {
  it('should update overlay color', () => {
    getState().setBgOverlay({ color: '#FFFFFF' });
    expect(getState().bgOverlay.color).toBe('#FFFFFF');
    expect(getState().bgOverlay.opacity).toBe(0);
  });

  it('should update overlay opacity', () => {
    getState().setBgOverlay({ opacity: 0.5 });
    expect(getState().bgOverlay.opacity).toBe(0.5);
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
    expect(t.scaleX).toBe(1);
  });

  it('should create a new transform entry for an unknown id with defaults', () => {
    getState().updateNodeTransform('some_new_node', { x: 50 });
    const t = getState().nodeTransforms['some_new_node'];
    expect(t).toBeDefined();
    expect(t.x).toBe(50);
    expect(t.y).toBe(0);
    expect(t.scaleX).toBe(1);
  });
});

// ============================================================================
// addImage / removeImage
// ============================================================================
describe('useEditorStore – images', () => {
  it('should add an image and register it in transforms, meta and layerOrder', () => {
    const id = getState().addImage({
      url: 'data:image/png;base64,xxx',
      name: 'logo.png',
      kind: 'logo',
      width: 200,
      height: 100,
    });
    expect(getState().images.find((i) => i.id === id)).toBeDefined();
    expect(getState().nodeTransforms[id]).toBeDefined();
    expect(getState().nodeMeta[id]).toBeDefined();
    expect(getState().layerOrder).toContain(id);
    // Newly added image should be auto-selected
    expect(getState().selectedNodeIds).toEqual([id]);
  });

  it('should remove an image and clean up associated state', () => {
    const id = getState().addImage({
      url: 'x',
      name: 'logo.png',
      kind: 'logo',
      width: 100,
      height: 100,
    });
    getState().removeImage(id);
    expect(getState().images.find((i) => i.id === id)).toBeUndefined();
    expect(getState().nodeTransforms[id]).toBeUndefined();
    expect(getState().nodeMeta[id]).toBeUndefined();
    expect(getState().layerOrder).not.toContain(id);
  });
});

// ============================================================================
// Layer order
// ============================================================================
describe('useEditorStore – layer order', () => {
  it('should bring a layer forward', () => {
    const id = getState().addImage({ url: 'x', name: 'a', kind: 'image', width: 50, height: 50 });
    const initialIndex = getState().layerOrder.indexOf(id);
    // Add another so there's something to move past
    const id2 = getState().addImage({ url: 'y', name: 'b', kind: 'image', width: 50, height: 50 });
    expect(getState().layerOrder.indexOf(id2)).toBeGreaterThan(initialIndex);
    getState().bringToFront(id);
    expect(getState().layerOrder.indexOf(id)).toBe(getState().layerOrder.length - 1);
  });

  it('should send a layer to back', () => {
    const id = getState().addImage({ url: 'x', name: 'a', kind: 'image', width: 50, height: 50 });
    getState().sendToBack(id);
    expect(getState().layerOrder.indexOf(id)).toBe(0);
  });
});

// ============================================================================
// setActiveTemplate
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

  it('should clear the selection when template changes', () => {
    getState().setSelectedNodeId('nombres');
    getState().setActiveTemplate(defaultTemplate);
    expect(getState().selectedNodeIds).toEqual([]);
  });

  it('should preserve user-added images when changing templates', () => {
    const id = getState().addImage({
      url: 'x',
      name: 'logo',
      kind: 'logo',
      width: 100,
      height: 100,
    });
    getState().setActiveTemplate(defaultTemplate);
    expect(getState().images.find((i) => i.id === id)).toBeDefined();
    expect(getState().layerOrder).toContain(id);
  });
});

// ============================================================================
// canvas size
// ============================================================================
describe('useEditorStore – canvas size', () => {
  it('should update canvas size', () => {
    const square = CANVAS_PRESETS.find((p) => p.presetId === 'square_1_1');
    expect(square).toBeDefined();
    if (square) getState().setCanvasSize(square);
    expect(getState().canvasSize.presetId).toBe('square_1_1');
  });
});
