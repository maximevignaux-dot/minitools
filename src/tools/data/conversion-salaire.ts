import type { Tool } from '@/types/tool';
import { formatEuros } from '@/lib/format';

const HEURES_MOIS = 151.67;
const JOURS_AN_OUVRES = 218;

const MODES: Record<string, { label: string }> = {
  annuel: { label: 'Je connais mon salaire annuel' },
  mensuel: { label: 'Je connais mon salaire mensuel' },
  horaire: { label: 'Je connais mon taux horaire' },
  journalier: { label: 'Je connais mon TJM (journalier)' },
};

export const conversionSalaire: Tool = {
  slug: 'conversion-salaire',
  category: 'salaire',
  h1: 'Conversion salaire annuel ↔ mensuel ↔ horaire',
  metaTitle: 'Conversion salaire annuel mensuel horaire — calculateur 2026',
  metaDescription:
    'Convertis ton salaire entre annuel, mensuel, taux horaire et journalier (TJM). Basé sur 151,67 h/mois et 218 jours ouvrés/an.',
  intro:
    'Quel est ton salaire annuel à partir de ton mensuel ? Ton TJM à partir de ton horaire ? Choisis ce que tu connais, saisis le montant : l’outil convertit dans toutes les unités courantes.',
  keywords: ['conversion salaire', 'taux horaire', 'tjm', 'salaire mensuel', 'salaire annuel'],
  lastmod: '2026-05-14',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'Conventions standard : 151,67 h/mois (35 h × 52 / 12), 218 jours ouvrés/an. Un salaire annuel de 30 000 € équivaut à 2 500 €/mois, ~16,48 €/heure ou ~138 €/jour.',

  keyTakeaways: [
    'Mensuel = annuel / 12 (sauf 13ᵉ mois ou primes contractuelles à isoler).',
    'Horaire = mensuel / 151,67 (durée légale 35 h/semaine, 52 semaines, 12 mois).',
    'Journalier = annuel / 218 (jours ouvrés moyens en France, congés et fériés déduits).',
    'Pour passer du brut au net, retire ~22 % (non-cadre) à 25 % (cadre) de cotisations.',
  ],

  howTo: [
    {
      name: 'Choisis ce que tu connais',
      text: 'Annuel, mensuel, horaire ou journalier (TJM).',
    },
    {
      name: 'Saisis le montant',
      text: 'En euros — brut ou net selon ce qui t’intéresse (l’outil ne convertit pas brut → net).',
    },
    {
      name: 'Lis toutes les autres unités',
      text: 'L’outil calcule les 3 autres déclinaisons + équivalent annuel sur 12, 13 et 14 mois.',
    },
  ],

  useCases: [
    {
      title: 'Négocier ton salaire à l’embauche',
      description: 'Passer rapidement d’une offre annuelle au mensuel pour visualiser l’impact réel.',
    },
    {
      title: 'Comparer offre CDI vs freelance',
      description: 'Convertir un salaire brut annuel en TJM équivalent pour benchmarker.',
    },
    {
      title: 'Fixer un tarif horaire',
      description: 'Connaître l’équivalent horaire de ton salaire pour facturer prestations et heures sup.',
    },
    {
      title: 'Anticiper l’impact d’un 13ᵉ mois',
      description: 'Comparer le mensuel sur 12 vs 13 mois pour évaluer la prime annuelle.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre 35 h et 39 h',
      description: 'La durée légale est 35 h, mais beaucoup de contrats sont en 39 h avec RTT. Le taux horaire dépend de ce qui est inscrit au contrat.',
    },
    {
      title: 'Oublier les primes annuelles',
      description: 'Le mensuel × 12 ne reflète pas un salaire avec 13ᵉ mois, prime de vacances ou intéressement. Isole ces éléments pour comparer correctement.',
    },
    {
      title: 'Confondre brut et net',
      description: 'Cet outil convertit dans la même nature (brut ou net). Pour passer de l’un à l’autre, utilise notre [calculateur brut net](/salaire/brut-net-cadre).',
    },
    {
      title: 'Sous-estimer les jours non travaillés',
      description: '365 − week-ends − fériés − congés payés = ~218 jours ouvrés. Ne divise pas par 365 ni par 250.',
    },
  ],

  sources: [
    {
      label: 'Service-Public.fr — Durée légale du travail',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F990',
    },
    {
      label: 'Code du travail — Article L3121-27',
      url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020376/',
    },
  ],

  inputs: [
    {
      id: 'mode',
      label: 'Type de salaire connu',
      type: 'select',
      defaultValue: 'annuel',
      options: Object.entries(MODES).map(([value, m]) => ({ value, label: m.label })),
    },
    {
      id: 'montant',
      label: 'Montant',
      type: 'number',
      unit: '€',
      defaultValue: 30000,
      min: 0,
      step: 100,
    },
  ],

  compute: (values) => {
    const mode = String(values.mode);
    const montant = Math.max(0, Number(values.montant) || 0);

    let annuel: number;
    if (mode === 'annuel') annuel = montant;
    else if (mode === 'mensuel') annuel = montant * 12;
    else if (mode === 'horaire') annuel = montant * HEURES_MOIS * 12;
    else annuel = montant * JOURS_AN_OUVRES;

    const mensuel = annuel / 12;
    const mensuel13 = annuel / 13;
    const mensuel14 = annuel / 14;
    const horaire = mensuel / HEURES_MOIS;
    const journalier = annuel / JOURS_AN_OUVRES;

    return {
      primary: {
        label: 'Salaire annuel équivalent',
        value: annuel,
        unit: '€',
        formatted: formatEuros(annuel),
      },
      secondary: [
        { label: 'Salaire mensuel (sur 12 mois)', value: mensuel, unit: '€', formatted: formatEuros(mensuel) },
        { label: 'Salaire mensuel (sur 13 mois)', value: mensuel13, unit: '€', formatted: formatEuros(mensuel13) },
        { label: 'Salaire mensuel (sur 14 mois)', value: mensuel14, unit: '€', formatted: formatEuros(mensuel14) },
        { label: 'Taux horaire (35 h/sem.)', value: horaire, unit: '€', formatted: `${horaire.toFixed(2)} €/h` },
        { label: 'Journalier (218 j ouvrés)', value: journalier, unit: '€', formatted: `${journalier.toFixed(2)} €/jour` },
      ],
      notes: [
        'Conventions standard : durée légale 35 h/semaine, 218 jours ouvrés/an (après congés et fériés).',
        'Cet outil convertit dans la même nature (brut → brut, net → net). Pour brut ↔ net, utilise l’outil dédié.',
      ],
    };
  },

  explanation: `Quatre unités courantes coexistent pour exprimer un salaire en France : **annuel**, **mensuel**, **horaire** et **journalier (TJM)**. Voici les conventions standard pour passer de l'une à l'autre.

**Conversions de référence** :
- **Annuel → mensuel** : ÷ 12
- **Mensuel → horaire** : ÷ 151,67 (35 h × 52 / 12)
- **Annuel → journalier** : ÷ 218 (jours ouvrés moyens en France)
- **Horaire → annuel** : × 151,67 × 12 ≈ × 1 820

**Pourquoi 151,67 heures par mois ?**
La durée légale est 35 heures/semaine. En multipliant par 52 semaines et en divisant par 12 mois, on obtient **151,67 heures de travail mensuel théoriques** — c'est la base inscrite sur ta fiche de paie.

**Pourquoi 218 jours ouvrés ?**
365 jours − 104 week-ends − 8 jours fériés tombant en semaine en moyenne − 25 jours de congés payés = **228 jours**. Auxquels on retire généralement 10 jours pour formations, RTT, maladie : on tombe à **218 jours réellement travaillés**.

**Exemple — 30 000 € brut annuel** :
- Mensuel (12 mois) : **2 500 €**
- Mensuel (13 mois) : **2 308 €**
- Taux horaire : **16,48 €/h**
- TJM brut : **137,61 €/jour**

**Brut vs net** : cet outil convertit dans la même nature. Pour passer du brut au net (retirer cotisations + PAS), voir notre [calculateur brut → net](/salaire/brut-net-cadre).

**TJM freelance** : pour un freelance, le TJM se calcule différemment. Compte 180-220 jours **facturables** (pas 218), pour absorber prospection, congés non payés et formation. Voir [Combien je gagne en freelance](/revenus/combien-je-gagne-freelance).`,

  examples: {
    columns: [
      { key: 'annuel', label: 'Annuel' },
      { key: 'mensuel', label: 'Mensuel (×12)' },
      { key: 'horaire', label: 'Taux horaire' },
      { key: 'journalier', label: 'Journalier' },
    ],
    rows: [
      { annuel: '21 600 €', mensuel: '1 800 €', horaire: '11,87 €/h', journalier: '99 €' },
      { annuel: '30 000 €', mensuel: '2 500 €', horaire: '16,48 €/h', journalier: '138 €' },
      { annuel: '45 000 €', mensuel: '3 750 €', horaire: '24,72 €/h', journalier: '206 €' },
      { annuel: '60 000 €', mensuel: '5 000 €', horaire: '32,96 €/h', journalier: '275 €' },
      { annuel: '100 000 €', mensuel: '8 333 €', horaire: '54,94 €/h', journalier: '459 €' },
    ],
  },

  faq: [
    {
      q: 'Pourquoi 151,67 h/mois et pas 140 h ?',
      a: "Parce qu'un salaire mensualisé est lissé sur l'année : 35 h/semaine × 52 semaines = 1 820 h/an, divisées par 12 = 151,67 h/mois. C'est la convention française pour le calcul du taux horaire à partir d'un salaire mensuel.",
    },
    {
      q: 'Comment convertir un TJM en salaire annuel ?',
      a: "Multiplie le TJM par le nombre de jours travaillés/an. En CDI standard : ~218 jours. En freelance : 180-220 jours facturables réels (selon ton taux d'occupation).",
    },
    {
      q: 'Le mensuel sur 13 mois change-t-il l’annuel ?',
      a: "Non. Si ton contrat indique 30 000 € brut annuel sur 13 mois, ton mensuel est 30 000 / 13 = 2 308 € (vs 2 500 € sur 12 mois). L'annuel reste le même, le mois supplémentaire (souvent versé en décembre) est inclus.",
    },
    {
      q: 'Comment se compare un salarié à 50 k€ et un freelance ?',
      a: "Pour 50 000 € brut/an d'un salarié, un freelance doit viser ~500-600 € de TJM sur 200 jours facturés pour un net équivalent (après cotisations et absence de congés payés). Voir le comparatif [salarié vs freelance](/comparatifs/salarie-vs-freelance).",
    },
  ],

  related: ['brut-net-cadre', 'combien-je-gagne-freelance', 'calcul-augmentation-salaire'],
};
