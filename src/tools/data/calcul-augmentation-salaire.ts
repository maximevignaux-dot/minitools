import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const MODES: Record<string, { label: string }> = {
  augmentation: { label: 'Augmentation : X € passe à Y € → quel % ?' },
  appliquer: { label: 'Appliquer un % : X € + Y % = ?' },
  baisse: { label: 'Baisse : X € passe à Y € → quel % ?' },
  pourcentDe: { label: 'X % de Y = combien ?' },
};

export const calculAugmentationSalaire: Tool = {
  slug: 'calcul-augmentation-salaire',
  category: 'salaire',
  h1: 'Calcul d’augmentation de salaire (et pourcentages)',
  metaTitle: 'Calcul augmentation salaire : pourcentage instantané 2026',
  metaDescription:
    'Calcule une augmentation, une baisse ou un pourcentage en quelques secondes. Salaire avant/après, taux d’évolution, montants exacts.',
  intro:
    'Quelle est ton augmentation en pourcentage ? Combien tu gagnes après une hausse de X% ? Choisis le mode, saisis les deux valeurs : tu obtiens le résultat exact et le détail du calcul.',
  keywords: ['calcul pourcentage', 'augmentation salaire', 'évolution', 'hausse', 'baisse', 'taux'],
  lastmod: '2026-05-14',
  priority: 0.9,
  schemaType: 'SoftwareApplication',

  tldr: 'Pour passer de 2 500 € à 2 750 €, ton augmentation est de 10 %. Pour appliquer 3 % à 3 200 €, le nouveau salaire est de 3 296 € (+96 €).',

  keyTakeaways: [
    'Évolution en % : ((nouveau − ancien) / ancien) × 100.',
    'Appliquer un % : ancien × (1 + taux/100). Pour une baisse : (1 − taux/100).',
    'X % de Y : Y × (X/100) — la base de toutes les autres formules.',
    'En net, une augmentation brute de 100 € ne rapporte que ~75 € après cotisations + PAS.',
  ],

  howTo: [
    {
      name: 'Choisis le mode de calcul',
      text: 'Augmentation, baisse, application d’un %, ou simple X % de Y.',
    },
    {
      name: 'Saisis les deux valeurs',
      text: 'En euros ou en pourcentage selon le mode choisi (l’outil adapte les libellés).',
    },
    {
      name: 'Lis le résultat',
      text: 'Pourcentage, montant final ou différence — avec la formule détaillée appliquée.',
    },
  ],

  useCases: [
    {
      title: 'Négocier une augmentation annuelle',
      description: 'Sache exactement quel pourcentage demander pour atteindre un net mensuel cible.',
    },
    {
      title: 'Évaluer une promo commerciale',
      description: '"-30 % sur 89 €" — combien tu paies vraiment et combien tu économises.',
    },
    {
      title: 'Mesurer l’inflation sur ton budget',
      description: 'Compare ton loyer N vs N-1 pour quantifier ton augmentation réelle.',
    },
    {
      title: 'Convertir un taux en montant',
      description: '5 % de 2 800 € = 140 € : utile pour TVA, intérêts, cotisations.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre "X % de Y" et "Y + X %"',
      description: '20 % de 100 € = 20 €. Mais 100 € + 20 % = 120 €. Ne pas mélanger les formules.',
    },
    {
      title: 'Inverser le sens d’une évolution',
      description: 'Passer de 100 à 120 = +20 %. Mais passer de 120 à 100 = −16,67 %, pas −20 %.',
    },
    {
      title: 'Ignorer la baisse de pouvoir d’achat réel',
      description: 'Une augmentation de 2 % avec 4 % d’inflation = -2 % de pouvoir d’achat réel.',
    },
    {
      title: 'Comparer brut et net',
      description: 'Une augmentation brute de 10 % ne se traduit pas par +10 % de net. Compte ~75 % après cotisations + PAS.',
    },
  ],

  sources: [
    {
      label: 'INSEE — Évolution des salaires et inflation',
      url: 'https://www.insee.fr/fr/statistiques/serie/000867410',
    },
  ],

  inputs: [
    {
      id: 'mode',
      label: 'Type de calcul',
      type: 'select',
      defaultValue: 'augmentation',
      options: Object.entries(MODES).map(([value, m]) => ({ value, label: m.label })),
    },
    {
      id: 'a',
      label: 'Valeur 1 (ancien salaire / montant de base)',
      type: 'number',
      unit: '€',
      defaultValue: 2500,
      min: 0,
      step: 10,
    },
    {
      id: 'b',
      label: 'Valeur 2 (nouveau salaire ou pourcentage)',
      type: 'number',
      unit: '€ ou %',
      defaultValue: 2750,
      min: 0,
      step: 1,
    },
  ],

  compute: (values) => {
    const mode = String(values.mode);
    const a = Number(values.a) || 0;
    const b = Number(values.b) || 0;

    if (mode === 'augmentation') {
      const diff = b - a;
      const pct = a > 0 ? diff / a : 0;
      return {
        primary: {
          label: 'Taux d’augmentation',
          value: pct,
          unit: '%',
          formatted: formatPercent(pct),
        },
        secondary: [
          { label: 'Salaire avant', value: a, unit: '€', formatted: formatEuros(a) },
          { label: 'Salaire après', value: b, unit: '€', formatted: formatEuros(b) },
          { label: 'Différence', value: diff, unit: '€', formatted: formatEuros(diff) },
        ],
        notes: ['Formule : ((nouveau − ancien) / ancien) × 100'],
      };
    }
    if (mode === 'baisse') {
      const diff = b - a;
      const pct = a > 0 ? diff / a : 0;
      return {
        primary: {
          label: 'Taux d’évolution',
          value: pct,
          unit: '%',
          formatted: formatPercent(pct),
        },
        secondary: [
          { label: 'Montant initial', value: a, unit: '€', formatted: formatEuros(a) },
          { label: 'Montant final', value: b, unit: '€', formatted: formatEuros(b) },
          { label: 'Différence', value: diff, unit: '€', formatted: formatEuros(diff) },
        ],
        notes: ['Pour une baisse, le pourcentage est négatif. Formule identique à l’augmentation.'],
      };
    }
    if (mode === 'appliquer') {
      const pct = b / 100;
      const newValue = a * (1 + pct);
      const diff = newValue - a;
      return {
        primary: {
          label: 'Nouveau montant',
          value: newValue,
          unit: '€',
          formatted: formatEuros(newValue),
        },
        secondary: [
          { label: 'Montant de base', value: a, unit: '€', formatted: formatEuros(a) },
          { label: 'Pourcentage appliqué', value: pct, unit: '%', formatted: formatPercent(pct) },
          { label: 'Différence (augmentation)', value: diff, unit: '€', formatted: formatEuros(diff) },
        ],
        notes: ['Formule : montant × (1 + taux/100). Pour une baisse, saisir un pourcentage négatif.'],
      };
    }
    // pourcentDe : X % de Y
    const pct = a / 100;
    const result = b * pct;
    return {
      primary: {
        label: 'Résultat',
        value: result,
        unit: '€',
        formatted: formatEuros(result),
      },
      secondary: [
        { label: 'Pourcentage', value: pct, unit: '%', formatted: formatPercent(pct) },
        { label: 'Base', value: b, unit: '€', formatted: formatEuros(b) },
      ],
      notes: ['Formule : base × (pourcentage / 100)'],
    };
  },

  explanation: `Quatre formules couvrent 99 % des calculs de pourcentage du quotidien :

**1. Trouver le % d'évolution entre deux valeurs** :
\`\`\`
pourcentage = ((nouveau − ancien) / ancien) × 100
\`\`\`
Ex : 2 500 → 2 750 ⇒ (250 / 2 500) × 100 = **+10 %**.

**2. Appliquer un % à un montant** :
\`\`\`
nouveau = ancien × (1 + taux/100)
\`\`\`
Ex : 3 200 € + 3 % ⇒ 3 200 × 1,03 = **3 296 €**.

**3. X % de Y** :
\`\`\`
résultat = Y × (X / 100)
\`\`\`
Ex : 20 % de 100 € = 20 €.

**4. Trouver le X dont Y % vaut Z** (calcul inverse) :
\`\`\`
X = Z / (Y/100)
\`\`\`
Ex : 30 € représente 15 % de quoi ? 30 / 0,15 = **200 €**.

**Augmentation de salaire brut vs net** : une augmentation brute de 10 % se traduit par environ **+7,5 %** sur ton net après cotisations sociales et prélèvement à la source. Garde cette règle à l'esprit lors de tes négociations — vois aussi notre [calculateur salaire brut → net](/salaire/brut-net-cadre) pour la conversion exacte selon ton statut.

**Inflation et pouvoir d'achat réel** : une augmentation de **2 %** avec **4 %** d'inflation = perte de **2 %** de pouvoir d'achat. Pour rester gagnant, ton augmentation doit dépasser l'inflation.`,

  examples: {
    columns: [
      { key: 'situation', label: 'Situation' },
      { key: 'calcul', label: 'Calcul' },
      { key: 'resultat', label: 'Résultat' },
    ],
    rows: [
      { situation: 'Salaire 2 500 € → 2 750 €', calcul: '(2750-2500)/2500', resultat: '+10 %' },
      { situation: 'Salaire 3 200 € + 3 %', calcul: '3200 × 1,03', resultat: '3 296 €' },
      { situation: 'Loyer 800 € + 5 %', calcul: '800 × 1,05', resultat: '840 €' },
      { situation: 'Prix 89 € − 30 %', calcul: '89 × 0,7', resultat: '62,30 €' },
      { situation: '15 % de 2 800 €', calcul: '2800 × 0,15', resultat: '420 €' },
    ],
  },

  faq: [
    {
      q: 'Comment calculer un pourcentage d’augmentation ?',
      a: "Formule : ((nouveau - ancien) / ancien) × 100. Exemple : passer de 2 500 € à 2 750 € correspond à (250/2500) × 100 = 10 % d'augmentation.",
    },
    {
      q: 'Comment appliquer un pourcentage à un salaire ?',
      a: "Multiplie le salaire par (1 + taux/100). Pour 3 200 € + 3 % : 3 200 × 1,03 = 3 296 €. Pour une baisse, utilise (1 - taux/100).",
    },
    {
      q: 'Pourquoi 10 % brut ne donne pas 10 % net ?',
      a: "Les cotisations sociales et le prélèvement à la source ne sont pas linéaires : ils s'appliquent par tranches. Une augmentation brute de 10 % se traduit en moyenne par +7,5 % de net, voire moins si tu franchis un palier d'imposition.",
    },
    {
      q: 'Comment calculer une remise commerciale ?',
      a: "Prix final = prix initial × (1 - remise/100). Pour 89 € avec -30 % : 89 × 0,7 = 62,30 €. Tu économises 26,70 €.",
    },
  ],

  related: ['brut-net-cadre', 'indemnites-licenciement', 'auto-entrepreneur-brut-net'],
};
