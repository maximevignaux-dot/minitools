import type { Tool } from '@/types/tool';
import { formatEuros } from '@/lib/format';

function dureeMaxJours(age: number): number {
  if (age >= 55) return 822;
  if (age >= 53) return 685;
  return 548;
}

export const allocationChomage: Tool = {
  slug: 'calcul-allocation-chomage',
  category: 'salaire',
  h1: 'Allocations chômage (ARE) : calculateur 2026',
  metaTitle: 'Calcul allocations chômage 2026 — ARE mensuelle estimée',
  metaDescription:
    'Estime tes allocations chômage (ARE) : montant mensuel, durée d’indemnisation, dégressivité. Simulation rapide selon salaire et ancienneté.',
  intro:
    'Combien vas-tu toucher au chômage ? Renseigne ton salaire brut moyen, le nombre de mois travaillés et ton âge : tu obtiens une estimation de ton ARE mensuelle, journalière et de la durée d’indemnisation maximale.',
  keywords: ['ARE', 'allocation chômage', 'France Travail', 'Pôle emploi', 'indemnisation', 'sjr'],
  lastmod: '2026-05-14',
  priority: 0.9,
  schemaType: 'SoftwareApplication',

  tldr: 'Pour 2 500 € brut/mois et 24 mois travaillés, ton ARE est d’environ 1 425 € net/mois (57 % du salaire de référence) pendant 18 mois maximum si tu as moins de 53 ans.',

  keyTakeaways: [
    'ARE journalière = MAX(57 % du SJR, 30,42 % du SJR + 13,11 €), plafonnée à 75 % du SJR.',
    'SJR = total brut perçu sur 24 derniers mois ÷ nombre de jours travaillés.',
    'Durée d’indemnisation = durée travaillée, plafonnée à 18 mois (<53 ans), 22,5 mois (53-54 ans), 27 mois (55+).',
    'Dégressivité : -30 % à partir du 7ᵉ mois pour les SJR >157 €/jour (~3 800 € net) — sauf 57 ans et plus.',
  ],

  howTo: [
    {
      name: 'Saisis ton salaire brut mensuel moyen',
      text: 'Moyenne des 24 derniers mois travaillés, primes incluses. France Travail prend en compte tout le brut perçu, hors indemnités de rupture.',
    },
    {
      name: 'Indique combien de mois tu as travaillé',
      text: 'Sur la période de référence (24 mois). Mini 6 mois (130 jours) pour ouvrir des droits.',
    },
    {
      name: 'Renseigne ton âge',
      text: 'Détermine la durée maximale d’indemnisation : 18 mois <53 ans, 22,5 mois 53-54 ans, 27 mois 55+.',
    },
    {
      name: 'Lis ton ARE estimée',
      text: 'Montant mensuel, journalier, durée d’indemnisation et alertes sur la dégressivité éventuelle.',
    },
  ],

  useCases: [
    {
      title: 'Anticiper une démission ou rupture conventionnelle',
      description: 'Connaître ton ARE avant d’accepter une rupture aide à dimensionner ta réserve et à calibrer ton indemnité.',
    },
    {
      title: 'Comparer une offre de reprise vs prolonger le chômage',
      description: 'Ton ARE peut être plus haute qu’un salaire d’embauche — calcule le delta avant de décider.',
    },
    {
      title: 'Simuler le passage à temps partiel',
      description: 'France Travail verse une ARE différentielle si tu reprends à temps partiel — utile pour combiner les deux.',
    },
    {
      title: 'Calculer le délai d’attente',
      description: 'Au-delà des 7 jours fixes, il faut anticiper les différés (congés payés non pris + indemnité supra-légale).',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre brut et net',
      description: 'L’ARE versée est en net après CSG/CRDS (~3 %). Notre estimation est l’ARE brute — déduis ~3 % pour le net réel sur ton compte.',
    },
    {
      title: 'Oublier le délai d’attente',
      description: 'Délai fixe de 7 jours + différé congés payés (jours non pris × 1/26 du brut) + différé indemnités supra-légales. Total souvent 1-3 mois avant le 1er versement.',
    },
    {
      title: 'Sous-estimer la dégressivité',
      description: 'Pour les SJR >157 €/jour (~ 3 800 € net/mois), l’ARE chute de 30 % au 7ᵉ mois d’indemnisation. Impact sévère sur les cadres.',
    },
    {
      title: 'Démissionner sans préparer son cas',
      description: 'Une démission classique ne donne aucun droit ARE. Sauf cas légitimes (suivre conjoint, harcèlement, projet de reconversion validé).',
    },
  ],

  sources: [
    {
      label: 'France Travail — Calcul de l’ARE',
      url: 'https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocations/lessentiel-a-savoir-sur-lallocation/aide-au-retour-a-lemploi--a.html',
    },
    {
      label: 'Service-Public.fr — Allocations chômage',
      url: 'https://www.service-public.fr/particuliers/vosdroits/N549',
    },
    {
      label: 'Unédic — Convention d’assurance chômage',
      url: 'https://www.unedic.org/',
    },
  ],

  inputs: [
    {
      id: 'salaire',
      label: 'Salaire mensuel brut moyen (24 derniers mois)',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 2500,
      min: 0,
      step: 100,
    },
    {
      id: 'moisTravailles',
      label: 'Nombre de mois travaillés sur les 24 derniers',
      type: 'number',
      unit: 'mois',
      defaultValue: 24,
      min: 6,
      max: 36,
      step: 1,
    },
    {
      id: 'age',
      label: 'Âge à la fin du contrat',
      type: 'number',
      unit: 'ans',
      defaultValue: 35,
      min: 18,
      max: 67,
      step: 1,
    },
  ],

  compute: (values) => {
    const salaire = Math.max(0, Number(values.salaire) || 0);
    const moisTravailles = Math.max(0, Number(values.moisTravailles) || 0);
    const age = Math.max(18, Number(values.age) || 35);

    const brutTotal = salaire * moisTravailles;
    const joursTravailles = moisTravailles * 30.42;
    const sjr = joursTravailles > 0 ? brutTotal / joursTravailles : 0;

    const part1 = 0.57 * sjr;
    const part2 = 0.3042 * sjr + 13.11;
    let areJour = Math.max(part1, part2);
    const plafond = 0.75 * sjr;
    areJour = Math.min(areJour, plafond);
    const plancher = 31.97;
    if (sjr > 0) areJour = Math.max(areJour, plancher);

    const areMensuelle = areJour * 30.42;
    const dureeMax = Math.min(moisTravailles * 30.42, dureeMaxJours(age));
    const dureeMois = dureeMax / 30.42;

    const degressivite = sjr > 157 && age < 57;
    const areReduite = areJour * 0.7;

    return {
      primary: {
        label: 'ARE mensuelle brute estimée',
        value: areMensuelle,
        unit: '€',
        formatted: formatEuros(areMensuelle),
      },
      secondary: [
        { label: 'ARE journalière', value: areJour, unit: '€', formatted: `${areJour.toFixed(2)} €/jour` },
        { label: 'Salaire journalier de référence (SJR)', value: sjr, unit: '€', formatted: `${sjr.toFixed(2)} €/jour` },
        { label: 'Durée d’indemnisation maximale', value: dureeMois, unit: 'mois', formatted: `${dureeMois.toFixed(1)} mois` },
        ...(degressivite
          ? [
              {
                label: 'ARE après dégressivité (à partir du 7ᵉ mois)',
                value: areReduite * 30.42,
                unit: '€',
                formatted: formatEuros(areReduite * 30.42),
              },
            ]
          : []),
        { label: 'ARE nette estimée (~ −3 % CSG/CRDS)', value: areMensuelle * 0.97, unit: '€', formatted: formatEuros(areMensuelle * 0.97) },
      ],
      notes: [
        'Estimation simplifiée. Le calcul officiel France Travail prend en compte ton historique précis (CDD, intérim, mois incomplets).',
        'Avant le 1er versement : délai d’attente de 7 jours + différés (congés payés non pris + indemnités supra-légales).',
        ...(degressivite
          ? ['Attention : dégressivité de 30 % détectée à partir du 7ᵉ mois — ton salaire dépasse le seuil (SJR >157 €/jour).']
          : []),
      ],
    };
  },

  explanation: `L'**ARE** (Aide au Retour à l'Emploi) est l'allocation chômage versée par **France Travail** (ex-Pôle Emploi) aux salariés involontairement privés d'emploi. Son calcul repose sur trois ingrédients : le **salaire journalier de référence**, la **durée d'indemnisation**, et éventuellement une **dégressivité** pour les hauts revenus.

**Salaire journalier de référence (SJR)** :
\`\`\`
SJR = total brut perçu sur 24 mois ÷ nombre de jours travaillés
\`\`\`
Ex : 60 000 € brut sur 730 jours travaillés ⇒ SJR ≈ 82 €/jour.

**ARE journalière** : on prend le **maximum** entre deux formules :
- 57 % du SJR (formule "proportionnelle")
- 30,42 % du SJR + 13,11 € (formule "minimale + forfait")

L'ARE est ensuite **plafonnée à 75 %** du SJR et **plancher** à environ 32 €/jour.

**Durée d'indemnisation** : égale au nombre de jours travaillés, plafonnée à :
- **548 jours** (~18 mois) si tu as moins de 53 ans
- **685 jours** (~22,5 mois) entre 53 et 54 ans
- **822 jours** (~27 mois) à partir de 55 ans

**Dégressivité** (réforme 2021) : pour les SJR supérieurs à **157 €/jour** (~3 800 € net/mois), l'ARE est **réduite de 30 %** à partir du **7ᵉ mois** d'indemnisation. Exclusion pour les 57 ans et plus.

**Délai d'attente** : 7 jours incompressibles + différé pour congés payés non pris (1/26 du brut par jour de congé) + différé pour indemnités supra-légales (max 75 jours). En pratique, **le 1er versement arrive 1 à 3 mois après la fin de contrat**.

**Démission** : pas de droits ARE, sauf cas légitimes (suivi conjoint, harcèlement, projet de reconversion validé en CEP) ou demande de [rupture conventionnelle](/salaire/indemnites-licenciement).`,

  examples: {
    columns: [
      { key: 'salaire', label: 'Salaire brut' },
      { key: 'sjr', label: 'SJR' },
      { key: 'are', label: 'ARE / mois (brut)' },
      { key: 'are_net', label: 'ARE / mois (net)' },
    ],
    rows: [
      { salaire: '1 800 €', sjr: '59 €', are: '~1 020 €', are_net: '~990 €' },
      { salaire: '2 500 €', sjr: '82 €', are: '~1 425 €', are_net: '~1 382 €' },
      { salaire: '3 500 €', sjr: '115 €', are: '~1 995 €', are_net: '~1 935 €' },
      { salaire: '5 000 €', sjr: '164 €', are: '~2 850 €*', are_net: '~2 765 €*' },
      { salaire: '7 000 €', sjr: '230 €', are: '~3 990 €*', are_net: '~3 870 €*' },
    ],
  },

  faq: [
    {
      q: 'Combien de mois faut-il avoir travaillé pour toucher le chômage ?',
      a: "Minimum 6 mois (130 jours ou 910 heures) travaillés sur les 24 derniers mois (36 mois pour les 53+). En deçà, pas de droits ARE.",
    },
    {
      q: 'L’ARE est-elle imposable ?',
      a: "Oui, l'ARE est soumise à l'impôt sur le revenu (à déclarer chaque année). Elle subit aussi la CSG (6,2 % ou 3,8 % selon revenus) et la CRDS (0,5 %) — d'où le passage du brut au net.",
    },
    {
      q: 'Peut-on cumuler ARE et reprise d’activité ?',
      a: "Oui via l'ARE différentielle : si ton nouveau salaire mensuel est inférieur à ton ancien, France Travail complète la différence dans la limite de tes droits restants. Très utile pour les transitions douces.",
    },
    {
      q: 'Que se passe-t-il en cas de démission ?',
      a: "Pas d'ARE en général. Sauf 17 cas dits 'légitimes' : suivre conjoint, déménagement pour raison familiale, harcèlement avéré, non-paiement de salaire... Et le cas du projet de reconversion validé en CEP (Conseil en Évolution Professionnelle).",
    },
  ],

  related: ['brut-net-cadre', 'indemnites-licenciement', 'calcul-augmentation-salaire'],
};
