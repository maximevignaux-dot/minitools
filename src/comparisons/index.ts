import type { Comparison } from '@/types/comparison';
import { autoEntrepreneurVsSasu } from './data/auto-entrepreneur-vs-sasu';
import { lcdVsLocationNue } from './data/lcd-vs-location-nue';
import { loaVsAchatVoiture } from './data/loa-vs-achat-voiture';
import { peaVsAssuranceVie } from './data/pea-vs-assurance-vie';
import { pelVsLivretA } from './data/pel-vs-livret-a';
import { pfuVsBaremeProgressif } from './data/pfu-vs-bareme-progressif';
import { salarieVsFreelance } from './data/salarie-vs-freelance';

export const ALL_COMPARISONS: Comparison[] = [
  autoEntrepreneurVsSasu,
  salarieVsFreelance,
  peaVsAssuranceVie,
  pelVsLivretA,
  pfuVsBaremeProgressif,
  lcdVsLocationNue,
  loaVsAchatVoiture,
];

const BY_SLUG = new Map<string, Comparison>(ALL_COMPARISONS.map((c) => [c.slug, c]));

export function getAllComparisons(): Comparison[] {
  return ALL_COMPARISONS;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return BY_SLUG.get(slug);
}
