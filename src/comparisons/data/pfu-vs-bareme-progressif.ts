import type { Comparison } from '@/types/comparison';

export const pfuVsBaremeProgressif: Comparison = {
  slug: 'pfu-vs-bareme-progressif',
  h1: 'PFU (flat tax) ou barème progressif : que choisir ?',
  metaTitle: 'PFU vs barème progressif 2026 — quel choix fiscal pour ses revenus du capital',
  metaDescription:
    'PFU 30 % ou barème progressif sur tes dividendes, intérêts et plus-values ? Comparatif fiscal détaillé pour optimiser ton imposition 2026.',
  intro:
    'Quand tu touches des dividendes, intérêts ou plus-values mobilières, tu peux choisir entre la flat tax (PFU 30 %) et le barème progressif. La décision dépend de ta TMI et du type de revenu. Comparatif chiffré.',
  tldr:
    'Le PFU 30 % est imbattable si ta TMI dépasse 11 %. Si tu es à TMI 0 ou 11 % (revenus modestes), l’option barème devient gagnante grâce à l’abattement de 40 % sur les dividendes. Choisir le PFU est le choix par défaut au moment de la déclaration.',
  keywords: ['pfu', 'flat tax', 'barème progressif', 'dividendes', 'plus-value', 'fiscalité', 'placement'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'PFU (Prélèvement Forfaitaire Unique)',
    shortName: 'PFU 30 %',
    tagline: 'Flat tax 30 % sur tous tes revenus du capital, simple et prévisible',
    pros: [
      'Taux fixe 30 % (12,8 % IR + 17,2 % PS) — quelle que soit ta TMI',
      'S’applique automatiquement par défaut — pas de démarche à faire',
      'Calcul transparent et facile à anticiper',
      'Imbattable dès TMI ≥ 30 %',
      'Aucune complexité de déclaration supplémentaire',
    ],
    cons: [
      'Pas d’abattement de 40 % sur les dividendes',
      'Désavantageux à TMI 11 % ou 0 % (revenus modestes)',
      'Pas de déduction de CSG (6,8 %) qui s’ajoute en barème',
      'Pas optimisable selon ta situation personnelle',
    ],
  },

  optionB: {
    name: 'Barème progressif',
    shortName: 'Barème',
    tagline: 'Imposition au barème classique IR, comme un salaire',
    pros: [
      'Très avantageux si TMI 0 % ou 11 % (revenus modestes)',
      'Abattement de 40 % sur les dividendes (réduction de l’assiette imposable)',
      'Déduction d’une fraction de CSG (6,8 %) du revenu imposable l’année suivante',
      'Cohérent si tes revenus du capital sont faibles vs salariaux',
      'Permet d’utiliser l’abattement de 4 600 € (9 200 € couple) sur AV >8 ans',
    ],
    cons: [
      'Cumul avec autres revenus = TMI plus élevée que prévu',
      'Toujours +17,2 % de prélèvements sociaux en plus',
      'Calcul plus complexe (mélange avec barème global)',
      'Option globale et irrévocable pour l’année (touche tous tes revenus capital)',
      'Désavantageux à TMI 30 % ou plus',
    ],
  },

  rows: [
    { criterion: 'Taux global TMI 0 %', a: '30 %', b: '17,2 % (PS uniquement)', winner: 'b' },
    { criterion: 'Taux global TMI 11 %', a: '30 %', b: '~25,4 % (avec abattement div.)', winner: 'b' },
    { criterion: 'Taux global TMI 30 %', a: '30 %', b: '~35,2 %', winner: 'a' },
    { criterion: 'Taux global TMI 41 %', a: '30 %', b: '~41,8 %', winner: 'a' },
    { criterion: 'Abattement dividendes 40 %', a: 'Non', b: 'Oui (réduit l’assiette)', winner: 'b' },
    { criterion: 'Déduction CSG 6,8 %', a: 'Non', b: 'Oui (l’année suivante)', winner: 'b' },
    { criterion: 'Démarche', a: 'Aucune (par défaut)', b: 'Case 2OP à cocher sur 2042', winner: 'a' },
    { criterion: 'Simplicité', a: 'Très simple', b: 'Plus complexe', winner: 'a' },
    { criterion: 'Réversibilité', a: 'N/A (par défaut)', b: 'Annuel, irrévocable pour l’année', winner: 'a' },
    { criterion: 'Avantage AV >8 ans (4 600 €)', a: 'Limité', b: 'Pleinement utilisable', winner: 'b' },
  ],

  whenA: [
    'Ta TMI est de 30 % ou plus.',
    'Tes revenus du capital sont significatifs (>10 k€/an).',
    'Tu veux la simplicité maximale, pas de calculs à faire.',
    'Tu n’as pas confiance dans une bascule barème optimale (peur d’erreur).',
    'Tu vends régulièrement des actions à plus-value.',
  ],

  whenB: [
    'Ta TMI est de 0 % ou 11 % (revenus modestes).',
    'Tu touches surtout des dividendes (l’abattement 40 % joue à fond).',
    'Tu rachètes ton assurance-vie >8 ans avec gains <4 600 € (9 200 € couple).',
    'Tu n’as quasiment pas d’autres revenus salariés/pro.',
    'Tu acceptes le coût d’une déclaration plus complexe.',
  ],

  verdict:
    'En pratique, dès TMI 30 %, le PFU à 30 % bat presque toujours le barème (qui monterait à 35-50 % + PS). À TMI 11 % avec uniquement des dividendes, l’option barème devient gagnante grâce à l’abattement de 40 %. À TMI 0 %, le barème est toujours meilleur. Vérifie chaque année — l’option se prend en cochant la case 2OP de ta déclaration 2042. C’est un choix global pour TOUS tes revenus du capital de l’année, pas par revenu.',

  faq: [
    {
      q: 'Quelle option est appliquée par défaut ?',
      a: "Le PFU à 30 % s'applique automatiquement, sans démarche. Si tu veux passer au barème, tu dois cocher la case 2OP dans ta déclaration 2042 chaque année. C'est irrévocable pour l'année concernée.",
    },
    {
      q: 'L’option barème touche-t-elle tous mes revenus ?',
      a: "Oui, c'est une option globale : si tu coches 2OP, le barème s'applique à TOUS tes revenus du capital de l'année (dividendes, intérêts, plus-values mobilières). Tu ne peux pas choisir au cas par cas.",
    },
    {
      q: 'L’abattement de 40 % sur dividendes vaut-il toujours la peine ?',
      a: "Uniquement si tu choisis l'option barème (case 2OP). Avec le PFU, pas d'abattement. À TMI 11 %, l'abattement de 40 % + déduction CSG fait quasiment toujours pencher la balance vers le barème.",
    },
    {
      q: 'Et pour l’assurance-vie de plus de 8 ans ?',
      a: "Pour les versements <150 k€ et après 8 ans, l'AV bénéficie d'un abattement annuel de 4 600 € (9 200 € en couple) sur les gains. Cet abattement n'est utilisable qu'avec l'option barème — sinon les 4 600 € premiers gains sont taxés au PFU 30 %. Pour utiliser cet avantage, opte pour le barème dans l'année du rachat.",
    },
  ],

  related: ['calcul-impot-revenu', 'simulateur-per', 'calcul-interets-composes'],
};
