import type { Comparison } from '@/types/comparison';

export const autoEntrepreneurVsSasu: Comparison = {
  slug: 'auto-entrepreneur-vs-sasu',
  h1: 'Auto-entrepreneur ou SASU : que choisir en 2026 ?',
  metaTitle: 'Auto-entrepreneur vs SASU 2026 — comparatif complet',
  metaDescription:
    'Auto-entrepreneur ou SASU : statut, charges, fiscalité, plafonds, protection sociale. Comparatif détaillé pour choisir en 2026.',
  intro:
    'Tu lances ton activité indépendante mais tu hésites entre auto-entrepreneur et SASU ? Voici un comparatif honnête et chiffré des deux statuts, avec leurs avantages, leurs limites et les seuils où basculer de l’un à l’autre devient pertinent.',
  tldr:
    'L’auto-entrepreneur reste imbattable jusqu’à ~50 k€ de CA pour sa simplicité et son cash-flow immédiat. La SASU devient plus rentable au-delà, grâce à la déduction des frais réels, au choix dividendes/salaire et à une meilleure protection sociale.',
  keywords: ['auto-entrepreneur', 'sasu', 'comparatif', 'statut juridique', 'micro-entreprise', 'créer son entreprise'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'Auto-entrepreneur',
    shortName: 'AE',
    tagline: 'Simplicité administrative et fiscale, plafonds de CA',
    pros: [
      'Création en 10 minutes, gratuite, 100 % en ligne',
      'Pas de TVA en dessous de 39 100 € (services) ou 91 900 € (vente)',
      'Cotisations sociales sur CA encaissé uniquement (rien de dû en cas de mois sans CA)',
      'Comptabilité ultra-simplifiée (cahier de recettes)',
      'Versement libératoire possible (IR forfaitaire à la source)',
    ],
    cons: [
      'Plafonds de CA : 77 700 € (services) / 188 700 € (vente)',
      'Aucune déduction de frais : tu cotises sur le CA brut, pas sur ton bénéfice',
      'Protection sociale faible (pas de chômage, retraite limitée)',
      'Image moins "pro" pour les grandes entreprises clientes',
      'Pas de dissociation patrimoine pro / perso (responsabilité)',
    ],
  },

  optionB: {
    name: 'SASU',
    shortName: 'SASU',
    tagline: 'Société à dirigeant unique, choix dividendes/salaire',
    pros: [
      'Aucun plafond de CA, scalable à l’infini',
      'Déduction de tous les frais réels (logiciels, matériel, coworking, formation, voiture pro)',
      'Choix dividendes vs salaire pour optimiser fiscalement',
      'Couverture sociale du régime général (régime assimilé salarié)',
      'Patrimoine personnel protégé (responsabilité limitée aux apports)',
      'Image plus crédible pour les grands comptes B2B',
    ],
    cons: [
      'Création plus longue et coûteuse (~300-1500 € avec un expert-comptable)',
      'Comptabilité obligatoire (bilan + compte de résultat)',
      'Cotisations sociales lourdes : ~45 % du salaire net',
      'Pas de droits chômage Pôle emploi sur la rémunération de dirigeant',
      'CFE + frais bancaire pro + assurance RC pro : ~150-300 €/mois fixes',
    ],
  },

  rows: [
    { criterion: 'Plafond de CA', a: '77 700 € (services) / 188 700 € (vente)', b: 'Aucun', winner: 'b' },
    { criterion: 'Cotisations sociales', a: '21,2 % du CA (services)', b: '~45 % du salaire net', winner: 'a' },
    { criterion: 'Impôt sur le revenu', a: 'Sur CA × abattement (34 % BNC, 50 % BIC service, 71 % vente)', b: 'IS 15 % puis 25 % + flat tax 30 % sur dividendes', winner: 'tie' },
    { criterion: 'Déduction des frais', a: 'Aucune', b: 'Tous les frais professionnels', winner: 'b' },
    { criterion: 'TVA', a: 'Franchise en base jusqu’aux seuils', b: 'Obligatoire dès 1 € de CA', winner: 'a' },
    { criterion: 'Création', a: 'Gratuit, 10 min en ligne', b: '~300-1500 €, 2-4 semaines', winner: 'a' },
    { criterion: 'Comptabilité', a: 'Cahier de recettes', b: 'Bilan + compte de résultat + AG annuelle', winner: 'a' },
    { criterion: 'Protection sociale', a: 'Faible (sécurité sociale indépendants)', b: 'Régime général (sauf chômage)', winner: 'b' },
    { criterion: 'Droits chômage', a: 'Non (sauf ARE conservée à l’entrée)', b: 'Non sur rémunération dirigeant', winner: 'tie' },
    { criterion: 'Responsabilité', a: 'Personnelle (sauf déclaration insaisissabilité)', b: 'Limitée au capital social', winner: 'b' },
    { criterion: 'Image B2B', a: 'OK pour PME et particuliers', b: 'Crédible pour grands comptes', winner: 'b' },
    { criterion: 'Coûts fixes annuels', a: 'CFE ~300-1 500 € + mutuelle', b: 'CFE + compta + banque pro : ~2 000-4 000 €', winner: 'a' },
  ],

  whenA: [
    'Tu démarres et tu ne sais pas si ton activité va marcher — pas de risque à tester.',
    'Ton CA prévisionnel est sous 50 k€ pour les services ou sous 100 k€ en vente.',
    'Tu as peu de frais pros (pas de bureaux, peu d’équipement à amortir).',
    'Tu veux du cash immédiat sur ton compte sans complexité.',
    'Tes clients sont des particuliers ou des PME qui acceptent la franchise de TVA.',
  ],

  whenB: [
    'Tu vises >70 k€ de CA dès la 1ère année.',
    'Tu as des frais pros importants (matériel, locaux, voiture, freelances sous-traitants).',
    'Tu cibles des grands comptes B2B qui exigent une "vraie" société.',
    'Tu veux optimiser fiscalement via le choix dividendes/salaire.',
    'Tu veux protéger ton patrimoine personnel des risques pros.',
  ],

  verdict:
    'Commence en auto-entrepreneur, c’est le meilleur cocon pour valider ton activité. Bascule en SASU quand tu approches des plafonds de CA, quand tes frais réels dépassent 25 % de ton CA, ou quand des clients B2B exigent une vraie société. Tu peux conserver les deux structures en parallèle si tu as plusieurs activités distinctes.',

  faq: [
    {
      q: 'À partir de quel CA faut-il quitter l’auto-entrepreneur ?',
      a: "Trois signaux : (1) tu approches les plafonds (77 700 € services, 188 700 € vente), (2) tes frais pros dépassent 25-30 % de ton CA et tu paies trop de cotisations sur un CA qui n'est pas du bénéfice, (3) tes clients B2B refusent ton statut.",
    },
    {
      q: 'Peut-on cumuler auto-entrepreneur et SASU ?',
      a: "Oui, si les activités sont distinctes. Exemple : freelance dev en AE + activité de conseil en SASU. Attention à bien séparer les comptes bancaires et la facturation pour éviter tout flou.",
    },
    {
      q: 'La SASU permet-elle vraiment d’économiser des impôts ?',
      a: "Possible mais pas automatique. La SASU permet d'arbitrer entre salaire (cotisations sociales lourdes mais protection) et dividendes (flat tax 30 % et moins de cotisations). L'optimum dépend de ton TMI personnel, ta TVA déductible et tes besoins de protection sociale.",
    },
    {
      q: 'Quel est le statut pour avoir des droits chômage ?',
      a: "Aucun des deux ne te donne automatiquement droit au chômage. En AE, tu peux conserver l'ARE (allocation chômage) à l'entrée si tu étais salarié. En SASU dirigeant, tu n'as aucun droit chômage sur ta rémunération de dirigeant — sauf assurance privée type GSC.",
    },
  ],

  related: ['auto-entrepreneur-brut-net', 'combien-je-gagne-freelance', 'calcul-tva'],
};
