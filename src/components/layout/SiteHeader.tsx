import Link from 'next/link';
import { Menu } from 'lucide-react';
import { CATEGORIES, SITE_NAME } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight no-underline">
          {SITE_NAME}
        </Link>

        <nav aria-label="Catégories" className="hidden md:block">
          <ul className="flex items-center gap-4 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="text-muted no-underline transition hover:text-ink"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="relative md:hidden">
          <summary
            aria-label="Menu"
            className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-lg border border-line bg-white text-ink hover:border-accent [&::-webkit-details-marker]:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </summary>
          <nav
            aria-label="Catégories"
            className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white shadow-lg"
          >
            <ul className="py-1.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink no-underline transition hover:bg-paper"
                  >
                    <span aria-hidden>{c.emoji}</span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
