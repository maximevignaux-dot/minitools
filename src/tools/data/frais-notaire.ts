import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const TYPE: Record<string, { dmto: number; emolumentsCoef: number; label: string }> = {
  ancien: { dmto: 0.0581, emolumentsCoef: 1, label: 'Logement ancien' },
  neuf: { dmto: 0.00715, emolumentsCoef: 1, label: 'Logement neuf (VEFA)' },
};

function emolumentsNotaire(prix: number): number {
  const tranches = [
    { jusqua: 6500, taux: 0.03945 },
    { jusqua: 17000, taux: 0.01627 },
    { jusqua: 60000, taux: 0.01085 },
    { jusqua: Infinity, taux: 0.00814 },
  ];
  let reste = prix;
  let total = 0;
  let dernier = 0;
  for (const t of tranches) {
    const slice = Math.max(0, Math.min(reste, t.jusqua - dernier));
    total += slice * t.taux;
    reste -= slice;
    dernier = t.jusqua;
    if (reste <= 0) break;
  }
  return total;
}

export const fraisNotaire: Tool = {
  slug: 'frais-de-notaire',
  category: 'immobilier',
  h1: 'Frais de notaire : calculateur 2026',
  metaTitle: 'Frais de notaire 2026 : calculateur instantané (ancien, neuf)',
  metaDescription:
    'Calcule les frais de notaire pour ton achat immobilier : droits d’enregistrement, émoluments, taxes. Estimation 2026, ancien ou neuf.',
  intro:
    'Combien de frais de notaire prévoir pour ton achat ? Renseigne le prix du bien et le type (ancien ou neuf) : tu obtiens une estimation détaillée des droits d’enregistrement, des émoluments du notaire et des taxes annexes.',
  keywords: ['frais de notaire', 'droits de mutation', 'achat immobilier', 'émoluments', 'ancien', 'neuf'],
  lastmod: '2026-05-12',
  priority: 0.9,
  schemaType: 'SoftwareApplication',

  tldr: 'Compte environ 7-8 % du prix d’achat dans l’ancien et 2-3 % dans le neuf. Sur 250 000 €, prévois ~18 500 € (ancien) ou ~7 500 € (neuf) de frais de notaire.',

  keyTakeaways: [
    'Les frais de notaire sont composés à ~80 % de taxes versées à l’État, pas d’honoraires du notaire.',
    'Dans le neuf (VEFA), la TVA est déjà incluse dans le prix, d’où des droits d’enregistrement réduits à 0,71 %.',
    'Les émoluments du notaire suivent un barème dégressif national identique partout en France.',
    'Tu peux négocier une remise de 20 % sur les émoluments au-delà de 100 000 € de prix d’achat.',
  ],

  howTo: [
    {
      name: 'Saisis le prix d’achat',
      text: 'Le prix net vendeur, hors mobilier ou commissions d’agence (qui sortent du calcul des frais de notaire).',
    },
    {
      name: 'Choisis le type de bien',
      text: 'Ancien (>5 ans après livraison) ou neuf (VEFA / première vente, dans les 5 ans).',
    },
    {
      name: 'Lis le total et la décomposition',
      text: 'L’outil affiche le total à provisionner et détaille droits, émoluments, contribution et débours.',
    },
  ],

  useCases: [
    {
      title: 'Estimer ton budget total avant achat',
      description: 'Ajoute les frais de notaire au prix du bien pour connaître le coût total d’acquisition.',
    },
    {
      title: 'Comparer ancien vs neuf',
      description: 'À prix égal, le neuf économise ~5 % de frais — un argument décisif sur les budgets serrés.',
    },
    {
      title: 'Préparer ton apport personnel',
      description: 'Les frais de notaire ne sont pas finançables : ton apport minimum doit les couvrir.',
    },
    {
      title: 'Vérifier l’estimation de ton notaire',
      description: 'Compare le devis reçu de ton notaire avec une estimation indépendante pour éviter les erreurs.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre frais de notaire et honoraires d’agence',
      description: 'Les frais d’agence (3-7 % du prix) sont distincts et payés à l’agence immobilière, pas au notaire.',
    },
    {
      title: 'Oublier que les frais sont dus à la signature',
      description: 'Tu paies l’intégralité des frais le jour de l’acte authentique — pas étalés dans le temps. Provisionne-les avec l’apport.',
    },
    {
      title: 'Ne pas demander la remise sur les émoluments',
      description: 'Depuis 2021, le notaire peut consentir jusqu’à 20 % de remise sur la part au-delà de 100 000 €. Demande-la systématiquement.',
    },
    {
      title: 'Surestimer les frais dans le neuf',
      description: 'En VEFA, les DMTO passent de 5,81 % à 0,71 % — soit environ 5 points de moins en proportion du prix.',
    },
  ],

  sources: [
    {
      label: 'Service-Public.fr — Frais d’acquisition immobilière',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F2964',
    },
    {
      label: 'Notaires de France — Calcul des frais',
      url: 'https://www.notaires.fr/fr/immobilier-fiscalit%C3%A9/achat-vente/calculez-les-frais-de-notaire',
    },
    {
      label: 'impots.gouv.fr — Droits de mutation',
      url: 'https://www.impots.gouv.fr/particulier/questions/quelle-est-la-fiscalite-applicable-aux-mutations-titre-onereux',
    },
  ],

  inputs: [
    {
      id: 'prix',
      label: 'Prix d’achat du bien',
      type: 'number',
      unit: '€',
      defaultValue: 250000,
      min: 0,
      step: 5000,
    },
    {
      id: 'type',
      label: 'Type de bien',
      type: 'select',
      defaultValue: 'ancien',
      options: Object.entries(TYPE).map(([value, t]) => ({ value, label: t.label })),
    },
  ],

  compute: (values) => {
    const prix = Number(values.prix) || 0;
    const type = TYPE[String(values.type)] ?? TYPE.ancien;

    const dmto = prix * type.dmto;
    const emoluments = emolumentsNotaire(prix);
    const csi = prix * 0.001;
    const debours = 1200;
    const total = dmto + emoluments + csi + debours;
    const pct = prix > 0 ? total / prix : 0;
    const prixTotal = prix + total;

    return {
      primary: {
        label: 'Frais de notaire estimés',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        { label: 'Droits d’enregistrement (DMTO)', value: dmto, unit: '€', formatted: formatEuros(dmto) },
        { label: 'Émoluments du notaire', value: emoluments, unit: '€', formatted: formatEuros(emoluments) },
        { label: 'Contribution sécurité immobilière', value: csi, unit: '€', formatted: formatEuros(csi) },
        { label: 'Débours (formalités, état hypothécaire)', value: debours, unit: '€', formatted: formatEuros(debours) },
        { label: 'Frais en % du prix', value: pct, unit: '%', formatted: formatPercent(pct) },
        { label: 'Prix total à provisionner', value: prixTotal, unit: '€', formatted: formatEuros(prixTotal) },
      ],
      notes: [
        'Estimation indicative. Le coût réel peut varier de quelques centaines d’euros selon le département et les débours réels (états hypothécaires, demandes de pièces).',
        'Hors commission d’agence et frais de garantie bancaire (caution / hypothèque).',
      ],
    };
  },

  explanation: `Les **"frais de notaire"** désignent en réalité une enveloppe globale dont environ **80 % part à l'État** sous forme de taxes. Le notaire ne perçoit qu'une fraction du total — ses émoluments suivent un **barème national fixé par décret**.

**Composition des frais (ancien)** :
- **Droits d'enregistrement (DMTO)** : ~5,81 % du prix, perçus par l'État et le département.
- **Émoluments du notaire** : barème dégressif (3,945 % → 0,814 % selon les tranches).
- **Contribution sécurité immobilière** : 0,10 % du prix.
- **Débours** : ~1 200 € de frais administratifs (états hypothécaires, etc.).

**Dans le neuf (VEFA)** : la TVA à 20 % est déjà incluse dans le prix de vente. En contrepartie, les DMTO tombent à **0,715 %**, ce qui ramène le total à **2-3 %** du prix.

**Exemple** — appartement ancien à 250 000 € :
- DMTO : 14 525 €
- Émoluments : ~2 750 €
- CSI : 250 €
- Débours : 1 200 €
- **Total : ~18 700 €** (7,5 % du prix)

**Bon à savoir** : depuis 2021, le notaire peut accorder une **remise allant jusqu'à 20 %** sur la part des émoluments correspondant à la tranche au-dessus de 100 000 €. Demande-la lors de la signature.

**Apport personnel** : les frais de notaire ne sont quasiment jamais financés par la banque. Ton apport minimum doit donc couvrir au moins ces frais.`,

  examples: {
    columns: [
      { key: 'prix', label: 'Prix du bien' },
      { key: 'ancien', label: 'Frais ancien' },
      { key: 'pctAncien', label: '% ancien' },
      { key: 'neuf', label: 'Frais neuf' },
    ],
    rows: [
      { prix: '150 000 €', ancien: '11 700 €', pctAncien: '7,8 %', neuf: '5 100 €' },
      { prix: '250 000 €', ancien: '18 700 €', pctAncien: '7,5 %', neuf: '7 600 €' },
      { prix: '400 000 €', ancien: '29 300 €', pctAncien: '7,3 %', neuf: '11 500 €' },
      { prix: '600 000 €', ancien: '43 200 €', pctAncien: '7,2 %', neuf: '16 900 €' },
    ],
  },

  faq: [
    {
      q: 'Pourquoi parle-t-on de "frais de notaire" alors que l’État perçoit la majorité ?',
      a: "Par habitude. Le notaire collecte l'ensemble pour le compte de l'État, mais ses propres émoluments ne représentent que 10 à 15 % du total. Le reste (DMTO, CSI) est reversé au Trésor public.",
    },
    {
      q: 'Comment payer moins de frais de notaire ?',
      a: "Trois leviers : acheter dans le neuf (~5 % d'économie), déduire la valeur du mobilier (cuisine équipée, électroménager) du prix, négocier la remise de 20 % sur les émoluments au-delà de 100 000 €.",
    },
    {
      q: 'Les frais de notaire sont-ils négociables ?',
      a: "Les émoluments sont encadrés par décret, donc la base est fixe. Mais depuis 2021, le notaire peut consentir une remise jusqu'à 20 % sur la part au-delà de 100 000 €. Demande-la systématiquement.",
    },
    {
      q: 'Faut-il provisionner les frais en plus de l’apport ?',
      a: "Oui. La banque finance le prix du bien et parfois les travaux, mais rarement les frais de notaire. Ton apport doit donc au minimum couvrir les frais + 10 % du prix.",
    },
  ],

  related: ['capacite-emprunt', 'rentabilite-airbnb', 'cout-reel-voiture-mois'],
};
