import type { FaqItem, HowToStep, Tool } from '@/types/tool';
import { absoluteUrl, getCategory, SITE_NAME, SITE_URL } from './site';

interface BreadcrumbCrumb {
  label: string;
  url: string;
}

export function buildToolSchemas(tool: Tool) {
  const url = absoluteUrl(`/${tool.category}/${tool.slug}`);
  const category = getCategory(tool.category);

  const organization = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon'),
    },
  };

  const application = {
    '@context': 'https://schema.org',
    '@type': tool.schemaType ?? 'SoftwareApplication',
    name: tool.h1,
    url,
    description: tool.metaDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    author: organization,
    publisher: organization,
    datePublished: tool.datePublished ?? tool.lastmod,
    dateModified: tool.lastmod,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbs = buildBreadcrumbList([
    { label: 'Accueil', url: absoluteUrl('/') },
    { label: category?.label ?? tool.category, url: absoluteUrl(`/${tool.category}`) },
    { label: tool.h1, url },
  ]);

  return [
    application,
    breadcrumbs,
    buildFaqSchema(tool.faq),
    buildHowToSchema(tool.h1, tool.howTo, url),
    buildArticleSchema(tool, url, organization),
  ].filter(Boolean);
}

export function buildArticleSchema(
  tool: Tool,
  url: string,
  organization: Record<string, unknown>,
) {
  if (!tool.explanation) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tool.h1,
    description: tool.tldr ?? tool.metaDescription,
    inLanguage: 'fr-FR',
    author: organization,
    publisher: organization,
    datePublished: tool.datePublished ?? tool.lastmod,
    dateModified: tool.lastmod,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: getCategory(tool.category)?.label ?? tool.category,
    keywords: tool.keywords?.join(', '),
  };
}

export function buildHowToSchema(name: string, steps: HowToStep[] | undefined, url: string) {
  if (!steps?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    inLanguage: 'fr-FR',
    totalTime: 'PT1M',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${url}#etape-${i + 1}`,
    })),
  };
}

export function buildFaqSchema(items: FaqItem[]) {
  if (!items?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function buildBreadcrumbList(crumbs: BreadcrumbCrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.url,
    })),
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr-FR',
  };
}

export function buildItemListSchema(tools: Tool[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/${t.category}/${t.slug}`),
      name: t.h1,
    })),
  };
}
