export type CategorySlug =
  | 'revenus'
  | 'internet'
  | 'couts'
  | 'immobilier'
  | 'salaire'
  | 'epargne';

export type ToolInputType = 'number' | 'select' | 'slider';

export interface ToolInputBase {
  id: string;
  label: string;
  unit?: string;
  type: ToolInputType;
  defaultValue: number | string;
  help?: string;
}

export interface ToolInputNumber extends ToolInputBase {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
}

export interface ToolInputSlider extends ToolInputBase {
  type: 'slider';
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
}

export interface ToolInputSelect extends ToolInputBase {
  type: 'select';
  options: { value: string; label: string }[];
  defaultValue: string;
}

export type ToolInput = ToolInputNumber | ToolInputSlider | ToolInputSelect;

export type ToolValue = number | string;
export type ToolValues = Record<string, ToolValue>;

export interface ResultMetric {
  label: string;
  value: number;
  unit: string;
  formatted: string;
}

export interface ComputeResult {
  primary: ResultMetric;
  secondary?: ResultMetric[];
  range?: { min: number; max: number; formatted: string };
  notes?: string[];
}

export interface ExamplesTable {
  columns: { key: string; label: string; unit?: string }[];
  rows: Record<string, string | number>[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export interface Pitfall {
  title: string;
  description: string;
}

export interface SourceRef {
  label: string;
  url: string;
}

export interface Tool {
  slug: string;
  category: CategorySlug;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  keywords?: string[];
  ogImage?: string;
  lastmod: string;
  priority?: number;
  schemaType?: 'HowTo' | 'SoftwareApplication';

  inputs: ToolInput[];
  compute: (values: ToolValues) => ComputeResult;

  tldr?: string;
  keyTakeaways?: string[];
  howTo?: HowToStep[];
  useCases?: UseCase[];
  pitfalls?: Pitfall[];
  sources?: SourceRef[];
  datePublished?: string;

  explanation: string;
  examples: ExamplesTable;
  faq: FaqItem[];
  related: string[];
}

export interface CategoryMeta {
  slug: CategorySlug;
  label: string;
  description: string;
  emoji: string;
  intro?: string;
  tldr?: string;
  faq?: FaqItem[];
}
