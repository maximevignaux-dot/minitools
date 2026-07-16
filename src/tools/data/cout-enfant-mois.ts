import type { Tool } from '@/types/tool';
import { formatEuros } from '@/lib/format';

interface AgeBracket {
  alim: number;
  vetements: number;
  scolaire: number;
  loisirs: number;
  divers: number;
  label: string;
}

const AGES: Record<string, AgeBracket> = {
  bebe: { alim: 130, vetements: 60, scolaire: 0, loisirs: 30, divers: 80, label: '0-3 ans (bébé / petit enfant)' },
  petit: { alim: 160, vetements: 50, scolaire: 30, loisirs: 50, divers: 60, label: '4-10 ans (école primaire)' },
  ado: { alim: 220, vetements: 90, scolaire: 80, loisirs: 90, divers: 70, label: '11-17 ans (collège / lycée)' },
};

const GARDE: Record<string, { cost: number; label: string }> = {
  parent: { cost: 0, label: 'Garde par les parents' },
  am: { cost: 450, label: 'Assistante maternelle (après aides)' },
  creche: { cost: 380, label: 'Crèche municipale (après aides)' },
  centre: { cost: 250, label: 'Centre de loisirs / périscolaire' },
  scolaire: { cost: 0, label: 'Pas de garde (enfant scolarisé)' },
};

const ACTIVITES: Record<string, { cost: number; label: string }> = {
  none: { cost: 0, label: 'Pas d’activité régulière' },
  one: { cost: 35, label: '1 activité régulière (sport, musique…)' },
  many: { cost: 90, label: '2+ activités régulières' },
};

export const coutEnfantMois: Tool = {
  slug: 'cout-enfant-mois',
  category: 'couts',
  h1: 'Coût d’un enfant par mois : combien prévoir ?',
  metaTitle: 'Coût d’un enfant par mois 2026 — budget complet par âge',
  metaDescription:
    'Combien coûte un enfant par mois ? Estimation par âge, mode de garde et activités. Alimentation, vêtements, scolarité, loisirs détaillés.',
  intro:
    'Combien coûte vraiment un enfant chaque mois ? Choisis son âge, son mode de garde et son niveau d’activités : tu obtiens une estimation détaillée poste par poste, basée sur les moyennes INSEE.',
  keywords: ['coût enfant', 'budget famille', 'crèche', 'assistante maternelle', 'éducation', 'INSEE'],
  lastmod: '2026-05-14',
  priority: 0.8,
  schemaType: 'SoftwareApplication',

  tldr: 'Un enfant coûte en moyenne 400 à 950 €/mois en France, selon son âge et le mode de garde. Le poste n°1 chez les 0-3 ans est la garde ; chez les ados, c’est l’alimentation et les loisirs.',

  keyTakeaways: [
    'Coût moyen tout-âge confondu : ~700 €/mois selon les études INSEE (hors logement).',
    'Crèche municipale et assistante maternelle restent le plus gros poste budget chez les 0-3 ans (~400 €/mois après aides CAF).',
    'À partir du collège, alimentation et activités prennent le relais comme premiers postes.',
    'Le coût marginal d’un 2ᵉ ou 3ᵉ enfant est moindre (réutilisation matériel, mutualisation activités).',
  ],

  howTo: [
    {
      name: 'Choisis la tranche d’âge',
      text: 'Les besoins varient fortement : bébé (couches, garde), enfant scolarisé, ado.',
    },
    {
      name: 'Indique le mode de garde principal',
      text: 'Crèche, assistante maternelle, parent à domicile, centre périscolaire — déterminant pour le budget total.',
    },
    {
      name: 'Précise le niveau d’activités',
      text: 'Sport, musique, langues : 1 activité ≈ 30-50 €/mois, plusieurs activités peuvent grimper à 100 €+.',
    },
    {
      name: 'Lis le coût total et la répartition',
      text: 'L’outil détaille le budget mensuel et la part de chaque poste pour t’aider à ajuster.',
    },
  ],

  useCases: [
    {
      title: 'Préparer l’arrivée d’un premier enfant',
      description: 'Anticipe l’impact budgétaire sur ton revenu disponible avant la naissance.',
    },
    {
      title: 'Comparer crèche vs assistante maternelle',
      description: 'Les deux modes ont des coûts différents après aides — projette sur 3 ans pour décider.',
    },
    {
      title: 'Évaluer le coût total d’un enfant sur 18 ans',
      description: 'Multiplie le coût mensuel moyen par 216 mois pour avoir l’enveloppe globale.',
    },
    {
      title: 'Ajuster ton train de vie après la naissance',
      description: 'Vois où tu peux compenser : moins de restos, abonnements, ou plus de revenu côté congé parental.',
    },
  ],

  pitfalls: [
    {
      title: 'Oublier les frais one-shot',
      description: 'Poussette, lit, siège auto, vêtements de naissance : 1 500 à 3 000 € la première année. Pas dans le mensuel mais à prévoir.',
    },
    {
      title: 'Sous-estimer le coût des ados',
      description: 'Téléphone, sorties, vêtements de marque, repas hors-foyer : un ado peut coûter 800-1000 €/mois facilement.',
    },
    {
      title: 'Ne pas intégrer les aides CAF',
      description: 'Allocations familiales, complément libre choix, PAJE… Selon revenus, ces aides couvrent 20 à 50 % du budget chez les 0-3 ans.',
    },
    {
      title: 'Compter le logement deux fois',
      description: 'L’outil n’inclut pas la part loyer/crédit liée à la chambre de l’enfant — souvent invisible mais réelle (50-200 €/mois selon la zone).',
    },
  ],

  sources: [
    {
      label: 'INSEE — Conditions de vie des ménages avec enfants',
      url: 'https://www.insee.fr/fr/statistiques?theme=70',
    },
    {
      label: 'CAF — Aides à la garde d’enfants',
      url: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/vous-etes-enceinte-vous-avez-un-bebe',
    },
    {
      label: 'Service-Public.fr — Aides à la famille',
      url: 'https://www.service-public.fr/particuliers/vosdroits/N31',
    },
  ],

  inputs: [
    {
      id: 'age',
      label: 'Âge de l’enfant',
      type: 'select',
      defaultValue: 'petit',
      options: Object.entries(AGES).map(([value, a]) => ({ value, label: a.label })),
    },
    {
      id: 'garde',
      label: 'Mode de garde principal',
      type: 'select',
      defaultValue: 'scolaire',
      options: Object.entries(GARDE).map(([value, g]) => ({ value, label: g.label })),
    },
    {
      id: 'activites',
      label: 'Activités extrascolaires',
      type: 'select',
      defaultValue: 'one',
      options: Object.entries(ACTIVITES).map(([value, a]) => ({ value, label: a.label })),
    },
  ],

  compute: (values) => {
    const age = AGES[String(values.age)] ?? AGES.petit;
    const garde = GARDE[String(values.garde)] ?? GARDE.scolaire;
    const activites = ACTIVITES[String(values.activites)] ?? ACTIVITES.one;

    const total =
      age.alim + age.vetements + age.scolaire + age.loisirs + age.divers + garde.cost + activites.cost;

    return {
      primary: {
        label: 'Coût total estimé / mois',
        value: total,
        unit: '€',
        formatted: formatEuros(total),
      },
      secondary: [
        { label: 'Alimentation', value: age.alim, unit: '€', formatted: formatEuros(age.alim) },
        { label: 'Vêtements / hygiène', value: age.vetements, unit: '€', formatted: formatEuros(age.vetements) },
        { label: 'Scolarité / fournitures', value: age.scolaire, unit: '€', formatted: formatEuros(age.scolaire) },
        { label: 'Loisirs / sorties', value: age.loisirs, unit: '€', formatted: formatEuros(age.loisirs) },
        { label: 'Divers (santé, transport, cadeaux)', value: age.divers, unit: '€', formatted: formatEuros(age.divers) },
        { label: 'Garde', value: garde.cost, unit: '€', formatted: formatEuros(garde.cost) },
        { label: 'Activités extrascolaires', value: activites.cost, unit: '€', formatted: formatEuros(activites.cost) },
      ],
      notes: [
        'Estimation hors logement (part chambre enfant), hors frais ponctuels (matériel naissance, sortie scolaire annuelle).',
        'Les coûts de garde sont indiqués après aides CAF moyennes — peuvent varier fortement selon ton quotient familial.',
      ],
    };
  },

  explanation: `Le coût d'un enfant varie énormément selon **trois variables principales** : son **âge**, le **mode de garde** retenu (avant la scolarisation), et les **activités** que tu lui finances. Les études INSEE évaluent le coût moyen tout-âge à **environ 700 €/mois**, hors part logement.

**Répartition par âge** :
- **0-3 ans** : la **garde** est le poste n°1 (crèche, assistante maternelle). Une fois les aides CAF déduites, compte 380 à 450 €/mois pour ce seul poste. Alimentation et couches sont modestes en comparaison.
- **4-10 ans** : entrée en maternelle/primaire. La garde passe au périscolaire (~250 €/mois). Apparition des activités extrascolaires.
- **11-17 ans** : explosion de l'alimentation (l'ado mange beaucoup), des vêtements (effet marques) et des loisirs (sorties, téléphone, abonnements).

**Postes négligés mais réels** :
- **Logement** : la chambre supplémentaire coûte en surface louée ou en crédit immobilier (50-200 €/mois selon zone).
- **Mutuelle** : ajouter un ayant droit coûte 15-30 €/mois.
- **Vacances** : un enfant en plus = même séjour, mais billets/repas/parc d'attractions × N.

**Aides CAF disponibles** (selon revenus) :
- Allocations familiales à partir du 2ᵉ enfant (130-160 €/mois).
- Complément libre choix du mode de garde (CMG) : couvre 50-85 % du coût de l'assistante maternelle.
- Allocation de rentrée scolaire (~400 €/an, dès 6 ans).
- Prime à la naissance (~1 000 €), congé parental rémunéré.

**Coût total sur 18 ans** : à 700 €/mois en moyenne, un enfant coûte autour de **150 000 €** entre 0 et 18 ans (hors études supérieures et hors logement). Études supérieures = 5 000 à 30 000 €/an de plus selon le cursus.

Lié : [coût réel d'une voiture par mois](/couts/cout-reel-voiture-mois), [capacité d'emprunt immobilier](/immobilier/capacite-emprunt) (pour la future maison familiale).`,

  examples: {
    columns: [
      { key: 'profile', label: 'Profil' },
      { key: 'garde', label: 'Garde' },
      { key: 'activites', label: 'Activités' },
      { key: 'total', label: 'Coût mensuel' },
    ],
    rows: [
      { profile: 'Bébé 1 an', garde: 'Crèche', activites: 'Aucune', total: '~680 €' },
      { profile: 'Bébé 1 an', garde: 'Parent (congé)', activites: 'Aucune', total: '~300 €' },
      { profile: 'Enfant 7 ans', garde: 'Périscolaire', activites: '1 activité', total: '~635 €' },
      { profile: 'Enfant 7 ans', garde: 'Parent', activites: '2+ activités', total: '~440 €' },
      { profile: 'Ado 14 ans', garde: 'Aucune', activites: '2+ activités', total: '~640 €' },
    ],
  },

  faq: [
    {
      q: 'Combien coûte un enfant par mois en moyenne en France ?',
      a: "Environ 700 €/mois selon les études INSEE, hors part logement. Mais le chiffre varie de 400 € (enfant scolarisé, sans activité, gardé par les parents) à 1 000 € (bébé en crèche en zone tendue + activités).",
    },
    {
      q: 'Quel est le poste le plus cher ?',
      a: "Chez les 0-3 ans : la garde (crèche ou assistante maternelle, 380-450 €/mois après aides). Chez les 4-17 ans : alimentation + loisirs + activités prennent le relais. Le téléphone et les sorties dominent chez les ados.",
    },
    {
      q: 'Les aides CAF couvrent-elles tout ?',
      a: "Non, jamais. Elles couvrent environ 20-50 % du coût total chez les 0-3 ans (mode de garde principalement). À partir de l'école, seules les allocations familiales (à partir du 2ᵉ enfant) et l'allocation de rentrée scolaire restent significatives.",
    },
    {
      q: 'Combien coûte un enfant sur toute sa vie scolaire ?',
      a: "À 700 €/mois sur 18 ans, l'enveloppe atteint environ 150 000 € hors logement et hors études supérieures. Compte 5 000 à 30 000 €/an supplémentaires pour les études supérieures selon le cursus et la ville.",
    },
  ],

  related: ['cout-reel-voiture-mois', 'capacite-emprunt', 'brut-net-cadre'],
};
