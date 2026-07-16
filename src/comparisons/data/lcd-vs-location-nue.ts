import type { Comparison } from '@/types/comparison';

export const lcdVsLocationNue: Comparison = {
  slug: 'location-courte-duree-vs-location-nue',
  h1: 'Location courte durée (Airbnb) ou location nue : que choisir ?',
  metaTitle: 'Airbnb vs location nue 2026 — comparatif rentabilité et fiscalité',
  metaDescription:
    'Location courte durée (Airbnb, Booking) ou location nue longue durée : rendement, charges, fiscalité, réglementation. Comparatif complet 2026.',
  intro:
    'Tu hésites entre louer ton bien sur Airbnb ou en classique longue durée ? Sur le papier, la LCD rapporte plus, mais le diable se cache dans les charges, la vacance et la réglementation locale. Comparatif chiffré et honnête.',
  tldr:
    'La LCD vise 8-15 % de rendement brut vs 4-6 % en location nue, mais les charges (ménage, plateforme, vacance) la ramènent souvent à un net 2-3× moindre. Sa fiscalité LMNP au réel est excellente — sa contrainte temps et réglementaire est la vraie barrière.',
  keywords: ['location courte durée', 'airbnb', 'location nue', 'lmnp', 'rentabilité', 'immobilier locatif'],
  lastmod: '2026-05-14',

  optionA: {
    name: 'Location courte durée (LCD)',
    shortName: 'LCD',
    tagline: 'Airbnb, Booking — locations à la nuitée pour touristes',
    pros: [
      'Rendement brut 2× plus élevé en zones touristiques (8-15 %)',
      'Tarification dynamique : tu adaptes les prix à la demande',
      'Possibilité de bloquer des dates pour toi-même',
      'Fiscalité LMNP au réel = amortissement = 0 € d’impôt pendant ~10 ans',
      'Sortie facile si le marché se retourne (revente, switch en LD)',
    ],
    cons: [
      'Très chronophage : check-in, ménage, communication, maintenance permanente',
      'Plateforme Airbnb : 14-18 % de commission',
      'Ménage 60-90 €/séjour à provisionner',
      'Réglementation locale stricte (plafond 120 nuits/an à Paris pour résidence principale)',
      'Saisonnalité : vacance hivernale en zone non-tendue',
      'Usure du bien plus rapide (mobilier, sanitaires)',
    ],
  },

  optionB: {
    name: 'Location nue longue durée',
    shortName: 'LD',
    tagline: 'Bail classique 3 ou 6 ans, locataire stable',
    pros: [
      'Quasi 0 effort : un locataire, un loyer mensuel, peu d’interactions',
      'Revenu prévisible et stable, idéal pour calculer une mensualité d’emprunt',
      'Aucune contrainte de réglementation locale (sauf encadrement loyers en zones tendues)',
      'Moins d’usure du bien (rotation rare)',
      'Gestion locative externe abordable (~6-8 %/an)',
    ],
    cons: [
      'Rendement brut limité à 4-6 % en moyenne (3-4 % en grandes villes)',
      'Fiscalité moins favorable : revenus fonciers imposés à la TMI + 17,2 % PS',
      'Risque locataire : impayés, dégradations, contentieux longs',
      'Préavis locataire court (1 mois en zone tendue, 3 mois ailleurs)',
      'Plafonnement annuel du loyer (IRL) — pas d’ajustement rapide',
    ],
  },

  rows: [
    { criterion: 'Rendement brut', a: '8-15 %', b: '4-6 %', winner: 'a' },
    { criterion: 'Rendement net (après charges)', a: '4-8 %', b: '3-5 %', winner: 'a' },
    { criterion: 'Temps consacré', a: '5-15 h/semaine', b: '<1 h/mois', winner: 'b' },
    { criterion: 'Frais plateforme', a: '14-18 % Airbnb', b: '0 %', winner: 'b' },
    { criterion: 'Coût ménage', a: '60-90 €/séjour', b: '0 €', winner: 'b' },
    { criterion: 'Fiscalité (LMNP au réel)', a: 'Amortissement → 0 € impôt ~10 ans', b: 'Revenus fonciers TMI + 17,2 % PS', winner: 'a' },
    { criterion: 'Stabilité du revenu', a: 'Variable (saisonnalité)', b: 'Constant', winner: 'b' },
    { criterion: 'Risque impayé', a: 'Faible (paiement avant séjour)', b: 'Réel (impayés possibles)', winner: 'a' },
    { criterion: 'Usure du bien', a: 'Rapide', b: 'Lente', winner: 'b' },
    { criterion: 'Réglementation locale', a: 'Stricte (plafond 120 nuits Paris)', b: 'Légère (encadrement loyers en zones tendues)', winner: 'b' },
    { criterion: 'Liquidité (sortie)', a: 'Vente facile, mobilier inclus', b: 'Vente avec locataire en place', winner: 'a' },
    { criterion: 'Volume d’investissement', a: 'Adapté aux petites surfaces', b: 'Adapté à toutes surfaces', winner: 'tie' },
  ],

  whenA: [
    'Tu possèdes un bien en zone très touristique (centre ville historique, mer, montagne).',
    'Tu acceptes de t’investir 5-15 h/semaine ou tu paies une conciergerie (~25 % du chiffre).',
    'Tu vises l’optimisation fiscale via LMNP au réel + amortissement.',
    'Ta ville n’interdit pas (ou peu) la location touristique.',
    'Tu disposes d’un bien petit (studio/T2) facile à entretenir.',
  ],

  whenB: [
    'Tu veux du revenu passif sans gestion.',
    'Ton bien est en zone résidentielle, hors zones touristiques.',
    'Tu vises la sécurité d’un revenu mensuel constant pour rembourser un prêt.',
    'Tu n’as pas le temps ou l’envie de gérer la rotation des locataires courts.',
    'Tu cibles les grandes surfaces (T3+) qui se louent mal en LCD.',
  ],

  verdict:
    'La LCD reste rentable en 2026 mais uniquement dans 3 conditions cumulées : (1) emplacement très touristique, (2) petite surface facile à gérer, (3) acceptation du temps consacré ou délégation à une conciergerie. Hors de ces conditions, la location nue gagne sur le temps consacré, la stabilité et la simplicité fiscale. La LCD peut aussi être un pont temporaire (3-5 ans) avant de basculer en location nue ou de revendre.',

  faq: [
    {
      q: 'Airbnb est-il vraiment plus rentable que la location classique ?',
      a: "En rendement brut souvent oui (8-15 % vs 4-6 %), mais en net l'écart se réduit fortement après ménage (60-90 €/séjour), commission plateforme (~15 %), vacance et fiscalité. La LCD reste plus rentable dans les zones très touristiques avec petits biens, mais l'écart est mince ailleurs.",
    },
    {
      q: 'Quelle réglementation pour la LCD en 2026 ?',
      a: "Plafond de 120 nuits/an pour la location de la résidence principale dans les villes >200k habitants et zones tendues (Paris, Lyon, Bordeaux, Annecy...). Pour les résidences secondaires : changement d'usage souvent obligatoire en mairie, parfois avec compensation. Vérifier impérativement avant d'acheter pour LCD.",
    },
    {
      q: 'Quel statut fiscal choisir : LMNP micro-BIC ou réel ?',
      a: "Micro-BIC : abattement 50 % (71 % en meublé de tourisme classé). Réel : déduction de tous les frais + amortissement du bien (~3 %/an) + amortissement mobilier. Le réel est souvent plus avantageux dès 20 000 € de loyers ou si tu as des frais significatifs.",
    },
    {
      q: 'Peut-on changer de la LCD vers la location nue ?',
      a: "Oui, à tout moment si tu n'as pas de locataire en place. Tu perds le statut LMNP au réel (amortissement) — donc anticipe la fiscalité de la basculement. Solution courante : LCD pendant 5-7 ans (phase d'amortissement) puis passage en LD plus tranquille.",
    },
  ],

  related: ['rentabilite-airbnb', 'capacite-emprunt', 'frais-de-notaire'],
};
