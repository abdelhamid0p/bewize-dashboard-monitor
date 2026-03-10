import * as React from "react";
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
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={cn(
          "bg-white rounded-2xl shadow-xl relative",
          "w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-125 xl:w-135 2xl:w-150",
          "p-5 sm:p-6 md:p-8 lg:p-10",
          "max-h-[90vh] overflow-y-auto",
        )}
        onClick={(e) => e.stopPropagation()}
      >
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
  <div className="mb-4 sm:mb-5 md:mb-6">{children}</div>
);

interface DialogTitleProps {
  children: React.ReactNode;
}
export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-900">
    {children}
  </h2>
);

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}
export const DialogFooter: React.FC<DialogFooterProps> = ({
  className = "",
  children,
}) => <div className={cn("mt-4 sm:mt-5 md:mt-6", className)}>{children}</div>;
