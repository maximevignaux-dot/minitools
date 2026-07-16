# minitools

Site SEO de micro-outils (calculateurs, simulateurs) en français. Stack : Next.js 15 (App Router) + TypeScript + Tailwind. Export statique (`output: 'export'`) — chaque page est pré-rendue en HTML pour Googlebot et les robots sociaux.

## Démarrer en local

```bash
npm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
npm run build    # produit out/ (export statique)
```

## Déploiement Vercel

Le projet est conçu pour un déploiement Vercel zéro-config — `vercel.json` fixe le framework, le build et le dossier de sortie.

1. **Importer le repo** dans Vercel
2. **Framework Preset** : Next.js (détecté automatiquement)
3. **Build Command** : `npm run build` (par défaut)
4. **Output Directory** : `out` (override du défaut `.next` — c'est le dossier produit par `output: 'export'`)

### Variables d'environnement à configurer

| Variable                          | Obligatoire | Valeur                              |
| --------------------------------- | ----------- | ----------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | ✅           | URL prod sans slash final           |
| `NEXT_PUBLIC_SITE_NAME`           | ⛔           | Nom de marque (défaut : `Calcula`)  |
| `NEXT_PUBLIC_ADSENSE_CLIENT`      | ⛔           | `ca-pub-xxxxxxxxxx` AdSense         |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP`    | ⛔           | ID slot AdSense en haut de page     |
| `NEXT_PUBLIC_ADSENSE_SLOT_MID`    | ⛔           | ID slot AdSense au milieu           |
| `NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM` | ⛔           | ID slot AdSense en bas              |

`NEXT_PUBLIC_SITE_URL` est utilisé pour les `canonical`, `sitemap.xml`, JSON-LD et OG images — c'est la seule variable indispensable pour un déploiement propre.

### Vérifications post-déploiement

- `https://<domaine>/sitemap.xml` doit lister toutes les pages avec la bonne URL canonique
- `https://<domaine>/robots.txt` doit pointer vers le bon sitemap
- `https://<domaine>/opengraph-image` doit renvoyer une PNG 1200×630
- `https://<domaine>/icon` doit renvoyer une PNG 32×32
- Tester le Rich Results sur [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — chaque page outil doit valider `SoftwareApplication`, `Article`, `BreadcrumbList`, `FAQPage` et `HowTo`

## Ajouter un nouvel outil

1. Créer `src/tools/data/<slug>.ts` exportant un `Tool` typé.
2. L'enregistrer dans `src/tools/index.ts` (import + ajout dans `ALL_TOOLS`).
3. (Optionnel) Pour une UI sur-mesure : créer `src/tools/custom/<Slug>Renderer.tsx` et l'ajouter dans `src/tools/customRenderers.ts`.

Chaque outil doit renseigner les champs SEO à fort impact (en plus du strict nécessaire) :

- `tldr` — réponse rapide en 1-2 phrases (featured snippet bait)
- `keyTakeaways[]` — 3-4 affirmations clés (bait table snippet)
- `howTo[]` — 3-4 étapes numérotées (génère le `HowTo` JSON-LD)
- `useCases[]` — 3-4 cas d'usage (long-tail SEO)
- `pitfalls[]` — 3-4 erreurs courantes (contenu pédagogique)
- `sources[]` — 2-3 liens autoritaires (`.gouv.fr`, URSSAF, ADEME…) pour l'E-E-A-T

Le sitemap, le routing, les meta SEO, les schemas JSON-LD et les OG images sont auto-générés à partir du registre.

## Documentation

- [`docs/seo-strategy.pdf`](docs/seo-strategy.pdf) — stratégie SEO complète, architecture éditoriale, schemas JSON-LD, roadmap.
