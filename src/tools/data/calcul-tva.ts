import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const TAUX: Record<string, { rate: number; label: string }> = {
  normal: { rate: 0.2, label: '20 % — taux normal' },
  intermediaire: { rate: 0.1, label: '10 % — restauration, transport, hébergement' },
  reduit: { rate: 0.055, label: '5,5 % — produits de première nécessité, livres' },
  particulier: { rate: 0.021, label: '2,1 % — médicaments, presse' },
};

const SENS: Record<string, { label: string }> = {
  htToTtc: { label: 'HT → TTC (ajouter la TVA)' },
  ttcToHt: { label: 'TTC → HT (retirer la TVA)' },
};

export const calculTva: Tool = {
  slug: 'calcul-tva',
  category: 'revenus',
  h1: 'Calcul TVA : HT en TTC (et inversement)',
  metaTitle: 'Calcul TVA 2026 : convertisseur HT/TTC instantané',
  metaDescription:
    'Convertis un montant HT en TTC ou TTC en HT à tous les taux de TVA français (20 %, 10 %, 5,5 %, 2,1 %). Calcul instantané, gratuit.',
  intro:
    'Besoin de convertir un prix HT en TTC ou de retrouver le HT à partir d’un TTC ? Choisis le taux de TVA, saisis ton montant : la TVA, le HT et le TTC s’affichent instantanément.',
  keywords: ['tva', 'ht', 'ttc', 'conversion', 'taux', 'facturation'],
  lastmod: '2026-05-12',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'Pour ajouter la TVA : multiplie par 1,20 (taux normal). Pour retirer la TVA d’un prix TTC : divise par 1,20. Exemple : 100 € HT = 120 € TTC ; 120 € TTC = 100 € HT.',

  keyTakeaways: [
    'Taux de TVA français 2026 : 20 % (normal), 10 % (intermédiaire), 5,5 % (réduit), 2,1 % (particulier).',
    'Formule HT → TTC : montant × (1 + taux). Formule TTC → HT : montant ÷ (1 + taux).',
    'Pour retrouver la TVA depuis un TTC : montant × taux ÷ (1 + taux). Ex : 120 × 0,20 ÷ 1,20 = 20 €.',
    'En auto-entreprise, tu es en franchise de TVA tant que tu ne dépasses pas 39 100 € (services) ou 91 900 € (vente).',
  ],

  howTo: [
    {
      name: 'Choisis le sens de conversion',
      text: 'HT → TTC pour ajouter la TVA à un prix, ou TTC → HT pour retrouver le HT à partir d’un prix affiché.',
    },
    {
      name: 'Sélectionne le taux applicable',
      text: '20 % pour la majorité des biens et services, 10 % pour la restauration, 5,5 % pour les produits essentiels.',
    },
    {
      name: 'Saisis le montant',
      text: 'En euros. L’outil affiche instantanément HT, TVA et TTC.',
    },
  ],

  useCases: [
    {
      title: 'Établir un devis ou une facture',
      description: 'Passe rapidement d’un prix négocié HT au prix TTC à indiquer au client.',
    },
    {
      title: 'Décomposer un prix d’achat',
      description: 'Retrouve la TVA déductible à partir d’un prix TTC pour ta comptabilité.',
    },
    {
      title: 'Comparer deux prix concurrents',
      description: 'Ramène HT et TTC sur la même base pour comparer des devis professionnels.',
    },
    {
      title: 'Vérifier une note de frais',
      description: 'Décompose le TTC pour récupérer la TVA déductible sur tes dépenses pros.',
    },
  ],

  pitfalls: [
    {
      title: 'Inverser le sens HT ↔ TTC',
      description: 'HT × (1 + taux) → TTC, mais TTC ÷ (1 + taux) → HT. Multiplier dans le mauvais sens fausse le résultat de la TVA.',
    },
    {
      title: 'Appliquer un mauvais taux à l’activité',
      description: 'Le taux dépend du bien/service vendu, pas du statut. Vérifie sur le BOFiP avant de facturer à un taux non standard.',
    },
    {
      title: 'Oublier la franchise en base auto-entrepreneur',
      description: 'En dessous des seuils, tu ne factures pas de TVA. La facture doit porter la mention "TVA non applicable, art. 293 B du CGI".',
    },
    {
      title: 'Calculer la TVA depuis le HT au lieu du TTC',
      description: 'Pour retrouver la TVA dans un prix TTC : TVA = TTC × taux ÷ (1 + taux). Ne pas confondre avec HT × taux.',
    },
  ],

  sources: [
    {
      label: 'impots.gouv.fr — Taux de TVA en France',
      url: 'https://www.impots.gouv.fr/particulier/questions/quels-sont-les-taux-de-tva-en-vigueur-en-france-et-dans-lunion',
    },
    {
      label: 'Service-Public.fr — TVA applicable',
      url: 'https://entreprendre.service-public.fr/vosdroits/F22404',
    },
  ],

  inputs: [
    {
      id: 'montant',
      label: 'Montant',
      type: 'number',
      unit: '€',
      defaultValue: 100,
      min: 0,
      step: 1,
    },
    {
      id: 'sens',
      label: 'Sens de conversion',
      type: 'select',
      defaultValue: 'htToTtc',
      options: Object.entries(SENS).map(([value, s]) => ({ value, label: s.label })),
    },
    {
      id: 'taux',
      label: 'Taux de TVA',
      type: 'select',
      defaultValue: 'normal',
      options: Object.entries(TAUX).map(([value, t]) => ({ value, label: t.label })),
    },
  ],

  compute: (values) => {
    const montant = Number(values.montant) || 0;
    const taux = TAUX[String(values.taux)] ?? TAUX.normal;
    const sens = String(values.sens);

    let ht: number;
    let ttc: number;
    if (sens === 'ttcToHt') {
      ttc = montant;
      ht = montant / (1 + taux.rate);
    } else {
      ht = montant;
      ttc = montant * (1 + taux.rate);
    }
    const tva = ttc - ht;

    return {
      primary: {
        label: sens === 'ttcToHt' ? 'Montant HT' : 'Montant TTC',
        value: sens === 'ttcToHt' ? ht : ttc,
        unit: '€',
        formatted: formatEuros(sens === 'ttcToHt' ? ht : ttc, 2),
      },
      secondary: [
        { label: 'Montant HT', value: ht, unit: '€', formatted: formatEuros(ht, 2) },
        { label: 'TVA', value: tva, unit: '€', formatted: formatEuros(tva, 2) },
        { label: 'Montant TTC', value: ttc, unit: '€', formatted: formatEuros(ttc, 2) },
        { label: 'Taux appliqué', value: taux.rate, unit: '%', formatted: formatPercent(taux.rate) },
      ],
    };
  },

  explanation: `La **TVA** (Taxe sur la Valeur Ajoutée) est un impôt indirect appliqué sur la quasi-totalité des biens et services en France. Elle est collectée par les entreprises et reversée à l'État.

**Quatre taux** s'appliquent en 2026 :
- **20 %** — taux normal, valeur par défaut pour la plupart des biens et services.
- **10 %** — taux intermédiaire : restauration, transport, travaux d'amélioration de logement, hébergement.
- **5,5 %** — taux réduit : produits alimentaires de première nécessité, livres, abonnements gaz/électricité.
- **2,1 %** — taux particulier : médicaments remboursables, presse, certains spectacles.

**Formules de base** :
- HT → TTC : \`TTC = HT × (1 + taux)\`
- TTC → HT : \`HT = TTC ÷ (1 + taux)\`
- TVA depuis le TTC : \`TVA = TTC × taux ÷ (1 + taux)\`

**Exemple** — facture de 1 200 € TTC à 20 % :
- HT : 1 200 ÷ 1,20 = **1 000 €**
- TVA : 1 200 − 1 000 = **200 €**

**Franchise en base** : les auto-entrepreneurs ne facturent pas la TVA tant qu'ils restent sous les plafonds (39 100 € pour les services, 91 900 € pour la vente). Au-delà, ils basculent automatiquement au régime réel.`,

  examples: {
    columns: [
      { key: 'ht', label: 'HT' },
      { key: 'tva20', label: 'TVA 20 %' },
      { key: 'ttc20', label: 'TTC 20 %' },
      { key: 'ttc10', label: 'TTC 10 %' },
    ],
    rows: [
      { ht: '50 €', tva20: '10 €', ttc20: '60 €', ttc10: '55 €' },
      { ht: '100 €', tva20: '20 €', ttc20: '120 €', ttc10: '110 €' },
      { ht: '500 €', tva20: '100 €', ttc20: '600 €', ttc10: '550 €' },
      { ht: '1 000 €', tva20: '200 €', ttc20: '1 200 €', ttc10: '1 100 €' },
    ],
  },

  faq: [
    {
      q: 'Comment retirer la TVA d’un prix TTC ?',
      a: "Divise le montant TTC par (1 + taux). Pour la TVA à 20 % : TTC ÷ 1,20 = HT. Exemple : 120 € TTC ÷ 1,20 = 100 € HT.",
    },
    {
      q: 'Quel taux de TVA appliquer à mon activité ?',
      a: "Le taux dépend de la nature du bien ou service vendu, pas de ton statut. Vérifie sur le BOFiP ou demande à ton expert-comptable en cas de doute. La majorité des prestations relèvent du taux normal à 20 %.",
    },
    {
      q: 'Suis-je obligé de facturer la TVA en auto-entrepreneur ?',
      a: "Non, tant que tu restes sous les plafonds de franchise en base (39 100 € pour les services, 91 900 € pour la vente). Mais tu peux opter volontairement pour la TVA — utile si tes clients sont eux-mêmes assujettis.",
    },
    {
      q: 'Une facture sans TVA est-elle valable ?',
      a: "Oui en franchise en base : elle doit alors porter la mention 'TVA non applicable, article 293 B du CGI'. Sans cette mention, ta facture est non conforme.",
    },
  ],

  related: ['auto-entrepreneur-brut-net', 'combien-je-gagne-freelance', 'salaire-brut-net'],
};
