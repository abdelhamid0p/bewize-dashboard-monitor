import * as React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
          aria-label="Fermer"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}
export const DialogContent: React.FC<DialogContentProps> = ({
  className = "",
  children,
}) => <div className={className}>{children}</div>;

interface DialogHeaderProps {
  children: React.ReactNode;
}
export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

interface DialogTitleProps {
  children: React.ReactNode;
}
export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}
export const DialogFooter: React.FC<DialogFooterProps> = ({
  className = "",
  children,
}) => <div className={className}>{children}</div>;
