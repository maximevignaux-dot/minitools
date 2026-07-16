import type { Comparison } from '@/types/comparison';

export const pelVsLivretA: Comparison = {
  slug: 'pel-vs-livret-a',
  h1: 'PEL ou Livret A : quel placement choisir ?',
  metaTitle: 'PEL vs Livret A 2026 — comparatif rendement et fiscalité',
  metaDescription:
    'Livret A ou Plan Épargne Logement : taux, plafonds, fiscalité, liquidité. Comparatif détaillé 2026 pour choisir le bon placement.',
  intro:
    'Le Livret A et le PEL sont les deux placements d’épargne les plus utilisés en France. Mais avec des taux qui changent et des fiscalités différentes, lequel choisir en 2026 ? Comparatif chiffré et pratique.',
  tldr:
    'Le Livret A reste imbattable pour l’épargne de précaution : 3 % net, liquidité totale, exonéré d’impôt. Le PEL n’a d’intérêt que si tu prépares un achat immobilier ET que tu peux bloquer 4 ans minimum — son taux brut 2,25 % devient ~1,57 % net après fiscalité.',
  keywords: ['pel', 'livret a', 'comparatif', 'épargne', 'plan épargne logement', 'placement'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'Livret A',
    shortName: 'Livret A',
    tagline: 'Épargne réglementée totalement exonérée d’impôt',
    pros: [
      'Taux 3 % net (2026, taux garanti par l’État)',
      'Disponibilité totale : retraits instantanés sans pénalité',
      'Exonéré d’impôt et de prélèvements sociaux à 100 %',
      'Aucun versement minimum, pas de frais',
      'Ouvert dès la naissance — idéal premier livret enfant',
    ],
    cons: [
      'Plafond bas : 22 950 € (61 200 € pour les associations)',
      'Taux variable révisé 2x/an — peut baisser selon inflation',
      'Pas d’avantage immobilier (pas de prêt préférentiel attaché)',
      'Pas optimal pour le long terme (l’inflation grignote)',
    ],
  },

  optionB: {
    name: 'Plan Épargne Logement (PEL)',
    shortName: 'PEL',
    tagline: 'Épargne bloquée 4 ans + droit à un prêt immobilier',
    pros: [
      'Taux fixe garanti à l’ouverture sur toute la vie du PEL',
      'Plafond plus élevé : 61 200 €',
      'Droit à un prêt immobilier à taux fixé (taux PEL + 1,2 % en 2026)',
      'Prime d’État possible (limitée et conditionnée à l’usage immo)',
      'Versement annuel obligatoire 540 € — discipline d’épargne',
    ],
    cons: [
      'Taux brut 2,25 % en 2026 → ~1,57 % net après PFU 30 %',
      'Versements obligatoires (540 €/an minimum) — manque de souplesse',
      'Blocage de fait pendant 4 ans (sinon perte des avantages)',
      'Imposable au PFU 30 % dès la 1ère année pour les PEL ouverts depuis 2018',
      'Droit à prêt souvent moins avantageux qu’un crédit classique en 2026',
    ],
  },

  rows: [
    { criterion: 'Taux 2026', a: '3 % net', b: '2,25 % brut (~1,57 % net)', winner: 'a' },
    { criterion: 'Plafond', a: '22 950 €', b: '61 200 €', winner: 'b' },
    { criterion: 'Liquidité', a: 'Totale, retrait instantané', b: 'Blocage 4 ans pour bénéfices', winner: 'a' },
    { criterion: 'Fiscalité', a: 'Exonéré IR + PS à 100 %', b: 'PFU 30 % (PEL ≥2018)', winner: 'a' },
    { criterion: 'Versement minimum', a: 'Aucun', b: '540 €/an obligatoires', winner: 'a' },
    { criterion: 'Avantage immobilier', a: 'Aucun', b: 'Droit à prêt PEL fixé', winner: 'b' },
    { criterion: 'Sécurité du capital', a: 'Garanti par l’État', b: 'Garanti par la banque (FGDR <100k€)', winner: 'a' },
    { criterion: 'Variabilité du taux', a: 'Révisé 2x/an', b: 'Fixé à l’ouverture, à vie', winner: 'b' },
    { criterion: 'Frais', a: 'Aucun', b: 'Souvent aucun (selon banque)', winner: 'tie' },
    { criterion: 'Horizon optimal', a: 'Court terme / précaution', b: '4-10 ans + projet immo', winner: 'tie' },
  ],

  whenA: [
    'Tu veux constituer une épargne de précaution (3-6 mois de dépenses).',
    'Tu valorises la liquidité immédiate (urgence, opportunité).',
    'Tu cherches du rendement net après impôt sans risque.',
    'Tu n’as pas de projet immobilier à court ou moyen terme.',
    'Tu n’as pas encore atteint le plafond de 22 950 €.',
  ],

  whenB: [
    'Tu prépares un projet immobilier à 4-7 ans d’horizon.',
    'Tu veux figer un taux d’épargne à vie (anticiper une baisse future).',
    'Tu as déjà saturé ton Livret A et ton LDDS.',
    'Tu apprécies la discipline du versement annuel obligatoire.',
    'Tu vises le plafond plus élevé (61 200 € vs 22 950 € pour le Livret A).',
  ],

  verdict:
    'En 2026, le Livret A bat presque toujours le PEL en pur rendement net : 3 % exonéré vs ~1,57 % imposable. Le PEL ne se justifie que si tu prépares un achat immobilier à 4-7 ans, ou si tu veux compléter au-delà du plafond Livret A + LDDS (≈35 000 €). Stratégie optimale 2026 : saturer Livret A + LDDS d’abord, puis si tu as plus à placer et un projet immo, ajouter un PEL.',

  faq: [
    {
      q: 'Le Livret A rapporte-t-il vraiment plus qu’un PEL ?',
      a: "En net en 2026, oui : Livret A à 3 % exonéré bat le PEL à 2,25 % brut (soit ~1,57 % après PFU 30 % pour les PEL ouverts depuis 2018). Le PEL n'est intéressant que pour son avantage immobilier ou pour les sommes au-delà du plafond Livret A.",
    },
    {
      q: 'Combien peut-on placer sur un Livret A ?',
      a: "22 950 € maximum par personne. Pour aller plus loin sans risque, complète avec un LDDS (12 000 € exonérés également), un LEP (10 000 € si revenus modestes), puis un PEL ou une assurance-vie fonds euros.",
    },
    {
      q: 'Le PEL donne-t-il vraiment un meilleur prêt immo ?',
      a: "En 2026, le taux PEL + 1,2 % donne souvent un crédit supérieur aux meilleures offres bancaires classiques. L'avantage du droit à prêt PEL est aujourd'hui marginal — l'épargne en elle-même reste l'intérêt principal du produit.",
    },
    {
      q: 'Peut-on retirer son PEL avant 4 ans ?',
      a: "Oui, mais tu perds les avantages : avant 2 ans, le PEL est requalifié en compte d'épargne logement à taux réduit. Entre 2 et 4 ans, tu perds le droit à prêt et à la prime d'État. Après 4 ans, tu peux retirer librement en gardant les bénéfices.",
    },
  ],

  related: ['calcul-interets-composes', 'simulateur-per', 'capacite-emprunt'],
};
