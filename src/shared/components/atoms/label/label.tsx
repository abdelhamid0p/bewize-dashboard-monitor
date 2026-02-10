import * as React from 'react';
import { Label as ShadcnLabel } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof ShadcnLabel> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof ShadcnLabel>,
  LabelProps
>(({ className, required, children, ...props }, ref) => {
  return (
    <ShadcnLabel
      ref={ref}
      className={cn(
        'text-sm font-medium text-gray-700',
        'mb-1.5 block',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </ShadcnLabel>
  );
});

Label.displayName = 'Label';

export { Label };