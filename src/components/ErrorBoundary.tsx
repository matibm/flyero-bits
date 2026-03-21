import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center w-full h-screen bg-neutral-900">
          <div className="max-w-md w-full mx-4 bg-neutral-800 border border-neutral-700 rounded-2xl p-8 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-red-500/10 rounded-full mb-5">
              <AlertTriangle className="text-red-400" size={28} />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Algo salió mal</h2>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Ocurrió un error inesperado en la aplicación. Puedes intentar reiniciar o recargar la
              página.
            </p>

            {this.state.error && (
              <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 mb-6 text-left">
                <p className="text-xs font-mono text-red-400 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-neutral-900 font-semibold py-2.5 px-4 rounded-xl hover:bg-neutral-100 transition-colors duration-150 cursor-pointer"
              >
                <RotateCcw size={16} />
                Reintentar
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-neutral-700 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-neutral-600 transition-colors duration-150 cursor-pointer"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
