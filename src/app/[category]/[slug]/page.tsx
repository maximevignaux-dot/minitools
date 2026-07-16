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
  const ogImage = tool.ogImage ?? '/og-default.png';

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function ToolRoute({ params }: Params) {
  const { category, slug } = await params;
  const tool = getToolBySlug(category, slug);
  if (!tool) notFound();
  return <MicroToolPage tool={tool} />;
}
