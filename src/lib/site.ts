import type { CategoryMeta, CategorySlug } from '@/types/tool';

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Calcula';

export const SITE_DESCRIPTION =
  'Calculateurs et simulateurs gratuits : revenus, coûts, immobilier, salaire. Résultats instantanés, sans inscription.';

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'revenus',
    label: 'Revenus',
    description: 'Estimer ses revenus de freelance, créateur, auto-entrepreneur.',
    emoji: '💰',
    intro:
      'Toutes les calculatrices pour estimer ton revenu réel selon ton statut : freelance en SASU, auto-entrepreneur, créateur de contenu monétisé. Charges sociales, fiscalité et plafonds 2026 inclus.',
    tldr:
      'Selon ton statut, ton chiffre d’affaires devient entre 50 et 78 % de revenu disponible — l’écart vient des cotisations URSSAF et de l’IR.',
    faq: [
      {
        q: 'Quel statut donne le meilleur revenu net ?',
        a: "Cela dépend du volume : l'auto-entrepreneur est imbattable jusqu'à ~50 k€ de CA, puis la SASU/EURL devient plus avantageuse grâce à la déduction des frais réels et au choix dividendes/salaire.",
      },
      {
        q: 'À quel TJM faut-il facturer pour 4 000 € net/mois en SASU ?',
        a: "Environ 500-550 € HT sur 200 jours/an, le temps de couvrir charges sociales (~45 %), IS, mutuelle, RC pro et compta.",
      },
      {
        q: 'Les revenus de créateur (TikTok, YouTube) sont-ils imposables ?',
        a: "Oui, dès le 1ᵉʳ euro. Les revenus publicitaires sont des BNC en activité non commerciale. Au-delà de 77 700 €, il faut sortir du régime micro.",
      },
    ],
  },
  {
    slug: 'internet',
    label: 'Internet & créateurs',
    description: 'Combien rapportent TikTok, YouTube, Instagram, Twitch.',
    emoji: '📱',
    intro:
      'Combien rapportent les plateformes de contenu ? Calcule tes revenus AdSense, Creator Rewards et partenariats marque selon ta niche, ton volume de vues et ton audience.',
    tldr:
      'YouTube paie 0,5 à 10 €/1 000 vues selon la niche ; TikTok 10× moins. Sur ces plateformes, les partenariats marques rapportent souvent plus que la pub native.',
    faq: [
      {
        q: 'Quelle plateforme paie le mieux par vue ?',
        a: "YouTube long-format reste la plus rémunératrice (RPM 1 à 10 €). TikTok et Instagram Reels paient peu en pub mais offrent un reach viral plus accessible pour décrocher des partenariats marque.",
      },
      {
        q: 'À partir de combien d’abonnés peut-on vivre du contenu ?',
        a: "En finance/business sur YouTube, ~100 k abonnés actifs peuvent générer 3-5 k€/mois en cumulant AdSense, Membres et sponsoring. En lifestyle/gaming, il faut souvent 500 k à 1 M.",
      },
      {
        q: 'Les Shorts YouTube rapportent-ils autant que le long-format ?',
        a: "Non. Le RPM des Shorts est 5 à 10× plus bas (~0,05 €/1 000 vues). C'est un outil d'acquisition d'abonnés, pas une source de revenus directe.",
      },
    ],
  },
  {
    slug: 'couts',
    label: 'Coûts réels',
    description: 'Voiture, essence, leasing, assurance — vrai coût mensuel.',
    emoji: '🚗',
    intro:
      'Calcule le coût réel des dépenses récurrentes — voiture, énergie, abonnements — pour budgétiser et arbitrer en connaissance de cause.',
    tldr:
      'Une voiture moyenne coûte 350-550 €/mois tout compris ; la dépréciation est souvent le 1ᵉʳ poste, devant le carburant et l’assurance.',
    faq: [
      {
        q: 'Quel est le vrai coût mensuel d’une voiture ?',
        a: "Compte 350 à 550 €/mois pour une voiture moyenne possédée sur 5 ans, en additionnant achat amorti, dépréciation, carburant, assurance, entretien et stationnement.",
      },
      {
        q: 'Vaut-il mieux acheter ou louer (LOA/LLD) ?',
        a: "L'achat est moins cher sur le long terme si tu gardes le véhicule >7 ans. La LOA/LLD a un coût mensuel lissé mais inclut une marge plateforme ; intéressant si tu changes souvent ou veux du neuf garanti.",
      },
      {
        q: 'À partir de combien de km/an une électrique est-elle rentable ?',
        a: "Environ 12 000 km/an et 5 ans de détention permettent de rentabiliser le surcoût d'achat grâce aux économies de carburant et d'entretien.",
      },
    ],
  },
  {
    slug: 'immobilier',
    label: 'Immobilier',
    description: 'Airbnb, location, rentabilité, emprunt.',
    emoji: '🏠',
    intro:
      'Calculatrices pour tout projet immobilier : capacité d’emprunt, rentabilité locative (nue ou Airbnb), frais à anticiper. Mise à jour avec les taux et règles HCSF 2026.',
    tldr:
      'Ta mensualité ne peut dépasser 35 % de tes revenus nets (HCSF). En locatif nu, vise 4-6 % brut ; en Airbnb, 8-15 % brut mais charges 2× plus lourdes.',
    faq: [
      {
        q: 'Combien puis-je emprunter avec 3 000 € net/mois ?',
        a: "Sur 25 ans à 3,5 % et 35 % d'endettement, environ 180 000 € + apport, soit un budget total de ~210 000 € frais inclus.",
      },
      {
        q: 'Airbnb est-il plus rentable que la location nue ?',
        a: "En rendement brut souvent oui (8-15 % vs 4-6 %), mais en net, l'écart se réduit fortement après ménage (60-90 €/séjour), commission plateforme (~15 %) et fiscalité.",
      },
      {
        q: 'Faut-il un apport pour acheter en 2026 ?',
        a: "Pas obligatoire mais quasi-systématiquement demandé : 10 % minimum (frais de notaire et garantie). Au-delà, ton apport améliore le taux et le dossier banque.",
      },
    ],
  },
  {
    slug: 'salaire',
    label: 'Salaire & emploi',
    description: 'Brut/net, chômage, retraite, impôts.',
    emoji: '💼',
    intro:
      'Convertis ton brut en net, simule l’impact d’un changement de statut ou d’un 13ᵉ mois. Taux de cotisations URSSAF, AGIRC-ARRCO et prélèvement à la source 2026 intégrés.',
    tldr:
      'En CDI privé, retire 22 % (non-cadre) à 25 % (cadre) de cotisations, puis le PAS. Pour passer du net au brut : net ÷ (1 − taux cotisations).',
    faq: [
      {
        q: 'Quel est le net pour 3 000 € brut en 2026 ?',
        a: "Environ 2 340 € net avant impôt pour un cadre, 2 340 € avant impôt pour un cadre privé (taux ~22 % non-cadre, ~25 % cadre). Soustrais ensuite ton prélèvement à la source pour obtenir le net à payer.",
      },
      {
        q: 'Pourquoi un cadre touche moins net qu’un non-cadre ?',
        a: "À brut identique, le cadre paie une cotisation APEC supplémentaire et des taux AGIRC-ARRCO plus élevés sur la tranche 2. La contrepartie est une retraite complémentaire plus généreuse.",
      },
      {
        q: 'Le prélèvement à la source change-t-il mon net imposable ?',
        a: "Non, il ne fait que prélever l'impôt sur ton virement final. Ton net imposable (base déclarative) reste identique.",
      },
    ],
  },
  {
    slug: 'epargne',
    label: 'Épargne & placements',
    description: 'Intérêts composés, livret A, assurance-vie, PEA.',
    emoji: '📈',
    intro:
      'Projette ton patrimoine sur 10, 20, 30 ans avec versements réguliers et rendement composé. Comparatifs Livret A, fonds euro, ETF actions pour choisir la bonne enveloppe.',
    tldr:
      'À 7 %/an net, 100 € investis chaque mois pendant 30 ans deviennent ~122 000 € — les intérêts dépassent les versements. Démarrer tôt est le levier n°1.',
    faq: [
      {
        q: 'Que vaut 100 €/mois placés pendant 30 ans à 7 % ?',
        a: "Environ 122 000 €, dont 36 000 € de versements et 86 000 € d'intérêts cumulés. La force du temps + capitalisation joue à plein.",
      },
      {
        q: 'Livret A, assurance-vie ou PEA : lequel choisir ?',
        a: "Livret A pour ton épargne de précaution (3 mois de dépenses). Assurance-vie multi-supports pour le moyen terme et la transmission. PEA pour viser les actions long terme (8+ ans) avec fiscalité réduite.",
      },
      {
        q: 'Les frais d’un placement font-ils vraiment la différence ?',
        a: "Énormément. 1 % de frais en plus, c'est ~30 % de capital final en moins sur 30 ans. Privilégie les ETF à frais bas (~0,2 %/an) à la gestion sous mandat.",
      },
    ],
  },
];

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === (slug as CategorySlug));
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
