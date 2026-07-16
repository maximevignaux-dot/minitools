import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const TAUX_ENDETTEMENT_MAX = 0.35;

function capitalEmpruntable(mensualite: number, tauxAnnuel: number, dureeAnnees: number): number {
  const r = tauxAnnuel / 12;
  const n = dureeAnnees * 12;
  if (r <= 0) return mensualite * n;
  return mensualite * (1 - Math.pow(1 + r, -n)) / r;
}

export const capaciteEmprunt: Tool = {
  slug: 'capacite-emprunt',
  category: 'immobilier',
  h1: 'Capacité d’emprunt immobilier',
  metaTitle: 'Capacité d’emprunt 2026 : combien puis-je emprunter ?',
  metaDescription:
    'Calcule ta capacité d’emprunt selon tes revenus, tes charges, la durée et le taux. Mensualité maximale et capital empruntable. Gratuit, instantané.',
  intro:
    'Combien puis-je emprunter pour acheter ? Saisis tes revenus nets, tes charges récurrentes, la durée souhaitée et le taux : tu obtiens ta mensualité maximale (35 %) et le capital empruntable correspondant.',
  keywords: ['capacité emprunt', 'crédit immobilier', 'mensualité', 'taux endettement', 'apport'],
  lastmod: '2026-05-08',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'Le HCSF plafonne ta mensualité à 35 % de tes revenus nets, assurance comprise. Avec 3 500 € de revenu, tu empruntes environ 210 000 € sur 25 ans à 3,5 %.',

  keyTakeaways: [
    'Taux d’endettement maximal : 35 % des revenus nets foyer, assurance emprunteur incluse.',
    'Durée maximale : 25 ans (27 ans avec différé en VEFA ou travaux importants).',
    'Apport conseillé : 10 % minimum du prix du bien pour couvrir frais de notaire et garantie.',
    'L’assurance emprunteur représente 0,3 à 0,5 % du capital par an et s’impute dans le calcul HCSF.',
  ],

  howTo: [
    {
      name: 'Renseigne tes revenus nets mensuels',
      text: 'Inclus le foyer entier : co-emprunteur, primes régulières, revenus locatifs nets (à 70 %).',
    },
    {
      name: 'Indique tes charges récurrentes',
      text: 'Crédits en cours, pensions versées — tout ce qui réduit ta capacité d’endettement.',
    },
    {
      name: 'Choisis la durée et le taux d’intérêt',
      text: '15 à 25 ans, au taux actuel de ta banque ou du marché (consulte les baromètres courtiers).',
    },
    {
      name: 'Lis ton capital empruntable et la mensualité',
      text: 'L’outil affiche la mensualité maximale et le montant que la banque peut t’accorder.',
    },
  ],

  useCases: [
    {
      title: 'Préparer ton rendez-vous courtier',
      description: 'Arrive avec un budget chiffré pour discuter sereinement de ton projet.',
    },
    {
      title: 'Comparer plusieurs durées',
      description: 'Simule 20 vs 25 ans pour visualiser l’impact sur ta mensualité et ton coût total.',
    },
    {
      title: 'Cadrer ton budget avant visites',
      description: 'Évite de tomber amoureux d’un bien hors budget — fixe le plafond avant de chercher.',
    },
    {
      title: 'Vérifier un investissement locatif',
      description: 'Intègre les loyers prévisionnels (à 70 %) pour voir si ton projet passe au taux d’endettement.',
    },
  ],

  pitfalls: [
    {
      title: 'Oublier l’assurance emprunteur dans le 35 %',
      description: 'Le HCSF impose 35 % toutes assurances comprises — pas 35 % hors assurance. À 0,4 %/an d’assurance, ça change le capital empruntable.',
    },
    {
      title: 'Compter 100 % des revenus locatifs',
      description: 'Les banques ne retiennent généralement que 70 % des loyers pour couvrir la vacance et les charges — n’en compte pas 100 %.',
    },
    {
      title: 'Confondre revenu avant et après impôt',
      description: 'Le taux d’endettement se calcule sur le net imposable, pas sur le net à payer post-PAS. Utilise ton revenu fiscal de référence comme base.',
    },
    {
      title: 'Croire pouvoir emprunter sur 30 ans',
      description: 'Le plafond HCSF est de 25 ans (27 ans avec différé en VEFA). Au-delà, la banque refuse, sauf dérogation exceptionnelle.',
    },
  ],

  sources: [
    {
      label: 'HCSF — Recommandations crédit immobilier',
      url: 'https://www.economie.gouv.fr/hcsf',
    },
    {
      label: 'Banque de France — Taux d’usure',
      url: 'https://www.banque-france.fr/statistiques/taux-et-cours/taux-dusure',
    },
    {
      label: 'Service-Public.fr — Taux d’endettement',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F2367',
    },
  ],

  inputs: [
    {
      id: 'revenus',
      label: 'Revenus nets mensuels (foyer)',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 3500,
      min: 0,
      step: 100,
      help: 'Cumule les salaires nets après PAS du foyer. Ajoute 70 % des revenus locatifs nets.',
    },
    {
      id: 'charges',
      label: 'Mensualités de crédits en cours',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 0,
      min: 0,
      step: 50,
      help: 'Crédit auto, conso, autre prêt immobilier… Hors loyer (qui s’éteindra).',
    },
    {
      id: 'duree',
      label: 'Durée du prêt',
      type: 'select',
      defaultValue: '25',
      options: [
        { value: '15', label: '15 ans' },
        { value: '20', label: '20 ans' },
        { value: '25', label: '25 ans (max HCSF)' },
      ],
    },
    {
      id: 'taux',
      label: 'Taux annuel (hors assurance)',
      type: 'number',
      unit: '%',
      defaultValue: 3.5,
      min: 0,
      max: 10,
      step: 0.1,
    },
    {
      id: 'apport',
      label: 'Apport personnel',
      type: 'number',
      unit: '€',
      defaultValue: 30000,
      min: 0,
      step: 1000,
    },
  ],

  compute: (values) => {
    const revenus = Number(values.revenus) || 0;
    const charges = Number(values.charges) || 0;
    const duree = Number(values.duree) || 25;
    const taux = (Number(values.taux) || 0) / 100;
    const apport = Number(values.apport) || 0;

    const mensualiteMax = Math.max(0, revenus * TAUX_ENDETTEMENT_MAX - charges);
    const capital = capitalEmpruntable(mensualiteMax, taux, duree);
    const budgetTotal = capital + apport;

    const tauxEffectif = revenus > 0 ? (mensualiteMax + charges) / revenus : 0;
    const interetsTotaux = mensualiteMax * duree * 12 - capital;

    return {
      primary: {
        label: 'Capital empruntable',
        value: capital,
        unit: '€',
        formatted: formatEuros(capital),
      },
      secondary: [
        { label: 'Mensualité maximale', value: mensualiteMax, unit: '€', formatted: formatEuros(mensualiteMax) },
        { label: 'Budget total (avec apport)', value: budgetTotal, unit: '€', formatted: formatEuros(budgetTotal) },
        { label: 'Intérêts totaux', value: interetsTotaux, unit: '€', formatted: formatEuros(interetsTotaux) },
        { label: 'Taux d’endettement', value: tauxEffectif, unit: '%', formatted: formatPercent(tauxEffectif) },
      ],
      notes: [
        'Calcul HCSF : taux d’endettement plafonné à 35 % assurance comprise, durée maximale 25 ans (27 ans avec différé pour le neuf).',
        'L’assurance emprunteur (~0,1 à 0,4 % du capital/an) n’est pas incluse ici — réduit la capacité réelle d’environ 5 à 10 %.',
        'Le reste à vivre est aussi étudié par les banques (≥ 700 à 900 €/personne du foyer).',
      ],
    };
  },

  explanation: `Ta **capacité d'emprunt** dépend de quatre paramètres : tes **revenus**, tes **charges**, la **durée** du prêt et le **taux**.

**Règle HCSF** (Haut Conseil de Stabilité Financière) en vigueur depuis 2022 :
- **Taux d'endettement maximum** : 35 % des revenus, **assurance emprunteur comprise**.
- **Durée maximale** : 25 ans, ou 27 ans avec différé d'amortissement pour un achat dans le neuf ou avec travaux ≥ 25 % du montant.
- **Reste à vivre** minimal exigé : généralement 700 à 900 €/personne du foyer.

Les banques ont une marge de 20 % de dossiers dérogatoires, mais en pratique le 35 % est rarement dépassé.

**Formule du capital empruntable** :
\`\`\`
Capital = Mensualité × (1 − (1 + r)⁻ⁿ) / r
\`\`\`
où **r** = taux mensuel (taux annuel ÷ 12) et **n** = durée en mois.

**Comment maximiser sa capacité** ?
- **Allonger la durée** : passer de 20 à 25 ans augmente le capital de ~15 %.
- **Solder un crédit conso** avant la demande : 200 €/mois de mensualité libérée = ~40 000 € de capacité en plus.
- **Apport** : augmente le **budget total** (capital + apport), pas la capacité d'emprunt elle-même. Mais un apport ≥ 10 % rassure la banque et améliore le taux.
- **Renégocier l'assurance** : la délégation d'assurance peut diviser le coût par 2 ou 3 (loi Lemoine).

**Coût réel** : un emprunt de 250 000 € sur 25 ans à 3,5 % coute ~125 000 € d'intérêts + ~25 000 € d'assurance.`,

  examples: {
    columns: [
      { key: 'profile', label: 'Profil' },
      { key: 'revenus', label: 'Revenus' },
      { key: 'duree', label: 'Durée' },
      { key: 'capital', label: 'Capital empruntable' },
    ],
    rows: [
      { profile: 'Célibataire SMIC', revenus: '1 400 €', duree: '25 ans', capital: '~ 98 000 €' },
      { profile: 'Couple revenus moyens', revenus: '4 000 €', duree: '25 ans', capital: '~ 280 000 €' },
      { profile: 'Couple confortable', revenus: '6 500 €', duree: '20 ans', capital: '~ 395 000 €' },
      { profile: 'Famille haut revenu', revenus: '9 000 €', duree: '25 ans', capital: '~ 630 000 €' },
    ],
  },

  faq: [
    {
      q: 'Pourquoi le taux d’endettement est plafonné à 35 % ?',
      a: 'Pour limiter le risque de surendettement et la fragilité du système bancaire. Avant 2020, certaines banques acceptaient 40 %, mais le HCSF a durci la règle. Quelques dossiers (≤ 20 %) peuvent encore déroger pour les primo-accédants ou les hauts revenus avec gros apport.',
    },
    {
      q: 'L’apport sert-il à augmenter ma capacité d’emprunt ?',
      a: "Pas directement : il augmente le **budget total** (capital + apport). Mais un apport ≥ 10 % du prix permet de couvrir les frais de notaire (~7 % dans l'ancien) et obtient généralement un meilleur taux, donc indirectement plus de capital.",
    },
    {
      q: 'Faut-il intégrer les revenus locatifs ?',
      a: "Oui, mais à **70 %** seulement (abattement pour vacance locative et charges). Si tu touches 1 000 € de loyer net, la banque retient 700 € dans tes revenus.",
    },
    {
      q: 'Que devient mon loyer actuel dans le calcul ?',
      a: "Il **ne compte pas** comme une charge : la banque sait qu'il s'éteindra une fois propriétaire. En revanche, un crédit auto ou conso compte 100 %.",
    },
  ],

  related: ['rentabilite-airbnb', 'brut-net-cadre'],
};
