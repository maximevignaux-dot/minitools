import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent, formatRange } from '@/lib/format';

export const rentabiliteAirbnb: Tool = {
  slug: 'rentabilite-airbnb',
  category: 'immobilier',
  h1: 'Calculateur de rentabilité Airbnb',
  metaTitle: 'Rentabilité Airbnb : calculateur de rendement 2026',
  metaDescription:
    'Calcule la rentabilité brute et nette d’une location Airbnb selon le prix de la nuit, le taux d’occupation et les charges. Outil gratuit, sans inscription.',
  intro:
    'Quel rendement attendre d’un bien loué en Airbnb ? Renseigne le prix de la nuit, le taux d’occupation moyen, les charges et le prix d’achat : tu obtiens la rentabilité nette annuelle.',
  keywords: ['airbnb', 'rentabilité', 'immobilier', 'location courte durée'],
  lastmod: '2026-05-08',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'En location courte durée, le rendement brut atteint 8 à 15 % vs 4 à 6 % en longue durée — mais compte 30 à 50 % de charges (ménage, commission, fiscalité) avant de comparer.',

  keyTakeaways: [
    'Le taux d’occupation est la variable n°1 : 60 % vs 80 % change radicalement la rentabilité.',
    'Commission Airbnb : 14 à 18 % du loyer + ~60-90 €/séjour de ménage selon la zone.',
    'Fiscalement : abattement 50 % en micro-BIC, 71 % en meublé de tourisme classé (sous conditions).',
    'Beaucoup de villes plafonnent à 120 nuits/an pour les résidences principales — vérifie ta réglementation locale.',
  ],

  howTo: [
    {
      name: 'Saisis le prix d’achat et frais d’acquisition',
      text: 'Prix du bien + frais de notaire (~8 % dans l’ancien) + éventuels travaux.',
    },
    {
      name: 'Indique le tarif moyen par nuit',
      text: 'Regarde des annonces comparables dans ton quartier sur Airbnb/Booking pour fixer un prix réaliste.',
    },
    {
      name: 'Estime ton taux d’occupation',
      text: 'AirDNA et données locales donnent la fourchette : 55-75 % typique hors zones très touristiques.',
    },
    {
      name: 'Renseigne tes charges annuelles',
      text: 'Taxe foncière, copropriété, ménage, plateforme, assurance PNO — n’oublie rien.',
    },
  ],

  useCases: [
    {
      title: 'Évaluer un bien avant achat pour LCD',
      description: 'Calcule la rentabilité nette avant de signer un compromis sur un projet locatif touristique.',
    },
    {
      title: 'Comparer LCD vs location nue',
      description: 'Sur le même appartement, vérifie si la LCD vaut la charge mentale supplémentaire.',
    },
    {
      title: 'Préparer un dossier banque',
      description: 'Présente les revenus prévisionnels nets pour défendre un financement immobilier locatif.',
    },
    {
      title: 'Choisir entre micro-BIC et réel simplifié',
      description: 'Estime à partir de quel niveau de revenu le passage au LMNP au réel devient gagnant.',
    },
  ],

  pitfalls: [
    {
      title: 'Sous-estimer le coût du ménage',
      description: '60 à 90 €/séjour selon la zone, à multiplier par le nombre de rotations. Sur 100 séjours/an, c’est 6 000 à 9 000 €.',
    },
    {
      title: 'Oublier les périodes de vacance',
      description: 'Un taux d’occupation de 60 % signifie 40 % de nuits vides à payer (charges, copro, taxe foncière) sans revenu.',
    },
    {
      title: 'Ignorer la réglementation locale',
      description: 'Beaucoup de villes (Paris, Lyon, Bordeaux…) limitent à 120 nuits/an la location de résidence principale. Vérifie en mairie avant d’acheter.',
    },
    {
      title: 'Comparer brut LCD à net longue durée',
      description: 'Le 10 % brut LCD redescend souvent à 4-5 % net après ménage, commissions, vacance et fiscalité — pas si loin du locatif nu.',
    },
  ],

  sources: [
    {
      label: 'impots.gouv.fr — Location meublée',
      url: 'https://www.impots.gouv.fr/particulier/location-meublee',
    },
    {
      label: 'Service-Public.fr — Location meublée touristique',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F2030',
    },
  ],

  inputs: [
    {
      id: 'nightPrice',
      label: 'Prix moyen de la nuit',
      type: 'number',
      unit: '€',
      defaultValue: 90,
      min: 0,
      step: 5,
    },
    {
      id: 'occupancy',
      label: 'Taux d’occupation moyen',
      type: 'slider',
      unit: '%',
      defaultValue: 65,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: 'charges',
      label: 'Charges mensuelles (ménage, conciergerie, factures)',
      type: 'number',
      unit: '€ / mois',
      defaultValue: 350,
      min: 0,
      step: 25,
    },
    {
      id: 'price',
      label: 'Prix d’achat du bien',
      type: 'number',
      unit: '€',
      defaultValue: 220000,
      min: 0,
      step: 5000,
    },
  ],

  compute: (values) => {
    const nightPrice = Number(values.nightPrice) || 0;
    const occupancy = (Number(values.occupancy) || 0) / 100;
    const charges = Number(values.charges) || 0;
    const price = Number(values.price) || 0;

    const occupiedNights = 365 * occupancy;
    const grossAnnual = nightPrice * occupiedNights;
    const annualCharges = charges * 12;
    // Frais Airbnb hôte : ~3 % du brut.
    const platformFees = grossAnnual * 0.03;
    const netAnnual = grossAnnual - annualCharges - platformFees;

    const grossYield = price > 0 ? grossAnnual / price : 0;
    const netYield = price > 0 ? netAnnual / price : 0;

    return {
      primary: {
        label: 'Rentabilité nette annuelle',
        value: netYield,
        unit: '%',
        formatted: formatPercent(netYield),
      },
      secondary: [
        { label: 'Revenus annuels bruts', value: grossAnnual, unit: '€', formatted: formatEuros(grossAnnual) },
        { label: 'Charges annuelles', value: annualCharges + platformFees, unit: '€', formatted: formatEuros(annualCharges + platformFees) },
        { label: 'Revenu net annuel', value: netAnnual, unit: '€', formatted: formatEuros(netAnnual) },
        { label: 'Rentabilité brute', value: grossYield, unit: '%', formatted: formatPercent(grossYield) },
      ],
      range: {
        min: netAnnual * 0.8,
        max: netAnnual * 1.1,
        formatted: formatRange(netAnnual * 0.8, netAnnual * 1.1),
      },
      notes: [
        'Hors taxe de séjour, impôts (LMNP / LMP), assurance PNO, copropriété et travaux.',
        'En zone tendue, attention au plafond de 120 nuits/an pour les résidences principales.',
      ],
    };
  },

  explanation: `La **rentabilité nette d’un Airbnb** dépend de quatre leviers : le **prix de la nuit**, le **taux d’occupation**, les **charges récurrentes** et le **prix d’achat** (ou la valorisation actuelle).

**Calcul** :
- **Revenus bruts** = prix nuit × 365 × taux d’occupation
- **Frais Airbnb** = 3 % des revenus bruts (commission hôte standard)
- **Charges fixes** = ménage + conciergerie + abonnements (Internet, énergie) + petit entretien
- **Net annuel** = brut − frais plateforme − charges
- **Rentabilité nette** = net annuel ÷ prix d’achat

**Taux d’occupation réalistes** :
- Studio en grande ville (Paris, Lyon) : 70 à 85 %
- Appartement en ville moyenne : 50 à 65 %
- Bien de tourisme saisonnier : 30 à 50 % (mais nuits 2 à 3 × plus chères)

**Ce qui n’est pas inclus** dans le calcul :
- **Fiscalité** : régime LMNP au réel, micro-BIC (50 % d’abattement) ou LMP. Comptez 15 à 25 % d’impôts effectifs sur le bénéfice.
- **Assurance** propriétaire non-occupant (~150 €/an).
- **Copropriété** (50 à 200 €/mois selon le bien).
- **Travaux et amortissement** (compter 1 % du prix par an en moyenne).

Une rentabilité nette **avant impôts** de **5 à 7 %** est considérée comme bonne en France. Au-delà de 8 %, vérifier que le calcul intègre bien tous les frais.`,

  examples: {
    columns: [
      { key: 'bien', label: 'Bien' },
      { key: 'price', label: 'Prix achat' },
      { key: 'nuit', label: 'Prix nuit' },
      { key: 'rentab', label: 'Rentab. nette' },
    ],
    rows: [
      { bien: 'Studio Paris 11e', price: '290 000 €', nuit: '110 €', rentab: '4,2 %' },
      { bien: 'T2 Lyon Croix-Rousse', price: '210 000 €', nuit: '85 €', rentab: '6,1 %' },
      { bien: 'T3 Bordeaux', price: '260 000 €', nuit: '95 €', rentab: '5,4 %' },
      { bien: 'Maison Annecy', price: '420 000 €', nuit: '180 €', rentab: '7,3 %' },
    ],
  },

  faq: [
    {
      q: 'Quel taux d’occupation espérer en Airbnb ?',
      a: 'Entre 50 % et 85 % selon la ville et la concurrence. AirDNA et Inside Airbnb donnent des moyennes réelles par quartier. Dans les grandes villes, on dépasse rarement 80 %.',
    },
    {
      q: 'Airbnb est-il plus rentable que la location longue durée ?',
      a: 'En général oui — typiquement 1,5 à 2,5 × plus brut. Mais les charges (ménage, gestion, vacance) sont aussi plus élevées. Le delta net se réduit à 30–80 %.',
    },
    {
      q: 'Quel statut fiscal choisir pour un Airbnb ?',
      a: 'Sous 23 000 € de recettes : micro-BIC avec 50 % d’abattement (71 % si meublé de tourisme classé). Au-delà : LMNP au réel ou LMP, qui permettent d’amortir le bien et le mobilier.',
    },
    {
      q: 'Y a-t-il un plafond de nuitées par an ?',
      a: 'Oui pour la résidence principale : 120 nuits/an en France. Pour une résidence secondaire mise en location complète, pas de plafond, mais autorisation mairie obligatoire dans les zones tendues.',
    },
  ],

  related: ['cout-reel-voiture-mois', 'combien-je-gagne-freelance'],
};
