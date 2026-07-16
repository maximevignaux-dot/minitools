import { ImageResponse } from 'next/og';
import { getAllComparisons, getComparisonBySlug } from '@/comparisons';
import { SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

interface Params {
  slug: string;
}

export default async function ComparisonOgImage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  const h1 = comp?.h1 ?? SITE_NAME;
  const a = comp?.optionA.shortName ?? 'A';
  const b = comp?.optionB.shortName ?? 'B';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fafaf7',
          padding: 72,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: '#2563eb',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            C
          </div>
          <span style={{ fontSize: 24, color: '#64748b', fontWeight: 500 }}>{SITE_NAME}</span>
          <span style={{ fontSize: 24, color: '#cbd5e1' }}>/</span>
          <span style={{ fontSize: 24, color: '#64748b' }}>⚖️ Comparatif</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: '#0f172a',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: '14px 28px',
              }}
            >
              {a}
            </span>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#2563eb' }}>VS</span>
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: '#0f172a',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: '14px 28px',
              }}
            >
              {b}
            </span>
          </div>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: -1.5,
              margin: 0,
              maxWidth: 1000,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {h1}
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 18,
            fontSize: 20,
            color: '#64748b',
            paddingTop: 20,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <span>Comparatif détaillé</span>
          <span>·</span>
          <span>Gratuit</span>
          <span>·</span>
          <span>Mis à jour 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
