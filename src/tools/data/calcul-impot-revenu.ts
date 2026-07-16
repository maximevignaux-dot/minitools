import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const TRANCHES = [
  { plafond: 11497, taux: 0 },
  { plafond: 29315, taux: 0.11 },
  { plafond: 83823, taux: 0.3 },
  { plafond: 180294, taux: 0.41 },
  { plafond: Infinity, taux: 0.45 },
];

function impotParPart(revenuParPart: number): number {
  let impot = 0;
  let precedent = 0;
  for (const t of TRANCHES) {
    if (revenuParPart > precedent) {
      const base = Math.min(revenuParPart, t.plafond) - precedent;
      impot += base * t.taux;
      precedent = t.plafond;
    } else break;
  }
  return impot;
}

function tmiParPart(revenuParPart: number): number {
  let tmi = 0;
  for (const t of TRANCHES) {
    if (revenuParPart > 0 && revenuParPart <= t.plafond) {
      tmi = t.taux;
      break;
    }
    tmi = t.taux;
  }
  return tmi;
}

export const calculImpotRevenu: Tool = {
  slug: 'calcul-impot-revenu',
  category: 'salaire',
  h1: 'Calcul de l’impôt sur le revenu 2026',
  metaTitle: 'Calcul impôt sur le revenu 2026 — simulateur barème + parts',
  metaDescription:
    'Calcule ton impôt sur le revenu 2026 selon le barème progressif et ton quotient familial. Tranches, TMI, taux moyen et net après impôt.',
  intro:
    'Combien d’impôt sur le revenu vas-tu payer ? Saisis ton revenu net imposable annuel et le nombre de parts de ton foyer : tu obtiens ton impôt, ta tranche marginale (TMI) et ton taux moyen d’imposition.',
  keywords: ['impôt sur le revenu', 'barème 2026', 'tranches', 'quotient familial', 'tmi', 'parts fiscales'],
  lastmod: '2026-05-14',
  priority: 0.95,
  schemaType: 'SoftwareApplication',

  tldr: 'Pour 35 000 € de revenu imposable en célibataire (1 part), tu paies environ 3 500 € d’impôt, soit une TMI de 30 % mais un taux moyen de seulement ~10 %.',

  keyTakeaways: [
    'Barème 2026 progressif : 0 %, 11 %, 30 %, 41 %, 45 % par tranches de revenu.',
    'Le quotient familial divise ton revenu par le nombre de parts avant d’appliquer le barème.',
    'TMI ≠ taux moyen : la TMI est le taux de ta dernière tranche, le taux moyen est l’impôt total / revenu.',
    'Seule la fraction de revenu dans chaque tranche est taxée à son taux — passer un palier n’augmente pas tout ton impôt.',
  ],

  howTo: [
    {
      name: 'Saisis ton revenu net imposable',
      text: 'C’est ton revenu après l’abattement de 10 % (frais pro) ou tes frais réels. Visible sur ta fiche de paie annuelle ou ta déclaration.',
    },
    {
      name: 'Indique le nombre de parts fiscales',
      text: '1 part (célibataire), 2 (couple), +0,5 par enfant (1er et 2e), +1 à partir du 3e enfant.',
    },
    {
      name: 'Lis ton impôt et tes taux',
      text: 'L’outil affiche l’impôt total, ta TMI, ton taux moyen et ton revenu net après impôt.',
    },
  ],

  useCases: [
    {
      title: 'Anticiper ton solde d’impôt',
      description: 'Compare l’impôt estimé à ce que tu as déjà payé via le prélèvement à la source.',
    },
    {
      title: 'Mesurer l’impact d’une augmentation',
      description: 'Vois combien d’une hausse de salaire part réellement en impôt selon ta TMI.',
    },
    {
      title: 'Optimiser via un PER',
      description: 'Estime l’économie d’impôt d’un versement PER déduit de ton revenu imposable.',
    },
    {
      title: 'Comparer l’imposition couple vs séparé',
      description: 'Teste 1 vs 2 parts pour visualiser l’effet du quotient conjugal.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre TMI et taux moyen',
      description: 'Une TMI à 30 % ne veut pas dire que tu paies 30 % de tes revenus. Ton taux moyen est bien plus bas car les premières tranches sont à 0 % et 11 %.',
    },
    {
      title: 'Croire qu’un palier augmente tout l’impôt',
      description: 'Passer dans la tranche 30 % ne taxe à 30 % que la part au-dessus du seuil, pas tout ton revenu. Tu ne perds jamais d’argent à gagner plus.',
    },
    {
      title: 'Oublier l’abattement de 10 %',
      description: 'Le revenu imposable est ton salaire net APRÈS abattement de 10 % (ou frais réels). Ne saisis pas ton brut.',
    },
    {
      title: 'Ignorer la décote et les crédits d’impôt',
      description: 'Cet outil calcule l’impôt brut. La décote (revenus modestes), les réductions et crédits d’impôt (dons, garde d’enfant, emploi à domicile) peuvent fortement baisser le montant final.',
    },
  ],

  sources: [
    {
      label: 'impots.gouv.fr — Barème de l’impôt sur le revenu',
      url: 'https://www.impots.gouv.fr/particulier/questions/comment-calculer-mon-impot',
    },
    {
      label: 'Service-Public.fr — Quotient familial',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F1419',
    },
  ],

  inputs: [
    {
      id: 'revenu',
      label: 'Revenu net imposable annuel du foyer',
      type: 'number',
      unit: '€ / an',
      defaultValue: 35000,
      min: 0,
      step: 1000,
    },
    {
      id: 'parts',
      label: 'Nombre de parts fiscales',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: '1 part (célibataire)' },
        { value: '1.5', label: '1,5 part (célibataire + 1 enfant)' },
        { value: '2', label: '2 parts (couple ou parent isolé + 2 enf.)' },
        { value: '2.5', label: '2,5 parts (couple + 1 enfant)' },
        { value: '3', label: '3 parts (couple + 2 enfants)' },
        { value: '4', label: '4 parts (couple + 3 enfants)' },
      ],
    },
  ],

  compute: (values) => {
    const revenu = Math.max(0, Number(values.revenu) || 0);
    const parts = Math.max(1, Number(values.parts) || 1);

    const revenuParPart = revenu / parts;
    const impotParPartValue = impotParPart(revenuParPart);
    const impotTotal = impotParPartValue * parts;
    const tmi = tmiParPart(revenuParPart);
    const tauxMoyen = revenu > 0 ? impotTotal / revenu : 0;
    const netApresImpot = revenu - impotTotal;
    const mensuelApres = netApresImpot / 12;

    return {
      primary: {
        label: 'Impôt sur le revenu estimé',
        value: impotTotal,
        unit: '€',
        formatted: formatEuros(impotTotal),
      },
      secondary: [
        { label: 'Tranche marginale (TMI)', value: tmi, unit: '%', formatted: formatPercent(tmi) },
        { label: 'Taux moyen d’imposition', value: tauxMoyen, unit: '%', formatted: formatPercent(tauxMoyen) },
        { label: 'Revenu par part (quotient familial)', value: revenuParPart, unit: '€', formatted: formatEuros(revenuParPart) },
        { label: 'Revenu net après impôt', value: netApresImpot, unit: '€', formatted: formatEuros(netApresImpot) },
        { label: 'Net mensuel après impôt', value: mensuelApres, unit: '€', formatted: formatEuros(mensuelApres) },
      ],
      notes: [
        'Barème 2026 (revenus 2025) appliqué au revenu net imposable. Hors décote, plafonnement du quotient familial, réductions et crédits d’impôt.',
        'Le revenu à saisir est le net imposable (après abattement 10 % ou frais réels), pas le brut.',
      ],
    };
  },

  explanation: `L'**impôt sur le revenu** en France est **progressif** : ton revenu est découpé en tranches, chacune taxée à un taux croissant. Tu ne paies le taux d'une tranche que sur la **fraction de revenu qui s'y trouve**.

**Barème 2026 (revenus 2025), par part** :
- **0 %** jusqu'à 11 497 €
- **11 %** de 11 498 € à 29 315 €
- **30 %** de 29 316 € à 83 823 €
- **41 %** de 83 824 € à 180 294 €
- **45 %** au-delà de 180 294 €

**Le quotient familial** : on divise le revenu imposable par le **nombre de parts** du foyer, on calcule l'impôt sur ce "revenu par part", puis on multiplie par le nombre de parts. Cela allège l'impôt des foyers avec personnes à charge.
- Célibataire : 1 part
- Couple marié/pacsé : 2 parts
- +0,5 part pour le 1er et le 2e enfant, +1 part dès le 3e

**Exemple — célibataire, 35 000 € imposables (1 part)** :
- Tranche 0 % : 0 €
- Tranche 11 % : (29 315 − 11 497) × 11 % = 1 960 €
- Tranche 30 % : (35 000 − 29 315) × 30 % = 1 706 €
- **Impôt total : ~3 666 €**
- **TMI : 30 %** mais **taux moyen : ~10,5 %**

**TMI vs taux moyen** : ta **TMI** (tranche marginale) est le taux de ta dernière tranche — elle sert à estimer l'impact d'un revenu supplémentaire (ou l'économie d'un [versement PER](/epargne/simulateur-per)). Ton **taux moyen** est l'impôt total divisé par ton revenu — toujours bien plus bas.

**Au-delà de cet outil** : la décote (revenus modestes), le plafonnement du quotient familial, et les réductions/crédits d'impôt (dons, emploi à domicile, garde d'enfant) modifient le montant final. Vois aussi le [calcul brut → net](/salaire/brut-net-cadre) pour partir du bon revenu imposable.`,

  examples: {
    columns: [
      { key: 'revenu', label: 'Revenu imposable' },
      { key: 'parts', label: 'Parts' },
      { key: 'impot', label: 'Impôt' },
      { key: 'taux', label: 'Taux moyen' },
    ],
    rows: [
      { revenu: '20 000 €', parts: '1', impot: '~937 €', taux: '4,7 %' },
      { revenu: '35 000 €', parts: '1', impot: '~3 666 €', taux: '10,5 %' },
      { revenu: '50 000 €', parts: '2', impot: '~3 132 €', taux: '6,3 %' },
      { revenu: '80 000 €', parts: '2', impot: '~11 132 €', taux: '13,9 %' },
      { revenu: '120 000 €', parts: '3', impot: '~17 700 €', taux: '14,8 %' },
    ],
  },

  faq: [
    {
      q: 'Comment fonctionne le barème progressif de l’impôt ?',
      a: "Ton revenu est découpé en tranches, chacune taxée à son propre taux (0 %, 11 %, 30 %, 41 %, 45 %). Seule la part de revenu dans une tranche donnée est taxée au taux de cette tranche. Gagner plus ne fait jamais baisser ton revenu net.",
    },
    {
      q: 'Quelle différence entre TMI et taux moyen ?',
      a: "La TMI (tranche marginale d'imposition) est le taux de ta dernière tranche : elle indique combien serait taxé 1 € de revenu supplémentaire. Le taux moyen est ton impôt total divisé par ton revenu — il est toujours plus faible que la TMI.",
    },
    {
      q: 'Comment réduire mon impôt sur le revenu ?',
      a: "Plusieurs leviers : verser sur un PER (déduction du revenu imposable), faire des dons (réduction 66 %), employer à domicile (crédit 50 %), investir en immobilier locatif (Pinel, déficit foncier). L'efficacité dépend de ta TMI.",
    },
    {
      q: 'Le quotient familial réduit-il beaucoup l’impôt ?',
      a: "Oui, surtout pour les familles. Chaque demi-part supplémentaire abaisse le revenu par part, donc la tranche applicable. L'avantage est toutefois plafonné (environ 1 791 € par demi-part en 2026).",
    },
  ],

  related: ['brut-net-cadre', 'simulateur-per', 'calcul-augmentation-salaire'],
};
