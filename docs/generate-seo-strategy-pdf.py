"""Generate the SEO strategy PDF for the minitools project."""

from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    PageBreak,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


# ---- Brand palette (matches the Tailwind config) ----------------------------
INK = colors.HexColor("#0f172a")
MUTED = colors.HexColor("#64748b")
ACCENT = colors.HexColor("#2563eb")
LINE = colors.HexColor("#e2e8f0")
PAPER = colors.HexColor("#fafaf7")
AMBER_BG = colors.HexColor("#fffbeb")
AMBER_BORDER = colors.HexColor("#fcd34d")


# ---- Page template with footer ---------------------------------------------
def _draw_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(2 * cm, 1.2 * cm, "Calcula — Stratégie SEO")
    canvas.drawRightString(A4[0] - 2 * cm, 1.2 * cm, f"Page {doc.page}")
    canvas.setStrokeColor(LINE)
    canvas.line(2 * cm, 1.6 * cm, A4[0] - 2 * cm, 1.6 * cm)
    canvas.restoreState()


# ---- Styles -----------------------------------------------------------------
def make_styles():
    base = getSampleStyleSheet()
    styles = {}

    styles["title"] = ParagraphStyle(
        "title",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=28,
        leading=34,
        textColor=INK,
        spaceAfter=6,
    )
    styles["subtitle"] = ParagraphStyle(
        "subtitle",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=12,
        leading=18,
        textColor=MUTED,
        spaceAfter=14,
    )
    styles["h1"] = ParagraphStyle(
        "h1",
        parent=base["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=24,
        textColor=INK,
        spaceBefore=18,
        spaceAfter=8,
    )
    styles["h2"] = ParagraphStyle(
        "h2",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=18,
        textColor=INK,
        spaceBefore=12,
        spaceAfter=4,
    )
    styles["body"] = ParagraphStyle(
        "body",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=6,
    )
    styles["muted"] = ParagraphStyle(
        "muted",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=MUTED,
        spaceAfter=6,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        parent=styles["body"],
        leftIndent=14,
        bulletIndent=4,
        spaceAfter=2,
    )
    styles["code"] = ParagraphStyle(
        "code",
        parent=base["Code"],
        fontName="Courier",
        fontSize=9,
        leading=13,
        textColor=INK,
        backColor=PAPER,
        borderColor=LINE,
        borderWidth=0.5,
        borderPadding=6,
        spaceAfter=8,
    )
    styles["callout"] = ParagraphStyle(
        "callout",
        parent=styles["body"],
        backColor=PAPER,
        borderColor=LINE,
        borderWidth=0.5,
        borderPadding=10,
        spaceBefore=4,
        spaceAfter=10,
    )
    styles["warning"] = ParagraphStyle(
        "warning",
        parent=styles["body"],
        backColor=AMBER_BG,
        borderColor=AMBER_BORDER,
        borderWidth=0.5,
        borderPadding=10,
        spaceBefore=4,
        spaceAfter=10,
    )
    return styles


def bullets(items, style):
    return [Paragraph(f"• {it}", style) for it in items]


def section_break(spacer=12):
    return Spacer(1, spacer)


def kv_table(rows, styles):
    table = Table(
        rows,
        colWidths=[5 * cm, 11.5 * cm],
        style=TableStyle(
            [
                ("FONT", (0, 0), (-1, -1), "Helvetica", 9.5),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("TEXTCOLOR", (0, 0), (-1, -1), INK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, PAPER]),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        ),
    )
    return table


def tool_table(rows):
    return Table(
        rows,
        colWidths=[4.2 * cm, 3.5 * cm, 8.5 * cm],
        style=TableStyle(
            [
                ("FONT", (0, 0), (-1, -1), "Helvetica", 9),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 1), (-1, -1), INK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PAPER]),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        ),
    )


# ---- Content ----------------------------------------------------------------
def build_story(styles):
    s = []

    # ---- Cover --------------------------------------------------------------
    s.append(Spacer(1, 3 * cm))
    s.append(Paragraph("Calcula", styles["subtitle"]))
    s.append(Paragraph("Stratégie SEO &amp; architecture éditoriale", styles["title"]))
    s.append(
        Paragraph(
            "Document de référence pour le site de calculateurs et simulateurs "
            "francophones. Détaille la stratégie de référencement organique, "
            "l’architecture du site, les formats de page haute conversion et "
            "le catalogue d’outils.",
            styles["subtitle"],
        )
    )

    s.append(Spacer(1, 1.2 * cm))
    s.append(
        kv_table(
            [
                ["Stack technique", "Next.js 15 (App Router) · TypeScript · Tailwind"],
                ["Mode de rendu", "Static export (`output: 'export'`)"],
                ["Hébergement cible", "Vercel — déploiement zéro-config via vercel.json"],
                ["Date d’édition", date.today().isoformat()],
                ["Catalogue actuel", "13 outils · 27 pages statiques"],
                ["Schémas JSON-LD émis", "5 par page outil (Application + Article + 3 SEO)"],
            ],
            styles,
        )
    )

    s.append(PageBreak())

    # ---- Sommaire -----------------------------------------------------------
    s.append(Paragraph("Sommaire", styles["h1"]))
    s.append(
        kv_table(
            [
                ["1.", "Objectifs &amp; positionnement"],
                ["2.", "Architecture éditoriale"],
                ["3.", "Format d’une page outil — sections SEO"],
                ["4.", "Schemas JSON-LD &amp; rich results"],
                ["5.", "OG images, favicon, métadonnées sociales"],
                ["6.", "Pages catégorie — stratégie pillar"],
                ["7.", "Homepage — entrée découverte"],
                ["8.", "Méthodologie — E-E-A-T &amp; signaux d’autorité"],
                ["9.", "Catalogue d’outils détaillé"],
                ["10.", "Maillage interne &amp; navigation"],
                ["11.", "Déploiement Vercel"],
                ["12.", "Métriques attendues &amp; roadmap"],
            ],
            styles,
        )
    )

    s.append(PageBreak())

    # ---- 1. Objectifs -------------------------------------------------------
    s.append(Paragraph("1. Objectifs &amp; positionnement", styles["h1"]))
    s.append(
        Paragraph(
            "Calcula vise le top 3 organique sur les requêtes commerciales et "
            "informationnelles francophones du type «&nbsp;calcul X&nbsp;», «&nbsp;combien rapporte Y&nbsp;» et «&nbsp;simulateur Z&nbsp;». "
            "Chaque page combine un calculateur instantané (utilité immédiate) et un contenu "
            "éditorial structuré (autorité de fond). Les deux servent un même objectif : "
            "capter du trafic long-tail à forte intention, monétisable via affiliation et display.",
            styles["body"],
        )
    )

    s.append(Paragraph("Cibles SEO prioritaires", styles["h2"]))
    s.extend(
        bullets(
            [
                "<b>Requêtes à fort volume</b> : «&nbsp;salaire brut net&nbsp;», «&nbsp;frais de notaire&nbsp;», "
                "«&nbsp;calcul TVA&nbsp;», «&nbsp;capacité d’emprunt&nbsp;».",
                "<b>Requêtes long-tail à forte intention</b> : «&nbsp;combien rapporte TikTok par mois&nbsp;», "
                "«&nbsp;simulateur PER économie d’impôt&nbsp;».",
                "<b>Requêtes de comparaison</b> : «&nbsp;auto-entrepreneur vs SASU&nbsp;», "
                "«&nbsp;LCD vs location nue&nbsp;».",
                "<b>Requêtes d’erreur</b> : «&nbsp;erreur courante calcul X&nbsp;» (couvertes par les "
                "blocs «&nbsp;Erreurs courantes&nbsp;» de chaque outil).",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Avantages compétitifs visés", styles["h2"]))
    s.extend(
        bullets(
            [
                "Pages 100 % statiques (TTFB &lt; 100 ms sur CDN Vercel) — signal vitesse fort.",
                "Calculs côté client — privacy by design, pas de cookie tiers, pas d’envoi serveur.",
                "JSON-LD denses : 5 schémas par page outil pour maximiser l’éligibilité aux rich results.",
                "Contenu rédigé en français natif, taux et plafonds 2026 — fraîcheur éditoriale.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 2. Architecture ----------------------------------------------------
    s.append(Paragraph("2. Architecture éditoriale", styles["h1"]))
    s.append(
        Paragraph(
            "L’URL d’un outil suit le schéma <font face='Courier'>/[categorie]/[slug]</font>. "
            "Chaque outil est défini dans un fichier TypeScript unique exportant un objet "
            "<font face='Courier'>Tool</font> typé. Le routing, le sitemap, les meta SEO, les "
            "OG images et les schémas JSON-LD sont auto-générés à partir de ce registre.",
            styles["body"],
        )
    )

    s.append(Paragraph("Type Tool — contrat éditorial", styles["h2"]))
    s.append(
        Paragraph(
            "Chaque outil renseigne, en plus du strict nécessaire (formule, inputs, examples), "
            "les <b>5 champs SEO à fort impact</b> suivants :",
            styles["body"],
        )
    )
    s.append(
        kv_table(
            [
                ["tldr", "Réponse rapide en 1-2 phrases. Featured snippet bait."],
                ["keyTakeaways[]", "3-4 affirmations clés, snippet table bait."],
                ["howTo[]", "Étapes numérotées (titre + description). Génère le JSON-LD HowTo."],
                ["useCases[]", "Cas d’usage concrets. Cible le long-tail intentionnel."],
                ["pitfalls[]", "Erreurs courantes à éviter (bloc warning ambre)."],
                ["sources[]", "Liens externes officiels (.gouv.fr, URSSAF, ADEME…). E-E-A-T."],
            ],
            styles,
        )
    )

    s.append(Paragraph("Catégories — pillar pages", styles["h2"]))
    s.append(
        Paragraph(
            "Les 6 catégories existantes sont : <b>Revenus, Internet &amp; créateurs, Coûts réels, "
            "Immobilier, Salaire &amp; emploi, Épargne &amp; placements</b>. Chaque catégorie a un slug, "
            "un emoji, une intro éditoriale, un TL;DR catégorie et une FAQ catégorie (3 questions). "
            "Elles servent de pages pillar capturant les head terms.",
            styles["body"],
        )
    )

    s.append(PageBreak())

    # ---- 3. Format page outil -----------------------------------------------
    s.append(Paragraph("3. Format d’une page outil — sections SEO", styles["h1"]))
    s.append(
        Paragraph(
            "L’ordre des sections est conçu pour maximiser à la fois la conversion utilisateur "
            "(outil en premier) et la capture des rich results / featured snippets. "
            "Chaque section porte une ancre HTML pour activer les <i>sitelinks</i> Google.",
            styles["body"],
        )
    )

    s.append(
        kv_table(
            [
                ["1. Header H1 + intro", "Titre éditorial + sous-titre + lastmod"],
                ["2. TL;DR card", "Réponse directe (carte accent bleue, #tldr)"],
                ["3. Outil de calcul", "Formulaire + résultat sticky (ancre #outil)"],
                ["4. À retenir", "3-4 takeaways (bloc dédié, #a-retenir)"],
                ["5. Comment utiliser", "Étapes numérotées (#comment-utiliser)"],
                ["6. Comment ça marche", "Explication long-form (#explication)"],
                ["7. Exemples concrets", "Table comparative (#exemples)"],
                ["8. Quand l’utiliser", "Cas d’usage (#cas-usage)"],
                ["9. Erreurs courantes", "Pitfalls warning ambre (#erreurs)"],
                ["10. Questions fréquentes", "FAQ accordéon + JSON-LD (#faq)"],
                ["11. Sources", "Liens externes autoritaires (#sources)"],
                ["12. Outils similaires", "Cross-link interne (#outils-similaires)"],
            ],
            styles,
        )
    )

    s.append(Paragraph("Featured snippet bait — pourquoi ces sections", styles["h2"]))
    s.extend(
        bullets(
            [
                "<b>TL;DR</b> en début de page : Google extrait souvent les 1-2 premières phrases comme snippet zero-position.",
                "<b>À retenir</b> en liste : capture les snippets de type «&nbsp;list snippet&nbsp;» et «&nbsp;table snippet&nbsp;».",
                "<b>HowTo</b> + JSON-LD : éligibilité au rich result «&nbsp;How to&nbsp;» (carousel d’étapes en SERP).",
                "<b>FAQ</b> + JSON-LD : rich result FAQ accordéon directement en SERP.",
                "<b>Erreurs courantes</b> : capte les requêtes du type «&nbsp;ne pas se tromper sur X&nbsp;», très rentables.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 4. JSON-LD ---------------------------------------------------------
    s.append(Paragraph("4. Schemas JSON-LD &amp; rich results", styles["h1"]))
    s.append(
        Paragraph(
            "Chaque page outil émet <b>5 objets JSON-LD</b> dans le head, encapsulés dans un "
            "wrapper React <font face='Courier'>&lt;JsonLd /&gt;</font>. La cible est de "
            "saturer les rich results disponibles, sans abuser.",
            styles["body"],
        )
    )

    s.append(
        kv_table(
            [
                [
                    "SoftwareApplication",
                    "Le calculateur lui-même. Avec author, publisher, datePublished, "
                    "dateModified, mainEntityOfPage. Affiche les étoiles dans Google si "
                    "aggregateRating ajouté plus tard.",
                ],
                [
                    "Article",
                    "Pour le contenu long-form de l’explication. articleSection (catégorie), "
                    "keywords, dates. Signal éditorial fort.",
                ],
                [
                    "BreadcrumbList",
                    "Fil d’Ariane Accueil &gt; Catégorie &gt; Outil. Affiché en SERP sous "
                    "le titre, améliore le CTR.",
                ],
                [
                    "FAQPage",
                    "Rich result FAQ accordéon, ~30-40 % de surface SERP en plus quand "
                    "Google le déclenche.",
                ],
                [
                    "HowTo",
                    "Rich result HowTo (étapes avec icônes en SERP). Très rare en finance — "
                    "avantage concurrentiel.",
                ],
            ],
            styles,
        )
    )

    s.append(Paragraph("Schémas globaux site", styles["h2"]))
    s.extend(
        bullets(
            [
                "<b>WebSite</b> dans le layout root → permet la sitelinks search box Google.",
                "<b>ItemList</b> sur la home et chaque catégorie → liste structurée des outils.",
                "<b>Organization</b> implicite via author/publisher sur chaque page.",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Validation", styles["h2"]))
    s.append(
        Paragraph(
            "Chaque déploiement doit passer le Rich Results Test "
            "(<font face='Courier'>https://search.google.com/test/rich-results</font>) "
            "sans erreur ni warning bloquant. Les 5 types doivent être détectés sur chaque "
            "page outil.",
            styles["callout"],
        )
    )

    s.append(PageBreak())

    # ---- 5. OG images -------------------------------------------------------
    s.append(Paragraph("5. OG images, favicon, métadonnées sociales", styles["h1"]))
    s.append(
        Paragraph(
            "Toutes les images de métadonnées sont générées à <b>build time</b> via "
            "<font face='Courier'>next/og</font> (<font face='Courier'>ImageResponse</font>), "
            "compatible avec le mode <font face='Courier'>output: 'export'</font>. Pas de "
            "dépendance runtime ni de cache externe.",
            styles["body"],
        )
    )

    s.append(
        kv_table(
            [
                ["/icon", "32×32 PNG — favicon, monogramme C sur fond accent"],
                ["/apple-icon", "180×180 PNG — icône iOS"],
                ["/opengraph-image", "1200×630 PNG — image OG par défaut du site"],
                ["/[categorie]/opengraph-image", "1200×630 — emoji XL + nb outils par catégorie"],
                ["/[categorie]/[slug]/opengraph-image", "1200×630 — H1 + TL;DR + catégorie par outil"],
            ],
            styles,
        )
    )

    s.append(Paragraph("Métadonnées HTML", styles["h2"]))
    s.extend(
        bullets(
            [
                "<font face='Courier'>metadataBase</font> défini sur SITE_URL → résolution absolue de "
                "toutes les URLs canoniques et OG.",
                "<font face='Courier'>title.template</font> : <font face='Courier'>%s | Calcula</font> "
                "appliqué automatiquement.",
                "<font face='Courier'>alternates.canonical</font> renseigné sur chaque page outil et "
                "catégorie pour éviter le contenu dupliqué.",
                "Twitter Card <font face='Courier'>summary_large_image</font> active la prévisualisation "
                "OG sur X/Twitter.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 6. Catégories ------------------------------------------------------
    s.append(Paragraph("6. Pages catégorie — stratégie pillar", styles["h1"]))
    s.append(
        Paragraph(
            "Chaque page catégorie est conçue comme une <b>pillar page</b> qui capture les head "
            "terms (ex. «&nbsp;simulateur immobilier&nbsp;», «&nbsp;calculateurs salaire&nbsp;») et redistribue "
            "le maillage interne vers les outils enfants.",
            styles["body"],
        )
    )

    s.append(
        kv_table(
            [
                ["Header", "H1 + intro + comptage dynamique d’outils + trust line"],
                ["TL;DR", "Réponse rapide à la requête générique de la catégorie"],
                ["Outils", "Grille à 2 colonnes avec H1 + meta description par outil"],
                ["FAQ", "3 questions générales de la catégorie + JSON-LD FAQPage"],
                ["Cross-links", "Section «&nbsp;Explorer d’autres catégories&nbsp;» en bas (5 cartes)"],
            ],
            styles,
        )
    )

    s.append(Paragraph("Pourquoi cette structure", styles["h2"]))
    s.extend(
        bullets(
            [
                "Le H1 inclut le comptage dynamique : <i>«&nbsp;Immobilier — 3 calculatrices gratuites&nbsp;»</i>. "
                "Capture les recherches avec quantité.",
                "Le TL;DR catégorie répond à la requête générique avant même que l’utilisateur ne clique "
                "sur un outil — capture de featured snippet sur la requête head.",
                "Le bloc cross-link en bas distribue de l’autorité aux 5 autres catégories — anti-silo.",
                "FAQ + JSON-LD : rich result FAQ dès la page catégorie, doublement du surface SERP.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 7. Homepage --------------------------------------------------------
    s.append(Paragraph("7. Homepage — entrée découverte", styles["h1"]))
    s.append(
        Paragraph(
            "La home cible le brand <i>Calcula</i> et les requêtes ultra-larges «&nbsp;calculateur "
            "gratuit&nbsp;» / «&nbsp;simulateur gratuit&nbsp;». Elle ne porte pas d’ambition de ranker sur des "
            "termes spécifiques — elle joue le rôle de distributeur d’autorité.",
            styles["body"],
        )
    )

    s.append(
        kv_table(
            [
                ["Hero", "H1 + sous-titre + stats (nb outils, nb catégories, mise à jour 2026)"],
                ["Trust badges", "3 cartes : instantané · privé · à jour"],
                ["Outils populaires", "Top 4 trié par priority (avec description complète)"],
                ["Catégories", "6 sections avec TL;DR catégorie + liste outils"],
                ["FAQ globale", "4 Q/R sur le site lui-même + JSON-LD FAQPage"],
            ],
            styles,
        )
    )

    s.append(Paragraph("ItemList JSON-LD", styles["h2"]))
    s.append(
        Paragraph(
            "La home émet un schéma <font face='Courier'>ItemList</font> listant les 13 outils avec leur "
            "URL et leur nom. Aide Google à comprendre la structure du site et alimente potentiellement "
            "les sitelinks affichés sous le résultat brand en SERP.",
            styles["body"],
        )
    )

    s.append(PageBreak())

    # ---- 8. Méthodologie ----------------------------------------------------
    s.append(Paragraph("8. Méthodologie — E-E-A-T &amp; signaux d’autorité", styles["h1"]))
    s.append(
        Paragraph(
            "Google évalue les pages YMYL (Your Money Your Life) sur la qualité E-E-A-T : "
            "<b>Experience, Expertise, Authoritativeness, Trustworthiness</b>. Les calculatrices "
            "financières tombent en plein dans cette catégorie — sans signaux E-E-A-T forts, "
            "le ranking est plafonné.",
            styles["warning"],
        )
    )

    s.append(Paragraph("Signaux émis par le site", styles["h2"]))
    s.extend(
        bullets(
            [
                "<b>Page /methodologie dédiée</b> : sources officielles utilisées, hypothèses, "
                "limites, processus de mise à jour. Liée depuis le footer.",
                "<b>Author + Publisher</b> dans chaque schéma JSON-LD (Organization avec logo).",
                "<b>datePublished et dateModified</b> visibles sur chaque page et dans le schéma.",
                "<b>Sources externes</b> sur chaque outil : 2-3 liens vers .gouv.fr / URSSAF / ADEME / AMF, "
                "en <font face='Courier'>rel='noopener nofollow'</font> (transmission d’autorité contrôlée).",
                "<b>Mention HCSF, URSSAF, Banque de France, ADEME</b> dans le contenu — signaux "
                "d’expertise du domaine.",
                "<b>Trust badges visuels</b> sur la home (gratuit, privé, à jour).",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Améliorations E-E-A-T futures", styles["h2"]))
    s.extend(
        bullets(
            [
                "Ajouter un bio author humain (avec photo et titre) sur chaque page — boost majeur sur YMYL.",
                "Obtenir des backlinks depuis .gouv.fr ou organes de presse spécialisée.",
                "Ajouter aggregateRating avec données réelles (formulaire de feedback).",
                "Publier un changelog public des mises à jour.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 9. Catalogue -------------------------------------------------------
    s.append(Paragraph("9. Catalogue d’outils détaillé", styles["h1"]))
    s.append(
        Paragraph(
            "13 outils à date, classés par catégorie. La colonne <i>priorité</i> reflète le poids "
            "SEO assigné dans le sitemap et l’ordre d’affichage des outils populaires.",
            styles["body"],
        )
    )

    tools_data = [
        ["Slug", "Catégorie", "Cible SEO"],
        # Revenus
        ["combien-je-gagne-freelance", "Revenus", "Combien gagne un freelance, TJM, SASU vs auto-entrepreneur"],
        ["auto-entrepreneur-brut-net", "Revenus", "CA d’AE → revenu net après URSSAF + IR"],
        ["calcul-tva", "Revenus", "Conversion HT↔TTC, 4 taux français"],
        # Internet
        ["combien-rapporte-youtube", "Internet", "Revenu YouTube par RPM, niche, audience"],
        ["combien-rapporte-tiktok", "Internet", "Revenu TikTok Creator Rewards + partenariats"],
        # Coûts
        ["cout-reel-voiture-mois", "Coûts", "Coût réel mensuel voiture (achat, LOA, LLD)"],
        # Immobilier
        ["capacite-emprunt", "Immobilier", "Capacité d’emprunt selon revenus, taux, durée"],
        ["rentabilite-airbnb", "Immobilier", "Rentabilité Airbnb brute et nette"],
        ["frais-de-notaire", "Immobilier", "Frais de notaire ancien vs neuf"],
        ["calcul-mensualite-pret", "Immobilier", "Mensualité prêt immo + coût total"],
        # Salaire
        ["brut-net-cadre", "Salaire", "Salaire brut → net cadre, non-cadre, public"],
        # Épargne
        ["calcul-interets-composes", "Épargne", "Projection épargne intérêts composés"],
        ["simulateur-per", "Épargne", "PER : économie d’impôt + capital retraite"],
    ]
    s.append(tool_table(tools_data))

    s.append(Paragraph("Opportunités d’expansion (roadmap)", styles["h2"]))
    s.extend(
        bullets(
            [
                "Allocations chômage (ARE) — volume énorme, catégorie salaire.",
                "Calcul retraite estimation — volume énorme, complexe mais rentable.",
                "Indemnités de licenciement — formule claire, intention forte.",
                "Coût d’un enfant par mois — long-tail famille.",
                "Calcul pourcentage / augmentation salaire — basique mais énorme volume.",
                "Convertisseur de devises temps réel — outil utilitaire.",
                "Reste à charge mutuelle / assurance — segmentation santé.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 10. Maillage -------------------------------------------------------
    s.append(Paragraph("10. Maillage interne &amp; navigation", styles["h1"]))
    s.append(
        Paragraph(
            "Le maillage interne distribue l’autorité PageRank et aide Google à comprendre les "
            "thématiques liées. Plus le maillage est dense et pertinent, plus chaque page se renforce "
            "mutuellement.",
            styles["body"],
        )
    )

    s.append(Paragraph("Couches de maillage", styles["h2"]))
    s.extend(
        bullets(
            [
                "<b>Header (sticky)</b> : 6 catégories visibles sur desktop, menu disclosure sur mobile.",
                "<b>Footer</b> : 6 catégories + lien méthodologie.",
                "<b>Bloc «&nbsp;Outils similaires&nbsp;»</b> en bas de chaque outil : 3 outils liés, "
                "soit via le champ <font face='Courier'>related[]</font>, soit par fallback dans la même catégorie.",
                "<b>Bloc «&nbsp;Explorer d’autres catégories&nbsp;»</b> en bas de chaque catégorie : "
                "5 catégories cousines liées.",
                "<b>Bloc «&nbsp;Outils populaires&nbsp;»</b> sur la home : top 4 par priority.",
                "<b>Bloc 404</b> : 6 outils populaires en suggestion.",
                "<b>Liens markdown inline</b> dans le contenu long-form : support natif "
                "<font face='Courier'>[texte](/url)</font> dans <font face='Courier'>tool.explanation</font>.",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Ancres &amp; sitelinks", styles["h2"]))
    s.append(
        Paragraph(
            "Chaque section d’une page outil porte un id ancrable (<font face='Courier'>#tldr</font>, "
            "<font face='Courier'>#outil</font>, <font face='Courier'>#explication</font>, etc.). "
            "Google peut afficher ces ancres comme sitelinks sous le résultat principal — environ "
            "+15 % de surface SERP captée.",
            styles["body"],
        )
    )

    s.append(PageBreak())

    # ---- 11. Déploiement ----------------------------------------------------
    s.append(Paragraph("11. Déploiement Vercel", styles["h1"]))
    s.append(
        Paragraph(
            "Le projet est conçu pour un déploiement Vercel zéro-config. Le fichier "
            "<font face='Courier'>vercel.json</font> fixe le framework, le build et le dossier "
            "de sortie. Le mode <font face='Courier'>output: 'export'</font> produit un dossier "
            "<font face='Courier'>out/</font> 100 % statique, distribué via le CDN Edge de Vercel.",
            styles["body"],
        )
    )

    s.append(Paragraph("Étapes de déploiement", styles["h2"]))
    s.extend(
        bullets(
            [
                "Importer le repo GitHub <i>minitools</i> dans Vercel.",
                "Définir <font face='Courier'>NEXT_PUBLIC_SITE_URL</font> = URL prod sans slash final.",
                "(Optionnel) Configurer <font face='Courier'>NEXT_PUBLIC_ADSENSE_CLIENT</font> + slots.",
                "Build automatique au push sur la branche principale.",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Vérifications post-déploiement", styles["h2"]))
    s.extend(
        bullets(
            [
                "<font face='Courier'>/sitemap.xml</font> liste toutes les pages avec URLs absolues correctes.",
                "<font face='Courier'>/robots.txt</font> pointe vers le bon sitemap.",
                "<font face='Courier'>/opengraph-image</font> renvoie une PNG 1200×630.",
                "Rich Results Test : 5 schémas détectés sur une page outil (Application, Article, Breadcrumb, FAQ, HowTo).",
                "Page Speed Insights mobile : score &gt; 95.",
                "Soumettre le sitemap dans Google Search Console + Bing Webmaster Tools.",
            ],
            styles["bullet"],
        )
    )

    s.append(PageBreak())

    # ---- 12. Roadmap --------------------------------------------------------
    s.append(Paragraph("12. Métriques attendues &amp; roadmap", styles["h1"]))
    s.append(Paragraph("Métriques de succès (T+3 mois)", styles["h2"]))
    s.extend(
        bullets(
            [
                "100 % des pages indexées dans Google Search Console.",
                "Au moins 3 outils en page 1 sur des requêtes long-tail spécifiques.",
                "CTR moyen &gt; 5 % sur les pages indexées (signal de pertinence du titre/meta).",
                "Taux de rebond &lt; 60 % (engagement avec le calculateur).",
                "Au moins 5 outils éligibles aux rich results FAQ ou HowTo en SERP.",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Métriques de succès (T+12 mois)", styles["h2"]))
    s.extend(
        bullets(
            [
                "Top 10 sur 2-3 head terms par catégorie.",
                "20-30 outils au catalogue (vs 13 actuels).",
                "Backlinks depuis 3 médias spécialisés ou .gouv.fr.",
                "Trafic organique &gt; 50 k visites/mois.",
            ],
            styles["bullet"],
        )
    )

    s.append(Paragraph("Roadmap technique", styles["h2"]))
    s.extend(
        bullets(
            [
                "Ajouter 5-10 outils complémentaires (cf. opportunités section 9).",
                "Ajouter une page <font face='Courier'>/outils</font> (HTML sitemap humain) pour densifier le maillage.",
                "Refactoriser les explanations en MDX avec composants embarqués (callouts, comparaisons).",
                "Ajouter un système de feedback léger pour collecter aggregateRating.",
                "Variantes de comparaison «&nbsp;X vs Y&nbsp;» (auto-ent vs SASU, LCD vs nue, etc.).",
                "Sticky ToC sur desktop pour les pages outils — amélioration dwell time.",
                "Internationalisation FR-BE / FR-CH pour étendre la cible.",
            ],
            styles["bullet"],
        )
    )

    s.append(Spacer(1, 1 * cm))
    s.append(
        Paragraph(
            "Document généré automatiquement à partir de l’état réel du code. "
            "Source : repo <i>minitools</i>.",
            styles["muted"],
        )
    )

    return s


def main():
    out_path = Path(__file__).parent / "seo-strategy.pdf"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2.2 * cm,
        title="Calcula — Stratégie SEO",
        author="Calcula",
    )

    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="normal",
        showBoundary=0,
    )
    doc.addPageTemplates([PageTemplate(id="default", frames=[frame], onPage=_draw_footer)])

    styles = make_styles()
    story = build_story(styles)

    doc.build(story)
    print(f"PDF generated: {out_path}  ({out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
