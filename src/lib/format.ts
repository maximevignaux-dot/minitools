const eur0 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const eur2 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
});

const num0 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const num1 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const pct1 = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  maximumFractionDigits: 1,
});

export function formatEuros(value: number, decimals: 0 | 2 = 0): string {
  return decimals === 0 ? eur0.format(value) : eur2.format(value);
}

export function formatNumber(value: number, decimals: 0 | 1 = 0): string {
  return decimals === 0 ? num0.format(value) : num1.format(value);
}

export function formatPercent(ratio: number): string {
  return pct1.format(ratio);
}

export function formatRange(min: number, max: number, currency = true): string {
  if (currency) {
    return `${formatEuros(min)} – ${formatEuros(max)}`;
  }
  return `${formatNumber(min)} – ${formatNumber(max)}`;
}

const dateLong = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatLastmod(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return dateLong.format(d);
}
