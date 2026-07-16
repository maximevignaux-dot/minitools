import type { MetadataRoute } from 'next';
import { CATEGORIES, SITE_URL } from '@/lib/site';
import { getAllComparisons } from '@/comparisons';
import { getAllTools } from '@/tools';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().slice(0, 10);

  const home: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 1,
  };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/outils`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/comparatifs`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/methodologie`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const comparisons: MetadataRoute.Sitemap = getAllComparisons().map((c) => ({
    url: `${SITE_URL}/comparatifs/${c.slug}`,
    lastModified: c.lastmod,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const tools: MetadataRoute.Sitemap = getAllTools().map((t) => ({
    url: `${SITE_URL}/${t.category}/${t.slug}`,
    lastModified: t.lastmod,
    changeFrequency: 'weekly',
    priority: t.priority ?? 0.6,
  }));

  return [home, ...staticPages, ...categories, ...tools, ...comparisons];
}
