import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import { getAllTools, getByCategory } from '@/tools';
import { ArrowRight, Zap, Lock, Coins } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqSection } from '@/components/seo/FaqSection';
import { buildItemListSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Calculateurs et simulateurs gratuits`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} — Calculateurs et simulateurs gratuits`,
    description: SITE_DESCRIPTION,
  },
};

const HOMEPAGE_FAQ = [
  {
    q: 'Tous ces calculateurs sont-ils gratuits ?',
    a: 'Oui, chaque outil est 100 % gratuit, sans inscription ni paywall. Les résultats sont calculés instantanément dans ton navigateur — aucune donnée n’est envoyée à un serveur.',
  },
  {
    q: 'Les chiffres et taux sont-ils à jour ?',
    a: 'Les taux URSSAF, AGIRC-ARRCO, taux d’usure et plafonds fiscaux sont actualisés pour 2026. Chaque page outil affiche sa date de dernière mise à jour.',
  },
  {
    q: 'Mes données sont-elles enregistrées ?',
    a: 'Non. Tous les calculs s’effectuent localement dans ton navigateur. Aucune saisie n’est transmise ni stockée.',
  },
  {
    q: 'Comment proposer un nouvel outil ou signaler une erreur ?',
    a: 'Chaque outil mentionne ses sources et hypothèses. Pour une suggestion ou un correctif, ouvre une issue sur le repo public du projet.',
  },
];

export default function HomePage() {
  const tools = getAllTools();
  const popular = tools
    .slice()
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-10">
      <JsonLd data={buildItemListSchema(tools)} />

      <header className="mx-auto max-w-prose text-center">
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Calculateurs &amp; simulateurs gratuits
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          Combien rapporte TikTok, coût réel d&apos;une voiture, salaire net auto-entrepreneur,
          rentabilité Airbnb&hellip; Outils simples, résultats instantanés, sans inscription.
        </p>
        <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="font-semibold tabular-nums text-ink">{tools.length}</span> outils
          </span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="font-semibold tabular-nums text-ink">{CATEGORIES.length}</span>{' '}
            catégories
          </span>
          <span aria-hidden>·</span>
          <span>Mis à jour 2026</span>
        </p>
      </header>

      <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
        <li className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3 text-sm">
          <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span className="text-muted">Résultats instantanés, calcul côté client.</span>
        </li>
        <li className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3 text-sm">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span className="text-muted">Aucune donnée stockée, pas d’inscription.</span>
        </li>
        <li className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3 text-sm">
          <Coins className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span className="text-muted">Taux et plafonds 2026 à jour.</span>
        </li>
      </ul>

      <section id="populaires" aria-labelledby="populaires-title" className="mt-14">
        <h2 id="populaires-title" className="mb-4 text-2xl font-semibold">
          Outils populaires
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {popular.map((tool) => (
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

      <div className="mt-14 space-y-14">
        {CATEGORIES.map((cat) => {
          const list = getByCategory(cat.slug);
          if (!list.length) return null;
          return (
            <section key={cat.slug} id={cat.slug} aria-labelledby={`cat-${cat.slug}-title`}>
              <div className="mb-2 flex items-end justify-between gap-3">
                <div>
                  <h2
                    id={`cat-${cat.slug}-title`}
                    className="text-2xl font-semibold"
                  >
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
                  Voir tous &rarr;
                </Link>
              </div>
              {cat.tldr && (
                <p className="mb-4 text-sm italic leading-relaxed text-muted">{cat.tldr}</p>
              )}
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {list.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.category}/${tool.slug}`}
                      className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 no-underline transition hover:border-accent hover:bg-accent/5"
                    >
                      <span className="font-medium leading-snug text-ink">{tool.h1}</span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mx-auto mt-14 max-w-prose">
        <FaqSection items={HOMEPAGE_FAQ} title="Questions fréquentes" />
      </div>
    </div>
  );
}
