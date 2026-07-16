import type { CategorySlug, Tool } from '@/types/tool';

import { allocationChomage } from './data/allocation-chomage';
import { autoEntrepreneurBrutNet } from './data/auto-entrepreneur-brut-net';
import { calculAugmentationSalaire } from './data/calcul-augmentation-salaire';
import { calculImpotRevenu } from './data/calcul-impot-revenu';
import { calculRetraite } from './data/calcul-retraite';
import { calculTva } from './data/calcul-tva';
import { capaciteEmprunt } from './data/capacite-emprunt';
import { conversionSalaire } from './data/conversion-salaire';
import { coutEnfantMois } from './data/cout-enfant-mois';
import { coutVoitureMois } from './data/cout-voiture-mois';
import { fraisKilometriques } from './data/frais-kilometriques';
import { fraisNotaire } from './data/frais-notaire';
import { freelanceRevenu } from './data/freelance-revenu';
import { indemnitesLicenciement } from './data/indemnites-licenciement';
import { instagramRevenus } from './data/instagram-revenus';
import { interetsComposes } from './data/interets-composes';
import { mensualitePret } from './data/mensualite-pret';
import { pensionAlimentaire } from './data/pension-alimentaire';
import { perCalculateur } from './data/per-calculateur';
import { plusValueImmobiliere } from './data/plus-value-immobiliere';
import { rentabiliteAirbnb } from './data/rentabilite-airbnb';
import { salaireBrutNet } from './data/salaire-brut-net';
import { tiktokRevenus } from './data/tiktok-revenus';
import { twitchRevenus } from './data/twitch-revenus';
import { youtubeRevenus } from './data/youtube-revenus';

export const ALL_TOOLS: Tool[] = [
  tiktokRevenus,
  youtubeRevenus,
  coutVoitureMois,
  freelanceRevenu,
  rentabiliteAirbnb,
  autoEntrepreneurBrutNet,
  salaireBrutNet,
  capaciteEmprunt,
  interetsComposes,
  fraisNotaire,
  calculTva,
  mensualitePret,
  perCalculateur,
  indemnitesLicenciement,
  fraisKilometriques,
  coutEnfantMois,
  calculAugmentationSalaire,
  allocationChomage,
  calculRetraite,
  calculImpotRevenu,
  plusValueImmobiliere,
  instagramRevenus,
  twitchRevenus,
  pensionAlimentaire,
  conversionSalaire,
];

const BY_SLUG = new Map<string, Tool>(ALL_TOOLS.map((t) => [t.slug, t]));
const BY_CATEGORY = new Map<CategorySlug, Tool[]>();

for (const tool of ALL_TOOLS) {
  const list = BY_CATEGORY.get(tool.category) ?? [];
  list.push(tool);
  BY_CATEGORY.set(tool.category, list);
}

export function getAllTools(): Tool[] {
  return ALL_TOOLS;
}

export function getToolBySlug(category: string, slug: string): Tool | undefined {
  const tool = BY_SLUG.get(slug);
  if (!tool || tool.category !== category) return undefined;
  return tool;
}

export function getByCategory(category: CategorySlug): Tool[] {
  return BY_CATEGORY.get(category) ?? [];
}

export function getRelated(tool: Tool, limit = 3): Tool[] {
  const explicit = tool.related
    .map((slug) => BY_SLUG.get(slug))
    .filter((t): t is Tool => Boolean(t) && t!.slug !== tool.slug);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const same = (BY_CATEGORY.get(tool.category) ?? []).filter(
    (t) => t.slug !== tool.slug && !explicit.some((e) => e.slug === t.slug),
  );

  return [...explicit, ...same].slice(0, limit);
}
