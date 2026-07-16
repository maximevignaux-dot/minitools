import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Calculateurs et simulateurs gratuits';

export default function OgImage() {
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
          <h1
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#0f172a',
              letterSpacing: -2,
              margin: 0,
            }}
          >
            Calculateurs &amp; simulateurs gratuits
          </h1>
          <p style={{ fontSize: 30, color: '#64748b', lineHeight: 1.3, margin: 0 }}>
            Combien rapporte TikTok, frais de notaire, salaire net, rentabilité Airbnb…
            Résultats instantanés, sans inscription.
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
          <span>Gratuit</span>
          <span>·</span>
          <span>Mis à jour 2026</span>
          <span>·</span>
          <span>Aucune inscription</span>
        </div>
      </div>
    ),
    size,
  );
}
