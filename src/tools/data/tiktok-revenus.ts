import type { Tool } from '@/types/tool';
import { formatEuros, formatRange } from '@/lib/format';

const NICHE_RPM: Record<string, { creator: number; sponsor: number; label: string }> = {
  lifestyle: { creator: 0.02, sponsor: 6, label: 'Lifestyle / divertissement' },
  beauty: { creator: 0.025, sponsor: 9, label: 'Beauté / mode' },
  gaming: { creator: 0.03, sponsor: 8, label: 'Gaming' },
  finance: { creator: 0.03, sponsor: 18, label: 'Business / finance' },
  food: { creator: 0.02, sponsor: 7, label: 'Cuisine / food' },
};

export const tiktokRevenus: Tool = {
  slug: 'combien-rapporte-tiktok',
  category: 'internet',
  h1: 'Combien rapporte TikTok ?',
  metaTitle: 'Combien rapporte TikTok ? Calculateur de revenus 2026',
  metaDescription:
    'Estime tes revenus TikTok par mois selon tes vues, ta niche et tes vidéos. Creator Fund + sponsoring inclus. Gratuit, sans inscription.',
  intro:
    'Combien gagne un compte TikTok par mois ? Renseigne tes vues moyennes, le nombre de vidéos publiées et ta niche : tu obtiens une estimation des revenus Creator Fund et sponsoring.',
  keywords: ['tiktok', 'revenus', 'creator fund', 'sponsoring', 'monétisation'],
  lastmod: '2026-05-08',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'TikTok rémunère 0,02 à 0,04 € pour 1 000 vues via le Creator Rewards Program — soit 20 à 40 € pour 1 M de vues. Le vrai revenu vient des partenariats marque.',

  keyTakeaways: [
    'Creator Rewards Program (ex-Creator Fund) : paye uniquement les vues qualifiées de vidéos >1 min.',
    'RPM TikTok ~10× plus bas que YouTube, mais le reach viral compense pour les top créateurs.',
    'Partenariats marque : 100 à 500 € par 100 k abonnés et par post, selon ta niche et engagement.',
    'TikTok Shop, lives et abonnements payants ajoutent des revenus annexes en forte croissance.',
  ],

  howTo: [
    {
      name: 'Indique tes vues moyennes par vidéo',
      text: 'Sur tes 10 dernières vidéos en moyenne, hors flop ou viral exceptionnel.',
    },
    {
      name: 'Saisis ton nombre de publications par mois',
      text: 'L’algorithme TikTok favorise la régularité — 3 à 5 vidéos/semaine est un rythme courant.',
    },
    {
      name: 'Choisis ta niche de contenu',
      text: 'Beauté, gaming, finance, lifestyle, food — chaque niche a un RPM et un tarif sponsoring différent.',
    },
    {
      name: 'Lis ton revenu mensuel estimé',
      text: 'Creator Rewards + estimation partenariats marque selon ta niche et ton volume d’audience.',
    },
  ],

  useCases: [
    {
      title: 'Estimer le potentiel d’une chaîne en lancement',
      description: 'Projette tes revenus à 3, 6, 12 mois selon des hypothèses de croissance réalistes.',
    },
    {
      title: 'Choisir entre TikTok et YouTube',
      description: 'Compare le RPM et le volume nécessaires sur chaque plateforme pour atteindre un revenu cible.',
    },
    {
      title: 'Justifier un tarif partenariat marque',
      description: 'Présente une estimation chiffrée à un annonceur pour défendre ton tarif/post.',
    },
    {
      title: 'Comparer le ROI temps/argent vs salaire',
      description: 'Évalue si miser sur TikTok à plein temps a du sens vs garder ton emploi salarié.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre vues totales et vues qualifiées',
      description: 'Le Creator Rewards ne paye que les vues qualifiées de vidéos >1 min. Les Shorts et vues "rebond" ne comptent pas.',
    },
    {
      title: 'Surestimer le RPM en niche concurrentielle',
      description: 'Lifestyle et gaming sont saturés : les annonceurs paient peu. Les niches B2B/finance sont 3 à 5× plus rémunératrices.',
    },
    {
      title: 'Croire que les lives génèrent autant que le long-format',
      description: 'Les revenus de live (cadeaux virtuels) sont très variables et concentrés sur quelques top créateurs.',
    },
    {
      title: 'Compter sur les seuls revenus pub',
      description: 'Sans partenariats marque, affiliation ou produits propres, vivre de TikTok est très difficile en dessous d’1 M de vues/vidéo.',
    },
  ],

  sources: [
    {
      label: 'TikTok Newsroom — Creator Rewards Program',
      url: 'https://newsroom.tiktok.com/en-us/creator-rewards-program',
    },
    {
      label: 'TikTok Creator Center',
      url: 'https://www.tiktok.com/creator-center',
    },
  ],

  inputs: [
    {
      id: 'views',
      label: 'Vues moyennes par vidéo',
      type: 'number',
      unit: 'vues',
      defaultValue: 50000,
      min: 0,
      step: 1000,
    },
    {
      id: 'videos',
      label: 'Vidéos publiées par mois',
      type: 'number',
      unit: 'vidéos',
      defaultValue: 20,
      min: 0,
      step: 1,
    },
    {
      id: 'niche',
      label: 'Niche du compte',
      type: 'select',
      defaultValue: 'lifestyle',
      options: Object.entries(NICHE_RPM).map(([value, n]) => ({ value, label: n.label })),
    },
    {
      id: 'sponsorMonth',
      label: 'Sponsorings par mois (estimé)',
      type: 'number',
      unit: 'partenariats',
      defaultValue: 1,
      min: 0,
      step: 1,
      help: 'Mets 0 si tu n’as pas encore de marque.',
    },
  ],

  compute: (values) => {
    const views = Number(values.views) || 0;
    const videos = Number(values.videos) || 0;
    const niche = NICHE_RPM[String(values.niche)] ?? NICHE_RPM.lifestyle;
    const sponsorMonth = Number(values.sponsorMonth) || 0;

    const monthlyViews = views * videos;
    const creatorFund = (monthlyViews / 1000) * niche.creator;
    const sponsoring = sponsorMonth * niche.sponsor * (views / 10000);

    const total = creatorFund + sponsoring;
    const min = total * 0.6;
    const max = total * 1.6;

    return {
      primary: {
        label: 'Revenus mensuels estimés',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        {
          label: 'Creator Fund',
          value: creatorFund,
          unit: '€',
          formatted: formatEuros(creatorFund),
        },
        {
          label: 'Sponsoring',
          value: sponsoring,
          unit: '€',
          formatted: formatEuros(sponsoring),
        },
      ],
      range: { min, max, formatted: formatRange(min, max) },
      notes: [
        'Estimation indicative — les revenus réels dépendent fortement de la niche, du pays et de l’engagement.',
        'Le Creator Fund est très variable (1–4 € pour 100 000 vues en moyenne).',
      ],
    };
  },

  explanation: `Les revenus TikTok proviennent principalement de **deux sources** : le **Creator Fund** (et son successeur le Creativity Program), qui paie les créateurs au nombre de vues, et les **partenariats sponsorisés** avec des marques. Pour la majorité des comptes, le sponsoring représente plus de 80 % des revenus à partir de quelques dizaines de milliers d’abonnés.

Le **Creator Fund** rémunère entre **0,02 € et 0,04 € pour 1 000 vues**, soit environ 2 à 4 € pour 100 000 vues. Ce taux dépend de la niche, du taux de complétion et du pays des vues. Une vidéo virale à 1 million de vues rapporte donc rarement plus de 25 à 40 €.

Le **sponsoring** dépend de la **niche** (la finance et le B2B paient 3 à 5 fois plus que le divertissement), du nombre de vues moyennes et du taux d’engagement. Une fourchette réaliste : 6 à 18 € pour 10 000 vues garanties par publication.

Cette estimation **n’inclut pas** les revenus annexes (produits dérivés, formations, abonnements TikTok LIVE, redirection vers d’autres plateformes) qui peuvent multiplier les revenus par 2 à 5 pour les créateurs établis.`,

  examples: {
    columns: [
      { key: 'profile', label: 'Profil' },
      { key: 'views', label: 'Vues / vidéo' },
      { key: 'videos', label: 'Vidéos / mois' },
      { key: 'monthly', label: 'Estimation', unit: '€/mois' },
    ],
    rows: [
      { profile: 'Petit compte lifestyle', views: '20 000', videos: 15, monthly: '60 – 180' },
      { profile: 'Compte beauté en croissance', views: '80 000', videos: 20, monthly: '400 – 900' },
      { profile: 'Compte finance établi', views: '150 000', videos: 12, monthly: '1 200 – 2 800' },
      { profile: 'Gros créateur gaming', views: '500 000', videos: 25, monthly: '4 000 – 9 000' },
    ],
  },

  faq: [
    {
      q: 'Combien rapporte 1 million de vues sur TikTok ?',
      a: 'Sur le Creator Fund seul, environ 20 à 40 €. Avec du sponsoring intégré dans la vidéo, cela peut monter à plusieurs centaines voire milliers d’euros selon la niche.',
    },
    {
      q: 'Faut-il combien d’abonnés pour gagner sa vie sur TikTok ?',
      a: 'En général, un revenu équivalent au SMIC français (~1 400 € net) demande 100 000 à 300 000 abonnés actifs avec des partenariats réguliers. Le nombre de vues moyennes compte plus que le nombre d’abonnés.',
    },
    {
      q: 'Le Creator Fund est-il rentable ?',
      a: 'Pas en France à lui seul. Pour un million de vues mensuelles, on parle de 20 à 60 €. Le Creator Fund sert à compléter, pas à vivre.',
    },
    {
      q: 'Les TikTokeurs paient des impôts ?',
      a: 'Oui : statut auto-entrepreneur, micro-BNC ou société selon le volume. À partir de 77 700 € de chiffre d’affaires annuel, il faut basculer en société (EURL/SASU).',
    },
  ],

  related: ['combien-je-gagne-freelance', 'auto-entrepreneur-brut-net'],
};
