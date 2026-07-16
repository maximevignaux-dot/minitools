import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'h-11 w-full rounded-lg border border-line bg-white px-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20',
          className,
        )}
        {...rest}
      />
    );
  },
);
