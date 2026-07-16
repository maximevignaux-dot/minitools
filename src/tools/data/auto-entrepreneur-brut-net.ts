import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

const RATES: Record<string, { social: number; ir: number; label: string }> = {
  bnc: { social: 0.232, ir: 0.022, label: 'Profession libérale (BNC)' },
  bicService: { social: 0.212, ir: 0.017, label: 'Prestation de service commerciale (BIC)' },
  bicVente: { social: 0.123, ir: 0.01, label: 'Vente de marchandises (BIC)' },
};

export const autoEntrepreneurBrutNet: Tool = {
  slug: 'auto-entrepreneur-brut-net',
  category: 'revenus',
  h1: 'Auto-entrepreneur : du brut au net',
  metaTitle: 'Auto-entrepreneur : calculateur brut → net 2026',
  metaDescription:
    'Convertis ton chiffre d’affaires d’auto-entrepreneur en revenu net après cotisations URSSAF et IR. Outil 2026, gratuit et instantané.',
  intro:
    'Combien te reste-t-il vraiment en auto-entrepreneur après l’URSSAF et l’impôt ? Saisis ton chiffre d’affaires mensuel et choisis ton activité pour obtenir ton net réel.',
  keywords: ['auto-entrepreneur', 'micro-entreprise', 'urssaf', 'brut', 'net'],
  lastmod: '2026-05-08',
  priority: 0.7,
  schemaType: 'SoftwareApplication',

  tldr: 'En auto-entrepreneur, retire ~22 % de cotisations URSSAF (services) ou ~12,3 % (vente) puis l’impôt sur le revenu : il te reste 60 à 78 % de ton chiffre d’affaires.',

  keyTakeaways: [
    'Taux URSSAF 2026 : 12,3 % vente, 21,2 % services BIC/BNC, 21,1 % activité libérale.',
    'En versement libératoire, tu ajoutes 1 % à 2,2 % d’impôt prélevé direct — sinon IR classique en déclaration.',
    'Plafonds : 77 700 € HT pour les services, 188 700 € HT pour la vente. Au-delà, sortie du régime micro.',
    'CFE, mutuelle, RC pro et matériel sont à ta charge en plus : compte 80 à 150 €/mois selon ton activité.',
  ],

  howTo: [
    {
      name: 'Saisis ton chiffre d’affaires encaissé',
      text: 'Mensuel ou annuel HT. C’est le montant facturé et réellement perçu sur la période.',
    },
    {
      name: 'Choisis ton type d’activité',
      text: 'Vente de marchandises, services BIC, services BNC ou activité libérale — le taux URSSAF change selon le cas.',
    },
    {
      name: 'Active le versement libératoire si applicable',
      text: 'Option choisie auprès des impôts ; ajoute un prélèvement IR à la source au taux de ton activité.',
    },
    {
      name: 'Lis ton revenu net après cotisations et impôt',
      text: 'Mensuel et annuel, avec le détail des cotisations URSSAF et de l’impôt sur le revenu.',
    },
  ],

  useCases: [
    {
      title: 'Choisir entre auto-entrepreneur et SASU',
      description: 'Compare le revenu net réel à ton volume de CA pour identifier le statut le plus rentable.',
    },
    {
      title: 'Fixer ton TJM pour viser un revenu net',
      description: 'Détermine le tarif journalier nécessaire pour atteindre un objectif net mensuel précis.',
    },
    {
      title: 'Vérifier les plafonds avant déclaration',
      description: 'Anticipe la sortie du régime micro pour ne pas perdre la franchise de TVA en cours d’année.',
    },
    {
      title: 'Préparer ta déclaration URSSAF',
      description: 'Calcule à l’avance le montant de cotisations à régler chaque mois ou trimestre.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre CA encaissé et CA facturé',
      description: 'Tu déclares à l’URSSAF uniquement ce qui a été encaissé. Les factures émises non payées ne sont pas à déclarer.',
    },
    {
      title: 'Oublier la CFE annuelle',
      description: 'La cotisation foncière des entreprises s’ajoute en novembre, entre 300 et 1 500 € selon ta commune et ton CA.',
    },
    {
      title: 'Méconnaître les plafonds de chiffre d’affaires',
      description: 'Dépasser 77 700 € (services) ou 188 700 € (vente) te bascule en régime réel — perte de la franchise de TVA.',
    },
    {
      title: 'Croire que le versement libératoire dispense d’IR',
      description: 'Tu paies bien un impôt forfaitaire (1 à 2,2 %), mais ton CA s’ajoute au revenu fiscal du foyer pour calculer la TMI globale.',
    },
  ],

  sources: [
    {
      label: 'URSSAF — Cotisations auto-entrepreneur',
      url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
    },
    {
      label: 'impots.gouv.fr — Versement libératoire',
      url: 'https://www.impots.gouv.fr/particulier/le-versement-liberatoire-de-limpot-sur-le-revenu',
    },
    {
      label: 'Service-Public.fr — Régime micro-entreprise',
      url: 'https://entreprendre.service-public.fr/vosdroits/F23267',
    },
  ],

  inputs: [
    {
      id: 'ca',
      label: 'Chiffre d’affaires mensuel',
      type: 'number',
      unit: '€ HT / mois',
      defaultValue: 4000,
      min: 0,
      step: 100,
    },
    {
      id: 'activity',
      label: 'Type d’activité',
      type: 'select',
      defaultValue: 'bnc',
      options: Object.entries(RATES).map(([value, r]) => ({ value, label: r.label })),
    },
    {
      id: 'liberatoire',
      label: 'Versement libératoire IR',
      type: 'select',
      defaultValue: 'oui',
      options: [
        { value: 'oui', label: 'Oui (impôt prélevé en même temps)' },
        { value: 'non', label: 'Non (impôt classique au barème)' },
      ],
      help: 'Le versement libératoire est avantageux si tu es non imposable ou peu imposable.',
    },
  ],

  compute: (values) => {
    const ca = Number(values.ca) || 0;
    const rates = RATES[String(values.activity)] ?? RATES.bnc;
    const irRate = String(values.liberatoire) === 'oui' ? rates.ir : 0;

    const social = ca * rates.social;
    const ir = ca * irRate;
    const net = ca - social - ir;
    const totalRate = rates.social + irRate;

    const annual = ca * 12;
    const annualNet = net * 12;

    return {
      primary: {
        label: 'Revenu net mensuel',
        value: net,
        unit: '€',
        formatted: formatEuros(net),
      },
      secondary: [
        { label: 'Cotisations URSSAF', value: social, unit: '€', formatted: formatEuros(social) },
        { label: 'Impôt (versement lib.)', value: ir, unit: '€', formatted: formatEuros(ir) },
        { label: 'Taux global', value: totalRate, unit: '%', formatted: formatPercent(totalRate) },
        { label: 'Net annuel', value: annualNet, unit: '€', formatted: formatEuros(annualNet) },
      ],
      notes: [
        `CA annuel : ${formatEuros(annual)}. Plafond 2026 : 77 700 € (services) ou 188 700 € (vente).`,
        'Hors CFE (~200 à 600 €/an) et hors TVA (franchise jusqu’à 36 800 € de CA en services).',
      ],
    };
  },

  explanation: `Le statut d’**auto-entrepreneur** (micro-entreprise) impose un calcul **simple** mais propre à chaque activité.

**Cotisations URSSAF 2026** (% du CA HT) :
- **Profession libérale** (BNC) : **23,2 %**
- **Prestation de service commerciale** (BIC) : **21,2 %**
- **Vente de marchandises** (BIC) : **12,3 %**

**Versement libératoire de l’impôt sur le revenu** (option, sous condition de RFR) :
- BNC : 2,2 %
- BIC services : 1,7 %
- Vente : 1 %

Si tu **n’es pas au versement libératoire**, tes revenus sont imposés au barème classique avec un **abattement forfaitaire** :
- 34 % pour BNC
- 50 % pour BIC services
- 71 % pour vente

**Plafonds 2026** :
- 77 700 € HT/an (prestations de service et BNC)
- 188 700 € HT/an (vente de marchandises)

**Frais à prévoir en plus** :
- **CFE** (Cotisation Foncière des Entreprises) : 200 à 600 €/an, due à partir de la 2ᵉ année.
- **Mutuelle santé** : non obligatoire mais fortement recommandée.
- **Assurance RC pro** : ~10 à 30 €/mois selon le métier.

**Exemple** : 4 000 € HT/mois en BNC avec versement libératoire :
- URSSAF : 928 €
- IR : 88 €
- **Net mensuel : 2 984 €**`,

  examples: {
    columns: [
      { key: 'activite', label: 'Activité' },
      { key: 'ca', label: 'CA mensuel' },
      { key: 'taux', label: 'Taux total' },
      { key: 'net', label: 'Net mensuel' },
    ],
    rows: [
      { activite: 'Dev freelance (BNC)', ca: '5 000 €', taux: '25,4 %', net: '3 730 €' },
      { activite: 'Coach sport (BNC)', ca: '2 500 €', taux: '25,4 %', net: '1 865 €' },
      { activite: 'Boutique en ligne (vente)', ca: '8 000 €', taux: '13,3 %', net: '6 936 €' },
      { activite: 'Conciergerie (BIC service)', ca: '3 500 €', taux: '22,9 %', net: '2 699 €' },
    ],
  },

  faq: [
    {
      q: 'Le versement libératoire est-il toujours intéressant ?',
      a: 'Non. Il n’est avantageux que si ton revenu fiscal de référence est faible et qu’il dépasserait le seuil non-imposable au barème classique. Au-dessus de ~28 000 € de RFR, c’est rarement rentable.',
    },
    {
      q: 'Que se passe-t-il en dépassant le plafond ?',
      a: 'Tu peux dépasser sur 1 ou 2 années (tolérance), mais au-delà tu bascules automatiquement vers le régime réel (entreprise individuelle classique ou société).',
    },
    {
      q: 'Les cotisations donnent-elles droit à la retraite ?',
      a: 'Oui : retraite de base + complémentaire, mais avec des droits proportionnels au CA. À CA faible (sous 6 000 €/an), peu ou pas de trimestres validés. Mieux vaut compléter par une épargne (PER, PEA).',
    },
    {
      q: 'Faut-il facturer la TVA ?',
      a: 'Non tant que ton CA reste sous 36 800 € HT (services) ou 91 900 € HT (vente). Au-delà, tu factures la TVA, mais tu peux aussi la récupérer sur tes achats pro.',
    },
  ],

  related: ['combien-je-gagne-freelance', 'combien-rapporte-tiktok'],
};
