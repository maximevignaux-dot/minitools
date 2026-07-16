import type { Tool } from '@/types/tool';
import { formatEuros, formatRange } from '@/lib/format';

export const freelanceRevenu: Tool = {
  slug: 'combien-je-gagne-freelance',
  category: 'revenus',
  h1: 'Combien je gagne en freelance ?',
  metaTitle: 'Salaire freelance : calculateur de revenu net 2026',
  metaDescription:
    'Estime ton revenu net mensuel en freelance selon ton TJM, ton nombre de jours facturés et tes charges sociales. Outil gratuit, calcul instantané.',
  intro:
    'Quel salaire net espérer en freelance ? Saisis ton TJM (taux journalier), tes jours facturés par mois et ton statut : tu obtiens ton revenu net après charges.',
  keywords: ['freelance', 'tjm', 'salaire', 'indépendant', 'auto-entrepreneur'],
  lastmod: '2026-05-08',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'À 500 € de TJM sur 200 jours/an en SASU, compte ~100 000 € de CA mais ~55 000 € de revenu net après charges sociales et impôts — soit ~4 600 € net/mois.',

  keyTakeaways: [
    'Compte 200 à 220 jours facturables/an : congés, jours fériés, prospection et formation déduits.',
    'En SASU/EURL, les charges sociales atteignent 45 à 50 % de ta rémunération nette.',
    'L’auto-entrepreneur garde plus de cash à court terme mais cotise moins (retraite, chômage) et ne déduit aucun frais.',
    'Mutuelle, prévoyance, RC pro et comptabilité ajoutent ~250 €/mois en SASU/EURL.',
  ],

  howTo: [
    {
      name: 'Saisis ton TJM (taux journalier moyen)',
      text: 'En euros HT. Si tu hésites, regarde les baromètres Malt/Freelance par niche et seniorité.',
    },
    {
      name: 'Estime tes jours facturés par mois',
      text: '15 à 18 jours/mois réalistes en année pleine — pas 20.',
    },
    {
      name: 'Choisis ton statut juridique',
      text: 'Auto-entrepreneur, SASU ou EURL — les charges et la fiscalité changent radicalement.',
    },
    {
      name: 'Lis ton revenu net mensuel et annuel',
      text: 'L’outil détaille CA, charges sociales, IS/IR et revenu disponible.',
    },
  ],

  useCases: [
    {
      title: 'Fixer ton TJM au démarrage',
      description: 'Calcule à l’envers le TJM nécessaire pour atteindre un objectif net mensuel.',
    },
    {
      title: 'Choisir entre auto-entrepreneur et SASU',
      description: 'Compare les deux statuts à ton CA prévisionnel pour optimiser ton revenu net.',
    },
    {
      title: 'Préparer une mission longue durée',
      description: 'Évalue le revenu d’une régie 6-12 mois vs plusieurs petits forfaits.',
    },
    {
      title: 'Comparer salaire vs freelance',
      description: 'Visualise le TJM qu’il faut pour égaler un CDI à 50 k€ ou 80 k€ brut.',
    },
  ],

  pitfalls: [
    {
      title: 'Surestimer les jours facturables par an',
      description: '220 jours/an est irréaliste : retire congés, jours fériés, formation, prospection et arrêts maladie. Vise 180-200 jours.',
    },
    {
      title: 'Oublier mutuelle, prévoyance et RC pro',
      description: 'Compte 200-300 €/mois en SASU/EURL pour ta couverture santé, prévoyance arrêt maladie et responsabilité civile professionnelle.',
    },
    {
      title: 'Oublier la CFE et la CCI annuelles',
      description: 'En SASU/EURL, prévois aussi la CFE (souvent 500-1500 €/an) et l’éventuelle CCI selon ton secteur.',
    },
    {
      title: 'Considérer la TVA comme un revenu',
      description: 'La TVA collectée sur tes factures n’est qu’un encaissement temporaire. Ne la dépense pas — elle sera reversée à l’État.',
    },
  ],

  sources: [
    {
      label: 'URSSAF — Cotisations indépendants',
      url: 'https://www.urssaf.fr/portail/home/independant.html',
    },
    {
      label: 'BPI France Création — Comparatif statuts',
      url: 'https://bpifrance-creation.fr/encyclopedie/structures-juridiques',
    },
  ],

  inputs: [
    {
      id: 'tjm',
      label: 'TJM (taux journalier moyen)',
      type: 'number',
      unit: '€ HT / jour',
      defaultValue: 500,
      min: 0,
      step: 50,
    },
    {
      id: 'days',
      label: 'Jours facturés par mois',
      type: 'slider',
      unit: 'jours',
      defaultValue: 18,
      min: 0,
      max: 22,
      step: 1,
    },
    {
      id: 'status',
      label: 'Statut',
      type: 'select',
      defaultValue: 'autoentrepreneur',
      options: [
        { value: 'autoentrepreneur', label: 'Auto-entrepreneur (BNC, ~24 %)' },
        { value: 'eurl', label: 'EURL / SASU (~45 %)' },
        { value: 'portage', label: 'Portage salarial (~50 %)' },
      ],
    },
  ],

  compute: (values) => {
    const tjm = Number(values.tjm) || 0;
    const days = Number(values.days) || 0;
    const status = String(values.status);
    const chargeRate =
      status === 'eurl' ? 0.45 : status === 'portage' ? 0.5 : 0.24;

    const grossMonthly = tjm * days;
    const netMonthly = grossMonthly * (1 - chargeRate);
    const grossAnnual = grossMonthly * 12;
    const netAnnual = netMonthly * 12;

    return {
      primary: {
        label: 'Revenu net mensuel',
        value: netMonthly,
        unit: '€',
        formatted: formatEuros(netMonthly),
      },
      secondary: [
        { label: 'CA mensuel HT', value: grossMonthly, unit: '€', formatted: formatEuros(grossMonthly) },
        { label: 'Charges & impôts', value: grossMonthly - netMonthly, unit: '€', formatted: formatEuros(grossMonthly - netMonthly) },
        { label: 'CA annuel HT', value: grossAnnual, unit: '€', formatted: formatEuros(grossAnnual) },
        { label: 'Net annuel', value: netAnnual, unit: '€', formatted: formatEuros(netAnnual) },
      ],
      range: {
        min: netMonthly * 0.85,
        max: netMonthly * 1.05,
        formatted: formatRange(netMonthly * 0.85, netMonthly * 1.05),
      },
      notes: [
        'Estimation hors TVA. Le seuil de la franchise en base est de 36 800 € pour les prestations en 2026.',
        'Le taux de charges réel dépend de l’activité (BNC vs BIC) et des options (versement libératoire IR).',
      ],
    };
  },

  explanation: `En freelance, le **revenu net** dépend de **trois variables** : le TJM, le nombre de jours réellement facturés, et le **taux de charges** lié au statut.

**TJM** : en France, on observe en 2026 :
- Junior (0–2 ans) : 250 à 400 € HT
- Confirmé (3–6 ans) : 450 à 650 € HT
- Senior / expert : 700 à 1 200 € HT

**Jours facturés** : un freelance à temps plein facture rarement plus de **17 à 19 jours par mois** (formation, prospection, congés, intercontrats). Compter **200 jours par an** est déjà optimiste.

**Charges** :
- **Auto-entrepreneur** : ~22 % de cotisations sociales + 2,2 % CFP, soit ~24 % au total. Plafond de CA : 77 700 € HT/an pour les prestations de service.
- **EURL / SASU** : entre 40 % et 50 % une fois cotisations sociales et impôt sur les sociétés intégrés.
- **Portage salarial** : ~10 % de frais de gestion + ~45 % de charges salariales/patronales, soit environ 50 % au total — mais avec les avantages d’un statut salarié.

**Exemple** : 500 € TJM × 18 jours = **9 000 € HT/mois**. En auto-entrepreneur : ~6 800 € net. En EURL : ~5 000 € net.`,

  examples: {
    columns: [
      { key: 'profil', label: 'Profil' },
      { key: 'tjm', label: 'TJM' },
      { key: 'days', label: 'Jours/mois' },
      { key: 'net', label: 'Net mensuel (AE)' },
    ],
    rows: [
      { profil: 'Dev junior', tjm: '350 €', days: 16, net: '4 300 €' },
      { profil: 'Designer confirmé', tjm: '500 €', days: 18, net: '6 800 €' },
      { profil: 'Consultant data', tjm: '750 €', days: 17, net: '9 700 €' },
      { profil: 'Architecte cloud senior', tjm: '1 100 €', days: 18, net: '15 000 €' },
    ],
  },

  faq: [
    {
      q: 'Quel TJM viser pour gagner 4 000 € net par mois ?',
      a: 'En auto-entrepreneur, environ 290 € TJM × 18 jours = 5 220 € HT, soit ~4 000 € net après ~24 % de charges. En EURL/SASU, il faudrait viser ~400 € TJM.',
    },
    {
      q: 'Combien de jours facturés peut-on faire au maximum ?',
      a: 'Le maximum réel est 20 à 22 jours, en imposant un rythme tendu sans congés. La moyenne saine est 16 à 18 jours avec un taux de remplissage annuel de 80 %.',
    },
    {
      q: 'Auto-entrepreneur ou EURL pour un freelance ?',
      a: 'En dessous de ~50 000 € de CA, l’auto-entrepreneur est souvent plus avantageux. Au-dessus, l’EURL/SASU permet de mieux optimiser charges, retraite et déductions.',
    },
    {
      q: 'Quels frais peut-on déduire ?',
      a: 'En EURL/SASU : abonnements logiciels, matériel, formation, déplacements, coworking, frais bancaires pro. En auto-entrepreneur, aucune déduction (l’abattement forfaitaire est déjà appliqué).',
    },
  ],

  related: ['auto-entrepreneur-brut-net', 'combien-rapporte-tiktok'],
};
