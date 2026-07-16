import type { HowToStep } from '@/types/tool';

interface Props {
  steps: HowToStep[];
  title?: string;
}

export function HowToSteps({ steps, title = 'Comment utiliser cet outil' }: Props) {
  if (!steps?.length) return null;
  return (
    <section id="comment-utiliser" aria-labelledby="comment-utiliser-title" className="mt-12">
      <h2 id="comment-utiliser-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li
            key={i}
            id={`etape-${i + 1}`}
            className="flex gap-4 rounded-xl border border-line bg-white p-4"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent tabular-nums"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug text-ink">{step.name}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
