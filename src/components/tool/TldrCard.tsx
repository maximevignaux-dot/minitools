interface Props {
  text: string;
}

export function TldrCard({ text }: Props) {
  if (!text) return null;
  return (
    <aside
      aria-label="Réponse rapide"
      className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-5"
    >
      <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent">
        <span aria-hidden>★</span> En bref
      </div>
      <p className="text-base leading-relaxed text-ink">{text}</p>
    </aside>
  );
}
