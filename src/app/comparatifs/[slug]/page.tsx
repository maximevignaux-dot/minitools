import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, X, Trophy, Equal } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSection } from '@/components/seo/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { TldrCard } from '@/components/tool/TldrCard';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';
import { buildBreadcrumbList, buildFaqSchema } from '@/lib/schema';
import { getAllComparisons, getComparisonBySlug } from '@/comparisons';
import { getToolBySlug } from '@/tools';
import { formatLastmod } from '@/lib/format';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) return {};
  const url = absoluteUrl(`/comparatifs/${comp.slug}`);
  return {
    title: comp.metaTitle,
    description: comp.metaDescription,
    keywords: comp.keywords,
    alternates: { canonical: url },
    openGraph: { url, title: comp.metaTitle, description: comp.metaDescription },
  };
}

export default async function ComparisonPage({ params }: Params) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) notFound();

  const url = absoluteUrl(`/comparatifs/${comp.slug}`);
  const relatedTools = (comp.related ?? [])
    .map((s) => {
      // Search across all categories
      const allCats = ['revenus', 'internet', 'couts', 'immobilier', 'salaire', 'epargne'];
      for (const c of allCats) {
        const t = getToolBySlug(c, s);
        if (t) return t;
      }
      return undefined;
    })
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const organization = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/icon') },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comp.h1,
    description: comp.tldr,
    inLanguage: 'fr-FR',
    author: organization,
    publisher: organization,
    datePublished: comp.lastmod,
    dateModified: comp.lastmod,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: comp.keywords?.join(', '),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 pb-16 pt-6">
      <JsonLd
        data={[
          articleSchema,
          buildBreadcrumbList([
            { label: 'Accueil', url: absoluteUrl('/') },
            { label: 'Comparatifs', url: absoluteUrl('/comparatifs') },
            { label: comp.h1, url },
          ]),
          buildFaqSchema(comp.faq),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Comparatifs', href: '/comparatifs' },
          { label: comp.h1 },
        ]}
      />

      <header className="mt-4 mb-6 max-w-prose">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{comp.h1}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{comp.intro}</p>
        <p className="mt-3 text-xs text-muted">
          Mis à jour le {formatLastmod(comp.lastmod)}
          <span aria-hidden className="mx-1.5">·</span>
          Comparatif {SITE_NAME}
        </p>
      </header>

      <div className="max-w-prose">
        <TldrCard text={comp.tldr} />
      </div>

      {/* Side-by-side cards */}
      <section id="vue-densemble" aria-labelledby="vue-densemble-title" className="mt-12">
        <h2 id="vue-densemble-title" className="mb-4 text-2xl font-semibold">
          Vue d&apos;ensemble
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[comp.optionA, comp.optionB].map((opt, idx) => (
            <div key={idx} className="rounded-2xl border border-line bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                Option {idx === 0 ? 'A' : 'B'}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">{opt.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{opt.tagline}</p>

              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Avantages
                </p>
                <ul className="space-y-1.5">
                  {opt.pros.map((pro, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-snug text-ink/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Limites
                </p>
                <ul className="space-y-1.5">
                  {opt.cons.map((con, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-snug text-ink/90">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section id="tableau" aria-labelledby="tableau-title" className="mt-12">
        <h2 id="tableau-title" className="mb-4 text-2xl font-semibold">
          Comparatif point par point
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/60 text-left">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                  Critère
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                  {comp.optionA.shortName}
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                  {comp.optionB.shortName}
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">
                  Avantage
                </th>
              </tr>
            </thead>
            <tbody>
              {comp.rows.map((row, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{row.criterion}</td>
                  <td className="px-4 py-3 align-top text-ink/90">{row.a}</td>
                  <td className="px-4 py-3 align-top text-ink/90">{row.b}</td>
                  <td className="px-4 py-3">
                    {row.winner === 'a' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        <Trophy className="h-3 w-3" aria-hidden />
                        {comp.optionA.shortName}
                      </span>
                    )}
                    {row.winner === 'b' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        <Trophy className="h-3 w-3" aria-hidden />
                        {comp.optionB.shortName}
                      </span>
                    )}
                    {row.winner === 'tie' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-xs font-medium text-muted">
                        <Equal className="h-3 w-3" aria-hidden />
                        Égalité
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quand choisir A / B */}
      <section id="quand-choisir" aria-labelledby="quand-choisir-title" className="mt-12">
        <h2 id="quand-choisir-title" className="mb-4 text-2xl font-semibold">
          Quand choisir l&apos;un ou l&apos;autre
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-lg font-semibold">Choisis {comp.optionA.name} si…</h3>
            <ul className="mt-3 space-y-2">
              {comp.whenA.map((item, i) => (
                <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-ink/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-lg font-semibold">Choisis {comp.optionB.name} si…</h3>
            <ul className="mt-3 space-y-2">
              {comp.whenB.map((item, i) => (
                <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-ink/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section id="verdict" aria-labelledby="verdict-title" className="mt-12 max-w-prose">
        <h2 id="verdict-title" className="mb-3 text-2xl font-semibold">
          Notre verdict
        </h2>
        <p className="rounded-2xl border border-accent/30 bg-accent/5 p-5 text-base leading-relaxed text-ink">
          {comp.verdict}
        </p>
      </section>

      {/* FAQ */}
      <div className="max-w-prose">
        <FaqSection items={comp.faq} />
      </div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section
          id="outils-lies"
          aria-labelledby="outils-lies-title"
          className="mt-12"
        >
          <h2 id="outils-lies-title" className="mb-4 text-2xl font-semibold">
            Outils pour aller plus loin
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {relatedTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.category}/${tool.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-xl border border-line bg-white p-4 no-underline transition hover:border-accent hover:bg-accent/5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug text-ink">{tool.h1}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted">
                      {tool.metaDescription}
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
        </section>
      )}
    </article>
  );
}
