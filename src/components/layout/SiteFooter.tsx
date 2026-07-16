import Link from 'next/link';
import { CATEGORIES, SITE_NAME } from '@/lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold text-ink">{SITE_NAME}</p>
            <p className="mt-2 max-w-md">
              Calculateurs et simulateurs gratuits, sans inscription.
              Résultats instantanés, calculs transparents.
            </p>
          </div>
          <nav aria-label="Catégories">
            <p className="mb-2 font-semibold text-ink">Catégories</p>
            <ul className="grid grid-cols-2 gap-y-1">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="no-underline hover:text-ink">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="À propos">
            <p className="mb-2 font-semibold text-ink">À propos</p>
            <ul className="space-y-1">
              <li>
                <Link href="/outils" className="no-underline hover:text-ink">
                  Tous les outils
                </Link>
              </li>
              <li>
                <Link href="/comparatifs" className="no-underline hover:text-ink">
                  Comparatifs
                </Link>
              </li>
              <li>
                <Link href="/methodologie" className="no-underline hover:text-ink">
                  Méthodologie &amp; sources
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-xs">© {year} {SITE_NAME}.</p>
      </div>
    </footer>
  );
}
