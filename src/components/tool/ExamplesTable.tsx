import type { ExamplesTable as Table } from '@/types/tool';

interface Props {
  data: Table;
  title?: string;
}

export function ExamplesTable({ data, title = 'Exemples concrets' }: Props) {
  if (!data?.rows?.length) return null;
  return (
    <section id="exemples" aria-labelledby="exemples-title" className="mt-12">
      <h2 id="exemples-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper/60 text-left">
              {data.columns.map((c) => (
                <th key={c.key} className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                  {c.label}
                  {c.unit ? ` (${c.unit})` : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                {data.columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 tabular-nums">
                    {String(row[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
