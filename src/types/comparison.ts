import type { FaqItem } from './tool';

export interface ComparisonOption {
  name: string;
  shortName: string;
  tagline: string;
  pros: string[];
  cons: string[];
}

export interface ComparisonRow {
  criterion: string;
  a: string;
  b: string;
  winner?: 'a' | 'b' | 'tie';
}

export interface Comparison {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  tldr: string;
  optionA: ComparisonOption;
  optionB: ComparisonOption;
  rows: ComparisonRow[];
  whenA: string[];
  whenB: string[];
  verdict: string;
  faq: FaqItem[];
  related?: string[];
  lastmod: string;
  keywords?: string[];
}
