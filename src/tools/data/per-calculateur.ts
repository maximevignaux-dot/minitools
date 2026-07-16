import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

function capitalAvecVersements(versementAnnuel: number, rendement: number, annees: number): number {
  if (annees <= 0) return 0;
  if (rendement <= 0) return versementAnnuel * annees;
  return versementAnnuel * ((Math.pow(1 + rendement, annees) - 1) / rendement);
}

export const perCalculateur: Tool = {
  slug: 'simulateur-per',
  category: 'epargne',
  h1: 'Simulateur PER : économie d’impôt et capital retraite',
  metaTitle: 'PER 2026 : simulateur économie d’impôt + capital retraite',
  metaDescription:
    'Simule ton Plan Épargne Retraite : économie d’impôt immédiate selon ta TMI, capital projeté à la retraite, effort net réel. Gratuit, instantané.',
  intro:
    'Combien rapporte vraiment un PER ? Saisis ton versement annuel, ta tranche marginale d’imposition et ta durée jusqu’à la retraite : tu obtiens l’économie d’impôt immédiate, le capital final et ton effort net réel.',
  keywords: ['per', 'plan épargne retraite', 'tmi', 'défiscalisation', 'retraite', 'épargne'],
  lastmod: '2026-05-13',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'À TMI 30 %, 5 000 € versés sur ton PER te font économiser 1 500 € d’impôt dès cette année. Sur 25 ans à 5 %/an, tu accumules ~250 000 €.',

  keyTakeaways: [
    'Le PER déduit tes versements de ton revenu imposable — l’économie immédiate = versement × TMI.',
    'Plafond annuel de déduction : 10 % de tes revenus pros (mini 4 637 €, maxi 37 094 € en 2026).',
    'Au déblocage (retraite ou achat résidence principale), tu paies l’impôt sur la sortie selon ta TMI de l’époque.',
    'L’arbitrage gagnant : TMI élevée aujourd’hui (30 %+) et TMI plus basse à la retraite.',
  ],

  howTo: [
    {
      name: 'Saisis ton versement annuel sur le PER',
      text: 'Le montant que tu prévois de déposer chaque année, dans la limite du plafond de déduction.',
    },
    {
      name: 'Indique ta tranche marginale d’imposition (TMI)',
      text: 'C’est le taux du dernier euro imposé : 11 %, 30 %, 41 % ou 45 % selon ton revenu net imposable.',
    },
    {
      name: 'Précise la durée jusqu’à la retraite',
      text: 'Plus la durée est longue, plus la capitalisation des rendements joue.',
    },
    {
      name: 'Choisis le rendement annuel attendu',
      text: '2-3 % pour un fonds euro, 5-7 % pour un PER géré en unités de compte sur supports actions.',
    },
  ],

  useCases: [
    {
      title: 'Lisser un pic d’imposition',
      description: 'Tu as eu une prime ou un bonus cette année qui te fait passer à la tranche supérieure ? Le PER absorbe l’excédent.',
    },
    {
      title: 'Comparer PER vs assurance-vie',
      description: 'PER = défiscalisation à l’entrée + imposition à la sortie ; assurance-vie = pas de déduction mais liquidité totale.',
    },
    {
      title: 'Préparer ta retraite à 25-30 ans',
      description: 'À horizon 30 ans, l’effet boule de neige + l’économie d’impôt cumulée transforment radicalement le capital final.',
    },
    {
      title: 'Optimiser ta dernière déclaration avant retraite',
      description: 'Verser sur ton PER l’année de tes plus hauts revenus maximise la déduction.',
    },
  ],

  pitfalls: [
    {
      title: 'Oublier l’imposition à la sortie',
      description: 'L’économie d’impôt à l’entrée n’est pas un cadeau définitif. Si ta TMI de sortie est égale à celle d’entrée, l’avantage net devient marginal.',
    },
    {
      title: 'Dépasser le plafond annuel de déduction',
      description: 'Au-delà de 10 % de tes revenus pros (mini 4 637 €, maxi 37 094 €), tu peux verser mais sans avantage fiscal supplémentaire.',
    },
    {
      title: 'Surestimer sa TMI à la retraite',
      description: 'En France, la majorité des retraités sont à TMI 11 % ou moins. Modéliser une TMI 30 % à la sortie peut sous-estimer le gain réel du PER.',
    },
    {
      title: 'Bloquer trop d’épargne',
      description: 'Le PER est illiquide jusqu’à la retraite (sauf 6 cas exceptionnels). Garde toujours une épargne de précaution accessible en parallèle.',
    },
  ],

  sources: [
    {
      label: 'impots.gouv.fr — Plan d’Épargne Retraite',
      url: 'https://www.impots.gouv.fr/particulier/le-plan-depargne-retraite',
    },
    {
      label: 'Service-Public.fr — PER individuel',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F34982',
    },
    {
      label: 'AMF — Plan Épargne Retraite',
      url: 'https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/per',
    },
  ],

  inputs: [
    {
      id: 'versement',
      label: 'Versement annuel sur ton PER',
      type: 'number',
      unit: '€ / an',
      defaultValue: 5000,
      min: 0,
      step: 500,
    },
    {
      id: 'tmi',
      label: 'Ta TMI actuelle',
      type: 'select',
      defaultValue: '30',
      options: [
        { value: '0', label: '0 % — non imposable' },
        { value: '11', label: '11 % — revenus modestes' },
        { value: '30', label: '30 % — revenus moyens' },
        { value: '41', label: '41 % — revenus aisés' },
        { value: '45', label: '45 % — très hauts revenus' },
      ],
    },
    {
      id: 'duree',
      label: 'Années jusqu’à la retraite',
      type: 'number',
      unit: 'ans',
      defaultValue: 25,
      min: 1,
      max: 45,
      step: 1,
    },
    {
      id: 'rendement',
      label: 'Rendement annuel attendu',
      type: 'number',
      unit: '%',
      defaultValue: 5,
      min: 0,
      max: 12,
      step: 0.1,
      help: '2-3 % en fonds euro, 5-7 % en gestion UC actions long terme.',
    },
    {
      id: 'tmiRetraite',
      label: 'TMI estimée à la retraite',
      type: 'select',
      defaultValue: '11',
      options: [
        { value: '0', label: '0 % — pension faible' },
        { value: '11', label: '11 % — pension modeste' },
        { value: '30', label: '30 % — pension élevée' },
      ],
    },
  ],

  compute: (values) => {
    const versement = Math.max(0, Number(values.versement) || 0);
    const tmi = (Number(values.tmi) || 0) / 100;
    const duree = Math.max(1, Number(values.duree) || 25);
    const rendement = (Number(values.rendement) || 0) / 100;
    const tmiRetraite = (Number(values.tmiRetraite) || 0) / 100;

    const economieAn = versement * tmi;
    const economieCumul = economieAn * duree;
    const totalVerse = versement * duree;
    const effortNetAn = versement - economieAn;
    const effortNetCumul = effortNetAn * duree;
    const capitalFinal = capitalAvecVersements(versement, rendement, duree);
    const impotSortie = capitalFinal * tmiRetraite;
    const capitalNet = capitalFinal - impotSortie;
    const gainNet = capitalNet - effortNetCumul;

    return {
      primary: {
        label: 'Capital final brut à la retraite',
        value: capitalFinal,
        unit: '€',
        formatted: formatEuros(capitalFinal),
      },
      secondary: [
        { label: 'Économie d’impôt / an', value: economieAn, unit: '€', formatted: formatEuros(economieAn) },
        { label: 'Économie d’impôt cumulée', value: economieCumul, unit: '€', formatted: formatEuros(economieCumul) },
        { label: 'Total versé', value: totalVerse, unit: '€', formatted: formatEuros(totalVerse) },
        { label: 'Effort net annuel (versement − économie)', value: effortNetAn, unit: '€', formatted: formatEuros(effortNetAn) },
        { label: 'Effort net cumulé', value: effortNetCumul, unit: '€', formatted: formatEuros(effortNetCumul) },
        { label: 'Impôt à la sortie (TMI retraite)', value: impotSortie, unit: '€', formatted: formatEuros(impotSortie) },
        { label: 'Capital net après impôt sortie', value: capitalNet, unit: '€', formatted: formatEuros(capitalNet) },
        { label: 'Gain net sur l’effort réel', value: gainNet, unit: '€', formatted: formatEuros(gainNet) },
        { label: 'Rendement net du dispositif', value: effortNetCumul > 0 ? gainNet / effortNetCumul : 0, unit: '%', formatted: formatPercent(effortNetCumul > 0 ? gainNet / effortNetCumul : 0) },
      ],
      notes: [
        'Modélisation simplifiée : versement annuel constant en début d’année, rendement net de frais constant, sortie en capital unique.',
        'Hors prélèvements sociaux (17,2 %) sur les plus-values à la sortie. Sortie en rente non modélisée ici.',
      ],
    };
  },

  explanation: `Le **PER (Plan Épargne Retraite)** est un placement long terme avec **avantage fiscal à l'entrée** : tes versements sont déduits de ton revenu imposable.

**Le mécanisme** :
1. Tu verses **V €** sur ton PER → économie d'impôt immédiate = V × TMI.
2. Le capital fructifie pendant **N années** au rendement choisi.
3. À la retraite (ou achat résidence principale), tu débloques le capital.
4. Le capital est imposé selon ta **TMI de sortie** (le plus souvent plus basse qu'à l'entrée).

**Plafonds 2026** :
- 10 % de tes revenus pros nets de l'année N-1, avec un mini de 4 637 € et un maxi de 37 094 €.
- Pour un travailleur indépendant : 10 % du bénéfice imposable + 15 % de la part > PASS, plafond ~85 000 €.

**Exemple** — TMI 30 %, 5 000 € versés/an pendant 25 ans à 5 % :
- Économie d'impôt annuelle : 1 500 € → **effort net réel : 3 500 €/an**
- Total versé : 125 000 € ; économie cumulée : 37 500 €
- Capital final brut : ~250 000 €
- Impôt sortie à TMI 11 % : ~27 500 €
- **Capital net : ~222 500 €** pour un effort cumulé de 87 500 €

**À qui le PER convient le mieux** :
- Tu es à TMI 30 %+ aujourd'hui
- Tu anticipes une TMI plus basse à la retraite
- Tu acceptes de **bloquer** ton épargne jusqu'à la retraite (sauf accidents de la vie ou achat résidence principale)`,

  examples: {
    columns: [
      { key: 'tmi', label: 'TMI actuelle' },
      { key: 'versement', label: 'Versement / an' },
      { key: 'economie', label: 'Économie d’impôt / an' },
      { key: 'effort', label: 'Effort net / an' },
    ],
    rows: [
      { tmi: '11 %', versement: '5 000 €', economie: '550 €', effort: '4 450 €' },
      { tmi: '30 %', versement: '5 000 €', economie: '1 500 €', effort: '3 500 €' },
      { tmi: '41 %', versement: '5 000 €', economie: '2 050 €', effort: '2 950 €' },
      { tmi: '45 %', versement: '5 000 €', economie: '2 250 €', effort: '2 750 €' },
      { tmi: '41 %', versement: '10 000 €', economie: '4 100 €', effort: '5 900 €' },
    ],
  },

  faq: [
    {
      q: 'Combien d’impôt vais-je économiser avec un PER ?',
      a: "Économie immédiate = versement × ta TMI. Exemple : à TMI 30 % et 5 000 € versés, tu économises 1 500 € d'impôt dès l'année du versement.",
    },
    {
      q: 'Peut-on sortir l’argent du PER avant la retraite ?',
      a: "Oui mais seulement dans 6 cas : achat de la résidence principale, décès du conjoint, invalidité, fin de droits chômage, surendettement, liquidation judiciaire d'activité indépendante.",
    },
    {
      q: 'PER ou assurance-vie : que choisir ?',
      a: "Le PER si tu cherches à réduire ton impôt aujourd'hui et que tu acceptes le blocage. L'assurance-vie si tu veux garder la liquidité et préparer la transmission. Beaucoup d'épargnants combinent les deux.",
    },
    {
      q: 'Comment est imposée la sortie en capital du PER ?',
      a: "Le capital est divisé en deux : la part correspondant aux versements est imposée à ta TMI du moment ; la part correspondant aux plus-values est taxée au PFU 30 % (12,8 % IR + 17,2 % PS).",
    },
  ],

  related: ['calcul-interets-composes', 'salaire-brut-net', 'auto-entrepreneur-brut-net'],
};
