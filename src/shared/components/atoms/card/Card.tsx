import * as React from 'react';
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

// Card principale
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCard
    ref={ref}
    className={cn(
      'rounded-2xl shadow-xl border-gray-100',
      'transition-all duration-200',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

// CardHeader
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardHeader
    ref={ref}
    className={cn('space-y-1.5 p-8', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// CardTitle
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardTitle
    ref={ref}
    className={cn('text-2xl font-bold text-gray-900', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// CardDescription
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardDescription
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// CardContent
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardContent
    ref={ref}
    className={cn('p-8 pt-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

// CardFooter
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardFooter
    ref={ref}
    className={cn('flex items-center p-8 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
};

