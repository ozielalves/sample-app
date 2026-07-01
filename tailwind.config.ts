import type { Config } from 'tailwindcss';

import UIConst from './src/modules/UI/const';

export default {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: UIConst.TAILWIND_COLORS,
      borderRadius: {
        cell: '10px',
        card: '12px',
        sheet: '16px',
        pill: '9999px',
      },
      fontSize: {
        caption: ['13px', { lineHeight: '18px' }],
        footnote: ['12px', { lineHeight: '16px' }],
        body: ['17px', { lineHeight: '22px' }],
        title: ['20px', { lineHeight: '25px', fontWeight: '600' }],
        heading: ['34px', { lineHeight: '41px', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
