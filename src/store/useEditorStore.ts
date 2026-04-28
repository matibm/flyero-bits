import { create } from 'zustand';
import { temporal } from 'zundo';
import { persist } from 'zustand/middleware';
import type {
  DeceasedData,
  TemplateLayout,
  TransformState,
  TextOverride,
  BgOverlayState,
  CanvasSize,
  ImageNode,
  NodeMeta,
  CustomFont,
} from '../types';
import { CANVAS_PRESETS } from '../types';
import { initialDeceasedData, defaultTemplate } from '../data/mockData';

// ============================================================================
// EDITOR STORE
// ============================================================================

const DEFAULT_CANVAS: CanvasSize = CANVAS_PRESETS[0]; // 800x1200

/**
 * Built-in text node IDs derived from template.mapeo_dinamico.
 * These are produced by `DynamicTexts` and live in the canvas at every render.
 */
const DYNAMIC_TEXT_IDS = [
  'nombres',
  'apellidos',
  'fechas',
  'velatorio_lugar',
  'velatorio_direccion',
  'sepelio_fecha_hora',
  'sepelio_lugar',
  'frase_dedicatoria',
];

/** Builds the initial layer order: photo at bottom, dynamic texts on top. */
function buildInitialLayerOrder(template: TemplateLayout): string[] {
  const fixedTexts = template.elementos_fijos
    .map((el, i) => (el.tipo === 'texto' ? `fix_txt_${i}` : null))
    .filter((id): id is string => Boolean(id));
  return ['foto_difunto', ...fixedTexts, ...DYNAMIC_TEXT_IDS];
}

interface EditorStore {
  // ── Canvas ─────────────────────────────────────────────
  canvasSize: CanvasSize;
  /** True until user has chosen an aspect ratio at startup. */
  needsCanvasSetup: boolean;

  // ── Data + template ────────────────────────────────────
  deceasedData: DeceasedData;
  activeTemplate: TemplateLayout;

  // ── Selection (transient) ──────────────────────────────
  selectedNodeIds: string[];

  // ── Per-node state ─────────────────────────────────────
  nodeTransforms: Record<string, TransformState>;
  textOverrides: Record<string, TextOverride>;
  /** Visibility / lock / friendly name keyed by node id. */
  nodeMeta: Record<string, NodeMeta>;
  /** Z-order of all draggable nodes (bottom → top). */
  layerOrder: string[];

  // ── Images ─────────────────────────────────────────────
  images: ImageNode[];

  // ── Background ─────────────────────────────────────────
  bgOverlay: BgOverlayState;
  customBackgroundUrl: string | null;

  // ── Tools / preferences ────────────────────────────────
  snapEnabled: boolean;
  gridEnabled: boolean;
  /** Custom Google Fonts loaded by the user. */
  customFonts: CustomFont[];

  // ── Actions ────────────────────────────────────────────
  setCanvasSize: (size: CanvasSize) => void;
  completeCanvasSetup: () => void;
  setDeceasedData: (data: Partial<DeceasedData>) => void;
  setActiveTemplate: (template: TemplateLayout) => void;

  setSelectedNodeIds: (ids: string[]) => void;
  setSelectedNodeId: (id: string | null) => void;
  toggleSelectedNodeId: (id: string) => void;

  updateNodeTransform: (id: string, transform: Partial<TransformState>) => void;
  updateTextOverride: (id: string, override: Partial<TextOverride>) => void;
  updateNodeMeta: (id: string, meta: Partial<NodeMeta>) => void;

  reorderLayer: (id: string, toIndex: number) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;

  addImage: (node: Omit<ImageNode, 'id'>) => string;
  removeImage: (id: string) => void;

  setBgOverlay: (overlay: Partial<BgOverlayState>) => void;
  setCustomBackground: (url: string | null) => void;

  setSnapEnabled: (enabled: boolean) => void;
  setGridEnabled: (enabled: boolean) => void;

  addCustomFont: (font: CustomFont) => void;
  removeCustomFont: (family: string) => void;

  resetToDefaults: () => void;
  startNewFlyer: () => void;
}

type TrackedEditorState = Pick<
  EditorStore,
  | 'canvasSize'
  | 'deceasedData'
  | 'activeTemplate'
  | 'nodeTransforms'
  | 'textOverrides'
  | 'nodeMeta'
  | 'layerOrder'
  | 'images'
  | 'bgOverlay'
  | 'customBackgroundUrl'
>;

type PersistedEditorState = TrackedEditorState & {
  needsCanvasSetup: boolean;
  customFonts: CustomFont[];
};

/** Returns the base canvas size the template was designed for. */
function templateBase(template: TemplateLayout): { w: number; h: number } {
  return { w: template.base_width ?? 800, h: template.base_height ?? 1200 };
}

function buildInitialNodeTransforms(
  template: TemplateLayout,
  canvas: CanvasSize,
): Record<string, TransformState> {
  const { w: bw, h: bh } = templateBase(template);
  const sx = canvas.width / bw;
  const sy = canvas.height / bh;
  const cfg = template.mapeo_dinamico.foto_difunto;
  return {
    foto_difunto: {
      x: cfg.x * sx,
      y: cfg.y * sy,
      width: cfg.width * sx,
      height: cfg.height * sy,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    },
  };
}

function buildInitialNodeMeta(template: TemplateLayout): Record<string, NodeMeta> {
  const meta: Record<string, NodeMeta> = {
    foto_difunto: { visible: true, locked: false, name: 'Foto del difunto' },
  };
  template.elementos_fijos.forEach((el, i) => {
    if (el.tipo === 'texto') {
      const id = `fix_txt_${i}`;
      const preview = (el.contenido ?? '').slice(0, 24);
      meta[id] = { visible: true, locked: false, name: preview || `Texto fijo ${i + 1}` };
    }
  });
  const friendlyText: Record<string, string> = {
    nombres: 'Nombres',
    apellidos: 'Apellidos',
    fechas: 'Fechas',
    velatorio_lugar: 'Velatorio · lugar',
    velatorio_direccion: 'Velatorio · dirección',
    sepelio_fecha_hora: 'Sepelio · fecha y hora',
    sepelio_lugar: 'Sepelio · lugar',
    frase_dedicatoria: 'Frase dedicatoria',
  };
  DYNAMIC_TEXT_IDS.forEach((id) => {
    meta[id] = { visible: true, locked: false, name: friendlyText[id] ?? id };
  });
  return meta;
}

let nodeIdCounter = 0;
function generateId(prefix: string): string {
  nodeIdCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${nodeIdCounter}`;
}

export const useEditorStore = create<EditorStore>()(
  temporal(
    persist(
      (set, get) => ({
        canvasSize: DEFAULT_CANVAS,
        needsCanvasSetup: true,

        deceasedData: initialDeceasedData,
        activeTemplate: defaultTemplate,

        selectedNodeIds: [],

        nodeTransforms: buildInitialNodeTransforms(defaultTemplate, DEFAULT_CANVAS),
        textOverrides: {},
        nodeMeta: buildInitialNodeMeta(defaultTemplate),
        layerOrder: buildInitialLayerOrder(defaultTemplate),

        images: [],

        bgOverlay: { color: '#000000', opacity: 0 },
        customBackgroundUrl: null,

        snapEnabled: true,
        gridEnabled: false,
        customFonts: [],

        // ── Canvas ───────────────────────────────────────
        setCanvasSize: (size) =>
          set((s) => {
            const oldW = s.canvasSize.width;
            const oldH = s.canvasSize.height;
            if (oldW === size.width && oldH === size.height) {
              return { canvasSize: size };
            }
            const sx = size.width / oldW;
            const sy = size.height / oldH;
            const minScale = Math.min(sx, sy);
            const scaledTransforms: Record<string, TransformState> = {};
            for (const [id, t] of Object.entries(s.nodeTransforms)) {
              scaledTransforms[id] = {
                ...t,
                x: t.x * sx,
                y: t.y * sy,
                width: t.width !== undefined ? t.width * sx : undefined,
                height: t.height !== undefined ? t.height * sy : undefined,
              };
            }
            const scaledOverrides: Record<string, TextOverride> = {};
            for (const [id, ov] of Object.entries(s.textOverrides)) {
              scaledOverrides[id] = {
                ...ov,
                fontSize:
                  ov.fontSize !== undefined
                    ? Math.max(8, Math.round(ov.fontSize * minScale))
                    : ov.fontSize,
              };
            }
            return {
              canvasSize: size,
              nodeTransforms: scaledTransforms,
              textOverrides: scaledOverrides,
            };
          }),
        completeCanvasSetup: () => set({ needsCanvasSetup: false }),

        // ── Data ─────────────────────────────────────────
        setDeceasedData: (data) => set((s) => ({ deceasedData: { ...s.deceasedData, ...data } })),

        setActiveTemplate: (template) =>
          set((s) => ({
            activeTemplate: template,
            nodeTransforms: buildInitialNodeTransforms(template, s.canvasSize),
            textOverrides: {},
            nodeMeta: {
              ...buildInitialNodeMeta(template),
              // Preserve meta of user-added images
              ...Object.fromEntries(
                Object.entries(get().nodeMeta).filter(([id]) => id.startsWith('img_')),
              ),
            },
            layerOrder: [
              ...buildInitialLayerOrder(template),
              ...get().layerOrder.filter((id) => id.startsWith('img_')),
            ],
            selectedNodeIds: [],
            customBackgroundUrl: null,
          })),

        // ── Selection ────────────────────────────────────
        setSelectedNodeIds: (ids) => set({ selectedNodeIds: ids }),
        setSelectedNodeId: (id) => set({ selectedNodeIds: id ? [id] : [] }),
        toggleSelectedNodeId: (id) =>
          set((s) => ({
            selectedNodeIds: s.selectedNodeIds.includes(id)
              ? s.selectedNodeIds.filter((x) => x !== id)
              : [...s.selectedNodeIds, id],
          })),

        // ── Transforms ───────────────────────────────────
        updateNodeTransform: (id, transform) =>
          set((s) => {
            const existing = s.nodeTransforms[id] || {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
            };
            return {
              nodeTransforms: { ...s.nodeTransforms, [id]: { ...existing, ...transform } },
            };
          }),

        updateTextOverride: (id, override) =>
          set((s) => ({
            textOverrides: {
              ...s.textOverrides,
              [id]: { ...(s.textOverrides[id] || {}), ...override },
            },
          })),

        updateNodeMeta: (id, meta) =>
          set((s) => ({
            nodeMeta: {
              ...s.nodeMeta,
              [id]: { ...(s.nodeMeta[id] || { visible: true, locked: false, name: id }), ...meta },
            },
          })),

        // ── Layer order ──────────────────────────────────
        reorderLayer: (id, toIndex) =>
          set((s) => {
            const order = s.layerOrder.filter((x) => x !== id);
            const clamped = Math.max(0, Math.min(toIndex, order.length));
            order.splice(clamped, 0, id);
            return { layerOrder: order };
          }),

        bringForward: (id) =>
          set((s) => {
            const i = s.layerOrder.indexOf(id);
            if (i < 0 || i === s.layerOrder.length - 1) return {};
            const order = [...s.layerOrder];
            [order[i], order[i + 1]] = [order[i + 1], order[i]];
            return { layerOrder: order };
          }),

        sendBackward: (id) =>
          set((s) => {
            const i = s.layerOrder.indexOf(id);
            if (i <= 0) return {};
            const order = [...s.layerOrder];
            [order[i - 1], order[i]] = [order[i], order[i - 1]];
            return { layerOrder: order };
          }),

        bringToFront: (id) =>
          set((s) => {
            const order = s.layerOrder.filter((x) => x !== id);
            order.push(id);
            return { layerOrder: order };
          }),

        sendToBack: (id) =>
          set((s) => {
            const order = s.layerOrder.filter((x) => x !== id);
            order.unshift(id);
            return { layerOrder: order };
          }),

        // ── Images ───────────────────────────────────────
        addImage: (node) => {
          const id = generateId('img');
          set((s) => {
            const cs = s.canvasSize;
            const initialW = node.width;
            const initialH = node.height;
            return {
              images: [...s.images, { ...node, id }],
              nodeTransforms: {
                ...s.nodeTransforms,
                [id]: {
                  x: Math.max(0, (cs.width - initialW) / 2),
                  y: Math.max(0, (cs.height - initialH) / 2),
                  width: initialW,
                  height: initialH,
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 0,
                },
              },
              nodeMeta: {
                ...s.nodeMeta,
                [id]: { visible: true, locked: false, name: node.name },
              },
              layerOrder: [...s.layerOrder, id],
              selectedNodeIds: [id],
            };
          });
          return id;
        },

        removeImage: (id) =>
          set((s) => {
            const { [id]: _t, ...nodeTransforms } = s.nodeTransforms;
            const { [id]: _m, ...nodeMeta } = s.nodeMeta;
            void _t;
            void _m;
            return {
              images: s.images.filter((i) => i.id !== id),
              nodeTransforms,
              nodeMeta,
              layerOrder: s.layerOrder.filter((x) => x !== id),
              selectedNodeIds: s.selectedNodeIds.filter((x) => x !== id),
            };
          }),

        // ── Background ───────────────────────────────────
        setBgOverlay: (overlay) => set((s) => ({ bgOverlay: { ...s.bgOverlay, ...overlay } })),
        setCustomBackground: (url) => set({ customBackgroundUrl: url }),

        // ── Tools ────────────────────────────────────────
        setSnapEnabled: (enabled) => set({ snapEnabled: enabled }),
        setGridEnabled: (enabled) => set({ gridEnabled: enabled }),

        // ── Custom fonts ─────────────────────────────────
        addCustomFont: (font) =>
          set((s) => ({
            customFonts: s.customFonts.some((f) => f.family === font.family)
              ? s.customFonts
              : [...s.customFonts, font],
          })),
        removeCustomFont: (family) =>
          set((s) => ({ customFonts: s.customFonts.filter((f) => f.family !== family) })),

        // ── Reset ────────────────────────────────────────
        resetToDefaults: () =>
          set((s) => ({
            deceasedData: initialDeceasedData,
            activeTemplate: defaultTemplate,
            selectedNodeIds: [],
            nodeTransforms: buildInitialNodeTransforms(defaultTemplate, s.canvasSize),
            textOverrides: {},
            nodeMeta: buildInitialNodeMeta(defaultTemplate),
            layerOrder: buildInitialLayerOrder(defaultTemplate),
            images: [],
            bgOverlay: { color: '#000000', opacity: 0 },
            customBackgroundUrl: null,
          })),

        startNewFlyer: () =>
          set({
            deceasedData: initialDeceasedData,
            activeTemplate: defaultTemplate,
            selectedNodeIds: [],
            canvasSize: DEFAULT_CANVAS,
            nodeTransforms: buildInitialNodeTransforms(defaultTemplate, DEFAULT_CANVAS),
            textOverrides: {},
            nodeMeta: buildInitialNodeMeta(defaultTemplate),
            layerOrder: buildInitialLayerOrder(defaultTemplate),
            images: [],
            bgOverlay: { color: '#000000', opacity: 0 },
            customBackgroundUrl: null,
            needsCanvasSetup: true,
          }),
      }),
      {
        name: 'flyer-gen-editor',
        version: 2,
        partialize: (state): PersistedEditorState => ({
          canvasSize: state.canvasSize,
          needsCanvasSetup: state.needsCanvasSetup,
          deceasedData: state.deceasedData,
          activeTemplate: state.activeTemplate,
          nodeTransforms: state.nodeTransforms,
          textOverrides: state.textOverrides,
          nodeMeta: state.nodeMeta,
          layerOrder: state.layerOrder,
          images: state.images,
          bgOverlay: state.bgOverlay,
          customBackgroundUrl: state.customBackgroundUrl,
          customFonts: state.customFonts,
        }),
        migrate: (persistedState, fromVersion) => {
          // Old (v1) state → wire up new fields with sane defaults.
          const s = persistedState as Partial<PersistedEditorState> & Record<string, unknown>;
          if (fromVersion < 2) {
            const tpl = (s.activeTemplate as TemplateLayout) ?? defaultTemplate;
            return {
              ...s,
              canvasSize: DEFAULT_CANVAS,
              needsCanvasSetup: false, // skip modal on existing users
              nodeMeta: s.nodeMeta ?? buildInitialNodeMeta(tpl),
              layerOrder: s.layerOrder ?? buildInitialLayerOrder(tpl),
              images: s.images ?? [],
              customFonts: s.customFonts ?? [],
            } as PersistedEditorState;
          }
          return s as PersistedEditorState;
        },
      },
    ),
    {
      partialize: (state): TrackedEditorState => ({
        canvasSize: state.canvasSize,
        deceasedData: state.deceasedData,
        activeTemplate: state.activeTemplate,
        nodeTransforms: state.nodeTransforms,
        textOverrides: state.textOverrides,
        nodeMeta: state.nodeMeta,
        layerOrder: state.layerOrder,
        images: state.images,
        bgOverlay: state.bgOverlay,
        customBackgroundUrl: state.customBackgroundUrl,
      }),
      limit: 100,
      equality: (pastState, currentState) =>
        JSON.stringify(pastState) === JSON.stringify(currentState),
    },
  ),
);

// Convenience selector exports
export const selectSelectedNodeId = (s: EditorStore): string | null => s.selectedNodeIds[0] ?? null;
