/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0070F3",
          50: "#e6f0fe",
          100: "#cce0fd",
          200: "#99c2fb",
          300: "#66a3f9",
          400: "#3385f7",
          500: "#0070F3",
          600: "#005ac2",
          700: "#004392",
          800: "#002d61",
          900: "#001631",
        },
        secondary: {
          DEFAULT: "#FF4D8F",
          50: "#ffe6ef",
          100: "#ffcce0",
          200: "#ff99c0",
          300: "#ff66a1",
          400: "#ff3381",
          500: "#FF4D8F",
          600: "#cc3e72",
          700: "#992e55",
          800: "#661f39",
          900: "#330f1c",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss/nesting")],
} 