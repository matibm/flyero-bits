import { create } from 'zustand';
import { temporal } from 'zundo';
import { persist } from 'zustand/middleware';
import type {
  DeceasedData,
  TemplateLayout,
  TransformState,
  TextOverride,
  BgOverlayState,
} from '../types';
import { initialDeceasedData, defaultTemplate } from '../data/mockData';

// ============================================================================
// EDITOR STORE
// ============================================================================

interface EditorStore {
  // State
  deceasedData: DeceasedData;
  activeTemplate: TemplateLayout;
  selectedNodeId: string | null;

  // Transforms for ANY node (photo or texts) keyed by ID
  nodeTransforms: Record<string, TransformState>;
  // Overrides for text properties keyed by ID
  textOverrides: Record<string, TextOverride>;
  // Background overlay
  bgOverlay: BgOverlayState;
  // User-uploaded background image over template
  customBackgroundUrl: string | null;

  // Actions
  setDeceasedData: (data: Partial<DeceasedData>) => void;
  setActiveTemplate: (template: TemplateLayout) => void;
  setSelectedNodeId: (id: string | null) => void;
  updateNodeTransform: (id: string, transform: Partial<TransformState>) => void;
  updateTextOverride: (id: string, override: Partial<TextOverride>) => void;
  setBgOverlay: (overlay: Partial<BgOverlayState>) => void;
  setCustomBackground: (url: string | null) => void;
  resetToDefaults: () => void;
}

/** State tracked by undo/redo (excludes transient UI state like selectedNodeId). */
type TrackedEditorState = Omit<
  EditorStore,
  | 'selectedNodeId'
  | 'setDeceasedData'
  | 'setActiveTemplate'
  | 'setSelectedNodeId'
  | 'updateNodeTransform'
  | 'updateTextOverride'
  | 'setBgOverlay'
  | 'setCustomBackground'
  | 'resetToDefaults'
>;

/** State persisted to localStorage (data only, no actions or transient UI state). */
type PersistedEditorState = {
  deceasedData: DeceasedData;
  activeTemplate: TemplateLayout;
  nodeTransforms: Record<string, TransformState>;
  textOverrides: Record<string, TextOverride>;
  bgOverlay: BgOverlayState;
  customBackgroundUrl: string | null;
};

const initialNodeTransforms: Record<string, TransformState> = {
  foto_difunto: {
    x: defaultTemplate.mapeo_dinamico.foto_difunto.x,
    y: defaultTemplate.mapeo_dinamico.foto_difunto.y,
    width: defaultTemplate.mapeo_dinamico.foto_difunto.width,
    height: defaultTemplate.mapeo_dinamico.foto_difunto.height,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  },
};

export const useEditorStore = create<EditorStore>()(
  temporal(
    persist(
      (set) => ({
        deceasedData: initialDeceasedData,
        activeTemplate: defaultTemplate,
        selectedNodeId: null,

        nodeTransforms: initialNodeTransforms,
        textOverrides: {},
        bgOverlay: {
          color: '#000000',
          opacity: 0,
        },
        customBackgroundUrl: null,

        setDeceasedData: (data) =>
          set((state) => ({
            deceasedData: { ...state.deceasedData, ...data },
          })),

        setActiveTemplate: (template) =>
          set({
            activeTemplate: template,
            nodeTransforms: {
              foto_difunto: {
                x: template.mapeo_dinamico.foto_difunto.x,
                y: template.mapeo_dinamico.foto_difunto.y,
                width: template.mapeo_dinamico.foto_difunto.width,
                height: template.mapeo_dinamico.foto_difunto.height,
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
              },
            },
            textOverrides: {}, // Reset overrides on template change
            selectedNodeId: null,
            customBackgroundUrl: null, // Reset custom bg
          }),

        setSelectedNodeId: (id) => set({ selectedNodeId: id }),

        updateNodeTransform: (id, transform) =>
          set((state) => {
            const existing = state.nodeTransforms[id] || {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
            };
            return {
              nodeTransforms: {
                ...state.nodeTransforms,
                [id]: { ...existing, ...transform },
              },
            };
          }),

        updateTextOverride: (id, override) =>
          set((state) => ({
            textOverrides: {
              ...state.textOverrides,
              [id]: { ...(state.textOverrides[id] || {}), ...override },
            },
          })),

        setBgOverlay: (overlay) =>
          set((state) => ({
            bgOverlay: { ...state.bgOverlay, ...overlay },
          })),

        setCustomBackground: (url) => set({ customBackgroundUrl: url }),

        resetToDefaults: () =>
          set({
            deceasedData: initialDeceasedData,
            activeTemplate: defaultTemplate,
            selectedNodeId: null,
            nodeTransforms: initialNodeTransforms,
            textOverrides: {},
            bgOverlay: { color: '#000000', opacity: 0 },
            customBackgroundUrl: null,
          }),
      }),
      {
        name: 'flyer-gen-editor',
        partialize: (state): PersistedEditorState => ({
          deceasedData: state.deceasedData,
          activeTemplate: state.activeTemplate,
          nodeTransforms: state.nodeTransforms,
          textOverrides: state.textOverrides,
          bgOverlay: state.bgOverlay,
          customBackgroundUrl: state.customBackgroundUrl,
        }),
      },
    ),
    {
      // Only track meaningful state; exclude selectedNodeId and action functions.
      partialize: (state): TrackedEditorState => ({
        deceasedData: state.deceasedData,
        activeTemplate: state.activeTemplate,
        nodeTransforms: state.nodeTransforms,
        textOverrides: state.textOverrides,
        bgOverlay: state.bgOverlay,
        customBackgroundUrl: state.customBackgroundUrl,
      }),
      // Cap history length to avoid unbounded memory growth.
      limit: 100,
      // Use shallow equality to avoid recording no-op changes.
      equality: (pastState, currentState) =>
        JSON.stringify(pastState) === JSON.stringify(currentState),
    },
  ),
);
