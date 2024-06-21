import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Space Mono', 'sans-serif'],
    },
    screens: {
      xl: { max: '1199.98px' },
      // => @media (max-width: 1199.98px) { ... }

      lg: { max: '991.98px' },
      // => @media (max-width: 991.98px) { ... }

      md: { max: '767.98px' },
      // => @media (max-width: 767.98px) { ... }

      sm: { max: '575.98px' },
      // => @media (max-width: 575.98px) { ... }

      xs: { max: '374.98px' },
      // => @media (max-width: 374.98px) { ... }
    },
  },
}
export default config
