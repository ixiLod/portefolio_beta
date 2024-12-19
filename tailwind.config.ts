import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        ninna: ['Ninna', 'sans-serif'],
        neuemontreal: ['NeueMontreal', 'sans-serif'],
      },
      screens: {
        xs: '380px',
      },
      width: {
        '86': '22rem',
      },
    },
  },
  plugins: [],
};
export default config;
