import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { CATEGORIES, absoluteUrl, SITE_NAME } from '@/lib/site';
import { buildBreadcrumbList, buildItemListSchema } from '@/lib/schema';
import { getAllTools, getByCategory } from '@/tools';
import { formatLastmod } from '@/lib/format';

const URL = absoluteUrl('/outils');

export const metadata: Metadata = {
  title: `Tous les outils — calculateurs et simulateurs gratuits | ${SITE_NAME}`,
  description: `Liste complète des calculateurs et simulateurs disponibles, classés par catégorie. Tous gratuits, sans inscription.`,
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: `Tous les outils — ${SITE_NAME}`,
    description: 'Sitemap visible humain : tous les calculateurs et simulateurs.',
  },
};

export default function OutilsIndexPage() {
  const tools = getAllTools();

  return (
    <article className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <JsonLd
        data={[
          buildItemListSchema(tools),
          buildBreadcrumbList([
            { label: 'Accueil', url: absoluteUrl('/') },
            { label: 'Tous les outils', url: URL },
          ]),
        ]}
      />

      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Tous les outils' }]} />

      <header className="mt-4 mb-8 max-w-prose">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          Tous les outils {SITE_NAME}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Liste complète et classée par catégorie de nos {tools.length} calculateurs.
          Chaque outil est gratuit, sans inscription, calculé instantanément côté navigateur.
        </p>
        <p className="mt-3 text-xs text-muted">
          <span className="tabular-nums">{tools.length} outils</span>
          <span aria-hidden className="mx-1.5">·</span>
          <span className="tabular-nums">{CATEGORIES.length} catégories</span>
          <span aria-hidden className="mx-1.5">·</span>
          Mis à jour 2026
        </p>
      </header>

      <div className="space-y-12">
        {CATEGORIES.map((cat) => {
          const list = getByCategory(cat.slug);
          if (!list.length) return null;
          return (
            <section key={cat.slug} id={cat.slug} aria-labelledby={`cat-${cat.slug}-title`}>
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <h2 id={`cat-${cat.slug}-title`} className="text-2xl font-semibold">
                    <span aria-hidden className="mr-2">
                      {cat.emoji}
                    </span>
                    {cat.label}
                  </h2>
                  <p className="text-sm text-muted">{cat.description}</p>
                </div>
                <Link
                  href={`/${cat.slug}`}
                  className="shrink-0 text-sm text-accent no-underline hover:underline"
                >
                  Page catégorie &rarr;
                </Link>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {list.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.category}/${tool.slug}`}
                      className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 no-underline transition hover:border-accent hover:bg-accent/5"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium leading-snug text-ink">{tool.h1}</span>
                        <span className="mt-1 block text-sm leading-snug text-muted">
                          {tool.metaDescription}
                        </span>
                        <span className="mt-2 block text-[11px] text-muted">
                          Mis à jour le {formatLastmod(tool.lastmod)}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-16 rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-2 text-xl font-semibold">Tu cherches un outil qui n’existe pas encore ?</h2>
        <p className="text-base leading-relaxed text-muted">
          Notre catalogue s’enrichit régulièrement avec les calculatrices les plus recherchées
          en français. Consulte la{' '}
          <Link href="/methodologie" className="text-accent no-underline hover:underline">
            page méthodologie
          </Link>{' '}
          pour comprendre comment nous sourçons et calculons chaque outil — ou propose un nouvel
          outil via le dépôt public.
        </p>
      </section>
    </article>
  );
}
