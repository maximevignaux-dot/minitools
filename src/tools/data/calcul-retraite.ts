import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

function trimestresRequis(generation: number): number {
  if (generation >= 1973) return 172;
  if (generation >= 1965) return 169 + Math.min(3, Math.floor((generation - 1965) / 3));
  return 167;
}

function ageTauxPlein(generation: number): number {
  if (generation >= 1968) return 64;
  if (generation >= 1961) return 62 + (generation - 1961) * 0.25;
  return 62;
}

export const calculRetraite: Tool = {
  slug: 'calcul-retraite',
  category: 'salaire',
  h1: 'Calcul de retraite : estimation 2026',
  metaTitle: 'Calcul retraite 2026 — simulateur pension estimée',
  metaDescription:
    'Estime ta retraite (base + complémentaire) selon ton salaire moyen, tes trimestres et ta génération. Décote, surcote et taux plein détaillés.',
  intro:
    'À combien s’élèvera ta pension de retraite ? Renseigne ton salaire moyen, tes trimestres acquis et ta génération : tu obtiens une estimation de ta retraite de base, de la complémentaire AGIRC-ARRCO et du taux de remplacement.',
  keywords: ['retraite', 'pension', 'trimestres', 'taux plein', 'agirc-arrco', 'décote', 'salaire moyen'],
  lastmod: '2026-05-14',
  priority: 0.95,
  schemaType: 'SoftwareApplication',

  tldr: 'Avec 3 000 € de salaire moyen et 172 trimestres à 64 ans, ta retraite de base atteint ~1 500 €/mois + ~1 200 € de complémentaire. Total estimé : ~2 700 € brut.',

  keyTakeaways: [
    'Retraite de base = salaire annuel moyen (SAM des 25 meilleures années) × 50 % × prorata trimestres acquis / requis.',
    'Trimestres requis : 172 (43 ans de cotisation) pour les générations ≥1973. 169-171 pour 1965-1972.',
    'Décote : −1,25 % par trimestre manquant, plafonné à −25 %. Surcote : +1,25 % par trimestre en plus.',
    'Complémentaire AGIRC-ARRCO : ~30-50 % de la retraite de base selon profil cadre/non-cadre et carrière.',
  ],

  howTo: [
    {
      name: 'Renseigne ton salaire annuel moyen estimé',
      text: 'Moyenne brute de tes 25 meilleures années. Si tu débutes, utilise ton salaire actuel comme approximation.',
    },
    {
      name: 'Indique ton année de naissance',
      text: 'Détermine le nombre de trimestres requis pour le taux plein et l’âge légal de départ.',
    },
    {
      name: 'Saisis tes trimestres validés',
      text: 'Visibles sur ton relevé de carrière (Info-retraite.fr). 1 trimestre = 1 506 € brut cotisés en 2026.',
    },
    {
      name: 'Choisis ton âge de départ',
      text: 'Si tu pars avant l’âge taux plein avec moins de trimestres : décote. Au-delà : surcote.',
    },
  ],

  useCases: [
    {
      title: 'Préparer ta retraite à 5 ans',
      description: 'Visualise ce que vaut un report de 2 ans (surcote) vs un départ anticipé (décote).',
    },
    {
      title: 'Compléter ta retraite via un PER',
      description: 'Estime ton taux de remplacement pour calibrer combien verser sur un PER (compensation du gap).',
    },
    {
      title: 'Comparer carrière complète vs incomplète',
      description: 'Pour ceux avec carrière hachée (parents, expat) : impact des trimestres manquants en €/mois.',
    },
    {
      title: 'Évaluer l’impact du dernier salaire',
      description: 'Augmenter ton salaire en fin de carrière intègre les 25 meilleures années — effet sensible.',
    },
  ],

  pitfalls: [
    {
      title: 'Confondre âge légal et âge du taux plein',
      description: 'L’âge légal (64 ans pour gen ≥1968) ouvre le droit ; le taux plein dépend des trimestres. Tu peux partir à 64 ans avec décote si tu n’as pas tous tes trimestres.',
    },
    {
      title: 'Oublier la retraite complémentaire',
      description: 'L’AGIRC-ARRCO est cumulative à la base et peut représenter 30-50 % de tes revenus de retraite. Ne l’oublie jamais dans tes projections.',
    },
    {
      title: 'Sous-estimer l’impact d’une carrière hachée',
      description: 'Un trimestre manquant à 64 ans = décote -1,25 %. Sur 10 trimestres manquants : -12,5 % à vie, pas seulement une année.',
    },
    {
      title: 'Surestimer le taux de remplacement',
      description: 'Le taux de remplacement moyen en France est ~75 % du dernier salaire (base + compl.). Pour les hauts revenus, il chute à 50-60 %.',
    },
  ],

  sources: [
    {
      label: 'Info-Retraite.fr — Relevé de carrière',
      url: 'https://www.info-retraite.fr/',
    },
    {
      label: 'Service-Public.fr — Calcul retraite régime général',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F21552',
    },
    {
      label: 'AGIRC-ARRCO — Retraite complémentaire',
      url: 'https://www.agirc-arrco.fr/',
    },
  ],

  inputs: [
    {
      id: 'salaire',
      label: 'Salaire annuel brut moyen (25 meilleures années)',
      type: 'number',
      unit: '€ / an',
      defaultValue: 36000,
      min: 0,
      step: 1000,
    },
    {
      id: 'naissance',
      label: 'Année de naissance',
      type: 'number',
      unit: '',
      defaultValue: 1980,
      min: 1950,
      max: 2010,
      step: 1,
    },
    {
      id: 'trimestres',
      label: 'Trimestres acquis (estimation à l’âge de départ)',
      type: 'number',
      unit: 'trimestres',
      defaultValue: 172,
      min: 0,
      max: 200,
      step: 1,
    },
    {
      id: 'age',
      label: 'Âge de départ envisagé',
      type: 'number',
      unit: 'ans',
      defaultValue: 64,
      min: 60,
      max: 70,
      step: 1,
    },
    {
      id: 'statut',
      label: 'Statut majoritaire de carrière',
      type: 'select',
      defaultValue: 'cadre',
      options: [
        { value: 'noncadre', label: 'Non-cadre' },
        { value: 'cadre', label: 'Cadre' },
      ],
    },
  ],

  compute: (values) => {
    const salaire = Math.max(0, Number(values.salaire) || 0);
    const naissance = Math.max(1950, Number(values.naissance) || 1980);
    const trimestres = Math.max(0, Number(values.trimestres) || 0);
    const age = Math.max(60, Number(values.age) || 64);
    const statut = String(values.statut);

    const requis = trimestresRequis(naissance);
    const ageTP = ageTauxPlein(naissance);

    // Coefficient de proratisation
    const prorata = Math.min(1, trimestres / requis);
    // Décote / surcote
    const ageDiff = age - ageTP;
    const trimManquants = Math.max(0, requis - trimestres);
    const trimSupplementaires = Math.max(0, trimestres - requis);
    const trimAgeManquants = Math.max(0, -ageDiff * 4);
    const decoteTrim = Math.min(trimManquants, trimAgeManquants);
    const decote = Math.min(0.25, decoteTrim * 0.0125);
    const surcote = ageDiff > 0 ? trimSupplementaires * 0.0125 : 0;

    const tauxApplique = 0.5 * prorata * (1 - decote) * (1 + surcote);
    const baseMensuelle = (salaire * tauxApplique) / 12;
    // Complémentaire approximée
    const coefCompl = statut === 'cadre' ? 0.5 : 0.35;
    const complMensuelle = baseMensuelle * coefCompl;
    const totalMensuel = baseMensuelle + complMensuelle;
    const tauxRemplacement = salaire > 0 ? (totalMensuel * 12) / salaire : 0;

    return {
      primary: {
        label: 'Retraite mensuelle totale estimée (brut)',
        value: totalMensuel,
        unit: '€',
        formatted: formatEuros(totalMensuel),
      },
      secondary: [
        { label: 'Retraite de base (régime général)', value: baseMensuelle, unit: '€', formatted: formatEuros(baseMensuelle) },
        { label: 'Complémentaire AGIRC-ARRCO estimée', value: complMensuelle, unit: '€', formatted: formatEuros(complMensuelle) },
        { label: 'Trimestres requis (ta génération)', value: requis, unit: 'trim', formatted: `${requis} trim` },
        { label: 'Âge taux plein (ta génération)', value: ageTP, unit: 'ans', formatted: `${ageTP} ans` },
        ...(decote > 0
          ? [{ label: 'Décote appliquée', value: -decote, unit: '%', formatted: formatPercent(-decote) }]
          : []),
        ...(surcote > 0
          ? [{ label: 'Surcote appliquée', value: surcote, unit: '%', formatted: formatPercent(surcote) }]
          : []),
        { label: 'Taux de remplacement estimé', value: tauxRemplacement, unit: '%', formatted: formatPercent(tauxRemplacement) },
      ],
      notes: [
        'Estimation simplifiée. Le calcul officiel intègre les périodes assimilées (chômage, maladie, maternité), majorations parents, RAFP (fonctionnaires), etc.',
        'La complémentaire AGIRC-ARRCO est ici approchée (coefficient cadre 50 %, non-cadre 35 %). Le calcul exact se fait par points cumulés × valeur du point.',
        'Pour un calcul officiel, connecte-toi sur info-retraite.fr avec FranceConnect.',
      ],
    };
  },

  explanation: `Le calcul d'une retraite en France additionne deux composantes principales : la **retraite de base** (Sécurité sociale, régime général) et la **retraite complémentaire** (AGIRC-ARRCO pour les salariés du privé).

**Retraite de base — la formule** :
\`\`\`
retraite_annuelle = SAM × 50 % × (trimestres_acquis / trimestres_requis) × (1 ± décote/surcote)
\`\`\`
où :
- **SAM** = salaire annuel moyen des 25 meilleures années (revalorisé inflation)
- **50 %** = taux plein
- **trimestres requis** : 172 pour les générations ≥1973, dégressif vers 167 pour les plus anciennes
- **décote** : −1,25 % par trimestre manquant (plafond 25 %)
- **surcote** : +1,25 % par trimestre en plus

**Exemple** — SAM 36 000 €, gen 1980, 172 trimestres à 64 ans :
- Prorata : 172/172 = 100 %
- Décote/surcote : 0
- Retraite annuelle base : 36 000 × 50 % × 100 % = **18 000 €/an**, soit **1 500 €/mois**

**Complémentaire AGIRC-ARRCO** : calculée en **points** (1 point ≈ 18 €/an). Une carrière complète de cadre cumule ~5 000-8 000 points. Pour simplifier : compte **+50 %** de la retraite de base pour un cadre, **+35 %** pour un non-cadre. Pour l'exemple ci-dessus, complémentaire ≈ 750 €/mois (cadre).

**Total brut** : 1 500 + 750 = **2 250 €/mois**, soit un **taux de remplacement** d'environ 75 % du dernier salaire.

**Âges clés (réforme 2023)** :
- **Âge légal** (départ possible) : 64 ans pour les générations ≥1968.
- **Âge du taux plein automatique** : 67 ans, peu importe les trimestres.

**Optimisations possibles** :
- Compenser un manque de trimestres via le [PER](/epargne/simulateur-per).
- Travailler 1-2 ans de plus pour surcote (+5 % à +10 %).
- Vérifier ton relevé de carrière régulièrement sur Info-retraite.fr.`,

  examples: {
    columns: [
      { key: 'profil', label: 'Profil' },
      { key: 'sam', label: 'SAM annuel' },
      { key: 'trim', label: 'Trimestres' },
      { key: 'retraite', label: 'Total mensuel brut' },
    ],
    rows: [
      { profil: 'Smic carrière complète', sam: '21 600 €', trim: '172/172', retraite: '~1 470 €' },
      { profil: 'Salarié moyen (non-cadre)', sam: '30 000 €', trim: '172/172', retraite: '~1 690 €' },
      { profil: 'Cadre moyen', sam: '50 000 €', trim: '172/172', retraite: '~3 125 €' },
      { profil: 'Cadre + 8 trim de décote', sam: '50 000 €', trim: '164/172', retraite: '~2 700 €' },
      { profil: 'Cadre + 4 trim de surcote', sam: '50 000 €', trim: '176/172', retraite: '~3 280 €' },
    ],
  },

  faq: [
    {
      q: 'À quel âge puis-je partir à la retraite en 2026 ?',
      a: "L'âge légal pour les générations ≥1968 est de 64 ans (réforme 2023). Tu peux partir avant si tu as suffisamment de trimestres pour une retraite à taux plein, ou plus tard pour une surcote.",
    },
    {
      q: 'Combien de trimestres faut-il pour le taux plein ?',
      a: "172 trimestres (43 ans cotisés) pour les générations ≥1973. Entre 169 et 171 pour les générations 1965-1972, dégressif vers 167 pour les plus anciennes.",
    },
    {
      q: 'Qu’est-ce que la décote et comment l’éviter ?',
      a: "La décote est une réduction définitive de ta retraite si tu pars avant le taux plein. Elle est de -1,25 % par trimestre manquant, plafonnée à -25 %. Pour l'éviter : attendre l'âge du taux plein automatique (67 ans), ou travailler plus longtemps pour acquérir les trimestres requis.",
    },
    {
      q: 'Le PER aide-t-il pour la retraite ?',
      a: "Oui de deux manières : il défiscalise tes versements à l'entrée (déduction de ta TMI) et il constitue un capital complémentaire débloqué à la retraite. Voir notre [simulateur PER](/epargne/simulateur-per) pour quantifier l'impact.",
    },
  ],

  related: ['brut-net-cadre', 'simulateur-per', 'calcul-augmentation-salaire'],
};
