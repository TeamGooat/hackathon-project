module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Almarai", "sans-serif"],
      },
      colors: {
        pinky: "#E153D3",
      },
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7985f2",
          "base-content": "#FFFFFF",
          secondary: "#73f4f2",
          accent: "#b6a4e8",
          neutral: "#291E34",
          "base-100": "#0A086E",
          info: "#19B0F0",
          success: "#5FD8CC",
          warning: "#F0AB51",
          error: "#FB3C59",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
