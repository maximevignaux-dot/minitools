import type { Comparison } from '@/types/comparison';

export const salarieVsFreelance: Comparison = {
  slug: 'salarie-vs-freelance',
  h1: 'Salarié ou freelance : que choisir pour ta carrière ?',
  metaTitle: 'Salarié vs freelance 2026 — revenu, sécurité, liberté comparés',
  metaDescription:
    'Salarié en CDI ou freelance indépendant : revenu net, sécurité, protection sociale, liberté, fiscalité. Comparatif honnête pour choisir en 2026.',
  intro:
    'Rester salarié en CDI ou se lancer en freelance ? C’est l’un des grands dilemmes de carrière. Le freelance peut gagner plus, mais au prix de la sécurité et d’une charge mentale supérieure. Comparatif chiffré et sans langue de bois.',
  tldr:
    'À compétence égale, un freelance facture 2 à 2,5× son équivalent salaire brut pour un net comparable, une fois les charges et l’absence de congés/chômage intégrées. Le CDI gagne sur la sécurité ; le freelance sur la liberté et le potentiel de revenu.',
  keywords: ['salarié', 'freelance', 'cdi', 'indépendant', 'comparatif', 'carrière', 'tjm'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'Salarié (CDI)',
    shortName: 'CDI',
    tagline: 'Contrat stable, employeur unique, revenu fixe',
    pros: [
      'Revenu fixe et prévisible chaque mois',
      'Protection sociale complète (chômage, maladie, retraite, congés payés)',
      'Formation financée, mutuelle d’entreprise, tickets resto, CE',
      'Pas de charge administrative ni comptable',
      'Accès facilité au crédit immobilier (banques rassurées)',
    ],
    cons: [
      'Plafond de revenu : augmentations lentes (~2-3 %/an)',
      'Lien de subordination : horaires, lieu, missions imposés',
      'Dépendance à un seul employeur (risque licenciement)',
      'Peu de leviers d’optimisation fiscale',
      'Évolution salariale souvent plus rapide en changeant d’entreprise qu’en interne',
    ],
  },

  optionB: {
    name: 'Freelance (indépendant)',
    shortName: 'Freelance',
    tagline: 'Indépendant, plusieurs clients, revenu variable',
    pros: [
      'Potentiel de revenu bien supérieur (TJM 400-800 €+)',
      'Liberté totale : horaires, lieu, choix des missions et clients',
      'Diversification du risque sur plusieurs clients',
      'Déduction des frais professionnels (SASU/EURL au réel)',
      'Possibilité de scaler (sous-traitance, produits, formations)',
    ],
    cons: [
      'Revenu variable, périodes creuses entre missions',
      'Pas de chômage sur la rémunération de dirigeant',
      'Charge administrative : facturation, compta, déclarations',
      'Protection sociale à constituer soi-même (prévoyance, retraite)',
      'Prospection commerciale permanente, charge mentale élevée',
      'Accès au crédit immobilier plus difficile (2-3 bilans demandés)',
    ],
  },

  rows: [
    { criterion: 'Revenu potentiel', a: 'Plafonné, hausses lentes', b: 'Élevé et scalable', winner: 'b' },
    { criterion: 'Stabilité du revenu', a: 'Fixe mensuel', b: 'Variable selon missions', winner: 'a' },
    { criterion: 'Protection chômage', a: 'Oui (ARE)', b: 'Non (dirigeant)', winner: 'a' },
    { criterion: 'Congés payés', a: '5 semaines payées', b: 'Non payés (à provisionner)', winner: 'a' },
    { criterion: 'Liberté d’organisation', a: 'Faible (subordination)', b: 'Totale', winner: 'b' },
    { criterion: 'Charge administrative', a: 'Nulle', b: 'Réelle (compta, factures, URSSAF)', winner: 'a' },
    { criterion: 'Optimisation fiscale', a: 'Très limitée', b: 'Frais déductibles, arbitrage dividendes', winner: 'b' },
    { criterion: 'Accès crédit immobilier', a: 'Facile', b: 'Difficile (2-3 bilans)', winner: 'a' },
    { criterion: 'Diversification du risque', a: 'Mono-employeur', b: 'Multi-clients', winner: 'b' },
    { criterion: 'Retraite', a: 'Cotisations automatiques', b: 'À constituer (PER, capitalisation)', winner: 'a' },
    { criterion: 'Évolution / plafond', a: 'Grille salariale', b: 'Aucune limite', winner: 'b' },
    { criterion: 'Charge mentale', a: 'Modérée', b: 'Élevée (prospection permanente)', winner: 'a' },
  ],

  whenA: [
    'Tu valorises la sécurité et la prévisibilité avant tout.',
    'Tu prépares un projet immobilier nécessitant un dossier bancaire solide.',
    'Tu n’as pas envie de gérer la prospection et l’administratif.',
    'Tu es en début de carrière et tu veux te former en étant payé.',
    'Ton métier offre peu de demande en freelance.',
  ],

  whenB: [
    'Ton métier est très demandé en freelance (dev, design, conseil, marketing).',
    'Tu veux maximiser ton revenu et tu acceptes la variabilité.',
    'Tu valorises la liberté d’organisation plus que la sécurité.',
    'Tu as une réserve financière de 3-6 mois pour absorber les creux.',
    'Tu as un réseau ou une capacité à prospecter des clients.',
  ],

  verdict:
    'Il n’y a pas de gagnant universel — c’est une question de profil et de moment de vie. Règle pratique : pour un net équivalent à un CDI, un freelance doit viser un TJM ≈ (salaire brut annuel ÷ 100) au minimum, idéalement davantage pour compenser congés, chômage et périodes creuses. Beaucoup réussissent la transition progressive : démarrer en freelance le soir/week-end, puis basculer quand le carnet de commandes est rempli. Le statut idéal au lancement reste l’auto-entrepreneur, puis la SASU au-delà de 50 k€.',

  faq: [
    {
      q: 'Quel TJM freelance pour égaler mon salaire de CDI ?',
      a: "Règle simple : TJM minimum ≈ salaire brut annuel ÷ 100. Pour un CDI à 45 000 € brut/an, vise au moins 450 € de TJM, et plutôt 550-600 € pour réellement compenser l'absence de congés payés, de chômage et les périodes creuses.",
    },
    {
      q: 'Le freelance gagne-t-il vraiment plus ?',
      a: "À compétence égale, le freelance peut gagner 30-80 % de plus en net… s'il est bien occupé. Mais ce surplus compense l'absence de protection sociale, les congés non payés et l'instabilité. Sur une mauvaise année, il peut gagner moins qu'un salarié.",
    },
    {
      q: 'Peut-on tester le freelance sans quitter son CDI ?',
      a: "Oui, en créant une auto-entreprise en parallèle (sauf clause d'exclusivité dans ton contrat). Tu factures le soir et le week-end pour valider la demande et constituer un premier portefeuille clients avant de sauter le pas.",
    },
    {
      q: 'Le freelance a-t-il droit au chômage ?',
      a: "Pas sur sa rémunération de dirigeant (SASU/EURL). Il existe l'ATI (allocation des travailleurs indépendants, ~800 €/mois pendant 6 mois) sous conditions strictes, ou des assurances privées type GSC. Un freelance doit donc se constituer sa propre réserve de sécurité.",
    },
  ],

  related: ['combien-je-gagne-freelance', 'auto-entrepreneur-brut-net', 'brut-net-cadre'],
};
