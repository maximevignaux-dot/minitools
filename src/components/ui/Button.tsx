import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accentDark',
  outline: 'border border-line bg-white hover:bg-paper',
  ghost: 'hover:bg-paper',
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors disabled:opacity-50',
        styles[variant],
        className,
      )}
      {...rest}
    />
  );
});
