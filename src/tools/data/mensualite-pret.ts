import type { Tool } from '@/types/tool';
import { formatEuros, formatPercent } from '@/lib/format';

function mensualiteCapital(capital: number, tauxAnnuel: number, dureeAnnees: number): number {
  const r = tauxAnnuel / 12;
  const n = dureeAnnees * 12;
  if (n <= 0) return 0;
  if (r <= 0) return capital / n;
  return (capital * r) / (1 - Math.pow(1 + r, -n));
}

export const mensualitePret: Tool = {
  slug: 'calcul-mensualite-pret',
  category: 'immobilier',
  h1: 'Calcul de mensualité de prêt immobilier',
  metaTitle: 'Calcul mensualité prêt immobilier 2026 — outil instantané',
  metaDescription:
    'Calcule ta mensualité de prêt immobilier selon le capital, le taux, la durée et l’assurance. Coût total du crédit et part des intérêts inclus.',
  intro:
    'Quelle mensualité prévoir pour ton prêt immobilier ? Saisis le capital emprunté, le taux d’intérêt, la durée et le taux d’assurance : tu obtiens ta mensualité totale et le coût complet du crédit.',
  keywords: ['mensualité prêt', 'crédit immobilier', 'taux', 'assurance emprunteur', 'coût crédit'],
  lastmod: '2026-05-12',
  priority: 0.85,
  schemaType: 'SoftwareApplication',

  tldr: 'À 3,5 % sur 25 ans, 200 000 € empruntés donnent ~1 000 €/mois (hors assurance). L’assurance ajoute typiquement 50 à 100 €/mois selon ton profil.',

  keyTakeaways: [
    'Formule : mensualité = capital × (taux/12) ÷ (1 − (1 + taux/12)^−(durée×12)).',
    'Sur 20 vs 25 ans : ta mensualité baisse mais le coût total grimpe de ~15 à 25 %.',
    'L’assurance emprunteur représente 0,1 à 0,5 % du capital par an selon âge et état de santé.',
    'En 2026, la délégation d’assurance peut faire économiser plusieurs milliers d’euros vs l’assurance groupe banque.',
  ],

  howTo: [
    {
      name: 'Saisis le capital emprunté',
      text: 'Le montant emprunté hors apport (prix du bien + frais de notaire − apport personnel).',
    },
    {
      name: 'Indique le taux d’intérêt nominal',
      text: 'Le TAEG hors assurance, négocié avec la banque ou trouvé sur un baromètre courtier.',
    },
    {
      name: 'Choisis la durée du prêt',
      text: 'En années, 15 à 25 ans typique (25 ans plafond HCSF hors VEFA).',
    },
    {
      name: 'Ajoute le taux d’assurance emprunteur',
      text: 'En % annuel du capital. Compte 0,3 à 0,5 % pour un emprunteur jeune et en bonne santé.',
    },
  ],

  useCases: [
    {
      title: 'Vérifier l’offre de ta banque',
      description: 'Recalcule la mensualité affichée pour valider qu’elle correspond bien au capital + taux + durée.',
    },
    {
      title: 'Comparer plusieurs durées',
      description: 'Simule 20 vs 25 ans pour voir l’impact sur ta mensualité et le coût total du crédit.',
    },
    {
      title: 'Évaluer une délégation d’assurance',
      description: 'Compare l’assurance groupe banque vs une délégation externe en chiffrant l’économie sur la durée.',
    },
    {
      title: 'Tester un remboursement anticipé',
      description: 'Visualise comment réduire ton capital initial baisse fortement la mensualité ou la durée.',
    },
  ],

  pitfalls: [
    {
      title: 'Oublier l’assurance dans la mensualité totale',
      description: 'À 0,3-0,5 %/an du capital, l’assurance peut représenter 50-100 €/mois. Toujours additionner pour le vrai effort budgétaire.',
    },
    {
      title: 'Ignorer les frais de dossier et de garantie',
      description: 'Frais de dossier (~1 000 €) et caution Crédit Logement (~1,5 % du capital) viennent en plus — provisionne-les.',
    },
    {
      title: 'Sous-estimer le coût total des intérêts sur 25 ans',
      description: 'Sur un prêt de 200 000 € à 3,5 % sur 25 ans, le coût total des intérêts approche 100 000 € — soit 50 % du capital emprunté.',
    },
    {
      title: 'Confondre TAEG et taux nominal',
      description: 'Le TAEG inclut assurance + frais. C’est le seul taux à comparer entre offres bancaires. Le taux nominal seul peut induire en erreur.',
    },
  ],

  sources: [
    {
      label: 'Service-Public.fr — Crédit immobilier',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F2453',
    },
    {
      label: 'Banque de France — Taux d’usure',
      url: 'https://www.banque-france.fr/statistiques/taux-et-cours/taux-dusure',
    },
    {
      label: 'ACPR — Assurance emprunteur',
      url: 'https://acpr.banque-france.fr/grands-dossiers/protection-de-la-clientele/lassurance-emprunteur',
    },
  ],

  inputs: [
    {
      id: 'capital',
      label: 'Capital emprunté',
      type: 'number',
      unit: '€',
      defaultValue: 200000,
      min: 0,
      step: 5000,
    },
    {
      id: 'taux',
      label: 'Taux d’intérêt annuel',
      type: 'number',
      unit: '%',
      defaultValue: 3.5,
      min: 0,
      max: 15,
      step: 0.05,
    },
    {
      id: 'duree',
      label: 'Durée',
      type: 'select',
      defaultValue: '25',
      options: [
        { value: '10', label: '10 ans' },
        { value: '15', label: '15 ans' },
        { value: '20', label: '20 ans' },
        { value: '25', label: '25 ans' },
        { value: '27', label: '27 ans (VEFA)' },
      ],
    },
    {
      id: 'assurance',
      label: 'Taux d’assurance emprunteur',
      type: 'number',
      unit: '%',
      defaultValue: 0.34,
      min: 0,
      max: 2,
      step: 0.01,
      help: 'Taux annuel appliqué sur le capital initial. 0,1-0,5 % typique.',
    },
  ],

  compute: (values) => {
    const capital = Math.max(0, Number(values.capital) || 0);
    const tauxAnnuel = (Number(values.taux) || 0) / 100;
    const duree = Math.max(1, Number(values.duree) || 25);
    const assuranceAnnuel = (Number(values.assurance) || 0) / 100;

    const mCapital = mensualiteCapital(capital, tauxAnnuel, duree);
    const mAssurance = (capital * assuranceAnnuel) / 12;
    const mensualite = mCapital + mAssurance;

    const n = duree * 12;
    const coutAssurance = mAssurance * n;
    const coutInterets = mCapital * n - capital;
    const coutTotal = coutInterets + coutAssurance;
    const totalRembourse = capital + coutTotal;

    return {
      primary: {
        label: 'Mensualité totale (capital + assurance)',
        value: mensualite,
        unit: '€',
        formatted: formatEuros(mensualite),
      },
      secondary: [
        { label: 'Mensualité hors assurance', value: mCapital, unit: '€', formatted: formatEuros(mCapital) },
        { label: 'Coût de l’assurance / mois', value: mAssurance, unit: '€', formatted: formatEuros(mAssurance) },
        { label: 'Coût total des intérêts', value: coutInterets, unit: '€', formatted: formatEuros(coutInterets) },
        { label: 'Coût total de l’assurance', value: coutAssurance, unit: '€', formatted: formatEuros(coutAssurance) },
        { label: 'Coût total du crédit', value: coutTotal, unit: '€', formatted: formatEuros(coutTotal) },
        { label: 'Total remboursé', value: totalRembourse, unit: '€', formatted: formatEuros(totalRembourse) },
        { label: 'Coût du crédit en % du capital', value: coutTotal / Math.max(1, capital), unit: '%', formatted: formatPercent(coutTotal / Math.max(1, capital)) },
      ],
      notes: [
        'Calcul à mensualités constantes (le cas standard en France). L’assurance est calculée sur le capital initial — méthode dite "groupe banque".',
        'Hors frais de dossier, frais de garantie (caution/hypothèque) et indemnités de remboursement anticipé.',
      ],
    };
  },

  explanation: `La **mensualité d'un prêt immobilier** classique repose sur la formule des mensualités constantes :

\`\`\`
M = C × (t/12) / (1 − (1 + t/12)^−n)
\`\`\`

où **C** est le capital emprunté, **t** le taux annuel et **n** le nombre de mensualités (durée × 12).

**Décomposition d'une mensualité** :
- **Part intérêts** : forte au début, décroît progressivement.
- **Part capital** : faible au début, croît progressivement.
- **Part assurance** : constante (calculée sur le capital initial dans le modèle "groupe banque").

**Assurance emprunteur** : depuis la loi Lemoine (2022), tu peux changer d'assurance à tout moment, sans frais. Économie potentielle : **plusieurs milliers d'euros** sur la durée d'un prêt.

**Exemple** — 200 000 € à 3,5 % sur 25 ans, assurance 0,34 % :
- Mensualité capital : ~1 001 €
- Mensualité assurance : ~57 €
- **Mensualité totale : ~1 058 €**
- Coût total intérêts : 100 250 €
- Coût total assurance : 17 000 €
- **Coût total du crédit : 117 250 €** (~59 % du capital)

**Réduire le coût** : raccourcir la durée (passer de 25 à 20 ans), augmenter l'apport, déléguer l'assurance, négocier le taux.`,

  examples: {
    columns: [
      { key: 'capital', label: 'Capital' },
      { key: 'mensualite', label: 'Mensualité (hors ass.)' },
      { key: 'duree', label: 'Durée' },
      { key: 'cout', label: 'Coût total crédit' },
    ],
    rows: [
      { capital: '150 000 €', mensualite: '751 €', duree: '25 ans', cout: '75 200 €' },
      { capital: '200 000 €', mensualite: '1 001 €', duree: '25 ans', cout: '100 250 €' },
      { capital: '250 000 €', mensualite: '1 251 €', duree: '25 ans', cout: '125 300 €' },
      { capital: '200 000 €', mensualite: '1 160 €', duree: '20 ans', cout: '78 350 €' },
      { capital: '200 000 €', mensualite: '1 430 €', duree: '15 ans', cout: '57 350 €' },
    ],
  },

  faq: [
    {
      q: 'Comment est calculée la mensualité d’un prêt immobilier ?',
      a: "Formule classique : M = C × (t/12) ÷ (1 − (1 + t/12)^−n), avec C le capital, t le taux annuel et n le nombre de mensualités. Le crédit français est à mensualités constantes par défaut.",
    },
    {
      q: 'Vaut-il mieux raccourcir la durée ou augmenter l’apport ?',
      a: "Les deux baissent le coût total, mais l'apport supplémentaire est plus efficace si tu peux te le permettre : il évite de payer des intérêts dès le 1ᵉʳ mois, alors que raccourcir la durée augmente la mensualité.",
    },
    {
      q: 'Peut-on rembourser son prêt par anticipation ?',
      a: "Oui, partiel ou total. La banque peut facturer des indemnités de remboursement anticipé (IRA) plafonnées à 3 % du capital restant dû ou 6 mois d'intérêts. Souvent négociable lors de la signature.",
    },
    {
      q: 'L’assurance emprunteur est-elle obligatoire ?',
      a: "Pas légalement, mais quasi-systématiquement exigée par la banque. Depuis la loi Lemoine (2022), tu peux la changer à tout moment, sans frais ni motif. Compare les délégations.",
    },
  ],

  related: ['capacite-emprunt', 'frais-de-notaire', 'rentabilite-airbnb'],
};
