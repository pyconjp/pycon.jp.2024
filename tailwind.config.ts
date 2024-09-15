import type {Config} from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'

const rowStart = Array(121).fill(0).map((_, i) => `lg:row-start-[${i + 1}]`).join(' ');
const colStart = Array(6).fill(0).map((_, i) => `lg:col-start-[${i + 1}]`).join(' ');
const rowSpan = Array(12).fill(0).map((_, i) => `lg:row-span-${i + 1}`).join(' ');
const colSpan = Array(4).fill(0).map((_, i) => `lg:col-span-${i + 1}`).join(' ');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    {
      raw: `${colStart} ${rowStart} ${rowSpan} ${colSpan}`,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-noto-sans-jp)', ...defaultTheme.fontFamily.sans],
        noto: ['var(--font-noto-sans-jp)', ...defaultTheme.fontFamily.sans],
        manrope: ['var(--font-manrope)', ...defaultTheme.fontFamily.sans],
        hand: ['var(--font-gochi-hand)', ...defaultTheme.fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      black: '#333333',
      white: '#ffffff',
      primary: {
        DEFAULT: '#005399',
        50: '#dff6fb',
        100: '#c7edf9',
        200: '#92d7f4',
        300: '#59b1e0',
        400: '#3087c1',
        500: '#005399',
        600: '#004083',
        700: '#002f6e',
        800: '#002158',
        900: '#001849',
      },
      secondary: {
        DEFAULT: '#dcc91f',
        50: '#fffbeb',
        100: '#fdfad1',
        200: '#fbf5a5',
        300: '#f4ea76',
        400: '#eadc53',
        500: '#dcc91f',
        600: '#bdaa16',
        700: '#9e8d0f',
        800: '#7f7009',
        900: '#695b05',
      },
      tertiary: {
        DEFAULT: '#443217',
        50: '#f9f4e7',
        100: '#f5edd5',
        200: '#ecdaad',
        300: '#c6ad77',
        400: '#8e7547',
        500: '#443217',
        600: '#3a2810',
        700: '#301e08',
        800: '#271607',
        900: '#201004',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
