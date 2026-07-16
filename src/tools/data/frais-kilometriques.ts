import type { Tool } from '@/types/tool';
import { formatEuros } from '@/lib/format';

interface Tranche {
  upTo: number;
  base: (cv: number, d: number) => number;
}

interface BaremeCV {
  cv: string;
  label: string;
  tranches: Tranche[];
}

const BAREMES: Record<string, BaremeCV> = {
  cv3: {
    cv: '3',
    label: '3 CV et moins',
    tranches: [
      { upTo: 5000, base: (_c, d) => d * 0.529 },
      { upTo: 20000, base: (_c, d) => d * 0.316 + 1065 },
      { upTo: Infinity, base: (_c, d) => d * 0.37 },
    ],
  },
  cv4: {
    cv: '4',
    label: '4 CV',
    tranches: [
      { upTo: 5000, base: (_c, d) => d * 0.606 },
      { upTo: 20000, base: (_c, d) => d * 0.34 + 1330 },
      { upTo: Infinity, base: (_c, d) => d * 0.407 },
    ],
  },
  cv5: {
    cv: '5',
    label: '5 CV',
    tranches: [
      { upTo: 5000, base: (_c, d) => d * 0.636 },
      { upTo: 20000, base: (_c, d) => d * 0.357 + 1395 },
      { upTo: Infinity, base: (_c, d) => d * 0.427 },
    ],
  },
  cv6: {
    cv: '6',
    label: '6 CV',
    tranches: [
      { upTo: 5000, base: (_c, d) => d * 0.665 },
      { upTo: 20000, base: (_c, d) => d * 0.374 + 1457 },
      { upTo: Infinity, base: (_c, d) => d * 0.447 },
    ],
  },
  cv7: {
    cv: '7',
    label: '7 CV et +',
    tranches: [
      { upTo: 5000, base: (_c, d) => d * 0.697 },
      { upTo: 20000, base: (_c, d) => d * 0.394 + 1515 },
      { upTo: Infinity, base: (_c, d) => d * 0.47 },
    ],
  },
};

function applyBareme(bareme: BaremeCV, d: number): number {
  for (const tranche of bareme.tranches) {
    if (d <= tranche.upTo) return tranche.base(Number(bareme.cv), d);
  }
  return 0;
}

export const fraisKilometriques: Tool = {
  slug: 'frais-kilometriques',
  category: 'couts',
  h1: 'Frais kilométriques : barème fiscal 2026',
  metaTitle: 'Frais kilométriques 2026 : calculateur barème fiscal voiture',
  metaDescription:
    'Calcule tes frais kilométriques selon le barème fiscal 2026 voiture : déduction impôt selon CV et km annuels. Majoration véhicule électrique inclus.',
  intro:
    'Combien de frais réels peux-tu déduire au fisc grâce au barème kilométrique ? Saisis ta distance annuelle pour le travail, la puissance fiscale de ta voiture et le type d’énergie : tu obtiens le montant déductible.',
  keywords: ['frais kilométriques', 'barème kilométrique', 'IK', 'CV fiscaux', 'déduction impôt', 'frais réels'],
  lastmod: '2026-05-14',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'Avec une 5 CV qui parcourt 12 000 km/an pour le travail, tu peux déduire environ 5 680 € de frais réels. Le barème inclut tout : carburant, assurance, entretien, dépréciation.',

  keyTakeaways: [
    'Le barème kilométrique remplace les frais réels détaillés — tu ne peux pas cumuler les deux.',
    'Trois tranches : 0-5 000 km (taux plein), 5 001-20 000 km (taux réduit + forfait), 20 000+ km (taux plat).',
    'Véhicule électrique : majoration de 20 % du montant calculé.',
    'À comparer chaque année avec l’abattement forfaitaire de 10 % automatiquement appliqué — le plus avantageux gagne.',
  ],

  howTo: [
    {
      name: 'Calcule ta distance annuelle "travail"',
      text: 'Trajets domicile-travail (max 40 km/jour aller en général) × nb de jours travaillés + déplacements pro. N’inclus pas les trajets personnels.',
    },
    {
      name: 'Vérifie la puissance fiscale de ton véhicule',
      text: 'Indiquée sur la carte grise case P.6. Le barème distingue 5 catégories (3 CV-, 4, 5, 6, 7 CV+).',
    },
    {
      name: 'Indique si ton véhicule est électrique',
      text: 'Une majoration de 20 % du barème s’applique pour les VE — incitation fiscale 2026.',
    },
    {
      name: 'Compare au forfait 10 % automatique',
      text: 'Si le barème kilométrique te donne moins que 10 % de ton salaire net imposable, mieux vaut garder le forfait.',
    },
  ],

  useCases: [
    {
      title: 'Choisir entre frais réels et forfait 10 %',
      description: 'Compare le total barème vs 10 % de ton salaire net imposable — le plus grand l’emporte.',
    },
    {
      title: 'Optimiser ta déclaration d’impôt',
      description: 'Si tu fais >15 000 km/an dont une grosse part pour le boulot, les frais réels écrasent souvent le forfait.',
    },
    {
      title: 'Anticiper l’achat d’un véhicule pour le travail',
      description: 'Compare le déductible d’une 4 CV vs 6 CV pour ton kilométrage type avant achat.',
    },
    {
      title: 'Justifier les déplacements pro en freelance',
      description: 'Le même barème s’applique en BNC réel — sers-toi-en pour valoriser tes km pro.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre kilométrage personnel et professionnel',
      description: 'Seuls les km pour aller travailler et les déplacements pros sont déductibles. Les trajets perso, jamais.',
    },
    {
      title: 'Dépasser le plafond de 40 km/jour aller',
      description: 'Au-delà de 40 km aller domicile-travail, tu dois justifier des raisons familiales/professionnelles particulières. Sinon, plafonné.',
    },
    {
      title: 'Cumuler barème et frais détaillés',
      description: 'Le barème englobe TOUT (carburant, assurance, entretien, péages, dépréciation). Pas de double déduction sur des postes individuels.',
    },
    {
      title: 'Oublier de cocher "frais réels" sur la déclaration',
      description: 'Sans cette option, le fisc applique le forfait 10 % automatique — ton barème calculé n’est pas pris en compte.',
    },
  ],

  sources: [
    {
      label: 'impots.gouv.fr — Barème kilométrique',
      url: 'https://www.impots.gouv.fr/particulier/questions/comment-puis-je-utiliser-le-bareme-kilometrique',
    },
    {
      label: 'Service-Public.fr — Frais professionnels déduction',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F1900',
    },
    {
      label: 'BOFiP — Barème kilométrique applicable',
      url: 'https://bofip.impots.gouv.fr/bofip/8516-PGP',
    },
  ],

  inputs: [
    {
      id: 'distance',
      label: 'Distance annuelle parcourue',
      type: 'number',
      unit: 'km / an',
      defaultValue: 12000,
      min: 0,
      step: 100,
    },
    {
      id: 'cv',
      label: 'Puissance fiscale (case P.6 de la carte grise)',
      type: 'select',
      defaultValue: 'cv5',
      options: Object.entries(BAREMES).map(([value, b]) => ({ value, label: b.label })),
    },
    {
      id: 'electrique',
      label: 'Véhicule',
      type: 'select',
      defaultValue: 'thermique',
      options: [
        { value: 'thermique', label: 'Thermique ou hybride' },
        { value: 'electrique', label: 'Électrique (majoration 20 %)' },
      ],
    },
  ],

  compute: (values) => {
    const distance = Math.max(0, Number(values.distance) || 0);
    const bareme = BAREMES[String(values.cv)] ?? BAREMES.cv5;
    const electrique = String(values.electrique) === 'electrique';

    const baseAmount = applyBareme(bareme, distance);
    const majoration = electrique ? baseAmount * 0.2 : 0;
    const total = baseAmount + majoration;
    const parKm = distance > 0 ? total / distance : 0;

    return {
      primary: {
        label: 'Frais kilométriques déductibles',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        { label: 'Montant de base (barème)', value: baseAmount, unit: '€', formatted: formatEuros(baseAmount) },
        ...(electrique
          ? [{ label: 'Majoration véhicule électrique (+20 %)', value: majoration, unit: '€', formatted: formatEuros(majoration) }]
          : []),
        { label: 'Coût moyen au kilomètre', value: parKm, unit: '€', formatted: `${parKm.toFixed(3)} €/km` },
        { label: 'Puissance fiscale retenue', value: 0, unit: '', formatted: bareme.label },
      ],
      notes: [
        'Barème 2026 simplifié (les valeurs officielles sont publiées chaque mars au BOFiP).',
        'À comparer obligatoirement avec l’abattement forfaitaire de 10 % automatique : tu prends le plus avantageux.',
      ],
    };
  },

  explanation: `Le **barème kilométrique** te permet de déduire tes frais professionnels de transport directement de ton revenu imposable, sans avoir à conserver toutes les factures. Il englobe **carburant, assurance, entretien, péages, parking et dépréciation** dans un seul montant forfaitaire au kilomètre.

**Trois tranches** par puissance fiscale :
- **0 à 5 000 km** : tarif plein au kilomètre.
- **5 001 à 20 000 km** : tarif réduit + forfait annuel (les premiers km sont déjà "amortis").
- **Au-delà de 20 000 km** : tarif plat unique.

**Majoration électrique** : depuis 2021, le barème calculé est majoré de **20 %** pour les véhicules 100 % électriques. Bonus fiscal pour la transition.

**Exemple — 5 CV thermique sur 12 000 km/an** :
- Tranche applicable : 5 001-20 000 km.
- Calcul : 12 000 × 0,357 + 1 395 = **5 679 €** déductibles.

**Exemple — 4 CV électrique sur 18 000 km/an** :
- Base : 18 000 × 0,340 + 1 330 = 7 450 €.
- Majoration 20 % : +1 490 €.
- **Total : 8 940 €** déductibles.

**Frais réels vs forfait 10 %** : par défaut, le fisc applique un **abattement automatique de 10 %** sur ton salaire net imposable. Si ton total barème (frais kilométriques + autres frais réels) **dépasse** ce forfait, il vaut le coup d'opter pour les frais réels.

Lié : [coût réel d'une voiture par mois](/couts/cout-reel-voiture-mois), [calcul mensualité prêt auto](/immobilier/calcul-mensualite-pret).`,

  examples: {
    columns: [
      { key: 'cv', label: 'Puissance' },
      { key: 'km5k', label: '5 000 km' },
      { key: 'km12k', label: '12 000 km' },
      { key: 'km20k', label: '20 000 km' },
    ],
    rows: [
      { cv: '3 CV', km5k: '2 645 €', km12k: '4 857 €', km20k: '7 385 €' },
      { cv: '4 CV', km5k: '3 030 €', km12k: '5 410 €', km20k: '8 130 €' },
      { cv: '5 CV', km5k: '3 180 €', km12k: '5 679 €', km20k: '8 535 €' },
      { cv: '6 CV', km5k: '3 325 €', km12k: '5 945 €', km20k: '8 937 €' },
      { cv: '7+ CV', km5k: '3 485 €', km12k: '6 243 €', km20k: '9 395 €' },
    ],
  },

  faq: [
    {
      q: 'Quelle est la différence entre barème kilométrique et frais réels détaillés ?',
      a: "Le barème est un forfait au kilomètre qui couvre tout (carburant, assurance, entretien, dépréciation). Les frais réels détaillés impliquent de garder toutes les factures et de prouver chaque dépense. La plupart des salariés choisissent le barème, plus simple et souvent aussi avantageux.",
    },
    {
      q: 'Faut-il déclarer les frais réels chaque année ?',
      a: "Oui. Tu coches l'option 'frais réels' dans ta déclaration 2042, et tu indiques le total dans la case 1AK (ou suivantes pour les autres membres du foyer). Sans cette option, le fisc applique automatiquement l'abattement forfaitaire de 10 %.",
    },
    {
      q: 'Le télétravail change-t-il le calcul ?',
      a: "Oui. Seuls les jours où tu te déplaces réellement comptent. Pour 3 jours de télétravail/semaine, tu divises par 2,5 ton kilométrage annuel domicile-travail théorique.",
    },
    {
      q: 'Le barème s’applique-t-il aussi aux indépendants ?',
      a: "Oui en BNC au régime réel, et pour les déplacements professionnels (clientèle, fournisseurs). En BIC c'est légèrement différent. Le barème est aussi accepté en SASU/EURL pour les remboursements de frais kilométriques au dirigeant.",
    },
  ],

  related: ['cout-reel-voiture-mois', 'brut-net-cadre', 'calcul-mensualite-pret'],
};
