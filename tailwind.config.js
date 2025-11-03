/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d8f1ff",
          500: "#1ea7ff",
          600: "#148fe0",
          800: "#0c5a8f",
        },
      },
    },
  },
  plugins: [],
};
