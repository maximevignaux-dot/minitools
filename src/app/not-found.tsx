import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { getAllTools } from '@/tools';
import { getCategory } from '@/lib/site';

export default function NotFound() {
  const popular = getAllTools()
    .slice()
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm uppercase tracking-wider text-muted">Erreur 404</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Page introuvable</h1>
        <p className="mx-auto mt-3 max-w-prose text-base text-muted">
          Cet outil n&apos;existe pas (ou plus). Reviens à l&apos;accueil ou choisis un des
          outils populaires ci-dessous.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white no-underline hover:bg-accentDark"
        >
          <Home className="h-4 w-4" aria-hidden />
          Retour à l&apos;accueil
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Outils les plus consultés</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {popular.map((tool) => {
            const cat = getCategory(tool.category);
            return (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.category}/${tool.slug}`}
                  className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4 no-underline transition hover:border-accent hover:bg-accent/5"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-paper text-lg"
                  >
                    {cat?.emoji ?? '🛠️'}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-wider text-muted">
                      {cat?.label ?? tool.category}
                    </span>
                    <span className="mt-0.5 block font-medium leading-snug text-ink">
                      {tool.h1}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
