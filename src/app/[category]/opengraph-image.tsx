import { ImageResponse } from 'next/og';
import { CATEGORIES, getCategory, SITE_NAME } from '@/lib/site';
import { getByCategory } from '@/tools';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

interface Params {
  category: string;
}

export default async function CategoryOgImage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategory(category);
  const count = getByCategory(category as never).length;

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
          padding: 80,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#2563eb',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            C
          </div>
          <span style={{ fontSize: 28, color: '#64748b', fontWeight: 500 }}>{SITE_NAME}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 120, lineHeight: 1 }}>{cat?.emoji ?? '🛠️'}</div>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#0f172a',
              letterSpacing: -2,
              margin: 0,
            }}
          >
            {cat?.label ?? category}
          </h1>
          <p style={{ fontSize: 30, color: '#64748b', lineHeight: 1.3, margin: 0 }}>
            {cat?.description ?? ''}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            fontSize: 22,
            color: '#64748b',
            paddingTop: 24,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <span style={{ fontWeight: 600, color: '#0f172a' }}>{count} calculatrices</span>
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
