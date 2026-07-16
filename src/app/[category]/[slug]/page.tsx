import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MicroToolPage } from '@/components/tool/MicroToolPage';
import { absoluteUrl } from '@/lib/site';
import { getAllTools, getToolBySlug } from '@/tools';

interface Params {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllTools().map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  if (!tool) return {};
  const url = absoluteUrl(`/${tool.category}/${tool.slug}`);
  // When a tool defines a custom ogImage we use it; otherwise we leave `images`
  // unset so Next.js falls back to the per-tool opengraph-image.tsx convention
  // (a real 1200×630 PNG generated at build time). Hard-coding '/og-default.png'
  // here overrode that generated image and pointed at a file that doesn't exist.
  const customOg = tool.ogImage ? [{ url: tool.ogImage }] : undefined;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: tool.metaTitle,
      description: tool.metaDescription,
      ...(customOg ? { images: customOg } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
      ...(customOg ? { images: customOg } : {}),
    },
  };
}

export default async function ToolRoute({ params }: Params) {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  if (!tool) notFound();
  return <MicroToolPage tool={tool} />;
}
