import type { ComputeResult } from '@/types/tool';
import { cn } from '@/lib/cn';

interface Props {
  result: ComputeResult;
}

export function ResultCard({ result }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-resultBorder bg-result p-5',
        'shadow-[0_1px_0_rgba(16,185,129,0.15)]',
      )}
    >
      <p className="text-xs uppercase tracking-wider text-emerald-700">{result.primary.label}</p>
      <p className="mt-1 text-4xl font-semibold tabular-nums">
        {result.primary.formatted}
      </p>
      {result.range && (
        <p className="mt-1 text-sm text-emerald-800">Fourchette : {result.range.formatted}</p>
      )}
      {result.secondary && result.secondary.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-emerald-200/60 pt-3 text-sm">
          {result.secondary.map((m) => (
            <div key={m.label}>
              <dt className="text-emerald-800">{m.label}</dt>
              <dd className="font-medium tabular-nums">{m.formatted}</dd>
            </div>
          ))}
        </dl>
      )}
      {result.notes && result.notes.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-emerald-800/80">
          {result.notes.map((n, i) => (
            <li key={i}>· {n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
