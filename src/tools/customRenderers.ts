import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';

export interface CustomRendererProps {
  category: string;
  slug: string;
}

export type CustomRenderer = ComponentType<CustomRendererProps>;

export const customRenderers: Record<string, LazyExoticComponent<CustomRenderer>> = {
  // Example (commented):
  // 'rentabilite-airbnb': lazy(() => import('./custom/AirbnbRenderer')),
};

export function getCustomRenderer(slug: string): LazyExoticComponent<CustomRenderer> | undefined {
  return customRenderers[slug];
}

export { lazy };
