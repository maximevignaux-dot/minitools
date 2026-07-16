import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

function abattementIR(annees: number): number {
  if (annees <= 5) return 0;
  if (annees >= 22) return 1;
  // 6 % par an de la 6e à la 21e, 4 % la 22e
  const pleines = Math.min(annees, 21) - 5;
  let ab = pleines * 0.06;
  if (annees >= 22) ab += 0.04;
  return Math.min(1, ab);
}

function abattementPS(annees: number): number {
  if (annees <= 5) return 0;
  if (annees >= 30) return 1;
  let ab = 0;
  // 1,65 % par an de la 6e à la 21e
  ab += (Math.min(annees, 21) - 5) * 0.0165;
  // 1,60 % la 22e année
  if (annees >= 22) ab += 0.016;
  // 9 % par an de la 23e à la 30e
  if (annees >= 23) ab += (Math.min(annees, 30) - 22) * 0.09;
  return Math.min(1, ab);
}

export const plusValueImmobiliere: Tool = {
  slug: 'plus-value-immobiliere',
  category: 'immobilier',
  h1: 'Plus-value immobilière : calculateur d’imposition 2026',
  metaTitle: 'Plus-value immobilière 2026 — calcul impôt et abattements',
  metaDescription:
    'Calcule l’impôt sur ta plus-value immobilière selon la durée de détention. Abattements IR et prélèvements sociaux, exonérations, surtaxe.',
  intro:
    'Combien d’impôt sur la plus-value lors de la revente d’un bien ? Saisis tes prix d’achat et de vente et la durée de détention : tu obtiens la plus-value imposable après abattements, l’IR (19 %) et les prélèvements sociaux (17,2 %).',
  keywords: ['plus-value immobilière', 'impôt', 'abattement', 'durée de détention', 'résidence secondaire', 'exonération'],
  lastmod: '2026-05-14',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'La plus-value est taxée à 19 % (IR) + 17,2 % (prélèvements sociaux). Mais l’abattement pour durée de détention l’exonère totalement d’IR après 22 ans et de prélèvements sociaux après 30 ans. La résidence principale est exonérée d’office.',

  keyTakeaways: [
    'Taxation : 19 % d’IR + 17,2 % de prélèvements sociaux = 36,2 % de la plus-value nette.',
    'Abattement IR : 6 %/an de la 6e à la 21e année, 4 % la 22e → exonération totale à 22 ans.',
    'Abattement PS : plus lent → exonération totale seulement à 30 ans de détention.',
    'La résidence principale est totalement exonérée, quelle que soit la plus-value.',
  ],

  howTo: [
    {
      name: 'Saisis ton prix d’achat',
      text: 'Prix d’acquisition + frais de notaire (forfait 7,5 % accepté) + travaux (forfait 15 % si détention >5 ans).',
    },
    {
      name: 'Indique ton prix de vente',
      text: 'Prix net vendeur, après déduction des frais de diagnostic et de l’éventuelle commission d’agence à ta charge.',
    },
    {
      name: 'Renseigne la durée de détention',
      text: 'Nombre d’années entre l’achat et la vente. C’est le facteur clé des abattements.',
    },
    {
      name: 'Lis ton imposition',
      text: 'Plus-value imposable après abattements, IR à 19 %, prélèvements sociaux à 17,2 %, et total net.',
    },
  ],

  useCases: [
    {
      title: 'Décider du meilleur moment pour vendre',
      description: 'Visualise comment attendre 22 ou 30 ans change radicalement l’imposition.',
    },
    {
      title: 'Estimer le net en poche après revente',
      description: 'Déduis l’impôt de ta plus-value pour connaître le capital réellement disponible.',
    },
    {
      title: 'Comparer résidence principale vs secondaire',
      description: 'La résidence principale est exonérée — un argument de poids dans une stratégie patrimoniale.',
    },
    {
      title: 'Anticiper la surtaxe des grosses plus-values',
      description: 'Au-delà de 50 000 € de plus-value imposable, une surtaxe progressive de 2 à 6 % s’ajoute.',
    },
  ],

  pitfalls: [
    {
      title: 'Oublier les forfaits frais et travaux',
      description: 'Tu peux majorer le prix d’achat de 7,5 % (frais) + 15 % (travaux si détention >5 ans) sans justificatif. Ça réduit fortement la plus-value imposable.',
    },
    {
      title: 'Confondre exonération IR et PS',
      description: 'L’exonération d’IR arrive à 22 ans, mais celle des prélèvements sociaux seulement à 30 ans. Entre les deux, tu paies encore les 17,2 % décroissants.',
    },
    {
      title: 'Croire que la résidence principale est taxée',
      description: 'La vente de ta résidence principale est totalement exonérée de plus-value, sans condition de durée.',
    },
    {
      title: 'Ignorer la surtaxe au-delà de 50 000 €',
      description: 'Une surtaxe de 2 à 6 % s’applique sur les plus-values imposables supérieures à 50 000 € (hors résidence principale).',
    },
  ],

  sources: [
    {
      label: 'Service-Public.fr — Plus-value immobilière',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F10864',
    },
    {
      label: 'impots.gouv.fr — Plus-values immobilières',
      url: 'https://www.impots.gouv.fr/particulier/questions/je-vends-un-bien-immobilier-comment-est-calculee-la-plus-value-imposable',
    },
    {
      label: 'BOFiP — Abattements pour durée de détention',
      url: 'https://bofip.impots.gouv.fr/bofip/3023-PGP',
    },
  ],

  inputs: [
    {
      id: 'achat',
      label: 'Prix d’achat (frais et travaux inclus)',
      type: 'number',
      unit: '€',
      defaultValue: 200000,
      min: 0,
      step: 5000,
    },
    {
      id: 'vente',
      label: 'Prix de vente',
      type: 'number',
      unit: '€',
      defaultValue: 320000,
      min: 0,
      step: 5000,
    },
    {
      id: 'duree',
      label: 'Durée de détention',
      type: 'number',
      unit: 'années',
      defaultValue: 12,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      id: 'type',
      label: 'Type de bien',
      type: 'select',
      defaultValue: 'secondaire',
      options: [
        { value: 'principale', label: 'Résidence principale (exonérée)' },
        { value: 'secondaire', label: 'Résidence secondaire / investissement' },
      ],
    },
  ],

  compute: (values) => {
    const achat = Math.max(0, Number(values.achat) || 0);
    const vente = Math.max(0, Number(values.vente) || 0);
    const duree = Math.max(0, Number(values.duree) || 0);
    const type = String(values.type);

    const plusValueBrute = Math.max(0, vente - achat);

    if (type === 'principale') {
      return {
        primary: {
          label: 'Impôt sur la plus-value',
          value: 0,
          unit: '€',
          formatted: formatEuros(0),
        },
        secondary: [
          { label: 'Plus-value brute', value: plusValueBrute, unit: '€', formatted: formatEuros(plusValueBrute) },
          { label: 'Statut', value: 0, unit: '', formatted: 'Résidence principale — exonérée' },
          { label: 'Net en poche', value: plusValueBrute, unit: '€', formatted: formatEuros(plusValueBrute) },
        ],
        notes: ['La vente de la résidence principale est totalement exonérée de plus-value, sans condition de durée de détention.'],
      };
    }

    const abIR = abattementIR(duree);
    const abPS = abattementPS(duree);
    const baseIR = plusValueBrute * (1 - abIR);
    const basePS = plusValueBrute * (1 - abPS);
    const ir = baseIR * 0.19;
    const ps = basePS * 0.172;
    // Surtaxe simplifiée au-delà de 50 000 € de PV imposable (base IR)
    let surtaxe = 0;
    if (baseIR > 50000) surtaxe = baseIR * 0.02;
    const impotTotal = ir + ps + surtaxe;
    const netEnPoche = plusValueBrute - impotTotal;

    return {
      primary: {
        label: 'Impôt total sur la plus-value',
        value: impotTotal,
        unit: '€',
        formatted: formatEuros(impotTotal),
      },
      secondary: [
        { label: 'Plus-value brute', value: plusValueBrute, unit: '€', formatted: formatEuros(plusValueBrute) },
        { label: 'Abattement IR', value: abIR, unit: '%', formatted: formatPercent(abIR) },
        { label: 'Abattement prélèvements sociaux', value: abPS, unit: '%', formatted: formatPercent(abPS) },
        { label: 'Impôt sur le revenu (19 %)', value: ir, unit: '€', formatted: formatEuros(ir) },
        { label: 'Prélèvements sociaux (17,2 %)', value: ps, unit: '€', formatted: formatEuros(ps) },
        ...(surtaxe > 0
          ? [{ label: 'Surtaxe (>50 000 €)', value: surtaxe, unit: '€', formatted: formatEuros(surtaxe) }]
          : []),
        { label: 'Plus-value nette en poche', value: netEnPoche, unit: '€', formatted: formatEuros(netEnPoche) },
      ],
      notes: [
        'Le prix d’achat doit inclure les frais d’acquisition (forfait 7,5 % accepté) et les travaux (forfait 15 % si détention >5 ans).',
        'Surtaxe approchée. Le barème réel est progressif de 2 % à 6 % par paliers au-delà de 50 000 € de plus-value imposable.',
      ],
    };
  },

  explanation: `La **plus-value immobilière** est le gain réalisé lors de la revente d'un bien : prix de vente − prix d'achat. Elle est imposée dès lors qu'il ne s'agit pas de ta **résidence principale** (qui est totalement exonérée).

**Taxation de base** :
- **Impôt sur le revenu** : 19 % de la plus-value nette.
- **Prélèvements sociaux** : 17,2 %.
- Total : **36,2 %** avant abattements.

**Majoration du prix d'achat** (réduit la plus-value imposable) :
- **Frais d'acquisition** : forfait de **7,5 %** du prix sans justificatif.
- **Travaux** : forfait de **15 %** du prix si tu détiens le bien depuis plus de 5 ans, sans justificatif.

**Abattement pour durée de détention** — la clé de l'optimisation :

*Pour l'IR (19 %)* :
- 6 % par an de la 6e à la 21e année
- 4 % la 22e année
- **Exonération totale à 22 ans**

*Pour les prélèvements sociaux (17,2 %)* :
- 1,65 % par an de la 6e à la 21e année
- 1,60 % la 22e année
- 9 % par an de la 23e à la 30e année
- **Exonération totale seulement à 30 ans**

**Exemple — bien acheté 200 000 €, revendu 320 000 € après 12 ans** :
- Plus-value brute : 120 000 €
- Abattement IR (12 ans) : 7 × 6 % = 42 % → base IR : 69 600 € → IR : 13 224 €
- Abattement PS (12 ans) : 7 × 1,65 % = 11,55 % → base PS : 106 140 € → PS : 18 256 €
- **Impôt total : ~31 480 €**, net en poche : ~88 500 €

**Surtaxe** : au-delà de **50 000 € de plus-value imposable**, une surtaxe progressive de **2 % à 6 %** s'ajoute (hors résidence principale).

Lié : [frais de notaire](/immobilier/frais-de-notaire), [rentabilité Airbnb](/immobilier/rentabilite-airbnb).`,

  examples: {
    columns: [
      { key: 'pv', label: 'Plus-value brute' },
      { key: 'duree', label: 'Détention' },
      { key: 'impot', label: 'Impôt total' },
      { key: 'net', label: 'Net en poche' },
    ],
    rows: [
      { pv: '120 000 €', duree: '5 ans', impot: '~43 440 €', net: '~76 560 €' },
      { pv: '120 000 €', duree: '12 ans', impot: '~31 480 €', net: '~88 520 €' },
      { pv: '120 000 €', duree: '22 ans', impot: '~7 700 €', net: '~112 300 €' },
      { pv: '120 000 €', duree: '30 ans', impot: '0 €', net: '120 000 €' },
      { pv: '120 000 €', duree: 'Résidence principale', impot: '0 €', net: '120 000 €' },
    ],
  },

  faq: [
    {
      q: 'La résidence principale est-elle taxée à la revente ?',
      a: "Non. La vente de ta résidence principale est totalement exonérée de plus-value immobilière, quel que soit le montant du gain et la durée de détention. C'est l'une des plus grosses niches fiscales françaises.",
    },
    {
      q: 'Après combien d’années n’y a-t-il plus d’impôt ?',
      a: "Exonération d'impôt sur le revenu (19 %) après 22 ans de détention. Exonération des prélèvements sociaux (17,2 %) seulement après 30 ans. Entre 22 et 30 ans, tu ne paies plus que les prélèvements sociaux décroissants.",
    },
    {
      q: 'Comment réduire la plus-value imposable ?',
      a: "Majorer le prix d'achat : forfait de 7,5 % pour les frais d'acquisition + forfait de 15 % pour travaux (si détention >5 ans), sans justificatif. Ou conserver les factures réelles si elles dépassent ces forfaits.",
    },
    {
      q: 'Y a-t-il une surtaxe sur les grosses plus-values ?',
      a: "Oui, au-delà de 50 000 € de plus-value imposable (après abattements), une surtaxe progressive de 2 % à 6 % s'applique. Elle ne concerne pas la résidence principale (déjà exonérée).",
    },
  ],

  related: ['frais-de-notaire', 'rentabilite-airbnb', 'capacite-emprunt'],
};
