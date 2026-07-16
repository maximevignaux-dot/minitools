import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const SMIC_NET_MENSUEL = 1426;

const TAUX: Record<string, Record<string, number>> = {
  classique: { '1': 0.135, '2': 0.115, '3': 0.1, '4': 0.085, '5': 0.077, '6': 0.07 },
  alternee: { '1': 0.095, '2': 0.08, '3': 0.068, '4': 0.06, '5': 0.054, '6': 0.05 },
  reduite: { '1': 0.18, '2': 0.155, '3': 0.135, '4': 0.118, '5': 0.108, '6': 0.1 },
};

const LABELS_GARDE: Record<string, string> = {
  classique: 'Droit de visite classique (1 weekend/2 + moitié vacances)',
  alternee: 'Garde alternée (1 semaine sur 2)',
  reduite: 'Droit de visite réduit (occasionnel)',
};

export const pensionAlimentaire: Tool = {
  slug: 'pension-alimentaire',
  category: 'salaire',
  h1: 'Pension alimentaire : barème indicatif 2026',
  metaTitle: 'Pension alimentaire 2026 — calcul selon barème indicatif Justice',
  metaDescription:
    'Estime la pension alimentaire selon le barème indicatif du Ministère de la Justice : revenus, nombre d’enfants, type de garde.',
  intro:
    'Quelle pension alimentaire prévoir après une séparation ? Le Ministère de la Justice publie un barème indicatif basé sur les revenus du parent débiteur et le type de garde. Cet outil applique ce barème — le juge garde un pouvoir d’appréciation.',
  keywords: ['pension alimentaire', 'barème', 'divorce', 'garde alternée', 'contribution éducation', 'JAF'],
  lastmod: '2026-05-14',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'Pour 1 enfant en garde classique avec un parent débiteur à 2 500 € net, le barème indicatif donne environ 145 €/mois (13,5 % du revenu après SMIC). En garde alternée : ~100 €/mois.',

  keyTakeaways: [
    'Base de calcul : (revenu net débiteur − SMIC net) × pourcentage selon enfants et garde.',
    'Le SMIC net (~1 426 € en 2026) est déduit avant application du pourcentage — c’est le "minimum vital".',
    'Garde classique 1 enfant : 13,5 % ; 2 enfants : 11,5 % par enfant ; alternée : moitié de la classique.',
    'Le juge aux affaires familiales (JAF) reste souverain — le barème est purement indicatif.',
  ],

  howTo: [
    {
      name: 'Saisis le revenu net du parent débiteur',
      text: 'Salaire net mensuel + tous revenus complémentaires (rentes, allocations, revenus locatifs).',
    },
    {
      name: 'Indique le nombre d’enfants concernés',
      text: 'Tous les enfants du couple à charge — la pension est divisée si la situation est globale.',
    },
    {
      name: 'Choisis le type de garde',
      text: 'Classique (résidence principale chez un parent), alternée (50/50) ou réduite (visite occasionnelle).',
    },
    {
      name: 'Lis la pension indicative',
      text: 'L’outil applique le barème officiel. Le JAF peut s’en écarter selon les besoins réels de l’enfant.',
    },
  ],

  useCases: [
    {
      title: 'Préparer une médiation familiale',
      description: 'Avoir une base chiffrée objective évite les discussions stériles sur le montant juste.',
    },
    {
      title: 'Vérifier une proposition de l’autre parent',
      description: 'Compare la somme proposée au barème pour identifier un écart trop fort.',
    },
    {
      title: 'Anticiper l’audience devant le JAF',
      description: 'Préparer ton dossier avec une estimation chiffrée crédible facilite l’audition.',
    },
    {
      title: 'Simuler une garde alternée vs classique',
      description: 'Le type de garde change le pourcentage — utile pour discuter des modalités globales.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre barème et obligation légale',
      description: 'Le barème indicatif n’a aucune valeur contraignante. Le JAF décide souverainement selon les besoins de l’enfant et les ressources des parents.',
    },
    {
      title: 'Oublier les autres frais',
      description: 'La pension couvre les besoins courants. Les frais exceptionnels (santé, scolarité privée, voyages scolaires) se partagent en plus, généralement 50/50.',
    },
    {
      title: 'Sous-estimer la dimension fiscale',
      description: 'La pension est déductible des revenus du parent qui la verse et imposable chez celui qui la perçoit. Impact non négligeable sur la TMI des deux côtés.',
    },
    {
      title: 'Croire que la pension cesse à 18 ans',
      description: 'L’obligation alimentaire perdure tant que l’enfant n’est pas autonome financièrement — souvent jusqu’à la fin des études supérieures.',
    },
  ],

  sources: [
    {
      label: 'Ministère de la Justice — Barème indicatif',
      url: 'https://www.justice.fr/simulateurs/pensions',
    },
    {
      label: 'Service-Public.fr — Pension alimentaire',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F1196',
    },
    {
      label: 'Code civil — Article 371-2 (obligation alimentaire)',
      url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006426510/',
    },
  ],

  inputs: [
    {
      id: 'revenu',
      label: 'Revenu net mensuel du parent débiteur',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 2500,
      min: 0,
      step: 50,
    },
    {
      id: 'enfants',
      label: 'Nombre d’enfants concernés',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: '1 enfant' },
        { value: '2', label: '2 enfants' },
        { value: '3', label: '3 enfants' },
        { value: '4', label: '4 enfants' },
        { value: '5', label: '5 enfants' },
        { value: '6', label: '6 enfants et plus' },
      ],
    },
    {
      id: 'garde',
      label: 'Type de droit de visite / garde',
      type: 'select',
      defaultValue: 'classique',
      options: Object.entries(LABELS_GARDE).map(([value, label]) => ({ value, label })),
    },
  ],

  compute: (values) => {
    const revenu = Math.max(0, Number(values.revenu) || 0);
    const nbEnfants = String(values.enfants);
    const garde = String(values.garde);

    const baseImposable = Math.max(0, revenu - SMIC_NET_MENSUEL);
    const taux = (TAUX[garde] ?? TAUX.classique)[nbEnfants] ?? 0.1;
    const pensionParEnfant = baseImposable * taux;
    const nbEnfantsNum = parseInt(nbEnfants, 10) || 1;
    const pensionTotale = pensionParEnfant * nbEnfantsNum;

    return {
      primary: {
        label: 'Pension mensuelle indicative (totale)',
        value: pensionTotale,
        unit: '€',
        formatted: formatEuros(pensionTotale),
      },
      secondary: [
        { label: 'Pension par enfant', value: pensionParEnfant, unit: '€', formatted: formatEuros(pensionParEnfant) },
        { label: 'Base de calcul (revenu − SMIC net)', value: baseImposable, unit: '€', formatted: formatEuros(baseImposable) },
        { label: 'Taux appliqué', value: taux, unit: '%', formatted: formatPercent(taux) },
        { label: 'Type de garde', value: 0, unit: '', formatted: LABELS_GARDE[garde] ?? '' },
      ],
      notes: [
        'Estimation strictement indicative selon le barème du Ministère de la Justice. Le juge aux affaires familiales reste seul compétent pour fixer le montant définitif.',
        'Hors frais exceptionnels (santé, scolarité spécifique, voyages) qui se partagent généralement 50/50 en plus.',
        'La pension est revalorisée chaque année selon l’INSEE — pense à l’indexer.',
      ],
    };
  },

  explanation: `La **pension alimentaire** (légalement appelée *contribution à l'entretien et à l'éducation des enfants*) est due par le parent qui n'a pas la résidence habituelle de l'enfant, ou en cas de différence de revenus marquée en garde alternée.

**Le barème indicatif du Ministère de la Justice** fournit une référence objective :

\`\`\`
pension = (revenu net débiteur − SMIC net) × pourcentage
\`\`\`

**Pourcentages par enfant** (barème 2026) :

| Enfants | Visite classique | Garde alternée | Visite réduite |
|---------|------------------|----------------|----------------|
| 1       | 13,5 %           | 9,5 %          | 18 %           |
| 2       | 11,5 %           | 8 %            | 15,5 %         |
| 3       | 10 %             | 6,8 %          | 13,5 %         |
| 4       | 8,5 %            | 6 %            | 11,8 %         |

**Exemple — 2 500 € net, 1 enfant, garde classique** :
- Base : 2 500 − 1 426 = 1 074 €
- Pension : 1 074 × 13,5 % = **~145 €/mois**

**Limites du barème** :
- Il s'agit d'une **recommandation**, pas d'une obligation légale.
- Le **juge aux affaires familiales (JAF)** reste seul décideur — il peut s'écarter du barème selon :
  - Les besoins spécifiques de l'enfant (santé, scolarité)
  - Les ressources réelles du parent créancier (et non plus seulement le débiteur)
  - Les charges propres de chaque parent (loyer, prêts en cours)
- En cas d'accord amiable, le couple peut fixer un montant différent — validé en homologation par le JAF.

**Fiscalité** :
- La pension est **déductible** du revenu imposable du parent qui la verse.
- Elle est **imposable** chez le parent qui la perçoit (catégorie pensions).
- Impact significatif sur la TMI des deux côtés — à intégrer dans la négociation.

**Évolutions automatiques** : la pension est **indexée chaque année** sur l'indice INSEE des prix à la consommation. Pense à l'actualiser dans ton accord.

**Durée** : la pension perdure tant que l'enfant n'est pas autonome — souvent jusqu'à la fin des études supérieures (~25 ans en moyenne), pas à 18 ans automatiquement.`,

  examples: {
    columns: [
      { key: 'revenu', label: 'Revenu débiteur' },
      { key: 'enfants', label: 'Enfants' },
      { key: 'garde', label: 'Garde' },
      { key: 'pension', label: 'Pension totale / mois' },
    ],
    rows: [
      { revenu: '1 800 €', enfants: '1', garde: 'Classique', pension: '~50 €' },
      { revenu: '2 500 €', enfants: '1', garde: 'Classique', pension: '~145 €' },
      { revenu: '2 500 €', enfants: '1', garde: 'Alternée', pension: '~102 €' },
      { revenu: '3 500 €', enfants: '2', garde: 'Classique', pension: '~477 €' },
      { revenu: '5 000 €', enfants: '3', garde: 'Classique', pension: '~1 072 €' },
    ],
  },

  faq: [
    {
      q: 'Le barème de la Justice est-il obligatoire ?',
      a: "Non. Il s'agit d'un barème indicatif publié pour orienter parents et juges. Le juge aux affaires familiales conserve un pouvoir d'appréciation et peut s'écarter du barème selon les ressources, charges et besoins spécifiques de chaque famille.",
    },
    {
      q: 'Comment est calculée la pension en garde alternée ?',
      a: "En garde alternée 50/50, la pension est généralement réduite (taux divisé par ~1,4 par rapport à la garde classique). Si les revenus des parents sont équivalents, une pension nulle est possible. Si écart significatif, le parent au revenu supérieur verse au moins une compensation.",
    },
    {
      q: 'La pension est-elle imposable ?',
      a: "Oui pour celui qui la perçoit (catégorie pensions, imposée au barème progressif). Elle est déductible des revenus du parent qui la verse, ce qui réduit son impôt. L'effet fiscal cumulé varie selon les TMI des deux parents.",
    },
    {
      q: 'Quand peut-on réviser la pension ?',
      a: "À tout moment en cas de changement significatif : modification des revenus, déménagement, charge d'un nouveau parent, scolarité spéciale, etc. Il faut saisir le JAF ou trouver un accord amiable homologué. Sans révision officielle, l'indexation INSEE annuelle s'applique automatiquement.",
    },
  ],

  related: ['brut-net-cadre', 'calcul-impot-revenu', 'indemnites-licenciement'],
};
