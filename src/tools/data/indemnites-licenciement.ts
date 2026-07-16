import type { Tool } from '@/types/tool';
import { formatEuros } from '@/lib/format';

const TYPES: Record<string, { coef: number; label: string }> = {
  legal: { coef: 1, label: 'Licenciement personnel (hors faute grave)' },
  economique: { coef: 1, label: 'Licenciement économique' },
  rupture: { coef: 1, label: 'Rupture conventionnelle (minimum légal)' },
  faute: { coef: 0, label: 'Faute grave ou lourde — aucune indemnité légale' },
};

function indemniteLegale(salaireMensuel: number, anciennete: number, coef: number): number {
  if (coef === 0) return 0;
  const base = salaireMensuel * coef;
  if (anciennete <= 10) return base * 0.25 * anciennete;
  return base * 0.25 * 10 + base * (1 / 3) * (anciennete - 10);
}

export const indemnitesLicenciement: Tool = {
  slug: 'indemnites-licenciement',
  category: 'salaire',
  h1: 'Indemnités de licenciement : calculateur 2026',
  metaTitle: 'Indemnités de licenciement 2026 — calculateur instantané',
  metaDescription:
    'Calcule ton indemnité légale de licenciement selon ton salaire, ton ancienneté et le motif. Barème 2026 + cas faute grave, économique et rupture conventionnelle.',
  intro:
    'Quelle indemnité de licenciement vas-tu toucher ? Renseigne ton salaire mensuel brut, ton ancienneté et le motif : tu obtiens le minimum légal et l’équivalent en mois de salaire.',
  keywords: ['indemnités licenciement', 'rupture conventionnelle', 'faute grave', 'ancienneté', 'code du travail'],
  lastmod: '2026-05-14',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'L’indemnité légale = 1/4 de mois de salaire × ancienneté (10 premières années) puis 1/3 de mois par année au-delà. Avec 10 ans d’ancienneté à 2 500 €, tu touches 6 250 € minimum.',

  keyTakeaways: [
    'Barème légal : 1/4 mois de salaire par année d’ancienneté ≤ 10 ans, 1/3 mois au-delà.',
    'Salaire de référence : moyenne des 12 derniers mois OU moyenne des 3 derniers mois × 4 — le plus favorable.',
    'En cas de faute grave ou lourde, aucune indemnité de licenciement légale n’est due.',
    'Ta convention collective peut prévoir un calcul plus favorable que le minimum légal — vérifie ton secteur.',
  ],

  howTo: [
    {
      name: 'Saisis ton salaire mensuel brut moyen',
      text: 'Moyenne des 12 derniers mois (primes incluses) ou des 3 derniers mois × 4, retiens le plus élevé.',
    },
    {
      name: 'Indique ton ancienneté',
      text: 'Nombre d’années complètes dans l’entreprise. Les mois partiels comptent au prorata.',
    },
    {
      name: 'Choisis le motif du licenciement',
      text: 'Personnel (hors faute), économique, rupture conventionnelle ou faute grave/lourde.',
    },
    {
      name: 'Lis ton indemnité minimum',
      text: 'L’outil affiche le montant légal et son équivalent en mois de salaire — base pour négocier.',
    },
  ],

  useCases: [
    {
      title: 'Anticiper un départ négocié',
      description: 'Évalue le minimum légal à demander dans une rupture conventionnelle avant de t’engager.',
    },
    {
      title: 'Vérifier l’offre de ton employeur',
      description: 'Compare le montant proposé au minimum légal calculé ici pour repérer une sous-offre.',
    },
    {
      title: 'Préparer un budget de transition',
      description: 'Connaître ton indemnité aide à dimensionner ta réserve avant chômage ou nouveau poste.',
    },
    {
      title: 'Évaluer le coût d’un licenciement (côté employeur)',
      description: 'Pour les RH/dirigeants : simulation rapide du coût social d’un départ.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre indemnité légale et conventionnelle',
      description: 'Beaucoup de conventions collectives (Syntec, métallurgie…) imposent un calcul plus généreux. Vérifie ta CCN avant de signer.',
    },
    {
      title: 'Oublier l’assiette de référence "3 derniers mois"',
      description: 'Si tu as reçu une grosse prime récemment, la moyenne des 3 derniers mois × 4 peut être plus avantageuse que celle sur 12 mois.',
    },
    {
      title: 'Croire que la rupture conventionnelle dépasse le minimum',
      description: 'Le minimum légal est le même qu’un licenciement personnel. Tu peux et dois négocier au-dessus si tu as un argument.',
    },
    {
      title: 'Oublier la fiscalité et les cotisations',
      description: 'L’indemnité est exonérée d’IR dans la limite du barème légal/conventionnel. Au-delà, c’est imposable et soumis aux cotisations.',
    },
  ],

  sources: [
    {
      label: 'Service-Public.fr — Indemnité de licenciement',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F987',
    },
    {
      label: 'Code du travail — Article L1234-9',
      url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035644154/',
    },
    {
      label: 'impots.gouv.fr — Indemnités de rupture',
      url: 'https://www.impots.gouv.fr/particulier/questions/jai-recu-une-indemnite-suite-une-rupture-de-mon-contrat-de-travail-doit',
    },
  ],

  inputs: [
    {
      id: 'salaire',
      label: 'Salaire mensuel brut moyen',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 2500,
      min: 0,
      step: 50,
    },
    {
      id: 'anciennete',
      label: 'Ancienneté dans l’entreprise',
      type: 'number',
      unit: 'années',
      defaultValue: 8,
      min: 0,
      max: 50,
      step: 0.5,
    },
    {
      id: 'motif',
      label: 'Motif du licenciement',
      type: 'select',
      defaultValue: 'legal',
      options: Object.entries(TYPES).map(([value, t]) => ({ value, label: t.label })),
    },
  ],

  compute: (values) => {
    const salaire = Math.max(0, Number(values.salaire) || 0);
    const anciennete = Math.max(0, Number(values.anciennete) || 0);
    const motif = TYPES[String(values.motif)] ?? TYPES.legal;

    const indemnite = indemniteLegale(salaire, anciennete, motif.coef);
    const moisEquivalent = salaire > 0 ? indemnite / salaire : 0;

    return {
      primary: {
        label: 'Indemnité légale minimum',
        value: indemnite,
        unit: '€',
        formatted: formatEuros(indemnite),
      },
      secondary: [
        { label: 'Équivalent en mois de salaire', value: moisEquivalent, unit: 'mois', formatted: `${moisEquivalent.toFixed(2)} mois` },
        { label: 'Base de calcul (salaire mensuel)', value: salaire, unit: '€', formatted: formatEuros(salaire) },
        { label: 'Ancienneté retenue', value: anciennete, unit: 'années', formatted: `${anciennete} an${anciennete > 1 ? 's' : ''}` },
        { label: 'Motif', value: 0, unit: '', formatted: motif.label },
      ],
      notes: [
        motif.coef === 0
          ? 'En cas de faute grave ou lourde, aucune indemnité de licenciement légale n’est due — seules les indemnités compensatrices (congés payés non pris) restent dues.'
          : 'Ce calcul donne le minimum légal. Ta convention collective peut prévoir un montant supérieur.',
        'L’indemnité est exonérée d’impôt sur le revenu dans la limite du plus élevé entre le barème légal/conventionnel et 50 % du montant perçu (plafond : 2 fois le PASS).',
      ],
    };
  },

  explanation: `L'**indemnité légale de licenciement** est due à tout salarié en CDI licencié, sauf en cas de **faute grave ou lourde**. Son calcul est encadré par l'article L.1234-9 du Code du travail.

**Formule légale 2026** :
- **Jusqu'à 10 ans d'ancienneté** : 1/4 de mois de salaire × nombre d'années.
- **Au-delà de 10 ans** : (1/4 × 10) + (1/3 × années au-delà de 10).

**Salaire de référence** : on retient le **plus favorable** entre :
- la **moyenne des 12 derniers mois** de salaire brut (primes incluses),
- la **moyenne des 3 derniers mois** × 4 (pour ne pas pénaliser un salarié qui aurait eu un mois faible).

**Exemple — 2 500 € brut, 8 ans d'ancienneté** :
- Indemnité = 2 500 × 1/4 × 8 = **5 000 €**

**Exemple — 3 000 € brut, 15 ans d'ancienneté** :
- Première tranche : 3 000 × 1/4 × 10 = 7 500 €
- Deuxième tranche : 3 000 × 1/3 × 5 = 5 000 €
- **Total : 12 500 €**

**Rupture conventionnelle** : le minimum légal est **identique** à celui d'un licenciement personnel. C'est une négociation entre les deux parties — l'employeur peut accorder plus pour faciliter le départ.

**Convention collective** : beaucoup de [conventions sectorielles](/methodologie) (Syntec, métallurgie, banque, BTP…) imposent un calcul plus avantageux que le minimum légal. Toujours vérifier ta CCN avant de signer.

**Fiscalité** : l'indemnité est **exonérée d'impôt** dans la limite du plus élevé entre :
- le barème légal/conventionnel,
- 50 % du montant total perçu,
- 2 × le salaire annuel brut N-1 (plafonné à 2 PASS).`,

  examples: {
    columns: [
      { key: 'salaire', label: 'Salaire mensuel brut' },
      { key: 'anciennete', label: 'Ancienneté' },
      { key: 'indemnite', label: 'Indemnité légale' },
      { key: 'mois', label: 'En mois de salaire' },
    ],
    rows: [
      { salaire: '1 800 €', anciennete: '3 ans', indemnite: '1 350 €', mois: '0,75 mois' },
      { salaire: '2 500 €', anciennete: '8 ans', indemnite: '5 000 €', mois: '2 mois' },
      { salaire: '3 000 €', anciennete: '15 ans', indemnite: '12 500 €', mois: '4,17 mois' },
      { salaire: '4 500 €', anciennete: '20 ans', indemnite: '26 250 €', mois: '5,83 mois' },
      { salaire: '6 000 €', anciennete: '25 ans', indemnite: '45 000 €', mois: '7,5 mois' },
    ],
  },

  faq: [
    {
      q: 'Quel est le minimum légal d’indemnité de licenciement en 2026 ?',
      a: "1/4 de mois de salaire par année d'ancienneté pour les 10 premières années, puis 1/3 de mois par année au-delà. Pour un salarié de 8 ans d'ancienneté à 2 500 € brut, le minimum est de 5 000 €.",
    },
    {
      q: 'Et en cas de faute grave ?',
      a: "Aucune indemnité de licenciement n'est due, ni légale ni conventionnelle. Seules les indemnités compensatrices (congés payés non pris, salaire du mois en cours) restent dues. La faute grave doit être justifiée par l'employeur.",
    },
    {
      q: 'La rupture conventionnelle donne-t-elle plus que le minimum légal ?',
      a: "Pas automatiquement : son minimum est identique au licenciement légal. Mais c'est une négociation — l'employeur peut accorder plus pour faciliter le départ. Et l'indemnité reste exonérée d'IR dans les mêmes limites.",
    },
    {
      q: 'L’indemnité est-elle imposable ?',
      a: "Elle est exonérée d'impôt sur le revenu dans la limite du plus élevé entre : (a) le barème légal/conventionnel, (b) 50 % du montant perçu, (c) 2× le salaire annuel brut N-1. Plafond global : 2 PASS (~94 000 € en 2026).",
    },
  ],

  related: ['brut-net-cadre', 'auto-entrepreneur-brut-net', 'combien-je-gagne-freelance'],
};
