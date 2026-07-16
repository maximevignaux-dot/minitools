import type { Tool } from '@/types/tool';
import { formatEuros, formatRange } from '@/lib/format';

const NICHE_RPM_YT: Record<string, { rpm: number; sponsor: number; label: string }> = {
  lifestyle: { rpm: 1.2, sponsor: 12, label: 'Lifestyle / vlog' },
  beauty: { rpm: 2.0, sponsor: 18, label: 'Beauté / mode' },
  gaming: { rpm: 1.5, sponsor: 14, label: 'Gaming' },
  finance: { rpm: 8, sponsor: 35, label: 'Finance / business' },
  tech: { rpm: 5, sponsor: 25, label: 'Tech / produits' },
  kids: { rpm: 0.5, sponsor: 5, label: 'Famille / enfants' },
};

export const youtubeRevenus: Tool = {
  slug: 'combien-rapporte-youtube',
  category: 'internet',
  h1: 'Combien rapporte YouTube ?',
  metaTitle: 'Combien rapporte YouTube ? Calculateur de revenus 2026',
  metaDescription:
    'Estime tes revenus YouTube selon tes vues mensuelles, ta niche et tes sponsorings. AdSense + Shorts + partenariats. Gratuit, sans inscription.',
  intro:
    'Combien rapporte une chaîne YouTube par mois ? Renseigne tes vues mensuelles, ta niche et la part de Shorts : tu obtiens une estimation des revenus AdSense et sponsoring.',
  keywords: ['youtube', 'revenus', 'adsense', 'rpm', 'sponsoring', 'shorts'],
  lastmod: '2026-05-08',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'YouTube paie 0,5 à 5 € pour 1 000 vues monétisées selon ta niche — finance et tech grimpent à 10 €+, gaming reste autour de 1 €. Compte 80 % AdSense, 20 % sponso/Membres.',

  keyTakeaways: [
    'Le RPM (revenu pour 1 000 vues) dépend surtout de ta niche : finance > tech > lifestyle > gaming > kids.',
    'Seules les vues monétisées comptent — AdBlock et la majorité des Shorts sont exclus du calcul long-format.',
    'Audience pays riches (US, UK, FR, DE) = RPM 2 à 3× plus élevé que pays émergents.',
    'Diversifie : Membres, Super Chats, sponsoring direct, produits propres peuvent doubler tes revenus AdSense.',
  ],

  howTo: [
    {
      name: 'Saisis tes vues mensuelles long-format',
      text: 'Distingue bien long-format (>1 min) des Shorts, qui ont un RPM 5 à 10× plus bas.',
    },
    {
      name: 'Choisis ta niche de contenu',
      text: 'Finance/business, tech, beauté, gaming, lifestyle — chaque niche a son RPM AdSense de référence.',
    },
    {
      name: 'Indique ta part de Shorts',
      text: 'Plus tu fais de Shorts, plus le RPM moyen baisse — l’outil ajuste l’estimation en conséquence.',
    },
    {
      name: 'Lis ton revenu mensuel estimé',
      text: 'Revenu AdSense + sponsoring estimé selon ta niche et ton volume d’audience.',
    },
  ],

  useCases: [
    {
      title: 'Décider si tu peux vivre de YouTube',
      description: 'Calcule le volume de vues nécessaire pour atteindre un revenu cible à temps plein.',
    },
    {
      title: 'Choisir ta niche au démarrage',
      description: 'Compare le potentiel financier de plusieurs niches avant de te spécialiser.',
    },
    {
      title: 'Estimer le ROI d’un investissement',
      description: 'Caméra, monteur, miniature pro : évalue si l’investissement sera rentabilisé.',
    },
    {
      title: 'Comparer YouTube vs TikTok',
      description: 'Visualise sur quelle plateforme ton type de contenu sera le plus rentable.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre vues totales et vues monétisées',
      description: 'Le RPM s’applique uniquement aux vues monétisées. AdBlock, audience kids, vues non monétisables sortent du calcul.',
    },
    {
      title: 'Appliquer un RPM finance à une chaîne lifestyle',
      description: 'Les écarts entre niches sont énormes (10× entre finance et gaming). Utilise un RPM réaliste pour ton sujet.',
    },
    {
      title: 'Ignorer la répartition géographique',
      description: 'Une audience 80 % US/UK/FR paye 2-3× plus qu’une audience pays émergents. Vérifie tes données YouTube Analytics.',
    },
    {
      title: 'Inclure les Shorts dans le RPM long-format',
      description: 'Le RPM Shorts est 5-10× plus bas. Sépare les deux dans tes projections pour ne pas surestimer le revenu.',
    },
  ],

  sources: [
    {
      label: 'YouTube Help — Programme Partenaire',
      url: 'https://support.google.com/youtube/answer/72857',
    },
    {
      label: 'Google AdSense — Comment sont calculés les revenus',
      url: 'https://support.google.com/adsense/answer/180195',
    },
  ],

  inputs: [
    {
      id: 'monthlyViews',
      label: 'Vues mensuelles totales',
      type: 'number',
      unit: 'vues',
      defaultValue: 200000,
      min: 0,
      step: 10000,
    },
    {
      id: 'niche',
      label: 'Niche de la chaîne',
      type: 'select',
      defaultValue: 'tech',
      options: Object.entries(NICHE_RPM_YT).map(([value, n]) => ({ value, label: n.label })),
    },
    {
      id: 'shortsRatio',
      label: 'Part de Shorts dans tes vues',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: 'Aucun (vidéos longues uniquement)' },
        { value: '0.3', label: 'Environ 30 %' },
        { value: '0.6', label: 'Environ 60 %' },
        { value: '0.9', label: 'Surtout des Shorts' },
      ],
      help: 'Les Shorts paient ~10 à 30 fois moins que les vidéos longues.',
    },
    {
      id: 'sponsorMonth',
      label: 'Sponsorings par mois (estimé)',
      type: 'number',
      unit: 'partenariats',
      defaultValue: 1,
      min: 0,
      step: 1,
    },
  ],

  compute: (values) => {
    const monthlyViews = Number(values.monthlyViews) || 0;
    const niche = NICHE_RPM_YT[String(values.niche)] ?? NICHE_RPM_YT.tech;
    const shortsRatio = Math.min(1, Math.max(0, Number(values.shortsRatio) || 0));
    const sponsorMonth = Number(values.sponsorMonth) || 0;

    const longViews = monthlyViews * (1 - shortsRatio);
    const shortsViews = monthlyViews * shortsRatio;

    const adsenseLong = (longViews / 1000) * niche.rpm;
    const adsenseShorts = (shortsViews / 1000) * 0.05;
    const adsense = adsenseLong + adsenseShorts;

    const sponsoring = sponsorMonth * niche.sponsor * (monthlyViews / 100000);

    const total = adsense + sponsoring;
    const min = total * 0.6;
    const max = total * 1.5;

    return {
      primary: {
        label: 'Revenus mensuels estimés',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        {
          label: 'AdSense (vidéos longues)',
          value: adsenseLong,
          unit: '€',
          formatted: formatEuros(adsenseLong),
        },
        {
          label: 'AdSense (Shorts)',
          value: adsenseShorts,
          unit: '€',
          formatted: formatEuros(adsenseShorts),
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
        'RPM = revenu pour 1 000 vues monétisées. Variable selon le pays, la saison (Q4 +30 à 50 %), et la durée des vidéos.',
        'Les Shorts utilisent un pool de revenus dédié, beaucoup moins rémunérateur que la pub pré-roll.',
      ],
    };
  },

  explanation: `Les revenus YouTube proviennent principalement de **trois sources** : **AdSense** (publicité programmatique), les **Shorts** (pool de revenus partagé), et les **partenariats** sponsorisés.

**RPM AdSense moyens en France 2026** (par 1 000 vues monétisées) :
- **Famille / enfants** : 0,40 à 0,80 € (audience COPPA, peu de pub ciblée)
- **Lifestyle / vlog** : 1 à 2 €
- **Gaming** : 1 à 2,50 €
- **Beauté / mode** : 1,50 à 3 €
- **Tech / produits** : 3 à 7 €
- **Finance / business / B2B** : 6 à 15 €

YouTube **prélève 45 %** des revenus pub. Le RPM affiché par YouTube est déjà net.

Les **Shorts** rapportent en moyenne **0,03 à 0,08 € pour 1 000 vues** — soit 10 à 30 fois moins qu'une vidéo longue. Privilégie les Shorts pour la croissance, les vidéos de 8–20 min pour la monétisation.

Le **sponsoring** dépend de la niche, du nombre de vues moyennes par vidéo et de l'engagement. Une intégration de marque de 60–90 secondes vaut typiquement **15 à 35 € pour 10 000 vues** garanties (CPM influenceur).

Les **revenus annexes** non comptés ici peuvent doubler ou tripler le total : **memberships** (~3 à 5 €/mois), **Super Thanks**, **affiliation Amazon / produits**, **vente de formations**, **Patreon**.`,

  examples: {
    columns: [
      { key: 'profile', label: 'Profil' },
      { key: 'views', label: 'Vues / mois' },
      { key: 'niche', label: 'Niche' },
      { key: 'monthly', label: 'Estimation', unit: '€/mois' },
    ],
    rows: [
      { profile: 'Petite chaîne lifestyle', views: '50 000', niche: 'Lifestyle', monthly: '60 – 180' },
      { profile: 'Chaîne gaming en croissance', views: '300 000', niche: 'Gaming', monthly: '450 – 1 200' },
      { profile: 'Chaîne tech établie', views: '800 000', niche: 'Tech', monthly: '4 000 – 9 000' },
      { profile: 'Chaîne finance B2B', views: '500 000', niche: 'Finance', monthly: '4 500 – 12 000' },
    ],
  },

  faq: [
    {
      q: 'Combien rapporte 1 million de vues sur YouTube ?',
      a: "Très variable : 500 € pour une chaîne kids, 2 à 4 000 € pour une chaîne tech ou finance. Compte un RPM moyen tous secteurs autour de 2 €/1 000 vues monétisables.",
    },
    {
      q: 'Faut-il combien d’abonnés pour vivre de YouTube ?',
      a: "En France, autour de **100 000 à 200 000 abonnés actifs** pour atteindre l'équivalent du SMIC en cumulant AdSense + sponsoring + revenus annexes. Le nombre de vues mensuelles compte plus que le nombre d'abonnés.",
    },
    {
      q: 'Les Shorts sont-ils rentables ?',
      a: "Pas directement. Le RPM des Shorts est 10 à 30× plus faible. Mais ils sont excellents pour la **découverte** et nourrir une chaîne longue. Stratégie classique : Shorts pour grandir, vidéos longues pour monétiser.",
    },
    {
      q: 'Quels sont les seuils pour activer la monétisation ?',
      a: "1 000 abonnés + 4 000 heures de visionnage sur 12 mois (vidéos longues), OU 1 000 abonnés + 10 millions de vues Shorts sur 90 jours.",
    },
  ],

  related: ['combien-rapporte-tiktok', 'combien-je-gagne-freelance', 'auto-entrepreneur-brut-net'],
};
