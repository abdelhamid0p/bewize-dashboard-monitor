import * as React from 'react';
import { Input as ShadcnInput } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <ShadcnInput
          className={cn(
            'h-12 px-4 rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500',
            'placeholder:text-gray-400',
            'transition-all duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn(
            'mt-1.5 text-xs',
            error ? 'text-red-500' : 'text-gray-500'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };