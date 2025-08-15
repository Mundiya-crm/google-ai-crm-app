/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-bg-primary'),
        secondary: withOpacity('--color-bg-secondary'),
        tertiary: withOpacity('--color-bg-tertiary'),
        header: withOpacity('--color-bg-header'),
        'content-primary': withOpacity('--color-content-bg-primary'),
        'content-secondary': withOpacity('--color-content-bg-secondary'),
        'content-tertiary': withOpacity('--color-content-bg-tertiary'),
        'content-header': withOpacity('--color-content-bg-header'),
        accent: {
          DEFAULT: withOpacity('--color-bg-accent'),
          hover: withOpacity('--color-bg-accent-hover'),
          text: withOpacity('--color-text-accent'),
        }
      },
      textColor: {
        primary: withOpacity('--color-text-primary'),
        secondary: withOpacity('--color-text-secondary'),
        'content-primary': withOpacity('--color-content-text-primary'),
        'content-secondary': withOpacity('--color-content-text-secondary'),
        accent: withOpacity('--color-text-accent'),
        inverted: withOpacity('--color-text-inverted'),
      },
      borderColor: {
        primary: withOpacity('--color-border-primary'),
        secondary: withOpacity('--color-border-secondary'),
        'content-primary': withOpacity('--color-content-border-primary'),
        'content-secondary': withOpacity('--color-content-border-secondary'),
        accent: withOpacity('--color-border-accent'),
      },
      ringColor: {
         accent: withOpacity('--color-border-accent'),
      },
      borderRadius: {
        'btn': 'var(--btn-radius)',
      },
      height: {
        'header': 'var(--header-height)',
      },
      padding: {
        'header': 'var(--header-height)',
      }
    },
  },
  plugins: [],
}