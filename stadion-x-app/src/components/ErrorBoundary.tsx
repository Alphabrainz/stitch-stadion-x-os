import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * A robust Error Boundary component that catches JavaScript errors anywhere in its child component tree.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
          <div className="bg-brand-red/10 border border-brand-red/30 p-8 rounded-2xl max-w-lg w-full text-center space-y-4 shadow-[0_0_50px_rgba(255,59,48,0.2)]">
            <span className="material-symbols-outlined text-[64px] text-brand-red">error</span>
            <h1 className="text-2xl font-bold text-white">System Error Detected</h1>
            <p className="text-white/70">An unexpected error occurred in the application layer. Please contact Ops or refresh the page.</p>
            <div className="pt-4">
              <button 
                onClick={() => window.location.reload()}
                className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Reboot System
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
