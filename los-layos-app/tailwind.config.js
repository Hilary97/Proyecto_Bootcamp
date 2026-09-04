/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds: one deep green-black family, no neutral grays.
        ink: {
          950: "#050A08",
          900: "#0B1611",
          800: "#122019",
          700: "#1B2E24",
        },
        // Text: warm ivory that sits well next to gold.
        ivory: {
          DEFAULT: "#F3EFE4",
          muted: "#A3AFA6",
        },
        // Interactive accent: the emerald of the jackets.
        jade: {
          300: "#4FD1A0",
          400: "#2DBF86",
          500: "#14A36A",
          600: "#0E7A50",
          700: "#0A5A3B",
          900: "#052E1F",
        },
        // Typographic accent: the crest gold.
        gold: {
          300: "#F5D77A",
          400: "#E6C453",
          500: "#D4AF37",
          600: "#A8862B",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
