import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, absoluteUrl, getCategory } from '@/lib/site';
import { getByCategory } from '@/tools';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FaqSection } from '@/components/seo/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { TldrCard } from '@/components/tool/TldrCard';
import { buildBreadcrumbList, buildItemListSchema } from '@/lib/schema';

interface Params {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategory(category);
  if (!meta) return {};
  const url = absoluteUrl(`/${meta.slug}`);
  const title = `${meta.label} — ${getByCategory(meta.slug).length} calculatrices gratuites`;
  return {
    title,
    description: meta.intro ?? meta.description,
    alternates: { canonical: url },
    openGraph: { url, title, description: meta.intro ?? meta.description },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const meta = getCategory(category);
  if (!meta) notFound();

  const tools = getByCategory(meta.slug);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== meta.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <JsonLd
        data={[
          buildItemListSchema(tools),
          buildBreadcrumbList([
            { label: 'Accueil', url: absoluteUrl('/') },
            { label: meta.label, url: absoluteUrl(`/${meta.slug}`) },
          ]),
        ]}
      />

      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: meta.label }]} />

      <header className="mt-4 mb-6 max-w-prose">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          <span aria-hidden className="mr-2">
            {meta.emoji}
          </span>
          {meta.label}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{meta.intro ?? meta.description}</p>
        <p className="mt-3 text-xs text-muted">
          <span className="tabular-nums">{tools.length} calculatrices</span>
          <span aria-hidden className="mx-1.5">·</span>
          Toutes gratuites, sans inscription
        </p>
      </header>

      {meta.tldr && (
        <div className="max-w-prose">
          <TldrCard text={meta.tldr} />
        </div>
      )}

      {tools.length === 0 ? (
        <p className="mt-8 text-muted">Aucun outil pour le moment dans cette catégorie.</p>
      ) : (
        <section id="outils" aria-labelledby="outils-title" className="mt-10">
          <h2 id="outils-title" className="mb-4 text-2xl font-semibold">
            Tous les outils {meta.label.toLowerCase()}
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.category}/${tool.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 no-underline transition hover:border-accent hover:bg-accent/5"
                >
                  <span>
                    <span className="block font-medium leading-snug text-ink">{tool.h1}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted">
                      {tool.metaDescription}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {meta.faq?.length ? (
        <div className="max-w-prose">
          <FaqSection items={meta.faq} title={`Questions fréquentes — ${meta.label}`} />
        </div>
      ) : null}

      <section id="autres-categories" aria-labelledby="autres-categories-title" className="mt-12">
        <h2 id="autres-categories-title" className="mb-4 text-2xl font-semibold">
          Explorer d’autres catégories
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {otherCategories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}`}
                className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4 no-underline transition hover:border-accent hover:bg-accent/5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-paper text-lg"
                >
                  {c.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium leading-snug text-ink">{c.label}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted">
                    {c.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
