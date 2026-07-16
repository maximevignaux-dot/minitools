import type { Comparison } from '@/types/comparison';

export const peaVsAssuranceVie: Comparison = {
  slug: 'pea-vs-assurance-vie',
  h1: 'PEA ou assurance-vie : que choisir pour ton épargne ?',
  metaTitle: 'PEA vs assurance-vie 2026 — comparatif fiscalité et rendement',
  metaDescription:
    'PEA ou assurance-vie : fiscalité, plafonds, liquidité, supports, transmission. Comparatif détaillé pour choisir la bonne enveloppe en 2026.',
  intro:
    'Quelle enveloppe choisir pour faire fructifier ton épargne ? PEA et assurance-vie sont les deux plus utilisées en France, mais elles répondent à des objectifs différents. Voici les différences qui comptent vraiment, sans baratin marketing.',
  tldr:
    'Le PEA est imbattable pour investir en actions européennes long terme (>5 ans) : fiscalité à 17,2 % après 5 ans. L’assurance-vie offre une liquidité totale, plus de supports (fonds euros, immobilier), et un avantage de transmission imbattable.',
  keywords: ['pea', 'assurance-vie', 'comparatif', 'épargne', 'fiscalité', 'placement'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'PEA (Plan d’Épargne en Actions)',
    shortName: 'PEA',
    tagline: 'Enveloppe actions européennes avec fiscalité allégée après 5 ans',
    pros: [
      'Fiscalité ultra-favorable après 5 ans : seuls les 17,2 % de prélèvements sociaux dus',
      'Plafond élevé : 150 000 € (300 000 € en couple avec PEA-PME)',
      'Ordres passés en quelques secondes (cours en direct)',
      'Frais réduits chez les courtiers en ligne (~0,1 % par ordre)',
      'Idéal pour une stratégie ETF MSCI Europe ou monde via ETF synthétique éligible',
    ],
    cons: [
      'Limité aux actions européennes (les ETF monde "synthétiques" contournent cette limite)',
      'Pas de fonds euros, pas d’immobilier, pas d’obligations',
      'Tout retrait avant 5 ans clôture le PEA et entraîne imposition au PFU 30 %',
      'Pas optimisé pour la transmission au décès (capital intègre l’actif successoral classique)',
    ],
  },

  optionB: {
    name: 'Assurance-vie',
    shortName: 'AV',
    tagline: 'Enveloppe multi-supports flexible avec avantage de transmission',
    pros: [
      'Tous types de supports : fonds euros, OPCVM, ETF, SCPI, immobilier',
      'Liquidité totale à tout moment (rachat partiel sans clôture)',
      'Avantage de transmission : 152 500 € exonéré par bénéficiaire (versements <70 ans)',
      'Après 8 ans : abattement annuel 4 600 € (9 200 € couple) sur les gains imposables',
      'Pas de plafond de versement',
    ],
    cons: [
      'Frais souvent élevés en gestion sous mandat ou contrats bancaires (1,5-2,5 %/an)',
      'Avant 8 ans, fiscalité moins avantageuse (PFU 30 % par défaut)',
      'Ordres traités en cours moyen (cours du jour), pas de trading actif',
      'Fonds euros à rendement faible (~2-3 % en 2026)',
    ],
  },

  rows: [
    { criterion: 'Plafond de versement', a: '150 000 € (300 000 € avec PEA-PME)', b: 'Aucun', winner: 'b' },
    { criterion: 'Liquidité', a: 'Retrait <5 ans = clôture du PEA', b: 'Rachat partiel à tout moment', winner: 'b' },
    { criterion: 'Fiscalité (gains après seuil)', a: '17,2 % après 5 ans', b: '17,2 % + IR (12,8 % ou TMI) après 8 ans, abattement 4 600 €/an', winner: 'a' },
    { criterion: 'Supports éligibles', a: 'Actions européennes (et ETF synthétiques monde)', b: 'Fonds euros, OPCVM, ETF, SCPI, immobilier', winner: 'b' },
    { criterion: 'Frais courants', a: '~0,1 % / ordre chez courtier en ligne', b: '0,5-2,5 %/an de frais de gestion', winner: 'a' },
    { criterion: 'Avantage transmission', a: 'Aucun (actif successoral)', b: '152 500 € exonérés / bénéficiaire (versements <70 ans)', winner: 'b' },
    { criterion: 'Durée optimale', a: '>5 ans (clé fiscale)', b: '>8 ans (clé fiscale + transmission)', winner: 'tie' },
    { criterion: 'Rendement actions long terme', a: 'Excellent (frais bas)', b: 'Bon (mais grignoté par les frais)', winner: 'a' },
    { criterion: 'Diversification', a: 'Faible (actions seulement)', b: 'Élevée (multi-classes d’actifs)', winner: 'b' },
    { criterion: 'Cumul possible', a: '1 PEA par personne max', b: 'Plusieurs contrats possibles', winner: 'b' },
  ],

  whenA: [
    'Tu veux investir massivement en actions et tu acceptes la volatilité.',
    'Ton horizon est supérieur à 5 ans (idéal : 10+).',
    'Tu cherches le minimum de frais (gestion 100 % autonome via ETF capitalisants).',
    'Tu ne veux pas optimiser la transmission ou tu as déjà une AV pour ça.',
    'Tu acceptes la limite Europe (contournable avec des ETF synthétiques éligibles type Amundi MSCI World ETF).',
  ],

  whenB: [
    'Tu veux préparer la transmission de ton patrimoine en optimisant fiscalement.',
    'Tu cherches plusieurs classes d’actifs (fonds euros, SCPI, actions, obligations).',
    'Tu veux pouvoir retirer à tout moment sans clore le contrat.',
    'Tu cherches un placement long terme stable (fonds euros + UC).',
    'Tu as déjà rempli ton PEA et tu veux continuer à investir au-delà.',
  ],

  verdict:
    'Les deux sont complémentaires, pas concurrentes. La stratégie optimale en 2026 pour la plupart des épargnants : ouvre un PEA chez un courtier en ligne (Bourse Direct, Boursorama, Fortuneo) et place-y une stratégie ETF monde long terme (~70-80 % de ton épargne investie). En parallèle, ouvre une assurance-vie chez un courtier comme Linxea ou Yomoni pour ton fonds euros et ta préparation de transmission.',

  faq: [
    {
      q: 'PEA ou assurance-vie pour débuter en bourse ?',
      a: "Le PEA si tu veux investir uniquement en actions ou ETF actions long terme — frais minimaux et fiscalité ultra-favorable après 5 ans. L'assurance-vie si tu cherches un mix actions + fonds euros + immobilier ou si la transmission compte.",
    },
    {
      q: 'Peut-on cumuler PEA et assurance-vie ?',
      a: "Oui, et c'est même conseillé. Un PEA (limité à 1 par personne) + autant d'assurances-vie que tu veux. La combinaison classique : PEA pour les ETF actions long terme + AV pour les fonds euros et la transmission.",
    },
    {
      q: 'Quelle fiscalité après 5 ans sur PEA vs 8 ans sur assurance-vie ?',
      a: "PEA après 5 ans : seuls les prélèvements sociaux (17,2 %) sont dus sur les gains. Assurance-vie après 8 ans : 7,5 % d'IR + 17,2 % de PS (sur la fraction au-delà de 150k€ versés). En dessous : abattement annuel 4 600 € (9 200 € couple). En pratique, le PEA reste plus avantageux pour de gros gains.",
    },
    {
      q: 'L’assurance-vie est-elle vraiment intéressante pour la transmission ?',
      a: "Oui, c'est son principal atout. Pour les versements avant 70 ans : 152 500 € par bénéficiaire transmissibles hors succession. Au-delà : taxe à 20 % puis 31,25 %. Pour les versements après 70 ans : abattement global de 30 500 €, puis intégration à la succession classique.",
    },
  ],

  related: ['calcul-interets-composes', 'simulateur-per'],
};
