import {
  createContext,
  useContext,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

type ExportFn = () => void;

interface ExportContextValue {
  registerExport: (fn: ExportFn) => void;
  triggerExport: () => void;
}

const ExportContext = createContext<ExportContextValue | null>(null);

export function ExportProvider({ children }: { children: ReactNode }) {
  const exportFnRef = useRef<ExportFn | null>(null);

  const registerExport = useCallback((fn: ExportFn) => {
    exportFnRef.current = fn;
    return () => {
      if (exportFnRef.current === fn) {
        exportFnRef.current = null;
      }
    };
  }, []);

  const triggerExport = useCallback(() => {
    exportFnRef.current?.();
  }, []);

  return (
    <ExportContext.Provider value={{ registerExport, triggerExport }}>
      {children}
    </ExportContext.Provider>
  );
}

export function useExportContext() {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error("useExportContext must be used within ExportProvider");
  }
  return context;
}
