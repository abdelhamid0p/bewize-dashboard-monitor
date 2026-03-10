import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/utils";

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="fixed inset-0"
        style={{ backgroundColor: "#00000085" }}
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full max-w-2xl",
            "bg-white rounded-2xl shadow-2xl",
            "p-6 sm:p-7 md:p-8",
            "max-h-[90vh] overflow-y-auto",
          )}
        >
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition"
          >
            ✕
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({
  className,
  children,
}) => {
  return <div className={cn(className)}>{children}</div>;
};

interface DialogHeaderProps {
  children: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="mb-6">{children}</div>;
};

interface DialogTitleProps {
  children: React.ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return (
    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
      {children}
    </h2>
  );
};

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};
