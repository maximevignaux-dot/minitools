import type { Tool } from '@/types/tool';
import { formatEuros, formatRange } from '@/lib/format';

const NICHE_RPM_TWITCH: Record<string, { ad: number; sub: number; bits: number; label: string }> = {
  gaming: { ad: 2.5, sub: 2.5, bits: 0.008, label: 'Gaming' },
  irl: { ad: 1.8, sub: 2.5, bits: 0.006, label: 'IRL / Just Chatting' },
  tech: { ad: 4, sub: 2.5, bits: 0.01, label: 'Tech / Coding' },
  esport: { ad: 3, sub: 2.5, bits: 0.012, label: 'Esport compétitif' },
  music: { ad: 2, sub: 2.5, bits: 0.005, label: 'Musique / création' },
};

export const twitchRevenus: Tool = {
  slug: 'combien-rapporte-twitch',
  category: 'internet',
  h1: 'Combien rapporte Twitch ?',
  metaTitle: 'Combien rapporte Twitch 2026 — revenus streamer calculés',
  metaDescription:
    'Estime les revenus d’un streamer Twitch : subs, bits, ads, dons. Calcul selon viewers moyens, abonnés payants et durée de stream.',
  intro:
    'Combien gagne un streamer Twitch chaque mois ? Renseigne tes viewers moyens, tes abonnés payants et la durée de tes streams : tu obtiens une estimation détaillée par source de revenu.',
  keywords: ['twitch', 'revenus streamer', 'subs', 'bits', 'partenaire', 'affilié'],
  lastmod: '2026-05-14',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'Un streamer Twitch touche en moyenne 2,50 € par abonné payant (50/50 avec Twitch, 70/30 pour les partenaires), 0,80 ct par bit, et 2-4 €/1 000 pubs. Avec 100 viewers et 200 subs, compte ~600-900 €/mois.',

  keyTakeaways: [
    'Subs : Twitch garde 50 % (30 % pour les Partenaires top tier). Un sub = ~2,50 € net pour le streamer.',
    'Bits : 1 bit = 0,01 $ pour le streamer, soit ~0,008 € net après conversion et frais.',
    'Pré-rolls et pubs mid-roll : 2 à 4 € pour 1 000 publicités diffusées (CPM modeste).',
    'Top revenus = sponsoring direct et collaborations YouTube, bien au-delà du streaming pur.',
  ],

  howTo: [
    {
      name: 'Renseigne tes viewers moyens',
      text: 'Moyenne sur 30 jours visible dans Twitch Analytics. Plus important que le pic ponctuel.',
    },
    {
      name: 'Indique ton nombre de subs payants',
      text: 'Abonnés Tier 1 (4,99 $), Tier 2 (9,99 $), Tier 3 (24,99 $). Twitch en retient la moitié.',
    },
    {
      name: 'Saisis tes heures de stream / mois',
      text: 'La régularité prime. 4-6 heures par jour minimum pour pro à plein temps.',
    },
    {
      name: 'Choisis ta niche',
      text: 'Gaming, IRL, tech, esport, musique — chaque niche a un CPM publicitaire différent.',
    },
  ],

  useCases: [
    {
      title: 'Estimer ton revenu si tu deviens Partenaire',
      description: 'Le passage Affilié → Partenaire peut faire grimper la part du sub de 50 à 70 % chez les top streamers.',
    },
    {
      title: 'Comparer Twitch vs YouTube Live',
      description: 'YouTube paie le CPM AdSense ; Twitch dépend plus des subs et bits. Choisir selon ton audience.',
    },
    {
      title: 'Fixer ton tarif sponsoring',
      description: 'Avec un CCV (viewers moyens en stream) connu, calibre ton tarif par stream sponsorisé.',
    },
    {
      title: 'Valider la viabilité d’un streaming à temps plein',
      description: 'Convertis ton CCV en revenu mensuel : à 100 viewers, on est encore loin du Smic. À 500-1 000, c’est jouable.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre brut Twitch et net en poche',
      description: 'Un sub à 4,99 € te laisse ~2,50 € après la part Twitch + change €/$ + frais Paypal/Stripe.',
    },
    {
      title: 'Surestimer la viralité des bits',
      description: 'Les viewers ne donnent en moyenne que 0,10 à 0,30 € de bits par stream. C’est rarement un revenu significatif.',
    },
    {
      title: 'Streamer 8h/jour sans repos',
      description: 'Twitch valorise la régularité mais brûle ses streamers. Burn-out fréquent à 6 mois si on dépasse 40h/semaine sans pause.',
    },
    {
      title: 'Compter sur la pub pendant des heures creuses',
      description: 'Le CPM dépend de tes pays d’audience. 60 % audience France = revenu pub moyen ; 80 % USA/UK = 2-3× plus.',
    },
  ],

  sources: [
    {
      label: 'Twitch — Programme Affilié et Partenaire',
      url: 'https://www.twitch.tv/p/fr-fr/partners/',
    },
    {
      label: 'Twitch Help — Sub revenue split',
      url: 'https://help.twitch.tv/s/article/partner-revenue',
    },
  ],

  inputs: [
    {
      id: 'viewers',
      label: 'Viewers moyens (CCV) en live',
      type: 'number',
      unit: 'viewers',
      defaultValue: 100,
      min: 0,
      step: 10,
    },
    {
      id: 'subs',
      label: 'Abonnés payants (Tier 1 équivalents)',
      type: 'number',
      unit: 'subs',
      defaultValue: 200,
      min: 0,
      step: 10,
    },
    {
      id: 'heures',
      label: 'Heures de stream / mois',
      type: 'number',
      unit: 'heures',
      defaultValue: 100,
      min: 0,
      step: 10,
    },
    {
      id: 'niche',
      label: 'Niche de stream',
      type: 'select',
      defaultValue: 'gaming',
      options: Object.entries(NICHE_RPM_TWITCH).map(([value, n]) => ({ value, label: n.label })),
    },
  ],

  compute: (values) => {
    const viewers = Math.max(0, Number(values.viewers) || 0);
    const subs = Math.max(0, Number(values.subs) || 0);
    const heures = Math.max(0, Number(values.heures) || 0);
    const niche = NICHE_RPM_TWITCH[String(values.niche)] ?? NICHE_RPM_TWITCH.gaming;

    // Revenu subs : ~2,50 € net par sub Tier 1
    const revSubs = subs * niche.sub;
    // Pubs : 2 mid-rolls/heure × CCV × heures
    const impressions = viewers * heures * 2;
    const revAds = (impressions / 1000) * niche.ad;
    // Bits : ~30 bits/viewer/mois
    const totalBits = viewers * 30;
    const revBits = totalBits * niche.bits;
    // Estimation dons : 5 % des subs en équivalent
    const revDons = subs * 0.5;

    const total = revSubs + revAds + revBits + revDons;
    const totalMin = total * 0.7;
    const totalMax = total * 1.3;

    return {
      primary: {
        label: 'Revenu mensuel estimé (brut Twitch)',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        { label: 'Subs (part streamer 50 %)', value: revSubs, unit: '€', formatted: formatEuros(revSubs) },
        { label: 'Publicités (mid-rolls)', value: revAds, unit: '€', formatted: formatEuros(revAds) },
        { label: 'Bits', value: revBits, unit: '€', formatted: formatEuros(revBits) },
        { label: 'Dons directs estimés', value: revDons, unit: '€', formatted: formatEuros(revDons) },
        { label: 'Fourchette mensuelle', value: totalMin, unit: '€', formatted: formatRange(totalMin, totalMax) },
      ],
      notes: [
        'Estimation basée sur le partage 50/50 des subs (Affilié). Les Partenaires top tier ont 70/30 — ajuste à la hausse de 40 %.',
        'Hors sponsoring direct, donations Streamlabs ponctuelles et revenus YouTube cross-platform.',
        'Conversion $ → € + frais Paypal/Stripe non déduits — compte 5-8 % de moins en net réel.',
      ],
    };
  },

  explanation: `Les revenus d'un streamer Twitch viennent de **4 sources principales** :

**1. Abonnements (subs)** : c'est la rente du streaming.
- Tier 1 : 4,99 $ — streamer touche **~2,50 €** (split 50/50 Affilié, 70/30 Partenaire).
- Tier 2 : 9,99 $ — ~5 € pour le streamer.
- Tier 3 : 24,99 $ — ~12,50 € pour le streamer.
- Les **subs Prime** (gratuits pour les abonnés Amazon Prime) rapportent autant qu'un Tier 1.

**2. Bits (cheers)** : monnaie virtuelle envoyée par les viewers.
- 1 bit = 0,01 $ pour le streamer.
- **0,8 ct €** net après frais.
- Anecdotique en volume (sauf gros raids), souvent 0,10-0,30 € par stream.

**3. Publicités** : pré-rolls (au début) et mid-rolls (pendant).
- CPM Twitch : **2-4 €** pour 1 000 pubs diffusées.
- Tu choisis quand déclencher un mid-roll (max 2/heure recommandé).
- Le CPM dépend fortement de ta géographie d'audience.

**4. Dons directs** (Streamlabs, PayPal, etc.) : net pour le streamer après frais plateforme.

**Exemple — 100 viewers moyens, 200 subs Tier 1, gaming** :
- Subs : 200 × 2,50 € = **500 €**
- Pubs : 100 × 100 h × 2 / 1 000 × 2,50 € = **50 €**
- Bits : 100 × 30 × 0,008 € = **24 €**
- Dons estimés : **100 €**
- **Total brut : ~675 €/mois**

**Les vrais revenus des gros streamers** ne viennent **pas** du streaming Twitch en lui-même. Ils viennent du **sponsoring direct** (G-FUEL, équipement gaming, marques tech), des **collaborations YouTube** (vidéos en parallèle), et des **événements live** (DreamHack, ZeventH). Le streaming brûle des heures mais reste un produit d'appel pour des deals bien plus rémunérateurs.

Lié : [combien rapporte YouTube](/internet/combien-rapporte-youtube), [combien rapporte TikTok](/internet/combien-rapporte-tiktok).`,

  examples: {
    columns: [
      { key: 'profile', label: 'Profil' },
      { key: 'viewers', label: 'Viewers' },
      { key: 'subs', label: 'Subs' },
      { key: 'revenu', label: 'Revenu mensuel brut' },
    ],
    rows: [
      { profile: 'Affilié débutant', viewers: '10', subs: '20', revenu: '~80 €' },
      { profile: 'Affilié confirmé', viewers: '100', subs: '200', revenu: '~675 €' },
      { profile: 'Partenaire moyen', viewers: '500', subs: '1 000', revenu: '~3 800 €' },
      { profile: 'Partenaire top', viewers: '2 000', subs: '5 000', revenu: '~18 000 €' },
      { profile: 'Très top stream', viewers: '10 000', subs: '20 000', revenu: '~75 000 €' },
    ],
  },

  faq: [
    {
      q: 'Quel est le partage des revenus sur Twitch ?',
      a: "Pour les Affiliés : 50/50 sur les subs. Pour les Partenaires (sélection éditoriale après seuils précis), Twitch a annoncé un nouveau partage 70/30 sur les premiers 100 000 $ annuels, puis 50/50 au-delà.",
    },
    {
      q: 'Comment passer Affilié puis Partenaire ?',
      a: "Affilié : 50 followers, 500 minutes streamées, 7 jours uniques de stream, 3 viewers moyens — sur 30 jours. Partenaire : sélection par Twitch après >75 viewers moyens, streams réguliers sur plusieurs mois et candidature manuelle.",
    },
    {
      q: 'Les bits rapportent-ils beaucoup ?',
      a: "Rarement. Un viewer moyen donne 10-50 bits par mois (soit ~0,10-0,40 €). Sur 100 viewers : ~20-40 € de bits/mois. Anecdotique sauf pour les très gros streams ou les raids massifs.",
    },
    {
      q: 'Twitch ou YouTube Live pour gagner sa vie ?',
      a: "Twitch reste leader sur les subs récurrents et la culture de la chaîne. YouTube Live monétise mieux les vues VOD post-stream via AdSense. La meilleure stratégie est souvent de streamer sur Twitch et recycler les highlights sur YouTube.",
    },
  ],

  related: ['combien-rapporte-youtube', 'combien-rapporte-tiktok', 'combien-rapporte-instagram'],
};
