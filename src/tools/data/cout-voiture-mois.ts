import type { Tool } from '@/types/tool';
import { formatEuros, formatRange } from '@/lib/format';

export const coutVoitureMois: Tool = {
  slug: 'cout-reel-voiture-mois',
  category: 'couts',
  h1: 'Coût réel d’une voiture par mois',
  metaTitle: 'Coût réel d’une voiture par mois — calculateur 2026',
  metaDescription:
    'Calcule le vrai coût mensuel de ta voiture : carburant, assurance, dépréciation, entretien. Résultat instantané selon ton kilométrage.',
  intro:
    'Combien coûte vraiment une voiture par mois ? Au-delà du prix d’achat, il faut additionner carburant, assurance, dépréciation et entretien. Renseigne ta voiture pour obtenir le coût mensuel total.',
  keywords: ['voiture', 'coût', 'budget', 'auto', 'dépréciation'],
  lastmod: '2026-05-08',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'Au-delà du prix d’achat, une voiture coûte 350 à 550 €/mois tout compris : carburant ou recharge, assurance, entretien, dépréciation et stationnement.',

  keyTakeaways: [
    'La dépréciation est souvent le 1er poste de coût : 15 à 25 % la 1ère année, 10 %/an ensuite.',
    'Une électrique coûte ~30 % de moins à rouler mais ~30 % de plus à l’achat — équilibre vers 80 000 km.',
    'Assurance + entretien + contrôle technique : 100 à 150 €/mois incompressibles.',
    'En LOA/LLD, additionne loyer + carburant + assurance pour comparer au vrai coût d’une voiture en propriété.',
  ],

  howTo: [
    {
      name: 'Indique le prix d’achat et la durée de détention',
      text: 'La dépréciation se calcule sur la durée totale de garde du véhicule (5 à 10 ans typique).',
    },
    {
      name: 'Renseigne ton kilométrage annuel',
      text: 'Sois honnête : la moyenne française est de 12 000 km/an en zone péri-urbaine.',
    },
    {
      name: 'Choisis ton type d’énergie et la consommation',
      text: 'Essence, diesel, hybride ou électrique — l’outil applique le prix au litre/kWh en cours.',
    },
    {
      name: 'Ajoute assurance et entretien annuels',
      text: 'Consulte ton attestation d’assurance et garde une marge entretien (200-400 €/an selon âge).',
    },
  ],

  useCases: [
    {
      title: 'Choisir entre achat, LOA et LLD',
      description: 'Compare le coût réel mensuel de chaque option pour ta voiture cible.',
    },
    {
      title: 'Comparer essence/diesel vs électrique',
      description: 'Vérifie le seuil de rentabilité d’une électrique selon ton kilométrage.',
    },
    {
      title: 'Décider de vendre une voiture peu utilisée',
      description: 'Si tu fais <8 000 km/an, le coût au kilomètre explose — autopartage souvent plus rentable.',
    },
    {
      title: 'Budgétiser un déménagement sans voiture',
      description: 'Visualise les centaines d’euros mensuels que tu peux réallouer en passant sans véhicule.',
    },
  ],

  pitfalls: [
    {
      title: 'Oublier la dépréciation',
      description: 'C’est souvent le 1er poste de coût. Une voiture perd 15-25 % la 1ère année, 10 %/an ensuite — invisible mais bien réel.',
    },
    {
      title: 'Sous-estimer l’entretien sur véhicule de plus de 5 ans',
      description: 'Au-delà de 100 000 km, prévois 500-1 200 €/an supplémentaires (pneus, embrayage, suspension, distribution).',
    },
    {
      title: 'Oublier le stationnement résidentiel',
      description: 'En ville, 80 à 250 €/mois selon la zone. Coût caché souvent absent des budgets quand on possède sa voiture.',
    },
    {
      title: 'Comparer un loyer LOA au prix d’achat seul',
      description: 'En LOA, le loyer mensuel inclut souvent l’entretien et l’assurance — compare en additionnant tous les coûts d’usage d’un côté comme de l’autre.',
    },
  ],

  sources: [
    {
      label: 'ADEME — Coût d’usage des véhicules',
      url: 'https://www.ademe.fr/expertises/mobilite-transports',
    },
    {
      label: 'Automobile Club Association — Budget de l’automobiliste',
      url: 'https://www.automobile-club.org/budget-de-lautomobiliste',
    },
  ],

  inputs: [
    {
      id: 'price',
      label: 'Prix d’achat',
      type: 'number',
      unit: '€',
      defaultValue: 18000,
      min: 0,
      step: 500,
    },
    {
      id: 'consumption',
      label: 'Consommation moyenne',
      type: 'number',
      unit: 'L / 100 km',
      defaultValue: 6,
      min: 0,
      step: 0.1,
    },
    {
      id: 'km',
      label: 'Kilométrage annuel',
      type: 'number',
      unit: 'km / an',
      defaultValue: 12000,
      min: 0,
      step: 500,
    },
    {
      id: 'fuelPrice',
      label: 'Prix du carburant',
      type: 'number',
      unit: '€ / L',
      defaultValue: 1.85,
      min: 0,
      step: 0.05,
    },
    {
      id: 'insurance',
      label: 'Assurance annuelle',
      type: 'number',
      unit: '€ / an',
      defaultValue: 600,
      min: 0,
      step: 50,
    },
  ],

  compute: (values) => {
    const price = Number(values.price) || 0;
    const consumption = Number(values.consumption) || 0;
    const km = Number(values.km) || 0;
    const fuelPrice = Number(values.fuelPrice) || 0;
    const insurance = Number(values.insurance) || 0;

    const fuelMonthly = ((km / 100) * consumption * fuelPrice) / 12;
    const insuranceMonthly = insurance / 12;
    // Dépréciation linéarisée sur 5 ans (≈ 18 % la première année, lissée à 14 %).
    const depreciationMonthly = (price * 0.14) / 12;
    // Entretien forfaitaire : 0,06 € / km (révision, pneus, freins).
    const maintenanceMonthly = (km * 0.06) / 12;

    const total = fuelMonthly + insuranceMonthly + depreciationMonthly + maintenanceMonthly;
    const annual = total * 12;

    return {
      primary: {
        label: 'Coût mensuel total',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        {
          label: 'Carburant',
          value: fuelMonthly,
          unit: '€',
          formatted: formatEuros(fuelMonthly),
        },
        {
          label: 'Assurance',
          value: insuranceMonthly,
          unit: '€',
          formatted: formatEuros(insuranceMonthly),
        },
        {
          label: 'Dépréciation',
          value: depreciationMonthly,
          unit: '€',
          formatted: formatEuros(depreciationMonthly),
        },
        {
          label: 'Entretien',
          value: maintenanceMonthly,
          unit: '€',
          formatted: formatEuros(maintenanceMonthly),
        },
      ],
      range: { min: total * 0.85, max: total * 1.2, formatted: formatRange(total * 0.85, total * 1.2) },
      notes: [
        `Coût annuel total estimé : ${formatEuros(annual)}.`,
        'Hors stationnement, péages, contrôle technique et financement éventuel.',
      ],
    };
  },

  explanation: `Le **coût réel** d’une voiture est presque toujours sous-estimé. Au-delà du carburant, il faut intégrer la **dépréciation** (la voiture perd 40 à 60 % de sa valeur en 5 ans), l’**assurance**, l’**entretien** courant et les **réparations** imprévues.

**Méthode de calcul utilisée** :
- **Dépréciation** : 14 % de la valeur d’achat par an (moyenne sur 5 ans pour une thermique récente). Une électrique ou une occasion plus ancienne perdent moins.
- **Carburant** : (km / 100) × consommation L/100 × prix au litre.
- **Entretien** : 0,06 € par km parcouru (révision annuelle, pneus tous les 40–50 000 km, freins, etc.).
- **Assurance** : montant annuel saisi divisé par 12.

Sur 12 000 km/an avec une voiture à 18 000 € et 6 L/100, on tourne autour de **400 à 500 € par mois**, soit **5 000 à 6 000 € par an**. Ce calcul est validé par les barèmes de l’Automobile Club et par les études de l’ADEME.

**Ce qui n’est pas inclus** : stationnement résidentiel (300 à 1 200 €/an en ville), péages, contrôle technique (80 €/2 ans), et financement (intérêts sur 15 à 30 € par mois pour un crédit auto classique).`,

  examples: {
    columns: [
      { key: 'profil', label: 'Profil' },
      { key: 'price', label: 'Prix achat' },
      { key: 'km', label: 'km/an' },
      { key: 'monthly', label: 'Coût', unit: '€/mois' },
    ],
    rows: [
      { profil: 'Citadine occasion', price: '8 000 €', km: '8 000', monthly: '230 €' },
      { profil: 'Compacte récente', price: '18 000 €', km: '12 000', monthly: '460 €' },
      { profil: 'SUV familial', price: '32 000 €', km: '15 000', monthly: '780 €' },
      { profil: 'Premium thermique', price: '50 000 €', km: '20 000', monthly: '1 250 €' },
    ],
  },

  faq: [
    {
      q: 'Pourquoi mon coût est plus élevé que prévu ?',
      a: 'Souvent à cause de la dépréciation, qui reste invisible tant qu’on ne revend pas. Sur une voiture neuve, elle représente 30 à 50 % du coût mensuel total.',
    },
    {
      q: 'Une voiture électrique coûte-t-elle moins cher ?',
      a: 'À l’usage oui : carburant divisé par 3 ou 4, entretien réduit. Mais le prix d’achat plus élevé et la dépréciation parfois plus rapide compensent partiellement.',
    },
    {
      q: 'Le leasing revient-il moins cher ?',
      a: 'Pas vraiment : le loyer mensuel intègre la dépréciation que vous payez quand même. Le leasing simplifie la gestion mais ne réduit pas le coût total.',
    },
    {
      q: 'Faut-il prendre une voiture en occasion pour économiser ?',
      a: 'Oui. Une occasion de 3–4 ans a déjà absorbé la plus grosse part de la dépréciation. Le coût mensuel chute typiquement de 25 à 40 % par rapport au neuf équivalent.',
    },
  ],

  related: ['rentabilite-airbnb', 'combien-je-gagne-freelance'],
};
