import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

export const interetsComposes: Tool = {
  slug: 'calcul-interets-composes',
  category: 'epargne',
  h1: 'Calcul des intérêts composés',
  metaTitle: 'Intérêts composés : calculateur d’épargne 2026',
  metaDescription:
    'Simule la croissance de ton épargne avec versements mensuels, taux et durée. Voir l’effet boule de neige des intérêts composés. Gratuit.',
  intro:
    'Combien vaudra ton épargne dans 10, 20, 30 ans ? Saisis ton capital initial, tes versements mensuels, le taux de rendement et la durée pour visualiser la magie des intérêts composés.',
  keywords: ['intérêts composés', 'épargne', 'capitalisation', 'rendement', 'pea', 'assurance-vie'],
  lastmod: '2026-05-08',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: '100 € investis chaque mois pendant 30 ans à 7 % deviennent ~122 000 €, dont 86 000 € d’intérêts cumulés. Le temps fait l’essentiel du travail.',

  keyTakeaways: [
    'Règle des 72 : ton capital double tous les 72 / taux % années (à 7 %, c’est ~10 ans).',
    'Reporter ton effort de 10 ans peut diviser ton capital final par 2 — démarre tôt.',
    'Les frais (0,5 vs 1,5 %/an) grignotent jusqu’à 30 % du capital final sur 30 ans.',
    'L’investissement régulier (DCA) lisse le risque de timing et limite l’impact des creux de marché.',
  ],

  howTo: [
    {
      name: 'Saisis ton capital de départ',
      text: 'Le montant déjà disponible que tu places dès maintenant (0 € possible si tu démarres de zéro).',
    },
    {
      name: 'Indique ton versement mensuel',
      text: 'Ce que tu peux mettre de côté tous les mois sans toucher (50, 100, 500 € selon ton budget).',
    },
    {
      name: 'Choisis la durée et le rendement annuel attendu',
      text: '4 % pour du fonds euro, 6-8 % pour un portefeuille actions long terme type MSCI World.',
    },
    {
      name: 'Lis ton capital final',
      text: 'Total versé + intérêts cumulés, avec le détail année par année.',
    },
  ],

  useCases: [
    {
      title: 'Projeter ton PEA ou assurance-vie sur 20 ans',
      description: 'Visualise la valeur de ton portefeuille à horizon retraite ou objectif vie.',
    },
    {
      title: 'Comparer Livret A vs ETF MSCI World',
      description: 'Sur 15 ans, l’écart de rendement transforme radicalement le capital final.',
    },
    {
      title: 'Calculer combien épargner pour la retraite',
      description: 'Inverse le calcul pour identifier le versement mensuel nécessaire à un objectif.',
    },
    {
      title: 'Convaincre un proche de commencer maintenant',
      description: 'Montre l’effet boule de neige du temps pour transformer 100 €/mois en 100 k€.',
    },
  ],

  pitfalls: [
    {
      title: 'Ne pas réinvestir les dividendes',
      description: 'Sur 30 ans, réinvestir les dividendes peut doubler le capital final. Choisis des ETF capitalisants ou réinvestis manuellement.',
    },
    {
      title: 'Ignorer les frais de gestion',
      description: '1 % de frais en plus par an, c’est ~30 % de capital final en moins sur 30 ans. Compare précisément les frais des enveloppes.',
    },
    {
      title: 'Confondre rendement nominal et net d’inflation',
      description: 'Avec 2 %/an d’inflation, un placement à 5 % ne fait gagner que 3 % de pouvoir d’achat réel. Raisonne en rendement réel.',
    },
    {
      title: 'Repousser le départ "encore un an"',
      description: '10 ans de retard peuvent diviser ton capital final par 2. Démarrer maintenant avec 50 €/mois bat largement attendre pour mettre 500 €/mois.',
    },
  ],

  sources: [
    {
      label: 'AMF — L’investissement sur les marchés',
      url: 'https://www.amf-france.org/fr/espace-epargnants',
    },
    {
      label: 'Banque de France — Éducation financière',
      url: 'https://www.mesquestionsdargent.fr',
    },
  ],

  inputs: [
    {
      id: 'capital',
      label: 'Capital initial',
      type: 'number',
      unit: '€',
      defaultValue: 5000,
      min: 0,
      step: 500,
    },
    {
      id: 'versement',
      label: 'Versement mensuel',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 200,
      min: 0,
      step: 50,
    },
    {
      id: 'taux',
      label: 'Taux annuel net',
      type: 'number',
      unit: '%',
      defaultValue: 5,
      min: -10,
      max: 20,
      step: 0.1,
      help: 'Livret A : 3 %. Assurance-vie fonds €  : 2,5–3 %. PEA / ETF monde : 6–8 % long terme.',
    },
    {
      id: 'duree',
      label: 'Durée',
      type: 'number',
      unit: 'années',
      defaultValue: 20,
      min: 1,
      max: 60,
      step: 1,
    },
  ],

  compute: (values) => {
    const capital = Number(values.capital) || 0;
    const versement = Number(values.versement) || 0;
    const tauxAnnuel = (Number(values.taux) || 0) / 100;
    const dureeAnnees = Math.max(1, Number(values.duree) || 1);

    const r = tauxAnnuel / 12;
    const n = dureeAnnees * 12;

    const futurInitial =
      r === 0 ? capital : capital * Math.pow(1 + r, n);

    const futurVersements =
      r === 0 ? versement * n : versement * (Math.pow(1 + r, n) - 1) / r;

    const total = futurInitial + futurVersements;
    const verse = capital + versement * n;
    const interets = total - verse;
    const tauxRapporte = verse > 0 ? interets / verse : 0;

    return {
      primary: {
        label: `Capital final dans ${dureeAnnees} an${dureeAnnees > 1 ? 's' : ''}`,
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        { label: 'Total versé', value: verse, unit: '€', formatted: formatEuros(verse) },
        { label: 'Intérêts gagnés', value: interets, unit: '€', formatted: formatEuros(interets) },
        { label: 'Multiplicateur', value: tauxRapporte, unit: '%', formatted: formatPercent(tauxRapporte) },
      ],
      notes: [
        'Calcul à versements en début de mois et capitalisation mensuelle.',
        'Hors fiscalité : pour le PEA après 5 ans, seules les prélèvements sociaux (17,2 %) s’appliquent. Pour l’assurance-vie après 8 ans, abattement de 4 600 € (9 200 € en couple).',
        'Hors inflation : un taux de 5 % avec 2 % d’inflation correspond à un rendement réel de ~3 %.',
      ],
    };
  },

  explanation: `Les **intérêts composés** sont le mécanisme le plus puissant de l'épargne long terme : tes intérêts produisent à leur tour des intérêts, et la croissance devient **exponentielle**.

**Formule** (avec versements mensuels) :
\`\`\`
Capital final = K₀ × (1+r)ⁿ + V × ((1+r)ⁿ − 1) / r
\`\`\`
où **K₀** = capital initial, **V** = versement mensuel, **r** = taux mensuel (taux annuel ÷ 12), **n** = nombre de mois.

**Effet boule de neige** : 200 €/mois pendant 30 ans à 5 % donne **166 000 €** dont **94 000 € d'intérêts** — soit plus que les 72 000 € versés. C'est le temps qui fait le travail, pas le montant.

**Rendements 2026 indicatifs** (nets de frais, avant impôts) :
- **Livret A** : 3 % (sans risque, plafond 22 950 €)
- **Fonds euros assurance-vie** : 2,5 à 3,5 % (capital garanti)
- **SCPI** : 4,5 à 6 % (immobilier mutualisé)
- **Actions PEA / ETF monde** : 6 à 8 % long terme (volatilité court terme)
- **PER** avantage fiscal supplémentaire selon TMI

**Règle de 72** : pour estimer le temps de doublement de ton capital, divise 72 par le taux. À 6 %, ton capital double en 12 ans. À 3 %, il faut 24 ans.

**Erreurs fréquentes** :
- **Confondre taux brut et taux net** : un fonds euros à 3 % brut sort à ~2,48 % après prélèvements sociaux.
- **Oublier l'inflation** : 5 % nominal − 2 % d'inflation = 3 % de rendement réel.
- **Sortir trop tôt** : couper la capitalisation avant 15–20 ans réduit drastiquement l'effet boule de neige.`,

  examples: {
    columns: [
      { key: 'profile', label: 'Stratégie' },
      { key: 'verse', label: 'Versement mensuel' },
      { key: 'taux', label: 'Taux' },
      { key: 'duree', label: 'Durée' },
      { key: 'final', label: 'Capital final' },
    ],
    rows: [
      { profile: 'Livret A plafonné', verse: '0 €', taux: '3 %', duree: '20 ans', final: '~ 41 400 €' },
      { profile: 'Épargne mensuelle prudente', verse: '200 €', taux: '3 %', duree: '20 ans', final: '~ 65 600 €' },
      { profile: 'PEA dynamique', verse: '300 €', taux: '7 %', duree: '25 ans', final: '~ 240 000 €' },
      { profile: 'Préparation retraite', verse: '500 €', taux: '6 %', duree: '30 ans', final: '~ 502 000 €' },
    ],
  },

  faq: [
    {
      q: 'Quelle différence entre intérêts simples et intérêts composés ?',
      a: "Avec les intérêts simples, seul le capital initial produit des intérêts. Avec les intérêts composés, les intérêts se rajoutent au capital et produisent à leur tour des intérêts. Sur 30 ans à 5 %, l'écart entre les deux peut être de × 2.",
    },
    {
      q: 'Quel taux utiliser pour mes simulations ?',
      a: "Utilise le taux net moyen historique de ton support : 3 % pour un fonds euros, 6–8 % pour des actions long terme (CAC 40 + dividendes ~7 %, S&P 500 ~9 %). Garde une marge de prudence et fais plusieurs scénarios.",
    },
    {
      q: 'Faut-il vraiment commencer tôt ?',
      a: "Oui. 200 €/mois de 25 à 65 ans à 6 % = **400 000 €**. Les mêmes 200 €/mois de 35 à 65 ans = **200 000 €**. Les 10 années perdues coûtent **la moitié du capital final**, pas un dixième.",
    },
    {
      q: 'Comment intégrer l’inflation ?',
      a: "Soustrais l'inflation moyenne attendue (~2 % en zone euro) du taux nominal. Un PEA à 7 % nominal correspond à un rendement réel de 5 % en pouvoir d'achat — ce qui reste excellent.",
    },
  ],

  related: ['capacite-emprunt', 'auto-entrepreneur-brut-net'],
};
