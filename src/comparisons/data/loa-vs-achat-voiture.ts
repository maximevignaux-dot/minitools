import type { Comparison } from '@/types/comparison';

export const loaVsAchatVoiture: Comparison = {
  slug: 'loa-vs-achat-voiture',
  h1: 'LOA ou achat comptant : que choisir pour ta voiture ?',
  metaTitle: 'LOA vs achat voiture 2026 — comparatif coût et flexibilité',
  metaDescription:
    'LOA (location avec option d’achat) ou achat comptant : coût total, flexibilité, fiscalité, sortie. Comparatif chiffré pour choisir en 2026.',
  intro:
    'Tu hésites entre acheter ta voiture ou la prendre en LOA ? Le loyer mensuel paraît attractif, mais le calcul du coût total réserve des surprises. Comparatif honnête pour choisir selon ton usage réel.',
  tldr:
    'L’achat comptant est moins cher si tu gardes la voiture >7 ans. La LOA est intéressante si tu changes souvent de véhicule (3-4 ans), veux du neuf garanti sans souci, ou ne peux pas mobiliser le capital d’achat.',
  keywords: ['loa', 'achat voiture', 'comparatif', 'location avec option d’achat', 'leasing', 'lld'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'Achat comptant',
    shortName: 'Achat',
    tagline: 'Tu paies la voiture entière, tu en es propriétaire',
    pros: [
      'Coût total inférieur sur le long terme (pas de marge plateforme)',
      'Aucune limite de kilométrage',
      'Liberté totale de modification et de revente',
      'Pas d’engagement contractuel — tu peux revendre dès le lendemain',
      'Bien tangible qui se valorise dans ton patrimoine',
    ],
    cons: [
      'Capital immobilisé (15 000-50 000 € selon véhicule)',
      'Tu subis la dépréciation (15-25 % la 1ère année)',
      'Maintenance et révisions à ta charge intégrale',
      'Tu gères toi-même la revente quand vient le moment',
      'Investissement risqué si le marché de l’occasion s’effondre',
    ],
  },

  optionB: {
    name: 'LOA (Location avec Option d’Achat)',
    shortName: 'LOA',
    tagline: 'Tu loues le véhicule sur 3-5 ans avec option d’achat finale',
    pros: [
      'Mensualité prévisible (350-700 € selon modèle)',
      'Pas d’apport ou apport modéré (0-15 % du prix)',
      'Entretien et garantie souvent inclus dans le contrat',
      'Tu changes de voiture tous les 3-4 ans (toujours du neuf)',
      'Tu peux restituer en fin de contrat — pas besoin de revendre',
    ],
    cons: [
      'Coût total 20-40 % plus cher que l’achat comptant sur la durée du contrat',
      'Kilométrage limité contractuel (10-30 k km/an) — pénalités au-delà',
      'Engagement ferme : difficile et coûteux de sortir avant terme',
      'État du véhicule scruté à la restitution (rayures, intérieur)',
      'Levée de l’option = paiement d’un solde élevé (30-50 % du prix neuf)',
    ],
  },

  rows: [
    { criterion: 'Apport initial', a: 'Prix total du véhicule', b: '0 à 15 % du prix', winner: 'b' },
    { criterion: 'Mensualité', a: '0 € (ou crédit auto)', b: '350-700 €/mois', winner: 'a' },
    { criterion: 'Coût total sur 5 ans', a: 'Prix achat − valeur revente', b: 'Loyers + restitution OU option', winner: 'a' },
    { criterion: 'Kilométrage', a: 'Illimité', b: '10-30 k km/an, pénalités au-delà', winner: 'a' },
    { criterion: 'Engagement', a: 'Aucun (revente libre)', b: 'Contrat ferme 3-5 ans', winner: 'a' },
    { criterion: 'Entretien', a: 'À ta charge', b: 'Souvent inclus (formules tout inclus)', winner: 'b' },
    { criterion: 'Changement de voiture', a: 'Tu gères la revente', b: 'Tu restitues, tu reprends un autre', winner: 'b' },
    { criterion: 'Dépréciation', a: 'Tu la subis', b: 'Portée par le loueur (mais payée dans les loyers)', winner: 'tie' },
    { criterion: 'Capital mobilisé', a: 'Élevé (prix complet)', b: 'Faible (apport + loyers)', winner: 'b' },
    { criterion: 'Avantage fiscal pro', a: 'Amortissement comptable', b: 'Loyers déductibles intégralement', winner: 'b' },
    { criterion: 'Idéal kilométrage', a: '>20 000 km/an', b: '<15 000 km/an', winner: 'tie' },
    { criterion: 'Idéal durée détention', a: '>7 ans', b: '3-4 ans', winner: 'tie' },
  ],

  whenA: [
    'Tu prévois de garder la voiture plus de 6-7 ans (l’amortissement devient favorable).',
    'Tu fais beaucoup de kilomètres (>15 000 km/an) — les pénalités LOA seraient prohibitives.',
    'Tu as le capital disponible (ou un crédit auto à taux bas).',
    'Tu veux la liberté totale de modifier, customiser, revendre quand tu veux.',
    'Tu acceptes la responsabilité de la revente et de l’entretien.',
  ],

  whenB: [
    'Tu veux changer de voiture tous les 3-4 ans pour rouler en neuf.',
    'Tu préfères une mensualité fixe à un gros déboursé initial.',
    'Ton kilométrage est modéré (<15 000 km/an).',
    'Tu veux déléguer entretien et revente (formule LOA tout inclus).',
    'Tu utilises la voiture pour ton activité pro et préfères déduire des loyers plutôt qu’amortir.',
  ],

  verdict:
    'Pour un usage personnel classique et un véhicule gardé longtemps, l’achat reste la solution la plus économique sur la durée — surtout si tu peux acheter sans crédit. La LOA brille pour les profils "rouleurs neufs" (changement tous les 3-4 ans), les pros qui veulent déduire fiscalement, et ceux qui ne veulent pas immobiliser leur épargne. À éviter si tu fais beaucoup de kilomètres ou si tu n’es pas sûr de ta capacité à honorer le contrat sur toute sa durée.',

  faq: [
    {
      q: 'La LOA est-elle vraiment plus chère que l’achat ?',
      a: "Sur la durée totale du contrat (3-5 ans), oui : la LOA inclut une marge plateforme et les frais financiers. L'écart est typiquement de 20-40 % plus cher qu'un achat équivalent. Mais ce n'est pas le seul critère : la flexibilité, l'absence d'immobilisation de capital et l'entretien inclus comptent aussi.",
    },
    {
      q: 'Que se passe-t-il en fin de contrat LOA ?',
      a: "Tu as 3 choix : (1) lever l'option d'achat et garder la voiture (paiement du solde, souvent 30-50 % du prix neuf), (2) restituer la voiture au loueur (vérification de l'état, possibles frais de remise en état), (3) signer un nouveau contrat LOA sur un nouveau véhicule.",
    },
    {
      q: 'LOA, LLD ou crédit auto : quelle différence ?',
      a: "LOA = location avec option d'achat à la fin (engagement 3-5 ans, mensualité modérée). LLD = location longue durée sans option d'achat (tu restitues obligatoirement). Crédit auto = tu deviens propriétaire dès le 1er jour, tu rembourses un capital + intérêts. Le crédit auto est souvent moins cher que la LOA pour un usage long.",
    },
    {
      q: 'La LOA est-elle intéressante pour les freelances ?',
      a: "Oui en SASU/EURL : les loyers sont intégralement déductibles du résultat. C'est plus simple comptablement que d'amortir une voiture sur 5 ans. Pour un auto-entrepreneur, l'avantage disparaît (pas de déduction de frais réels en micro).",
    },
  ],

  related: ['cout-reel-voiture-mois', 'calcul-mensualite-pret', 'frais-kilometriques'],
};
