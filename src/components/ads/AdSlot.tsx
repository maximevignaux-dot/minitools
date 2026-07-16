'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

type Position = 'top' | 'mid' | 'bottom';

interface Props {
  position: Position;
  className?: string;
}

const SLOT_ENV: Record<Position, string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  mid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
};

export function AdSlot({ position, className }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = SLOT_ENV[position];
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client || !slot || !ref.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      /* noop in dev */
    }
  }, [client, slot]);

  if (!client || !slot) {
    return (
      <div
        aria-hidden
        className={cn(
          'my-8 flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-line bg-paper/60 text-xs uppercase tracking-wider text-muted',
          className,
        )}
      >
        Emplacement publicitaire — {position}
      </div>
    );
  }

  return (
    <div className={cn('my-8', className)}>
      <ins
        ref={ref}
        className="adsbygoogle block"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
