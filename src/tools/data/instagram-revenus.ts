import type { Tool } from '@/types/tool';
import { formatEuros, formatRange } from '@/lib/format';

const NICHE_RPM_IG: Record<string, { sponsor: number; engagement: number; label: string }> = {
  lifestyle: { sponsor: 12, engagement: 0.025, label: 'Lifestyle / mode de vie' },
  beauty: { sponsor: 18, engagement: 0.03, label: 'Beauté / mode' },
  food: { sponsor: 10, engagement: 0.028, label: 'Cuisine / food' },
  fitness: { sponsor: 14, engagement: 0.035, label: 'Sport / fitness' },
  travel: { sponsor: 16, engagement: 0.022, label: 'Voyage / lifestyle' },
  finance: { sponsor: 25, engagement: 0.018, label: 'Business / finance' },
};

export const instagramRevenus: Tool = {
  slug: 'combien-rapporte-instagram',
  category: 'internet',
  h1: 'Combien rapporte Instagram ?',
  metaTitle: 'Combien rapporte Instagram 2026 — calculateur revenus créateur',
  metaDescription:
    'Estime tes revenus Instagram selon ton nombre d’abonnés, ta niche et tes publications. Tarif par post, partenariats marque, Reels.',
  intro:
    'Combien gagne un compte Instagram chaque mois ? Renseigne ton nombre d’abonnés, ta niche et le nombre de posts sponsorisés : tu obtiens une estimation de ton tarif par post et de ton revenu mensuel.',
  keywords: ['instagram', 'revenus', 'sponsoring', 'partenariat marque', 'influenceur', 'reels'],
  lastmod: '2026-05-14',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'Compte ~25 €/1 000 abonnés par post sponsorisé en niche lifestyle (jusqu’à 50 €/1k abonnés en finance/business). Pour 50 000 abonnés et 4 partenariats/mois, ton revenu mensuel atteint 4 000-6 000 €.',

  keyTakeaways: [
    'Tarif moyen par post sponsorisé : 1 % à 5 % du nombre d’abonnés (selon niche et engagement).',
    'Niches B2B / finance / business : tarifs 2-3× supérieurs à lifestyle / food.',
    'Instagram ne paie pas directement les créateurs (pas de programme pub comme YouTube AdSense).',
    'Reels payés via le "Reels Bonus" jusqu’en 2023, désormais arrêté en France — revenus = uniquement sponsoring et affiliation.',
  ],

  howTo: [
    {
      name: 'Renseigne ton nombre d’abonnés réel',
      text: 'Abonnés actifs, pas ceux gonflés artificiellement. L’engagement est plus important que le total.',
    },
    {
      name: 'Saisis ton nombre de posts sponsorisés / mois',
      text: 'Un compte sain garde un ratio max de 1 post sponso pour 4-5 posts organiques, sinon perte d’engagement.',
    },
    {
      name: 'Choisis ta niche de contenu',
      text: 'Beauté, food, voyage, lifestyle, fitness, business — chaque niche a un tarif marché différent.',
    },
    {
      name: 'Lis ton revenu estimé',
      text: 'Tarif par post et revenu mensuel total, incluant une fourchette pour refléter les variations marché.',
    },
  ],

  useCases: [
    {
      title: 'Fixer ton tarif partenariat',
      description: 'Présente à une marque un tarif justifié selon les standards du marché de ta niche.',
    },
    {
      title: 'Évaluer le potentiel d’une niche',
      description: 'Avant de lancer un compte, vérifie quel revenu théorique tu peux viser.',
    },
    {
      title: 'Comparer Instagram, TikTok et YouTube',
      description: 'Vois sur quelle plateforme ton type de contenu sera le plus rentable.',
    },
    {
      title: 'Décider si miser sur Instagram à temps plein',
      description: 'Compare le revenu projeté à ton salaire actuel avant de quitter ton job.',
    },
  ],

  pitfalls: [
    {
      title: 'Surestimer son tarif sans engagement réel',
      description: 'Un compte avec 200 k abonnés mais 0,5 % d’engagement vaudra moins qu’un compte 50 k à 5 % d’engagement.',
    },
    {
      title: 'Ignorer la saturation publicitaire',
      description: 'Au-delà de 25 % de posts sponsos, ton audience décroche — perte d’engagement = perte de tarif.',
    },
    {
      title: 'Compter sur la rémunération native Instagram',
      description: 'Le Reels Bonus a été arrêté en Europe en 2023. Aucune monétisation directe disponible — uniquement partenariats et affiliation.',
    },
    {
      title: 'Oublier la fiscalité d’influence',
      description: 'Les revenus de sponsoring sont des BNC. Au-delà de 77 700 €, sortie automatique du régime micro-entreprise.',
    },
  ],

  sources: [
    {
      label: 'Meta Creators — Programmes de monétisation',
      url: 'https://www.facebook.com/creators/',
    },
    {
      label: 'ARPP — Recommandations influenceurs',
      url: 'https://www.arpp.org/',
    },
  ],

  inputs: [
    {
      id: 'followers',
      label: 'Nombre d’abonnés',
      type: 'number',
      unit: 'abonnés',
      defaultValue: 50000,
      min: 0,
      step: 1000,
    },
    {
      id: 'posts',
      label: 'Posts sponsorisés / mois',
      type: 'number',
      unit: 'posts',
      defaultValue: 4,
      min: 0,
      max: 30,
      step: 1,
    },
    {
      id: 'niche',
      label: 'Niche de contenu',
      type: 'select',
      defaultValue: 'lifestyle',
      options: Object.entries(NICHE_RPM_IG).map(([value, n]) => ({ value, label: n.label })),
    },
  ],

  compute: (values) => {
    const followers = Math.max(0, Number(values.followers) || 0);
    const posts = Math.max(0, Number(values.posts) || 0);
    const niche = NICHE_RPM_IG[String(values.niche)] ?? NICHE_RPM_IG.lifestyle;

    // Tarif par post : ~ followers / 1000 * sponsor€
    const tarifMin = (followers / 1000) * niche.sponsor * 0.7;
    const tarifMax = (followers / 1000) * niche.sponsor * 1.3;
    const tarifMoyen = (tarifMin + tarifMax) / 2;
    const revenuMin = tarifMin * posts;
    const revenuMax = tarifMax * posts;
    const revenuMoyen = tarifMoyen * posts;

    return {
      primary: {
        label: 'Revenu mensuel estimé (sponsoring)',
        value: revenuMoyen,
        unit: '€',
        formatted: formatEuros(revenuMoyen),
      },
      secondary: [
        { label: 'Tarif par post (moyen)', value: tarifMoyen, unit: '€', formatted: formatEuros(tarifMoyen) },
        { label: 'Fourchette par post', value: tarifMin, unit: '€', formatted: formatRange(tarifMin, tarifMax) },
        { label: 'Fourchette mensuelle', value: revenuMin, unit: '€', formatted: formatRange(revenuMin, revenuMax) },
        { label: 'Engagement attendu (niche)', value: niche.engagement, unit: '%', formatted: `${(niche.engagement * 100).toFixed(1)} %` },
      ],
      notes: [
        'Estimation marché 2026 hors affiliation, vente de produits propres et boutiques Instagram Shop.',
        'L’engagement réel de ton compte module le tarif final de ±30-50 % (un compte engagé à 5 % vaut 2× un compte engagé à 1 %).',
        'Aucune rémunération directe Instagram (pas de programme pub natif) — uniquement sponsoring, affiliation et vente.',
      ],
    };
  },

  explanation: `Instagram ne paie **pas directement** les créateurs comme YouTube avec AdSense. Tes revenus viennent presque exclusivement de **partenariats marque** et **d'affiliation**.

**Tarif moyen par post sponsorisé** :
- **Lifestyle / food / voyage** : 1 à 2 % du nombre d'abonnés (10-25 €/1 000 abonnés)
- **Beauté / mode** : 2 à 3 % (15-30 €/1 000 abonnés)
- **Fitness / sport** : 2 à 3 %
- **Business / finance / B2B** : 3 à 5 % (25-50 €/1 000 abonnés) — public à fort pouvoir d'achat

**Engagement = multiplicateur de tarif** : un compte avec un taux d'engagement >5 % peut facturer **2 à 3× plus** qu'un compte similaire à 1 %. Les marques sérieuses regardent l'engagement avant le nombre d'abonnés.

**Exemple — compte lifestyle 50 000 abonnés** :
- Tarif par post : ~750 € (moyenne, fourchette 525-975 €)
- 4 partenariats/mois : revenu mensuel **~3 000 €**
- Ajoute affiliation Amazon / programmes : +20-30 %

**Formats payants** :
- **Post statique** : tarif référence
- **Reels** : +30-50 % (très demandés par les marques)
- **Story sponsor** : 30-50 % du tarif post
- **Carrousel** : équivalent à un post

**Plafond de sponsoring** : au-delà de **25 % de contenu sponsorisé**, l'audience décroche. Ratio sain : 1 post sponso pour 4-5 posts organiques.

Lié : [combien rapporte TikTok](/internet/combien-rapporte-tiktok), [combien rapporte YouTube](/internet/combien-rapporte-youtube).`,

  examples: {
    columns: [
      { key: 'followers', label: 'Abonnés' },
      { key: 'niche', label: 'Niche' },
      { key: 'post', label: 'Tarif/post' },
      { key: 'mensuel', label: 'Revenu mensuel (4 sponsos)' },
    ],
    rows: [
      { followers: '10 000', niche: 'Lifestyle', post: '~120 €', mensuel: '~480 €' },
      { followers: '50 000', niche: 'Lifestyle', post: '~600 €', mensuel: '~2 400 €' },
      { followers: '50 000', niche: 'Beauté', post: '~900 €', mensuel: '~3 600 €' },
      { followers: '100 000', niche: 'Finance', post: '~2 500 €', mensuel: '~10 000 €' },
      { followers: '500 000', niche: 'Fitness', post: '~7 000 €', mensuel: '~28 000 €' },
    ],
  },

  faq: [
    {
      q: 'Instagram paie-t-il directement les créateurs ?',
      a: "Non. Instagram (Meta) ne verse aucune rémunération native en France. Le programme Reels Bonus a été arrêté en Europe en 2023. Tes revenus dépendent à 100 % de partenariats marque, d'affiliation et de tes propres produits/services.",
    },
    {
      q: 'À partir de combien d’abonnés peut-on être rémunéré ?',
      a: "Dès ~5 000 abonnés engagés (>3 %), les petites marques s'intéressent. À 10-20 k tu peux commencer à facturer, à 50 k+ tu peux en faire un revenu d'appoint sérieux, et 100 k+ permet souvent d'en vivre selon ta niche.",
    },
    {
      q: 'Faut-il déclarer ses revenus de sponsoring ?',
      a: "Oui, dès 1 € perçu. Les revenus de sponsoring sont des BNC (bénéfices non commerciaux). Sous 77 700 € : régime micro-BNC possible (abattement 34 %). Au-delà : régime réel obligatoire en BNC ou bascule en société (SASU/EURL).",
    },
    {
      q: 'Les Reels sont-ils plus rentables que les posts ?',
      a: "Pour le sponsoring, oui : les marques paient 30-50 % de plus pour un Reel (plus de portée, format vidéo apprécié). En revanche, Instagram ne te paie pas directement les vues comme YouTube — le seul gain est la visibilité supplémentaire que tu peux monétiser ailleurs.",
    },
  ],

  related: ['combien-rapporte-tiktok', 'combien-rapporte-youtube', 'auto-entrepreneur-brut-net'],
};
