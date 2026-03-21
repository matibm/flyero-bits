import { create } from 'zustand';
import type { DeceasedData, TemplateLayout, TransformState, TextOverride, BgOverlayState } from '../types';
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
}

export const useEditorStore = create<EditorStore>((set) => ({
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
            const existing = state.nodeTransforms[id] || { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 };
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
}));
