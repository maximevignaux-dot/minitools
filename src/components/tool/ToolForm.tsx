'use client';

import { useMemo, useState } from 'react';
import type { Tool, ToolInput, ToolValues } from '@/types/tool';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { ResultCard } from './ResultCard';
import { getToolBySlug } from '@/tools';

interface Props {
  category: string;
  slug: string;
}

function initialValues(inputs: ToolInput[]): ToolValues {
  const out: ToolValues = {};
  for (const input of inputs) out[input.id] = input.defaultValue;
  return out;
}

export function ToolForm({ category, slug }: Props) {
  const tool = getToolBySlug(category, slug) as Tool | undefined;
  const [values, setValues] = useState<ToolValues>(() =>
    tool ? initialValues(tool.inputs) : {},
  );

  const result = useMemo(() => {
    if (!tool) return null;
    try {
      return tool.compute(values);
    } catch {
      return null;
    }
  }, [tool, values]);

  if (!tool) return null;

  function updateNumber(id: string, raw: string) {
    if (raw === '') {
      setValues((v) => ({ ...v, [id]: 0 }));
      return;
    }
    const parsed = Number(raw.replace(',', '.'));
    if (Number.isFinite(parsed)) setValues((v) => ({ ...v, [id]: parsed }));
  }

  function updateString(id: string, value: string) {
    setValues((v) => ({ ...v, [id]: value }));
  }

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
      <div className="rounded-2xl border border-line bg-white p-5">
        <div className="space-y-4">
          {tool.inputs.map((input) => (
            <div key={input.id}>
              <Label htmlFor={input.id}>
                {input.label}
                {input.unit && <span className="ml-1 text-muted">({input.unit})</span>}
              </Label>

              {input.type === 'number' && (
                <Input
                  id={input.id}
                  type="number"
                  inputMode="decimal"
                  min={input.min}
                  max={input.max}
                  step={input.step ?? 1}
                  value={String(values[input.id] ?? '')}
                  onChange={(e) => updateNumber(input.id, e.target.value)}
                />
              )}

              {input.type === 'slider' && (
                <div>
                  <input
                    id={input.id}
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step ?? 1}
                    value={Number(values[input.id] ?? input.defaultValue)}
                    onChange={(e) => updateNumber(input.id, e.target.value)}
                    className="w-full accent-accent"
                  />
                  <div className="mt-1 text-sm tabular-nums text-muted">
                    {String(values[input.id])}
                    {input.unit ? ` ${input.unit}` : ''}
                  </div>
                </div>
              )}

              {input.type === 'select' && (
                <Select
                  id={input.id}
                  value={String(values[input.id] ?? '')}
                  onChange={(e) => updateString(input.id, e.target.value)}
                >
                  {input.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              )}

              {input.help && <p className="mt-1 text-xs text-muted">{input.help}</p>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="md:sticky md:top-20">{result && <ResultCard result={result} />}</div>
      </div>
    </div>
  );
}
