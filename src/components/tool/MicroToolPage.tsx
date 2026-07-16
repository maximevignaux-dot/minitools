import { Suspense } from 'react';
import Link from 'next/link';
import type { Tool } from '@/types/tool';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSection } from '@/components/seo/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { AdSlot } from '@/components/ads/AdSlot';
import { getCategory } from '@/lib/site';
import { buildToolSchemas } from '@/lib/schema';
import { formatLastmod } from '@/lib/format';
import { getRelated } from '@/tools';
import { getCustomRenderer } from '@/tools/customRenderers';
import { ToolForm } from './ToolForm';
import { ExamplesTable } from './ExamplesTable';
import { InternalLinks } from './InternalLinks';
import { Explanation } from './Explanation';
import { TldrCard } from './TldrCard';
import { KeyTakeaways } from './KeyTakeaways';
import { HowToSteps } from './HowToSteps';
import { UseCases } from './UseCases';
import { Pitfalls } from './Pitfalls';
import { Sources } from './Sources';
import { Toc } from './Toc';

interface Props {
  tool: Tool;
}

export function MicroToolPage({ tool }: Props) {
  const category = getCategory(tool.category);
  const related = getRelated(tool, 3);
  const Custom = getCustomRenderer(tool.slug);

  const tocSections: { id: string; label: string }[] = [
    { id: 'outil', label: 'Calculateur' },
    ...(tool.keyTakeaways?.length ? [{ id: 'a-retenir', label: 'À retenir' }] : []),
    ...(tool.howTo?.length ? [{ id: 'comment-utiliser', label: 'Comment utiliser' }] : []),
    { id: 'explication', label: 'Comment ça marche' },
    ...(tool.examples?.rows?.length ? [{ id: 'exemples', label: 'Exemples concrets' }] : []),
    ...(tool.useCases?.length ? [{ id: 'cas-usage', label: 'Quand l’utiliser' }] : []),
    ...(tool.pitfalls?.length ? [{ id: 'erreurs', label: 'Erreurs courantes' }] : []),
    ...(tool.faq?.length ? [{ id: 'faq', label: 'Questions fréquentes' }] : []),
    ...(tool.sources?.length ? [{ id: 'sources', label: 'Sources' }] : []),
    ...(related.length ? [{ id: 'outils-similaires', label: 'Outils similaires' }] : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <JsonLd data={buildToolSchemas(tool)} />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
        <article className="min-w-0">
          <Breadcrumbs
            items={[
              { label: 'Accueil', href: '/' },
              { label: category?.label ?? tool.category, href: `/${tool.category}` },
              { label: tool.h1 },
            ]}
          />

          <header className="mt-4 mb-6">
            {category && (
              <Link
                href={`/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted no-underline transition hover:border-accent hover:text-accent"
              >
                <span aria-hidden>{category.emoji}</span>
                {category.label}
              </Link>
            )}
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{tool.h1}</h1>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">{tool.intro}</p>
            <p className="mt-3 text-xs text-muted">
              <span className="tabular-nums">Mis à jour le {formatLastmod(tool.lastmod)}</span>
              <span aria-hidden className="mx-1.5">·</span>
              Calcul instantané, sans inscription
            </p>
          </header>

          {tool.tldr && (
            <div className="max-w-prose">
              <TldrCard text={tool.tldr} />
            </div>
          )}

          <section id="outil" aria-label="Outil de calcul" className="mt-6 scroll-mt-20">
            {Custom ? (
              <Suspense fallback={<ToolForm category={tool.category} slug={tool.slug} />}>
                <Custom category={tool.category} slug={tool.slug} />
              </Suspense>
            ) : (
              <ToolForm category={tool.category} slug={tool.slug} />
            )}
          </section>

          <AdSlot position="top" />

          {tool.keyTakeaways?.length ? (
            <div className="max-w-prose scroll-mt-20">
              <KeyTakeaways items={tool.keyTakeaways} />
            </div>
          ) : null}

          {tool.howTo?.length ? <HowToSteps steps={tool.howTo} /> : null}

          <div className="max-w-prose">
            <Explanation text={tool.explanation} />
          </div>

          <ExamplesTable data={tool.examples} />

          {tool.useCases?.length ? <UseCases items={tool.useCases} /> : null}

          {tool.pitfalls?.length ? <Pitfalls items={tool.pitfalls} /> : null}

          <AdSlot position="mid" />

          <div className="max-w-prose">
            <FaqSection items={tool.faq} />
          </div>

          {tool.sources?.length ? <Sources items={tool.sources} /> : null}

          <InternalLinks tools={related} />

          <AdSlot position="bottom" />
        </article>

        <Toc sections={tocSections} />
      </div>
    </div>
  );
}
