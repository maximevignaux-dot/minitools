import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  text: string;
  title?: string;
}

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string };

function parseBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (trimmed === '') {
      i++;
      continue;
    }

    if (trimmed === '```' || trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== '```') {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: 'code', text: codeLines.join('\n') });
      continue;
    }

    if (/^[-*]\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (t === '' || t === '```' || t.startsWith('```') || /^[-*]\s/.test(t)) break;
      paragraphLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ').trim() });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    const tok = m[0];
    if (tok.startsWith('**')) {
      out.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const external = /^https?:\/\//.test(href);
        out.push(
          external ? (
            <a
              key={key++}
              href={href}
              target="_blank"
              rel="noopener nofollow"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              {label}
            </a>
          ) : (
            <Link
              key={key++}
              href={href}
              className="text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              {label}
            </Link>
          ),
        );
      }
    } else {
      out.push(
        <code
          key={key++}
          className="rounded bg-line/60 px-1 py-0.5 font-mono text-[0.92em] text-ink"
        >
          {tok.slice(1, -1)}
        </code>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return out;
}

export function Explanation({ text, title = 'Comment ça marche' }: Props) {
  const blocks = parseBlocks(text);

  return (
    <section id="explication" aria-labelledby="explication-title" className="mt-12">
      <h2 id="explication-title" className="mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-ink/90">
        {blocks.map((b, i) => {
          if (b.type === 'paragraph') {
            return <p key={i}>{renderInline(b.text)}</p>;
          }
          if (b.type === 'list') {
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-muted">
                {b.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-xl border border-line bg-paper/70 p-4 text-sm leading-relaxed"
            >
              <code className="font-mono text-ink/90">{b.text}</code>
            </pre>
          );
        })}
      </div>
    </section>
  );
}
