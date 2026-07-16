import { ImageResponse } from 'next/og';
import { getAllTools, getToolBySlug } from '@/tools';
import { getCategory, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllTools().map((t) => ({ category: t.category, slug: t.slug }));
}

interface Params {
  category: string;
  slug: string;
}

export default async function ToolOgImage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  const cat = getCategory(category);
  const h1 = tool?.h1 ?? SITE_NAME;
  const intro = tool?.tldr ?? tool?.intro ?? '';

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
          {cat && (
            <>
              <span style={{ fontSize: 24, color: '#cbd5e1' }}>/</span>
              <span style={{ fontSize: 24, color: '#64748b' }}>
                {cat.emoji} {cat.label}
              </span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#0f172a',
              letterSpacing: -2,
              margin: 0,
            }}
          >
            {h1}
          </h1>
          {intro && (
            <p
              style={{
                fontSize: 26,
                color: '#64748b',
                lineHeight: 1.35,
                margin: 0,
                maxWidth: 1000,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {intro}
            </p>
          )}
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
          <span>Calculateur gratuit</span>
          <span>·</span>
          <span>Sans inscription</span>
          <span>·</span>
          <span>Mis à jour 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
