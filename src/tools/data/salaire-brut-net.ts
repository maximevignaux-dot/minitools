import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const STATUTS: Record<string, { rate: number; label: string }> = {
  nonCadre: { rate: 0.22, label: 'Salarié non-cadre (privé)' },
  cadre: { rate: 0.25, label: 'Salarié cadre (privé)' },
  public: { rate: 0.15, label: 'Fonction publique' },
};

export const salaireBrutNet: Tool = {
  slug: 'brut-net-cadre',
  category: 'salaire',
  h1: 'Salaire brut → net (cadre, non-cadre, public)',
  metaTitle: 'Salaire brut net : calculateur 2026 (cadre, non-cadre)',
  metaDescription:
    'Convertis ton salaire brut en net 2026. Cadre, non-cadre ou public, avec ou sans prélèvement à la source. Gratuit, instantané.',
  intro:
    'Combien te reste-t-il vraiment chaque mois ? Saisis ton salaire brut, choisis ton statut et ton taux de prélèvement à la source pour obtenir ton net réel viré sur ton compte.',
  keywords: ['salaire', 'brut', 'net', 'cadre', 'non-cadre', 'prélèvement à la source', 'cotisations'],
  lastmod: '2026-05-08',
  priority: 0.9,
  schemaType: 'SoftwareApplication',

  tldr: 'Pour un salaire brut, retire environ 22 % de cotisations (non-cadre), 25 % (cadre) ou 15 % (public). Le prélèvement à la source vient ensuite réduire ton net à payer.',

  keyTakeaways: [
    'Un cadre touche ~3 % de net en moins qu’un non-cadre à brut égal (cotisation APEC + AGIRC-ARRCO).',
    'Le prélèvement à la source ne change pas ton net imposable — il ne s’applique qu’au virement final.',
    'Mutuelle d’entreprise, conventions collectives et exonérations bas-salaires font varier le résultat de ±2 %.',
    'Pour passer du net au brut : brut ≈ net ÷ (1 − taux cotisations).',
  ],

  howTo: [
    {
      name: 'Saisis ton salaire brut mensuel',
      text: 'C’est le montant indiqué tout en haut de ta fiche de paie, avant toute déduction.',
    },
    {
      name: 'Choisis ton statut',
      text: 'Cadre, non-cadre privé ou fonction publique. Le taux de cotisations applicable change selon le statut.',
    },
    {
      name: 'Indique ton taux de prélèvement à la source',
      text: 'Il figure sur ta dernière fiche de paie ou sur ton espace impots.gouv.fr (0 % si non imposable).',
    },
    {
      name: 'Lis ton net mensuel viré',
      text: 'L’outil affiche ton net après impôt, ainsi que le détail des cotisations et le brut/net annuel.',
    },
  ],

  useCases: [
    {
      title: 'Négocier ton salaire à l’embauche',
      description: 'Convertis l’offre annoncée en brut pour visualiser ton net réel avant de signer.',
    },
    {
      title: 'Comparer deux offres cadre vs non-cadre',
      description: 'À brut équivalent, le statut cadre baisse ton net mensuel mais améliore la retraite complémentaire.',
    },
    {
      title: 'Préparer un changement de taux PAS',
      description: 'Simule l’impact d’un nouveau taux de prélèvement à la source sur ton virement mensuel.',
    },
    {
      title: 'Calculer ton revenu annuel avec 13ᵉ mois',
      description: 'Bascule sur 13 ou 14 mois pour voir l’effet d’une prime contractuelle sur ton revenu annuel.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre net imposable et net à payer',
      description: 'Le net imposable sert de base à l’impôt ; le net à payer est ce qui arrive sur ton compte (déjà amputé du PAS).',
    },
    {
      title: 'Oublier la mutuelle d’entreprise obligatoire',
      description: 'Elle ampute généralement 0,5 à 1,5 % du brut. Vérifie sur ta fiche de paie la ligne "complémentaire santé".',
    },
    {
      title: 'Saisir un mauvais taux de prélèvement à la source',
      description: 'Le taux personnalisé évolue chaque septembre. Si tu utilises un taux périmé, l’estimation finale est faussée.',
    },
    {
      title: 'Comparer un brut sans prime à un net annuel avec prime',
      description: 'Le 13ᵉ mois et les primes ponctuelles gonflent ton net annuel sans changer le net mensuel hors prime — sois cohérent dans la base de comparaison.',
    },
  ],

  sources: [
    {
      label: 'URSSAF — Taux de cotisations 2026',
      url: 'https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations.html',
    },
    {
      label: 'Service-Public.fr — Bulletin de paie',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F559',
    },
    {
      label: 'impots.gouv.fr — Prélèvement à la source',
      url: 'https://www.impots.gouv.fr/particulier/le-prelevement-la-source-en-2024',
    },
  ],

  inputs: [
    {
      id: 'brut',
      label: 'Salaire brut mensuel',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 3500,
      min: 0,
      step: 100,
    },
    {
      id: 'statut',
      label: 'Statut',
      type: 'select',
      defaultValue: 'cadre',
      options: Object.entries(STATUTS).map(([value, s]) => ({ value, label: s.label })),
    },
    {
      id: 'pas',
      label: 'Taux de prélèvement à la source',
      type: 'number',
      unit: '%',
      defaultValue: 0,
      min: 0,
      max: 45,
      step: 0.1,
      help: 'Taux personnalisé indiqué sur ta dernière fiche de paie (0 si non imposable).',
    },
    {
      id: 'mois',
      label: 'Nombre de mois de salaire',
      type: 'select',
      defaultValue: '12',
      options: [
        { value: '12', label: '12 mois (sans prime)' },
        { value: '13', label: '13 mois (13ᵉ mois)' },
        { value: '14', label: '14 mois (13ᵉ + 14ᵉ)' },
      ],
    },
  ],

  compute: (values) => {
    const brut = Number(values.brut) || 0;
    const statut = STATUTS[String(values.statut)] ?? STATUTS.cadre;
    const pasRate = Math.max(0, Math.min(45, Number(values.pas) || 0)) / 100;
    const mois = Number(values.mois) || 12;

    const cotisations = brut * statut.rate;
    const netAvantImpot = brut - cotisations;
    const impot = netAvantImpot * pasRate;
    const netApresImpot = netAvantImpot - impot;

    const annuelBrut = brut * mois;
    const annuelNet = netApresImpot * mois;

    return {
      primary: {
        label: 'Net mensuel viré sur ton compte',
        value: netApresImpot,
        unit: '€',
        formatted: formatEuros(netApresImpot),
      },
      secondary: [
        { label: 'Net avant impôt', value: netAvantImpot, unit: '€', formatted: formatEuros(netAvantImpot) },
        { label: 'Cotisations salariales', value: cotisations, unit: '€', formatted: formatEuros(cotisations) },
        { label: 'Prélèvement à la source', value: impot, unit: '€', formatted: formatEuros(impot) },
        { label: 'Taux cotisations', value: statut.rate, unit: '%', formatted: formatPercent(statut.rate) },
        { label: 'Brut annuel', value: annuelBrut, unit: '€', formatted: formatEuros(annuelBrut) },
        { label: 'Net annuel', value: annuelNet, unit: '€', formatted: formatEuros(annuelNet) },
      ],
      notes: [
        'Estimation moyenne 2026. Les taux exacts varient selon ta convention collective, ta mutuelle d’entreprise et tes éventuels avantages.',
        'Hors tickets restaurant, primes variables, intéressement et participation.',
      ],
    };
  },

  explanation: `La conversion **brut → net** dépend essentiellement de ton **statut** : les cadres cotisent davantage que les non-cadres (notamment retraite complémentaire AGIRC-ARRCO et APEC), les fonctionnaires beaucoup moins.

**Taux moyens de cotisations salariales 2026** (en % du brut) :
- **Non-cadre privé** : ~22 % (sécurité sociale, retraite de base, AGIRC-ARRCO, chômage, CSG/CRDS, mutuelle)
- **Cadre privé** : ~25 % (idem + tranches AGIRC-ARRCO supérieures + APEC + prévoyance cadre)
- **Fonction publique** : ~15 % (pas de chômage, retraite par capitalisation publique, CSG)

**Net imposable vs net à payer** : ton bulletin de paie distingue le **net imposable** (base de l'impôt) et le **net à payer** (viré sur ton compte). La CSG non-déductible et la CRDS sont incluses dans le net à payer mais retirées du brut pour le net imposable.

**Prélèvement à la source** : un taux **personnalisé** est calculé chaque année par les impôts à partir de tes revenus N-2. Tu peux le moduler depuis ton espace impots.gouv.fr (taux individualisé pour les couples, neutre pour les nouveaux embauchés).

**Exemple** — 3 500 € brut, cadre, taux PAS 8 % :
- Cotisations : 875 €
- Net avant impôt : 2 625 €
- PAS : 210 €
- **Net viré : 2 415 €**

**13ᵉ et 14ᵉ mois** : ils sont imposés et cotisés comme un mois normal — bonne nouvelle pour ton net annuel, mais ils n'augmentent pas ton revenu mensuel.`,

  examples: {
    columns: [
      { key: 'profile', label: 'Profil' },
      { key: 'brut', label: 'Brut mensuel' },
      { key: 'avant', label: 'Net avant impôt' },
      { key: 'apres', label: 'Net après impôt (PAS 8 %)' },
    ],
    rows: [
      { profile: 'Smic 2026 (non-cadre)', brut: '1 802 €', avant: '1 405 €', apres: '1 293 €' },
      { profile: 'Junior cadre', brut: '2 800 €', avant: '2 100 €', apres: '1 932 €' },
      { profile: 'Cadre confirmé', brut: '4 500 €', avant: '3 375 €', apres: '3 105 €' },
      { profile: 'Fonctionnaire B', brut: '2 500 €', avant: '2 125 €', apres: '1 955 €' },
    ],
  },

  faq: [
    {
      q: 'Quelle différence cadre / non-cadre sur le net ?',
      a: "Pour un même brut, un cadre touche environ **3 % de moins** qu'un non-cadre, en raison de la cotisation APEC et des taux AGIRC-ARRCO plus élevés sur la tranche 2. En contrepartie, sa retraite complémentaire est plus généreuse.",
    },
    {
      q: 'Le prélèvement à la source change-t-il le net imposable ?',
      a: "Non. Le PAS est prélevé sur le **net à payer**, pas sur le net imposable. Ton net imposable reste identique, c'est ton virement final qui baisse.",
    },
    {
      q: 'Pourquoi le calcul ne correspond pas exactement à ma fiche de paie ?',
      a: "Les taux varient selon ta **convention collective**, ta **mutuelle d'entreprise** (souvent ~1 % du brut), tes avantages en nature (voiture, logement) et les exonérations bas-salaires (Fillon). Cet outil donne une estimation à ±2 %.",
    },
    {
      q: 'Comment est calculé le brut depuis le net ?',
      a: "Inversement : net / (1 − taux cotisations). Pour un cadre visant 3 000 € net (avant impôt), il faut un brut d'environ 4 000 €.",
    },
  ],

  related: ['auto-entrepreneur-brut-net', 'combien-je-gagne-freelance', 'capacite-emprunt'],
};
