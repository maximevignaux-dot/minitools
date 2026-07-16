import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#fafaf7',
        accent: '#2563eb',
        accentDark: '#1d4ed8',
        muted: '#64748b',
        line: '#e2e8f0',
        result: '#ecfdf5',
        resultBorder: '#10b981',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
};

export default config;
