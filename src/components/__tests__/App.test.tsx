import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

// Mock the canvas-based components that rely on Konva (not available in jsdom)
vi.mock('../canvas/CanvasWorkspace', () => ({
  default: () => <div data-testid="canvas-workspace">Canvas Area</div>,
}));

vi.mock('../ui/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar Area</div>,
}));

// ============================================================================
// App Component
// ============================================================================
describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should render the sidebar area', () => {
    render(<App />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should render the canvas workspace area', () => {
    render(<App />);
    expect(screen.getByTestId('canvas-workspace')).toBeInTheDocument();
  });

  it('should have a flex layout container', () => {
    const { container } = render(<App />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeTruthy();
    expect(root.className).toContain('flex');
  });
});
