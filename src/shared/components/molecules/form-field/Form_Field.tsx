import * as React from 'react';
import { Input, type InputProps } from '@/shared/components/atoms/input/input';
import { Label } from '@/shared/components/atoms/label/label';
import { cn } from '@/shared/lib/utils';

export interface FormFieldProps extends InputProps {
  label: string;
  id: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, required, error, helperText, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <Input
          className='rounded-[24px]'
          id={id}
          ref={ref}
          error={error}
          helperText={helperText}
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };