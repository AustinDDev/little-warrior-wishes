/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyblue: "#82b0d5",
        lavenderblue: "#47549e",
        onyx: "#000000",
      },
    },
  },
  plugins: [],
};
