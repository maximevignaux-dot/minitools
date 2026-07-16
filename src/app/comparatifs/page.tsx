import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { buildBreadcrumbList } from '@/lib/schema';
import { getAllComparisons } from '@/comparisons';
import { formatLastmod } from '@/lib/format';

const URL = absoluteUrl('/comparatifs');

export const metadata: Metadata = {
  title: `Comparatifs — choisir entre deux options | ${SITE_NAME}`,
  description: `Comparatifs détaillés pour t’aider à choisir entre deux statuts, placements ou solutions. Critères chiffrés, avantages, limites, verdict.`,
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: `Comparatifs ${SITE_NAME}`,
    description: 'Auto-entrepreneur vs SASU, PEA vs assurance-vie, etc. Comparatifs honnêtes et chiffrés.',
  },
};

export default function ComparatifsIndexPage() {
  const comparisons = getAllComparisons();

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: comparisons.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/comparatifs/${c.slug}`),
      name: c.h1,
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <JsonLd
        data={[
          itemList,
          buildBreadcrumbList([
            { label: 'Accueil', url: absoluteUrl('/') },
            { label: 'Comparatifs', url: URL },
          ]),
        ]}
      />

      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Comparatifs' }]} />

      <header className="mt-4 mb-8 max-w-prose">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Comparatifs</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Choisir entre deux statuts, deux placements ou deux solutions reste l’une des questions
          les plus fréquentes. Voici nos comparatifs détaillés, chiffrés, avec un verdict honnête
          et les critères qui comptent vraiment.
        </p>
      </header>

      <ul className="space-y-4">
        {comparisons.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/comparatifs/${c.slug}`}
              className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white p-6 no-underline transition hover:border-accent hover:bg-accent/5"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold leading-snug text-ink">{c.h1}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  {c.metaDescription}
                </span>
                <span className="mt-3 block text-[11px] text-muted">
                  Mis à jour le {formatLastmod(c.lastmod)}
                </span>
              </span>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>

      {comparisons.length === 1 && (
        <p className="mt-8 text-sm text-muted">
          Plus de comparatifs sont en préparation. Consulte aussi nos{' '}
          <Link href="/outils" className="text-accent no-underline hover:underline">
            calculatrices
          </Link>{' '}
          pour des chiffres précis sur ta situation.
        </p>
      )}
    </article>
  );
}
