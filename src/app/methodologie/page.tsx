import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Shield, RefreshCw, BookOpen, Lock } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';
import { buildBreadcrumbList } from '@/lib/schema';
import { getAllTools } from '@/tools';

const URL = absoluteUrl('/methodologie');

export const metadata: Metadata = {
  title: `Méthodologie — comment ${SITE_NAME} calcule, met à jour et source ses outils`,
  description: `Comment ${SITE_NAME} calcule, source et met à jour ses calculatrices. Hypothèses, formules, sources officielles utilisées (URSSAF, impots.gouv.fr, ADEME, HCSF).`,
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: `Méthodologie — ${SITE_NAME}`,
    description: 'Sources, hypothèses et processus de mise à jour des calculatrices.',
  },
};

export default function MethodologiePage() {
  const tools = getAllTools();
  const today = new Date().toISOString().slice(0, 10);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Méthodologie — ${SITE_NAME}`,
    description: metadata.description,
    inLanguage: 'fr-FR',
    datePublished: '2026-05-13',
    dateModified: today,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/icon') },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': URL },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <JsonLd
        data={[
          articleSchema,
          buildBreadcrumbList([
            { label: 'Accueil', url: absoluteUrl('/') },
            { label: 'Méthodologie', url: URL },
          ]),
        ]}
      />

      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Méthodologie' }]} />

      <header className="mt-4 mb-8 max-w-prose">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          Méthodologie &amp; sources
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Comment {SITE_NAME} calcule, source et met à jour ses {tools.length} calculatrices.
          On expose ici nos hypothèses, formules et sources officielles — pour que tu puisses
          vérifier, reproduire ou contester chaque résultat.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        <li className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-medium leading-snug text-ink">Sources officielles uniquement</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              URSSAF, impots.gouv.fr, Service-Public, HCSF, ADEME, Banque de France, AMF.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
          <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-medium leading-snug text-ink">Mises à jour datées</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Chaque page affiche sa date de dernière révision et son schéma JSON-LD reflète le
              `dateModified` exact.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-medium leading-snug text-ink">Formules transparentes</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Section &laquo;&nbsp;Comment ça marche&nbsp;&raquo; sur chaque outil avec la formule
              et un exemple chiffré complet.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-medium leading-snug text-ink">Calculs côté client</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Aucun montant saisi ne quitte ton navigateur. Pas d&apos;analytics nominatif, pas
              d&apos;envoi serveur.
            </p>
          </div>
        </li>
      </ul>

      <section id="sources" aria-labelledby="sources-title" className="mt-12 max-w-prose">
        <h2 id="sources-title" className="mb-3 text-2xl font-semibold">
          Nos sources de référence
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Nous n&apos;utilisons que des sources officielles ou autoritaires pour calibrer nos
          taux, plafonds et barèmes. Chaque page outil liste les liens utilisés pour cet outil
          spécifique dans son bloc <em>Sources</em>.
        </p>
        <ul className="mt-5 space-y-3 text-base leading-relaxed text-ink/90">
          <li>
            <strong>URSSAF</strong> &mdash; cotisations sociales salariés et indépendants,
            plafonds auto-entrepreneur, taux par activité.
          </li>
          <li>
            <strong>impots.gouv.fr</strong> &mdash; prélèvement à la source, tranches du barème
            IR, plafonds PER, droits de mutation, fiscalité du meublé.
          </li>
          <li>
            <strong>Service-Public.fr</strong> &mdash; régimes juridiques, droits sociaux,
            crédit immobilier, location meublée touristique.
          </li>
          <li>
            <strong>HCSF</strong> (Haut Conseil de Stabilité Financière) &mdash; règles d&apos;endettement
            crédit immobilier, durée maximale.
          </li>
          <li>
            <strong>Banque de France</strong> &mdash; taux d&apos;usure trimestriel, statistiques de
            crédit.
          </li>
          <li>
            <strong>ADEME</strong>, <strong>Automobile Club</strong> &mdash; budgets de
            référence pour les coûts d&apos;usage des véhicules.
          </li>
          <li>
            <strong>AMF</strong>, <strong>ACPR</strong> &mdash; placements financiers,
            assurance emprunteur, PER.
          </li>
          <li>
            <strong>YouTube Help, TikTok Newsroom, Google AdSense</strong> &mdash; modèles de
            rémunération créateurs.
          </li>
        </ul>
      </section>

      <section id="hypotheses" aria-labelledby="hypotheses-title" className="mt-12 max-w-prose">
        <h2 id="hypotheses-title" className="mb-3 text-2xl font-semibold">
          Hypothèses générales
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Nos calculatrices visent l&apos;estimation rapide et lisible, pas la simulation
          comptable certifiée. Voici les hypothèses cadres que nous appliquons par défaut :
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed marker:text-muted">
          <li>
            Les <strong>taux et plafonds 2026</strong> sont utilisés (révisés en mai 2026).
          </li>
          <li>
            Les cotisations salariales sont prises en <strong>moyenne par statut</strong>
            (cadre / non-cadre / public) &mdash; ta convention collective ou ta mutuelle
            peuvent faire varier de <strong>±2 %</strong>.
          </li>
          <li>
            Les revenus de créateurs (TikTok, YouTube) sont des <strong>fourchettes</strong>
            basées sur les RPM publics par niche &mdash; les écarts réels entre comptes sont
            importants.
          </li>
          <li>
            Les frais de notaire intègrent le <strong>barème dégressif national</strong> des
            émoluments + DMTO + CSI + débours estimés (~1 200 €).
          </li>
          <li>
            Les projections d&apos;épargne (PER, intérêts composés) supposent un{' '}
            <strong>rendement constant net de frais</strong> et un versement annuel régulier &mdash;
            simplification volontaire pour la lisibilité.
          </li>
        </ul>
      </section>

      <section id="limites" aria-labelledby="limites-title" className="mt-12 max-w-prose">
        <h2 id="limites-title" className="mb-3 text-2xl font-semibold">
          Limites &amp; ce que nous ne couvrons pas
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Pour préserver la lisibilité, nos outils volontairement n&apos;intègrent pas certains
          paramètres pointus. À vérifier avec ton expert-comptable, courtier ou notaire pour les
          décisions engageantes :
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed marker:text-muted">
          <li>Conventions collectives sectorielles spécifiques</li>
          <li>Exonérations bas-salaires (réduction Fillon), heures supplémentaires défiscalisées</li>
          <li>Crédits d&apos;impôt et niches fiscales individuelles</li>
          <li>Régimes spéciaux (zones franches, contrats aidés, intermittents)</li>
          <li>Calcul exact des droits à la retraite (système par points complexe)</li>
        </ul>
      </section>

      <section id="mises-a-jour" aria-labelledby="mises-a-jour-title" className="mt-12 max-w-prose">
        <h2 id="mises-a-jour-title" className="mb-3 text-2xl font-semibold">
          Processus de mise à jour
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Les taux, plafonds et barèmes officiels sont publiés à dates fixes (janvier, juillet
          principalement). Notre cycle :
        </p>
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed marker:text-muted">
          <li>Veille hebdomadaire sur les sites officiels et la presse spécialisée.</li>
          <li>Mise à jour des paramètres concernés dans le code (un fichier par outil).</li>
          <li>
            Actualisation du <code className="rounded bg-line/60 px-1 py-0.5 text-[0.92em]">lastmod</code>{' '}
            de l&apos;outil &mdash; reflété dans le sitemap et le schema JSON-LD{' '}
            <code className="rounded bg-line/60 px-1 py-0.5 text-[0.92em]">dateModified</code>.
          </li>
          <li>
            Régénération automatique des pages statiques et redéploiement Vercel.
          </li>
        </ol>
      </section>

      <section className="mt-12 rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-2 text-xl font-semibold">Une erreur, une suggestion ?</h2>
        <p className="text-base leading-relaxed text-muted">
          Les barèmes évoluent. Si tu repères une donnée fausse ou un cas d&apos;usage manquant,
          ouvre une issue sur le dépôt public du projet ou propose une correction par pull
          request &mdash; les fichiers sont en TypeScript clair, sans logique cachée.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm text-accent no-underline hover:underline"
        >
          Retour aux outils
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </article>
  );
}
